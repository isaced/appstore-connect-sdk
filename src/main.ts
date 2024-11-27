import type { FetchAPI, BaseAPI } from "./openapi/runtime";
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
   * The time (in seconds) until the token expires (default 10 minutes)
   */
  expirationTime?: number;

  /**
   * The base path for the API (without trailing slash, default https://api.appstoreconnect.apple.com).
   */
  basePath?: string;
}

/**
 * The App Store Connect SDK for Node.js is written in TypeScript and supports all APIs
 * based on OpenAPI Generator.
 *
 * https://github.com/isaced/appstore-connect-sdk
 */
class AppStoreConnectAPI {
  private bearerTokenGeneratedAt = 0;
  private options: AppStoreConnectAPIOptions;
  private configuration?: Configuration;

  /**
   * Creates an instance of the AppStoreConnectAPI.
   * @param options - The configuration options for the API.
   * @param options.issuerId - The issuer ID for generating JWT token.
   * @param options.privateKeyId - The ID of the private key used for generating JWT token.
   * @param options.privateKey - The content of the private key used for generating JWT token.
   * @param options.fetchApi - (Optional) The FetchAPI implementation to use for API requests.
   * @param options.bearerToken - (Optional) A pre-generated bearer token to use for authentication.
   * @param options.expirationTime - (Optional) The time (in seconds) until the token expires (default 10 minutes)
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
    } else if (this.options.privateKeyId && this.options.issuerId && this.options.privateKey) {
      return await generateAuthToken({
        apiKeyId: this.options.privateKeyId,
        issuerId: this.options.issuerId,
        privateKey: this.options.privateKey,
        expirationTime: this.options.expirationTime,
      });
    } else {
      throw "No bearerToken!!!";
    }
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
    const hasExpired =
      this.bearerTokenGeneratedAt && Date.now() - this.bearerTokenGeneratedAt > 1000 * this.options.expirationTime!;
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
}

export { AppStoreConnectAPI };
