import { Link } from "@tanstack/react-router";
import { ArrowRight, BadgeCheck } from "lucide-react";

import { LEASE_PATHS, type LeaseCategory } from "@/components/lease/catalog";
import { PRODUCT_PHOTOS } from "@/components/products/photos";
import { servicePath } from "@/components/services/paths";
import { SERVICE_PHOTOS } from "@/components/services/photos";
import { SHOP_ENABLED } from "@/components/site/features";
import { ALTERNATES, type Lang } from "@/components/site/seo";
import { cn } from "@/lib/utils";

// Home page "Shop by category": one tile per kind of product or service the store offers, each a
// store photo and a name. Product tiles open their lease-to-own catalog section or category page;
// service tiles open their service page. Prices live on those pages, not here.

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

type Tile = { id: string; title: L; href: Record<Lang, string>; img: Img };

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
  { id: "iphone", title: both("iPhone"), href: lease("iphone"), img: P.iphone18 },
  { id: "samsung", title: both("Samsung Galaxy"), href: lease("samsung"), img: S.s24 },
  {
    id: "ipads",
    title: both("iPad & tablets", "iPad y tabletas"),
    href: lease("ipads"),
    // The bottom shelf of the display case: iPad and Galaxy Tab boxes.
    img: { ...P.airpodsMax, focus: "80% 82%", zoom: 2 },
  },
  {
    id: "laptops",
    title: both("Laptops", "Laptops"),
    href: ALTERNATES.laptops,
    img: P.laptopsTablets,
  },
  {
    id: "consoles",
    title: both("Game consoles", "Consolas"),
    href: ALTERNATES.consoles,
    img: P.consoles,
  },
  {
    id: "watches",
    title: both("Smartwatches", "Relojes"),
    href: lease("watches"),
    img: P.airpodsWatches,
  },
  {
    id: "audio",
    title: both("Audio", "Audio"),
    href: { en: `${ALTERNATES.accessories.en}#audio`, es: `${ALTERNATES.accessories.es}#audio` },
    img: P.jbl,
  },
  {
    id: "accessories",
    title: both("Accessories", "Accesorios"),
    href: ALTERNATES.accessories,
    img: P.caseWall,
  },
  {
    id: "repair",
    title: both("Phone repair", "Reparación"),
    href: service("phone-repair"),
    img: S.repair,
  },
  {
    id: "prepaid",
    title: both("Prepaid plans", "Planes prepagados"),
    href: service("prepaid-plans"),
    img: S.counter,
  },
  {
    id: "xfinity",
    title: both("Home internet", "Internet en casa"),
    href: service("xfinity-prepaid-internet"),
    img: S.xfinity,
  },
];

const T = {
  en: {
    kicker: "Everything in one store",
    title: "Shop by category",
    shopAll: "Shop all",
    dealTitle: "Lease-to-own",
    dealBadge: "No credit needed",
    dealHint: "Apply online, pick it up today",
  },
  es: {
    kicker: "Todo en una sola tienda",
    title: "Compra por categoría",
    shopAll: "Ver todo",
    dealTitle: "Arrendamiento",
    dealBadge: "Sin crédito",
    dealHint: "Solicita en línea y llévatelo hoy",
  },
};

const tileClass =
  "group flex h-full flex-col rounded-2xl bg-white p-1.5 text-ink shadow-[0_1px_2px_rgba(16,24,40,0.05)] ring-1 ring-black/[0.06] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_30px_-14px_rgba(16,24,40,0.25)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary sm:p-2";

/** Name under each tile's picture, with an arrow that slides in on hover. */
function TileName({ children }: { children: string }) {
  return (
    <span className="flex items-center justify-between gap-2 px-1.5 pb-1 pt-2.5 sm:px-2 sm:pt-3">
      <span className="line-clamp-2 font-display text-[0.95rem] font-semibold leading-tight sm:text-base">
        {children}
      </span>
      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-secondary text-ink transition group-hover:bg-primary group-hover:text-primary-foreground">
        <ArrowRight className="h-3.5 w-3.5" />
      </span>
    </span>
  );
}

export function ShopByCategory({ lang }: { lang: Lang }) {
  const t = T[lang];
  const allHref = SHOP_ENABLED ? ALTERNATES.shop[lang] : ALTERNATES.devices[lang];
  return (
    <section
      id="categories"
      aria-labelledby="categories-title"
      className="scroll-mt-24 border-y border-black/[0.04] bg-secondary/50 py-12 md:py-16"
    >
      <div className="mx-auto max-w-7xl px-5">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="eyebrow flex items-center gap-3 text-primary">
              <span className="h-px w-8 bg-primary" /> {t.kicker}
            </p>
            <h2 id="categories-title" className="mt-3 text-3xl font-semibold md:text-4xl">
              {t.title}
            </h2>
          </div>
          <Link
            to={allHref}
            className="inline-flex min-h-11 shrink-0 items-center gap-2 rounded-full bg-ink px-5 text-sm font-bold text-white transition hover:bg-primary hover:text-primary-foreground"
          >
            {t.shopAll} <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <ul className="mt-7 grid grid-cols-2 gap-2.5 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4 xl:grid-cols-6">
          {/* Lease-to-own: the store's headline offer, like a "Deals" tile */}
          <li>
            <Link to={LEASE_PATHS[lang]} className={tileClass}>
              <span className="relative flex aspect-[4/3] flex-col items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-to-br from-primary to-[oklch(0.62_0.19_40)] px-3 text-center text-primary-foreground">
                <BadgeCheck className="h-8 w-8 sm:h-9 sm:w-9" strokeWidth={1.75} />
                <span className="font-display text-sm font-bold uppercase leading-tight tracking-wide sm:text-base">
                  {t.dealBadge}
                </span>
                <span className="hidden text-xs leading-snug opacity-90 sm:block">{t.dealHint}</span>
              </span>
              <TileName>{t.dealTitle}</TileName>
            </Link>
          </li>

          {TILES.map((tile) => (
            <li key={tile.id}>
              <Link to={tile.href[lang]} className={tileClass}>
                <span
                  className={cn(
                    "relative block aspect-[4/3] overflow-hidden rounded-xl",
                    tile.img.fit === "contain" ? "bg-white" : "bg-secondary",
                  )}
                >
                  <img
                    src={tile.img.sm}
                    srcSet={`${tile.img.sm} 900w, ${tile.img.src} ${tile.img.w}w`}
                    sizes="(min-width: 1280px) 210px, (min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
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
                </span>
                <TileName>{tile.title[lang]}</TileName>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
