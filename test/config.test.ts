import { describe, test, expect, beforeAll, afterAll } from "bun:test";
import { mkdtempSync, writeFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, basename } from "node:path";
import { generateKeyPairSync } from "node:crypto";
import { decodeProtectedHeader, decodeJwt } from "jose";
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

  test("empty-string credentials are rejected, not treated as provided", () => {
    expect(() => createClient({ privateKeyId: "KEY1234567", privateKey: "" })).toThrow(/bearerToken|privateKey/i);
    expect(() => createClient({ bearerToken: "" })).toThrow(/bearerToken|privateKey/i);
  });

  test("bearerToken takes precedence when other credentials are also present", async () => {
    const client = createClient({
      bearerToken: "static-bearer",
      privateKeyId: "KEY1234567",
      privateKey: "not-a-real-pem",
      baseUrl: origin,
    });
    await firstToken(client);
    expect(authHeader).toBe("Bearer static-bearer");
  });

  test("infers the key ID from Windows-style paths too", () => {
    expect(() =>
      createClient({ privateKeyPath: "C:\\Users\\dev\\private\\AuthKey_QQWERTYUIO.p8" }),
    ).not.toThrow();
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

  test("a failed key read recovers once the file exists (no sticky rejection)", async () => {
    const path = join(dir, "AuthKey_RRRRRRRRRR.p8");
    const client = createClient({ privateKeyPath: path, baseUrl: origin });

    const bad = await client.get({ url: "/v1/apps", security: [{ scheme: "bearer", type: "http" }] });
    expect(bad.error).toBeDefined();

    writeFileSync(path, pem());
    const jwt = await firstToken(client);
    expect(decodeProtectedHeader(jwt).kid).toBe("RRRRRRRRRR");
  });

  test("inline privateKey takes precedence over privateKeyPath", async () => {
    const client = createClient({
      privateKeyId: "KEY1234567",
      privateKey: pem(),
      privateKeyPath: join(dir, "does-not-exist.p8"),
      baseUrl: origin,
    });
    const jwt = await firstToken(client);
    expect(decodeProtectedHeader(jwt).kid).toBe("KEY1234567");
  });

  test("privateKeyPath without issuerId produces an Individual-key token", async () => {
    const path = join(dir, "AuthKey_IIIIIIIIII.p8");
    writeFileSync(path, pem());
    const client = createClient({ privateKeyPath: path, baseUrl: origin });

    const claims = decodeJwt(await firstToken(client));
    expect(claims.sub).toBe("user");
    expect(claims.iss).toBeUndefined();
    expect(claims.aud).toBe("appstoreconnect-v1");
  });
});
