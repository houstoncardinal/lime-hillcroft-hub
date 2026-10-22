import { Link } from "@tanstack/react-router";
import { MoneyText } from "@/components/intl/money";
import { useMemo, useState } from "react";
import {
  ArrowRight,
  CalendarClock,
  CreditCard,
  KeyRound,
  Lock,
  MapPin,
  Phone,
  Search,
  Sparkles,
  Store,
} from "lucide-react";
const PAY_ICONS = [CreditCard, CalendarClock, KeyRound];

import { SiteFooter, SiteHeader } from "@/components/site/chrome";
import { DotRing } from "@/components/site/logo";
import { ALTERNATES, type Lang } from "@/components/site/seo";
import { ProductCard } from "@/shop/components";
import { SHOP_COPY } from "@/shop/copy";
import { SHOP_CATEGORIES, type Catalog, type ShopCategory } from "@/shop/types";
import { cn } from "@/lib/utils";

type Sort = "featured" | "price-asc" | "price-desc" | "name";
const minPrice = (p: Catalog["products"][number]) => Math.min(...p.variants.map((v) => v.price));
const TRUST_ICONS = [Store, Sparkles, Phone];

export function ShopPage({ lang, catalog }: { lang: Lang; catalog: Catalog }) {
  const t = SHOP_COPY[lang];
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<ShopCategory | "all">("all");
  const [brand, setBrand] = useState<string>("all");
  const [sort, setSort] = useState<Sort>("featured");

  const available = SHOP_CATEGORIES.filter((c) => catalog.products.some((p) => p.category === c));
  // How many products sit in each category, shown on the chips so browsing is predictable.
  const counts = useMemo(() => {
    const m = new Map<string, number>();
    for (const p of catalog.products) m.set(p.category, (m.get(p.category) ?? 0) + 1);
    return m;
  }, [catalog.products]);
  const brands = useMemo(
    () => [...new Set(catalog.products.map((p) => p.vendor))].sort((a, b) => a.localeCompare(b)),
    [catalog.products],
  );
  const products = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = catalog.products.filter(
      (p) =>
        (category === "all" || p.category === category) &&
        (brand === "all" || p.vendor === brand) &&
        (!q ||
          `${p.title} ${p.vendor} ${t.categories[p.category]}`
            .toLowerCase()
            .includes(q)),
    );
    if (sort === "price-asc") return [...list].sort((a, b) => minPrice(a) - minPrice(b));
    if (sort === "price-desc") return [...list].sort((a, b) => minPrice(b) - minPrice(a));
    if (sort === "name") return [...list].sort((a, b) => a.title.localeCompare(b.title));
    return [...list].sort((a, b) => Number(b.featured) - Number(a.featured));
  }, [catalog.products, query, category, brand, sort, t]);

  return (
    <main className="overflow-x-hidden">
      <SiteHeader lang={lang} paths={ALTERNATES.shop} />

      {/* Hero */}
      <section className="relative isolate overflow-hidden bg-ink text-white">
        <div className="grain absolute inset-0 -z-10 opacity-60" />
        <div className="absolute -right-40 -top-20 -z-10 h-[36rem] w-[36rem] rounded-full bg-primary/25 blur-[150px]" />
        <DotRing
          className="animate-spin-slow absolute -right-20 top-10 -z-10 hidden h-[26rem] w-[26rem] opacity-40 lg:block"
          rings={[
            { r: 92, count: 26, dot: 2.6, className: "fill-primary" },
            { r: 76, count: 22, dot: 2.2, className: "fill-slate" },
          ]}
        />
        <div className="mx-auto max-w-7xl px-5 pb-10 pt-28 md:pb-14 md:pt-32">
          <h1>
            <span className="eyebrow flex items-center gap-3 text-primary">
              <span className="h-px w-8 bg-primary" /> {<MoneyText text={t.hero.kicker} />}
            </span>
            <span className="mt-6 block max-w-4xl text-[clamp(2.75rem,6.5vw,5.5rem)] font-semibold leading-[0.95]">
              {<MoneyText text={t.hero.title[0]} />}{" "}
              <span className="text-primary">{<MoneyText text={t.hero.title[1]} />}</span>
            </span>
          </h1>
          <p className="mt-6 max-w-xl text-lg text-white/70">{<MoneyText text={t.hero.body} />}</p>
          {catalog.source === "preview" && (
            <p className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-sm text-white/75">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />{" "}
              {<MoneyText text={t.hero.preview} />}
            </p>
          )}
          <div className="relative mt-8 max-w-xl">
            <Search className="pointer-events-none absolute left-5 top-1/2 z-10 h-5 w-5 -translate-y-1/2 text-white/70" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t.hero.search}
              aria-label={t.hero.search}
              className="h-14 w-full rounded-full border border-white/15 bg-white/8 pl-13 pr-5 text-base text-white placeholder:text-white/45 backdrop-blur focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/20"
            />
          </div>
        </div>
      </section>

      {/* Ways to pay */}
      <section className="border-b bg-card">
        <div className="mx-auto max-w-7xl px-5 py-8 md:py-10">
          <div className="grid gap-6 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,2fr)] lg:items-center">
            <div className="min-w-0">
              <p className="eyebrow text-shoppay">{t.lease.waysTitle}</p>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{t.lease.waysBody}</p>
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              {t.lease.ways.map(([title, body], i) => {
                const Icon = PAY_ICONS[i] ?? CreditCard;
                const featured = i === 1;
                return (
                  <div
                    key={title}
                    className={cn(
                      "flex gap-3 rounded-2xl border p-4",
                      featured ? "border-shoppay/30 bg-shoppay/6" : "bg-background",
                    )}
                  >
                    <span
                      className={cn(
                        "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl",
                        featured ? "bg-shoppay text-shoppay-foreground" : "bg-ink text-primary",
                      )}
                    >
                      <Icon className="h-5 w-5" />
                    </span>
                    <div className="min-w-0">
                      <p className={cn("text-sm font-semibold", featured && "text-shoppay")}>{title}</p>
                      <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">{body}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Filters: category chips with counts, then a brand row, then sort. */}
      <div className="sticky top-[76px] z-30 border-b bg-background/85 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-5 py-3">
          <div className="flex items-center gap-3">
            <div className="-mx-1 flex min-w-0 flex-1 gap-2 overflow-x-auto px-1 py-1 [scrollbar-width:none]">
              {(["all", ...available] as const).map((c) => {
                const n = c === "all" ? catalog.products.length : (counts.get(c) ?? 0);
                return (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setCategory(c)}
                    aria-pressed={category === c}
                    className={cn(
                      "shrink-0 cursor-pointer rounded-full border px-4 py-2 text-sm font-medium transition",
                      category === c
                        ? "border-ink bg-ink text-white"
                        : "bg-card hover:border-ink/40",
                    )}
                  >
                    {<MoneyText text={`${t.categories[c]} (${n})`} />}
                  </button>
                );
              })}
            </div>
            <label className="flex shrink-0 items-center gap-2 text-sm text-muted-foreground">
              <span className="hidden md:inline">{<MoneyText text={t.sort.label} />}</span>
              <select
                value={sort}
                aria-label={t.sort.label}
                onChange={(e) => setSort(e.target.value as Sort)}
                className="max-w-[8.5rem] cursor-pointer rounded-full border bg-card px-3 py-2 text-sm text-foreground md:max-w-none"
              >
                {(["featured", "price-asc", "price-desc", "name"] as const).map((s) => (
                  <option key={s} value={s}>
                    {t.sort[s]}
                  </option>
                ))}
              </select>
            </label>
          </div>
          {brands.length > 1 && (
            <div className="flex items-center gap-2">
              <span className="shrink-0 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                {t.brands.label}
              </span>
              <div className="-mx-1 flex min-w-0 flex-1 gap-1.5 overflow-x-auto px-1 py-0.5 [scrollbar-width:none]">
                {["all", ...brands].map((b) => (
                  <button
                    key={b}
                    type="button"
                    onClick={() => setBrand(b)}
                    aria-pressed={brand === b}
                    className={cn(
                      "shrink-0 cursor-pointer rounded-full border px-3 py-1.5 text-xs font-medium transition",
                      brand === b
                        ? "border-primary bg-primary text-primary-foreground"
                        : "bg-card text-muted-foreground hover:border-primary/50 hover:text-foreground",
                    )}
                  >
                    {b === "all" ? t.brands.all : b}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Grid */}
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-5 md:py-12">
        <h2 className="sr-only">{<MoneyText text={t.categories[category]} />}</h2>
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm font-medium text-muted-foreground">{t.results(products.length)}</p>
          <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Lock className="h-3.5 w-3.5 text-success" /> {t.lease.secure}
          </p>
        </div>
        {products.length === 0 ? (
          <div className="rounded-3xl border border-dashed py-14 text-center">
            <p className="text-muted-foreground">{<MoneyText text={t.empty} />}</p>
            <button
              type="button"
              onClick={() => {
                setQuery("");
                setCategory("all");
                setBrand("all");
              }}
              className="mt-4 cursor-pointer rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-white"
            >
              {<MoneyText text={t.clear} />}
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3 lg:grid-cols-4">
            {products.map((p, i) => (
              <ProductCard key={p.id} product={p} lang={lang} priority={i < 4} />
            ))}
          </div>
        )}
      </section>

      {/* Trust + leasing */}
      <section className="mx-auto max-w-7xl px-5 pb-16">
        <div className="grid gap-4 md:grid-cols-4">
          {t.trust.map(([title, body], i) => {
            const Icon = TRUST_ICONS[i] ?? Store;
            return (
              <div key={title} className="rounded-3xl border bg-card p-6">
                <Icon className="h-5 w-5 text-primary" />
                <p className="mt-4 font-semibold">{<MoneyText text={title} />}</p>
                <p className="mt-1 text-sm text-muted-foreground">{<MoneyText text={body} />}</p>
              </div>
            );
          })}
          <Link
            to={ALTERNATES.leasing[lang]}
            className="group flex flex-col justify-between rounded-3xl bg-ink p-6 text-white"
          >
            <div>
              <p className="font-semibold">{<MoneyText text={t.leasing.title} />}</p>
              <p className="mt-1 text-sm text-white/65">{<MoneyText text={t.leasing.body} />}</p>
            </div>
            <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
              {<MoneyText text={t.leasing.cta} />}
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
            </span>
          </Link>
        </div>
        <p className="mt-6 flex items-center gap-2 text-sm text-muted-foreground">
          <MapPin className="h-4 w-4 text-primary" /> TIC Wireless Electronic & Repair Center · 3640
          Hillcroft St, Suite C, Houston, TX 77057
        </p>
      </section>

      <SiteFooter lang={lang} />
    </main>
  );
}
