import { describe, test, expect, mock, beforeEach } from "bun:test";
import { createClient } from "../src/sdk";

function deferred<T>() {
  let resolve!: (v: T) => void;
  let reject!: (e: unknown) => void;
  const promise = new Promise<T>((res, rej) => {
    resolve = res;
    reject = rej;
  });
  return { promise, resolve, reject };
}

// Deterministic stub injected through the internal generation seam — no
// module mocking, no cross-file state, no ordering assumptions.
let gen: ReturnType<typeof mock>;

function makeClient(overrides: Record<string, unknown> = {}) {
  const client = createClient({
    privateKeyId: "KEYID",
    issuerId: "issuer",
    privateKey: "PEM",
    _generateAuthToken: gen,
    ...overrides,
  });
  const auth = (client.getConfig() as { auth?: () => Promise<string> }).auth;
  if (typeof auth !== "function") throw new Error("auth resolver missing");
  return auth;
}

beforeEach(() => {
  gen = mock(async () => `tok-${Math.random()}`);
});

describe("createClient token single-flight", () => {
  test("concurrent auth() calls trigger exactly one token generation", async () => {
    const d = deferred<string>();
    let started = 0;
    gen.mockImplementation(() => {
      started += 1;
      return d.promise;
    });

    const auth = makeClient();
    const p1 = auth();
    const p2 = auth();
    const p3 = auth();

    expect(started).toBe(1); // 2nd/3rd callers must await the in-flight promise, not re-sign

    d.resolve("shared-token");
    expect(await Promise.all([p1, p2, p3])).toEqual([
      "shared-token",
      "shared-token",
      "shared-token",
    ]);
  });

  test("a healthy token inside its window is reused, not regenerated", async () => {
    const auth = makeClient();

    const first = await auth();
    const again = await auth();

    expect(first).toBe(again);
    expect(gen.mock.calls.length).toBe(1);
  });

  test("failed generation does not poison the client: later calls retry", async () => {
    const d = deferred<string>();
    gen.mockImplementation(() => d.promise);

    const auth = makeClient();

    // attach the handler synchronously, before rejection fires
    const failure = auth().catch((e) => e);
    d.reject("boom");
    expect(await failure).toBe("boom");

    gen.mockImplementation(async () => "fresh-token");
    expect(await auth()).toBe("fresh-token");
  });

  test("concurrent callers attached to a failed flight all reject (no hang, no leak)", async () => {
    const d = deferred<string>();
    gen.mockImplementation(() => d.promise);

    const auth = makeClient();
    // catch handlers registered synchronously — deterministic rejection capture
    const f1 = auth().catch((e) => e);
    const f2 = auth().catch((e) => e);

    d.reject("boom");
    expect(await f1).toBe("boom");
    expect(await f2).toBe("boom");

    gen.mockImplementation(async () => "ok-after-failure");
    expect(await auth()).toBe("ok-after-failure");
  });

  test("near-expiry refresh storm produces one token, then caches it", async () => {
    const auth = makeClient({ expirationDuration: 60 });
    const [a, b] = await Promise.all([auth(), auth()]);
    expect(a).toBe(b);
    expect(gen.mock.calls.length).toBe(1);
  });

  test("bearerToken short-circuit never touches generation", async () => {
    const auth = makeClient({ bearerToken: "static-bearer", privateKeyId: undefined, privateKey: undefined });
    expect(await auth()).toBe("static-bearer");
    expect(gen.mock.calls.length).toBe(0);
  });
});
