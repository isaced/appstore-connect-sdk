import { AppStoreConnectAPI } from "../src/main";
import { AppsApi } from "../src/openapi";
import { describe, beforeAll, test, expect } from "bun:test";

describe("Test AppStoreConnectAPI client & configuration", async () => {
  const client = new AppStoreConnectAPI({
    bearerToken: "TEST_TOKEN",
  });

  // @ts-ignore Check bearerTokenGeneratedAt default value
  expect(client.bearerTokenGeneratedAt).toBe(0);

  const configuration = await client.getConfiguration();

  // bearerTokenGeneratedAt should be set
  // @ts-ignore
  expect(client.bearerTokenGeneratedAt).toBeGreaterThan(0);
  // @ts-ignore
  expect(client.bearerTokenGeneratedAt).toBeLessThanOrEqual(Date.now());

  // The Authorization header should be set
  expect(configuration?.headers?.Authorization).toBe("Bearer TEST_TOKEN");
});



describe("Test expirationTime", async () => {
  const client = new AppStoreConnectAPI({
    bearerToken: "TEST_TOKEN",
    expirationDuration: 2,
  });

  // @ts-ignore Check bearerTokenGeneratedAt default value
  expect(client.bearerTokenGeneratedAt).toBe(0);
  // @ts-ignore Check expirationDuration override
  expect(client.options.expirationDuration).toBe(2);

  let startTime = Date.now();
  await client.getConfiguration();
  let endTime = Date.now();

  // bearerTokenGeneratedAt should be set
  // @ts-ignore
  expect(client.bearerTokenGeneratedAt).toBeGreaterThanOrEqual(startTime);
  // @ts-ignore
  expect(client.bearerTokenGeneratedAt).toBeLessThanOrEqual(endTime);

  // await 2s
  await new Promise((resolve) => setTimeout(resolve, 3000));
  startTime = Date.now();
  await client.getConfiguration();
  endTime = Date.now();

  // bearerTokenGeneratedAt should be updated
  // @ts-ignore
  expect(client.bearerTokenGeneratedAt).toBeGreaterThanOrEqual(startTime);
  // @ts-ignore
  expect(client.bearerTokenGeneratedAt).toBeLessThanOrEqual(endTime);
});