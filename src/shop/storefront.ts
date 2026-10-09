import { createServerFn } from "@tanstack/react-start";

import { PREVIEW_PRODUCTS } from "@/shop/preview-catalog";
import type { Catalog, ShopCategory, ShopProduct } from "@/shop/types";

// Shopify Storefront API bridge for the public shop. Runs on the server.
// Without credentials the shop serves the preview catalog and checkout runs in preview mode.
//
// Env (see docs/shop.md):
//   SHOPIFY_STORE_DOMAIN               your-store.myshopify.com (shared with the dashboard)
//   SHOPIFY_STOREFRONT_ACCESS_TOKEN    Storefront API access token (Headless channel or custom app)
//   SHOPIFY_API_VERSION                optional, defaults below

const DEFAULT_API_VERSION = "2026-07";
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

function categoryFor(productType: string, tags: string[]): ShopCategory {
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

type ProductsQuery = {
  products: {
    nodes: {
      id: string;
      handle: string;
      title: string;
      vendor: string;
      productType: string;
      tags: string[];
      description: string;
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
  const { domain, token } = config();
  if (!domain || !token) return { source: "preview", products: PREVIEW_PRODUCTS };
  if (cache && Date.now() - cache.at < CACHE_MS) return cache.catalog;
  const data = await storefront<ProductsQuery>(`{
    products(first: 100, sortKey: BEST_SELLING) {
      nodes {
        id handle title vendor productType tags description
        images(first: 6) { nodes { url altText } }
        options { name }
        variants(first: 50) {
          nodes { id title availableForSale price { amount } compareAtPrice { amount } image { url altText } }
        }
      }
    }
  }`);
  const products: ShopProduct[] = data.products.nodes.map((p, i) => {
    const vs = p.variants.nodes.map((v) => ({
      id: v.id,
      title: v.title,
      price: cents(v.price.amount) ?? 0,
      compareAtPrice: cents(v.compareAtPrice?.amount),
      available: v.availableForSale,
      image: v.image ? { url: v.image.url, alt: v.image.altText ?? p.title } : null,
    }));
    const onSale = vs.some((v) => v.compareAtPrice && v.compareAtPrice > v.price);
    const tags = p.tags.map((t) => t.toLowerCase());
    return {
      id: p.id,
      handle: p.handle,
      title: p.title,
      vendor: p.vendor,
      category: categoryFor(p.productType, p.tags),
      description: p.description,
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

export const createCheckout = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => {
    const lines = (d as { lines?: unknown }).lines;
    if (!Array.isArray(lines) || lines.length === 0 || lines.length > 100)
      throw new Error("Cart is empty");
    return {
      lines: lines.map((l) => ({
        merchandiseId: String((l as { variantId: unknown }).variantId),
        quantity: Math.min(
          99,
          Math.max(1, Math.floor(Number((l as { quantity: unknown }).quantity))),
        ),
      })),
    };
  })
  .handler(async ({ data }): Promise<{ mode: "shopify"; url: string } | { mode: "preview" }> => {
    const { domain, token } = config();
    if (!domain || !token || data.lines.some((l) => l.merchandiseId.startsWith("preview:")))
      return { mode: "preview" };
    const res = await storefront<{
      cartCreate: { cart: { checkoutUrl: string } | null; userErrors: { message: string }[] };
    }>(
      `mutation Checkout($lines: [CartLineInput!]!) {
        cartCreate(input: { lines: $lines }) { cart { checkoutUrl } userErrors { message } }
      }`,
      { lines: data.lines },
    );
    const errors = res.cartCreate.userErrors;
    if (errors.length || !res.cartCreate.cart)
      throw new Error(errors.map((e) => e.message).join("; ") || "Checkout failed");
    return { mode: "shopify", url: res.cartCreate.cart.checkoutUrl };
  });
