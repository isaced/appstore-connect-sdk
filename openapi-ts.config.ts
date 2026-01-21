import { defineConfig } from "@hey-api/openapi-ts";

export default defineConfig({
  input: "./app_store_connect_api_4.2_openapi.json",
  output: {
    path: "src/openapi",
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
