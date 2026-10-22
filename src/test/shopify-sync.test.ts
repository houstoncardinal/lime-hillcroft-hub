import { beforeEach, expect, it, vi } from "vitest";
const api = vi.hoisted(() => ({ readAdminData: vi.fn(), writeAdminData: vi.fn(), readSiteEvents: vi.fn() }));
vi.mock("@/admin/data.functions", () => api);
import { initializeAdminData, inventory, resetAdminData, settings, waitForAdminWrites } from "@/admin/store";
import { buildPushItem, productChanges, pushItemSchema, type ShopifyVariantRow } from "@/admin/shopify-sync";
import type { AdminData } from "@/admin/types";
const row: ShopifyVariantRow = { sku: "PHONE", barcode: "123", name: "iPhone 12", brand: "Apple", productType: "Phone", status: "ACTIVE", image: null, price: 82900, quantity: 4, productId: "gid://shopify/Product/1", variantId: "gid://shopify/ProductVariant/2", inventoryItemId: "gid://shopify/InventoryItem/3", locationId: "gid://shopify/Location/4", locationName: "Store", tracked: true, stocked: true };
const data = () => JSON.parse(settings.exportJson()) as AdminData;
beforeEach(async () => {
  resetAdminData(); vi.resetAllMocks(); api.readAdminData.mockResolvedValue(null); api.readSiteEvents.mockResolvedValue([]);
  api.writeAdminData.mockImplementation(async ({ data: input }) => ({ conflict: false, revision: input.revision + 1 }));
  await initializeAdminData();
});
it("imports all variant IDs even with duplicated SKUs and refreshes without duplicates", async () => {
  const second = { ...row, variantId: "gid://shopify/ProductVariant/5" };
  inventory.mergeShopify([row, second]); inventory.mergeShopify([row, second]); await waitForAdminWrites();
  expect(data().products).toHaveLength(2);
});
it("refreshes remote price and stock while preserving a pending price edit", async () => {
  inventory.mergeShopify([row]); const p = data().products[0]; if (!p) throw new Error("Missing imported row");
  inventory.save({ ...p, price: 85000 }, "Manager");
  inventory.mergeShopify([{ ...row, price: 84000, quantity: 3 }]); await waitForAdminWrites();
  const result = data().products[0];
  expect(result?.price).toBe(85000); expect(result?.quantity).toBe(3);
  expect(result?.shopifyBaseline?.price).toBe(84000); expect(result?.syncStatus).toBe("error");
});
it("does not mark newer edits synced when an older push completes", async () => {
  inventory.mergeShopify([row]); const p = data().products[0]; if (!p) throw new Error("Missing row");
  inventory.save({ ...p, price: 85000 }, "Manager");
  const edited = data().products[0]; if (!edited) throw new Error("Missing row");
  const item = buildPushItem(edited);
  inventory.save({ ...edited, price: 86000 }, "Manager");
  inventory.applyPushResult(item, { ...row, price: 85000 }, null); await waitForAdminWrites();
  const result = data().products[0]; expect(result?.price).toBe(86000); expect(result?.shopifyBaseline?.price).toBe(85000); expect(result?.syncStatus).toBe("pending");
});
it("advances successful price readback after stock failure and retries only remaining stock", async () => {
  inventory.mergeShopify([row]); const p = data().products[0]; if (!p) throw new Error("Missing row");
  inventory.save({ ...p, price: 85000, quantity: 5 }, "Manager");
  const edited = data().products[0]; if (!edited) throw new Error("Missing row");
  inventory.applyPushResult(buildPushItem(edited), { ...row, price: 85000, quantity: 3 }, "Stock conflict"); await waitForAdminWrites();
  const result = data().products[0]; if (!result) throw new Error("Missing row");
  expect(productChanges(result)).toEqual(["quantity"]); expect(result.quantity).toBe(5);
});
it("rejects fractional stock and missing confirmed baselines", () => {
  expect(pushItemSchema.safeParse({ values: { ...row, quantity: 1.5 } }).success).toBe(false);
});