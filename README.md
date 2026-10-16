# appstore-connect-sdk [![@latest](https://img.shields.io/npm/v/appstore-connect-sdk.svg)](https://www.npmjs.com/package/appstore-connect-sdk) [![downloads](https://img.shields.io/npm/dm/appstore-connect-sdk.svg)](https://www.npmjs.com/package/appstore-connect-sdk) [![Test](https://github.com/isaced/appstore-connect-sdk/actions/workflows/test.yml/badge.svg?branch=main)](https://github.com/isaced/appstore-connect-sdk/actions/workflows/test.yml) [![license](https://img.shields.io/badge/license-MIT-green.svg)](./LICENSE)

The `appstore-connect-sdk` is a Node.js module written in TypeScript that provides a convenient way for developers to interact with the [App Store Connect API](https://developer.apple.com/app-store-connect/api/). The module is built using [@hey-api/openapi-ts](https://github.com/hey-api/openapi-ts) and provides support for all APIs based on the OpenAPI specification.

English | [简体中文](https://github.com/isaced/appstore-connect-sdk/blob/main/README_zh.md)

## Included in this SDK

The `appstore-connect-sdk` module includes the following features:

- **JWT Authentication** - Configure with your API Key and let the SDK handle JWT token signing
- **Smart Token Management** - Tokens are automatically generated, cached, and refreshed before expiration (within 2 minutes of expiry); concurrent requests hitting an expiry share a single token generation
- **Pagination Helpers** - `paginate`, `paginateItems`, and `paginateToArray` follow `links.next` automatically with typed results
- **Rate-Limit Aware** - Typed access to the `X-Rate-Limit` header, with automatic retry of 429 responses on idempotent requests
- **Full API Coverage** - ~1,000 endpoints of the App Store Connect API **4.5.1** spec, generated from Apple's official OpenAPI description
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

App Store Connect uses cursor-based pagination. The SDK provides three helpers (exported from the `/sdk` and root entries) that follow `links.next` for you:

```typescript
import { createClient, paginate, paginateItems, paginateToArray, appsGetCollection } from "appstore-connect-sdk/sdk";

// 1. Iterate pages (lazily — the next page is fetched only when you continue the loop)
for await (const page of paginate(appsGetCollection, { client, query: { limit: 200 } })) {
  for (const app of page.data) console.log(app.id);
}

// 2. Iterate individual resources across all pages
for await (const app of paginateItems(appsGetCollection, { client })) {
  console.log(app.attributes?.name);
}

// 3. Collect everything into an array (bounded — recommended for large collections)
const apps = await paginateToArray(appsGetCollection, { client, maxItems: 5000 });
```

Unlike the plain endpoint functions (which resolve to `{ data, error }`), the pagination helpers **throw** when any page fails: `PaginationError` (carries `status` and Apple's error body, and also guards against `links.next` URLs that don't belong to your client's `baseUrl`) or `PaginationLimitError` (when `paginateToArray` would exceed `maxItems`).

<details>
<summary>How it works under the hood</summary>

`links.next` is an absolute URL, while the generated client resolves `url` as `baseUrl + path` — passing the absolute URL directly produces an invalid request. The helpers validate that each `links.next` starts with the client's `baseUrl`, strip the prefix, and re-request the remainder via `client.get({ url: "/v1/...?cursor=..." })`, stopping when `links.next` is absent.

For hard cancellation, pass a wrapping `fetch` in the options (e.g. one built around an `AbortSignal`) — `fetch` and `headers` are forwarded to every follow-up request; the generated client itself doesn't take a per-request `signal`.

</details>

### Rate limiting & retries

App Store Connect returns quota info on every response (`X-Rate-Limit: user-hour-lim:3600;user-hour-rem:3593;`) and answers `429` when throttled. Read the quota from any call:

```typescript
import { getRateLimit } from "appstore-connect-sdk/client";

const { data, error, response } = await appsGetCollection({ client });
const [userHour] = getRateLimit(response);
// { dimension: "user-hour", limit: 3600, remaining: 3592 }
```

`createClient` retries throttled responses automatically — by default only idempotent methods (`GET`/`HEAD`) on `429`, up to 3 retries, honoring the server's `Retry-After` (capped at 60s) with exponential backoff + jitter otherwise:

```typescript
const client = createClient({
  /* credentials */
  retry: {
    maxRetries: 5,
    statusCodes: [429, 503],     // opt in to retryable 5xx
    onRetry: ({ attempt, status, delayMs, method, url }) =>
      console.warn(`retry #${attempt} after ${status} in ${Math.round(delayMs)}ms`),
  },
  // retry: false                 // disable entirely
});
```

Notes:

- Retrying happens at the fetch layer, so generated endpoints, raw `client.get()`, and `paginate*()` follow-ups all share the same policy
- When retries are exhausted the last response is returned as-is (`{ data, error, response }`); nothing throws
- Writing requests (`POST`/`PATCH`/`DELETE`) are never retried — the API has no idempotency keys, and requests carrying a body can't be replayed even when listed in `methods`
- Passing a per-request `options.fetch` replaces the SDK's retry wrapper for that request

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

To fetch the latest OpenAPI specification from Apple and regenerate the SDK code, run:

```bash
$ npm run update:spec
```

This downloads Apple's official spec zip, replaces the committed `app_store_connect_api_<version>_openapi.json`, updates references to it, and re-runs the [@hey-api/openapi-ts](https://github.com/hey-api/openapi-ts) codegen whenever the spec version or content changes. The codegen runs from a pinned toolchain in `scripts/openapi-gen` (isolated from the repo's TypeScript). If you edited the committed spec file directly, regenerate without downloading via `sh gen-openapi.sh`.

In addition, a scheduled GitHub Action (Spec Update) checks for a new Apple spec once a day and automatically opens a pull request with the synced spec and regenerated code when a new version is available.

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
