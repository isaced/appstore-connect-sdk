import { AppsApi } from "../src/openapi";
import { AppStoreConnectAPI } from "../src/main";
import { describe, beforeAll, test, expect } from "bun:test";

describe("AppStoreConnectAPI", () => {
  let client: AppStoreConnectAPI;

  beforeAll(() => {
    client = new AppStoreConnectAPI({
      // if use individual key, don't provide issuerId
      // issuerId: process.env.ISSUER_ID,
      privateKeyId: process.env.PRIVATE_KEY_ID,
      privateKey: process.env.PRIVATE_KEY,
    });
  });

  test("should interact with the App Store Connect API", async () => {
    const api = await client.create(AppsApi);
    const res = await api.appsGetCollection();
    console.log('Fetch apps count:', res.data.length);
    expect(res).toBeDefined;
    expect(res.data).toBeArray();
  });
});

describe("with base path override", () => {
  let client: AppStoreConnectAPI;

  beforeAll(() => {
    client = new AppStoreConnectAPI({
      bearerToken: "test-token", // Use a test token instead of environment variables
      basePath: "https://jsonplaceholder.typicode.com",
    });
  });

  test("should use the overridden base path", async () => {
    const configuration = await client.getConfiguration();
    expect(configuration?.basePath).toBe(
      "https://jsonplaceholder.typicode.com"
    );
  });

  test("should correctly concatenate overridden base path with endpoint", async () => {
    try {
      const api = await client.create(AppsApi);
      await api.appsGetCollection();
    } catch (error) {
      // Check if the error has response.url or handle different error structures
      const url = error?.response?.url || error?.url || 'unknown';
      expect(url).toBe(
        "https://jsonplaceholder.typicode.com/v1/apps"
      );
    }
  });
});