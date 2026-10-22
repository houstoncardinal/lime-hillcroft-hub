import { createServerFn } from "@tanstack/react-start";

import { PREVIEW_PRODUCTS } from "@/shop/preview-catalog";
import type { Catalog, ShopCategory, ShopProduct } from "@/shop/types";

// Shopify Storefront API bridge for the public shop. Runs on the server: the Storefront token is
// read from server environment variables and never reaches the browser.
//
// Env (set by the Shopify connection — see docs/shop.md):
//   SHOPIFY_STORE_DOMAIN               xpufrj-ed.myshopify.com
//   SHOPIFY_STOREFRONT_ACCESS_TOKEN    Storefront API access token
//   SHOPIFY_API_VERSION                optional, defaults below

const DEFAULT_API_VERSION = "2026-10";
const CACHE_MS = 60_000;

function env(name: string) {
  return (process.env[name] ?? "").trim();
}

function config() {
  return {
    domain: env("SHOPIFY_STORE_DOMAIN")
      .replace(/^https?:\/\//, "")
      .replace(/\/$/, ""),
    token: env("SHOPIFY_STOREFRONT_ACCESS_TOKEN"),
    version: env("SHOPIFY_API_VERSION") || DEFAULT_API_VERSION,
  };
}

/** True when the shop talks to the real store; false → preview catalog and no online checkout. */
function isLive() {
  const { domain, token } = config();
  return Boolean(domain && token);
}

async function storefront<T>(query: string, variables: Record<string, unknown> = {}): Promise<T> {
  const { domain, token, version } = config();
  const res = await fetch(`https://${domain}/api/${version}/graphql.json`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": token,
    },
    body: JSON.stringify({ query, variables }),
  });
  if (!res.ok) throw new Error(`Shopify responded ${res.status}`);
  const json = (await res.json()) as { data?: T; errors?: { message: string }[] };
  if (json.errors?.length) throw new Error(json.errors.map((e) => e.message).join("; "));
  if (!json.data) throw new Error("Empty response from Shopify");
  return json.data;
}

// ---------- catalog ----------

export function categoryFor(productType: string, tags: string[]): ShopCategory {
  // Phones and tablets go by product type alone ("Smartphone", "Tablet"), so a "Phone case" or
  // an "iPad charger" still lands with the accessories.
  const type = productType.trim().toLowerCase();
  if (/^(smart ?phones?|(cell|mobile) ?phones?|phones?)$/.test(type)) return "phones";
  if (/^tablets?$/.test(type)) return "tablets";
  const text = `${productType} ${tags.join(" ")}`.toLowerCase();
  if (/case|cover/.test(text)) return "cases";
  if (/glass|screen|protector/.test(text)) return "screen-protection";
  if (/airpod|bud|earbud|headphone|earphone/.test(text)) return "earbuds";
  if (/speaker/.test(text)) return "speakers";
  if (/watch|wear|band|fitbit/.test(text)) return "wearables";
  if (/charg|cable|power|battery|adapter/.test(text)) return "power";
  if (/gam|controller|playstation|xbox/.test(text)) return "gaming";
  return "more";
}

const cents = (amount: string | undefined | null) =>
  amount == null ? null : Math.round(Number(amount) * 100);

/** Shopify returns descriptions as HTML; the site shows plain text. */
const toText = (html: string) =>
  html
    .replace(/<br\s*\/?>(\r?\n)?/gi, "\n")
    .replace(/<\/(p|div|li|h\d|tr)>/gi, "\n")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/[ \t]+/g, " ")
    .replace(/\n{3,}/g, "\n\n")
    .trim();

type ProductsQuery = {
  products: {
    pageInfo: { hasNextPage: boolean; endCursor: string | null };
    nodes: {
      id: string;
      handle: string;
      title: string;
      vendor: string;
      productType: string;
      tags: string[];
      descriptionHtml: string;
      images: { nodes: { url: string; altText: string | null }[] };
      options: { name: string }[];
      variants: {
        nodes: {
          id: string;
          title: string;
          availableForSale: boolean;
          price: { amount: string };
          compareAtPrice: { amount: string } | null;
          image: { url: string; altText: string | null } | null;
        }[];
      };
    }[];
  };
};

let cache: { at: number; catalog: Catalog } | null = null;

async function loadCatalog(): Promise<Catalog> {
  if (!isLive()) return { source: "preview", products: PREVIEW_PRODUCTS };
  if (cache && Date.now() - cache.at < CACHE_MS) return cache.catalog;
  // Page through the whole catalog (phones, tablets and accessories), up to 1,000 products.
  const nodes: ProductsQuery["products"]["nodes"] = [];
  let after: string | null = null;
  for (let page = 0; page < 4; page++) {
    const data: ProductsQuery = await storefront<ProductsQuery>(
      `query Products($after: String) {
        products(first: 250, after: $after, sortKey: BEST_SELLING) {
          pageInfo { hasNextPage endCursor }
          nodes {
            id handle title vendor productType tags descriptionHtml
            images(first: 6) { nodes { url altText } }
            options { name }
            variants(first: 50) {
              nodes { id title availableForSale price { amount } compareAtPrice { amount } image { url altText } }
            }
          }
        }
      }`,
      { after },
    );
    nodes.push(...data.products.nodes);
    if (!data.products.pageInfo.hasNextPage) break;
    after = data.products.pageInfo.endCursor;
  }
  // Automatic "best seller" / featured picks are for accessories; phones and tablets have their
  // own pages (/devices) and show up there and under their shop category.
  let rank = 0;
  const products: ShopProduct[] = nodes.map((p) => {
    const vs = p.variants.nodes.map((v) => ({
      id: v.id,
      title: v.title,
      price: cents(v.price.amount) ?? 0,
      // Full prices only: Shopify compare-at prices are not shown as crossed-out prices.
      compareAtPrice: null,
      available: v.availableForSale,
      image: v.image ? { url: v.image.url, alt: v.image.altText ?? p.title } : null,
    }));
    const onSale = vs.some((v) => v.compareAtPrice && v.compareAtPrice > v.price);
    const tags = p.tags.map((t) => t.toLowerCase());
    const category = categoryFor(p.productType, tags);
    const i = category === "phones" || category === "tablets" ? Infinity : rank++;
    return {
      id: p.id,
      handle: p.handle,
      title: p.title,
      vendor: p.vendor || "TIC Wireless",
      category,
      description: toText(p.descriptionHtml),
      features: [],
      images: p.images.nodes.map((im) => ({ url: im.url, alt: im.altText ?? p.title })),
      optionName:
        p.options.length && p.options[0]?.name !== "Title" ? (p.options[0]?.name ?? null) : null,
      variants: vs,
      badge: tags.includes("new") ? "new" : onSale ? "sale" : i < 4 ? "best-seller" : null,
      featured: tags.includes("featured") || i < 6,
    };
  });
  const catalog: Catalog = { source: "shopify", products };
  cache = { at: Date.now(), catalog };
  return catalog;
}

export const getCatalog = createServerFn({ method: "GET" }).handler(async (): Promise<Catalog> => {
  try {
    return await loadCatalog();
  } catch (e) {
    // Never take the shop down: fall back to the preview catalog if Shopify is unreachable.
    console.error("Shopify catalog failed, serving preview:", e);
    return { source: "preview", products: PREVIEW_PRODUCTS };
  }
});

// ---------- devices ----------
//
// Phones and tablets have their own pages (/devices/<id>). Their Shopify product uses the same
// handle (docs/shopify/tic-wireless-devices-shopify.csv), so a device page can show the live price,
// stock and an add-to-cart button. These return nothing when the store isn't connected.

export type DevicePrice = { from: number; available: boolean };

const asHandle = (d: unknown) => String(d ?? "").slice(0, 120);

/** One device's Shopify product, or null when it isn't in the store (or the store is offline). */
export const getShopDevice = createServerFn({ method: "GET" })
  .validator(asHandle)
  .handler(async ({ data }): Promise<ShopProduct | null> => {
    if (!isLive() || !data) return null;
    try {
      return (await loadCatalog()).products.find((p) => p.handle === data) ?? null;
    } catch (e) {
      console.error("Shopify device lookup failed:", e);
      return null;
    }
  });

/** Lowest price (cents) and availability for every phone and tablet in the store, by handle. */
export const getDevicePrices = createServerFn({ method: "GET" }).handler(
  async (): Promise<Record<string, DevicePrice>> => {
    if (!isLive()) return {};
    try {
      const { products } = await loadCatalog();
      return Object.fromEntries(
        products
          .filter((p) => p.category === "phones" || p.category === "tablets")
          .map((p) => {
            const open = p.variants.filter((v) => v.available);
            const pool = open.length ? open : p.variants;
            return [
              p.handle,
              { from: Math.min(...pool.map((v) => v.price)), available: open.length > 0 },
            ];
          }),
      );
    } catch (e) {
      console.error("Shopify device prices failed:", e);
      return {};
    }
  },
);

// ---------- cart ----------
//
// The browser keeps its own copy of the cart, and every change is mirrored into a real Shopify
// cart, so checkout always uses Shopify's own cart and its own secure checkout URL. Nothing here
// builds a checkout link by hand.

export type CartLineResult = { lineId: string; variantId: string; quantity: number };

export type ShopifyCart = { cartId: string; checkoutUrl: string; lines: CartLineResult[] };

export type CartResult =
  | { mode: "shopify"; cart: ShopifyCart }
  | { mode: "preview" } // no store connected, or preview items: the browser keeps its own cart
  | { mode: "gone" } // Shopify no longer knows this cart (checkout finished, or it expired)
  | { mode: "error"; message: string };

type UserError = { field: string[] | null; message: string };

const CART_FIELDS = `
  id
  checkoutUrl
  lines(first: 100) {
    nodes {
      id
      quantity
      merchandise { ... on ProductVariant { id } }
    }
  }
`;

type RawCart = {
  id: string;
  checkoutUrl: string;
  lines: { nodes: { id: string; quantity: number; merchandise: { id: string } }[] };
};

/** Shopify's checkout needs the channel marked, or it can ask for a store password. */
export function formatCheckoutUrl(url: string) {
  try {
    const next = new URL(url);
    next.searchParams.set("channel", "online_store");
    return next.toString();
  } catch {
    return url;
  }
}

function toCart(cart: RawCart): ShopifyCart {
  return {
    cartId: cart.id,
    checkoutUrl: formatCheckoutUrl(cart.checkoutUrl),
    lines: cart.lines.nodes.map((n) => ({
      lineId: n.id,
      variantId: n.merchandise.id,
      quantity: n.quantity,
    })),
  };
}

const isGone = (errors: UserError[]) =>
  errors.some((e) => /cart.*(not found|does not exist)|no such cart/i.test(e.message));

const errorMessage = (errors: UserError[]) =>
  errors.map((e) => e.message).join("; ") || "Shopify refused the change";

const previewLine = (variantId: string) => variantId.startsWith("preview:");

const asLines = (d: unknown) => {
  const lines = (d as { lines?: unknown }).lines;
  if (!Array.isArray(lines) || lines.length === 0 || lines.length > 100)
    throw new Error("Cart is empty");
  return lines.map((l) => ({
    merchandiseId: String((l as { variantId: unknown }).variantId),
    quantity: Math.min(99, Math.max(1, Math.floor(Number((l as { quantity: unknown }).quantity)))),
  }));
};

const asCartId = (d: unknown) => String((d as { cartId?: unknown }).cartId ?? "");

/** Start a Shopify cart with the given lines. */
export const createCart = createServerFn({ method: "POST" })
  .validator(asLines)
  .handler(async ({ data }): Promise<CartResult> => {
    if (!isLive() || data.some((l) => previewLine(l.merchandiseId))) return { mode: "preview" };
    try {
      const res = await storefront<{
        cartCreate: { cart: RawCart | null; userErrors: UserError[] };
      }>(
        `mutation CartCreate($input: CartInput!) {
          cartCreate(input: $input) { cart { ${CART_FIELDS} } userErrors { field message } }
        }`,
        { input: { lines: data } },
      );
      const { cart, userErrors } = res.cartCreate;
      if (!cart) return { mode: "error", message: errorMessage(userErrors) };
      return { mode: "shopify", cart: toCart(cart) };
    } catch (e) {
      return { mode: "error", message: e instanceof Error ? e.message : String(e) };
    }
  });

/** Add lines to an existing Shopify cart. */
export const addCartLines = createServerFn({ method: "POST" })
  .validator((d: unknown) => ({ cartId: asCartId(d), lines: asLines(d) }))
  .handler(async ({ data }): Promise<CartResult> => {
    if (!isLive()) return { mode: "preview" };
    try {
      const res = await storefront<{
        cartLinesAdd: { cart: RawCart | null; userErrors: UserError[] };
      }>(
        `mutation CartAdd($cartId: ID!, $lines: [CartLineInput!]!) {
          cartLinesAdd(cartId: $cartId, lines: $lines) { cart { ${CART_FIELDS} } userErrors { field message } }
        }`,
        data,
      );
      const { cart, userErrors } = res.cartLinesAdd;
      if (isGone(userErrors)) return { mode: "gone" };
      if (!cart) return { mode: "error", message: errorMessage(userErrors) };
      return { mode: "shopify", cart: toCart(cart) };
    } catch (e) {
      return { mode: "error", message: e instanceof Error ? e.message : String(e) };
    }
  });

/** Change the quantity on cart lines the store already has. */
export const updateCartLines = createServerFn({ method: "POST" })
  .validator((d: unknown) => {
    const lines = (d as { lines?: unknown }).lines;
    if (!Array.isArray(lines) || lines.length === 0) throw new Error("Nothing to update");
    return {
      cartId: asCartId(d),
      lines: lines.map((l) => ({
        id: String((l as { lineId: unknown }).lineId),
        quantity: Math.min(
          99,
          Math.max(1, Math.floor(Number((l as { quantity: unknown }).quantity))),
        ),
      })),
    };
  })
  .handler(async ({ data }): Promise<CartResult> => {
    if (!isLive()) return { mode: "preview" };
    try {
      const res = await storefront<{
        cartLinesUpdate: { cart: RawCart | null; userErrors: UserError[] };
      }>(
        `mutation CartUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
          cartLinesUpdate(cartId: $cartId, lines: $lines) { cart { ${CART_FIELDS} } userErrors { field message } }
        }`,
        data,
      );
      const { cart, userErrors } = res.cartLinesUpdate;
      if (isGone(userErrors)) return { mode: "gone" };
      if (!cart) return { mode: "error", message: errorMessage(userErrors) };
      return { mode: "shopify", cart: toCart(cart) };
    } catch (e) {
      return { mode: "error", message: e instanceof Error ? e.message : String(e) };
    }
  });

/** Take lines out of the Shopify cart. */
export const removeCartLines = createServerFn({ method: "POST" })
  .validator((d: unknown) => {
    const raw = (d as { lineIds?: unknown }).lineIds;
    return {
      cartId: asCartId(d),
      lineIds: Array.isArray(raw) ? raw.map(String) : [],
    };
  })
  .handler(async ({ data }): Promise<CartResult> => {
    if (!isLive() || data.lineIds.length === 0) return { mode: "preview" };
    try {
      const res = await storefront<{
        cartLinesRemove: { cart: RawCart | null; userErrors: UserError[] };
      }>(
        `mutation CartRemove($cartId: ID!, $lineIds: [ID!]!) {
          cartLinesRemove(cartId: $cartId, lineIds: $lineIds) { cart { ${CART_FIELDS} } userErrors { field message } }
        }`,
        data,
      );
      const { cart, userErrors } = res.cartLinesRemove;
      if (isGone(userErrors)) return { mode: "gone" };
      if (!cart) return { mode: "error", message: errorMessage(userErrors) };
      return { mode: "shopify", cart: toCart(cart) };
    } catch (e) {
      return { mode: "error", message: e instanceof Error ? e.message : String(e) };
    }
  });

/** Read the cart back from Shopify — used when the page loads or the shopper comes back. */
export const readCart = createServerFn({ method: "POST" })
  .validator(asCartId)
  .handler(async ({ data }): Promise<CartResult> => {
    if (!isLive() || !data) return { mode: "preview" };
    try {
      const res = await storefront<{ cart: RawCart | null }>(
        `query Cart($id: ID!) { cart(id: $id) { ${CART_FIELDS} } }`,
        { id: data },
      );
      if (!res.cart) return { mode: "gone" };
      return { mode: "shopify", cart: toCart(res.cart) };
    } catch (e) {
      return { mode: "error", message: e instanceof Error ? e.message : String(e) };
    }
  });
