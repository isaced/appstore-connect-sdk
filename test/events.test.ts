import { AppsApi } from "../src/openapi";
import AppStoreConnectAPI from "../src/main";
import { describe, beforeAll, test, expect } from "bun:test";

describe("AppStoreConnectAPI", () => {
  let client: AppStoreConnectAPI;

  beforeAll(() => {
    client = new AppStoreConnectAPI({
      issuerId: process.env.ISSUER_ID!,
      privateKeyId: process.env.PRIVATE_KEY_ID!,
      privateKey: process.env.PRIVATE_KEY!,
    });
  });

  test("should interact with the App Store Connect API", async () => {
    try {
      const api = await client.create(AppsApi);
      const res = await api.appsGetCollection();
      console.log(res);
      expect(res).toBeDefined;
    } catch (error) {
      console.error(error);
    }
  });
});

describe("with base path override", () => {
  let client: AppStoreConnectAPI;

  beforeAll(() => {
    client = new AppStoreConnectAPI({
      issuerId: process.env.ISSUER_ID!,
      privateKeyId: process.env.PRIVATE_KEY_ID!,
      privateKey: process.env.PRIVATE_KEY!,
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
    } catch (error: any) {
      expect(error.response.url).toBe(
        "https://jsonplaceholder.typicode.com/v1/apps"
      );
    }
  });
});