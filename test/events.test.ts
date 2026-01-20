import { createClient, appsGetCollection, type Client } from "../src/main";
import { describe, beforeAll, test, expect } from "bun:test";

describe("AppStoreConnectAPI", () => {
  let client: Client;

  beforeAll(() => {
    client = createClient({
      // if use individual key, don't provide issuerId
      // issuerId: process.env.ISSUER_ID,
      privateKeyId: process.env.PRIVATE_KEY_ID,
      privateKey: process.env.PRIVATE_KEY,
    });
  });

  test("should interact with the App Store Connect API", async () => {
    const res = await appsGetCollection({ client });
    console.log("Fetch apps count:", res.data?.data?.length);
    expect(res).toBeDefined;
    expect(res.data?.data).toBeArray();
  });
});

describe("with base path override", () => {
  let client: Client;

  beforeAll(() => {
    client = createClient({
      bearerToken: "test-token",
      baseUrl: "https://jsonplaceholder.typicode.com",
    });
  });

  test("should use the overridden base path", () => {
    const config = client.getConfig();
    expect(config?.baseUrl).toBe("https://jsonplaceholder.typicode.com");
  });

  test("should correctly concatenate overridden base path with endpoint", async () => {
    try {
      await appsGetCollection({ client });
    } catch (error: any) {
      const url =
        error?.response?.url || error?.request?.url || error?.url || "unknown";
      expect(url).toContain("jsonplaceholder.typicode.com");
    }
  });
});
