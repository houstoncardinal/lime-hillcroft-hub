import { ArrowUpRight, BadgeCheck, Clock, IdCard, ShieldCheck } from "lucide-react";

import type { Lang } from "@/components/site/seo";
import { cn } from "@/lib/utils";

// TIC Wireless's online lease-to-own applications (dealer links from each provider). Each opens
// the provider's own secure site in a new tab; approval and terms come from the provider.
export const PORTALS = [
  {
    id: "approve-me",
    name: "Approve.me",
    initials: "A",
    href: "https://approve.me/s/ticwireless/69977#/marketing",
    blurb: {
      en: "Lease-to-own application — no credit needed.",
      es: "Solicitud de arrendamiento — sin necesidad de crédito.",
    },
  },
  {
    id: "american-first-finance",
    name: "American First Finance",
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
    fine: "Subject to approval. Lease-to-own is not a loan; the total cost to own is more than the cash price. Terms are set by each provider.",
    newTab: "(opens in a new tab)",
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
    fine: "Sujeto a aprobación. El arrendamiento no es un préstamo; el costo total es mayor que el precio de contado. Los términos los fija cada proveedor.",
    newTab: "(se abre en una pestaña nueva)",
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

/** Full section: heading, three provider cards and the terms. */
export function LeasingPortals({ lang, className }: { lang: Lang; className?: string }) {
  const t = T[lang];
  return (
    <section
      id="apply"
      aria-labelledby="apply-title"
      className={cn("scroll-mt-24 px-3 py-14 sm:px-5 md:py-20", className)}
    >
      <div className="relative isolate mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-ink px-5 py-10 text-white sm:px-10 md:py-14">
        <div className="absolute -right-24 -top-24 -z-10 h-80 w-80 rounded-full bg-primary/30 blur-[120px]" />
        <div className="grain absolute inset-0 -z-10 opacity-50" />
        <p className="eyebrow flex items-center gap-3 text-primary">
          <span className="h-px w-8 bg-primary" /> {t.kicker}
        </p>
        <h2
          id="apply-title"
          className="mt-4 max-w-2xl text-3xl font-semibold leading-[1.05] sm:text-4xl md:text-5xl"
        >
          {t.title}
        </h2>
        <p className="mt-4 max-w-2xl text-white/75">{t.body}</p>
        <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-white/80">
          {t.steps.map(([Icon, label]) => (
            <li key={label} className="flex items-center gap-2">
              <Icon className="h-4 w-4 text-primary" /> {label}
            </li>
          ))}
        </ul>

        <ul className="mt-8 grid gap-3 md:grid-cols-3">
          {PORTALS.map((p) => (
            <li
              key={p.id}
              className="flex flex-col rounded-3xl bg-white/[0.06] p-5 ring-1 ring-white/10 sm:p-6"
            >
              <span className="flex h-10 min-w-10 items-center justify-center self-start rounded-2xl bg-primary px-2.5 font-display text-sm font-bold text-primary-foreground">
                {p.initials}
              </span>
              <h3 className="mt-4 font-display text-xl font-semibold">{p.name}</h3>
              <p className="mt-1 flex-1 text-sm leading-relaxed text-white/70">{p.blurb[lang]}</p>
              <PortalButton
                portal={p}
                lang={lang}
                short
                className="mt-5 w-full bg-primary text-primary-foreground hover:brightness-110"
              />
            </li>
          ))}
        </ul>

        <p className="mt-6 flex items-start gap-2 text-xs leading-relaxed text-white/55">
          <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
          <span>
            {t.secure} {t.fine}
          </span>
        </p>
      </div>
    </section>
  );
}

/** Compact orange band for the bottom of every page. */
export function LeasingPortalsBanner({ lang }: { lang: Lang }) {
  const t = T[lang];
  return (
    <aside aria-label={t.kicker} className="bg-primary text-primary-foreground">
      <div className="mx-auto flex max-w-7xl flex-col gap-5 px-5 py-8 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="font-display text-2xl font-semibold leading-tight">{t.bannerTitle}</p>
          <p className="mt-1 text-sm opacity-85">{t.bannerBody}</p>
        </div>
        <div className="grid gap-2 sm:grid-cols-3 lg:flex lg:shrink-0">
          {PORTALS.map((p) => (
            <PortalButton
              key={p.id}
              portal={p}
              lang={lang}
              className="bg-ink text-white hover:bg-ink/85"
            />
          ))}
        </div>
      </div>
      <p className="mx-auto max-w-7xl px-5 pb-6 text-[12px] leading-relaxed opacity-75">{t.fine}</p>
    </aside>
  );
}
