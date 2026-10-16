// Deno runtime smoke for the packed npm artifact — catches cross-runtime
// breakage (e.g. the RequestInit.client clash) that Node/Bun cannot see.
// No credentials, no external network: runs against a local mock API.
//
// CI flow (see .github/workflows/test.yml): npm pack -> install the tarball
// into deno_smoke/node_modules -> deno run this file.
import { createClient, appsGetCollection, paginate, getRateLimit } from "./node_modules/appstore-connect-sdk/dist/sdk.js";

let authHeader: string | null = null;
let port = 0;

const server = Deno.serve({ hostname: "127.0.0.1", port: 0, onListen: (a) => (port = a.port) }, (req) => {
  authHeader = req.headers.get("authorization");
  return new Response(
    JSON.stringify({
      data: [{ type: "apps", id: "smoke-1", attributes: { name: "Smoke App" } }],
      links: { self: req.url },
    }),
    {
      headers: {
        "content-type": "application/json",
        "x-rate-limit": "user-hour-lim:3600;user-hour-rem:3599;",
      },
    },
  );
});

const client = createClient({ bearerToken: "smoke-token", baseUrl: `http://127.0.0.1:${port}` });

function assert(cond: unknown, msg: string) {
  if (!cond) {
    console.error(`DENO SMOKE FAILED: ${msg}`);
    Deno.exit(1);
  }
}

// 1. plain endpoint (the crash site: options.client previously leaked into Request init)
const { data, response } = await appsGetCollection({ client, query: { limit: 1 } });
assert(data?.data?.[0]?.id === "smoke-1", "typed response body");
assert(authHeader === "Bearer smoke-token", "authorization header sent");

// 2. quota accessor
assert(getRateLimit(response)[0]?.limit === 3600, "rate limit parsed");

// 3. pagination helper (single page, no links.next)
const ids: string[] = [];
for await (const page of paginate(appsGetCollection, { client })) {
  for (const app of page.data) ids.push(app.id);
}
assert(ids.join() === "smoke-1", "paginate iteration");

await server.shutdown();
console.log("DENO SMOKE PASSED");
