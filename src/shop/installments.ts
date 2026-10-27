import type { ShopCategory } from "@/shop/types";

// "Leasing" online = Shop Pay Installments, offered by Shopify at checkout (subject to approval).
// The site advertises it on phones and other devices; small accessories don't show it.
const SMALL_ACCESSORIES: ShopCategory[] = ["cases", "screen-protection", "earbuds", "speakers", "power"];
export const INSTALLMENTS_MIN_CENTS = 5000;
export const PAY_IN_FOUR = 4;

export function showsInstallments(category: ShopCategory, priceCents: number) {
  return !SMALL_ACCESSORIES.includes(category) && priceCents >= INSTALLMENTS_MIN_CENTS;
}

// Lease-to-own (Progressive Leasing, American First Finance, Payvantage) is applied for online and
// picked up in store, so it is offered on devices only — the same items the leasing page lists.
const LEASE_CATEGORIES: ShopCategory[] = ["phones", "tablets", "laptops", "gaming", "wearables"];
export const LEASING_MIN_CENTS = 10000;

/** A "Lease to own" tag in Shopify always wins; otherwise devices from $100. */
export function showsLeasing(category: ShopCategory, priceCents: number, tagged = false) {
  return tagged || (LEASE_CATEGORIES.includes(category) && priceCents >= LEASING_MIN_CENTS);
}

/** Each of Shop Pay's 4 interest-free payments, every 2 weeks, in cents (rounded up). */
export function payInFour(totalCents: number) {
  return Math.ceil(totalCents / PAY_IN_FOUR);
}

/** Illustrative cent-exact schedule; Shopify determines the actual financing terms. */
export function installmentSchedule(totalCents: number) {
  const base = Math.floor(totalCents / PAY_IN_FOUR);
  return Array.from({ length: PAY_IN_FOUR }, (_, i) => base + (i < totalCents % PAY_IN_FOUR ? 1 : 0));
}
