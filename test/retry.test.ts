import { describe, test, expect, beforeAll, afterAll, beforeEach } from "bun:test";
import { createClient } from "../src/client";
import type { RetryInfo } from "../src/retry";

// ---------------------------------------------------------------------------
// Mock API service exercising 429/Retry-After behavior with hit counters.
// ---------------------------------------------------------------------------

let server: ReturnType<typeof Bun.serve>;
let origin: string;
let counts: Record<string, number>;
const serverPaths: Record<string, (n: number) => Response | Promise<Response>> = {};

function count(path: string): number {
  counts[path] = (counts[path] ?? 0) + 1;
  return counts[path];
}

beforeAll(() => {
  counts = {};
  server = Bun.serve({
    port: 0,
    fetch(req) {
      const url = new URL(req.url);
      const path = url.pathname;

      if (serverPaths[path]) {
        return serverPaths[path](count(path));
      }
      const n = count(path);

      if (path === "/flaky-429") {
        return n === 1
          ? new Response(null, { status: 429 })
          : Response.json({ ok: true, attempts: n });
      }
      if (path === "/retry-after") {
        return n === 1
          ? new Response(null, { status: 429, headers: { "retry-after": "1" } })
          : Response.json({ ok: true, attempts: n });
      }
      if (path === "/retry-after-huge") {
        return new Response(null, { status: 429, headers: { "retry-after": "3600" } });
      }
      if (path === "/always-429") {
        return Response.json({ errors: [{ status: "429", code: "TOO_MANY_REQUESTS" }] }, { status: 429 });
      }
      if (path === "/echo-post") {
        return Response.json({ errors: [{ status: "429" }] }, { status: 429 });
      }
      return new Response("not found", { status: 404 });
    },
  });
  origin = `http://localhost:${server.port}`;
});

afterAll(() => server?.stop());
beforeEach(() => {
  counts = {};
});

const FAST_RETRY = { baseDelayMs: 1 };

describe("createClient retry (fetch layer)", () => {
  test("retries 429 on GET by default and resolves the successful response", async () => {
    const client = createClient({ bearerToken: "t", baseUrl: origin, retry: FAST_RETRY });
    const res = await client.get<{ ok: boolean; attempts: number }>({
      url: "/flaky-429",
      security: [{ scheme: "bearer", type: "http" }],
    });
    expect(res.data?.ok).toBe(true);
    expect(res.data?.attempts).toBe(2);
    expect(counts["/flaky-429"]).toBe(2);
  });

  test("honors Retry-After seconds over exponential backoff", async () => {
    const client = createClient({ bearerToken: "t", baseUrl: origin, retry: FAST_RETRY });
    const started = Date.now();
    const res = await client.get<{ ok: boolean }>({
      url: "/retry-after",
      security: [{ scheme: "bearer", type: "http" }],
    });
    const elapsed = Date.now() - started;
    expect(res.data?.ok).toBe(true);
    expect(elapsed).toBeGreaterThanOrEqual(900); // waited ~1s per Retry-After, not 1ms
  });

  test("gives up immediately when Retry-After exceeds maxRetryAfterMs", async () => {
    const client = createClient({
      bearerToken: "t",
      baseUrl: origin,
      retry: { ...FAST_RETRY, maxRetryAfterMs: 1000 },
    });
    const started = Date.now();
    const res = await client.get({
      url: "/retry-after-huge",
      security: [{ scheme: "bearer", type: "http" }],
    });
    expect(Date.now() - started).toBeLessThan(500);
    expect(res.response.status).toBe(429);
    expect(counts["/retry-after-huge"]).toBe(1); // no pointless sleep-and-retry
  });

  test("stops after maxRetries and returns the last response unchanged", async () => {
    const client = createClient({
      bearerToken: "t",
      baseUrl: origin,
      retry: { ...FAST_RETRY, maxRetries: 2 },
    });
    const res = await client.get({
      url: "/always-429",
      security: [{ scheme: "bearer", type: "http" }],
    });
    expect(res.response.status).toBe(429);
    expect(res.error).toBeDefined();
    expect(counts["/always-429"]).toBe(3); // initial + 2 retries
  });

  test("does not retry non-idempotent methods by default", async () => {
    const client = createClient({ bearerToken: "t", baseUrl: origin, retry: FAST_RETRY });
    const res = await client.post({
      url: "/echo-post",
      security: [{ scheme: "bearer", type: "http" }],
      body: { hello: "world" },
    });
    expect(res.response.status).toBe(429);
    expect(counts["/echo-post"]).toBe(1);
  });

  test("retry: false disables retrying entirely", async () => {
    const client = createClient({ bearerToken: "t", baseUrl: origin, retry: false });
    const res = await client.get({
      url: "/flaky-429",
      security: [{ scheme: "bearer", type: "http" }],
    });
    expect(res.response.status).toBe(429);
    expect(counts["/flaky-429"]).toBe(1);
  });

  test("onRetry reports attempt, delay, method and url", async () => {
    const seen: RetryInfo[] = [];
    const client = createClient({
      bearerToken: "t",
      baseUrl: origin,
      retry: { ...FAST_RETRY, maxRetries: 2, onRetry: (info) => seen.push(info) },
    });
    await client.get({ url: "/always-429", security: [{ scheme: "bearer", type: "http" }] });
    expect(seen.length).toBe(2);
    expect(seen[0]).toMatchObject({ attempt: 1, method: "GET", status: 429 });
    expect(seen[0].delayMs).toBeGreaterThanOrEqual(0);
    expect(seen[1].attempt).toBe(2);
    expect(seen[1].url).toInclude("/always-429");
  });

  test("configured statusCodes extend retryable statuses (opt-in 5xx)", async () => {
    serverPaths["/flaky-503"] = (n) =>
      n === 1 ? new Response(null, { status: 503 }) : Response.json({ ok: true });
    try {
      const client = createClient({
        bearerToken: "t",
        baseUrl: origin,
        retry: { ...FAST_RETRY, statusCodes: [429, 503] },
      });
      const res = await client.get({ url: "/flaky-503", security: [{ scheme: "bearer", type: "http" }] });
      expect(res.data).toMatchObject({ ok: true });
    } finally {
      delete serverPaths["/flaky-503"];
    }
  });
});
