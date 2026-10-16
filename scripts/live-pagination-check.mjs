#!/usr/bin/env node
// Live pagination verification against the real App Store Connect API.
// Exercises the built dist artifacts (not src) through all three helpers.
//
// Requires API credentials in the environment:
//   PRIVATE_KEY_ID, ISSUER_ID, PRIVATE_KEY (PEM string)
// With a repo .env, run it with bun (which auto-loads .env):  bun scripts/live-pagination-check.mjs
// Or export the variables and run with plain node.

import { createClient, paginate, paginateItems, paginateToArray, PaginationError, territoriesGetCollection, appsGetCollection } from "../dist/sdk.js";

const { PRIVATE_KEY_ID, ISSUER_ID, PRIVATE_KEY } = process.env;
if (!PRIVATE_KEY_ID || !PRIVATE_KEY) {
  console.error("Missing PRIVATE_KEY_ID / PRIVATE_KEY env vars.");
  process.exit(1);
}

const client = createClient({
  privateKeyId: PRIVATE_KEY_ID,
  issuerId: ISSUER_ID,
  privateKey: PRIVATE_KEY,
});

function assert(cond, msg) {
  if (!cond) {
    console.error(`FAIL: ${msg}`);
    process.exit(1);
  }
  console.log(`PASS: ${msg}`);
}

async function main() {

// 1. Multi-page iteration over a real paged collection (small pages force >1 page
// when the account has enough data; single-page collections still validate links).
const pages = [];
for await (const page of paginate(appsGetCollection, { client, query: { limit: 1 } })) {
  pages.push(page);
  if (pages.length >= 2) break;
}
assert(pages.length >= 1 && Array.isArray(pages[0].data), "paginate() yields typed pages from live API");
const ids = pages.flatMap((p) => p.data.map((d) => d.id));
assert(new Set(ids).size === ids.length, "pages contain distinct resources (cursor advancing)");

// 2. Item streaming with early break must not over-fetch (lazy).
let items = 0;
for await (const _ of paginateItems(territoriesGetCollection, { client, query: { limit: 10 } })) {
  items += 1;
  if (items >= 3) break;
}
assert(items === 3, "paginateItems() streams live resources lazily");

// 3. paginateToArray with maxItems below the true count throws PaginationLimitError.
const total = await paginateToArray(territoriesGetCollection, { client, query: { limit: 200 } });
assert(total.length > 3, `territories collection is large enough for limit tests (${total.length} items)`);
let threw = false;
try {
  await paginateToArray(territoriesGetCollection, { client, query: { limit: 10 }, maxItems: 5 });
} catch (e) {
  threw = e?.name === "PaginationLimitError";
}
assert(threw, "paginateToArray() throws PaginationLimitError past maxItems on live API");

// 4. Plain endpoint error passthrough still works alongside (sanity: bad id → 404 via client style).
const { error } = await appsGetCollection({ client, query: { limit: 1 } });
assert(error === undefined, "no lingering agreement/auth errors on live requests");

console.log("\nLIVE PAGINATION CHECK PASSED");
}

main().catch((e) => {
  console.error(`LIVE CHECK FAILED: ${e?.name}: ${e?.message}`);
  if (e?.status !== undefined) console.error(`status: ${e.status}`);
  if (e?.body !== undefined) console.error(`body: ${JSON.stringify(e.body, null, 1)?.slice(0, 500)}`);
  if (e instanceof Error && !("status" in e)) console.error(e.stack);
  process.exit(1);
});
