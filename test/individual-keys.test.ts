import { generateAuthToken } from "../src/auth";
import { createClient } from "../src/main";
import * as jose from "jose";
import { describe, test, expect } from "bun:test";

describe("Individual API Keys Support", () => {
  // Valid ECDSA P-256 private key for testing
  const mockPrivateKey = `-----BEGIN PRIVATE KEY-----
MIGHAgEAMBMGByqGSM49AgEGCCqGSM49AwEHBG0wawIBAQQgxgRxXyzKZWWeINrn
NPhIwXiQOD1HTsV++wY/upGkQ4KhRANCAASSFNeY+AGTWn/yaoC1KqOts1sAai68
a82PbQ7javh02OzG2pZE6AW7S9WOY78HAx0keuxtACm7FGf2UKqR2I5M
-----END PRIVATE KEY-----`;

  const mockApiKeyId = "ABC123DEF4";

  describe("generateAuthToken", () => {
    test("should generate token for Team API key with issuerId", async () => {
      const issuerId = "69a6de73-ea56-47e3-e053-5b8c7c11a4d1";
      const expirationTime = Math.floor(Date.now() / 1000) + 1200;

      const token = await generateAuthToken({
        apiKeyId: mockApiKeyId,
        issuerId,
        privateKey: mockPrivateKey,
        expirationTime,
      });

      expect(token).toBeTruthy();
      expect(typeof token).toBe("string");

      // Decode token to verify structure (without verifying signature)
      const decoded = jose.decodeJwt(token);
      expect(decoded.iss).toBe(issuerId);
      expect(decoded.aud).toBe("appstoreconnect-v1");
      expect(decoded.exp).toBe(expirationTime);
      expect(decoded.sub).toBeUndefined(); // Should not have subject for Team keys
    });

    test("should generate token for Individual API key without issuerId", async () => {
      const expirationTime = Math.floor(Date.now() / 1000) + 1200;

      const token = await generateAuthToken({
        apiKeyId: mockApiKeyId,
        // No issuerId for Individual keys
        privateKey: mockPrivateKey,
        expirationTime,
      });

      expect(token).toBeTruthy();
      expect(typeof token).toBe("string");

      // Decode token to verify structure (without verifying signature)
      const decoded = jose.decodeJwt(token);
      expect(decoded.iss).toBeUndefined(); // Should not have issuer for Individual keys
      expect(decoded.sub).toBe("user"); // Should have subject set to "user"
      expect(decoded.aud).toBe("appstoreconnect-v1");
      expect(decoded.exp).toBe(expirationTime);
    });

    test("should include correct header information", async () => {
      const token = await generateAuthToken({
        apiKeyId: mockApiKeyId,
        privateKey: mockPrivateKey,
        expirationTime: Math.floor(Date.now() / 1000) + 1200,
      });

      const header = jose.decodeProtectedHeader(token);
      expect(header.alg).toBe("ES256");
      expect(header.kid).toBe(mockApiKeyId);
      expect(header.typ).toBe("JWT");
    });
  });

  describe("createClient", () => {
    test("should work with Individual API key configuration", () => {
      // This should not throw an error
      expect(() =>
        createClient({
          privateKeyId: mockApiKeyId,
          privateKey: mockPrivateKey,
          // No issuerId - Individual key
        })
      ).not.toThrow();
    });

    test("should work with Team API key configuration", () => {
      expect(() =>
        createClient({
          issuerId: "69a6de73-ea56-47e3-e053-5b8c7c11a4d1",
          privateKeyId: mockApiKeyId,
          privateKey: mockPrivateKey,
        })
      ).not.toThrow();
    });

    test("should work with bearerToken", () => {
      expect(() =>
        createClient({
          bearerToken: "provided-bearer-token",
        })
      ).not.toThrow();
    });
  });
});
