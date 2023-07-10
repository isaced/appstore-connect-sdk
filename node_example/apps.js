const { default: AppStoreConnectAPI } = require("appstore-connect-sdk");
const { AppsApi } = require("appstore-connect-sdk/dist/openapi/apis/AppsApi");
const dotenv = require('dotenv');

async function main() {
    // Load the environment variables from the .env file.
    dotenv.config();

    // // Create a new instance of the AppStoreConnectAPI client with the required parameters.
    const client = new AppStoreConnectAPI({
        issuerId: process.env.ISSUER_ID,
        privateKeyId: process.env.PRIVATE_KEY_ID,
        privateKey: process.env.PRIVATE_KEY,
    });

    const appsApi = await client.call(AppsApi);
    const res = await appsApi.appsGetCollection();
    console.log(res);
}

main();
