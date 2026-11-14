import { Link } from "@tanstack/react-router";
import { ArrowRight, BadgeCheck } from "lucide-react";

import { LEASE_PATHS, type LeaseCategory } from "@/components/lease/catalog";
import { servicePath } from "@/components/services/paths";
import { SHOP_ENABLED } from "@/components/site/features";
import { ALTERNATES, type Lang } from "@/components/site/seo";
import { cn } from "@/lib/utils";

// Home page "Shop by category": one tile per kind of product or service the store offers, each a
// picture on white and a name: manufacturer images for products; for repair, Samsung's Galaxy
// render with a cracked screen drawn on and a repair badge; for prepaid, the carriers' logos. Product tiles open their lease-to-own catalog section or category page;
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

// Product tiles: manufacturer product images on white (public/photos/categories, built from the
// official images in public/photos/devices/official and Apple's store images), 4:3 with room.
const cat = (id: string): Img => ({
  src: `/photos/categories/${id}.webp`,
  sm: `/photos/categories/${id}-600.webp`,
  w: 1200,
  h: 900,
  fit: "contain",
});

// 12 tiles with the lease-to-own tile: full rows at 2, 3, 4 and 6 columns.
const TILES: Tile[] = [
  { id: "iphone", title: both("iPhone"), href: lease("iphone"), img: cat("iphone") },
  { id: "samsung", title: both("Samsung Galaxy"), href: lease("samsung"), img: cat("samsung") },
  {
    id: "ipads",
    title: both("iPad & tablets", "iPad y tabletas"),
    href: lease("ipads"),
    img: cat("ipads"),
  },
  {
    id: "laptops",
    title: both("Laptops", "Laptops"),
    href: ALTERNATES.laptops,
    img: cat("laptops"),
  },
  {
    id: "consoles",
    title: both("Game consoles", "Consolas"),
    href: ALTERNATES.consoles,
    img: cat("consoles"),
  },
  {
    id: "watches",
    title: both("Smartwatches", "Relojes"),
    href: lease("watches"),
    img: cat("watches"),
  },
  { id: "tv", title: both("TVs", "Televisores"), href: lease("tv"), img: cat("tv") },
  {
    id: "audio",
    title: both("Audio", "Audio"),
    href: { en: `${ALTERNATES.accessories.en}#audio`, es: `${ALTERNATES.accessories.es}#audio` },
    img: cat("audio"),
  },
  {
    id: "accessories",
    title: both("Accessories", "Accesorios"),
    href: ALTERNATES.accessories,
    img: cat("accessories"),
  },
  {
    id: "repair",
    title: both("Phone repair", "Reparación"),
    href: service("phone-repair"),
    img: cat("repair"),
  },
  {
    id: "prepaid",
    title: both("Prepaid plans", "Planes prepagados"),
    href: service("prepaid-plans"),
    img: cat("prepaid"),
  },
];

const T = {
  en: {
    kicker: "Everything in one store",
    title: "Shop by category",
    shopAll: "Shop all",
    dealTitle: "Lease-to-own",
    dealBadge: "all credit welcome",
    dealHint: "Apply online, pick it up today",
  },
  es: {
    kicker: "Todo en una sola tienda",
    title: "Compra por categoría",
    shopAll: "Ver todo",
    dealTitle: "Arrendamiento",
    dealBadge: "Todo crédito es bienvenido",
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
  const allHref = ALTERNATES.leaseCatalog[lang];
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
                <span className="hidden text-xs leading-snug opacity-90 sm:block">
                  {t.dealHint}
                </span>
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
