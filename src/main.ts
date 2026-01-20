import {
  createClient as createHeyApiClient,
  createConfig,
  type Client,
} from "./openapi/client";
import { generateAuthToken } from "./auth";

/**
 * Options for creating an App Store Connect API client.
 */
export interface AppStoreConnectConfig {
  /**
   * The issuer ID associated with the private key.
   * Required for Team API keys, optional for Individual API keys.
   */
  issuerId?: string;

  /**
   * The ID of the private key.
   */
  privateKeyId?: string;

  /**
   * The private key in PEM format.
   */
  privateKey?: string;

  /**
   * A bearer token can be provided directly, which will be used instead of generating a new token.
   */
  bearerToken?: string;

  /**
   * The token's expiration duration in seconds. (default 20 minutes)
   * Tokens that expire more than 20 minutes in the future are not valid.
   */
  expirationDuration?: number;

  /**
   * The base URL for the API (default https://api.appstoreconnect.apple.com).
   */
  baseUrl?: string;
}

const DEFAULT_EXPIRATION_DURATION_SECONDS = 60 * 20;
const DEFAULT_BASE_URL = "https://api.appstoreconnect.apple.com";

/**
 * Create a configured App Store Connect API client.
 *
 * Usage:
 * ```typescript
 * import { createClient, appsGetCollection } from 'appstore-connect-sdk';
 *
 * const client = createClient({
 *   privateKeyId: 'YOUR_KEY_ID',
 *   privateKey: 'YOUR_PRIVATE_KEY',
 *   issuerId: 'YOUR_ISSUER_ID', // optional for Individual keys
 * });
 *
 * const apps = await appsGetCollection({ client });
 * console.log(apps.data);
 * ```
 */
export function createClient(config: AppStoreConnectConfig): Client {
  const baseUrl = config.baseUrl?.replace(/\/$/, "") || DEFAULT_BASE_URL;

  // Token caching state
  let cachedToken: string | null = null;
  let tokenGeneratedAt = 0;

  return createHeyApiClient(
    createConfig({
      baseUrl,
      auth: async () => {
        if (config.bearerToken) {
          return config.bearerToken;
        }

        if (config.privateKeyId && config.privateKey) {
          const expirationDuration =
            config.expirationDuration ?? DEFAULT_EXPIRATION_DURATION_SECONDS;
          const expirationDurationMs = expirationDuration * 1000;
          const tokenAge = tokenGeneratedAt ? Date.now() - tokenGeneratedAt : 0;

          // Refresh if: no token, expired, or will expire within 2 minutes
          const shouldRefresh =
            !cachedToken ||
            tokenAge > expirationDurationMs ||
            tokenAge > expirationDurationMs - 2 * 60 * 1000;

          if (shouldRefresh) {
            cachedToken = await generateAuthToken({
              apiKeyId: config.privateKeyId,
              issuerId: config.issuerId,
              privateKey: config.privateKey,
              expirationTime: Math.floor(Date.now() / 1000) + expirationDuration,
            });
            tokenGeneratedAt = Date.now();
          }

          return cachedToken!;
        }

        throw new Error("No bearerToken or private key provided");
      },
    })
  );
}

// Re-export Client type
export type { Client };

// Re-export all SDK functions and types from hey-api
export * from "./openapi";
