import { describe, expect, it } from "vitest";

import { SHOP_ENABLED } from "@/components/site/features";
import { formatCheckoutUrl } from "@/shop/storefront";

// The shop sells the real products in the connected Shopify store, so the cart must always hand
// the shopper to Shopify's own secure checkout with the online-store channel marked — without it
// Shopify can show a store-password page instead of the cart.
describe("Shopify checkout handoff", () => {
  const cartUrl = "https://xpufrj-ed.myshopify.com/cart/c/hWNICL0g3nVu4eFwOC4R8m9b?key=k1YjixMw";

  it("marks the checkout URL with the online_store channel", () => {
    const url = new URL(formatCheckoutUrl(cartUrl));
    expect(url.searchParams.get("channel")).toBe("online_store");
    expect(url.pathname).toBe("/cart/c/hWNICL0g3nVu4eFwOC4R8m9b");
    expect(url.searchParams.get("key")).toBe("k1YjixMw");
  });

  it("does not repeat the channel when the URL is already marked", () => {
    const marked = formatCheckoutUrl(cartUrl);
    expect(marked.match(/channel=/g)?.length).toBe(1);
    expect(formatCheckoutUrl(marked)).toBe(marked);
  });

  it("keeps the online shop switched on", () => {
    expect(SHOP_ENABLED).toBe(true);
  });
});
