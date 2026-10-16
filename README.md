# appstore-connect-sdk [![@latest](https://img.shields.io/npm/v/appstore-connect-sdk.svg)](https://www.npmjs.com/package/appstore-connect-sdk) [![downloads](https://img.shields.io/npm/dm/appstore-connect-sdk.svg)](https://www.npmjs.com/package/appstore-connect-sdk) [![Test](https://github.com/isaced/appstore-connect-sdk/actions/workflows/test.yml/badge.svg?branch=main)](https://github.com/isaced/appstore-connect-sdk/actions/workflows/test.yml) [![license](https://img.shields.io/badge/license-MIT-green.svg)](./LICENSE)

The `appstore-connect-sdk` is a Node.js module written in TypeScript that provides a convenient way for developers to interact with the [App Store Connect API](https://developer.apple.com/app-store-connect/api/). The module is built using [@hey-api/openapi-ts](https://github.com/hey-api/openapi-ts) and provides support for all APIs based on the OpenAPI specification.

English | [简体中文](https://github.com/isaced/appstore-connect-sdk/blob/main/README_zh.md)

## Included in this SDK

The `appstore-connect-sdk` module includes the following features:

- **JWT Authentication** - Configure with your API Key and let the SDK handle JWT token signing
- **Smart Token Management** - Tokens are automatically generated, cached, and refreshed before expiration (within 2 minutes of expiry); concurrent requests hitting an expiry share a single token generation
- **Full API Coverage** - ~1,000 endpoints of the App Store Connect API **4.5** spec, generated from Apple's official OpenAPI description
- **Cross-Platform** - Compatible with both Node.js and **Deno** environments

## Installation

```bash
npm install appstore-connect-sdk
```

Requires Node.js **20+**.

You can also install unreleased changes directly from git (the SDK auto-builds on install via `prepare`):

```bash
npm install isaced/appstore-connect-sdk#main
```

## Usage

#### 1. Import `appstore-connect-sdk`

```typescript
import { createClient, appsGetCollection } from "appstore-connect-sdk/sdk";
```

The `sdk` entry covers most use cases at a fraction of the memory footprint of the root import (see [Import entrypoints](#import-entrypoints-memory-footprint)). Use `import ... from "appstore-connect-sdk"` only if you need the generated JSON/Zod schemas from the root surface.

#### 2. Create a client

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
const client = createClient({
  issuerId: "<YOUR ISSUER ID>",
  privateKeyId: "<YOUR PRIVATE KEY ID>",
  privateKey: "<YOUR PRIVATE KEY>",
});
```

**For Individual API Keys:**

```typescript
const client = createClient({
  // No issuerId required for Individual API Keys
  privateKeyId: "<YOUR PRIVATE KEY ID>",
  privateKey: "<YOUR PRIVATE KEY>",
});
```

For more information on how JWT works with the App Store Connect API, check out Apple's authentication guides:

- [Creating API Keys for App Store Connect API](https://developer.apple.com/documentation/appstoreconnectapi/creating_api_keys_for_app_store_connect_api)
- [Generating Tokens for API Requests](https://developer.apple.com/documentation/appstoreconnectapi/generating_tokens_for_api_requests)
- [Revoking API Keys](https://developer.apple.com/documentation/appstoreconnectapi/revoking_api_keys)

**Configuration Options:**

| Option | Type | Required | Description |
|--------|------|----------|-------------|
| `issuerId` | `string` | For Team keys | Your issuer ID from App Store Connect |
| `privateKeyId` | `string` | Yes* | The ID of your private key |
| `privateKey` | `string` | Yes* | The private key content in PEM format |
| `bearerToken` | `string` | No | Provide your own JWT token instead of having the SDK generate one |
| `expirationDuration` | `number` | No | Token expiration in seconds (default: 1200 = 20 minutes, max: 20 minutes) |
| `baseUrl` | `string` | No | Override the API base URL (default: `https://api.appstoreconnect.apple.com`) |

*Required unless `bearerToken` is provided.

#### 3. Make API calls

All API functions are exported from the SDK. Pass the client to each API call.

```typescript
const res = await appsGetCollection({ client });
console.log(res.data);
```

Here's the complete code example:

**For Team API Keys:**

```typescript
import { createClient, appsGetCollection } from "appstore-connect-sdk/sdk";

const client = createClient({
  issuerId: "<YOUR ISSUER ID>",
  privateKeyId: "<YOUR PRIVATE KEY ID>",
  privateKey: "<YOUR PRIVATE KEY>",
});

const res = await appsGetCollection({ client });
console.log(res.data);
```

**For Individual API Keys:**

```typescript
import { createClient, appsGetCollection } from "appstore-connect-sdk/sdk";

const client = createClient({
  // No issuerId for Individual API Keys
  privateKeyId: "<YOUR PRIVATE KEY ID>",
  privateKey: "<YOUR PRIVATE KEY>",
});

const res = await appsGetCollection({ client });
console.log(res.data);
```

### Available API Functions

All API functions follow the naming convention from the OpenAPI spec. Some common examples:

```typescript
import {
  createClient,
  appsGetCollection,
  appsGetInstance,
  buildsGetCollection,
  betaTestersGetCollection,
} from "appstore-connect-sdk/sdk";

const client = createClient({ /* your config */ });

// Get all apps
const apps = await appsGetCollection({ client });

// Get a specific app
const app = await appsGetInstance({ client, path: { id: "app-id" } });

// Get builds for an app
const builds = await buildsGetCollection({ client, query: { "filter[app]": "app-id" } });
```

### Error handling

By default, API functions **do not throw** on non-2xx responses. They resolve to `{ data, error, response }`, where `error` carries Apple's JSON:API error body:

```typescript
const { data, error, response } = await appsGetCollection({ client });

if (error) {
  // e.g. { errors: [{ status: "401", code: "NOT_AUTHORIZED", title: "Unauthorized" }] }
  console.error(error.errors);
} else {
  console.log(data!.data);
}
```

Prefer exceptions? Pass `throwOnError: true` to make a call throw instead:

```typescript
const res = await appsGetCollection({ client, throwOnError: true }); // throws on non-2xx
```

### Pagination

App Store Connect uses cursor-based pagination. Request a page size with `limit`, then follow `links.next`:

```typescript
import type { AppsResponse } from "appstore-connect-sdk/sdk";

const first = await appsGetCollection({ client, query: { limit: 200 } });
const apps = [...first.data?.data ?? []];
let nextUrl = first.data?.links?.next;

while (nextUrl) {
  // `links.next` is an absolute URL; convert it back to a path the client understands
  const next = new URL(nextUrl);
  const res = await client.get({ url: next.pathname + next.search });
  const page = res.data as AppsResponse;
  apps.push(...page.data);
  nextUrl = page.links?.next;
}
```

> Note: don't pass the absolute `links.next` URL directly as `url` — it is resolved against the client's `baseUrl` and produces an invalid request.

### Runtime schema validation (Zod)

Opt-in Zod schemas are available from the `/zod` entry and match the generated API types:

```typescript
import { zAppsResponse } from "appstore-connect-sdk/zod";

const res = await appsGetCollection({ client });
if (res.data) {
  const apps = zAppsResponse.parse(res.data); // throws ZodError if the payload doesn't match the spec
}
```

> Warning: importing `/zod` initializes all ~3,700 generated schemas (~300 MiB heap). Import it only where you actually validate payloads.

### Advanced Usage

For advanced use cases, you can use the client directly for custom requests:

```typescript
import { createClient } from "appstore-connect-sdk/sdk";

const client = createClient({ /* your config */ });

// Use the client directly for custom requests
const response = await client.get({ url: "/v1/apps" });
```

### Overriding the base URL

For integration testing purposes, you can override the base URL of the App Store Connect API by setting the `baseUrl` option. For example, you can use this to point to a local mock server.

```typescript
import { createClient } from "appstore-connect-sdk/sdk";

const client = createClient({
  // ...
  baseUrl: "http://localhost:3000", // All network requests are made to http://localhost:3000
});
```

### Import entrypoints (memory footprint)

The default root import eagerly initializes the full generated surface — ~5,000 Zod and JSON schemas — which adds roughly **450 MiB RSS** to a fresh Node.js process ([#47](https://github.com/isaced/appstore-connect-sdk/issues/47)). If you don't need runtime schema validation, import from a lighter subpath entry (measured on v2.2.1):

| Entry | Contents | Approx. RSS |
|---|---|---|
| `appstore-connect-sdk` | Everything (backward compatible) | ~457 MiB |
| `appstore-connect-sdk/sdk` | Request functions, TS types, `createClient` | ~36 MiB |
| `appstore-connect-sdk/client` | `createClient` and client types only | ~20 MiB |
| `appstore-connect-sdk/schemas` | JSON schemas (opt-in) | — |
| `appstore-connect-sdk/zod` | Zod schemas for runtime validation (opt-in) | — |

```typescript
import { createClient, appsGetCollection } from "appstore-connect-sdk/sdk";
```

If you use a namespace import, switching is a one-line change (the `sdk` entry also provides `createClient`):

```diff
- import * as asc from "appstore-connect-sdk";
+ import * as asc from "appstore-connect-sdk/sdk";
```

## Updating OpenAPI generated code

To update the OpenAPI-generated code, run the following command:

```bash
$ sh gen-openapi.sh
```

This will generate TypeScript code through [@hey-api/openapi-ts](https://github.com/hey-api/openapi-ts) based on the OpenAPI specification file (`app_store_connect_api_4.5_openapi.json`) officially released by Apple.

## Deno Compatibility

The `appstore-connect-sdk` module is compatible with Deno via `npm:` specifiers. An example can be found in the [deno_example](https://github.com/isaced/appstore-connect-sdk/tree/main/deno_example).

> Note: publication to JSR (`jsr:@isaced/appstore-connect-sdk`) is not live yet, so the subpath entries (`/sdk`, `/client`, …) are currently npm-only; Deno users should import the root entry for now.

We are committed to ensuring that the `appstore-connect-sdk` module remains fully compatible with both Node.js and Deno, and we will continue to work on improving its compatibility with Deno as the Deno runtime evolves.

## Examples

Runnable examples live in the repository:

- [Node Example](https://github.com/isaced/appstore-connect-sdk/tree/main/node_example)
- [Deno Example](https://github.com/isaced/appstore-connect-sdk/tree/main/deno_example)

## Kickstart information on the API

- [Automate your workflow with the App Store Connect API](https://developer.apple.com/app-store-connect/api/)
- [App Store Connect API Official Documentation](https://developer.apple.com/documentation/appstoreconnectapi)
- [WWDC 2018 303 - Automating App Store Connect](https://developer.apple.com/videos/play/wwdc2018/303/) (Video)

## Contributing

Contributions of any kind are welcome! See [CONTRIBUTING.md](https://github.com/isaced/appstore-connect-sdk/blob/main/CONTRIBUTING.md) for development setup, testing, and the release process.

## License

**appstore-connect-sdk** is available under the MIT license, and uses source code from open source projects. See the [LICENSE](https://github.com/isaced/appstore-connect-sdk/blob/main/LICENSE) file for more information.

## Author

This project was originally created by [isaced](https://github.com/isaced) but has had many [great contributors](https://github.com/isaced/appstore-connect-sdk/graphs/contributors). We're open to contributions of any kind to make this project even better.
