import { createClient, withClientOptionGuard } from "../src/client";
import { describe, test, expect } from "bun:test";

describe("withClientOptionGuard (Deno RequestInit.client clash)", () => {
  test("strips the sdk-level client option before it reaches request init", () => {
    const seen: Record<string, unknown>[] = [];
    const inner = {
      get: (opts: Record<string, unknown>) => {
        seen.push(opts);
        return Promise.resolve({});
      },
    } as never as ReturnType<typeof createClient>;

    const wrapped = withClientOptionGuard(inner);
    const sentinel = {} as never;
    void (wrapped as unknown as { get: (o: Record<string, unknown>) => Promise<unknown> }).get({
      url: "/v1/apps",
      client: sentinel,
      security: [{ scheme: "bearer", type: "http" }],
    });

    expect(seen.length).toBe(1);
    expect("client" in seen[0]).toBe(false);
    expect(seen[0].url).toBe("/v1/apps");
    expect(seen[0].security).toBeDefined();
  });

  test("passes through options without a client key untouched", () => {
    const seen: Record<string, unknown>[] = [];
    const inner = {
      get: (opts: Record<string, unknown>) => {
        seen.push(opts);
        return Promise.resolve({});
      },
    } as never as ReturnType<typeof createClient>;
    const wrapped = withClientOptionGuard(inner);
    const opts = { url: "/v1/apps", query: { limit: 5 } };
    void (wrapped as unknown as { get: (o: Record<string, unknown>) => Promise<unknown> }).get(opts);
    expect(seen[0]).toBe(opts); // identity preserved — no needless copies
  });
});

describe("Test createClient & configuration", () => {
  test("should create client with bearer token", () => {
    const client = createClient({
      bearerToken: "TEST_TOKEN",
    });

    expect(client).toBeDefined();
    const config = client.getConfig();
    expect(config?.baseUrl).toBe("https://api.appstoreconnect.apple.com");
  });

  test("should create client with custom base URL", () => {
    const client = createClient({
      bearerToken: "TEST_TOKEN",
      baseUrl: "https://custom.api.example.com",
    });

    const config = client.getConfig();
    expect(config?.baseUrl).toBe("https://custom.api.example.com");
  });
});
