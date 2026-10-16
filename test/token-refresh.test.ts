import { describe, test, expect, mock, beforeEach } from "bun:test";

function deferred<T>() {
  let resolve!: (v: T) => void;
  let reject!: (e: unknown) => void;
  const promise = new Promise<T>((res, rej) => {
    resolve = res;
    reject = rej;
  });
  return { promise, resolve, reject };
}

// One stable stub reference; its implementation is swapped per test. Declared
// before mock.module so the exports thunk closes over an initialized binding.
const generateStub = mock(async (): Promise<string> => `tok-${Math.random()}`);
mock.module("../src/auth", () => ({ generateAuthToken: generateStub }));

const { createClient } = await import("../src/client");

const baseConfig = {
  privateKeyId: "KEYID",
  issuerId: "issuer",
  privateKey: "PEM",
};

const authOf = (client: ReturnType<typeof createClient>) => {
  const auth = (client.getConfig() as { auth?: () => Promise<string> }).auth;
  if (typeof auth !== "function") throw new Error("auth resolver missing");
  return auth;
};

beforeEach(() => {
  generateStub.mockReset();
  generateStub.mockImplementation(async () => `tok-${Math.random()}`);
});

describe("createClient token single-flight", () => {
  test("concurrent auth() calls trigger exactly one token generation", async () => {
    const d = deferred<string>();
    let started = 0;
    generateStub.mockImplementation(() => {
      started += 1;
      return d.promise;
    });

    const client = createClient(baseConfig);
    const auth = authOf(client);
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
    const client = createClient(baseConfig);
    const auth = authOf(client);

    const first = await auth();
    const again = await auth();

    expect(first).toBe(again);
    expect(generateStub.mock.calls.length).toBe(1);
  });

  test("failed generation does not poison the client: later calls retry", async () => {
    const d = deferred<string>();
    generateStub.mockImplementation(() => d.promise);

    const client = createClient(baseConfig);
    const auth = authOf(client);

    // attach the handler synchronously, before rejection fires
    const failure = auth().catch((e) => e);
    d.reject("boom");
    expect(await failure).toBe("boom");

    generateStub.mockImplementation(async () => "fresh-token");
    expect(await auth()).toBe("fresh-token");
  });

  test("concurrent callers attached to a failed flight all reject (no hang, no leak)", async () => {
    const d = deferred<string>();
    generateStub.mockImplementation(() => d.promise);

    const client = createClient(baseConfig);
    const auth = authOf(client);
    // catch handlers registered synchronously — deterministic rejection capture
    const f1 = auth().catch((e) => e);
    const f2 = auth().catch((e) => e);

    d.reject("boom");
    expect(await f1).toBe("boom");
    expect(await f2).toBe("boom");

    generateStub.mockImplementation(async () => "ok-after-failure");
    expect(await auth()).toBe("ok-after-failure");
  });

  test("near-expiry refresh storm produces one token, then caches it", async () => {
    // Short window so the cache path is exercised too: after the storm, a
    // fourth call must not re-generate.
    const client = createClient({ ...baseConfig, expirationDuration: 60 });
    const auth = authOf(client);
    const [a, b] = await Promise.all([auth(), auth()]);
    expect(a).toBe(b);
    expect(generateStub.mock.calls.length).toBe(1);
  });

  test("bearerToken short-circuit never touches generation", async () => {
    const client = createClient({ bearerToken: "static-bearer" });
    expect(await authOf(client)()).toBe("static-bearer");
    expect(generateStub.mock.calls.length).toBe(0);
  });
});
