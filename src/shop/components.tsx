import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Loader2, Minus, Phone, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { toast } from "sonner";

import { Money } from "@/components/intl/money";
import { PHONE, TEL } from "@/components/site/business";
import { ALTERNATES, type Lang } from "@/components/site/seo";
import { cartCount, cartSubtotal, money, useCartStore, useMounted } from "@/shop/cart";
import { SHOP_COPY } from "@/shop/copy";
import { productPath } from "@/shop/paths";
import type { ShopImage, ShopProduct } from "@/shop/types";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

/** Product photo on a soft tile, so shelf photos of different shapes line up in a grid. */
export function ProductTile({
  image,
  className,
  sizes = "(min-width: 1024px) 25vw, 50vw",
  priority,
}: {
  image: ShopImage | undefined;
  className?: string | undefined;
  sizes?: string | undefined;
  priority?: boolean | undefined;
}) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-3xl bg-[radial-gradient(circle_at_30%_20%,color-mix(in_oklab,var(--primary)_14%,var(--card)),var(--secondary))]",
        className,
      )}
    >
      {image && (
        <div className="absolute inset-0 flex items-center justify-center p-[9%]">
          <img
            src={image.url}
            alt={image.alt}
            sizes={sizes}
            loading={priority ? "eager" : "lazy"}
            decoding="async"
            className="max-h-full max-w-full rounded-xl object-contain shadow-[0_18px_40px_-12px_rgba(0,0,0,0.45)] transition duration-500 group-hover:-translate-y-1 group-hover:scale-[1.03]"
          />
        </div>
      )}
    </div>
  );
}

export function Price({ product, lang }: { product: ShopProduct; lang: Lang }) {
  const t = SHOP_COPY[lang];
  const prices = product.variants.map((v) => v.price);
  const min = Math.min(...prices);
  const varies = prices.some((p) => p !== min);
  const compare = product.variants.find((v) => v.price === min)?.compareAtPrice;
  return (
    <span className="tabular-nums">
      {varies && <span className="mr-1 text-sm font-normal text-muted-foreground">{t.from}</span>}
      <span className="font-semibold">
        <Money usd={min / 100} />
      </span>
      {compare && compare > min && (
        <span className="ml-2 text-sm text-muted-foreground line-through">{money(compare)}</span>
      )}
    </span>
  );
}

export function Badge({ product, lang }: { product: ShopProduct; lang: Lang }) {
  if (!product.badge) return null;
  return (
    <span
      className={cn(
        "rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider",
        product.badge === "sale" ? "bg-primary text-primary-foreground" : "bg-ink text-white",
      )}
    >
      {SHOP_COPY[lang].badge[product.badge]}
    </span>
  );
}

export function ProductCard({
  product,
  lang,
  priority,
}: {
  product: ShopProduct;
  lang: Lang;
  priority?: boolean | undefined;
}) {
  const t = SHOP_COPY[lang];
  const first = product.variants.find((v) => v.available) ?? product.variants[0];
  const single = product.variants.length === 1;
  const addItem = useCartStore((s) => s.addItem);

  const quickAdd = async () => {
    if (!first) return;
    await addItem(product, first);
    toast.success(t.added, { description: product.title });
  };

  return (
    <article className="group relative flex flex-col">
      <Link
        to={productPath(lang, product.handle)}
        className="block focus-visible:outline-none"
        aria-label={product.title}
      >
        <ProductTile image={product.images[0]} className="aspect-square" priority={priority} />
      </Link>
      <div className="absolute left-3 top-3">
        <Badge product={product} lang={lang} />
      </div>
      <div className="mt-4 flex flex-1 flex-col">
        <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          {product.vendor}
        </p>
        <h3 className="mt-1 font-display text-lg font-semibold leading-snug">
          <Link to={productPath(lang, product.handle)} className="hover:text-primary">
            {product.title}
          </Link>
        </h3>
        {product.optionName && (
          <p className="mt-1 text-xs text-muted-foreground">
            {product.variants.length} {product.optionName.toLowerCase()}
            {lang === "en" && product.variants.length > 1 ? "s" : ""}
          </p>
        )}
        <div className="mt-3 flex items-center justify-between gap-3">
          <Price product={product} lang={lang} />
          {single && first ? (
            <button
              type="button"
              disabled={!first.available}
              onClick={() => void quickAdd()}
              className="inline-flex cursor-pointer items-center gap-1.5 rounded-full bg-ink px-3.5 py-2 text-xs font-semibold text-white transition hover:bg-primary hover:text-primary-foreground disabled:opacity-40"
            >
              <Plus className="h-3.5 w-3.5" /> {first.available ? t.quickAdd : t.soldOut}
            </button>
          ) : (
            <Link
              to={productPath(lang, product.handle)}
              className="inline-flex items-center gap-1.5 rounded-full border px-3.5 py-2 text-xs font-semibold transition hover:border-ink"
            >
              {t.choose}
            </Link>
          )}
        </div>
      </div>
    </article>
  );
}

export function CartButton({ lang }: { lang: Lang }) {
  const mounted = useMounted();
  const count = useCartStore((s) => (mounted ? cartCount(s.items) : 0));
  const setOpen = useCartStore((s) => s.setOpen);
  return (
    <button
      type="button"
      onClick={() => setOpen(true)}
      aria-label={`${SHOP_COPY[lang].cart.open} (${SHOP_COPY[lang].cart.items(count)})`}
      className="relative inline-flex cursor-pointer items-center rounded-full p-2 text-white/80 transition hover:bg-white/10 hover:text-white"
    >
      <ShoppingBag className="h-5 w-5" />
      {count > 0 && (
        <span className="tabular-nums absolute -right-0.5 -top-0.5 flex h-4.5 min-w-4.5 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-bold text-primary-foreground">
          {count}
        </span>
      )}
    </button>
  );
}

export function CartDrawer({ lang }: { lang: Lang }) {
  const t = SHOP_COPY[lang];
  const items = useCartStore((s) => s.items);
  const busy = useCartStore((s) => s.busy);
  const syncing = useCartStore((s) => s.syncing);
  const open = useCartStore((s) => s.open);
  const setOpen = useCartStore((s) => s.setOpen);
  const setQuantity = useCartStore((s) => s.setQuantity);
  const removeItem = useCartStore((s) => s.removeItem);
  const syncCart = useCartStore((s) => s.syncCart);
  const getCheckoutUrl = useCartStore((s) => s.getCheckoutUrl);
  const [preview, setPreview] = useState(false);

  const count = cartCount(items);

  const checkout = () => {
    // Shopify's own checkout URL, handed to us when the cart was created.
    const url = getCheckoutUrl();
    if (url) {
      window.open(url, "_blank", "noopener,noreferrer");
      setOpen(false);
      return;
    }
    // Nothing on the store side (preview items): point the shopper at the counter instead.
    setPreview(true);
  };

  return (
    <>
      <Sheet
        open={open}
        onOpenChange={(next) => {
          setOpen(next);
          if (next) void syncCart();
        }}
      >
        <SheetContent side="right" className="flex w-full flex-col gap-0 p-0 sm:max-w-md">
          <SheetHeader className="border-b px-6 py-5">
            <SheetTitle className="font-display text-xl">
              {t.cart.title}
              {count > 0 && (
                <span className="ml-2 text-sm font-normal text-muted-foreground">
                  {t.cart.items(count)}
                </span>
              )}
            </SheetTitle>
          </SheetHeader>

          {items.length === 0 ? (
            <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-secondary">
                <ShoppingBag className="h-6 w-6 text-muted-foreground" />
              </span>
              <p className="text-muted-foreground">{t.cart.empty}</p>
              <Link
                to={ALTERNATES.shop[lang]}
                onClick={() => setOpen(false)}
                className="rounded-full bg-primary px-6 py-3 font-semibold text-primary-foreground"
              >
                {t.cart.browse}
              </Link>
            </div>
          ) : (
            <>
              <ul className="flex-1 divide-y overflow-y-auto px-6">
                {items.map((l) => (
                  <li key={l.variantId} className="flex gap-4 py-5">
                    <ProductTile
                      image={l.image ?? undefined}
                      className="h-20 w-20 shrink-0 rounded-2xl"
                      sizes="80px"
                    />
                    <div className="flex min-w-0 flex-1 flex-col">
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <Link
                            to={productPath(lang, l.handle)}
                            onClick={() => setOpen(false)}
                            className="block truncate font-semibold hover:text-primary"
                          >
                            {l.title}
                          </Link>
                          {l.variantTitle && (
                            <p className="text-sm text-muted-foreground">{l.variantTitle}</p>
                          )}
                        </div>
                        <p className="tabular-nums font-semibold">
                          <Money usd={(l.price * l.quantity) / 100} />
                        </p>
                      </div>
                      <div className="mt-auto flex items-center justify-between pt-3">
                        <div className="flex items-center rounded-full border">
                          <button
                            type="button"
                            aria-label="−1"
                            onClick={() => void setQuantity(l.variantId, l.quantity - 1)}
                            className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full hover:bg-secondary"
                          >
                            <Minus className="h-3.5 w-3.5" />
                          </button>
                          <span className="tabular-nums w-7 text-center text-sm font-medium">
                            {l.quantity}
                          </span>
                          <button
                            type="button"
                            aria-label="+1"
                            onClick={() => void setQuantity(l.variantId, l.quantity + 1)}
                            className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full hover:bg-secondary"
                          >
                            <Plus className="h-3.5 w-3.5" />
                          </button>
                        </div>
                        <button
                          type="button"
                          onClick={() => void removeItem(l.variantId)}
                          className="inline-flex cursor-pointer items-center gap-1 text-xs text-muted-foreground hover:text-foreground"
                        >
                          <Trash2 className="h-3.5 w-3.5" /> {t.cart.remove}
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="border-t bg-secondary/50 px-6 py-5">
                <div className="flex items-baseline justify-between">
                  <span className="text-muted-foreground">{t.cart.subtotal}</span>
                  <span className="tabular-nums font-display text-2xl font-semibold">
                    <Money usd={cartSubtotal(items) / 100} />
                  </span>
                </div>
                <p className="mt-1 text-xs text-muted-foreground">{t.cart.note}</p>
                <button
                  type="button"
                  onClick={checkout}
                  disabled={busy || syncing}
                  className="mt-4 flex w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-primary py-3.5 font-semibold text-primary-foreground transition hover:brightness-110 disabled:opacity-60"
                >
                  {(busy || syncing) && <Loader2 className="h-4 w-4 animate-spin" />}{" "}
                  {t.cart.checkout}
                </button>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="mt-2 w-full cursor-pointer py-2 text-sm text-muted-foreground hover:text-foreground"
                >
                  {t.cart.continue}
                </button>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>

      <Dialog open={preview} onOpenChange={setPreview}>
        <DialogContent className="rounded-3xl sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="font-display text-2xl">{t.previewCheckout.title}</DialogTitle>
            <DialogDescription className="text-base">{t.previewCheckout.body}</DialogDescription>
          </DialogHeader>
          <div className="mt-2 flex flex-col gap-2 sm:flex-row">
            <a
              href={TEL}
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-primary py-3 font-semibold text-primary-foreground"
            >
              <Phone className="h-4 w-4" /> {t.previewCheckout.call} · {PHONE}
            </a>
          </div>
          <button
            type="button"
            onClick={() => setPreview(false)}
            className="cursor-pointer py-2 text-sm text-muted-foreground hover:text-foreground"
          >
            {t.previewCheckout.close}
          </button>
        </DialogContent>
      </Dialog>
    </>
  );
}
