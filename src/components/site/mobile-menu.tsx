import { Link, useRouterState } from "@tanstack/react-router";
import * as Dialog from "@radix-ui/react-dialog";
import {
  BookOpen,
  ChevronRight,
  Clock,
  Gamepad2,
  Home,
  LayoutGrid,
  MapPin,
  Map as MapIcon,
  Menu,
  Navigation,
  Phone,
  ShoppingBag,
  Wallet,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";

import { CURRENCIES, setCurrency, useCurrency } from "@/components/intl/currency";
import { INTL_LANGS, intlPath } from "@/components/intl/languages";
import { SERVICES } from "@/components/services/data";
import { SERVICE_ICONS } from "@/components/services/icons";
import { servicePath } from "@/components/services/paths";
import { ADDRESS, DIRECTIONS, PHONE, TEL } from "@/components/site/business";
import { SHOP_ENABLED } from "@/components/site/features";
import { LeasingPortalLinks } from "@/components/site/leasing-portals";
import { Logo } from "@/components/site/logo";
import { ALTERNATES, type Lang, type Paths } from "@/components/site/seo";
import { setChatHidden } from "@/components/site/tidio";
import { cn } from "@/lib/utils";

const T = {
  en: {
    open: "Open menu",
    close: "Close menu",
    title: "Menu",
    description: "Every page on the TIC Wireless website",
    call: "Call",
    directions: "Directions",
    hours: "Hours",
    main: "Main pages",
    services: "Services",
    allServices: "All services",
    explore: "Explore",
    apply: "Apply for leasing online",
    language: "Language & currency",
    more: "Summary pages in other languages",
    currency: "Currency",
    home: "Home",
    leasing: "Leasing · no credit needed",
    prepaid: "Prepaid plans & prices",
    shop: "Shop",
    location: "Location & hours",
    areas: "Areas we serve",
    guides: "Guides & how-tos",
    hoursLine: "Mon–Sat 9 AM–8 PM · Sun 9 AM–5 PM",
  },
  es: {
    open: "Abrir menú",
    close: "Cerrar menú",
    title: "Menú",
    description: "Todas las páginas del sitio de TIC Wireless",
    call: "Llamar",
    directions: "Cómo llegar",
    hours: "Horario",
    main: "Páginas principales",
    services: "Servicios",
    allServices: "Todos los servicios",
    explore: "Explora",
    apply: "Solicita arrendamiento en línea",
    language: "Idioma y moneda",
    more: "Páginas de resumen en otros idiomas",
    currency: "Moneda",
    home: "Inicio",
    leasing: "Arrendamiento · sin crédito",
    prepaid: "Planes prepagados y precios",
    shop: "Tienda",
    location: "Ubicación y horario",
    areas: "Zonas que atendemos",
    guides: "Guías",
    hoursLine: "Lun–Sáb 9 AM–8 PM · Dom 9 AM–5 PM",
  },
};

/**
 * Full-screen menu for phones and tablets (the inline nav takes over from lg). It sits above
 * everything, including the chat widget, which is hidden while the menu is open.
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
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const { code } = useCurrency();
  const active = current ?? lang;

  useEffect(() => {
    setChatHidden(open);
  }, [open]);
  // Close when the route changes (e.g. browser back while the menu is open).
  useEffect(() => setOpen(false), [pathname]);

  const isCurrent = (href: string) => pathname === href || pathname === `${href}/`;

  const main: [string, string, typeof Home][] = [
    [t.home, ALTERNATES.home[lang], Home],
    [t.allServices, ALTERNATES.services[lang], LayoutGrid],
    [t.leasing, ALTERNATES.leasing[lang], Gamepad2],
    [t.prepaid, servicePath(lang, "prepaid-plans"), Wallet],
    ...(SHOP_ENABLED
      ? [[t.shop, ALTERNATES.shop[lang], ShoppingBag] as [string, string, typeof Home]]
      : []),
    [t.location, ALTERNATES.location[lang], MapPin],
  ];
  const explore: [string, string, typeof Home][] = [
    [t.areas, ALTERNATES.areas[lang], MapIcon],
    [t.guides, ALTERNATES.guides[lang], BookOpen],
  ];

  const row = (label: string, href: string, Icon: typeof Home) => (
    <li key={href}>
      <Dialog.Close asChild>
        <Link
          to={href}
          aria-current={isCurrent(href) ? "page" : undefined}
          className={cn(
            "flex min-h-14 items-center gap-4 rounded-2xl px-4 text-[17px] font-semibold transition active:scale-[0.99]",
            isCurrent(href) ? "bg-primary text-primary-foreground" : "hover:bg-white/5",
          )}
        >
          <span
            className={cn(
              "flex h-9 w-9 shrink-0 items-center justify-center rounded-xl",
              isCurrent(href) ? "bg-black/15" : "bg-white/10 text-primary",
            )}
          >
            <Icon className="h-[18px] w-[18px]" />
          </span>
          <span className="flex-1">{label}</span>
          <ChevronRight className="h-5 w-5 opacity-50" />
        </Link>
      </Dialog.Close>
    </li>
  );

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger
        aria-label={t.open}
        className="inline-flex h-11 min-w-11 cursor-pointer items-center justify-center gap-2 rounded-full bg-white/10 px-3 text-sm min-[400px]:pr-4 font-semibold text-white transition hover:bg-white/15 lg:hidden"
      >
        <Menu className="h-5 w-5" />
        <span className="hidden min-[400px]:inline">{t.title}</span>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Content
          lang={lang}
          dir="ltr"
          className="fixed inset-0 z-[2147483647] flex h-[100dvh] w-screen flex-col bg-ink text-white outline-none data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:slide-in-from-bottom-4 data-[state=closed]:animate-out data-[state=closed]:fade-out-0"
        >
          <Dialog.Title className="sr-only">{t.title}</Dialog.Title>
          <Dialog.Description className="sr-only">{t.description}</Dialog.Description>

          {/* Top bar: always visible */}
          <div className="flex shrink-0 items-center justify-between gap-3 border-b border-white/10 px-4 pb-3 pt-[max(0.75rem,env(safe-area-inset-top))] sm:px-6">
            <Dialog.Close asChild>
              <Link to={ALTERNATES.home[lang]} aria-label={t.home} className="min-w-0">
                <Logo light compact />
              </Link>
            </Dialog.Close>
            <Dialog.Close
              aria-label={t.close}
              className="inline-flex h-12 shrink-0 cursor-pointer items-center gap-2 rounded-full bg-white px-4 text-sm font-bold text-ink transition hover:bg-white/90"
            >
              <X className="h-5 w-5" />
              <span className="hidden min-[360px]:inline">
                {lang === "en" ? "Close" : "Cerrar"}
              </span>
            </Dialog.Close>
          </div>

          <div className="flex-1 overflow-y-auto overscroll-contain px-3 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-4 sm:px-6">
            <div className="mx-auto max-w-2xl">
              {/* Quick actions */}
              <div className="grid grid-cols-2 gap-2 px-1">
                <a
                  href={TEL}
                  className="flex min-h-14 items-center justify-center gap-2 rounded-2xl bg-primary font-bold text-primary-foreground"
                >
                  <Phone className="h-5 w-5" /> {t.call}
                </a>
                <a
                  href={DIRECTIONS}
                  target="_blank"
                  rel="noreferrer"
                  className="flex min-h-14 items-center justify-center gap-2 rounded-2xl bg-white/10 font-bold ring-1 ring-white/15"
                >
                  <Navigation className="h-5 w-5" /> {t.directions}
                </a>
              </div>
              <p className="mt-3 flex items-center justify-center gap-2 px-2 text-center text-xs text-white/60">
                <Clock className="h-3.5 w-3.5 shrink-0" /> {t.hoursLine}
              </p>

              <Section title={t.main}>
                <ul className="space-y-1">
                  {main.map(([label, href, Icon]) => row(label, href, Icon))}
                </ul>
              </Section>

              <Section title={t.apply}>
                <LeasingPortalLinks lang={lang} />
              </Section>

              <Section title={t.services}>
                <ul className="grid grid-cols-2 gap-2 px-1">
                  {SERVICES.map((s) => {
                    const Icon = SERVICE_ICONS[s.icon];
                    const href = servicePath(lang, s.slug);
                    return (
                      <li key={s.slug}>
                        <Dialog.Close asChild>
                          <Link
                            to={href}
                            aria-current={isCurrent(href) ? "page" : undefined}
                            className={cn(
                              "flex h-full min-h-[4.5rem] flex-col justify-between gap-2 rounded-2xl p-3 text-sm font-semibold leading-snug ring-1 transition",
                              isCurrent(href)
                                ? "bg-primary text-primary-foreground ring-primary"
                                : "bg-white/5 ring-white/10 hover:bg-white/10",
                            )}
                          >
                            <Icon className={cn("h-5 w-5", !isCurrent(href) && "text-primary")} />
                            {s.text[lang].name}
                          </Link>
                        </Dialog.Close>
                      </li>
                    );
                  })}
                </ul>
              </Section>

              <Section title={t.explore}>
                <ul className="space-y-1">
                  {explore.map(([label, href, Icon]) => row(label, href, Icon))}
                </ul>
              </Section>

              <Section title={t.language}>
                <div className="grid grid-cols-2 gap-2 px-1">
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
                      className={cn(
                        "flex min-h-12 items-center justify-center rounded-2xl font-semibold ring-1",
                        active === c
                          ? "bg-white text-ink ring-white"
                          : "bg-white/5 ring-white/15 hover:bg-white/10",
                      )}
                    >
                      {name}
                    </a>
                  ))}
                </div>
                <p className="mt-4 px-2 text-xs text-white/50">{t.more}</p>
                <ul className="mt-2 flex flex-wrap gap-2 px-1">
                  {INTL_LANGS.map((l) => (
                    <li key={l.code}>
                      <a
                        href={intlPath(l.code)}
                        hrefLang={l.tag}
                        lang={l.tag}
                        dir={l.dir}
                        title={l.english}
                        className={cn(
                          "inline-flex min-h-11 items-center rounded-full px-4 text-sm ring-1",
                          active === l.code
                            ? "bg-white text-ink ring-white"
                            : "ring-white/15 hover:bg-white/10",
                        )}
                      >
                        {l.native}
                      </a>
                    </li>
                  ))}
                </ul>
                <label className="mt-5 block px-1">
                  <span className="px-1 text-xs text-white/50">{t.currency}</span>
                  <select
                    value={code}
                    onChange={(e) => setCurrency(e.target.value)}
                    className="mt-2 h-12 w-full cursor-pointer rounded-2xl bg-white/5 px-3 text-sm text-white ring-1 ring-white/15 [&>option]:text-ink"
                  >
                    {CURRENCIES.map(([c, name]) => (
                      <option key={c} value={c}>
                        {c} — {name}
                      </option>
                    ))}
                  </select>
                </label>
              </Section>

              <address className="mt-8 border-t border-white/10 px-2 pt-6 text-center text-sm not-italic text-white/60">
                {ADDRESS}
                <a href={TEL} className="mt-1 block font-semibold text-white">
                  {PHONE}
                </a>
              </address>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-7">
      <h2 className="mb-2 px-3 text-xs font-bold uppercase tracking-[0.18em] text-white/50">
        {title}
      </h2>
      {children}
    </section>
  );
}
