import { createClient, appsGetCollection, type Client } from "../src/sdk";
import { describe, beforeAll, test, expect } from "bun:test";

const hasCredentials = Boolean(process.env.PRIVATE_KEY && process.env.PRIVATE_KEY_ID);
// Live suites need real App Store Connect credentials; bun:test skips
// the suite automatically in credential-less environments (CI).
const describeLive = describe.skipIf(!hasCredentials);


describeLive("AppStoreConnectAPI", () => {
  let client: Client;

  beforeAll(() => {
    client = createClient({
      // Team keys need issuerId; individual keys must omit it.
      ...(process.env.ISSUER_ID ? { issuerId: process.env.ISSUER_ID } : {}),
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

describeLive("with base path override", () => {
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
