# appstoreconnect-api [![@latest](https://img.shields.io/npm/v/appstore-connect-sdk.svg)](https://www.npmjs.com/package/appstore-connect-sdk)

App Store Connect SDK for Nodejs, written in Typescript, supports all APIs based on OpenAPI Generator.

## Kickstart information on the API

- [Automate your workflow with the App Store Connect API](https://developer.apple.com/app-store-connect/api/)
- [App Store Connect API Official Documentation](https://developer.apple.com/documentation/appstoreconnectapi)
- [WWDC 2018 303 - Automating App Store Connect](https://developer.apple.com/videos/play/wwdc2018/303/) (Video)

## Included in this SDK

- [x] Configuration with API Key
- [x] JWT Logic to sign requests
- [x] Support custom network libraries for making requests, such as fetch/node-fetch/axios...
- [x] Supports _all_ requests due to OpenAPI generated requests and entities

## Installation

```bash
npm install appstore-connect-sdk
```

## Usage

#### 1. Import `appstore-connect-sdk`

```typescript
import AppStoreConnectAPI from 'appstore-connect-sdk';
```

#### 2. Create your API Configuration

Go to [App Sotre Connect -> Users and Access -> Keys](https://appstoreconnect.apple.com/access/api) and create your own key. This is also the page to find your `private key ID` and the `issuer ID`.

After downloading your private key, you can open the `.p8` file containing the private key in a text editor which will show like the following content:

```
-----BEGIN PRIVATE KEY-----
AIGTAgEAMBMGByqGSM49AgEGCCqGSM49AwEHBHkwdwIBAQQgKEn1VBakCdHIEcdS
aBWr/9laASzaAbF2LP7wTYjHK52gCgYIKoZIzj0DAQehRANCAAQ/jf2sxRvXEhjn
srw8kJcHvO0dQ1KmUlxZvATsFsjJbdQ1yAENAWItUoeTV0rhdajcdOQxKl1OPse0
nNdXXbA4
-----END PRIVATE KEY-----
```

Now use this `Private Key` together with the `isuer ID` and the `private key ID` to create your configuration:

```typescript
const appStoreConnect = new AppStoreConnectAPI({
  issuerId: "<YOUR ISSUER ID>",
  privateKeyId: "<YOUR PRIVATE KEY ID>",
  privateKey: "<YOUR PRIVATE KEY>",
});
```

#### 3. Create an API and perform a request

You can find all available APIs in [src/openapi/apis](https://github.com/isaced/appstore-connect-sdk/tree/main/src/openapi/apis), these classes are generated according to [App Store Connect API - OpenAPI specification](https://developer.apple.com/sample-code/app-store-connect/app-store-connect-openapi-specification.zip), if you encounter missing or any problem, please open an [issue](https://github.com/isaced/appstore-connect-sdk/issues).

```typescript
const api = new AppsApi(appStoreConnect.configuration);
const res = await api.appsAppEventsGetToManyRelated({ id: APP_ID });
console.log(res);
```

#### The complete code example above

```typescript
import AppStoreConnectAPI from 'appstore-connect-sdk';
import { AppsApi, AppEventLocalizationsApi } from 'appstore-connect-sdk/dist/openapi/apis';

const appStoreConnect = new AppStoreConnectAPI({
  issuerId: "<YOUR ISSUER ID>",
  privateKeyId: "<YOUR PRIVATE KEY ID>",
  privateKey: "<YOUR PRIVATE KEY>",
});

const api = new AppsApi(appStoreConnect.configuration);
const res = await api.appsAppEventsGetToManyRelated({ id: APP_ID });
console.log(res);
```

### Custom network libraries

In order to adapt to different projects, it is supported to configure any network library to take over HTTP requests, just follow the [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/fetch) standard specification and set `fetchApi` in the `AppStoreConnectAPI` option.

```typescript
import AppStoreConnectAPI from 'appstore-connect-sdk';
import { FetchAPI } from "./../src/openapi/runtime";
import fetch from 'node-fetch';

new AppStoreConnectAPI({
    // ...
    fetchApi: fetch as FetchAPI,  // All network requests are made via node-fetch
});
```

## Update OpenAPI generated code

Run the following:

```bash
$ sh gen-openapi.sh
```

This will generate Typescript code through [OpenAPI Generator](https://openapi-generator.tech/) based on the [OpenAPI specification](https://github.com/isaced/appstore-connect-sdk/blob/fdabb5bb414e9e3c02341ac1fa3238a5bfa15c30/app_store_connect_api_2.2_openapi.json) file officially released by Apple.

## License

**appstore-connect-sdk** is available under the MIT license, and uses source code from open source projects. See the [LICENSE](https://github.com/isaced/appstore-connect-sdk/blob/main/LICENSE) file for more info.

## Author

This project is originally created by [isaced](https://github.com/isaced) but has a lot of [great contributors](https://github.com/isaced/appstore-connect-sdk/graphs/contributors). We're open for contributions of any kind to make this project even better.
