import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Loader2, Minus, Phone, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { toast } from "sonner";

import { Money } from "@/components/intl/money";
import { PHONE, TEL } from "@/components/site/business";
import { setChatHidden } from "@/components/site/tidio";
import { ALTERNATES, type Lang } from "@/components/site/seo";
import {
  cartCount,
  cartSubtotal,
  useCartStore,
  useCartSync,
  useMounted,
} from "@/shop/cart";
import { SHOP_COPY } from "@/shop/copy";
import { INSTALLMENTS_MIN_CENTS, payInFour, showsInstallments } from "@/shop/installments";
import { productPath } from "@/shop/paths";
import { InstallmentSteps } from "@/shop/installment-steps";
import { Button } from "@/components/ui/button";
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

/** Shop Pay accent chip: "or 4 × $X with Shop Pay". */
export function InstallmentChip({
  cents,
  lang,
  className,
}: {
  cents: number;
  lang: Lang;
  className?: string;
}) {
  const t = SHOP_COPY[lang];
  return (
    <span
      className={cn(
        "inline-flex max-w-full items-center gap-1.5 rounded-full bg-shoppay/10 px-2.5 py-1 text-[11px] font-medium leading-tight text-shoppay ring-1 ring-inset ring-shoppay/20",
        className,
      )}
    >
      <span className="shrink-0 rounded-full bg-shoppay px-1.5 py-px text-[9px] font-bold uppercase tracking-wide text-shoppay-foreground">
        Pay
      </span>
      <span className="min-w-0 truncate">
        {t.lease.cardLine}{" "}
        <span className="tabular-nums font-semibold">
          <Money usd={payInFour(cents) / 100} />
        </span>
      </span>
    </span>
  );
}

export function Price({ product, lang }: { product: ShopProduct; lang: Lang }) {
  const t = SHOP_COPY[lang];
  const prices = product.variants.map((v) => v.price);
  const min = Math.min(...prices);
  const varies = prices.some((p) => p !== min);
  return (
    <div className="flex min-w-0 flex-col gap-1.5">
      <span className="tabular-nums">
        {varies && <span className="mr-1 text-xs font-normal text-muted-foreground">{t.from}</span>}
        <span className="font-display text-lg font-semibold">
          <Money usd={min / 100} />
        </span>
      </span>
      {showsInstallments(product.category, min) && <InstallmentChip cents={min} lang={lang} />}
    </div>
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
    if (!(await addItem(product, first))) return;
    toast.success(t.added, { description: product.title });
  };

  return (
    <article className="group relative flex flex-col rounded-[1.75rem] border bg-card p-2.5 transition duration-300 hover:-translate-y-0.5 hover:border-foreground/15 hover:shadow-[0_24px_50px_-28px_color-mix(in_oklab,var(--ink)_45%,transparent)] sm:p-3">
      <Link
        to={productPath(lang, product.handle)}
        className="block focus-visible:outline-none"
        aria-label={product.title}
      >
        <ProductTile
          image={product.images[0]}
          className="aspect-square rounded-[1.35rem]"
          priority={priority}
        />
      </Link>
      <div className="absolute left-5 top-5">
        <Badge product={product} lang={lang} />
      </div>
      <div className="flex flex-1 flex-col px-1.5 pb-1.5 pt-4">
        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
          {product.vendor}
        </p>
        <h3 className="mt-1 line-clamp-2 font-display text-base font-semibold leading-snug sm:text-lg">
          <Link to={productPath(lang, product.handle)} className="hover:text-primary">
            {product.title}
          </Link>
        </h3>
        {product.optionName && product.variants.length > 1 && (
          <p className="mt-1 text-xs text-muted-foreground">
            {product.variants.length} {product.optionName.toLowerCase()}
            {lang === "en" ? "s" : ""}
          </p>
        )}
        <div className="mt-auto pt-3">
          <Price product={product} lang={lang} />
          {single && first ? (
            <button
              type="button"
              disabled={!first.available}
              onClick={() => void quickAdd()}
              className="mt-3 inline-flex w-full cursor-pointer items-center justify-center gap-1.5 rounded-full bg-ink py-2.5 text-xs font-semibold text-white transition hover:bg-primary hover:text-primary-foreground disabled:opacity-40"
            >
              <Plus className="h-3.5 w-3.5" /> {first.available ? t.quickAdd : t.soldOut}
            </button>
          ) : (
            <Link
              to={productPath(lang, product.handle)}
              className="mt-3 inline-flex w-full items-center justify-center gap-1.5 rounded-full border py-2.5 text-xs font-semibold transition hover:border-ink hover:bg-ink hover:text-white"
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
  const error = useCartStore((s) => s.error);
  const syncing = useCartStore((s) => s.syncing);
  const open = useCartStore((s) => s.open);
  const setOpen = useCartStore((s) => s.setOpen);
  const setQuantity = useCartStore((s) => s.setQuantity);
  const removeItem = useCartStore((s) => s.removeItem);
  const syncCart = useCartStore((s) => s.syncCart);
  const getCheckoutUrl = useCartStore((s) => s.getCheckoutUrl);
  const [preview, setPreview] = useState(false);
  const leaseItems = items.filter((i) => i.lease);
  const hasEligibleDevice = items.some((i) => showsInstallments(i.category, i.price));

  // Keeps the remembered cart honest when the shopper returns from Shopify checkout.
  useCartSync();

  // The live chat button must never sit on top of the open cart drawer.
  useEffect(() => {
    setChatHidden(open);
  }, [open]);

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
                          {l.lease && (
                            <p className="mt-1.5 inline-block rounded-full bg-shoppay/10 px-2 py-0.5 text-[11px] font-semibold text-shoppay ring-1 ring-inset ring-shoppay/20">
                              {t.lease.lineBadge}
                            </p>
                          )}
                        </div>
                        {l.lease ? (
                          <p className="tabular-nums text-right">
                            <span className="block font-semibold">
                              ≈ <Money usd={payInFour(l.price * l.quantity) / 100} /> × 4
                            </span>
                            <span className="block text-xs text-muted-foreground">
                              {t.lease.total} <Money usd={(l.price * l.quantity) / 100} />
                            </span>
                          </p>
                        ) : (
                          <p className="tabular-nums font-semibold">
                            <Money usd={(l.price * l.quantity) / 100} />
                          </p>
                        )}
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
              <div className="max-h-[60dvh] shrink-0 overflow-y-auto border-t bg-secondary/50 px-6 py-5">
                {error && <div role="alert" className="mb-3 text-sm text-destructive">{t.checkoutError}<button type="button" className="ml-2 underline" onClick={() => void syncCart()}>{lang === "es" ? "Reintentar" : "Retry"}</button></div>}
                <div className="flex items-baseline justify-between">
                  <span className="text-muted-foreground">{t.cart.subtotal}</span>
                  <span className="tabular-nums font-display text-2xl font-semibold">
                    <Money usd={cartSubtotal(items) / 100} />
                  </span>
                </div>
                <p className="mt-1 text-xs text-muted-foreground">{t.cart.note}</p>
                {leaseItems.length > 0 ? (
                  <div className="mt-3 rounded-lg border border-shoppay/25 bg-shoppay/8 px-4 py-3 text-xs leading-relaxed">
                    <p className="font-semibold text-shoppay">{t.lease.dueToday}</p>
                    <p className="text-muted-foreground">Shop Pay Installments · {t.lease.provider}</p>
                    <p className="mt-1 text-muted-foreground">{t.lease.howTo}</p>
                    <InstallmentSteps lang={lang} />
                  </div>
                ) : (
                  hasEligibleDevice && cartSubtotal(items) >= INSTALLMENTS_MIN_CENTS && (
                    <p className="mt-3 rounded-2xl border border-shoppay/20 bg-card px-4 py-3 text-xs leading-relaxed">
                      <span className="font-semibold">{t.lease.cartTitle}</span>{" "}
                      Shop Pay Installments · {t.lease.provider}. {t.lease.howTo}
                    </p>
                  )
                )}
                <Button
                  type="button"
                  onClick={checkout}
                  disabled={busy || syncing || Boolean(error) || !getCheckoutUrl()}
                  className="mt-4 flex w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-primary py-3.5 font-semibold text-primary-foreground transition hover:brightness-110 disabled:opacity-60"
                >
                  {(busy || syncing) && <Loader2 className="h-4 w-4 animate-spin" />}{" "}
                  {leaseItems.length > 0 ? t.lease.checkout : t.cart.checkout}
                </Button>
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
