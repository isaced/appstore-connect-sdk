import { AppsApi, CustomerReviewsResponse } from "../src/openapi";
import { AppStoreConnectAPI } from "../src/main";
import { describe, beforeAll, test, expect } from "bun:test";

describe("AppStoreConnectAPI", () => {
    let client: AppStoreConnectAPI;

    beforeAll(() => {
        client = new AppStoreConnectAPI({
            // if use individual key, don't provide issuerId
            // issuerId: process.env.ISSUER_ID,
            privateKeyId: process.env.PRIVATE_KEY_ID,
            privateKey: process.env.PRIVATE_KEY,
        });
    });

    test("should fetch apps and reviews & next page", async () => {
        try {
            const api = await client.create(AppsApi);

            // fetch apps
            const res = await api.appsGetCollection();
            console.log('Fetch apps count:', res.data.length);
            expect(res).toBeDefined;
            expect(res.data).toBeArray();

            const appId = res.data[1].id;

            // fetch reviews
            const reviews = await api.appsCustomerReviewsGetToManyRelated({ id: appId });
            console.log('Fetch reviews links:', reviews.links);

            // fetch next page reviews
            if (reviews.links.next) {
                const nextPageRes = await client.request({
                    url: reviews.links.next
                })
                const nextPageReviews = (await nextPageRes.json()) as CustomerReviewsResponse
                console.log('Fetch next page reviews:', nextPageReviews.meta?.paging.total);
            }
        } catch (error) {
            console.error(error);
        }
    });
});
