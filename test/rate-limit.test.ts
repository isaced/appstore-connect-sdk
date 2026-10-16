import { describe, test, expect } from "bun:test";
import { parseRateLimit, getRateLimit, type RateLimit } from "../src/rate-limit";

// Real live format captured from the App Store Connect API:
// "user-hour-lim:3600;user-hour-rem:3593;" (note trailing semicolon)
describe("parseRateLimit", () => {
  test("parses the live Apple header format", () => {
    const parsed = parseRateLimit("user-hour-lim:3600;user-hour-rem:3593;");
    expect(parsed).toEqual([{ dimension: "user-hour", limit: 3600, remaining: 3593 }]);
  });

  test("parses multiple dimensions", () => {
    const parsed = parseRateLimit(
      "user-hour-lim:3600;user-hour-rem:100;client-address-hour-lim:3000;client-address-hour-rem:2999;",
    );
    expect(parsed).toEqual([
      { dimension: "user-hour", limit: 3600, remaining: 100 },
      { dimension: "client-address-hour", limit: 3000, remaining: 2999 },
    ]);
  });

  test("ignores malformed segments and unpaired dimensions", () => {
    const parsed = parseRateLimit("user-hour-lim:abc;user-hour-rem:5;junk;other-lim:10;");
    expect(parsed).toEqual([]);
  });

  test("tolerates missing and empty input", () => {
    expect(parseRateLimit(null)).toEqual([]);
    expect(parseRateLimit(undefined)).toEqual([]);
    expect(parseRateLimit("")).toEqual([]);
  });
});

describe("getRateLimit", () => {
  test("reads the header off a Response", () => {
    const response = new Response(null, {
      headers: { "x-rate-limit": "user-hour-lim:3600;user-hour-rem:3590;" },
    });
    const limits: RateLimit[] = getRateLimit(response);
    expect(limits[0]?.limit).toBe(3600);
    expect(limits[0]?.remaining).toBe(3590);
  });

  test("returns empty array when the header is absent", () => {
    expect(getRateLimit(new Response(null))).toEqual([]);
  });
});
