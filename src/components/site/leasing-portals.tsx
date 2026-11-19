import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { linkAcima } from "@/components/site/acima-link";
import {
  ACIMA_URL,
  INITIAL_PAYMENT_NOTE,
  LEASING_INITIAL_PAYMENT_PARTNER,
  LEASING_INITIAL_PAYMENT_USD,
} from "@/components/site/leasing-offer";
import { ALTERNATES } from "@/components/site/seo";
import {
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  ChevronDown,
  Clock,
  IdCard,
  Info,
  Landmark,
  ShieldCheck,
  Store,
} from "lucide-react";

import type { Lang } from "@/components/site/seo";
import { cn } from "@/lib/utils";

// TIC Wireless's online lease-to-own applications (dealer links from each provider). Each opens
// the provider's own secure site in a new tab; approval and terms come from the provider.
// Partners share the same blurb format and none is featured; they're listed in the owner's
// chosen order (Progressive Leasing, Acima, Payvantage, American First Finance) everywhere.
// Each disclaimer is the provider's own published fine print (AFF: its Marketing Review Guide;
// Progressive and Payvantage: their website footers; Acima: its support page and standard
// retailer footnote). Shown in full wherever there is room, names only where there isn't.
export const PORTALS = [
  {
    id: "progressive-leasing",
    scope: "all",
    name: "Progressive Leasing",
    short: "Progressive",
    initials: "PL",
    href: "https://approve.me/s/ticwireless/69977#/marketing",
    blurb: {
      en: "Lease-to-own on phones, tablets, laptops and consoles. All credit welcome.",
      es: "Arrendamiento con opción a compra en celulares, tabletas, laptops y consolas. Todo crédito es bienvenido.",
    },
    disclaimer: {
      en: "Ownership by rental/lease agreement with Progressive Leasing costs more than the retailer's cash price. Select items only. Purchase early or return items and cancel lease at any time. Progressive Leasing obtains information from credit bureaus, but a credit history is not required. Not all applicants are approved. Not available in MN, NJ, WI.",
      es: "Adquirir la propiedad mediante un contrato de renta/arrendamiento con Progressive Leasing cuesta más que el precio de contado del comerciante. Solo artículos seleccionados. Compra anticipadamente o devuelve los artículos y cancela el arrendamiento en cualquier momento. Progressive Leasing obtiene información de las agencias de crédito, pero no se requiere historial de crédito. No todos los solicitantes son aprobados. No disponible en MN, NJ, WI.",
    },
  },
  {
    id: "acima",
    scope: "all",
    name: "Acima",
    short: "Acima",
    initials: "A",
    href: ACIMA_URL,
    blurb: {
      en: "Lease-to-own on phones, tablets, laptops and consoles. All credit welcome.",
      es: "Arrendamiento con opción a compra en celulares, tabletas, laptops y consolas. Todo crédito es bienvenido.",
    },
    disclaimer: {
      en: "Lease-to-own through Acima Leasing. Acquiring ownership by leasing costs more than the retailer's cash price. Not available in MN, NJ, WI or WY. Subject to approval.",
      es: "Arrendamiento con opción a compra a través de Acima Leasing. Adquirir la propiedad mediante arrendamiento cuesta más que el precio de contado del comerciante. No disponible en MN, NJ, WI ni WY. Sujeto a aprobación.",
    },
  },
  {
    id: "payvantage",
    scope: "phones",
    name: "Payvantage",
    short: "Payvantage",
    initials: "P",
    href: "https://payvan.me/3RM885c",
    blurb: {
      en: "Lease-to-own on iPhones, Samsung Galaxy phones and cellular iPads. All credit welcome.",
      es: "Arrendamiento con opción a compra en iPhone, celulares Samsung Galaxy e iPad con datos celulares. Todo crédito es bienvenido.",
    },
    disclaimer: {
      en: "Payvantage products and services are lease-to-own transactions, except in MN, NJ and WI. You don't own the item until the lease ends or you use an early purchase option. The customer may cancel the lease and return the item at any time. Subject to approval.",
      es: "Los productos y servicios de Payvantage son transacciones de arrendamiento con opción a compra, excepto en MN, NJ y WI. El artículo no es tuyo hasta que termine el arrendamiento o uses una opción de compra anticipada. El cliente puede cancelar el arrendamiento y devolver el artículo en cualquier momento. Sujeto a aprobación.",
    },
  },
  {
    id: "american-first-finance",
    scope: "all",
    name: "American First Finance",
    short: "AFF",
    initials: "AFF",
    href: "https://americanfirstfinance.com/app/?dealer=10640&loc=1&src=UA",
    // AFF's pre-approved description and required disclaimer (AFF Marketing Review Guide).
    blurb: {
      en: "Get it now. Pay over time. All Credit Welcome!",
      es: "Llévatelo ahora. Paga con el tiempo. ¡Todo crédito es bienvenido!",
    },
    disclaimer: {
      en: "Applications may be for payment solutions through American First Finance or loans originated by FinWise Bank, a Utah-chartered bank, Member FDIC. Products may vary by location. Terms and conditions subject to change at any time without prior disclosure or notice. See agreement for details.",
      es: "Las solicitudes pueden ser para soluciones de pago a través de American First Finance o préstamos originados por FinWise Bank, un banco con licencia de Utah, miembro de la FDIC. Los productos pueden variar según la ubicación. Los términos y condiciones pueden cambiar en cualquier momento sin aviso previo. Consulta el contrato para más detalles.",
    },
  },
] as const;

/** Every provider's own fine print, one short paragraph each, for areas with room for it. */
export function PartnerFinePrint({
  lang,
  portals = PORTALS,
  className,
}: {
  lang: Lang;
  portals?: readonly (typeof PORTALS)[number][];
  className?: string;
}) {
  return (
    <div className={cn("space-y-1 text-[11px] leading-snug", className)}>
      {portals.map((p) => (
        <p key={p.id}>
          <strong className="font-semibold">{p.name}:</strong> {linkAcima(p.disclaimer[lang])}
        </p>
      ))}
    </div>
  );
}

/**
 * The advertised initial payment is Acima's: this note plus Acima's own disclaimer, shown in full
 * (never collapsed) wherever the amount is advertised.
 */
export function AcimaInitialPaymentFinePrint({
  lang,
  className,
}: {
  lang: Lang;
  className?: string;
}) {
  const acima = PORTALS.find((p) => p.name === LEASING_INITIAL_PAYMENT_PARTNER)!;
  return (
    <p className={cn("text-[11px] leading-snug", className)}>
      <strong className="font-semibold">
        {linkAcima(INITIAL_PAYMENT_NOTE[lang].lead, "lead", { fine: false })}
      </strong>{" "}
      {linkAcima(INITIAL_PAYMENT_NOTE[lang].rest, "note")}{" "}
      <strong className="font-semibold">{acima.name}:</strong>{" "}
      {linkAcima(acima.disclaimer[lang], "fine")}
    </p>
  );
}

/** The other partners' fine print, for spots that already show AcimaInitialPaymentFinePrint. */
const NOT_ACIMA = PORTALS.filter((p) => p.name !== LEASING_INITIAL_PAYMENT_PARTNER);

/** "Progressive Leasing, Acima, Payvantage and American First Finance" — for tight spaces. */
export function partnerNames(lang: Lang) {
  const names = PORTALS.map((p) => p.name);
  return `${names.slice(0, -1).join(", ")} ${lang === "en" ? "and" : "y"} ${names[names.length - 1]}`;
}

const T = {
  en: {
    kicker: "Apply online",
    title: "Apply for leasing before you come in.",
    body: "Apply with any of our lease-to-own partners in a few minutes from your phone. After approval, come to the store, pick your phone, console or laptop and take it home today.",
    bannerTitle: "Lease-to-own · all credit welcome",
    bannerBody: "Apply online in minutes, then pick it up in store.",
    apply: (name: string) => `Apply with ${name}`,
    applyNow: "Apply now",
    steps: [
      [Clock, "Takes a few minutes"],
      [IdCard, "Have your photo ID, SSN or ITIN, and bank account & debit card ready"],
      [BadgeCheck, "Shop in store after approval"],
    ] as const,
    secure: "Each application opens on the provider's own secure site.",
    fine: "Subject to approval. Lease-to-own is not a loan; the total cost to own is more than the retail price. Terms are set by each provider.",
    newTab: "(opens in a new tab)",
    cardTitle: "Lease-to-own · all credit welcome",
    cardApply: "Apply online:",
    optionKicker: "Or lease-to-own",
    optionTitle: "All credit welcome. Apply online, pick it up today.",
    optionBody:
      "Not ready to pay online? Apply with one of our leasing partners in minutes, then take this home from our Hillcroft store.",
  },
  es: {
    kicker: "Solicita en línea",
    title: "Solicita tu arrendamiento antes de venir.",
    body: "Solicita con cualquiera de nuestros socios de arrendamiento en unos minutos desde tu celular. Con tu aprobación, ven a la tienda, elige tu celular, consola o laptop y llévatelo hoy.",
    bannerTitle: "Arrendamiento · todo crédito es bienvenido",
    bannerBody: "Solicita en línea en minutos y recoge en la tienda.",
    apply: (name: string) => `Solicitar con ${name}`,
    applyNow: "Solicitar ahora",
    steps: [
      [Clock, "Toma unos minutos"],
      [IdCard, "Ten a la mano tu ID con foto, SSN o ITIN, y cuenta bancaria y tarjeta de débito"],
      [BadgeCheck, "Compra en la tienda con tu aprobación"],
    ] as const,
    secure: "Cada solicitud se abre en el sitio seguro del proveedor.",
    fine: "Sujeto a aprobación. El arrendamiento no es un préstamo; el costo total es mayor que el precio de venta. Los términos los fija cada proveedor.",
    newTab: "(se abre en una pestaña nueva)",
    cardTitle: "Arrendamiento · todo crédito es bienvenido",
    cardApply: "Solicita en línea:",
    optionKicker: "O arrendamiento con opción a compra",
    optionTitle: "Todo crédito es bienvenido. Solicita en línea y llévatelo hoy.",
    optionBody:
      "¿Prefieres no pagar en línea? Solicita con uno de nuestros socios de arrendamiento en minutos y recógelo en nuestra tienda de Hillcroft.",
  },
};

export function PortalButton({
  portal,
  lang,
  className,
  short,
  compact,
  tiny,
}: {
  portal: (typeof PORTALS)[number];
  lang: Lang;
  className?: string;
  /** "Apply now" instead of "Apply with <name>", where the name is already shown above. */
  short?: boolean;
  /** With short: just "Apply" on phones, where rows are narrow. */
  compact?: boolean;
  /** With short: just "Apply" at every width, for rows two to a line. */
  tiny?: boolean;
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
      {short && tiny ? (
        lang === "en" ? (
          "Apply"
        ) : (
          "Solicitar"
        )
      ) : short && compact ? (
        <>
          <span className="sm:hidden">{lang === "en" ? "Apply" : "Solicitar"}</span>
          <span className="hidden sm:inline">{T[lang].applyNow}</span>
        </>
      ) : short ? (
        T[lang].applyNow
      ) : (
        T[lang].apply(portal.name)
      )}
      <ArrowUpRight className="h-4 w-4 shrink-0" />
    </a>
  );
}

/**
 * In-House Leasing: the store's own option, done in person at Hillcroft (photo ID + bank account
 * to apply). Shown as a special extra next to the four online partners, linking to its page.
 */
export const IN_HOUSE = {
  name: { en: "In-House Leasing", es: "Arrendamiento en tienda" },
  short: { en: "In-House", es: "En tienda" },
  kicker: { en: "Special option", es: "Opción especial" },
  blurb: {
    en: "Apply directly at our store — bring a photo ID and a bank account.",
    es: "Solicita directamente en nuestra tienda: trae una identificación con foto y una cuenta bancaria.",
  },
  cta: { en: "See how it works", es: "Ver cómo funciona" },
  devices: {
    en: "iPhone, Samsung Galaxy & cellular iPad",
    es: "iPhone, Samsung Galaxy e iPad celular",
  },
};

/** Short device-coverage tags shown on each leasing option card. */
export const SCOPE_LABEL = {
  all: { en: "All devices", es: "Todos los equipos" },
  phones: { en: "Phones & cellular iPads only", es: "Solo celulares e iPad celular" },
} as const;

/** Which devices Payvantage and In-House Leasing cover (owner's rule; see lease/catalog.ts). */
export const PHONE_ONLY_NOTE = {
  en: {
    lead: "Payvantage and In-House Leasing",
    rest: "are only for iPhones, Samsung Galaxy phones and Cellular iPads. Every other device can be leased with Progressive Leasing, Acima or American First Finance.",
  },
  es: {
    lead: "Payvantage y el arrendamiento en tienda",
    rest: "son solo para iPhone, celulares Samsung Galaxy e iPad con datos celulares. Los demás equipos se pueden arrendar con Progressive Leasing, Acima o American First Finance.",
  },
};

/** The note above, as a readable callout wherever all five options are listed together. */
export function PhoneOnlyNote({
  lang,
  tone = "light",
  className,
}: {
  lang: Lang;
  tone?: "light" | "dark" | "onPrimary";
  className?: string;
}) {
  const n = PHONE_ONLY_NOTE[lang];
  return (
    <p
      className={cn(
        "flex items-start gap-2.5 rounded-xl px-4 py-3 text-sm leading-relaxed",
        tone === "light" && "border border-primary/25 bg-primary/5 text-foreground",
        tone === "dark" && "bg-white/10 text-white",
        tone === "onPrimary" && "bg-ink/90 text-white",
        className,
      )}
    >
      <Info
        className={cn(
          "mt-0.5 h-4 w-4 shrink-0",
          tone === "light" ? "text-primary" : "text-primary",
        )}
        aria-hidden="true"
      />
      <span>
        <strong className="font-semibold">{n.lead}</strong> {linkAcima(n.rest)}
      </span>
    </p>
  );
}

/** The In-House Leasing link in a compact form, for buttons and menus. */
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

/** Device-coverage tag: neutral for every device, orange for phones and cellular iPads only. */
function ScopeTag({
  scope,
  lang,
  onDark,
}: {
  scope: "all" | "phones";
  lang: Lang;
  onDark?: boolean;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md px-2 py-0.5 text-[11px] font-semibold leading-tight",
        scope === "phones"
          ? "bg-primary/15 text-primary"
          : onDark
            ? "bg-white/10 text-white/75"
            : "bg-secondary text-secondary-foreground",
      )}
    >
      {SCOPE_LABEL[scope][lang]}
    </span>
  );
}

/** A slim "special option" row for In-House Leasing, under the four partner cards. */
export function InHouseCard({ lang, className }: { lang: Lang; className?: string }) {
  return (
    <Link
      to={ALTERNATES.inHouse[lang]}
      className={cn(
        "group flex items-center gap-3 rounded-xl bg-ink p-3 text-white transition hover:shadow-lg hover:shadow-ink/20 sm:gap-4 sm:p-4",
        className,
      )}
    >
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground">
        <Landmark className="h-5 w-5" aria-hidden="true" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="flex flex-wrap items-center gap-x-2 gap-y-1">
          <span className="font-display text-base font-semibold leading-tight sm:text-lg">
            {IN_HOUSE.name[lang]}
          </span>
          <span className="rounded-full bg-primary px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-primary-foreground">
            {IN_HOUSE.kicker[lang]}
          </span>
          <ScopeTag scope="phones" lang={lang} onDark />
        </span>
        <span className="mt-1 hidden text-sm leading-snug text-white/65 sm:block">
          {IN_HOUSE.blurb[lang]}
        </span>
      </span>
      <span className="inline-flex min-h-10 shrink-0 items-center justify-center gap-1.5 rounded-lg bg-primary px-3 text-sm font-bold text-primary-foreground transition group-hover:brightness-110 sm:px-4">
        <span className="sm:hidden">{lang === "en" ? "Details" : "Ver"}</span>
        <span className="hidden sm:inline">{IN_HOUSE.cta[lang]}</span>
        <ArrowRight className="h-4 w-4" aria-hidden="true" />
      </span>
    </Link>
  );
}

/** All lease-to-own providers, visible without expanding a menu. */
export function LeasingPortals({ lang, className }: { lang: Lang; className?: string }) {
  const t = T[lang];
  return (
    <section
      id="apply"
      aria-labelledby="apply-title"
      className={cn("scroll-mt-24 border-y bg-secondary/40 px-5 py-8 md:py-10", className)}
    >
      <div className="mx-auto max-w-7xl">
        <p className="eyebrow text-muted-foreground">{t.kicker}</p>
        <h2 id="apply-title" className="mt-2 text-2xl font-semibold sm:text-3xl">
          {lang === "en" ? "Choose your leasing partner" : "Elige tu socio de arrendamiento"}
        </h2>
        <ul className="mt-5 grid gap-2.5 sm:grid-cols-2 sm:gap-3 xl:grid-cols-4">
          {PORTALS.map((p) => (
            <li
              key={p.id}
              className="flex items-center gap-3 rounded-xl border bg-card p-3 transition hover:border-primary/40 hover:shadow-sm sm:flex-col sm:items-stretch sm:gap-0 sm:p-4"
            >
              <div className="flex min-w-0 flex-1 items-center gap-3 sm:flex-none">
                <span className="flex h-10 min-w-10 shrink-0 items-center justify-center rounded-lg bg-secondary px-2 text-xs font-bold text-secondary-foreground">
                  {p.initials}
                </span>
                <div className="min-w-0">
                  <h3 className="font-display text-base font-semibold leading-tight sm:text-lg">
                    {p.name}
                  </h3>
                  <div className="mt-1">
                    <ScopeTag scope={p.scope} lang={lang} />
                  </div>
                </div>
              </div>
              <p className="mt-3 hidden flex-1 text-sm leading-snug text-muted-foreground sm:block">
                {p.blurb[lang]}
              </p>
              <PortalButton
                portal={p}
                lang={lang}
                short
                compact
                className="min-h-10 shrink-0 rounded-lg bg-primary px-4 text-primary-foreground hover:bg-primary/90 sm:mt-4 sm:w-full"
              />
            </li>
          ))}
        </ul>
        <InHouseCard lang={lang} className="mt-2.5 sm:mt-3" />
        <div className="mt-4 space-y-2 text-xs leading-relaxed text-muted-foreground">
          <p className="flex items-start gap-2">
            <ShieldCheck className="h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
            <span>
              {t.secure} {t.fine}
            </span>
          </p>
          <AcimaInitialPaymentFinePrint lang={lang} className="text-xs leading-relaxed" />
          <details className="group">
            <summary className="inline-flex cursor-pointer list-none items-center gap-1 font-semibold text-foreground/80 hover:text-foreground [&::-webkit-details-marker]:hidden">
              {lang === "en" ? "Partner disclosures" : "Avisos de los socios"}
              <ChevronDown
                className="h-3.5 w-3.5 transition-transform group-open:rotate-180"
                aria-hidden="true"
              />
            </summary>
            <PartnerFinePrint
              lang={lang}
              portals={NOT_ACIMA}
              className="mt-2 rounded-lg bg-card p-3"
            />
          </details>
        </div>
      </div>
    </section>
  );
}

/** Product pages: the lease-to-own strip plus every provider's fine print (there's room here). */
export function LeasingOptions({ lang, className }: { lang: Lang; className?: string }) {
  return (
    <div className={className}>
      <LeasingCardStrip lang={lang} className="p-5" />
      <PartnerFinePrint
        lang={lang}
        portals={NOT_ACIMA}
        className="mt-3 px-1 text-muted-foreground"
      />
    </div>
  );
}

/** One clear application entry point; online installments remain a separate choice. */
export function LeasingCardStrip({ lang, className }: { lang: Lang; className?: string }) {
  const t = T[lang];
  return (
    <div
      className={cn(
        "relative z-10 rounded-lg border border-primary/25 bg-primary/5 p-3",
        className,
      )}
    >
      <p className="flex items-start gap-2 text-xs font-semibold leading-relaxed text-foreground">
        <BadgeCheck className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
        <span>
          {linkAcima(
            lang === "en"
              ? `Lease-to-own, all credit welcome, as low as $${LEASING_INITIAL_PAYMENT_USD} initial payment* with Acima, one of our leasing providers. Terms and conditions apply.`
              : `Arrendamiento con todo tipo de crédito, desde $${LEASING_INITIAL_PAYMENT_USD} de pago inicial* con Acima, uno de nuestros proveedores de arrendamiento. Aplican términos y condiciones.`,
          )}
        </span>
      </p>
      <div className="mt-2 flex flex-wrap items-center justify-between gap-2">
        <p className="text-[11px] text-muted-foreground">
          {linkAcima(
            lang === "en"
              ? `With ${partnerNames(lang)}. Subject to approval.`
              : `Con ${partnerNames(lang)}. Sujeto a aprobación.`,
          )}
        </p>
        <Button asChild variant="link" className="h-auto px-0 py-1 text-xs font-bold">
          <Link to={ALTERNATES.leasing[lang]}>
            {t.applyNow}
            <ArrowRight />
          </Link>
        </Button>
      </div>
      <Link
        to={ALTERNATES.inHouse[lang]}
        className="mt-1 flex items-center gap-1.5 border-t border-primary/15 pt-2 text-[11px] font-semibold text-foreground hover:text-primary"
      >
        <Store className="h-3.5 w-3.5 shrink-0 text-primary" aria-hidden="true" />
        {lang === "en"
          ? `Or In-House Leasing at our store (${IN_HOUSE.devices.en} only)`
          : `O arrendamiento en nuestra tienda (solo ${IN_HOUSE.devices.es})`}
        <ArrowRight className="h-3 w-3" aria-hidden="true" />
      </Link>
      <AcimaInitialPaymentFinePrint
        lang={lang}
        className="mt-2 border-t border-primary/15 pt-2 text-muted-foreground"
      />
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
          <InHouseLink
            lang={lang}
            className="bg-white text-ink hover:bg-white/90 sm:col-span-2 lg:col-span-1"
          />
        </div>
        <PhoneOnlyNote lang={lang} tone="onPrimary" />
      </div>
      <div className="mx-auto max-w-7xl px-5 pb-6 opacity-75">
        <p className="text-[12px] leading-relaxed">{t.fine}</p>
        <AcimaInitialPaymentFinePrint lang={lang} className="mt-2 text-[12px] leading-relaxed" />
        <PartnerFinePrint lang={lang} portals={NOT_ACIMA} className="mt-2" />
      </div>
    </aside>
  );
}
