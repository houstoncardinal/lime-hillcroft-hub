import { Link } from "@tanstack/react-router";
import { Check, ShoppingBag } from "lucide-react";
import { useState } from "react";

import { Money } from "@/components/intl/money";
import type { Lang } from "@/components/site/seo";
import { useCartStore } from "@/shop/cart";
import { productPath } from "@/shop/paths";
import type { ShopProduct } from "@/shop/types";
import { cn } from "@/lib/utils";

const T = {
  en: {
    title: "Buy online",
    body: "Pay securely online with Shopify checkout.",
    option: "Storage",
    add: "Add to cart",
    added: "Added to cart",
    soldOut: "Sold out online — call or visit",
    inStock: "In stock",
    more: "See it in the shop",
  },
  es: {
    title: "Cómpralo en línea",
    body: "Paga en línea de forma segura con Shopify.",
    option: "Almacenamiento",
    add: "Agregar al carrito",
    added: "Agregado al carrito",
    soldOut: "Agotado en línea — llama o visítanos",
    inStock: "Disponible",
    more: "Verlo en la tienda en línea",
  },
};

/** Live Shopify price, storage picker and add-to-cart for a device page. */
export function DeviceBuy({ product, lang }: { product: ShopProduct; lang: Lang }) {
  const t = T[lang];
  const [variantId, setVariantId] = useState(
    (product.variants.find((v) => v.available) ?? product.variants[0])?.id,
  );
  const [added, setAdded] = useState(false);
  const addItem = useCartStore((s) => s.addItem);
  const setOpen = useCartStore((s) => s.setOpen);
  const busy = useCartStore((s) => s.busy);
  const variant = product.variants.find((v) => v.id === variantId) ?? product.variants[0];
  if (!variant) return null;

  const add = async () => {
    await addItem(product, variant, 1);
    setAdded(true);
    setOpen(true);
    setTimeout(() => setAdded(false), 1800);
  };

  return (
    <div className="mb-6 border-b border-white/10 pb-6">
      <div className="flex items-baseline justify-between gap-4">
        <p className="font-display text-xl font-semibold">{t.title}</p>
        <p className="text-2xl font-semibold tabular-nums">
          <Money usd={variant.price / 100} />
          {variant.compareAtPrice && variant.compareAtPrice > variant.price && (
            <span className="ml-2 text-sm font-normal text-white/50 line-through">
              <Money usd={variant.compareAtPrice / 100} />
            </span>
          )}
        </p>
      </div>
      <p className="mt-1 text-sm leading-relaxed text-white/70">{t.body}</p>

      {product.optionName && product.variants.length > 1 && (
        <div className="mt-4" role="group" aria-label={product.optionName || t.option}>
          <p className="text-xs font-semibold uppercase tracking-wider text-white/55">
            {product.optionName || t.option}
          </p>
          <div className="mt-2 flex flex-wrap gap-2">
            {product.variants.map((v) => (
              <button
                key={v.id}
                type="button"
                onClick={() => setVariantId(v.id)}
                aria-pressed={v.id === variant.id}
                className={cn(
                  "min-h-10 rounded-full border px-4 text-sm font-semibold transition",
                  v.id === variant.id
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-white/20 hover:border-white/60",
                  !v.available && "text-white/40 line-through",
                )}
              >
                {v.title}
              </button>
            ))}
          </div>
        </div>
      )}

      <p
        className={cn(
          "mt-4 flex items-center gap-2 text-sm font-semibold",
          variant.available ? "text-emerald-400" : "text-white/60",
        )}
      >
        <span
          className={cn(
            "h-2 w-2 rounded-full",
            variant.available ? "bg-emerald-400" : "bg-white/40",
          )}
          aria-hidden="true"
        />
        {variant.available ? t.inStock : t.soldOut}
      </p>

      <div className="mt-4 grid gap-2 sm:grid-cols-[1fr_auto]">
        <button
          type="button"
          onClick={add}
          disabled={!variant.available || busy}
          className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-white px-6 text-sm font-bold text-ink transition hover:bg-white/90 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {added ? <Check className="h-4 w-4" /> : <ShoppingBag className="h-4 w-4" />}
          {added ? t.added : t.add}
        </button>
        <Link
          to={productPath(lang, product.handle)}
          className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/20 px-5 text-sm font-bold transition hover:border-white/60"
        >
          {t.more}
        </Link>
      </div>
    </div>
  );
}
