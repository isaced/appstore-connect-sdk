// Opt-in entrypoint: generated Zod schemas only. Importing this initializes
// all ~3700 Zod schemas (~300 MiB heap) — only import when you need runtime validation.
export * from "./openapi/zod.gen";
