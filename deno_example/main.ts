import "@std/dotenv/load";
import { AppStoreConnectAPI } from "appstore-connect-sdk";
import { AppsApi } from "appstore-connect-sdk/openapi";

// Create a new instance of the AppStoreConnectAPI client with the required parameters.
const client = new AppStoreConnectAPI({
  issuerId: Deno.env.get("ISSUER_ID")!,
  privateKeyId: Deno.env.get("PRIVATE_KEY_ID")!,
  privateKey: Deno.env.get("PRIVATE_KEY")!,
  // bearerToken: Deno.env.get("BEARER_TOKEN")!,
});

// Test case to get a list of apps.
const api = await client.create(AppsApi);
const res = await api.appsGetCollection();
console.log(res);
