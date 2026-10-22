import { describe, expect, it } from "vitest";
import { validateStockInput } from "@/admin/stock-input";
describe("confirmed Shopify stock", () => {
  const linked = { inventoryItemId: "gid://shopify/InventoryItem/123", quantity: 5, compareQuantity: 3 };
  it("preserves the comparison count for conflict detection", () => expect(validateStockInput(linked)).toEqual(linked));
  it("rejects a missing baseline", () => expect(() => validateStockInput({ ...linked, compareQuantity: undefined })).toThrow());
  it("rejects fractional stock", () => expect(() => validateStockInput({ ...linked, quantity: 2.5 })).toThrow());
});