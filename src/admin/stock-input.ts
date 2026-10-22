export function validateStockInput(input: unknown) {
  const value = input as { inventoryItemId?: unknown; quantity?: unknown; compareQuantity?: unknown } | null;
  if (!value || typeof value.inventoryItemId !== "string" || !value.inventoryItemId.startsWith("gid://shopify/InventoryItem/")) throw new Error("A linked Shopify inventory item is required.");
  if (typeof value.quantity !== "number" || !Number.isSafeInteger(value.quantity) || value.quantity < 0) throw new Error("Stock quantity must be a whole nonnegative number.");
  if (typeof value.compareQuantity !== "number" || !Number.isSafeInteger(value.compareQuantity)) throw new Error("Import the confirmed Shopify count before pushing stock.");
  return { inventoryItemId: value.inventoryItemId, quantity: value.quantity, compareQuantity: value.compareQuantity };
}