import {
  createClient as createHeyApiClient,
  createConfig,
  type Client,
} from "./openapi/client";
import { generateAuthToken } from "./auth";
import { TokenCache } from "./token-cache";
import { createRetryFetch, type RetryOptions } from "./retry";

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
   * Path to the `.p8` private key file (e.g. `private/AuthKey_ABCDEFGHIJ.p8`).
   * Read lazily on first request via `node:fs/promises` (Node/Deno/Bun;
   * browsers and edge runtimes should pass `privateKey` instead).
   * When `privateKeyId` is omitted, it is inferred from the standard
   * `AuthKey_<KEYID>.p8` filename.
   */
  privateKeyPath?: string;

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

  /**
   * Retry policy for rate-limited (429) responses on idempotent requests.
   * Enabled by default (GET/HEAD, up to 3 retries, honors `Retry-After`).
   * Pass `false` to disable, or an object to tune.
   */
  retry?: RetryOptions | false;
}

const DEFAULT_EXPIRATION_DURATION_SECONDS = 60 * 20;
const DEFAULT_BASE_URL = "https://api.appstoreconnect.apple.com";
const AUTH_KEY_FILE_RE = /^AuthKey_([A-Za-z0-9]{10})\.p8$/i;

function fileBasename(path: string): string {
  return path.split(/[/\\]/).pop() ?? path;
}

/**
 * Create a configured App Store Connect API client.
 *
 * Tokens are cached and refreshed automatically; concurrent requests hitting
 * an expiry share a single token generation (single-flight).
 *
 * Usage:
 * ```typescript
 * import { createClient, appsGetCollection } from 'appstore-connect-sdk/client';
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

  let privateKeyId = config.privateKeyId;
  if (!privateKeyId && config.privateKeyPath) {
    privateKeyId = fileBasename(config.privateKeyPath).match(AUTH_KEY_FILE_RE)?.[1];
  }
  if (!config.bearerToken && !(privateKeyId && (config.privateKey || config.privateKeyPath))) {
    throw new Error(
      "createClient: provide `bearerToken`, or `privateKey`/`privateKeyPath` with `privateKeyId` (auto-inferred from AuthKey_<KEYID>.p8 filenames).",
    );
  }

  let cache: TokenCache | undefined;
  let keyPromise: Promise<string> | undefined;
  const resolvePrivateKey = async (): Promise<string> => {
    if (config.privateKey) return config.privateKey;
    keyPromise ??= import("node:fs/promises").then((fs) =>
      fs.readFile(config.privateKeyPath as string, "utf8"),
    );
    try {
      return await keyPromise;
    } catch (e) {
      // Don't cache a failed read: the file may appear later (e.g. race with
      // provisioning); the next request should retry rather than stick on ENOENT.
      keyPromise = undefined;
      throw e;
    }
  };

  const retryFetch =
    config.retry === false ? undefined : createRetryFetch(globalThis.fetch, config.retry ?? {});

  return createHeyApiClient(
    createConfig({
      baseUrl,
      ...(retryFetch ? { fetch: retryFetch } : {}),
      auth: async () => {
        if (config.bearerToken) {
          return config.bearerToken;
        }

        const privateKey = await resolvePrivateKey();
        const expirationDuration =
          config.expirationDuration ?? DEFAULT_EXPIRATION_DURATION_SECONDS;
        cache ??= new TokenCache(
          () =>
            generateAuthToken({
              apiKeyId: privateKeyId as string,
              issuerId: config.issuerId,
              privateKey,
              expirationTime: Math.floor(Date.now() / 1000) + expirationDuration,
            }),
          { expirationDuration }
        );
        return cache.getToken();
      },
    })
  );
}

// Re-export Client type
export type { Client };

// Rate-limit header accessors and retry policy types.
export { parseRateLimit, getRateLimit, type RateLimit } from "./rate-limit";
export type { RetryOptions, RetryInfo } from "./retry";
