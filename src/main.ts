// Re-export the lightweight client API — `createClient`, config and client types.
// Prefer this entrypoint when you only need the client runtime without the
// full generated schema surface (see https://github.com/isaced/appstore-connect-sdk/issues/47).
export { createClient, type AppStoreConnectConfig, type Client } from "./client";

// Re-export the complete generated SDK surface (request functions, types,
// JSON schemas and Zod schemas). NOTE: importing this eagerly initializes all
// generated schemas (~500 MiB RSS). Use `appstore-connect-sdk/client` and
// `appstore-connect-sdk/sdk` when possible for a lightweight import.
export * from "./openapi";

// Pagination helpers (paginate, paginateItems, paginateToArray) and error types.
export * from "./paginate";

// Rate-limit header accessors and retry policy types.
export { parseRateLimit, getRateLimit, type RateLimit, type RetryOptions, type RetryInfo } from "./client";
