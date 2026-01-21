import {
  createClient,
  appsGetCollection,
  type Client,
  type AppsResponse,
  type App,
  zAppsResponse,
  zApp,
} from "../src/main";
import { z } from "zod";
import { describe, beforeAll, test, expect } from "bun:test";

describe("Schema Validation", () => {
  let client: Client;

  beforeAll(() => {
    client = createClient({
      privateKeyId: process.env.PRIVATE_KEY_ID,
      privateKey: process.env.PRIVATE_KEY,
    });
  });

  describe("Zod Schema Structure", () => {
    test("zAppsResponse should be a valid Zod schema", () => {
      expect(zAppsResponse).toBeDefined();
      expect(zAppsResponse instanceof z.ZodType).toBe(true);
    });

    test("zApp should be a valid Zod schema", () => {
      expect(zApp).toBeDefined();
      expect(zApp instanceof z.ZodType).toBe(true);
    });

    test("should validate well-formed App data", () => {
      const validApp = {
        type: "apps",
        id: "123456789",
        attributes: {
          name: "Test App",
          bundleId: "com.example.app",
          sku: "TEST_SKU",
          primaryLocale: "en-US",
          contentRightsDeclaration: "DOES_NOT_USE_THIRD_PARTY_CONTENT",
        },
        links: {
          self: "https://api.appstoreconnect.apple.com/v1/apps/123456789",
        },
      };

      const parseResult = zApp.safeParse(validApp);
      expect(parseResult.success).toBe(true);
    });

    test("should reject App with invalid type", () => {
      const invalidApp = {
        type: "invalid-type", // wrong type
        id: "123456789",
      };

      const parseResult = zApp.safeParse(invalidApp);
      expect(parseResult.success).toBe(false);
    });

    test("should reject App with non-string id", () => {
      const invalidApp = {
        type: "apps",
        id: 12345, // should be string
      };

      const parseResult = zApp.safeParse(invalidApp);
      expect(parseResult.success).toBe(false);
    });

    test("should reject completely invalid AppsResponse", () => {
      const invalidResponse = {
        wrong: "structure",
      };

      const parseResult = zAppsResponse.safeParse(invalidResponse);
      expect(parseResult.success).toBe(false);
    });

    test("should provide detailed Zod error messages", () => {
      const invalidApp = {
        type: 123, // should be string enum
        id: null, // should be string
      };

      const parseResult = zApp.safeParse(invalidApp);
      expect(parseResult.success).toBe(false);

      if (!parseResult.success) {
        expect(parseResult.error.issues.length).toBeGreaterThan(0);
        // Check that we get path information in errors
        const paths = parseResult.error.issues.map((i) => i.path.join("."));
        expect(paths.length).toBeGreaterThan(0);
      }
    });
  });

  describe("TypeScript Type Validation", () => {
    test("should properly type AppsResponse from API", async () => {
      const res = await appsGetCollection({ client });

      // TypeScript compile-time check - this validates the type structure
      const data: AppsResponse | undefined = res.data;

      expect(data).toBeDefined();
      expect(data?.data).toBeArray();

      // Access typed properties
      const apps = data?.data;
      if (apps && apps.length > 0) {
        const app: App = apps[0];
        expect(app.type).toBe("apps");
        expect(typeof app.id).toBe("string");
      }
    });

    test("should have correct App attributes types", async () => {
      const res = await appsGetCollection({ client });
      const app = res.data?.data?.[0];

      expect(app).toBeDefined();
      if (app?.attributes) {
        const attrs = app.attributes;

        // Runtime checks verify the actual data types
        if (attrs.name !== undefined && attrs.name !== null) {
          expect(typeof attrs.name).toBe("string");
        }

        if (attrs.bundleId !== undefined && attrs.bundleId !== null) {
          expect(typeof attrs.bundleId).toBe("string");
        }

        if (attrs.sku !== undefined && attrs.sku !== null) {
          expect(typeof attrs.sku).toBe("string");
        }
      }
    });

    test("should have typed relationships", async () => {
      const res = await appsGetCollection({ client });
      const app = res.data?.data?.[0];

      expect(app).toBeDefined();
      if (app?.relationships) {
        // TypeScript knows the structure of relationships
        const relationships = app.relationships;
        expect(relationships).toBeDefined();
      }
    });
  });

  describe("API Response Structure", () => {
    test("API response should have expected structure", async () => {
      const res = await appsGetCollection({ client });

      // Check response structure
      expect(res.data).toBeDefined();
      expect(res.data?.data).toBeArray();
      expect(res.data?.links).toBeDefined();

      // Check first app structure
      const firstApp = res.data?.data?.[0];
      if (firstApp) {
        expect(firstApp.type).toBe("apps");
        expect(firstApp.id).toBeString();
        expect(firstApp.attributes).toBeDefined();
        expect(firstApp.links).toBeDefined();
      }
    });

    test("API response contains valid app IDs", async () => {
      const res = await appsGetCollection({ client });
      const apps = res.data?.data;

      expect(apps).toBeDefined();
      if (apps) {
        for (const app of apps) {
          expect(app.id).toBeString();
          expect(app.id.length).toBeGreaterThan(0);
        }
      }
    });
  });

  describe("Schema Type Inference", () => {
    test("zApp infers correct TypeScript type", () => {
      // This is a compile-time check
      type InferredApp = z.infer<typeof zApp>;

      // Create a value that satisfies the inferred type
      const app: InferredApp = {
        type: "apps",
        id: "test-id",
      };

      expect(app.type).toBe("apps");
      expect(app.id).toBe("test-id");
    });

    test("zAppsResponse infers correct TypeScript type", () => {
      type InferredResponse = z.infer<typeof zAppsResponse>;

      const response: InferredResponse = {
        data: [
          {
            type: "apps",
            id: "test-id",
          },
        ],
        links: {
          self: "https://example.com",
        },
      };

      expect(response.data).toBeArray();
      expect(response.data[0].type).toBe("apps");
    });
  });
});
