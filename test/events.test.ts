import fs from "fs";
import fetch from "node-fetch";
import * as dotenv from "dotenv";

import { FetchAPI } from "./../src/openapi/runtime";
import { AppsApi } from "../src/openapi";
import AppStoreConnectAPI from "../src/main";

dotenv.config();

test("Get In-App Events List", async () => {
  const client = new AppStoreConnectAPI({
    issuerId: process.env.ISSUER_ID!,
    privateKeyId: process.env.PRIVATE_KEY_ID!,
    privateKey: loadP8File(),
    fetchApi: fetch as FetchAPI,
  });
  const api = new AppsApi(client.configuration);
  const res = await api.appsGetCollection();
  console.log(res);
  expect(res).toBeDefined;
});

export function loadP8File() {
  const FILE_PATH = process.env.PRIVATE_KEY_PATH || process.env.P8_FILE!;
  const fileContent = fs.readFileSync(FILE_PATH);
  const privateKey = fileContent.toString();
  console.log(privateKey);
  return privateKey;
}
