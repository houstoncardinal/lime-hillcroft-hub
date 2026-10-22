import { createServerFn } from "@tanstack/react-start";

// Shopify Admin API bridge. Runs only on the server: the access token is read from server
// environment variables and never reaches the browser. Every call validates the admin cookie.
//
// Required env (see docs/admin.md):
//   SHOPIFY_STORE_DOMAIN        e.g. tic-wireless.myshopify.com
//   SHOPIFY_ADMIN_ACCESS_TOKEN  Admin API token from a custom app (read/write products + inventory)
// Optional: SHOPIFY_API_VERSION (default below), SHOPIFY_LOCATION_ID (default: first location)

const DEFAULT_API_VERSION = "2026-10";

type KeyInput = { adminKey: string };

function env(name: string) {
  return (process.env[name] ?? "").trim();
}

async function authorize(_adminKey: string) {
  const { requireAdmin } = await import("@/admin/session.server");
  await requireAdmin();
}

function shopifyConfig() {
  const domain = env("SHOPIFY_STORE_DOMAIN")
    .replace(/^https?:\/\//, "")
    .replace(/\/$/, "");
  const token = env("SHOPIFY_ACCESS_TOKEN") || env("SHOPIFY_ADMIN_ACCESS_TOKEN");
  return { domain, token, version: env("SHOPIFY_API_VERSION") || DEFAULT_API_VERSION };
}

async function gql<T>(query: string, variables: Record<string, unknown> = {}): Promise<T> {
  const { domain, token, version } = shopifyConfig();
  if (!domain || !token) throw new Error("Shopify is not connected yet.");
  const res = await fetch(`https://${domain}/admin/api/${version}/graphql.json`, {
    method: "POST",
    headers: { "Content-Type": "application/json", "X-Shopify-Access-Token": token },
    body: JSON.stringify({ query, variables }),
  });
  if (res.status === 401) throw new Error("Shopify stock access has expired. Reconnect Shopify before importing or pushing inventory. Online shopping is unaffected.");
  if (!res.ok) throw new Error(`Shopify responded ${res.status} ${res.statusText}`);
  const json = (await res.json()) as { data?: T; errors?: { message: string }[] };
  if (json.errors?.length) throw new Error(json.errors.map((e) => e.message).join("; "));
  if (!json.data) throw new Error("Empty response from Shopify.");
  return json.data;
}

async function locationId() {
  const configured = env("SHOPIFY_LOCATION_ID");
  if (configured) return configured;
  const data = await gql<{ locations: { nodes: { id: string; name: string }[] } }>(
    `{ locations(first: 1) { nodes { id name } } }`,
  );
  const id = data.locations.nodes[0]?.id;
  if (!id) throw new Error("No Shopify location found.");
  return id;
}

const validateKey = (d: unknown) => {
  const adminKey = (d as Partial<KeyInput> | null)?.adminKey;
  return { adminKey: typeof adminKey === "string" ? adminKey : "" };
};

export const shopifyStatus = createServerFn({ method: "POST" })
  .validator(validateKey)
  .handler(async ({ data }) => {
    await authorize(data.adminKey);
    const { domain, token, version } = shopifyConfig();
    const base = {
      serverKeySet: true,
      configured: Boolean(domain && token),
      domain,
      version,
    };
    if (!base.configured) return { ...base, connected: false, shopName: null, error: null };
    try {
      await authorize(data.adminKey);
      const shop = await gql<{ shop: { name: string; currencyCode: string } }>(
        `{ shop { name currencyCode } }`,
      );
      return { ...base, connected: true, shopName: shop.shop.name, error: null };
    } catch (e) {
      return { ...base, connected: false, shopName: null, error: (e as Error).message };
    }
  });

export type ShopifyVariantRow = {
  sku: string;
  name: string;
  brand: string;
  price: number;
  quantity: number;
  productId: string;
  variantId: string;
  inventoryItemId: string;
};

type ProductsPage = {
  products: {
    pageInfo: { hasNextPage: boolean; endCursor: string | null };
    nodes: {
      id: string;
      title: string;
      vendor: string;
      variants: {
        nodes: {
          id: string;
          title: string;
          sku: string | null;
          price: string;
          inventoryQuantity: number | null;
          inventoryItem: { id: string; inventoryLevel: { quantities: { name: string; quantity: number }[] } | null };
        }[];
      };
    }[];
  };
};

export const shopifyPullProducts = createServerFn({ method: "POST" })
  .validator(validateKey)
  .handler(async ({ data }): Promise<ShopifyVariantRow[]> => {
    await authorize(data.adminKey);
    const location = await locationId();
    const rows: ShopifyVariantRow[] = [];
    let after: string | null = null;
    while (true) {
      const res: ProductsPage = await gql<ProductsPage>(
        `query Products($after: String, $location: ID!) {
          products(first: 100, after: $after) {
            pageInfo { hasNextPage endCursor }
            nodes {
              id title vendor
              variants(first: 100) {
                nodes { id title sku price inventoryQuantity inventoryItem { id inventoryLevel(locationId: $location) { quantities(names: ["available"]) { name quantity } } } }
              }
            }
          }
        }`,
        { after, location },
      );
      for (const p of res.products.nodes)
        for (const v of p.variants.nodes)
          rows.push({
            sku: v.sku ?? "",
            name: v.title === "Default Title" ? p.title : `${p.title} — ${v.title}`,
            brand: p.vendor,
            price: Math.round(Number(v.price) * 100),
            quantity: v.inventoryItem.inventoryLevel?.quantities.find((q) => q.name === "available")?.quantity ?? 0,
            productId: p.id,
            variantId: v.id,
            inventoryItemId: v.inventoryItem.id,
          });
      if (!res.products.pageInfo.hasNextPage) break;
      after = res.products.pageInfo.endCursor;
    }
    return rows;
  });

export const shopifyPushQuantities = createServerFn({ method: "POST" })
  .validator((d: unknown) => {
    const { adminKey } = validateKey(d);
    const items = (d as { items?: unknown }).items;
    if (!Array.isArray(items)) throw new Error("items is required");
    return {
      adminKey,
      items: items.map((i) => ({
        ...validateStockInput(i),
      })),
    };
  })
  .handler(async ({ data }) => {
    await authorize(data.adminKey);
    const location = await locationId();
    const res = await gql<{
      inventorySetQuantities: { userErrors: { field: string[] | null; message: string }[] };
    }>(
      `mutation Set($input: InventorySetQuantitiesInput!) {
        inventorySetQuantities(input: $input) { userErrors { field message } }
      }`,
      {
        input: {
          name: "available",
          reason: "correction",
          ignoreCompareQuantity: false,
          quantities: data.items.map((i) => ({
            inventoryItemId: i.inventoryItemId,
            locationId: location,
            quantity: i.quantity,
            compareQuantity: i.compareQuantity,
          })),
        },
      },
    );
    const errors = res.inventorySetQuantities.userErrors;
    if (errors.length) throw new Error(errors.map((e) => e.message).join("; "));
    return { updated: data.items.length };
  });
