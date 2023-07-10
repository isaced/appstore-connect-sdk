import fetch from "node-fetch";
import * as dotenv from "dotenv";

import { FetchAPI } from "./../src/openapi/runtime";
import { AppsApi } from "../src/openapi";
import AppStoreConnectAPI from "../src/main";

// Increase the timeout for the test case.
jest.setTimeout(30000);

// Load the environment variables from the .env file.
dotenv.config();

// Create a new instance of the AppStoreConnectAPI client with the required parameters.
const client = new AppStoreConnectAPI({
  issuerId: process.env.ISSUER_ID!,
  privateKeyId: process.env.PRIVATE_KEY_ID!,
  privateKey: process.env.PRIVATE_KEY!,
  fetchApi: fetch as unknown as FetchAPI,
});

// Test case to get a list of apps.
test("Get app list", async () => {
  try {
    const api = await client.create(AppsApi);
    const res = await api.appsGetCollection();
    console.log(res);
    expect(res).toBeDefined;
  } catch (error) {
    console.error(error);
  }
});
