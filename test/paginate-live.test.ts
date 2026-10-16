// Live verification of the pagination helpers against the real App Store
// Connect API. Skipped automatically when no credentials are present (CI).
// Run locally with a populated .env:  bun test ./test/paginate-live.test.ts
import { describe, test, expect, beforeAll } from "bun:test";
import { createClient } from "../src/client";
import type { Client } from "../src/openapi/client";
import { appsGetCollection, territoriesGetCollection } from "../src/openapi/sdk.gen";
import { paginate, paginateItems, paginateToArray, PaginationLimitError } from "../src/paginate";

const hasCredentials = Boolean(process.env.PRIVATE_KEY && process.env.PRIVATE_KEY_ID);

let client: Client;

// Territories is a public collection (~175 items) present on every account,
// so multi-page flows are deterministic regardless of the account's apps.
describe.skipIf(!hasCredentials)("paginate against the live API", () => {
  beforeAll(() => {
    client = createClient({
      privateKeyId: process.env.PRIVATE_KEY_ID,
      issuerId: process.env.ISSUER_ID,
      privateKey: process.env.PRIVATE_KEY,
    });
  });
  test(
    "follows links.next across pages with working auth",
    async () => {
      const pages = [];
      for await (const page of paginate(territoriesGetCollection, { client, query: { limit: 10 } })) {
        pages.push(page);
        if (pages.length >= 2) break;
      }
      expect(pages.length).toBe(2);
      const ids = pages.flatMap((p) => p.data.map((d: { id: string }) => d.id));
      expect(ids).toHaveLength(20);
      // regression: follow-ups must carry Authorization (missing `security`
      // on raw client.get() produced 401 PaginationError against live API)
      expect(new Set(ids).size).toBe(20);
    },
    30_000,
  );

  test(
    "paginateItems streams resources lazily",
    async () => {
      let seen = 0;
      const names: string[] = [];
      for await (const territory of paginateItems(territoriesGetCollection, {
        client,
        query: { limit: 10 },
      })) {
        names.push(territory.id);
        if (++seen >= 3) break;
      }
      expect(seen).toBe(3);
      expect(new Set(names).size).toBe(3);
    },
    30_000,
  );

  test(
    "paginateToArray throws PaginationLimitError past maxItems",
    async () => {
      let caught: unknown;
      try {
        await paginateToArray(territoriesGetCollection, { client, query: { limit: 10 }, maxItems: 5 });
      } catch (e) {
        caught = e;
      }
      expect(caught).toBeInstanceOf(PaginationLimitError);
      expect((caught as PaginationLimitError).maxItems).toBe(5);
    },
    30_000,
  );

  test(
    "paginate yields a typed page for account-scoped collections",
    async () => {
      for await (const page of paginate(appsGetCollection, { client, query: { limit: 1 } })) {
        if (page.data.length > 0) {
          expect(page.data[0].type).toBe("apps");
        }
        break;
      }
    },
    30_000,
  );
});
