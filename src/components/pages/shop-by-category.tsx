import { Link } from "@tanstack/react-router";
import { ArrowRight, BadgeCheck } from "lucide-react";

import { LeaseMoney } from "@/components/lease/lease-ui";
import { LEASE_DEVICES, LEASE_PATHS, leaseFrom, type LeaseCategory } from "@/components/lease/catalog";
import { PRODUCT_PHOTOS } from "@/components/products/photos";
import { CARRIER_COUNT } from "@/components/services/carriers";
import { servicePath } from "@/components/services/paths";
import { SERVICE_PHOTOS } from "@/components/services/photos";
import { SHOP_ENABLED } from "@/components/site/features";
import { ALTERNATES, type Lang } from "@/components/site/seo";
import { cn } from "@/lib/utils";

// Home page "Shop by category": one tile per kind of product or service the store offers, each
// with a store photo. Product tiles open the lease-to-own catalog section (prices for every
// option); service tiles open their service page.

type L = Record<Lang, string>;
type Img = {
  src: string;
  sm: string;
  w: number;
  h: number;
  fit?: "contain";
  /** CSS object-position, and how far to zoom in on that point. */
  focus?: string;
  zoom?: number;
};

type Tile = {
  id: string;
  title: L;
  /** One short line under the title; a lease category shows its lowest leasing price instead. */
  hint?: L;
  lease?: LeaseCategory;
  href: Record<Lang, string>;
  img: Img;
};

const both = (en: string, es = en): L => ({ en, es });
const lease = (cat: LeaseCategory) => ({
  en: `${LEASE_PATHS.en}#${cat}`,
  es: `${LEASE_PATHS.es}#${cat}`,
});
const service = (slug: Parameters<typeof servicePath>[1]) => ({
  en: servicePath("en", slug),
  es: servicePath("es", slug),
});
const P = PRODUCT_PHOTOS;
const S = SERVICE_PHOTOS;

const TILES: Tile[] = [
  { id: "iphone", title: both("iPhone"), lease: "iphone", href: lease("iphone"), img: P.iphone18 },
  { id: "samsung", title: both("Samsung Galaxy"), lease: "samsung", href: lease("samsung"), img: S.s24 },
  {
    id: "ipads",
    title: both("iPad & tablets", "iPad y tabletas"),
    lease: "ipads",
    href: lease("ipads"),
    // The bottom shelf of the display case: iPad and Galaxy Tab boxes.
    img: { ...P.airpodsMax, focus: "80% 82%", zoom: 2 },
  },
  {
    id: "laptops",
    title: both("MacBook & laptops", "MacBook y laptops"),
    lease: "macbooks",
    href: ALTERNATES.laptops,
    img: P.laptopsTablets,
  },
  {
    id: "consoles",
    title: both("Game consoles", "Consolas"),
    lease: "consoles",
    href: ALTERNATES.consoles,
    img: P.consoles,
  },
  {
    id: "watches",
    title: both("Smartwatches", "Relojes inteligentes"),
    lease: "watches",
    href: lease("watches"),
    img: P.airpodsWatches,
  },
  {
    id: "audio",
    title: both("Speakers & audio", "Bocinas y audio"),
    hint: both("JBL, AirPods & Galaxy Buds", "JBL, AirPods y Galaxy Buds"),
    href: { en: `${ALTERNATES.accessories.en}#audio`, es: `${ALTERNATES.accessories.es}#audio` },
    img: P.jbl,
  },
  {
    id: "accessories",
    title: both("Cases & accessories", "Fundas y accesorios"),
    hint: both("Cases, glass & chargers", "Fundas, micas y cargadores"),
    href: ALTERNATES.accessories,
    img: P.caseWall,
  },
  {
    id: "repair",
    title: both("Phone repair", "Reparación"),
    hint: both("Same-day screens & batteries", "Pantallas y baterías el mismo día"),
    href: service("phone-repair"),
    img: S.repair,
  },
  {
    id: "prepaid",
    title: both("Prepaid plans", "Planes prepagados"),
    hint: both(`${CARRIER_COUNT} carriers from $10/mo`, `${CARRIER_COUNT} compañías desde $10/mes`),
    href: service("prepaid-plans"),
    img: S.counter,
  },
  {
    id: "xfinity",
    title: both("Home internet", "Internet en casa"),
    hint: both("Xfinity Prepaid, set up in store", "Xfinity Prepaid, en la tienda"),
    href: service("xfinity-prepaid-internet"),
    img: S.xfinity,
  },
];

const T = {
  en: {
    kicker: "Everything in one store",
    title: "Shop by category",
    shopAll: "Shop all",
    leaseFrom: "Lease from",
    dealTitle: "Lease-to-own",
    dealBadge: "No credit needed",
    dealHint: "Apply online, pick it up today",
  },
  es: {
    kicker: "Todo en una sola tienda",
    title: "Compra por categoría",
    shopAll: "Ver todo",
    leaseFrom: "Arrienda desde",
    dealTitle: "Arrendamiento",
    dealBadge: "Sin crédito",
    dealHint: "Solicita en línea y llévatelo hoy",
  },
};

/** Lowest leasing price in a lease-to-own category. */
const lowestLease = (cat: LeaseCategory) =>
  Math.min(...LEASE_DEVICES.filter((d) => d.category === cat).map((d) => leaseFrom(d).lease));

const tileClass =
  "group flex h-full flex-col overflow-hidden rounded-2xl bg-white p-2.5 text-ink shadow-[0_18px_40px_-24px_rgba(0,0,0,0.6)] ring-1 ring-black/5 transition duration-300 hover:-translate-y-1 hover:shadow-[0_28px_50px_-24px_rgba(0,0,0,0.7)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary sm:p-3";

export function ShopByCategory({ lang }: { lang: Lang }) {
  const t = T[lang];
  const allHref = SHOP_ENABLED ? ALTERNATES.shop[lang] : ALTERNATES.devices[lang];
  return (
    <section
      id="categories"
      aria-labelledby="categories-title"
      className="relative isolate scroll-mt-24 overflow-hidden bg-gradient-to-b from-ink to-ink-soft py-14 text-white md:py-20"
    >
      <div className="absolute -left-32 top-0 -z-10 h-96 w-96 rounded-full bg-primary/20 blur-[120px]" />
      <div className="absolute -bottom-40 right-0 -z-10 h-96 w-96 rounded-full bg-primary/15 blur-[140px]" />
      <div className="mx-auto max-w-7xl px-5">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="eyebrow flex items-center gap-3 text-primary">
              <span className="h-px w-8 bg-primary" /> {t.kicker}
            </p>
            <h2 id="categories-title" className="mt-3 text-3xl font-semibold md:text-5xl">
              {t.title}
            </h2>
          </div>
          <Link
            to={allHref}
            className="inline-flex min-h-11 shrink-0 items-center gap-2 rounded-full bg-white px-5 text-sm font-bold text-ink transition hover:bg-primary hover:text-primary-foreground"
          >
            {t.shopAll} <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <ul className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4 xl:grid-cols-6">
          {/* Lease-to-own: the store's headline offer, like a "Deals" tile */}
          <li>
            <Link to={LEASE_PATHS[lang]} className={tileClass}>
              <p className="pt-1 text-center font-display text-sm font-semibold sm:text-base">
                {t.dealTitle}
              </p>
              <div className="mt-2 flex aspect-[4/3] flex-col items-center justify-center gap-2 rounded-xl bg-gradient-to-br from-primary/10 to-secondary px-2 text-center">
                <span className="inline-flex items-center gap-1 whitespace-nowrap rounded-lg bg-primary px-2.5 py-1.5 font-display text-[11px] font-bold uppercase tracking-wide text-primary-foreground shadow-md shadow-primary/30 sm:text-xs">
                  <BadgeCheck className="h-3.5 w-3.5 shrink-0" /> {t.dealBadge}
                </span>
                <span className="text-[11px] font-medium leading-snug text-ink/70 sm:text-xs">
                  {t.dealHint}
                </span>
              </div>
              <p className="mt-2 text-center text-[11px] font-semibold text-primary sm:text-xs">
                {LEASE_DEVICES.length} {lang === "en" ? "devices" : "equipos"}
              </p>
            </Link>
          </li>

          {TILES.map((tile) => (
            <li key={tile.id}>
              <Link to={tile.href[lang]} className={tileClass}>
                <p className="pt-1 text-center font-display text-sm font-semibold sm:text-base">
                  {tile.title[lang]}
                </p>
                <div
                  className={cn(
                    "relative mt-2 aspect-[4/3] overflow-hidden rounded-xl",
                    tile.img.fit === "contain" ? "bg-white" : "bg-secondary",
                  )}
                >
                  <img
                    src={tile.img.sm}
                    srcSet={`${tile.img.sm} 900w, ${tile.img.src} ${tile.img.w}w`}
                    sizes="(min-width: 1280px) 200px, (min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
                    alt=""
                    width={tile.img.w}
                    height={tile.img.h}
                    loading="lazy"
                    decoding="async"
                    className={cn(
                      "absolute inset-0 h-full w-full transition duration-500 group-hover:scale-105",
                      tile.img.fit === "contain" ? "object-contain p-2" : "object-cover",
                    )}
                    style={
                      tile.img.focus
                        ? {
                            objectPosition: tile.img.focus,
                            transformOrigin: tile.img.focus,
                            scale: String(tile.img.zoom ?? 1),
                          }
                        : undefined
                    }
                  />
                </div>
                <p className="mt-2 truncate text-center text-[11px] text-ink/60 sm:text-xs">
                  {tile.lease ? (
                    <>
                      {t.leaseFrom}{" "}
                      <span className="font-semibold text-primary">
                        <LeaseMoney usd={lowestLease(tile.lease)} />
                      </span>
                    </>
                  ) : (
                    tile.hint?.[lang]
                  )}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
