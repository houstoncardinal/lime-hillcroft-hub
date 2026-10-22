import { Link } from "@tanstack/react-router";
import { Money, MoneyText } from "@/components/intl/money";
import { useState } from "react";
import { Check, ChevronRight, Minus, Phone, Plus, ShoppingBag } from "lucide-react";

import { PHONE, TEL } from "@/components/site/business";
import { MobileCallBar, SiteFooter, SiteHeader } from "@/components/site/chrome";
import { ALTERNATES, type Lang } from "@/components/site/seo";
import { money, useCartStore } from "@/shop/cart";
import { Badge, ProductCard, ProductTile } from "@/shop/components";
import { SHOP_COPY } from "@/shop/copy";
import { productPaths } from "@/shop/paths";
import type { ShopProduct } from "@/shop/types";
import { payInFour, showsInstallments } from "@/shop/installments";
import { cn } from "@/lib/utils";

export function ProductPage({
  lang,
  product,
  related,
}: {
  lang: Lang;
  product: ShopProduct;
  related: ShopProduct[];
}) {
  const t = SHOP_COPY[lang];
  const [variantId, setVariantId] = useState(
    (product.variants.find((v) => v.available) ?? product.variants[0])?.id,
  );
  const [quantity, setQuantity] = useState(1);
  const [payMode, setPayMode] = useState<"full" | "plan">("full");
  const [imageIndex, setImageIndex] = useState(0);
  const [added, setAdded] = useState(false);
  const variant = product.variants.find((v) => v.id === variantId) ?? product.variants[0];
  const image =
    (imageIndex === 0 ? variant?.image : null) ?? product.images[imageIndex] ?? product.images[0];
  const addItem = useCartStore((s) => s.addItem);
  const setCartOpen = useCartStore((s) => s.setOpen);
  const canLease = Boolean(variant && showsInstallments(product.category, variant.price));
  const busy = useCartStore((s) => s.busy);

  const add = async () => {
    if (!variant) return;
    await addItem(product, variant, quantity, canLease && payMode === "plan");
    // Lease choice: open the cart so the customer goes straight to Shopify checkout → Shop Pay.
    if (canLease && payMode === "plan") setCartOpen(true);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  return (
    <main className="overflow-x-hidden">
      <SiteHeader lang={lang} paths={productPaths(product.handle)} />
      <div className="h-24 bg-ink" />

      <section className="mx-auto max-w-7xl px-5 py-8 md:py-10">
        <nav
          aria-label="Breadcrumb"
          className="mb-8 flex flex-wrap items-center gap-1 text-sm text-muted-foreground"
        >
          <Link to={ALTERNATES.home[lang]} className="hover:text-foreground">
            {<MoneyText text={t.meta.breadcrumb[0]} />}
          </Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <Link to={ALTERNATES.shop[lang]} className="hover:text-foreground">
            {<MoneyText text={t.meta.breadcrumb[1]} />}
          </Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="text-foreground">{product.title}</span>
        </nav>

        <div className="grid gap-8 lg:grid-cols-[1.1fr_1fr] lg:gap-10">
          {/* Gallery */}
          <div className="lg:sticky lg:top-28 lg:self-start">
            <div className="relative">
              <ProductTile
                image={image}
                className="aspect-square"
                sizes="(min-width: 1024px) 50vw, 100vw"
                priority
              />
              <div className="absolute left-4 top-4">
                <Badge product={product} lang={lang} />
              </div>
            </div>
            {product.images.length > 1 && (
              <div className="mt-4 flex gap-3">
                {product.images.map((im, i) => (
                  <button
                    key={im.url}
                    type="button"
                    onClick={() => setImageIndex(i)}
                    aria-label={im.alt}
                    className={cn(
                      "cursor-pointer rounded-2xl ring-2 ring-offset-2 ring-offset-background transition",
                      i === imageIndex ? "ring-primary" : "ring-transparent",
                    )}
                  >
                    <ProductTile image={im} className="h-20 w-20 rounded-2xl" sizes="80px" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details */}
          <div>
            <p className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
              {product.vendor}
            </p>
            <h1 className="mt-2 text-4xl font-semibold leading-tight md:text-5xl">
              {product.title}
            </h1>
            <p className="mt-5 flex items-baseline gap-3">
              <span className="tabular-nums font-display text-3xl font-semibold">
                {variant ? <Money usd={variant.price / 100} /> : ""}
              </span>
              </p>
            {canLease && variant && (
              <fieldset className="mt-8">
                <legend className="mb-3 text-sm font-semibold">{t.lease.title}</legend>
                <div className="grid gap-2 sm:grid-cols-2">
                  {(["full", "plan"] as const).map((m) => (
                    <label
                      key={m}
                      className={cn(
                        "cursor-pointer rounded-2xl border bg-card p-4 transition",
                        payMode === m ? "border-primary ring-2 ring-primary/30" : "hover:border-foreground/30",
                      )}
                    >
                      <input
                        type="radio"
                        name="pay-mode"
                        value={m}
                        checked={payMode === m}
                        onChange={() => setPayMode(m)}
                        className="sr-only"
                      />
                      <span className="block font-semibold">{m === "full" ? t.lease.full : t.lease.plan}</span>
                      <span className="tabular-nums mt-1 block font-display text-xl font-semibold">
                        {m === "full" ? (
                          <Money usd={(variant.price * quantity) / 100} />
                        ) : (
                          <>
                            <Money usd={payInFour(variant.price * quantity) / 100} />
                            <span className="text-sm font-normal text-muted-foreground"> × 4</span>
                          </>
                        )}
                      </span>
                      <span className="mt-1 block text-xs text-muted-foreground">
                        {m === "full"
                          ? t.lease.fullNote
                          : t.lease.planNote(money(payInFour(variant.price * quantity)))}
                      </span>
                    </label>
                  ))}
                </div>
                <p className="mt-2 text-xs text-muted-foreground">{t.lease.fine}</p>
              </fieldset>
            )}
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
              {product.description}
            </p>

            {product.optionName && (
              <fieldset className="mt-8">
                <legend className="mb-3 text-sm font-semibold">
                  {product.optionName}:{" "}
                  <span className="font-normal text-muted-foreground">{variant?.title}</span>
                </legend>
                <div className="flex flex-wrap gap-2">
                  {product.variants.map((v) => (
                    <button
                      key={v.id}
                      type="button"
                      disabled={!v.available}
                      aria-pressed={v.id === variantId}
                      onClick={() => {
                        setVariantId(v.id);
                        setImageIndex(0);
                      }}
                      className={cn(
                        "cursor-pointer rounded-full border px-4 py-2 text-sm font-medium transition disabled:cursor-not-allowed disabled:line-through disabled:opacity-40",
                        v.id === variantId
                          ? "border-ink bg-ink text-white"
                          : "bg-card hover:border-ink/40",
                      )}
                    >
                      {v.title}
                    </button>
                  ))}
                </div>
              </fieldset>
            )}

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <div
                className="flex items-center rounded-full border bg-card"
                aria-label={t.quantity}
              >
                <button
                  type="button"
                  aria-label="−1"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full hover:bg-secondary"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="tabular-nums w-8 text-center font-semibold">{quantity}</span>
                <button
                  type="button"
                  aria-label="+1"
                  onClick={() => setQuantity((q) => Math.min(99, q + 1))}
                  className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full hover:bg-secondary"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
              <button
                type="button"
                onClick={add}
                disabled={!variant?.available}
                className="inline-flex h-12 flex-1 cursor-pointer items-center justify-center gap-2 rounded-full bg-primary px-8 font-semibold text-primary-foreground shadow-lg shadow-primary/30 transition hover:brightness-110 disabled:opacity-50 sm:flex-none"
              >
                {added ? <Check className="h-5 w-5" /> : <ShoppingBag className="h-5 w-5" />}
                {!variant?.available
                  ? t.soldOut
                  : added
                    ? t.added
                    : canLease && payMode === "plan"
                      ? t.lease.addPlan
                      : t.add}
              </button>
            </div>
            {variant?.available && (
              <p className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
                <span className="h-2 w-2 rounded-full bg-emerald-500" />{" "}
                {<MoneyText text={t.inStock} />}
              </p>
            )}

            {product.features.length > 0 && (
              <div className="mt-8 border-t pt-8">
                <h2 className="font-display text-lg font-semibold">
                  {<MoneyText text={t.features} />}
                </h2>
                <ul className="mt-4 space-y-3">
                  {product.features.map((f) => (
                    <li key={f} className="flex gap-3 text-muted-foreground">
                      <Check className="mt-0.5 h-5 w-5 shrink-0 text-primary" /> {f}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="mt-8 rounded-3xl bg-ink p-6 text-white">
              <p className="font-semibold">{<MoneyText text={t.questions} />}</p>
              <p className="mt-1 text-sm text-white/65">{<MoneyText text={t.trust[2]?.[1]} />}</p>
              <a
                href={TEL}
                className="mt-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-5 py-2.5 text-sm font-semibold transition hover:bg-white/20"
              >
                <Phone className="h-4 w-4" /> {PHONE}
              </a>
            </div>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="mx-auto max-w-7xl px-5 pb-16">
          <h2 className="font-display text-3xl font-semibold">{<MoneyText text={t.related} />}</h2>
          <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-4 lg:gap-x-6">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} lang={lang} />
            ))}
          </div>
        </section>
      )}

      <SiteFooter lang={lang} />
      <MobileCallBar lang={lang} />
    </main>
  );
}
