import { useEffect, useState } from "react";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import {
  addCartLines,
  createCart,
  readCart,
  removeCartLines,
  updateCartLines,
  type CartResult,
} from "@/shop/storefront";
import type { CartLine, ShopProduct, ShopVariant } from "@/shop/types";

// The shopper's cart. It lives in the browser for speed, and every change is mirrored into a real
// Shopify cart so checkout can use Shopify's own secure URL. Preview items (no store connected)
// stay local only.

export type CartItem = CartLine & { lineId: string | null; lease?: boolean | undefined };

const isPreviewLine = (variantId: string) => variantId.startsWith("preview:");

const countOf = (lines: CartItem[]) => lines.reduce((n, l) => n + l.quantity, 0);
const subtotalOf = (lines: CartItem[]) =>
  lines.reduce((n, l) => n + l.price * l.quantity, 0);

export const cartCount = (items: CartItem[]) => countOf(items);
export const cartSubtotal = (items: CartItem[]) => subtotalOf(items);

type CartStore = {
  items: CartItem[];
  cartId: string | null;
  checkoutUrl: string | null;
  open: boolean;
  busy: boolean;
  syncing: boolean;
  error: string | null;
  addItem: (
    product: ShopProduct,
    variant: ShopVariant,
    quantity?: number,
    lease?: boolean,
  ) => Promise<boolean>;
  setQuantity: (variantId: string, quantity: number) => Promise<boolean>;
  removeItem: (variantId: string) => Promise<boolean>;
  clearCart: () => void;
  setOpen: (open: boolean) => void;
  syncCart: () => Promise<void>;
  getCheckoutUrl: () => string | null;
};

export const useCartStore = create<CartStore>()(
  persist((set, get) => {
    let queue = Promise.resolve();
    const apply = (res: CartResult, candidates: CartItem[]) => {
      if (res.mode === "gone") {
        set({ items: [], cartId: null, checkoutUrl: null, error: null });
        return true;
      }
      if (res.mode !== "shopify") {
        set({ error: res.mode === "error" ? res.message : "Online shopping is temporarily unavailable. Please try again." });
        return false;
      }
      const items = res.cart.lines.flatMap((line) => {
        const item = candidates.find((i) => i.lineId === line.lineId) ?? candidates.find((i) => i.variantId === line.variantId);
        return item ? [{ ...item, ...line }] : [];
      });
      set({ items, cartId: res.cart.cartId, checkoutUrl: res.cart.checkoutUrl, error: null });
      return true;
    };
    const enqueue = (task: () => Promise<boolean>) => {
      set({ busy: true });
      const result = queue.then(async () => {
        try { return await task(); }
        catch { set({ error: "Couldn't update your cart. Please try again." }); return false; }
      });
      queue = result.then(() => undefined);
      void queue.then(() => { if (queue === last) set({ busy: false }); });
      const last = queue;
      return result;
    };
    return {
      items: [], cartId: null, checkoutUrl: null, error: null, open: false, busy: false, syncing: false,
      addItem: (product, variant, quantity = 1, lease = false) => enqueue(async () => {
        if (isPreviewLine(variant.id) || !variant.available) { set({ error: "This product is not available for online checkout." }); return false; }
        const { items, cartId } = get();
        const clean = items.filter((i) => !isPreviewLine(i.variantId));
        const existing = clean.find((i) => i.variantId === variant.id);
        const wanted = Math.min(99, (existing?.quantity ?? 0) + Math.max(1, Math.floor(quantity)));
        const local: CartItem = { variantId: variant.id, handle: product.handle, title: product.title, variantTitle: product.optionName ? variant.title : null, price: variant.price, image: variant.image ?? product.images[0] ?? null, quantity: wanted, lineId: existing?.lineId ?? null, lease };
        const candidates = existing ? clean.map((i) => i.variantId === variant.id ? local : i) : [...clean, local];
        const result = !cartId
          ? await createCart({ data: { lines: candidates.map((i) => ({ variantId: i.variantId, quantity: i.quantity, lease: i.lease })) } })
          : existing?.lineId
            ? await updateCartLines({ data: { cartId, lines: [{ lineId: existing.lineId, quantity: wanted, lease }] } })
            : await addCartLines({ data: { cartId, lines: [{ variantId: variant.id, quantity: wanted, lease }] } });
        return apply(result, candidates) && result.mode === "shopify";
      }),
      setQuantity: (variantId, quantity) => {
        if (quantity <= 0) return get().removeItem(variantId);
        return enqueue(async () => {
          const { items, cartId } = get();
          const item = items.find((i) => i.variantId === variantId);
          if (!item?.lineId || !cartId) return false;
          return apply(await updateCartLines({ data: { cartId, lines: [{ lineId: item.lineId, quantity: Math.min(99, Math.max(1, Math.floor(quantity))) }] } }), items);
        });
      },
      removeItem: (variantId) => enqueue(async () => {
        const { items, cartId } = get();
        const item = items.find((i) => i.variantId === variantId);
        if (!item?.lineId || !cartId) { set({ items: items.filter((i) => i.variantId !== variantId) }); return true; }
        return apply(await removeCartLines({ data: { cartId, lineIds: [item.lineId] } }), items);
      }),
      clearCart: () => set({ items: [], cartId: null, checkoutUrl: null, error: null }),
      setOpen: (open) => set({ open }),
      getCheckoutUrl: () => get().error || get().busy || get().syncing ? null : get().checkoutUrl,
      syncCart: async () => {
        await enqueue(async () => {
          const { cartId, items } = get();
          if (!cartId) { set({ items: [], checkoutUrl: null }); return true; }
          set({ syncing: true });
          try { return apply(await readCart({ data: { cartId } }), items); }
          finally { set({ syncing: false }); }
        });
      },
    };
  }, {
    name: "tic-cart-v1", storage: createJSONStorage(() => localStorage),
    partialize: (s) => ({ items: s.items, cartId: s.cartId, checkoutUrl: s.checkoutUrl }),
  }),
);

/** True once the page is in the browser, so remembered cart counts never break server rendering. */
export function useMounted() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted;
}

/**
 * Keep the remembered cart honest: when the shopper comes back from Shopify (or finishes the
 * order), the cart there tells us whether it still has anything in it.
 */
export function useCartSync() {
  const syncCart = useCartStore((s) => s.syncCart);

  useEffect(() => {
    void syncCart();
    const onVisible = () => {
      if (document.visibilityState === "visible") void syncCart();
    };
    document.addEventListener("visibilitychange", onVisible);
    return () => document.removeEventListener("visibilitychange", onVisible);
  }, [syncCart]);
}

export const money = (cents: number) =>
  (cents / 100).toLocaleString("en-US", { style: "currency", currency: "USD" });
