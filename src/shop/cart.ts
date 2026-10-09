import { useSyncExternalStore } from "react";

import type { CartLine, ShopProduct, ShopVariant } from "@/shop/types";

// Shopping cart kept in localStorage until checkout hands it to Shopify.

const KEY = "tic-cart-v1";
type State = { lines: CartLine[]; open: boolean };

const EMPTY: State = { lines: [], open: false };
let state: State | null = null;
const listeners = new Set<() => void>();

function read(): State {
  if (state) return state;
  try {
    state = { lines: JSON.parse(localStorage.getItem(KEY) ?? "[]") as CartLine[], open: false };
  } catch {
    state = { lines: [], open: false };
  }
  return state;
}

function write(next: State) {
  state = next;
  try {
    localStorage.setItem(KEY, JSON.stringify(next.lines));
  } catch {
    // ignore
  }
  listeners.forEach((l) => l());
}

const subscribe = (l: () => void) => {
  listeners.add(l);
  return () => listeners.delete(l);
};

export function useCart() {
  return useSyncExternalStore(subscribe, read, () => EMPTY);
}

export const cartCount = (s: State) => s.lines.reduce((n, l) => n + l.quantity, 0);
export const cartSubtotal = (s: State) => s.lines.reduce((n, l) => n + l.price * l.quantity, 0);

export const cart = {
  add(product: ShopProduct, variant: ShopVariant, quantity = 1) {
    const s = read();
    const existing = s.lines.find((l) => l.variantId === variant.id);
    const lines = existing
      ? s.lines.map((l) =>
          l.variantId === variant.id ? { ...l, quantity: Math.min(99, l.quantity + quantity) } : l,
        )
      : [
          ...s.lines,
          {
            variantId: variant.id,
            handle: product.handle,
            title: product.title,
            variantTitle: product.optionName ? variant.title : null,
            price: variant.price,
            image: variant.image ?? product.images[0] ?? null,
            quantity,
          },
        ];
    write({ lines, open: true });
  },
  setQuantity(variantId: string, quantity: number) {
    const s = read();
    const lines =
      quantity <= 0
        ? s.lines.filter((l) => l.variantId !== variantId)
        : s.lines.map((l) =>
            l.variantId === variantId ? { ...l, quantity: Math.min(99, quantity) } : l,
          );
    write({ ...s, lines });
  },
  clear() {
    write({ ...read(), lines: [] });
  },
  setOpen(open: boolean) {
    write({ ...read(), open });
  },
};

export const money = (cents: number) =>
  (cents / 100).toLocaleString("en-US", { style: "currency", currency: "USD" });
