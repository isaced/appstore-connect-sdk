import "https://deno.land/std@0.193.0/dotenv/load.ts";
import AppStoreConnectAPI from "https://esm.sh/appstore-connect-sdk@1.0.0-beta.1";
import { AppsApi } from "https://esm.sh/appstore-connect-sdk@1.0.0-beta.1/dist/openapi/apis/index.js";

// Create a new instance of the AppStoreConnectAPI client with the required parameters.
const client = new AppStoreConnectAPI({
  issuerId: Deno.env.get("ISSUER_ID")!,
  privateKeyId: Deno.env.get("PRIVATE_KEY_ID")!,
  privateKey: Deno.env.get("PRIVATE_KEY")!,
  // bearerToken: Deno.env.get("BEARER_TOKEN")!,
});

// Test case to get a list of apps.
let api = await client.create(AppsApi);
const res = await api.appsGetCollection();
console.log(res);
