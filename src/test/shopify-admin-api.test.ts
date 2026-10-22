import { beforeEach, expect, it, vi } from "vitest";
const auth = vi.hoisted(() => ({ requireAdmin: vi.fn() }));
vi.mock("@/admin/session.server", () => auth);
vi.mock("@tanstack/react-start", () => ({ createServerFn: () => {
  let validate = (data: unknown): unknown => data;
  const builder = { validator: (fn: typeof validate) => { validate = fn; return builder; }, handler: (fn: (input: { data: unknown }) => unknown) => (input: { data: unknown }) => fn({ data: validate(input.data) }) };
  return builder;
} }));
import { shopifyPullProducts, shopifyPushProducts } from "@/admin/shopify";
const remote = { id: "gid://shopify/ProductVariant/2", title: "Default Title", barcode: "123", price: "829.00", image: null, product: { id: "gid://shopify/Product/1", title: "iPhone", vendor: "Apple", productType: "Phone", status: "ACTIVE", featuredImage: null }, inventoryItem: { id: "gid://shopify/InventoryItem/3", sku: "PHONE", tracked: true, inventoryLevel: { quantities: [{ name: "available", quantity: 4 }] } } };
const location = { id: "gid://shopify/Location/4", name: "Store" };
const fetchMock = vi.fn();
const answer = (data: unknown) => new Response(JSON.stringify({ data }), { status: 200 });
beforeEach(() => { vi.resetAllMocks(); vi.stubEnv("SHOPIFY_STORE_DOMAIN", "example.myshopify.com"); vi.stubEnv("SHOPIFY_ADMIN_ACCESS_TOKEN", "test-only-not-a-credential"); vi.stubGlobal("fetch", fetchMock); auth.requireAdmin.mockResolvedValue(undefined); });
it("paginates the complete variant catalog", async () => {
  fetchMock.mockResolvedValueOnce(answer({ locations: { nodes: [location] } }))
    .mockResolvedValueOnce(answer({ productVariants: { nodes: [remote], pageInfo: { hasNextPage: true, endCursor: "next" } } }))
    .mockResolvedValueOnce(answer({ productVariants: { nodes: [{ ...remote, id: "gid://shopify/ProductVariant/5" }], pageInfo: { hasNextPage: false, endCursor: null } } }));
  expect(await shopifyPullProducts({ data: { adminKey: "" } })).toHaveLength(2);
  expect(JSON.parse(fetchMock.mock.calls[2]?.[1].body).variables.after).toBe("next");
});
it("denies unauthenticated import before contacting Shopify", async () => {
  auth.requireAdmin.mockRejectedValue(new Error("Unauthorized"));
  await expect(shopifyPullProducts({ data: { adminKey: "" } })).rejects.toThrow("Unauthorized"); expect(fetchMock).not.toHaveBeenCalled();
});
it("uses the API quantity comparison and rereads confirmed stock", async () => {
  fetchMock.mockResolvedValueOnce(answer({ locations: { nodes: [location] } }))
    .mockResolvedValueOnce(answer({ productVariant: remote }))
    .mockResolvedValueOnce(answer({ inventorySetQuantities: { userErrors: [] } }))
    .mockResolvedValueOnce(answer({ productVariant: { ...remote, inventoryItem: { ...remote.inventoryItem, inventoryLevel: { quantities: [{ name: "available", quantity: 5 }] } } } }));
  const expected = { price: 82900, quantity: 4, sku: "PHONE", barcode: "123" };
  const result = await shopifyPushProducts({ data: { confirmed: true, items: [{ id: "bb1fdc0c-15b8-4b7c-99a2-1acf6c269657", productId: remote.product.id, variantId: remote.id, inventoryItemId: remote.inventoryItem.id, locationId: location.id, expected, values: { ...expected, quantity: 5 } }] } });
  expect(result[0]?.row?.quantity).toBe(5); expect(result[0]?.error).toBeNull();
  expect(JSON.parse(fetchMock.mock.calls[2]?.[1].body).variables.input.quantities[0]).toMatchObject({ quantity: 5, changeFromQuantity: 4 });
});