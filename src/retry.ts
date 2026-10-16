// 429-aware retrying fetch wrapper, installed at the client's `fetch` config
// so every request path (generated endpoints, client.get/post, pagination
// follow-ups) shares one policy. Strategy follows ecosystem consensus
// (got / Octokit plugin-retry / Stripe): idempotent methods only,
// Retry-After honored and capped, exponential backoff with jitter otherwise.
export interface RetryInfo {
  /** 1-based retry number (the first attempt is 0 and never reported). */
  attempt: number;
  status: number;
  method: string;
  url: string;
  delayMs: number;
}

export interface RetryOptions {
  /** Maximum retry attempts after the initial request. Default 3. */
  maxRetries?: number;
  /** Status codes to retry. Default `[429]`; add 500/502/503 etc. to opt in. */
  statusCodes?: number[];
  /**
   * Methods eligible for retry. Default `["GET", "HEAD"]`.
   * Requests carrying a body are never retried regardless of this setting —
   * the API has no idempotency keys and consumed body streams can't be replayed.
   */
  methods?: string[];
  /** Give up instead of sleeping when `Retry-After` exceeds this many ms. Default 60_000. */
  maxRetryAfterMs?: number;
  /** First exponential backoff step in ms (before jitter). Default 500. */
  baseDelayMs?: number;
  /** Exponential backoff ceiling in ms (before jitter). Default 30_000. */
  maxBackoffMs?: number;
  onRetry?: (info: RetryInfo) => void;
}

const DEFAULTS = {
  maxRetries: 3,
  statusCodes: [429],
  methods: ["GET", "HEAD"],
  maxRetryAfterMs: 60_000,
  baseDelayMs: 500,
  maxBackoffMs: 30_000,
};

const sleep = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));

export function createRetryFetch(
  baseFetch: typeof fetch,
  options: RetryOptions = {},
): typeof fetch {
  const maxRetries = options.maxRetries ?? DEFAULTS.maxRetries;
  const statusCodes = new Set(options.statusCodes ?? DEFAULTS.statusCodes);
  const methods = new Set((options.methods ?? DEFAULTS.methods).map((m) => m.toUpperCase()));
  const maxRetryAfterMs = options.maxRetryAfterMs ?? DEFAULTS.maxRetryAfterMs;
  const baseDelayMs = options.baseDelayMs ?? DEFAULTS.baseDelayMs;
  const maxBackoffMs = options.maxBackoffMs ?? DEFAULTS.maxBackoffMs;
  const onRetry = options.onRetry;

  return async (input, init) => {
    const method =
      init?.method ?? (input instanceof Request ? input.method : "GET");
    const url = input instanceof Request ? input.url : String(input);
    const retryableMethod = methods.has(method.toUpperCase());
    // A consumed Request body cannot be replayed; pre-cloning every request
    // would double-buffer upload bodies, so body-carrying requests are never
    // retried regardless of `methods`.
    const hasBody =
      input instanceof Request ? input.body !== null : init?.body != null;
    const replayable = !hasBody;

    let attempt = 0;
    for (;;) {
      const response = await baseFetch(input as RequestInfo, init);

      if (!retryableMethod || !replayable || !statusCodes.has(response.status) || attempt >= maxRetries) {
        return response;
      }

      attempt += 1;
      let delayMs: number;
      const rawRetryAfter = response.headers.get("retry-after");
      const retryAfterSec = rawRetryAfter === null ? NaN : Number(rawRetryAfter);
      if (Number.isFinite(retryAfterSec) && retryAfterSec >= 0) {
        delayMs = retryAfterSec * 1000;
        if (delayMs > maxRetryAfterMs) {
          return response; // server asks for a longer pause than we accept: stop, don't sleep
        }
      } else {
        const backoff = Math.min(maxBackoffMs, baseDelayMs * 2 ** (attempt - 1));
        delayMs = backoff * (0.8 + Math.random() * 0.4); // ±20% jitter
      }

      onRetry?.({ attempt, status: response.status, method, url, delayMs });
      await sleep(delayMs);
    }
  };
}
