// Cursor-style pagination helpers for generated collection endpoints.
// API shape follows the TS ecosystem consensus (Octokit `paginate.iterator`,
// AWS SDK v3 paginators, Stripe `autoPagingToArray`): lazy page iteration,
// flattened item iteration, and a bounded full-collection helper.
import { client as defaultClient } from "./openapi/client.gen";
import type { Client } from "./openapi/client";

type PagedDocumentLinks = { next?: string };

type PagedCollectionFn = (
  options?: any,
) => Promise<{ data?: { data?: readonly unknown[]; links?: PagedDocumentLinks }; error?: unknown; response?: Response }>;

type AnyFn = (...args: any[]) => any;

type PageData<F extends AnyFn> = Awaited<ReturnType<F>> extends { data?: infer D }
  ? Exclude<D, undefined>
  : never;

type ItemData<F extends AnyFn> = PageData<F> extends { data?: readonly (infer A)[] } ? A : never;

type FnOptions<F extends AnyFn> = F extends (options?: infer O) => any ? NonNullable<O> : never;

export interface PaginationErrorInit {
  status?: number;
  /** Apple's JSON:API error body (`{ errors: [...] }`) or an object with a `reason`. */
  body?: unknown;
  url?: string;
}

/** Thrown when a paginated request fails or a `links.next` URL cannot be followed. */
export class PaginationError extends Error {
  readonly status?: number;
  readonly body?: unknown;
  readonly url?: string;

  constructor(message: string, init: PaginationErrorInit = {}) {
    super(message);
    this.name = "PaginationError";
    this.status = init.status;
    this.body = init.body;
    this.url = init.url;
  }
}

/** Thrown by `paginateToArray` when the collected items would exceed `maxItems`. */
export class PaginationLimitError extends Error {
  readonly maxItems: number;
  readonly collected: number;

  constructor(maxItems: number, collected: number) {
    super(
      `Pagination stopped: the collection has more than maxItems=${maxItems} items (${collected} collected so far). Use paginateItems() to stream without a bound.`,
    );
    this.name = "PaginationLimitError";
    this.maxItems = maxItems;
    this.collected = collected;
  }
}

function unwrap(result: { data?: unknown; error?: unknown; response?: Response }, url?: string) {
  if (result.error) {
    throw new PaginationError(`Pagination request failed (${url ?? "first page"}).`, {
      status: result.response?.status,
      body: result.error,
      url,
    });
  }
  return result.data;
}

/**
 * Iterate pages of a paged collection endpoint, following `links.next`
 * (absolute URLs returned by the API) until exhausted.
 *
 * ```ts
 * for await (const page of paginate(appsGetCollection, { client, query: { limit: 200 } })) {
 *   for (const app of page.data) console.log(app.attributes?.name);
 * }
 * ```
 *
 * Unlike the plain endpoint functions (which resolve to `{ data, error }`),
 * pagination throws a `PaginationError` when any page fails, since errors
 * mid-iteration are hard to represent in a loop body.
 */
export async function* paginate<F extends PagedCollectionFn>(
  fn: F,
  options?: FnOptions<F>,
): AsyncGenerator<PageData<F>, void, undefined> {
  const client: Client | undefined = options?.client ?? defaultClient;
  let current = await fn(options);

  for (;;) {
    const page = unwrap(current) as PageData<F> | undefined;
    if (!page) return;
    yield page;

    const next = (page as { links?: PagedDocumentLinks }).links?.next;
    if (!next) return;

    const { baseUrl } = client!.getConfig();
    if (!baseUrl) {
      throw new PaginationError("Cannot follow links.next: client has no baseUrl.", { url: next });
    }
    // The generated client resolves `url` as baseUrl + path, so absolute
    // links must be turned back into paths — and they must belong to this
    // client's baseUrl (guards against redirected/hijacked links).
    if (!next.startsWith(baseUrl) || (next.length > baseUrl.length && !/[/?]/.test(next[baseUrl.length]))) {
      throw new PaginationError(
        `links.next "${next}" does not match the client baseUrl "${baseUrl}".`,
        { url: next, body: { reason: "base_url_mismatch" } },
      );
    }
    current = (await client!.get({ url: next.slice(baseUrl.length) || "/" })) as Awaited<ReturnType<F>>;
  }
}

/**
 * Iterate individual resources across all pages of a collection.
 *
 * ```ts
 * for await (const app of paginateItems(appsGetCollection, { client })) { ... }
 * ```
 */
export async function* paginateItems<F extends PagedCollectionFn>(
  fn: F,
  options?: FnOptions<F>,
): AsyncGenerator<ItemData<F>, void, undefined> {
  for await (const page of paginate(fn, options)) {
    const items = (page as { data?: readonly unknown[] }).data ?? [];
    yield* items as Iterable<ItemData<F>>;
  }
}

/**
 * Collect every item of a collection into an array (Octokit `paginate` /
 * Stripe `autoPagingToArray` equivalent). Consider setting `maxItems` for
 * potentially large collections; the API allows up to 200 items per page.
 */
export async function paginateToArray<F extends PagedCollectionFn>(
  fn: F,
  options?: FnOptions<F> & { maxItems?: number },
): Promise<ItemData<F>[]> {
  const { maxItems = Number.POSITIVE_INFINITY, ...rest } =
    (options ?? {}) as FnOptions<F> & { maxItems?: number };
  const items: ItemData<F>[] = [];
  for await (const item of paginateItems(fn, rest as FnOptions<F>)) {
    if (items.length >= maxItems) {
      throw new PaginationLimitError(maxItems, items.length);
    }
    items.push(item);
  }
  return items;
}
