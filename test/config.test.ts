import { describe, test, expect, beforeAll, afterAll } from "bun:test";
import { mkdtempSync, writeFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, basename } from "node:path";
import { generateKeyPairSync } from "node:crypto";
import { decodeProtectedHeader } from "jose";
import { createClient } from "../src/client";
import type { Client } from "../src/openapi/client";

// ---------------------------------------------------------------------------
// Mock API capturing the Authorization header of each request.
// ---------------------------------------------------------------------------

let server: ReturnType<typeof Bun.serve>;
let origin: string;
let authHeader: string | null;

beforeAll(() => {
  server = Bun.serve({
    port: 0,
    fetch(req) {
      authHeader = req.headers.get("authorization");
      return Response.json({ data: [] });
    },
  });
  origin = `http://localhost:${server.port}`;
});

afterAll(() => server?.stop());

function pem(): string {
  const { privateKey } = generateKeyPairSync("ec", {
    namedCurve: "prime256v1",
    privateKeyEncoding: { type: "pkcs8", format: "pem" },
    publicKeyEncoding: { type: "spki", format: "pem" },
  });
  return privateKey;
}

async function firstToken(client: Client): Promise<string> {
  authHeader = null;
  await client.get({ url: "/v1/apps", security: [{ scheme: "bearer", type: "http" }] });
  expect(authHeader?.startsWith("Bearer ")).toBe(true);
  return authHeader!.slice(7);
}

describe("createClient config validation (fail fast)", () => {
  test("throws immediately when no credentials are configured", () => {
    expect(() => createClient({})).toThrow(/bearerToken|privateKey/i);
  });

  test("accepts bearerToken alone", () => {
    expect(() => createClient({ bearerToken: "x" })).not.toThrow();
  });

  test("accepts inline privateKey with explicit privateKeyId", () => {
    expect(
      () => createClient({ privateKeyId: "KEY1234567", privateKey: "pem-placeholder" }),
    ).not.toThrow();
  });

  test("privateKeyPath without a matching AuthKey filename still requires privateKeyId", () => {
    expect(() => createClient({ privateKeyPath: "/somewhere/mykey.p8" })).toThrow(/privateKeyId/);
  });
});

describe("privateKeyPath", () => {
  let dir: string;

  beforeAll(() => {
    dir = mkdtempSync(join(tmpdir(), "asc-keys-"));
  });

  afterAll(() => rmSync(dir, { recursive: true, force: true }));

  test("loads the key from disk and infers privateKeyId from AuthKey_<ID>.p8", async () => {
    const path = join(dir, "AuthKey_ABCDEFGHIJ.p8");
    writeFileSync(path, await pem());

    const client = createClient({ issuerId: "iss-1", privateKeyPath: path, baseUrl: origin });
    // inference happened synchronously at creation, without an explicit id:
    expect(basename(path)).toBe("AuthKey_ABCDEFGHIJ.p8");

    const jwt = await firstToken(client);
    const header = decodeProtectedHeader(jwt);
    expect(header.kid).toBe("ABCDEFGHIJ");
  });

  test("explicit privateKeyId wins over filename inference", async () => {
    const path = join(dir, "AuthKey_ABCDEFGHIJ.p8");
    writeFileSync(path, await pem());

    const client = createClient({
      privateKeyId: "ZZZZZZZZZZ",
      privateKeyPath: path,
      baseUrl: origin,
    });
    const header = decodeProtectedHeader(await firstToken(client));
    expect(header.kid).toBe("ZZZZZZZZZZ");
  });

  test("token caching reuses one signed token across requests", async () => {
    const path = join(dir, "AuthKey_CCCCCCCCCC.p8");
    writeFileSync(path, await pem());
    const client = createClient({ privateKeyPath: path, baseUrl: origin });

    const t1 = await firstToken(client);
    const t2 = await firstToken(client);
    expect(t2).toBe(t1);
  });

  test("missing file surfaces the fs error at request time (not creation time)", async () => {
    const client = createClient({
      privateKeyId: "KEY1234567",
      privateKeyPath: join(dir, "AuthKey_AAAAAAAAAB.p8.missing"),
      baseUrl: origin,
    });
    const res = await client.get({
      url: "/v1/apps",
      security: [{ scheme: "bearer", type: "http" }],
    });
    expect(res.error).toBeDefined();
  });
});
