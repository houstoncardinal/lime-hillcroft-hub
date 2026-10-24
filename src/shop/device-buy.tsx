import { SHOP_COPY } from "@/shop/copy";
import { showsInstallments } from "@/shop/installments";
import { Link } from "@tanstack/react-router";
import { Check, ShoppingBag, Loader2 } from "lucide-react";
import { useState } from "react";

import { Money } from "@/components/intl/money";
import type { Lang } from "@/components/site/seo";
import { useCartStore } from "@/shop/cart";
import { productPath } from "@/shop/paths";
import type { ShopProduct } from "@/shop/types";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { PaymentOptions, type PaymentMode } from "@/shop/payment-options";

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
  const [payMode, setPayMode] = useState<PaymentMode>("full");
  const lease = SHOP_COPY[lang].lease;
  const addItem = useCartStore((s) => s.addItem);
  const setOpen = useCartStore((s) => s.setOpen);
  const busy = useCartStore((s) => s.busy);
  const error = useCartStore((s) => s.error);
  const variant = product.variants.find((v) => v.id === variantId) ?? product.variants[0];
  if (!variant) return null;

  const canLease = showsInstallments(product.category, variant.price);
  const add = async () => {
    if (!(await addItem(product, variant, 1, canLease && payMode === "plan"))) return;
    setAdded(true);
    setOpen(true);
    setTimeout(() => setAdded(false), 1800);
  };

  return (
    <div className="mb-6 border-b border-border pb-6">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <p className="font-display text-xl font-semibold">{t.title}</p>
        <p className="text-2xl font-semibold tabular-nums"><Money usd={variant.price / 100} /></p>
      </div>
      <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{t.body}</p>

      {product.optionName && product.variants.length > 1 && (
        <div className="mt-4" role="group" aria-label={product.optionName || t.option}>
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            {product.optionName || t.option}
          </p>
          <div className="mt-2 flex flex-wrap gap-2">
            {product.variants.map((v) => (
              <Button
                variant="outline"
                key={v.id}
                type="button"
                onClick={() => { setVariantId(v.id); setAdded(false); }}
                aria-pressed={v.id === variant.id}
                className={cn(
                  "min-h-10 rounded-full border px-4 text-sm font-semibold transition",
                  v.id === variant.id
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-card hover:border-primary",
                  !v.available && "text-muted-foreground line-through",
                )}
              >
                {v.title}
              </Button>
            ))}
          </div>
        </div>
      )}

      {canLease && <PaymentOptions cents={variant.price} lang={lang} value={payMode} onChange={setPayMode} />}

      <p
        className={cn(
          "mt-4 flex items-center gap-2 text-sm font-semibold",
          variant.available ? "text-success" : "text-muted-foreground",
        )}
      >
        <span
          className={cn(
            "h-2 w-2 rounded-full",
            variant.available ? "bg-success" : "bg-muted-foreground",
          )}
          aria-hidden="true"
        />
        {variant.available ? t.inStock : t.soldOut}
      </p>

      <div className="mt-4 grid gap-2 sm:grid-cols-[1fr_auto]">
        <Button
          type="button"
          onClick={add}
          disabled={!variant.available || busy}
          className={cn("h-auto min-h-12 whitespace-normal px-5 py-3 text-sm font-semibold", canLease && payMode === "plan" && "bg-shoppay text-shoppay-foreground hover:bg-shoppay/90")}
        >
          {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : added ? <Check className="h-4 w-4" /> : <ShoppingBag className="h-4 w-4" />}
          {added ? t.added : canLease && payMode === "plan" ? lease.addPlan : t.add}
        </Button>
        <Button asChild variant="outline" className="h-auto min-h-12 whitespace-normal px-4 py-3"><Link
          to={productPath(lang, product.handle)}
          
        >
          {t.more}
        </Link></Button>
      </div>
      {error && <p role="alert" className="mt-3 text-sm text-destructive">{SHOP_COPY[lang].checkoutError}</p>}
    </div>
  );
}
