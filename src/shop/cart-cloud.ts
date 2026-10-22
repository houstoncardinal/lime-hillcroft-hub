import { supabase } from "@/integrations/supabase/client";
import { loadSavedCart, saveCartToCloud } from "@/shop/account.functions";
import { useCartStore } from "@/shop/cart";

// Mirrors the shopper's cart into their account while they're signed in, so the same cart
// greets them on any device. The device in hand wins on sign-in: a non-empty local cart is
// pushed up; an empty one adopts whatever the account has saved.

let wired = false;

export function wireCartCloudSync() {
  if (wired || typeof window === "undefined") return;
  wired = true;

  let signedIn = false;
  let timer: ReturnType<typeof setTimeout> | null = null;

  const push = () => {
    if (!signedIn) return;
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      const { items, cartId, checkoutUrl } = useCartStore.getState();
      void saveCartToCloud({ data: { items, cartId, checkoutUrl } }).catch(() => {
        /* The local cart is untouched; the next change retries the save. */
      });
    }, 1500);
  };

  const adopt = async () => {
    try {
      const local = useCartStore.getState();
      if (local.items.length > 0) {
        push();
        return;
      }
      const saved = await loadSavedCart();
      if (saved && saved.items.length > 0) {
        useCartStore.setState({
          items: saved.items,
          cartId: saved.cartId,
          checkoutUrl: saved.checkoutUrl,
        });
      }
    } catch {
      /* A failed load never blocks shopping — the local cart stays as is. */
    }
  };

  void supabase.auth.getSession().then(({ data }) => {
    signedIn = !!data.session;
    if (signedIn) void adopt();
  });

  supabase.auth.onAuthStateChange((event) => {
    if (event === "SIGNED_IN") {
      signedIn = true;
      void adopt();
    } else if (event === "SIGNED_OUT") {
      signedIn = false;
    }
  });

  useCartStore.subscribe((state, prev) => {
    if (state.items !== prev.items || state.cartId !== prev.cartId) push();
  });
}
