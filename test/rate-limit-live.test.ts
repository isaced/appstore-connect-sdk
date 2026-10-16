// Live check of the X-Rate-Limit header shape (no request spam: we only
// observe the header the API already returns on every response).
import { describe, test, expect, beforeAll } from "bun:test";
import { createClient, getRateLimit, parseRateLimit } from "../src/client";
import type { Client } from "../src/openapi/client";
import { territoriesGetCollection } from "../src/openapi/sdk.gen";

const hasCredentials = Boolean(process.env.PRIVATE_KEY && process.env.PRIVATE_KEY_ID);

let client: Client;

describe.skipIf(!hasCredentials)("rate limit against the live API", () => {
  beforeAll(() => {
    client = createClient({
      privateKeyId: process.env.PRIVATE_KEY_ID,
      issuerId: process.env.ISSUER_ID,
      privateKey: process.env.PRIVATE_KEY,
    });
  });
  test(
    "every response carries a parseable user-hour dimension",
    async () => {
      const { response } = await territoriesGetCollection({ client, query: { limit: 1 } });
      const limits = getRateLimit(response);
      const userHour = limits.find((l) => l.dimension === "user-hour");
      expect(userHour).toBeDefined();
      expect(userHour!.limit).toBeGreaterThan(0);
      expect(userHour!.remaining).toBeGreaterThanOrEqual(0);
      expect(userHour!.remaining).toBeLessThanOrEqual(userHour!.limit);
    },
    15_000,
  );

  test(
    "retrying a request consumes quota (rem decreases)",
    async () => {
      // Two sequential GETs; the header's remaining must decrease, proving
      // observed quota is per-token and the accessor tracks live reality.
      const a = await territoriesGetCollection({ client, query: { limit: 1 } });
      const b = await territoriesGetCollection({ client, query: { limit: 1 } });
      const remA = getRateLimit(a.response)[0]?.remaining;
      const remB = getRateLimit(b.response)[0]?.remaining;
      expect(typeof remA).toBe("number");
      expect(remB).toBeLessThan(remA!);
    },
    15_000,
  );

  test("raw header stays in the documented lim/rem format", async () => {
    const { response } = await territoriesGetCollection({ client, query: { limit: 1 } });
    const raw = response.headers.get("x-rate-limit");
    expect(raw).toInclude("-lim:");
    expect(raw).toInclude("-rem:");
    expect(parseRateLimit(raw).length).toBeGreaterThan(0);
  });
});
