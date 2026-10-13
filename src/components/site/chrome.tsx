import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Globe, MapPin, Phone, Star } from "lucide-react";

import { ADDRESS, DIRECTIONS, PHONE, TEL, hoursOn } from "@/components/site/business";
import { setLangPref } from "@/components/intl/lang-pref";
import { LanguageAuto } from "@/components/intl/language-auto";
import { LanguageMenu } from "@/components/intl/language-menu";
import { SHOP_ENABLED } from "@/components/site/features";
import { Logo } from "@/components/site/logo";
import { LeasingPortalsBanner } from "@/components/site/leasing-portals";
import { DesktopNav } from "@/components/site/desktop-nav";
import { MobileMenu } from "@/components/site/mobile-menu";
import { productNav, serviceNav } from "@/components/site/nav";
import { AREAS, shortName } from "@/components/areas/data";
import { areaPath } from "@/components/areas/paths";
import { GUIDES } from "@/components/guides/data";
import { guidePath } from "@/components/guides/paths";
import { Toaster } from "@/components/ui/sonner";
import { CartButton, CartDrawer } from "@/shop/components";
import { ALTERNATES, type Lang, type Paths } from "@/components/site/seo";

const T = {
  en: {
    call: "Call",
    areas: "Areas we serve",
    guides: "Guides",
    directions: "Directions",
    home: "TIC Wireless Electronic & Repair Center home",
    tagline: "Buy · Sell · Repair · Unlock. Your one-stop phone shop in Houston. Se habla español.",
    trademarks:
      "PlayStation, Xbox, Nintendo Switch, iPhone, MacBook, Galaxy, JBL, Xfinity and carrier names are trademarks of their respective owners.",
    open: (t: string) => `Open now · until ${t}`,
    opensToday: (t: string) => `Closed · opens ${t} today`,
    opensTomorrow: (t: string) => `Closed · opens ${t} tomorrow`,
    fallback: "Mon–Sat 9–8 · Sun 9–5",
  },
  es: {
    call: "Llamar",
    areas: "Zonas que atendemos",
    guides: "Guías",
    directions: "Cómo llegar",
    home: "Inicio de TIC Wireless Electronic & Repair Center",
    tagline:
      "Compra · Venta · Reparación · Liberación. Tu tienda de celulares en Houston. We speak English.",
    trademarks:
      "PlayStation, Xbox, Nintendo Switch, iPhone, MacBook, Galaxy, JBL, Xfinity y los nombres de las compañías son marcas de sus respectivos dueños.",
    open: (t: string) => `Abierto ahora · hasta las ${t}`,
    opensToday: (t: string) => `Cerrado · abre hoy a las ${t}`,
    opensTomorrow: (t: string) => `Cerrado · abre mañana a las ${t}`,
    fallback: "Lun–Sáb 9–8 · Dom 9–5",
  },
};

function useOpenStatus(lang: Lang) {
  const [status, setStatus] = useState<{ open: boolean; label: string } | null>(null);
  useEffect(() => {
    const t = T[lang];
    const compute = () => {
      const parts = new Intl.DateTimeFormat("en-US", {
        timeZone: "America/Chicago",
        weekday: "short",
        hour: "numeric",
        minute: "numeric",
        hourCycle: "h23",
      }).formatToParts(new Date());
      const get = (p: string) => parts.find((x) => x.type === p)?.value ?? "";
      const day = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(get("weekday"));
      const now = Number(get("hour")) + Number(get("minute")) / 60;
      const [open, close] = hoursOn(day);
      const fmt = (h: number) => `${h > 12 ? h - 12 : h} ${h >= 12 ? "PM" : "AM"}`;
      if (now >= open && now < close) setStatus({ open: true, label: t.open(fmt(close)) });
      else if (now < open) setStatus({ open: false, label: t.opensToday(fmt(open)) });
      else setStatus({ open: false, label: t.opensTomorrow(fmt(hoursOn((day + 1) % 7)[0])) });
    };
    compute();
    const id = setInterval(compute, 60_000);
    return () => clearInterval(id);
  }, [lang]);
  return status;
}

export function OpenBadge({ lang, className = "" }: { lang: Lang; className?: string }) {
  const status = useOpenStatus(lang);
  return (
    <span className={`inline-flex items-center gap-2 text-sm ${className}`}>
      <span className="relative flex h-2.5 w-2.5">
        {status?.open && (
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
        )}
        <span
          className={`relative inline-flex h-2.5 w-2.5 rounded-full ${status?.open ? "bg-emerald-400" : "bg-white/40"}`}
        />
      </span>
      {status?.label ?? T[lang].fallback}
    </span>
  );
}

export function Stars({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <span className="flex" aria-hidden="true">
      {Array.from({ length: 5 }, (_, i) => (
        <Star key={i} className={`${className} fill-current`} />
      ))}
    </span>
  );
}

function HeaderLangToggle({
  lang,
  paths,
  current,
}: {
  lang: Lang;
  paths: Paths;
  current?: string;
}) {
  // On an English (or summary-language) page offer Spanish; on a Spanish page offer English.
  const to: Lang = lang === "es" || current ? "en" : "es";
  return (
    <a
      href={paths[to]}
      hrefLang={to}
      lang={to}
      onClick={() => setLangPref(to)}
      aria-label={to === "es" ? "Ver en español" : "View in English"}
      className="hidden h-11 items-center gap-1 rounded-full px-2.5 text-sm font-bold text-white ring-1 ring-white/20 transition hover:bg-white/10 min-[375px]:inline-flex sm:hidden"
    >
      <Globe className="h-4 w-4 text-primary" aria-hidden="true" />
      {to.toUpperCase()}
    </a>
  );
}

export function SiteHeader({
  lang,
  paths,
  current,
}: {
  lang: Lang;
  paths: Paths;
  /** Language code shown in the menu when it isn't en/es (language summary pages). */
  current?: string;
}) {
  return (
    <header lang={lang} dir="ltr" className="fixed inset-x-0 top-0 z-50">
      <div className="mx-3 mt-3 flex max-w-7xl items-center justify-between gap-2 rounded-full border border-white/10 bg-ink/90 py-2 pl-4 pr-2 shadow-2xl shadow-black/20 backdrop-blur-xl sm:mx-4 sm:py-2.5 sm:pl-5 sm:pr-3 xl:mx-auto">
        <Link
          to={ALTERNATES.home[lang]}
          aria-label={T[lang].home}
          className="min-w-0 overflow-hidden"
        >
          <Logo light compact />
        </Link>
        <DesktopNav lang={lang} />
        <div className="flex shrink-0 items-center gap-1.5">
          {/* Tablets & desktop: full language & currency menu. */}
          <div className="hidden sm:block">
            <LanguageMenu lang={lang} paths={paths} {...(current ? { current } : {})} />
          </div>
          {/* Phones: one tap to switch English ⇄ Spanish (more languages in the menu). */}
          <HeaderLangToggle lang={lang} paths={paths} {...(current ? { current } : {})} />
          {SHOP_ENABLED && <CartButton lang={lang} />}
          <a
            href={TEL}
            aria-label={PHONE}
            className="hidden h-11 items-center gap-2 rounded-full bg-primary px-4 text-sm font-semibold text-primary-foreground transition hover:brightness-110 md:inline-flex lg:w-11 lg:justify-center lg:px-0 xl:w-auto xl:px-4"
          >
            <Phone className="h-4 w-4 shrink-0" />
            {/* Number shows on tablets and wide screens; laptops get the icon so the menu fits. */}
            <span className="lg:hidden xl:inline">{PHONE}</span>
          </a>
          <MobileMenu lang={lang} paths={paths} {...(current ? { current } : {})} />
        </div>
      </div>
      <LanguageAuto lang={lang} paths={paths} {...(current ? { current } : {})} />
      {SHOP_ENABLED && <CartDrawer lang={lang} />}
      <Toaster position="bottom-center" />
    </header>
  );
}

const FOOTER = {
  en: {
    products: "Products",
    services: "Services",
    allServices: "All services",
    store: "Store",
    home: "Home",
    leasing: "Leasing",
    prepaid: "Prepaid plans",
    consoles: "Game consoles",
    accessories: "Accessories",
    shop: "Shop",
    location: "Location & hours",
    reviews: "Reviews",
    areas: "Areas we serve",
    guides: "Guides",
    allAreas: "All areas",
    allGuides: "All guides",
  },
  es: {
    products: "Productos",
    services: "Servicios",
    allServices: "Todos los servicios",
    store: "Tienda",
    home: "Inicio",
    leasing: "Arrendamiento",
    prepaid: "Planes prepagados",
    consoles: "Consolas",
    accessories: "Accesorios",
    shop: "Tienda en línea",
    location: "Ubicación y horario",
    reviews: "Reseñas",
    areas: "Zonas que atendemos",
    guides: "Guías",
    allAreas: "Todas las zonas",
    allGuides: "Todas las guías",
  },
};

function FooterColumn({ title, links }: { title: string; links: [string, string][] }) {
  return (
    <div>
      <h2 className="text-xs font-bold uppercase tracking-[0.18em] text-white/50">{title}</h2>
      <ul className="mt-4 space-y-2.5 text-sm text-white/75 pointer-coarse:space-y-0">
        {links.map(([label, href]) => (
          <li key={href}>
            <Link to={href} className="transition hover:text-white">
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function SiteFooter({
  lang,
  portals = true,
}: {
  lang: Lang;
  /** The leasing-application band above the footer; off on pages with the full section. */
  portals?: boolean;
}) {
  const t = T[lang];
  const f = FOOTER[lang];
  return (
    <>
      {portals && <LeasingPortalsBanner lang={lang} />}
      <footer lang={lang} dir="ltr" className="border-t border-white/10 bg-ink text-white">
        <div className="mx-auto max-w-7xl px-5 pb-28 pt-14 md:pb-14 md:pt-20">
          <div className="grid gap-12 lg:grid-cols-[1.1fr_3fr]">
            <div>
              <Logo light />
              <p className="mt-4 max-w-xs text-sm text-white/60">{t.tagline}</p>
              <address className="mt-6 text-sm not-italic text-white/75">
                <p>{ADDRESS}</p>
                <a
                  href={TEL}
                  className="mt-2 block font-display text-xl font-semibold text-primary"
                >
                  {PHONE}
                </a>
              </address>
              <OpenBadge lang={lang} className="mt-3 text-white/70" />
              <div className="mt-6 flex flex-wrap gap-2">
                <a
                  href={DIRECTIONS}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex min-h-11 items-center gap-2 rounded-full border border-white/20 px-4 text-sm font-semibold transition hover:border-white/60"
                >
                  <MapPin className="h-4 w-4" /> {t.directions}
                </a>
              </div>
            </div>
            <nav aria-label="Footer" className="grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-4">
              <FooterColumn
                title={f.products}
                links={[
                  ...productNav(lang).map((i): [string, string] => [i.label, i.href]),
                  [f.leasing, ALTERNATES.leasing[lang]],
                ]}
              />
              <FooterColumn
                title={f.services}
                links={[
                  ...serviceNav(lang).map((i): [string, string] => [i.label, i.href]),
                  [f.allServices, ALTERNATES.services[lang]],
                ]}
              />
              <FooterColumn
                title={f.store}
                links={[
                  [f.home, ALTERNATES.home[lang]],
                  [f.location, ALTERNATES.location[lang]],
                  [f.reviews, ALTERNATES.reviews[lang]],
                  [f.areas, ALTERNATES.areas[lang]],
                  [f.guides, ALTERNATES.guides[lang]],
                  ...GUIDES.map((g): [string, string] => [
                    g.text[lang].metaTitle,
                    guidePath(lang, g.slug),
                  ]),
                ]}
              />
              <FooterColumn
                title={f.areas}
                links={[
                  ...AREAS.map((a): [string, string] => [shortName(a), areaPath(lang, a.slug)]),
                  [f.allAreas, ALTERNATES.areas[lang]],
                ]}
              />
            </nav>
          </div>
          <div className="mt-14 flex flex-wrap justify-between gap-4 border-t border-white/10 pt-6 text-xs text-white/60">
            <p>
              © {new Date().getFullYear()} TIC Wireless Electronic & Repair Center · Houston, TX
            </p>
            <p>{t.trademarks}</p>
          </div>
        </div>
      </footer>
    </>
  );
}

export function MobileCallBar({ lang }: { lang: Lang }) {
  return (
    <div className="fixed inset-x-3 bottom-3 z-50 flex gap-2 transition-[right] md:hidden in-[.has-chat]:right-[92px]">
      <a
        href={TEL}
        className="flex flex-1 items-center justify-center gap-2 rounded-full bg-primary py-3.5 font-semibold text-primary-foreground shadow-2xl"
      >
        <Phone className="h-4 w-4" /> {T[lang].call}
      </a>
      <a
        href={DIRECTIONS}
        target="_blank"
        rel="noreferrer"
        className="flex flex-1 items-center justify-center gap-2 rounded-full bg-ink py-3.5 font-semibold text-white shadow-2xl ring-1 ring-white/15"
      >
        <MapPin className="h-4 w-4" /> {T[lang].directions}
      </a>
    </div>
  );
}
