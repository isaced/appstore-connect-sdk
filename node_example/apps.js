import 'dotenv/config';
import {
  createClient,
  paginateItems,
  getRateLimit,
  appsGetCollection,
} from "appstore-connect-sdk/sdk";

// Create a client. Two credential styles (pick one):
// 1. PRIVATE_KEY_PATH -> .p8 file, privateKeyId inferred from AuthKey_<ID>.p8
// 2. PRIVATE_KEY      -> inline PEM from the env
const client = createClient(
  process.env.PRIVATE_KEY_PATH
    ? { issuerId: process.env.ISSUER_ID, privateKeyPath: process.env.PRIVATE_KEY_PATH }
    : {
        issuerId: process.env.ISSUER_ID,
        privateKeyId: process.env.PRIVATE_KEY_ID,
        privateKey: process.env.PRIVATE_KEY,
      },
);

// Stream the first 10 apps across pages — `paginateItems` follows `links.next`
// lazily (only fetches another page when the loop asks) and 429 responses are
// retried automatically at the fetch layer.
console.log("First 10 apps:");
let seen = 0;
for await (const app of paginateItems(appsGetCollection, { client, query: { limit: 10 } })) {
  console.log(`- ${app.id}  ${app.attributes?.name}`);
  if (++seen >= 10) break;
}

// Read the hourly quota off any response.
const { response } = await appsGetCollection({ client, query: { limit: 1 } });
console.log("Rate limit:", getRateLimit(response));
