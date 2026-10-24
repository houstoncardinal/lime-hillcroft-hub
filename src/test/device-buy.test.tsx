import { fireEvent, render, screen, cleanup, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import type { ShopProduct } from "@/shop/types";

const state = vi.hoisted(() => ({ addItem: vi.fn(), setOpen: vi.fn(), busy: false, error: null }));
vi.mock("@/shop/cart", () => ({ useCartStore: (select: (s: typeof state) => unknown) => select(state) }));
vi.mock("@/components/intl/money", () => ({ Money: ({ usd }: { usd: number }) => <span>{usd.toFixed(2)}</span> }));
vi.mock("@tanstack/react-router", () => ({ Link: ({ children }: { children: React.ReactNode }) => <a>{children}</a> }));
import { DeviceBuy } from "@/shop/device-buy";

const product: ShopProduct = { id: "phone", handle: "iphone-16-pro-max", title: "iPhone 16 Pro Max", vendor: "Apple", category: "phones", description: "", features: [], images: [], optionName: "Storage", variants: [{ id: "gid://shopify/ProductVariant/1", title: "256GB", price: 104900, available: true, compareAtPrice: null, image: null }], badge: null, featured: false };
beforeEach(() => { vi.clearAllMocks(); state.addItem.mockResolvedValue(true); });
afterEach(cleanup);
describe("device-page payment intent", () => {
  it("sends the selected installment option with the real variant and full price", async () => {
    render(<DeviceBuy product={product} lang="en" />);
    fireEvent.click(screen.getByRole("radio", { name: /Lease with Shop Pay/ }));
    fireEvent.click(screen.getByRole("button", { name: "Add to cart — pay over time" }));
    await waitFor(() => expect(state.addItem).toHaveBeenCalledWith(product, product.variants[0], 1, true));
    expect(product.variants[0]?.price).toBe(104900);
    expect(state.setOpen).toHaveBeenCalledWith(true);
  });
  it("does not show success or open the cart after an unsuccessful addition", async () => {
    state.addItem.mockResolvedValue(false);
    render(<DeviceBuy product={product} lang="en" />);
    fireEvent.click(screen.getByRole("button", { name: "Add to cart" }));
    await waitFor(() => expect(state.addItem).toHaveBeenCalledWith(product, product.variants[0], 1, false));
    expect(state.setOpen).not.toHaveBeenCalled();
  });
  it("does not offer installments for small accessories", () => {
    render(<DeviceBuy product={{ ...product, category: "earbuds" }} lang="en" />);
    expect(screen.queryByRole("radio", { name: /Shop Pay/ })).toBeNull();
  });
});