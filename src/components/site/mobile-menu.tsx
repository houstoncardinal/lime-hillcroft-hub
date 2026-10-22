import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import * as Dialog from "@radix-ui/react-dialog";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Globe,
  LayoutGrid,
  MapPin,
  Menu,
  Navigation,
  Phone,
  ShoppingBag,
  Smartphone,
  Wallet,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";

import { CURRENCIES, setCurrency, useCurrency } from "@/components/intl/currency";
import { setLangPref } from "@/components/intl/lang-pref";
import { INTL_LANGS, intlPath } from "@/components/intl/languages";
import { servicePath } from "@/components/services/paths";
import { DIRECTIONS, TEL } from "@/components/site/business";
import { PORTALS } from "@/components/site/leasing-portals";
import { productNav, serviceNav } from "@/components/site/nav";
import { Logo } from "@/components/site/logo";
import { ALTERNATES, type Lang, type Paths } from "@/components/site/seo";
import { setChatHidden } from "@/components/site/tidio";
import { cn } from "@/lib/utils";

const T = {
  en: {
    open: "Open menu",
    close: "Close",
    closeMenu: "Close menu",
    title: "Menu",
    description: "Every page on the TIC Wireless website",
    language: "Language",
    more: "More",
    moreLangs: "More languages",
    call: "Call",
    directions: "Directions",
    home: "Home",
    services: "All services",
    servicesMenu: "Services",
    back: "Back",
    leasing: "Leasing · no credit needed",
    prepaid: "Prepaid plans & prices",
    location: "Location & hours",
    areas: "Areas",
    guides: "Guides",
    reviews: "Reviews",
    apply: "Apply for leasing online",
    currency: "Currency",
    newTab: "opens in a new tab",
  },
  es: {
    open: "Abrir menú",
    close: "Cerrar",
    closeMenu: "Cerrar menú",
    title: "Menú",
    description: "Todas las páginas del sitio de TIC Wireless",
    language: "Idioma",
    more: "Más",
    moreLangs: "Más idiomas",
    call: "Llamar",
    directions: "Cómo llegar",
    home: "Inicio",
    services: "Todos los servicios",
    servicesMenu: "Servicios",
    back: "Atrás",
    leasing: "Arrendamiento · sin crédito",
    prepaid: "Planes prepagados y precios",
    location: "Ubicación y horario",
    areas: "Zonas",
    guides: "Guías",
    reviews: "Reseñas",
    apply: "Solicita arrendamiento en línea",
    currency: "Moneda",
    newTab: "se abre en una pestaña nueva",
  },
};

// Short labels for the apply buttons, so all three fit on one row.
const PORTAL_LABEL: Record<string, string> = {
  "approve-me": "Approve.me",
  "american-first-finance": "American First",
  payvantage: "Payvantage",
};

type Item = [label: string, href: string, icon: typeof Phone];

/**
 * Full-screen menu for phones and tablets (the inline nav takes over from lg): language at the
 * top, one column of pages, then the leasing applications. Sized to fit one screen — even an
 * iPhone SE — and it sits above everything, including the chat widget (hidden while open).
 */
export function MobileMenu({
  lang,
  paths,
  current,
}: {
  lang: Lang;
  paths: Paths;
  current?: string;
}) {
  const t = T[lang];
  const [open, setOpen] = useState(false);
  const [panel, setPanel] = useState<"main" | "services">("main");
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const navigate = useNavigate();
  const { code } = useCurrency();
  const active = current ?? lang;
  const intlActive = INTL_LANGS.find((l) => l.code === active);

  useEffect(() => {
    setChatHidden(open);
    if (!open) setPanel("main");
  }, [open]);
  // Close when the route changes (e.g. browser back while the menu is open).
  useEffect(() => setOpen(false), [pathname]);

  const isCurrent = (href: string) => pathname === href || pathname === `${href}/`;

  // Main list: the online store first, then what we sell, then services (a second list),
  // prepaid, leasing and the store page.
  const allProducts = productNav(lang).filter((p) => !p.href.includes("#"));
  const shopItem = allProducts.find((p) => p.href === ALTERNATES.shop[lang]);
  const products = allProducts.filter((p) => p !== shopItem);
  const items: Item[] = [
    ...products.map((p): Item => [p.label, p.href, p.icon]),
    [t.prepaid, servicePath(lang, "prepaid-plans"), Smartphone],
    [t.leasing, ALTERNATES.leasing[lang], Wallet],
    [t.location, ALTERNATES.location[lang], MapPin],
  ];
  const services: Item[] = serviceNav(lang)
    .filter((x) => !x.href.endsWith("/prepaid-plans"))
    .map((x): Item => [x.label, x.href, x.icon]);

  const listClass =
    "divide-y divide-white/[0.07] overflow-hidden rounded-2xl bg-white/[0.04] ring-1 ring-white/10";
  const rowClass =
    "flex h-12 items-center gap-3 px-4 text-[15px] font-semibold transition short:h-10 tiny:h-9 micro:h-8 micro:text-sm nano:h-[30px]";
  const row = ([label, href, Icon]: Item) => {
    const here = isCurrent(href);
    return (
      <li key={href}>
        <Dialog.Close asChild>
          <Link
            to={href}
            aria-current={here ? "page" : undefined}
            className={cn(
              rowClass,
              here ? "bg-primary text-primary-foreground" : "hover:bg-white/[0.06]",
            )}
          >
            <Icon
              className={cn("h-[18px] w-[18px] shrink-0", !here && "text-primary")}
              aria-hidden="true"
            />
            <span className="min-w-0 flex-1 truncate">{label}</span>
            <ChevronRight className="h-4 w-4 shrink-0 opacity-40" aria-hidden="true" />
          </Link>
        </Dialog.Close>
      </li>
    );
  };

  const segment = (on: boolean) =>
    cn(
      "flex h-12 items-center justify-center gap-1.5 rounded-xl text-[15px] font-bold transition short:h-11 tiny:h-10 micro:h-9",
      on ? "bg-white text-ink shadow" : "text-white/80 hover:bg-white/10",
    );

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger
        aria-label={t.open}
        className="inline-flex h-11 min-w-11 cursor-pointer items-center justify-center gap-2 rounded-full bg-white/10 px-3 text-sm font-semibold text-white transition hover:bg-white/15 sm:pr-4 lg:hidden"
      >
        <Menu className="h-5 w-5" />
        <span className="hidden sm:inline">{t.title}</span>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Content
          lang={lang}
          dir="ltr"
          className="fixed inset-0 z-[2147483647] flex h-[100dvh] w-screen flex-col overflow-y-auto overscroll-contain bg-ink text-white outline-none data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=closed]:animate-out data-[state=closed]:fade-out-0"
        >
          <Dialog.Title className="sr-only">{t.title}</Dialog.Title>
          <Dialog.Description className="sr-only">{t.description}</Dialog.Description>

          <div className="mx-auto flex w-full max-w-lg flex-1 flex-col px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-[max(0.75rem,env(safe-area-inset-top))] short:pb-2 short:pt-2">
            {/* Top bar */}
            <div className="flex items-center justify-between gap-2">
              <Dialog.Close asChild>
                <Link to={ALTERNATES.home[lang]} aria-label={t.home} className="min-w-0">
                  <Logo light compact />
                </Link>
              </Dialog.Close>
              <div className="flex shrink-0 items-center gap-2">
                {/* On short screens Call moves up here, so the page list fits. */}
                <a
                  href={TEL}
                  aria-label={t.call}
                  className="hidden h-11 w-11 items-center justify-center rounded-full bg-primary text-primary-foreground short:min-[360px]:inline-flex"
                >
                  <Phone className="h-5 w-5" />
                </a>
                <Dialog.Close
                  aria-label={t.closeMenu}
                  className="inline-flex h-11 min-w-11 cursor-pointer items-center justify-center gap-1.5 rounded-full bg-white px-3 text-sm font-bold text-ink transition hover:bg-white/90 min-[380px]:px-4"
                >
                  <X className="h-5 w-5" />
                  <span className="hidden min-[380px]:inline">{t.close}</span>
                </Dialog.Close>
              </div>
            </div>

            {/* Language: always first, one tap to switch */}
            <div
              role="group"
              aria-label={t.language}
              className="mt-3 grid grid-cols-3 gap-1 rounded-2xl bg-white/[0.06] p-1 ring-1 ring-white/10 short:mt-2"
            >
              {(
                [
                  ["en", "English", paths.en],
                  ["es", "Español", paths.es],
                ] as const
              ).map(([c, name, href]) => (
                <a
                  key={c}
                  href={href}
                  hrefLang={c}
                  lang={c}
                  aria-current={active === c ? "true" : undefined}
                  onClick={() => setLangPref(c)}
                  className={segment(active === c)}
                >
                  {name}
                </a>
              ))}
              {/* Other languages: a native picker, easy on every phone */}
              <label className={cn(segment(Boolean(intlActive)), "relative cursor-pointer")}>
                <Globe className="h-4 w-4 shrink-0" aria-hidden="true" />
                <span className="truncate">{intlActive?.native ?? t.more}</span>
                <ChevronDown className="h-4 w-4 shrink-0 opacity-60" aria-hidden="true" />
                <select
                  aria-label={t.moreLangs}
                  value={intlActive?.code ?? ""}
                  onChange={(e) => {
                    const c = e.target.value;
                    if (!c) return;
                    setLangPref(c);
                    void navigate({ to: intlPath(c) });
                  }}
                  className="absolute inset-0 cursor-pointer opacity-0"
                >
                  <option value="">{t.moreLangs}…</option>
                  {INTL_LANGS.map((l) => (
                    <option key={l.code} value={l.code}>
                      {l.native} — {l.english}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            {/* Pages: one column. "Services" opens a second list in the same space. */}
            <nav aria-label={t.title} className="mt-3 short:mt-2">
              {panel === "main" ? (
                <ul className={listClass}>
                  {shopItem && (
                    <li>
                      <Dialog.Close asChild>
                        <Link
                          to={shopItem.href}
                          aria-current={isCurrent(shopItem.href) ? "page" : undefined}
                          className="flex h-12 items-center gap-3 rounded-t-2xl bg-primary px-4 text-[15px] font-bold text-primary-foreground transition short:h-10 tiny:h-9 micro:h-8 micro:text-sm nano:h-[30px] hover:brightness-105"
                        >
                          <ShoppingBag className="h-[18px] w-[18px] shrink-0" aria-hidden="true" />
                          <span className="min-w-0 flex-1 truncate">{shopItem.label}</span>
                          <ChevronRight className="h-4 w-4 shrink-0 opacity-80" aria-hidden="true" />
                        </Link>
                      </Dialog.Close>
                    </li>
                  )}
                  {items.slice(0, products.length).map((it) => row(it))}
                  <li>
                    <button
                      type="button"
                      onClick={() => setPanel("services")}
                      aria-expanded={false}
                      className={cn(
                        rowClass,
                        "w-full cursor-pointer text-left hover:bg-white/[0.06]",
                      )}
                    >
                      <LayoutGrid
                        className="h-[18px] w-[18px] shrink-0 text-primary"
                        aria-hidden="true"
                      />
                      <span className="min-w-0 flex-1 truncate">{t.servicesMenu}</span>
                      <ChevronRight className="h-4 w-4 shrink-0 opacity-70" aria-hidden="true" />
                    </button>
                  </li>
                  {items.slice(products.length).map((it) => row(it))}
                </ul>
              ) : (
                <ul className={listClass}>
                  <li className="flex">
                    <button
                      type="button"
                      onClick={() => setPanel("main")}
                      className={cn(
                        rowClass,
                        "flex-1 cursor-pointer text-left hover:bg-white/[0.06]",
                      )}
                    >
                      <ChevronLeft
                        className="h-[18px] w-[18px] shrink-0 text-primary"
                        aria-hidden="true"
                      />
                      <span className="truncate">{t.back}</span>
                    </button>
                    <Dialog.Close asChild>
                      <Link
                        to={ALTERNATES.services[lang]}
                        className={cn(rowClass, "shrink-0 text-primary hover:bg-white/[0.06]")}
                      >
                        {t.services}
                      </Link>
                    </Dialog.Close>
                  </li>
                  {services.map((it) => row(it))}
                </ul>
              )}
            </nav>

            <div className="mt-auto pt-3">
              {/* Call / directions (moves to the top bar on short screens) */}
              <div className="mb-3 grid grid-cols-2 gap-2 short:hidden">
                <a
                  href={TEL}
                  className="flex h-12 items-center justify-center gap-2 rounded-2xl bg-primary font-bold text-primary-foreground"
                >
                  <Phone className="h-[18px] w-[18px]" /> {t.call}
                </a>
                <a
                  href={DIRECTIONS}
                  target="_blank"
                  rel="noreferrer"
                  className="flex h-12 items-center justify-center gap-2 rounded-2xl bg-white/10 font-bold ring-1 ring-white/15"
                >
                  <Navigation className="h-[18px] w-[18px]" /> {t.directions}
                </a>
              </div>

              <p className="px-1 text-[11px] font-bold uppercase tracking-[0.16em] text-white/50 tiny:hidden">
                {t.apply}
              </p>
              <div className="mt-1.5 grid grid-cols-3 gap-1.5 tiny:mt-0">
                {PORTALS.map((p) => (
                  <a
                    key={p.id}
                    href={p.href}
                    target="_blank"
                    rel="noopener"
                    aria-label={`${p.name} (${t.newTab})`}
                    className="flex h-11 items-center justify-center rounded-xl px-1 text-center text-[13px] font-bold leading-tight ring-1 ring-primary/60 transition hover:bg-primary hover:text-primary-foreground short:h-10 tiny:h-9"
                  >
                    {PORTAL_LABEL[p.id] ?? p.name}
                  </a>
                ))}
              </div>

              <div className="mt-2 flex items-center justify-between gap-2 text-sm micro:hidden">
                <div className="flex min-w-0 items-center">
                  {(
                    [
                      [t.areas, ALTERNATES.areas[lang]],
                      [t.guides, ALTERNATES.guides[lang]],
                      [t.reviews, ALTERNATES.reviews[lang]],
                    ] as const
                  ).map(([label, href]) => (
                    <Dialog.Close asChild key={href}>
                      <Link
                        to={href}
                        className="inline-flex h-10 items-center truncate px-1.5 font-semibold text-white/75 hover:text-white"
                      >
                        {label}
                      </Link>
                    </Dialog.Close>
                  ))}
                </div>
                <select
                  aria-label={t.currency}
                  value={code}
                  onChange={(e) => setCurrency(e.target.value)}
                  className="h-10 w-[4.75rem] shrink-0 cursor-pointer rounded-xl bg-white/5 px-2 text-sm text-white ring-1 ring-white/15 [&>option]:text-ink"
                >
                  {CURRENCIES.map(([c, name]) => (
                    <option key={c} value={c} title={name}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
