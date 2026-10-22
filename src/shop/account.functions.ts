import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

// A shopper's saved cart, keyed by their auth user id. RLS scopes every row to its owner, so
// these functions only ever touch the caller's own cart.

const itemSchema = z.object({
  variantId: z.string().min(1).max(200),
  handle: z.string().max(300),
  title: z.string().max(300),
  variantTitle: z.string().max(300).nullable(),
  price: z.number().int().min(0).max(100_000_000),
  image: z.object({ url: z.string().max(1000), alt: z.string().max(300) }).nullable(),
  quantity: z.number().int().min(1).max(99),
  lineId: z.string().max(200).nullable(),
  lease: z.boolean().optional(),
});

const payloadSchema = z.object({
  items: z.array(itemSchema).max(100),
  cartId: z.string().max(200).nullable(),
  checkoutUrl: z.string().max(2000).nullable(),
});

export type SavedCart = z.infer<typeof payloadSchema>;

export const loadSavedCart = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }): Promise<SavedCart | null> => {
    const { data, error } = await context.supabase
      .from("customer_carts")
      .select("items, cart_id, checkout_url")
      .eq("user_id", context.userId)
      .maybeSingle();
    if (error) throw new Error("Couldn't load your saved cart.");
    if (!data) return null;
    const parsed = payloadSchema.safeParse({
      items: data.items,
      cartId: data.cart_id,
      checkoutUrl: data.checkout_url,
    });
    return parsed.success ? parsed.data : null;
  });

export const saveCartToCloud = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((raw: unknown) => payloadSchema.parse(raw))
  .handler(async ({ context, data }) => {
    const { error } = await context.supabase.from("customer_carts").upsert(
      {
        user_id: context.userId,
        items: data.items,
        cart_id: data.cartId,
        checkout_url: data.checkoutUrl,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "user_id" },
    );
    if (error) throw new Error("Couldn't save your cart.");
    return { ok: true as const };
  });
