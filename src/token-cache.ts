/**
 * Single-flight bearer-token cache used by `createClient`.
 *
 * The issuer (e.g. jose-based `generateAuthToken`) is supplied by the caller,
 * keeping this module free of key handling and independently testable.
 */
export interface TokenCacheOptions {
  /** Token lifetime in seconds. */
  expirationDuration: number;
  /** Refresh this many ms before actual expiry (default 2 minutes). */
  refreshLeadMs?: number;
  /** Injectable clock, for tests. */
  now?: () => number;
}

export class TokenCache {
  private readonly issuer: () => Promise<string>;
  private readonly expirationMs: number;
  private readonly refreshLeadMs: number;
  private readonly now: () => number;

  private token: string | null = null;
  private generatedAt = 0;
  private flight: Promise<string> | null = null;

  constructor(issuer: () => Promise<string>, options: TokenCacheOptions) {
    this.issuer = issuer;
    this.expirationMs = options.expirationDuration * 1000;
    this.refreshLeadMs = options.refreshLeadMs ?? 2 * 60 * 1000;
    this.now = options.now ?? Date.now;
  }

  /**
   * Returns a valid token, generating at most one token per expiry window:
   * concurrent callers share the in-flight generation, and failures leave the
   * cache clean for the next call to retry.
   */
  getToken(): Promise<string> {
    if (this.token && this.now() - this.generatedAt <= this.expirationMs - this.refreshLeadMs) {
      return Promise.resolve(this.token);
    }
    if (this.flight) {
      return this.flight;
    }

    this.flight = this.issuer()
      .then((token) => {
        this.token = token;
        this.generatedAt = this.now();
        return token;
      })
      .finally(() => {
        this.flight = null;
      });

    return this.flight;
  }
}
