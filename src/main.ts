import { FetchAPI, BaseAPI } from "./openapi/runtime";
import { Configuration } from "./openapi";
import { generateAuthToken } from "./auth";

interface AppStoreConnectAPIOptions {
  issuerId: string;
  privateKeyId: string;
  privateKey: string;
  fetchApi?: FetchAPI;
}

export default class AppStoreConnectAPI {
  private bearerToken?: string;
  public configuration?: Configuration;

  constructor(options: AppStoreConnectAPIOptions) {
    this.bearerToken = generateAuthToken({
      apiKeyId: options.privateKeyId,
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

  call<T extends BaseAPI>(apiClass: new (configuration?: Configuration) => T): T {
    return new apiClass(this.configuration);
  }
}
