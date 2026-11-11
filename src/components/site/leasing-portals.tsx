import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { LEASING_INITIAL_PAYMENT_USD } from "@/components/site/leasing-offer";
import { ALTERNATES } from "@/components/site/seo";
import {
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  Clock,
  IdCard,
  Landmark,
  ShieldCheck,
  Store,
} from "lucide-react";

import type { Lang } from "@/components/site/seo";
import { cn } from "@/lib/utils";

// TIC Wireless's online lease-to-own applications (dealer links from each provider). Each opens
// the provider's own secure site in a new tab; approval and terms come from the provider.
// Acima is the store's primary lender, so it is listed first everywhere.
export const PORTALS = [
  {
    id: "acima",
    name: "Acima",
    short: "Acima",
    initials: "A",
    href: "https://apply.acima.com/auth/v2/otp-start?app_id=lo&utm_source=web&utm_medium=merchant&location_guid=loca-620e6e7f-a8d0-4d60-8e39-4519408e72bb&lang=en",
    blurb: {
      en: "Our primary leasing partner — no credit needed.",
      es: "Nuestro socio principal de arrendamiento — sin necesidad de crédito.",
    },
  },
  {
    id: "progressive-leasing",
    name: "Progressive Leasing",
    short: "Progressive",
    initials: "PL",
    href: "https://approve.me/s/ticwireless/69977#/marketing",
    blurb: {
      en: "Lease-to-own application — no credit needed.",
      es: "Solicitud de arrendamiento — sin necesidad de crédito.",
    },
  },
  {
    id: "american-first-finance",
    name: "American First Finance",
    short: "AFF",
    initials: "AFF",
    href: "https://americanfirstfinance.com/app/?dealer=10640&loc=1&src=UA",
    blurb: {
      en: "Fast decisions on lease-to-own, even with imperfect credit.",
      es: "Respuesta rápida en arrendamiento, aun con crédito imperfecto.",
    },
  },
  {
    id: "payvantage",
    name: "Payvantage",
    short: "Payvantage",
    initials: "P",
    href: "https://payvan.me/3RM885c",
    blurb: {
      en: "Quick online application for lease-to-own.",
      es: "Solicitud rápida en línea para arrendamiento.",
    },
  },
] as const;

const T = {
  en: {
    kicker: "Apply online",
    title: "Get approved for leasing before you come in.",
    body: "Apply with any of our lease-to-own partners in a few minutes from your phone. Once you're approved, come to the store, pick your phone, console or laptop and take it home today.",
    bannerTitle: "Lease-to-own · no credit needed",
    bannerBody: "Apply online in minutes, then pick it up in store.",
    apply: (name: string) => `Apply with ${name}`,
    applyNow: "Apply now",
    steps: [
      [Clock, "Takes a few minutes"],
      [IdCard, "Have your ID & bank info ready"],
      [BadgeCheck, "Shop in store once approved"],
    ] as const,
    secure: "Each application opens on the provider's own secure site.",
    fine: "Subject to approval. Lease-to-own is not a loan; the total cost to own is more than the retail price. Terms are set by each provider.",
    newTab: "(opens in a new tab)",
    cardTitle: "Lease-to-own · no credit needed",
    cardApply: "Apply online:",
    optionKicker: "Or lease-to-own",
    optionTitle: "No credit needed. Apply online, pick it up today.",
    optionBody:
      "Not ready to pay online? Get approved with one of our leasing partners in minutes, then take this home from our Hillcroft store.",
  },
  es: {
    kicker: "Solicita en línea",
    title: "Aprueba tu arrendamiento antes de venir.",
    body: "Solicita con cualquiera de nuestros socios de arrendamiento en unos minutos desde tu celular. Ya aprobado, ven a la tienda, elige tu celular, consola o laptop y llévatelo hoy.",
    bannerTitle: "Arrendamiento · sin necesidad de crédito",
    bannerBody: "Solicita en línea en minutos y recoge en la tienda.",
    apply: (name: string) => `Solicitar con ${name}`,
    applyNow: "Solicitar ahora",
    steps: [
      [Clock, "Toma unos minutos"],
      [IdCard, "Ten a la mano tu ID y datos bancarios"],
      [BadgeCheck, "Compra en la tienda ya aprobado"],
    ] as const,
    secure: "Cada solicitud se abre en el sitio seguro del proveedor.",
    fine: "Sujeto a aprobación. El arrendamiento no es un préstamo; el costo total es mayor que el precio de venta. Los términos los fija cada proveedor.",
    newTab: "(se abre en una pestaña nueva)",
    cardTitle: "Arrendamiento · sin crédito",
    cardApply: "Solicita en línea:",
    optionKicker: "O arrendamiento con opción a compra",
    optionTitle: "Sin necesidad de crédito. Solicita en línea y llévatelo hoy.",
    optionBody:
      "¿Prefieres no pagar en línea? Aprueba con uno de nuestros socios de arrendamiento en minutos y recógelo en nuestra tienda de Hillcroft.",
  },
};

export function PortalButton({
  portal,
  lang,
  className,
  short,
}: {
  portal: (typeof PORTALS)[number];
  lang: Lang;
  className?: string;
  /** "Apply now" instead of "Apply with <name>", where the name is already shown above. */
  short?: boolean;
}) {
  return (
    <a
      href={portal.href}
      target="_blank"
      rel="noopener"
      data-portal={portal.id}
      aria-label={`${T[lang].apply(portal.name)} ${T[lang].newTab}`}
      className={cn(
        "inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-5 text-sm font-bold transition",
        className,
      )}
    >
      {short ? T[lang].applyNow : T[lang].apply(portal.name)}
      <ArrowUpRight className="h-4 w-4 shrink-0" />
    </a>
  );
}

/**
 * In-House Financing: the store's own option, done in person at Hillcroft (photo ID + bank account
 * to get approved). Shown as a special extra next to the four online partners, linking to its page.
 */
export const IN_HOUSE = {
  name: { en: "In-House Financing", es: "Financiamiento en tienda" },
  short: { en: "In-House", es: "En tienda" },
  kicker: { en: "Special option", es: "Opción especial" },
  blurb: {
    en: "Get approved directly at our store — bring a photo ID and a bank account.",
    es: "Aprueba directamente en nuestra tienda: trae una identificación con foto y una cuenta bancaria.",
  },
  cta: { en: "See how it works", es: "Ver cómo funciona" },
};

/** The In-House Financing link in a compact form, for buttons and menus. */
export function InHouseLink({ lang, className }: { lang: Lang; className?: string }) {
  return (
    <Link
      to={ALTERNATES.inHouse[lang]}
      className={cn(
        "inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-5 text-sm font-bold transition",
        className,
      )}
    >
      <Store className="h-4 w-4 shrink-0" /> {IN_HOUSE.name[lang]}
      <ArrowRight className="h-4 w-4 shrink-0" />
    </Link>
  );
}

/** A wide "special option" card for In-House Financing, under the four partner cards. */
export function InHouseCard({ lang, className }: { lang: Lang; className?: string }) {
  return (
    <Link
      to={ALTERNATES.inHouse[lang]}
      className={cn(
        "group flex flex-col gap-4 rounded-lg border-2 border-ink bg-ink p-5 text-white transition hover:-translate-y-0.5 hover:shadow-xl hover:shadow-ink/20 sm:flex-row sm:items-center sm:justify-between",
        className,
      )}
    >
      <span className="flex items-start gap-4">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-primary text-primary-foreground">
          <Landmark className="h-5 w-5" />
        </span>
        <span>
          <span className="inline-flex rounded-full bg-primary/20 px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider text-primary">
            {IN_HOUSE.kicker[lang]}
          </span>
          <span className="mt-1.5 block font-display text-lg font-semibold leading-tight">
            {IN_HOUSE.name[lang]}
          </span>
          <span className="mt-1 block text-sm text-white/70">{IN_HOUSE.blurb[lang]}</span>
        </span>
      </span>
      <span className="inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-md bg-primary px-5 text-sm font-bold text-primary-foreground transition group-hover:brightness-110">
        {IN_HOUSE.cta[lang]} <ArrowRight className="h-4 w-4" />
      </span>
    </Link>
  );
}

/** All lease-to-own providers, visible without expanding a menu. */
export function LeasingPortals({ lang, className }: { lang: Lang; className?: string }) {
  const t = T[lang];
  return (
    <section id="apply" aria-labelledby="apply-title" className={cn("scroll-mt-24 border-y bg-secondary/40 px-5 py-8 md:py-10", className)}>
      <div className="mx-auto max-w-7xl">
        <p className="eyebrow text-muted-foreground">{t.kicker}</p>
        <h2 id="apply-title" className="mt-2 text-2xl font-semibold sm:text-3xl">{lang === "en" ? "Choose your leasing partner" : "Elige tu socio de arrendamiento"}</h2>
        <ul className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          {PORTALS.map((p) => (
            <li key={p.id} className="flex flex-col rounded-lg border bg-card p-5">
              <div className="flex items-center gap-3">
                <span className="flex h-10 min-w-10 shrink-0 items-center justify-center rounded-md bg-secondary px-2 text-xs font-bold text-secondary-foreground">{p.initials}</span>
                <h3 className="font-display text-lg font-semibold leading-tight">{p.name}</h3>
              </div>
              <p className="mt-3 flex-1 text-sm text-muted-foreground">{p.blurb[lang]}</p>
              <PortalButton portal={p} lang={lang} short className="mt-4 w-full rounded-md bg-primary text-primary-foreground hover:bg-primary/90" />
            </li>
          ))}
        </ul>
        <InHouseCard lang={lang} className="mt-3" />
        <p className="mt-4 flex items-start gap-2 text-xs leading-relaxed text-muted-foreground"><ShieldCheck className="h-4 w-4 shrink-0 text-primary" /><span>{t.secure} {t.fine}</span></p>
      </div>
    </section>
  );
}

export function LeasingOptions({ lang, className }: { lang: Lang; className?: string }) {
  return <LeasingCardStrip lang={lang} className={cn("p-5", className)} />;
}

/** One clear application entry point; online installments remain a separate choice. */
export function LeasingCardStrip({ lang, className }: { lang: Lang; className?: string }) {
  const t = T[lang];
  return (
    <div className={cn("relative z-10 rounded-lg border border-primary/25 bg-primary/5 p-3", className)}>
      <p className="flex items-start gap-2 text-xs font-semibold leading-relaxed text-foreground">
        <BadgeCheck className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
        <span>{lang === "en" ? `Lease-to-own no credit needed, as low as $${LEASING_INITIAL_PAYMENT_USD} initial payment.` : `Arrendamiento sin necesidad de crédito, desde $${LEASING_INITIAL_PAYMENT_USD} de pago inicial.`}</span>
      </p>
      <div className="mt-2 flex flex-wrap items-center justify-between gap-2">
        <p className="text-[11px] text-muted-foreground">{lang === "en" ? "Subject to approval." : "Sujeto a aprobación."}</p>
        <Button asChild variant="link" className="h-auto px-0 py-1 text-xs font-bold"><Link to={ALTERNATES.leasing[lang]}>{t.applyNow}<ArrowRight /></Link></Button>
      </div>
      <Link
        to={ALTERNATES.inHouse[lang]}
        className="mt-1 flex items-center gap-1.5 border-t border-primary/15 pt-2 text-[11px] font-semibold text-foreground hover:text-primary"
      >
        <Store className="h-3.5 w-3.5 shrink-0 text-primary" aria-hidden="true" />
        {lang === "en" ? "Or In-House Financing at our store" : "O financiamiento directo en nuestra tienda"}
        <ArrowRight className="h-3 w-3" aria-hidden="true" />
      </Link>
    </div>
  );
}

/** Compact orange band for the bottom of every page. */
export function LeasingPortalsBanner({ lang }: { lang: Lang }) {
  const t = T[lang];
  return (
    <aside aria-label={t.kicker} className="bg-primary text-primary-foreground">
      <div className="mx-auto flex max-w-7xl flex-col gap-5 px-5 py-8">
        <div>
          <p className="font-display text-2xl font-semibold leading-tight">{t.bannerTitle}</p>
          <p className="mt-1 text-sm opacity-85">{t.bannerBody}</p>
        </div>
        <div className="grid gap-2 sm:grid-cols-2 lg:flex lg:flex-wrap">
          {PORTALS.map((p) => (
            <PortalButton
              key={p.id}
              portal={p}
              lang={lang}
              className="bg-ink text-white hover:bg-ink/85"
            />
          ))}
          <InHouseLink lang={lang} className="bg-white text-ink hover:bg-white/90 sm:col-span-2 lg:col-span-1" />
        </div>
      </div>
      <p className="mx-auto max-w-7xl px-5 pb-6 text-[12px] leading-relaxed opacity-75">{t.fine}</p>
    </aside>
  );
}
