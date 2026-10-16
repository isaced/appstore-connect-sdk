import { describe, test, expect, beforeAll, afterAll } from "bun:test";
import { createClient, type Client } from "../src/client";
import {
  paginate,
  paginateItems,
  paginateToArray,
  PaginationError,
  PaginationLimitError,
} from "../src/paginate";

// ---------------------------------------------------------------------------
// Mock paged JSON:API service.
// /v1/apps serves 5 items over pages of `limit`, cursor-paginated like Apple:
// links.next is an absolute URL. Extra routes exercise failure modes.
// ---------------------------------------------------------------------------

const ALL_ITEMS = Array.from({ length: 5 }, (_, i) => ({
  type: "apps",
  id: `app-${i + 1}`,
  attributes: { name: `App ${i + 1}` },
}));

function pagePayload(pathname: string, params: URLSearchParams, origin: string) {
  const limit = Number(params.get("limit") ?? 100);
  const cursor = Number(params.get("cursor") ?? 0);
  const slice = ALL_ITEMS.slice(cursor, cursor + limit);
  const nextOffset = cursor + limit;
  const links: Record<string, string> = { self: `${origin}${pathname}` };
  if (nextOffset < ALL_ITEMS.length) {
    const next = new URL(`${origin}${pathname}`);
    next.searchParams.set("limit", String(limit));
    next.searchParams.set("cursor", String(nextOffset));
    links.next = next.toString();
  }
  return { data: slice, links };
}

let server: ReturnType<typeof Bun.serve>;
let origin: string;
let hits: string[];
let auths: (string | null)[];
let traces: (string | null)[];

beforeAll(() => {
  hits = [];
  auths = [];
  traces = [];
  server = Bun.serve({
    port: 0,
    fetch(req) {
      const url = new URL(req.url);
      hits.push(url.pathname + url.search);
      auths.push(req.headers.get("authorization"));
      traces.push(req.headers.get("x-trace"));

      if (url.pathname === "/v1/apps") {
        return Response.json(pagePayload(url.pathname, url.searchParams, origin));
      }
      if (url.pathname === "/proxy/v1/apps") {
        return Response.json(pagePayload("/proxy/v1/apps", url.searchParams, origin));
      }
      if (url.pathname === "/v1/empty") {
        return Response.json({ data: [], links: { self: `${origin}/v1/empty` } });
      }
      if (url.pathname === "/v1/fail-first") {
        return Response.json(
          { errors: [{ status: "403", code: "FORBIDDEN", title: "nope" }] },
          { status: 403 },
        );
      }
      if (url.pathname === "/v1/fail-second") {
        if (url.searchParams.get("cursor")) {
          return Response.json(
            { errors: [{ status: "500", code: "BOOM", title: "page 2 blew up" }] },
            { status: 500 },
          );
        }
        return Response.json(pagePayload(url.pathname, url.searchParams, origin));
      }
      if (url.pathname === "/v1/cross-origin") {
        return Response.json({
          data: ALL_ITEMS.slice(0, 2),
          links: { self: `${origin}/v1/cross-origin`, next: `https://evil.example.com/v1/apps` },
        });
      }
      return new Response("not found", { status: 404 });
    },
  });
  origin = `http://localhost:${server.port}`;
});

afterAll(() => {
  server?.stop();
});

function collectionFn(client: Client, path = "/v1/apps") {
  // mirrors the generated endpoints, which declare bearer security per request
  return (options?: Record<string, unknown>) =>
    client.get({ url: path, security: [{ scheme: "bearer", type: "http" }], ...options });
}

async function drain<T>(it: AsyncGenerator<T>): Promise<T[]> {
  const out: T[] = [];
  for await (const v of it) out.push(v);
  return out;
}

describe("paginate", () => {
  test("follows links.next across all pages and yields each page", async () => {
    const client = createClient({ bearerToken: "t", baseUrl: origin });
    const pages = await drain(paginate(collectionFn(client), { client, query: { limit: 2 } }));

    expect(pages.length).toBe(3);
    expect(pages.map((p) => p.data.length)).toEqual([2, 2, 1]);
    expect(pages.flatMap((p) => p.data.map((d: any) => d.id))).toEqual(
      ALL_ITEMS.map((d) => d.id),
    );
    // first page via query, then two follow-ups via absolute links resolved back to paths
    expect(hits.slice(1)).toEqual([
      "/v1/apps?limit=2&cursor=2",
      "/v1/apps?limit=2&cursor=4",
    ]);
    // regression: raw client.get() follow-ups must still send Authorization
    expect(auths.every((a) => a === "Bearer t")).toBe(true);
  });

  test("stops immediately when there is no links.next", async () => {
    const client = createClient({ bearerToken: "t", baseUrl: origin });
    hits = [];
    const pages = await drain(paginate(collectionFn(client), { client, query: { limit: 100 } }));
    expect(pages.length).toBe(1);
    expect(hits.length).toBe(1);
  });

  test("yields the empty page for an empty collection", async () => {
    const client = createClient({ bearerToken: "t", baseUrl: origin });
    const pages = await drain(paginate(collectionFn(client, "/v1/empty"), { client }));
    expect(pages.length).toBe(1);
    expect(pages[0].data.length).toBe(0);
  });

  test("is lazy: break exits without fetching further pages", async () => {
    const client = createClient({ bearerToken: "t", baseUrl: origin });
    hits = [];
    for await (const page of paginate(collectionFn(client), { client, query: { limit: 1 } })) {
      expect(page.data.length).toBe(1);
      break;
    }
    expect(hits.length).toBe(1);
  });

  test("throws PaginationError with status and Apple body on first-page failure", async () => {
    const client = createClient({ bearerToken: "t", baseUrl: origin });
    let caught: unknown;
    try {
      await drain(paginate(collectionFn(client, "/v1/fail-first"), { client }));
    } catch (e) {
      caught = e;
    }
    expect(caught).toBeInstanceOf(PaginationError);
    expect((caught as PaginationError).status).toBe(403);
    expect((caught as PaginationError).body).toMatchObject({
      errors: [{ code: "FORBIDDEN" }],
    });
  });

  test("throws PaginationError when a later page fails", async () => {
    const client = createClient({ bearerToken: "t", baseUrl: origin });
    let caught: unknown;
    try {
      await drain(paginate(collectionFn(client, "/v1/fail-second"), { client, query: { limit: 2 } }));
    } catch (e) {
      caught = e;
    }
    expect(caught).toBeInstanceOf(PaginationError);
    expect((caught as PaginationError).status).toBe(500);
  });

  test("throws PaginationError when links.next escapes the baseUrl", async () => {
    const client = createClient({ bearerToken: "t", baseUrl: origin });
    let caught: unknown;
    try {
      await drain(paginate(collectionFn(client, "/v1/cross-origin"), { client }));
    } catch (e) {
      caught = e;
    }
    expect(caught).toBeInstanceOf(PaginationError);
    expect(String((caught as PaginationError).message)).toInclude("does not match");
  });

  test("forwards fetch and headers options to follow-up requests", async () => {
    const client = createClient({ bearerToken: "t", baseUrl: origin });
    hits = [];
    traces = [];
    let fetchCalls = 0;
    const countingFetch: typeof fetch = (input, init) => {
      fetchCalls += 1;
      return fetch(input, init);
    };
    const pages = await drain(
      paginate(collectionFn(client), {
        client,
        query: { limit: 4 },
        fetch: countingFetch,
        headers: { "x-trace": "paginate-test" },
      }),
    );
    expect(pages.length).toBe(2); // 5 items at limit 4
    expect(fetchCalls).toBe(2); // custom fetch used on first page AND follow-ups
    expect(traces).toHaveLength(2);
    expect(traces.every((t) => t === "paginate-test")).toBe(true);
  });

  test("supports baseUrl with a path prefix (proxied API)", async () => {
    const client = createClient({ bearerToken: "t", baseUrl: `${origin}/proxy` });
    hits = [];
    const pages = await drain(
      paginate(collectionFn(client, "/v1/apps"), { client, query: { limit: 2 } }),
    );
    expect(pages.flatMap((p) => p.data).length).toBe(5);
    // follow-ups must keep the /proxy prefix (absolute link is baseUrl-prefixed)
    expect(hits.filter((h) => h.startsWith("/proxy/") && h.includes("cursor"))).toHaveLength(2);
  });
});

describe("paginateItems", () => {
  test("flattens resources across pages", async () => {
    const client = createClient({ bearerToken: "t", baseUrl: origin });
    const ids: string[] = [];
    for await (const app of paginateItems(collectionFn(client), { client, query: { limit: 2 } })) {
      ids.push((app as any).id);
    }
    expect(ids).toEqual(ALL_ITEMS.map((d) => d.id));
  });

  test("propagates PaginationError mid-stream after delivering earlier pages", async () => {
    const client = createClient({ bearerToken: "t", baseUrl: origin });
    let error: unknown;
    let seen = 0;
    try {
      for await (const _ of paginateItems(collectionFn(client, "/v1/fail-second"), {
        client,
        query: { limit: 2 },
      })) {
        seen += 1;
      }
    } catch (e) {
      error = e;
    }
    expect(error).toBeInstanceOf(PaginationError);
    expect(seen).toBe(2); // first page items delivered before page 2 failed
  });
});

describe("paginateToArray", () => {
  test("collects everything when under maxItems", async () => {
    const client = createClient({ bearerToken: "t", baseUrl: origin });
    const all = await paginateToArray(collectionFn(client), { client, query: { limit: 2 } });
    expect(all.length).toBe(5);
    const capped = await paginateToArray(collectionFn(client), {
      client,
      query: { limit: 2 },
      maxItems: 5,
    });
    expect(capped.length).toBe(5);
  });

  test("throws PaginationLimitError as soon as the limit would be exceeded, without extra fetches", async () => {
    const client = createClient({ bearerToken: "t", baseUrl: origin });
    hits = [];
    let caught: unknown;
    try {
      await paginateToArray(collectionFn(client), {
        client,
        query: { limit: 2 },
        maxItems: 3,
      });
    } catch (e) {
      caught = e;
    }
    expect(caught).toBeInstanceOf(PaginationLimitError);
    expect((caught as PaginationLimitError).maxItems).toBe(3);
    // pages of 2: throws on the 4th item while processing page 2; page 3 never fetched
    expect(hits.filter((h) => h.startsWith("/v1/apps")).length).toBe(2);
  });
});
