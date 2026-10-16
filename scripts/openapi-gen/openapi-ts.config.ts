import { defineConfig } from "@hey-api/openapi-ts";

export default defineConfig({
  input: "./spec.generated.json",
  output: {
    path: "../../src/openapi",
  },
  plugins: [
    "@hey-api/typescript",
    "@hey-api/client-fetch",
    "@hey-api/sdk",
    {
      name: "@hey-api/schemas",
      type: "json",
      exportFromIndex: true,
    },
    {
      name: "zod",
      exportFromIndex: true,
    },
  ],
});
