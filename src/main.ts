import { FetchAPI, BaseAPI } from "./openapi/runtime";
import { Configuration } from "./openapi";
import { generateAuthToken } from "./auth";

/**
 * Options for configuring the AppStoreConnectAPI instance.
 */
interface AppStoreConnectAPIOptions {
  /**
   * The issuer ID associated with the private key.
   */
  issuerId: string;

  /**
   * The ID of the private key.
   */
  privateKeyId: string;

  /**
   * The private key in PEM format.
   */
  privateKey: string;

  /**
   * An optional FetchAPI instance to use for making HTTP requests.
   */
  fetchApi?: FetchAPI;
}

/**
 * The App Store Connect SDK for Node.js is written in TypeScript and supports all APIs
 * based on OpenAPI Generator.
 * 
 * https://github.com/isaced/appstore-connect-sdk
 */
export default class AppStoreConnectAPI {
  private bearerToken?: string;
  public configuration?: Configuration;

  /**
   * Creates an instance of the AppStoreConnectAPI.
   * @param options - The configuration options for the API.
   * @param options.issuerId - The issuer ID for generating JWT token.
   * @param options.privateKeyId - The ID of the private key used for generating JWT token.
   * @param options.privateKey - The content of the private key used for generating JWT token.
   * @param options.fetchApi - (Optional) The FetchAPI implementation to use for API requests.
   */
  constructor(options: AppStoreConnectAPIOptions) {
    // Generate an authentication token using the provided options.
    this.bearerToken = generateAuthToken({
      apiKeyId: options.privateKeyId,
      issuerId: options.issuerId,
      privateKey: options.privateKey,
    });

    // Create a Configuration object with the authentication token and any provided FetchAPI implementation.
    this.configuration = new Configuration({
      headers: {
        Authorization: `Bearer ${this.bearerToken}`,
      },
      fetchApi: options.fetchApi,
    });
  }

  /**
  * Calls the specified API class using the current Configuration object.
  * @param apiClass - The API class to instantiate.
  * @returns An instance of the specified API class.
  */
  call<T extends BaseAPI>(apiClass: new (configuration?: Configuration) => T): T {
    return new apiClass(this.configuration);
  }
}
