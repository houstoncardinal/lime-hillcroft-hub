import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { changedFields, pushItemSchema, type ShopifyVariantRow } from "@/admin/shopify-sync";

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
  const token = env("SHOPIFY_ADMIN_ACCESS_TOKEN") || env("SHOPIFY_ACCESS_TOKEN");
  return { domain, token, version: DEFAULT_API_VERSION };
}

async function gql<T>(query: string, variables: Record<string, unknown> = {}): Promise<T> {
  const { domain, token, version } = shopifyConfig();
  if (!domain || !token) throw new Error("Shopify is not connected yet.");
  const request = (accessToken: string) => fetch(`https://${domain}/admin/api/${version}/graphql.json`, {
    method: "POST",
    headers: { "Content-Type": "application/json", "X-Shopify-Access-Token": accessToken },
    body: JSON.stringify({ query, variables }),
  });
  const res = await request(token);
  if (res.status === 401) throw new Error("Shopify rejected inventory authorization. A valid Admin API token for this store is required. Online shopping is unaffected.");
  if (!res.ok) throw new Error(`Shopify responded ${res.status} ${res.statusText}`);
  const json = (await res.json()) as { data?: T; errors?: { message: string }[] };
  if (json.errors?.length) throw new Error(json.errors.map((e) => e.message).join("; "));
  if (!json.data) throw new Error("Empty response from Shopify.");
  return json.data;
}

async function getLocation() {
  const configured = env("SHOPIFY_LOCATION_ID");
  const data = await gql<{ locations: { nodes: { id: string; name: string }[] } }>(
    `{ locations(first: 100) { nodes { id name } } }`);
  const location = configured ? data.locations.nodes.find(l => l.id === configured) : data.locations.nodes[0];
  if (!location) throw new Error("No configured Shopify location found.");
  return location;
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

export type { ShopifyVariantRow } from "@/admin/shopify-sync";

type RemoteVariant = {
  id: string; title: string; barcode: string | null; price: string;
  image: { url: string } | null;
  product: { id: string; title: string; vendor: string; productType: string; status: string; featuredImage: { url: string } | null };
  inventoryItem: { id: string; sku: string | null; tracked: boolean; inventoryLevel: { quantities: { name: string; quantity: number }[] } | null };
};
const VARIANT_FIELDS = `id title barcode price image { url } product { id title vendor productType status featuredImage { url } }
  inventoryItem { id sku tracked inventoryLevel(locationId: $location) { quantities(names: ["available"]) { name quantity } } }`;
function rowOf(v: RemoteVariant, location: { id: string; name: string }): ShopifyVariantRow {
  return { sku: v.inventoryItem.sku ?? "", barcode: v.barcode ?? "",
    name: v.title === "Default Title" ? v.product.title : `${v.product.title} — ${v.title}`,
    brand: v.product.vendor, productType: v.product.productType, status: v.product.status,
    image: v.image?.url ?? v.product.featuredImage?.url ?? null,
    price: Math.round(Number(v.price) * 100),
    quantity: Math.max(0, v.inventoryItem.inventoryLevel?.quantities.find(q => q.name === "available")?.quantity ?? 0),
    productId: v.product.id, variantId: v.id, inventoryItemId: v.inventoryItem.id,
    locationId: location.id, locationName: location.name, tracked: v.inventoryItem.tracked,
    stocked: v.inventoryItem.inventoryLevel !== null };
}
export const shopifyPullProducts = createServerFn({ method: "POST" })
  .validator(validateKey)
  .handler(async ({ data }): Promise<ShopifyVariantRow[]> => {
    await authorize(data.adminKey);
    const location = await getLocation();
    const rows: ShopifyVariantRow[] = [];
    let after: string | null = null;
    while (true) {
      const res: { productVariants: { nodes: RemoteVariant[]; pageInfo: { hasNextPage: boolean; endCursor: string | null } } } = await gql(
        `query Variants($after: String, $location: ID!) { productVariants(first: 100, after: $after) {
          nodes { ${VARIANT_FIELDS} } pageInfo { hasNextPage endCursor } } }`, { after, location: location.id });
      rows.push(...res.productVariants.nodes.map(v => rowOf(v, location)));
      if (!res.productVariants.pageInfo.hasNextPage) break;
      const cursor = res.productVariants.pageInfo.endCursor;
      if (!cursor || cursor === after) throw new Error("Shopify pagination stopped unexpectedly. Retry import.");
      after = cursor;
    }
    return rows;
  });

async function readVariant(id: string, location: { id: string; name: string }) {
  const result = await gql<{ productVariant: RemoteVariant | null }>(
    `query Variant($id: ID!, $location: ID!) { productVariant(id: $id) { ${VARIANT_FIELDS} } }`, { id, location: location.id });
  if (!result.productVariant) throw new Error("This variant no longer exists in Shopify. Refresh the catalog.");
  return rowOf(result.productVariant, location);
}

export type ShopifyPushResult = { id: string; row: ShopifyVariantRow | null; error: string | null };
export const shopifyPushProducts = createServerFn({ method: "POST" })
  .validator((input: unknown) => z.object({ items: z.array(pushItemSchema).min(1).max(20), confirmed: z.literal(true) }).parse(input))
  .handler(async ({ data }): Promise<ShopifyPushResult[]> => {
    await authorize("");
    const location = await getLocation();
    const results: ShopifyPushResult[] = [];
    for (const item of data.items) {
      let row: ShopifyVariantRow | null = null;
      try {
        if (item.locationId !== location.id) throw new Error("Shopify location changed. Refresh before pushing.");
        row = await readVariant(item.variantId, location);
        if (row.productId !== item.productId || row.inventoryItemId !== item.inventoryItemId) throw new Error("Variant identity changed. Refresh before pushing.");
        const changes = changedFields(item.values, item.expected);
        const conflicts = changes.filter(key => row?.[key] !== item.expected[key]);
        if (conflicts.length) throw new Error(`Shopify changed ${conflicts.join(", ")} since the last import. Review the new values and retry.`);
        if (changes.includes("quantity") && (!row.tracked || !row.stocked)) throw new Error("Stock is not tracked at this location. Enable tracking and stock this item in Shopify first.");
        const fields: Record<string, unknown> = { id: item.variantId };
        if (changes.includes("price")) fields["price"] = (item.values.price / 100).toFixed(2);
        if (changes.includes("barcode")) fields["barcode"] = item.values.barcode;
        if (changes.includes("sku")) fields["inventoryItem"] = { sku: item.values.sku };
        if (Object.keys(fields).length > 1) {
          const mutation = await gql<{ productVariantsBulkUpdate: { userErrors: { message: string }[] } }>(
            `mutation Update($product: ID!, $variants: [ProductVariantsBulkInput!]!) {
              productVariantsBulkUpdate(productId: $product, variants: $variants, allowPartialUpdates: false) { userErrors { message } } }`,
            { product: item.productId, variants: [fields] });
          if (mutation.productVariantsBulkUpdate.userErrors.length) throw new Error(mutation.productVariantsBulkUpdate.userErrors.map(e => e.message).join("; "));
        }
        if (changes.includes("quantity")) {
          const mutation = await gql<{ inventorySetQuantities: { userErrors: { message: string }[] } }>(
            `mutation Stock($input: InventorySetQuantitiesInput!) { inventorySetQuantities(input: $input) { userErrors { message } } }`,
            { input: { name: "available", reason: "correction", quantities: [{ inventoryItemId: item.inventoryItemId,
              locationId: location.id, quantity: item.values.quantity, changeFromQuantity: item.expected.quantity }] } });
          if (mutation.inventorySetQuantities.userErrors.length) throw new Error(mutation.inventorySetQuantities.userErrors.map(e => e.message).join("; "));
        }
        row = await readVariant(item.variantId, location);
        if (changes.some(key => row?.[key] !== item.values[key])) throw new Error("Shopify returned different values. Review before retrying.");
        results.push({ id: item.id, row, error: null });
      } catch (error) {
        // A price edit may succeed before a stock conflict. Read back the actual state,
        // so retries send only the fields that still differ, never replaying successful writes.
        row = await readVariant(item.variantId, location).catch(() => null);
        results.push({ id: item.id, row, error: error instanceof Error ? error.message : "Shopify update failed." });
      }
    }
    return results;
  });
