import { beforeEach, describe, expect, it, vi } from "vitest";
const api = vi.hoisted(() => ({ createCart: vi.fn(), addCartLines: vi.fn(), updateCartLines: vi.fn(), removeCartLines: vi.fn(), readCart: vi.fn() }));
vi.mock("@/shop/storefront", () => api);
import { useCartStore } from "@/shop/cart";
import type { ShopProduct } from "@/shop/types";
const product: ShopProduct = { id: "p", handle: "phone", title: "Phone", vendor: "TIC", category: "phones", description: "", features: [], images: [], optionName: null, variants: [{ id: "gid://shopify/ProductVariant/1", title: "Default", price: 82900, compareAtPrice: null, available: true, image: null }], badge: null, featured: false };
const variant = product.variants[0];
const result = (quantity = 1, lease = false, price = 82900) => ({ mode: "shopify", cart: { cartId: "cart", checkoutUrl: "https://example.test/checkout?channel=online_store", lines: [{ variantId: variant?.id, lineId: "line", quantity, lease, price }] } });
beforeEach(() => { vi.clearAllMocks(); useCartStore.getState().clearCart(); });
describe("confirmed Shopify cart", () => {
  it("does not add an item when Shopify refuses it", async () => {
    if (!variant) throw new Error("Missing variant");
    api.createCart.mockResolvedValue({ mode: "error", message: "Sold out" });
    expect(await useCartStore.getState().addItem(product, variant)).toBe(false);
    expect(useCartStore.getState().items).toEqual([]);
    expect(useCartStore.getState().getCheckoutUrl()).toBeNull();
  });
  it("serializes rapid additions into one cart", async () => {
    if (!variant) throw new Error("Missing variant");
    api.createCart.mockResolvedValue(result()); api.updateCartLines.mockResolvedValue(result(2));
    await Promise.all([useCartStore.getState().addItem(product, variant), useCartStore.getState().addItem(product, variant)]);
    expect(api.createCart).toHaveBeenCalledTimes(1);
    expect(api.updateCartLines).toHaveBeenCalledWith({ data: { cartId: "cart", lines: [{ lineId: "line", quantity: 2, lease: false, installments: true }] } });
    expect(useCartStore.getState().items[0]?.quantity).toBe(2);
  });
  it("passes the cart identity correctly on reload and removes expired carts", async () => {
    if (!variant) throw new Error("Missing variant");
    api.createCart.mockResolvedValue(result()); await useCartStore.getState().addItem(product, variant);
    api.readCart.mockResolvedValue({ mode: "gone" }); await useCartStore.getState().syncCart();
    expect(api.readCart).toHaveBeenCalledWith({ data: { cartId: "cart" } });
    expect(useCartStore.getState().items).toEqual([]);
  });
  it("can switch back to full payment and refresh prices from Shopify", async () => {
    if (!variant) throw new Error("Missing variant");
    api.createCart.mockResolvedValue(result(1, true)); await useCartStore.getState().addItem(product, variant, 1, true);
    api.updateCartLines.mockResolvedValue(result(2, false, 80000)); await useCartStore.getState().addItem(product, variant, 1, false);
    expect(useCartStore.getState().items[0]).toMatchObject({ lease: false, price: 80000 });
  });
  it("removes the last line from Shopify, not just this browser", async () => {
    if (!variant) throw new Error("Missing variant");
    api.createCart.mockResolvedValue(result()); await useCartStore.getState().addItem(product, variant);
    api.removeCartLines.mockResolvedValue({ mode: "gone" }); await useCartStore.getState().removeItem(variant.id);
    expect(api.removeCartLines).toHaveBeenCalledWith({ data: { cartId: "cart", lineIds: ["line"] } });
    expect(useCartStore.getState().items).toEqual([]);
  });
});