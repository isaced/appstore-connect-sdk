import "https://deno.land/std@0.177.0/dotenv/load.ts";
import AppStoreConnectAPI from "npm:appstore-connect-sdk@0.0.5";
import { AppsApi } from "npm:appstore-connect-sdk@0.0.5/dist/openapi/apis/index.js";

// Create a new instance of the AppStoreConnectAPI client with the required parameters.
const client = new AppStoreConnectAPI.default({
    // issuerId: Deno.env.get('ISSUER_ID')!,
    // privateKeyId: Deno.env.get('PRIVATE_KEY_ID')!,
    // privateKey: Deno.env.get('PRIVATE_KEY')!,
    bearerToken: Deno.env.get('BEARER_TOKEN')!,
});

// Test case to get a list of apps.
const res = await client.call(AppsApi).appsGetCollection();
console.log(res);
