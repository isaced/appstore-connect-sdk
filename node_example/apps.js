import { createClient, appsGetCollection } from "appstore-connect-sdk";
import 'dotenv/config';

// Create a client with the required parameters.
const client = createClient({
  issuerId: process.env.ISSUER_ID,
  privateKeyId: process.env.PRIVATE_KEY_ID,
  privateKey: process.env.PRIVATE_KEY,
});

// Fetch all apps
const res = await appsGetCollection({ client });
if (res.error) {
  throw new Error(`Error fetching apps: ${JSON.stringify(res.error)}`);
}
console.log(res.data);
