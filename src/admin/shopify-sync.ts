import { z } from "zod";
import type { Category, Product } from "@/admin/types";

export const variantValuesSchema = z.object({
  price: z.number().int().min(0).max(100000000),
  quantity: z.number().int().min(0).max(1000000),
  sku: z.string().max(255),
  barcode: z.string().max(255),
});
export type VariantValues = z.infer<typeof variantValuesSchema>;
export const pushItemSchema = z.object({
  id: z.string().uuid(),
  productId: z.string().regex(/^gid:\/\/shopify\/Product\/\d+$/),
  variantId: z.string().regex(/^gid:\/\/shopify\/ProductVariant\/\d+$/),
  inventoryItemId: z.string().regex(/^gid:\/\/shopify\/InventoryItem\/\d+$/),
  locationId: z.string().regex(/^gid:\/\/shopify\/Location\/\d+$/),
  expected: variantValuesSchema,
  values: variantValuesSchema,
});
export type ShopifyPushItem = z.infer<typeof pushItemSchema>;

export type ShopifyVariantRow = VariantValues & {
  name: string;
  brand: string;
  productType: string;
  status: string;
  image: string | null;
  productId: string;
  variantId: string;
  inventoryItemId: string;
  locationId: string;
  locationName: string;
  tracked: boolean;
  stocked: boolean;
};

export const valuesOf = (p: Pick<Product, "price" | "quantity" | "sku" | "barcode">): VariantValues =>
  ({ price: p.price, quantity: p.quantity, sku: p.sku, barcode: p.barcode });
export function changedFields(values: VariantValues, baseline: VariantValues) {
  return (["price", "quantity", "sku", "barcode"] as const).filter((key) => values[key] !== baseline[key]);
}
export function productChanges(p: Product) {
  return p.shopifyBaseline ? changedFields(valuesOf(p), p.shopifyBaseline) : [];
}
export function buildPushItem(p: Product): ShopifyPushItem {
  if (!p.shopifyBaseline) throw new Error(`Refresh Shopify before pushing ${p.name}.`);
  return pushItemSchema.parse({ id: p.id, productId: p.shopifyProductId, variantId: p.shopifyVariantId,
    inventoryItemId: p.shopifyInventoryItemId, locationId: p.shopifyLocationId,
    expected: p.shopifyBaseline, values: valuesOf(p) });
}
export function inferCategory(name: string, productType: string): Category {
  const text = `${productType} ${name}`.toLowerCase();
  if (/case|charger|protector|cable|mount/.test(text)) return "Accessories";
  if (/earbud|headphone|airpod|speaker|bluetooth/.test(text)) return "Audio";
  if (/ipad|tablet/.test(text)) return "Tablets";
  if (/macbook|laptop|notebook/.test(text)) return "Laptops";
  if (/playstation|xbox|nintendo|console/.test(text)) return "Game consoles";
  if (/watch|wearable/.test(text)) return "Wearables";
  if (/iphone|galaxy|phone|pixel|moto/.test(text)) return "Phones";
  return "Accessories";
}