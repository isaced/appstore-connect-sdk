// Parsing for the App Store Connect `X-Rate-Limit` response header.
// Live-verified format: "user-hour-lim:3600;user-hour-rem:3593;"
export interface RateLimit {
  /** Rate limit dimension, e.g. `user-hour` or `client-address-hour`. */
  dimension: string;
  limit: number;
  remaining: number;
}

export function parseRateLimit(header: string | null | undefined): RateLimit[] {
  if (!header) return [];

  const byDimension = new Map<string, { limit?: number; remaining?: number }>();
  for (const segment of header.split(";")) {
    const sep = segment.lastIndexOf(":");
    if (sep <= 0) continue;
    const key = segment.slice(0, sep).trim();
    const value = Number(segment.slice(sep + 1).trim());
    if (!Number.isFinite(value) || value < 0) continue;

    if (key.endsWith("-lim")) {
      const dim = key.slice(0, -4);
      byDimension.set(dim, { ...(byDimension.get(dim) ?? {}), limit: value });
    } else if (key.endsWith("-rem")) {
      const dim = key.slice(0, -4);
      byDimension.set(dim, { ...(byDimension.get(dim) ?? {}), remaining: value });
    }
  }

  const out: RateLimit[] = [];
  for (const [dimension, entry] of byDimension) {
    if (entry.limit !== undefined && entry.remaining !== undefined) {
      out.push({ dimension, limit: entry.limit, remaining: entry.remaining });
    }
  }
  return out;
}

/** Typed `X-Rate-Limit` view of any API Response (works on `result.response`). */
export function getRateLimit(response: Response): RateLimit[] {
  return parseRateLimit(response.headers.get("x-rate-limit"));
}
