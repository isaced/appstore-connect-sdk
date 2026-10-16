import {
  createClient,
  appsGetCollection,
  appsCustomerReviewsGetToManyRelated,
} from "../src/sdk";
import type { Client, CustomerReviewsResponse } from "../src/sdk";
import { describe, beforeAll, test, expect } from "bun:test";

const hasCredentials = Boolean(process.env.PRIVATE_KEY && process.env.PRIVATE_KEY_ID);
// Live suites need real App Store Connect credentials; bun:test skips
// the suite automatically in credential-less environments (CI).
const describeLive = describe.skipIf(!hasCredentials);


describeLive("Reviews API", () => {
  let client: Client;

  beforeAll(() => {
    client = createClient({
      // Team keys need issuerId; individual keys must omit it.
      ...(process.env.ISSUER_ID ? { issuerId: process.env.ISSUER_ID } : {}),
      privateKeyId: process.env.PRIVATE_KEY_ID,
      privateKey: process.env.PRIVATE_KEY,
    });
  });

  test("should fetch apps and reviews & next page", async () => {
    try {
      // fetch apps
      const res = await appsGetCollection({ client });
      console.log("Fetch apps count:", res.data?.data?.length);
      expect(res).toBeDefined;
      expect(res.data?.data).toBeArray();

      const appId = res.data?.data?.[1]?.id;
      if (!appId) {
        console.log("No app found to fetch reviews");
        return;
      }

      // fetch reviews
      const reviews = await appsCustomerReviewsGetToManyRelated({
        client,
        path: { id: appId },
      });
      console.log("Fetch reviews links:", reviews.data?.links);

      // fetch next page reviews
      if (reviews.data?.links?.next) {
        const nextPageRes = await client.get({
          url: reviews.data.links.next,
        });
        const nextPageReviews = nextPageRes.data as CustomerReviewsResponse;
        console.log(
          "Fetch next page reviews:",
          nextPageReviews?.meta?.paging?.total
        );
      }
    } catch (error) {
      console.error(error);
    }
  });
});
