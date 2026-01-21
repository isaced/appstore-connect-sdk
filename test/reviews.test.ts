import {
  createClient,
  appsGetCollection,
  appsCustomerReviewsGetToManyRelated,
  type Client,
} from "../src/main";
import type { CustomerReviewsResponse } from "../src/openapi";
import { describe, beforeAll, test, expect } from "bun:test";

describe("Reviews API", () => {
  let client: Client;

  beforeAll(() => {
    client = createClient({
      // if use individual key, don't provide issuerId
      // issuerId: process.env.ISSUER_ID,
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
