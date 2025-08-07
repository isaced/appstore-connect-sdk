# appstore-connect-sdk [![@latest](https://img.shields.io/npm/v/appstore-connect-sdk.svg)](https://www.npmjs.com/package/appstore-connect-sdk)

The `appstore-connect-sdk` is a Node.js module written in TypeScript that provides a convenient way for developers to interact with the [App Store Connect API](https://developer.apple.com/app-store-connect/api/). The module is built on top of the [OpenAPI Generator](https://openapi-generator.tech/) tool and provides support for all APIs based on OpenAPI specification.

English | [简体中文](https://github.com/isaced/appstore-connect-sdk/blob/main/README_zh.md)

## Kickstart information on the API

- [Automate your workflow with the App Store Connect API](https://developer.apple.com/app-store-connect/api/)
- [App Store Connect API Official Documentation](https://developer.apple.com/documentation/appstoreconnectapi)
- [WWDC 2018 303 - Automating App Store Connect](https://developer.apple.com/videos/play/wwdc2018/303/) (Video)

## Included in this SDK

The `appstore-connect-sdk` module includes the following features:

- [x] Configuration with API Key and JWT Logic to sign requests
- [x] Support for custom network libraries for making requests, such as fetch/node-fetch/axios...
- [x] Support for _all_ requests due to OpenAPI generated requests and entities
- [x] Compatibility with both Node.js and **Deno** environments

## Examples

- [Deno Example](https://github.com/isaced/appstore-connect-sdk/tree/main/deno_example)
- [Node Example](https://github.com/isaced/appstore-connect-sdk/tree/main/node_example)

## Installation

```bash
npm install appstore-connect-sdk
```

## Usage

#### 1. Import `appstore-connect-sdk`

```typescript
import { AppStoreConnectAPI } from "appstore-connect-sdk";
```

#### 2. Create your API Configuration

Go to [App Store Connect -> Users and Access -> Keys](https://appstoreconnect.apple.com/access/api) and create your own key. This is also the page to find your `private key ID` and the `issuer ID`.

The SDK supports both **Team API Keys** and **Individual API Keys**:

- **Team API Keys**: Used by teams, requires `issuerId`
- **Individual API Keys**: Used by individual developers, `issuerId` is not required

After downloading your private key, open the `.p8` file containing the private key in a text editor. It should look like this:

```
-----BEGIN PRIVATE KEY-----
AIGTAgEAMBMGByqGSM49AgEGCCqGSM49AwEHBHkwdwIBAQQgKEn1VBakCdHIEcdS
aBWr/9laASzaAbF2LP7wTYjHK52gCgYIKoZIzj0DAQehRANCAAQ/jf2sxRvXEhjn
srw8kJcHvO0dQ1KmUlxZvATsFsjJbdQ1yAENAWItUoeTV0rhdajcdOQxKl1OPse0
nNdXXbA4
-----END PRIVATE KEY-----
```

**For Team API Keys:**

```typescript
const client = new AppStoreConnectAPI({
  issuerId: "<YOUR ISSUER ID>",
  privateKeyId: "<YOUR PRIVATE KEY ID>",
  privateKey: "<YOUR PRIVATE KEY>",
});
```

**For Individual API Keys:**

```typescript
const client = new AppStoreConnectAPI({
  // No issuerId required for Individual API Keys
  privateKeyId: "<YOUR PRIVATE KEY ID>",
  privateKey: "<YOUR PRIVATE KEY>",
});
```

For more information on how JWT works with the App Store Connect API, check out Apple's authentication guides:

- [Creating API Keys for App Store Connect API](https://developer.apple.com/documentation/appstoreconnectapi/creating_api_keys_for_app_store_connect_api)
- [Generating Tokens for API Requests](https://developer.apple.com/documentation/appstoreconnectapi/generating_tokens_for_api_requests)
- [Revoking API Keys](https://developer.apple.com/documentation/appstoreconnectapi/revoking_api_keys)

#### 3. Create an API and perform a request

You can find all available APIs in [src/openapi/apis](https://github.com/isaced/appstore-connect-sdk/tree/main/src/openapi/apis), these classes are generated according to [App Store Connect API - OpenAPI specification](https://developer.apple.com/sample-code/app-store-connect/app-store-connect-openapi-specification.zip), If you encounter any problems, please open an [issue](https://github.com/isaced/appstore-connect-sdk/issues).

```typescript
const api = await client.create(AppsApi);
const res = await api.appsGetCollection();
console.log(res);
```

Here's the complete code example:

**For Team API Keys:**

```typescript
import { AppStoreConnectAPI } from "appstore-connect-sdk";
import {
  AppsApi,
  AppEventLocalizationsApi,
} from "appstore-connect-sdk/openapi";

const client = new AppStoreConnectAPI({
  issuerId: "<YOUR ISSUER ID>",
  privateKeyId: "<YOUR PRIVATE KEY ID>",
  privateKey: "<YOUR PRIVATE KEY>",
});

const api = await client.create(AppsApi);
const res = await api.appsGetCollection();
console.log(res);
```

**For Individual API Keys:**

```typescript
import { AppStoreConnectAPI } from "appstore-connect-sdk";
import {
  AppsApi,
  AppEventLocalizationsApi,
} from "appstore-connect-sdk/openapi";

const client = new AppStoreConnectAPI({
  // No issuerId for Individual API Keys
  privateKeyId: "<YOUR PRIVATE KEY ID>",
  privateKey: "<YOUR PRIVATE KEY>",
});

const api = await client.create(AppsApi);
const res = await api.appsGetCollection();
console.log(res);
```

### Custom network libraries

By default, AppStoreConnectAPI uses its built-in `fetch` function for HTTP requests. Note that this function requires Node.js version **18.0.0** or higher.

However, you can also configure any network library that adheres to the [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/fetch) standard specification by setting the `fetchApi` option in the AppStoreConnectAPI constructor.

```typescript
import { AppStoreConnectAPI } from "appstore-connect-sdk";
import fetch from "node-fetch";

new AppStoreConnectAPI({
  // ...
  fetchApi: fetch as unknown as FetchAPI, // All network requests are made via node-fetch
});
```

### Overriding the base URL

For integration testing purposes, you can override the base path of the App Store Connect API by setting the `basePath` option in the AppStoreConnectAPI constructor. For example, you can use this to point to a local mock server. This allows you to test the behavior of your application in a more controlled environment without making requests to the real API.

```typescript
import { AppStoreConnectAPI } from "appstore-connect-sdk";

new AppStoreConnectAPI({
  // ...
  basePath: "http://localhost:3000", // All network requests are made to http://localhost:3000
});
```

## Updating OpenAPI generated code

To update the OpenAPI-generated code, run the following command:

```bash
$ sh gen-openapi.sh
```

This will generate Typescript code through [OpenAPI Generator](https://openapi-generator.tech/) based on the [OpenAPI specification](https://github.com/isaced/appstore-connect-sdk/blob/fdabb5bb414e9e3c02341ac1fa3238a5bfa15c30/app_store_connect_api_2.2_openapi.json) file officially released by Apple.

## Deno Compatibility

The `appstore-connect-sdk` module is fully compatible with Deno, An example of using the `appstore-connect-sdk` module in a Deno environment can be found in the [deno_example](https://github.com/isaced/appstore-connect-sdk/tree/main/deno_example).

We are committed to ensuring that the `appstore-connect-sdk` module remains fully compatible with both Node.js and Deno, and we will continue to work on improving its compatibility with Deno as the Deno runtime evolves.

## License

**appstore-connect-sdk** is available under the MIT license, and uses source code from open source projects. See the [LICENSE](https://github.com/isaced/appstore-connect-sdk/blob/main/LICENSE) file for more information.

## Author

This project was originally created by [isaced](https://github.com/isaced) but has had many [great contributors](https://github.com/isaced/appstore-connect-sdk/graphs/contributors). We're open to contributions of any kind to make this project even better.
