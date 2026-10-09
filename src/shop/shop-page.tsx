import { Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ArrowRight, MapPin, Phone, Search, Sparkles, Store } from "lucide-react";

import { MobileCallBar, SiteFooter, SiteHeader } from "@/components/site/chrome";
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
  const [sort, setSort] = useState<Sort>("featured");

  const available = SHOP_CATEGORIES.filter((c) => catalog.products.some((p) => p.category === c));
  const products = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = catalog.products.filter(
      (p) =>
        (category === "all" || p.category === category) &&
        (!q || `${p.title} ${p.vendor} ${t.categories[p.category]}`.toLowerCase().includes(q)),
    );
    if (sort === "price-asc") return [...list].sort((a, b) => minPrice(a) - minPrice(b));
    if (sort === "price-desc") return [...list].sort((a, b) => minPrice(b) - minPrice(a));
    if (sort === "name") return [...list].sort((a, b) => a.title.localeCompare(b.title));
    return [...list].sort((a, b) => Number(b.featured) - Number(a.featured));
  }, [catalog.products, query, category, sort, t]);

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
        <div className="mx-auto max-w-7xl px-5 pb-14 pt-32 md:pb-20 md:pt-40">
          <h1>
            <span className="eyebrow flex items-center gap-3 text-primary">
              <span className="h-px w-8 bg-primary" /> {t.hero.kicker}
            </span>
            <span className="mt-6 block max-w-4xl text-[clamp(2.75rem,6.5vw,5.5rem)] font-semibold leading-[0.95]">
              {t.hero.title[0]} <span className="text-primary">{t.hero.title[1]}</span>
            </span>
          </h1>
          <p className="mt-6 max-w-xl text-lg text-white/70">{t.hero.body}</p>
          {catalog.source === "preview" && (
            <p className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-sm text-white/75">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" /> {t.hero.preview}
            </p>
          )}
          <div className="relative mt-10 max-w-xl">
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

      {/* Filters */}
      <div className="sticky top-[76px] z-30 border-b bg-background/85 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center gap-3 px-5 py-3">
          <div className="-mx-1 flex flex-1 gap-2 overflow-x-auto px-1 py-1 [scrollbar-width:none]">
            {(["all", ...available] as const).map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setCategory(c)}
                aria-pressed={category === c}
                className={cn(
                  "shrink-0 cursor-pointer rounded-full border px-4 py-2 text-sm font-medium transition",
                  category === c ? "border-ink bg-ink text-white" : "bg-card hover:border-ink/40",
                )}
              >
                {t.categories[c]}
              </button>
            ))}
          </div>
          <label className="hidden shrink-0 items-center gap-2 text-sm text-muted-foreground md:flex">
            {t.sort.label}
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as Sort)}
              className="cursor-pointer rounded-full border bg-card px-3 py-2 text-sm text-foreground"
            >
              {(["featured", "price-asc", "price-desc", "name"] as const).map((s) => (
                <option key={s} value={s}>
                  {t.sort[s]}
                </option>
              ))}
            </select>
          </label>
        </div>
      </div>

      {/* Grid */}
      <section className="mx-auto max-w-7xl px-5 py-12 md:py-16">
        <h2 className="sr-only">{t.categories[category]}</h2>
        <p className="mb-8 text-sm text-muted-foreground">{t.results(products.length)}</p>
        {products.length === 0 ? (
          <div className="rounded-3xl border border-dashed py-20 text-center">
            <p className="text-muted-foreground">{t.empty}</p>
            <button
              type="button"
              onClick={() => {
                setQuery("");
                setCategory("all");
              }}
              className="mt-4 cursor-pointer rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-white"
            >
              {t.clear}
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 lg:grid-cols-4 lg:gap-x-6">
            {products.map((p, i) => (
              <ProductCard key={p.id} product={p} lang={lang} priority={i < 4} />
            ))}
          </div>
        )}
      </section>

      {/* Trust + financing */}
      <section className="mx-auto max-w-7xl px-5 pb-24">
        <div className="grid gap-4 md:grid-cols-4">
          {t.trust.map(([title, body], i) => {
            const Icon = TRUST_ICONS[i] ?? Store;
            return (
              <div key={title} className="rounded-3xl border bg-card p-6">
                <Icon className="h-5 w-5 text-primary" />
                <p className="mt-4 font-semibold">{title}</p>
                <p className="mt-1 text-sm text-muted-foreground">{body}</p>
              </div>
            );
          })}
          <Link
            to={ALTERNATES.financing[lang]}
            className="group flex flex-col justify-between rounded-3xl bg-ink p-6 text-white"
          >
            <div>
              <p className="font-semibold">{t.financing.title}</p>
              <p className="mt-1 text-sm text-white/65">{t.financing.body}</p>
            </div>
            <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
              {t.financing.cta}
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
            </span>
          </Link>
        </div>
        <p className="mt-6 flex items-center gap-2 text-sm text-muted-foreground">
          <MapPin className="h-4 w-4 text-primary" /> TIC Wireless · 3640 Hillcroft St, Houston, TX
          77057
        </p>
      </section>

      <SiteFooter lang={lang} />
      <MobileCallBar lang={lang} />
    </main>
  );
}
