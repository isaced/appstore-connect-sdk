import { FetchAPI } from "./openapi/runtime";
import { Configuration } from "./openapi";
import { generateAuthToken } from "./auth";

interface AppStoreConnectAPIOptions {
  apiKey: string;
  issuerId: string;
  privateKey: string;
  fetchApi?: FetchAPI;
}

export default class AppStoreConnectAPI {
  private bearerToken?: string;
  public configuration?: Configuration;

  constructor(options: AppStoreConnectAPIOptions) {
    this.bearerToken = generateAuthToken({
      apiKeyId: options.apiKey,
      issuerId: options.issuerId,
      privateKey: options.privateKey,
    });

    this.configuration = new Configuration({
      headers: {
        Authorization: `Bearer ${this.bearerToken}`,
      },
      fetchApi: options.fetchApi,
    });
  }
}
