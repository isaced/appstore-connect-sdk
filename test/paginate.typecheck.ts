// Type-level verification for the paginate helpers. Checked via
// `bun check -p tsconfig.typecheck.json`; not executed by bun test.
import { createClient } from "../src/client";
import { appsGetCollection } from "../src/openapi/sdk.gen";
import type { App, AppsResponse } from "../src/openapi/types.gen";
import { paginate, paginateItems, paginateToArray } from "../src/paginate";

const client = createClient({ bearerToken: "test" });

async function checkPageInference() {
  for await (const page of paginate(appsGetCollection, { client, query: { limit: 200 } })) {
    const asResponse: AppsResponse = page;
    const first: App = page.data[0];
    void asResponse;
    void first;
  }
}

async function checkItemInference() {
  for await (const app of paginateItems(appsGetCollection, { client })) {
    const typed: App = app;
    void typed;
  }
}

async function checkArrayInference() {
  const apps: App[] = await paginateToArray(appsGetCollection, {
    client,
    query: { limit: 100 },
    maxItems: 100,
  });
  void apps;
}

void checkPageInference;
void checkItemInference;
void checkArrayInference;
