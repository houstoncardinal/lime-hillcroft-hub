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

export type CartItem = CartLine & { lineId: string | null };

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
  addItem: (product: ShopProduct, variant: ShopVariant, quantity?: number) => Promise<void>;
  setQuantity: (variantId: string, quantity: number) => Promise<void>;
  removeItem: (variantId: string) => Promise<void>;
  clearCart: () => void;
  setOpen: (open: boolean) => void;
  syncCart: () => Promise<void>;
  getCheckoutUrl: () => string | null;
};

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => {
      /** Copy Shopify's cart back over the local lines: line ids, quantities, checkout URL. */
      const apply = (res: CartResult) => {
        if (res.mode === "shopify") {
          const byVariant = new Map(res.cart.lines.map((l) => [l.variantId, l]));
          set({
            cartId: res.cart.cartId,
            checkoutUrl: res.cart.checkoutUrl,
            busy: false,
            items: get()
              .items.map((i) => {
                const line = byVariant.get(i.variantId);
                return line ? { ...i, lineId: line.lineId, quantity: line.quantity } : i;
              })
              .filter((i) => !i.lineId || byVariant.has(i.variantId)),
          });
        } else if (res.mode === "gone") {
          // Shopify dropped the cart — the order is paid, or the cart expired. Start clean.
          set({ items: [], cartId: null, checkoutUrl: null, busy: false });
        } else {
          set({ busy: false });
        }
      };

      const run = async (call: () => Promise<CartResult>) => {
        set({ busy: true });
        try {
          apply(await call());
        } catch (e) {
          console.error("Shopify cart call failed:", e);
          set({ busy: false });
        }
      };

      return {
        items: [],
        cartId: null,
        checkoutUrl: null,
        open: false,
        busy: false,
        syncing: false,

        addItem: async (product, variant, quantity = 1) => {
          const { items, cartId } = get();
          const existing = items.find((i) => i.variantId === variant.id);
          const wanted = Math.min(99, (existing?.quantity ?? 0) + quantity);
          const local: CartItem = {
            variantId: variant.id,
            handle: product.handle,
            title: product.title,
            variantTitle: product.optionName ? variant.title : null,
            price: variant.price,
            image: variant.image ?? product.images[0] ?? null,
            quantity: wanted,
            lineId: existing?.lineId ?? null,
          };
          set({
            items: existing
              ? items.map((i) => (i.variantId === variant.id ? local : i))
              : [...items, local],
          });

          if (isPreviewLine(variant.id)) return;

          await run(() => {
            if (!cartId)
              return createCart({ data: { lines: [{ variantId: variant.id, quantity: wanted }] } });
            if (existing?.lineId)
              return updateCartLines({
                data: { cartId, lines: [{ lineId: existing.lineId, quantity: wanted }] },
              });
            return addCartLines({
              data: { cartId, lines: [{ variantId: variant.id, quantity: wanted }] },
            });
          });
        },

        setQuantity: async (variantId, quantity) => {
          const { items, cartId } = get();
          const item = items.find((i) => i.variantId === variantId);
          if (!item) return;
          if (quantity <= 0) return get().removeItem(variantId);

          const wanted = Math.min(99, quantity);
          set({
            items: items.map((i) => (i.variantId === variantId ? { ...i, quantity: wanted } : i)),
          });
          if (!item.lineId || !cartId || isPreviewLine(variantId)) return;

          await run(() =>
            updateCartLines({ data: { cartId, lines: [{ lineId: item.lineId!, quantity: wanted }] } }),
          );
        },

        removeItem: async (variantId) => {
          const { items, cartId } = get();
          const item = items.find((i) => i.variantId === variantId);
          if (!item) return;
          const rest = items.filter((i) => i.variantId !== variantId);
          set({ items: rest });
          if (rest.length === 0) return get().clearCart();
          if (!item.lineId || !cartId || isPreviewLine(variantId)) return;

          await run(() => removeCartLines({ data: { cartId, lineIds: [item.lineId!] } }));
        },

        clearCart: () => set({ items: [], cartId: null, checkoutUrl: null, busy: false }),

        setOpen: (open) => set({ open }),

        getCheckoutUrl: () => get().checkoutUrl,

        syncCart: async () => {
          const { cartId, items, syncing } = get();
          if (!cartId || syncing || items.some((i) => isPreviewLine(i.variantId))) return;
          set({ syncing: true });
          try {
            const res = await readCart({ data: cartId });
            if (res.mode === "gone") {
              set({ items: [], cartId: null, checkoutUrl: null });
            } else if (res.mode === "shopify") {
              apply(res);
            }
          } finally {
            set({ syncing: false });
          }
        },
      };
    },
    {
      name: "tic-cart-v1",
      storage: createJSONStorage(() => localStorage),
      // Only the cart itself is remembered — never the busy/syncing flags or the open drawer.
      partialize: (s) => ({ items: s.items, cartId: s.cartId, checkoutUrl: s.checkoutUrl }),
    },
  ),
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
