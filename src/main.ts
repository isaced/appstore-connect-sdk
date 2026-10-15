// Re-export the lightweight client API — `createClient`, config and client types.
// Prefer this entrypoint when you only need the client runtime without the
// full generated schema surface (see https://github.com/isaced/appstore-connect-sdk/issues/47).
export { createClient, type AppStoreConnectConfig, type Client } from "./client";

// Re-export the complete generated SDK surface (request functions, types,
// JSON schemas and Zod schemas). NOTE: importing this eagerly initializes all
// generated schemas (~500 MiB RSS). Use `appstore-connect-sdk/client` and
// `appstore-connect-sdk/sdk` when possible for a lightweight import.
export * from "./openapi";
