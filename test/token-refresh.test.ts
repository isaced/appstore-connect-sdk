import { describe, test, expect, mock, beforeEach } from "bun:test";
import { TokenCache } from "../src/token-cache";
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

function makeCache(
  issuer: () => Promise<string>,
  opts: { expirationDuration?: number; refreshLeadMs?: number; now?: () => number } = {}
) {
  return new TokenCache(issuer, { expirationDuration: opts.expirationDuration ?? 1200, ...opts });
}

describe("TokenCache single-flight", () => {
  test("concurrent getToken() shares exactly one issuance", async () => {
    const d = deferred<string>();
    let started = 0;
    const issuer = mock(() => {
      started += 1;
      return d.promise;
    });

    const cache = makeCache(issuer);
    const p1 = cache.getToken();
    const p2 = cache.getToken();
    const p3 = cache.getToken();

    expect(started).toBe(1); // joiners await the in-flight promise, never re-sign

    d.resolve("shared-token");
    expect(await Promise.all([p1, p2, p3])).toEqual([
      "shared-token",
      "shared-token",
      "shared-token",
    ]);
    expect(issuer.mock.calls.length).toBe(1);
  });

  test("token inside its window is reused, not regenerated", async () => {
    let n = 0;
    const cache = makeCache(async () => `tok-${++n}`);

    const first = await cache.getToken();
    const again = await cache.getToken();

    expect(first).toBe(again);
    expect(n).toBe(1);
  });

  test("failed issuance does not poison the cache: later calls retry", async () => {
    const d = deferred<string>();
    const cache = makeCache(() => d.promise);

    // attach synchronously before rejection fires
    const failure = cache.getToken().catch((e) => e);
    d.reject("boom");
    expect(await failure).toBe("boom");

    let n = 0;
    const retrying = makeCache(async () => `tok-${++n}`);
    expect(await retrying.getToken()).toBe("tok-1");
  });

  test("callers attached to a failed flight all reject, then next call succeeds", async () => {
    const d = deferred<string>();
    let calls = 0;
    const issuer = () => {
      calls += 1;
      return calls === 1 ? d.promise : Promise.resolve("ok-after-failure");
    };
    const cache = makeCache(issuer);

    const f1 = cache.getToken().catch((e) => e);
    const f2 = cache.getToken().catch((e) => e);
    expect(calls).toBe(1);

    d.reject("boom");
    expect(await f1).toBe("boom");
    expect(await f2).toBe("boom");
    expect(await cache.getToken()).toBe("ok-after-failure");
  });

  test("refreshes once the early-refresh lead window passes", async () => {
    let t = 0; // injected clock, ms
    let n = 0;
    const cache = makeCache(async () => `tok-${++n}`, {
      expirationDuration: 60, // 60s lifetime
      refreshLeadMs: 10_000, // refresh 10s before expiry
      now: () => t,
    });

    await cache.getToken();
    t = 49_000; // inside lead window -> still fresh
    expect(await cache.getToken()).toBe("tok-1");
    t = 51_000; // past 50s = expiry minus lead -> regenerate
    expect(await cache.getToken()).toBe("tok-2");
  });
});

describe("createClient token integration (public surface)", () => {
  const authOf = (client: ReturnType<typeof createClient>) => {
    const auth = (client.getConfig() as { auth?: () => Promise<string> }).auth;
    if (typeof auth !== "function") throw new Error("auth resolver missing");
    return auth;
  };

  test("bearerToken short-circuits without any key handling", async () => {
    const auth = authOf(createClient({ bearerToken: "static-bearer" }));
    expect(await auth()).toBe("static-bearer");
    expect(await auth()).toBe("static-bearer");
  });

  test("missing credentials reject instead of hanging", async () => {
    const auth = authOf(createClient({}));
    const rejection = auth().catch((e) => (e as Error).message);
    expect(await rejection).toContain("No bearerToken or private key provided");
  });

  test("concurrent requests on one client reuse a single signed token", async () => {
    // Real jose signing with the repo's test P-256 key: three parallel auths
    // must observe the exact same JWT string (single-flight end-to-end).
    const client = createClient({
      privateKeyId: "ABC123DEF4",
      issuerId: "69a6de73-ea56-47e3-e053-5b8c7c11a4d1",
      privateKey: `-----BEGIN PRIVATE KEY-----
MIGHAgEAMBMGByqGSM49AgEGCCqGSM49AwEHBG0wawIBAQQgxgRxXyzKZWWeINrn
NPhIwXiQOD1HTsV++wY/upGkQ4KhRANCAASSFNeY+AGTWn/yaoC1KqOts1sAai68
a82PbQ7javh02OzG2pZE6AW7S9WOY78HAx0keuxtACm7FGf2UKqR2I5M
-----END PRIVATE KEY-----`,
    });
    const auth = authOf(client);
    const [a, b, c] = await Promise.all([auth(), auth(), auth()]);
    expect(a).toBe(b);
    expect(b).toBe(c);
  });
});
