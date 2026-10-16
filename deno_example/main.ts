import "jsr:@std/dotenv/load";
// Deno consumes the npm package through `npm:` specifiers; the `/sdk`
// lightweight entry is recommended (see README "Import entrypoints").
import { createClient, appsGetCollection } from "appstore-connect-sdk/sdk";

// Create a client with the required parameters.
const client = createClient({
  issuerId: Deno.env.get("ISSUER_ID")!,
  privateKeyId: Deno.env.get("PRIVATE_KEY_ID")!,
  privateKey: Deno.env.get("PRIVATE_KEY")!,
  // bearerToken: Deno.env.get("BEARER_TOKEN")!,
});

// Fetch all apps
const res = await appsGetCollection({ client });
if (res.error) {
  throw new Error(`Error fetching apps: ${JSON.stringify(res.error)}`);
}
console.log(res.data);
