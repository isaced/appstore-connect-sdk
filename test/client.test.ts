import { createClient } from "../src/main";
import { describe, test, expect } from "bun:test";

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
