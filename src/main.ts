import type { FetchAPI, InitOverrideFunction, RequestOpts, HTTPMethod, HTTPHeaders } from "./openapi/runtime";
import { BASE_PATH, BaseAPI } from "./openapi/runtime";
import { Configuration } from "./openapi";
import { generateAuthToken } from "./auth";

/**
 * Options for configuring the AppStoreConnectAPI instance.
 */
export interface AppStoreConnectAPIOptions {
  /**
   * The issuer ID associated with the private key.
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
   * An optional FetchAPI instance to use for making HTTP requests.
   */
  fetchApi?: FetchAPI;

  /**
   * A bearer token can be provided directly, which will be used instead of generating a new token
   */
  bearerToken?: string;

  /**
   * The token's expiration duration in seconds. (default 20 minutes)
   * Tokens that expire more than 20 minutes in the future are not valid, so set it to a max of 20 minutes.
   * Reference: https://developer.apple.com/documentation/appstoreconnectapi/generating-tokens-for-api-requests
   */
  expirationDuration?: number;

  /**
   * The base path for the API (without trailing slash, default https://api.appstoreconnect.apple.com).
   */
  basePath?: string;
}

/**
 * The request context for the API request.
 * @param url - The URL of the API endpoint, must start with https://api.appstoreconnect.apple.com .
 * @param path - The path of the API endpoint, if provided, the url parameter will be ignored.
 * @param method - The HTTP method to use for the request (default GET).
 * @param headers - The headers to use for the request.
 */
export type AppStoreConnectAPIRequest = (
  | { url: string; path?: never }
  | { url?: never; path: string }
) & {
  method?: HTTPMethod;
  headers?: HTTPHeaders;
};

/**
 * Default expiration time for the bearer token in seconds. (20 minutes)
 */
const DEFAULT_EXPIRATION_DURATION_SECONDS = 60 * 20;

/**
 * The App Store Connect SDK for Node.js is written in TypeScript and supports all APIs
 * based on OpenAPI Generator.
 *
 * https://github.com/isaced/appstore-connect-sdk
 */
class AppStoreConnectAPI {

  /**
   * The time (in milliseconds) when the current bearer token was generated.
   */
  private bearerTokenGeneratedAt = 0;

  /**
   * The options for the client instance.
   */
  private options: AppStoreConnectAPIOptions;

  /**
   * The configuration object for the API.
   */
  private configuration?: Configuration;

  /**
   * Creates an instance of the AppStoreConnectAPI.
   * @param options - The configuration options for the API.
   * @param options.issuerId - The issuer ID for generating JWT token.
   * @param options.privateKeyId - The ID of the private key used for generating JWT token.
   * @param options.privateKey - The content of the private key used for generating JWT token.
   * @param options.fetchApi - (Optional) The FetchAPI implementation to use for API requests.
   * @param options.bearerToken - (Optional) A pre-generated bearer token to use for authentication.
   * @param options.expirationDuration - (Optional) The expiration duration for the bearer token in seconds (default 20 minutes).
   * @param options.basePath - (Optional) The base path for the API (without trailing slash, default https://api.appstoreconnect.apple.com).
   * @throws {string} Will throw an error if no bearerToken or private key is provided
   */
  constructor(options: AppStoreConnectAPIOptions) {
    this.options = options;
  }

  /**
   * Generates a new bearer token.
   */
  async genToken() {
    if (this.options.bearerToken) {
      return this.options.bearerToken;
    }

    if (this.options.privateKeyId && this.options.issuerId && this.options.privateKey) {
      return await generateAuthToken({
        apiKeyId: this.options.privateKeyId,
        issuerId: this.options.issuerId,
        privateKey: this.options.privateKey,
        expirationTime: Math.floor(Date.now() / 1000) + (this.options.expirationDuration ?? DEFAULT_EXPIRATION_DURATION_SECONDS),
      });
    }

    throw "No bearerToken or private key provided";
  }

  /**
   * Create a Configuration object with the authentication token and any provided FetchAPI implementation.
   */
  async genConfiguration() {
    this.configuration = new Configuration({
      headers: {
        Authorization: `Bearer ${await this.genToken()}`,
      },
      fetchApi: this.options.fetchApi,
      basePath: this.options.basePath?.replace(/\/$/, ""),
    });
    this.bearerTokenGeneratedAt = Date.now();
  }

  /**
   * Returns the current bearer token, generating a new one if necessary.
   */
  async getConfiguration() {
    const latestBearerTokenDuration = this.bearerTokenGeneratedAt ? Date.now() - this.bearerTokenGeneratedAt : 0;
    const expirationDurationMs = 1000 * (this.options.expirationDuration ?? DEFAULT_EXPIRATION_DURATION_SECONDS);
    const hasExpired = latestBearerTokenDuration > expirationDurationMs;
    if (!this.configuration || hasExpired) {
      await this.genConfiguration();
    }
    return this.configuration;
  }

  /**
   * Creates an instance of the specified API class.
   * @param apiClass - The API class to instantiate.
   * @returns An instance of the specified API class.
   */
  async create<T extends BaseAPI>(apiClass: new (configuration?: Configuration) => T): Promise<T> {
    return new apiClass(await this.getConfiguration());
  }

  /**
   * Makes an API request.
   * @param context - The request context for the API request.
   * @param initOverrides - (Optional) The request options to use for the API request.
   * @returns The response from the API request.
   */
  async request(context: AppStoreConnectAPIRequest, initOverrides?: RequestInit | InitOverrideFunction) {
    if (!context.url && !context.path) {
      throw new Error("No url or path provided");
    }

    const _context = { ...context };
    if (!_context.path && _context.url) {
      if (_context.url.startsWith(BASE_PATH)) {
        // @ts-ignore
        _context.path = _context.url.replace(BASE_PATH, "");
      } else {
        throw new Error("url must start with " + BASE_PATH);
      }
    }

    if (!_context.method) {
      _context.method = "GET";
    }

    delete _context.url;

    const globalApi = new GlobalAPI(await this.getConfiguration());
    return await globalApi.request(_context as RequestOpts, initOverrides)
  }
}

class GlobalAPI extends BaseAPI {
  constructor(configuration?: Configuration) {
    super(configuration);
  }

  request(context: RequestOpts, initOverrides?: RequestInit | InitOverrideFunction): Promise<Response> {
    return super.request(context, initOverrides);
  }
}

export { AppStoreConnectAPI };
