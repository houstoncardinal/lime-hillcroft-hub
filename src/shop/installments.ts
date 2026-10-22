import type { ShopCategory } from "@/shop/types";

// Shop Pay Installments are offered by Shopify at checkout. The site only advertises them on
// bigger-ticket items; small accessories don't show the message.
const SMALL_ACCESSORIES: ShopCategory[] = ["cases", "screen-protection", "earbuds", "speakers", "power"];
export const INSTALLMENTS_MIN_CENTS = 5000;

export function showsInstallments(category: ShopCategory, priceCents: number) {
  return !SMALL_ACCESSORIES.includes(category) && priceCents >= INSTALLMENTS_MIN_CENTS;
}
