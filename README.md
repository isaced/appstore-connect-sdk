# appstoreconnect-api [![@latest](https://img.shields.io/npm/v/appstore-connect-sdk.svg)](https://www.npmjs.com/package/appstore-connect-sdk)
An App Store Connect API client for Node.js

## Installation

```bash
npm install appstoreconnect-api
```

## Usage

```typescript
import AppStoreConnectAPI from 'appstore-connect-sdk';
import { AppsApi, AppEventLocalizationsApi } from 'appstore-connect-sdk/dist/openapi/apis';

const appStoreConnect = new AppStoreConnectAPI({
  apiKey: API_KEY_ID,
  issuerId: ISSUER_ID,
  privateKey: P8_FILE_CONTENT,
});

const api = new AppsApi(appStoreConnect.configuration);
const res = await api.appsAppEventsGetToManyRelated({ id: APP_ID });

console.log(res);
// {...}
```

## Update OpenAPI generated code

Run the following:

```bash
$ make update
```

## License

MIT
