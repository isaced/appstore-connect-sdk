// Lightweight entrypoint: generated request functions and TypeScript types,
// plus `createClient`, so a `import * as asc from "appstore-connect-sdk"` user
// can switch to this subpath with a one-line change.
// No runtime Zod or JSON schema initialization.
export * from "./openapi/sdk.gen";
export type * from "./openapi/types.gen";
// Explicitly re-export `Options` — the generated `export *` chains don't surface it.
export type { Options } from "./openapi/sdk.gen";
export { createClient, type AppStoreConnectConfig, type Client } from "./client";
export * from "./paginate";
export { parseRateLimit, getRateLimit, type RateLimit, type RetryOptions, type RetryInfo } from "./client";
