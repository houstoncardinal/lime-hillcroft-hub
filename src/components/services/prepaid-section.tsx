import { CircleCheck, Info, Wifi } from "lucide-react";

import { Money, MoneyText } from "@/components/intl/money";
import {
  CARRIERS,
  OTHER_CARRIERS,
  PLANS_CHECKED,
  type Carrier,
} from "@/components/services/prepaid-plans";
import { PHONE, TEL } from "@/components/site/business";
import type { Lang } from "@/components/site/seo";
import { cn } from "@/lib/utils";

const UI = {
  en: {
    kicker: "Plans & prices",
    title: "Compare prepaid plans from every carrier.",
    body: "Every plan below is available at our counter. We'll help you pick the right one, activate it and move your number — in English or Spanish.",
    jump: "Jump to a carrier",
    unlimitedTitle: "Unlimited plans, side by side",
    unlimitedBody: "Sorted by monthly price.",
    carrier: "Carrier",
    plan: "Plan",
    price: "Price",
    hotspot: "Hotspot",
    includes: "Every plan includes",
    notes: "Good to know",
    source: "Source",
    checked: (d: string) => `Prices checked ${d}`,
    disclaimer:
      "Prices and features are set by each carrier and shown as advertised. Plus taxes & fees. Carriers change plans often — we'll confirm today's price before you pay.",
    others: (names: string) =>
      `We also carry ${names}. Ask at the counter for their current plans.`,
    call: "Questions about a plan? Call",
  },
  es: {
    kicker: "Planes y precios",
    title: "Compara planes prepagados de todas las compañías.",
    body: "Todos los planes de abajo están disponibles en nuestro mostrador. Te ayudamos a elegir, activarlo y pasar tu número, en español o inglés.",
    jump: "Ir a una compañía",
    unlimitedTitle: "Planes ilimitados, lado a lado",
    unlimitedBody: "Ordenados por precio mensual.",
    carrier: "Compañía",
    plan: "Plan",
    price: "Precio",
    hotspot: "Hotspot",
    includes: "Todos los planes incluyen",
    notes: "Para saber",
    source: "Fuente",
    checked: (d: string) => `Precios revisados el ${d}`,
    disclaimer:
      "Los precios y beneficios los fija cada compañía y se muestran como se anuncian. Más impuestos y cargos. Las compañías cambian sus planes seguido: confirmamos el precio del día antes de que pagues.",
    others: (names: string) =>
      `También manejamos ${names}. Pregunta en el mostrador por sus planes actuales.`,
    call: "¿Dudas sobre un plan? Llama al",
  },
};

const anchor = (c: Carrier) => `plans-${c.id}`;

function checkedDate(lang: Lang) {
  return new Date(`${PLANS_CHECKED}T12:00:00`).toLocaleDateString(
    lang === "en" ? "en-US" : "es-MX",
    { month: "long", day: "numeric", year: "numeric" },
  );
}

export function PrepaidPlans({ lang }: { lang: Lang }) {
  const t = UI[lang];
  const unlimited = CARRIERS.flatMap((c) =>
    c.plans.filter((p) => p.unlimited).map((p) => ({ c, p })),
  ).sort((a, b) => a.p.price - b.p.price);

  return (
    <section id="plans" aria-labelledby="plans-title" className="scroll-mt-24 bg-secondary/50">
      <div className="mx-auto max-w-7xl px-5 py-14 md:py-24">
        <p className="eyebrow text-ink/60">{t.kicker}</p>
        <h2
          id="plans-title"
          className="mt-3 max-w-3xl text-3xl font-semibold leading-[1.05] sm:text-4xl md:text-5xl"
        >
          {t.title}
        </h2>
        <p className="mt-4 max-w-2xl text-muted-foreground">{t.body}</p>
        <p className="mt-3 text-sm font-medium text-ink/70">{t.checked(checkedDate(lang))}</p>
      </div>

      {/* Carrier jump bar: swipe on phones, sticks under the header while scrolling. */}
      <nav
        aria-label={t.jump}
        className="sticky top-[76px] z-30 border-y bg-background/95 backdrop-blur"
      >
        <ul className="mx-auto flex max-w-7xl gap-2 overflow-x-auto px-5 py-3 [scrollbar-width:none]">
          {CARRIERS.map((c) => (
            <li key={c.id} className="shrink-0">
              <a
                href={`#${anchor(c)}`}
                className="inline-flex min-h-10 items-center rounded-full border bg-card px-4 text-sm font-semibold transition hover:border-primary hover:text-primary"
              >
                {c.name}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="mx-auto max-w-7xl px-5 py-12 md:py-16">
        {/* Unlimited comparison */}
        <div className="overflow-hidden rounded-3xl border bg-card">
          <div className="border-b px-5 py-5 sm:px-6">
            <h3 className="font-display text-xl font-semibold sm:text-2xl">{t.unlimitedTitle}</h3>
            <p className="text-sm text-muted-foreground">{t.unlimitedBody}</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-secondary/60 text-xs uppercase tracking-wider text-muted-foreground">
                <tr>
                  <th scope="col" className="px-5 py-3 font-semibold sm:px-6">
                    {t.carrier}
                  </th>
                  <th scope="col" className="hidden px-3 py-3 font-semibold sm:table-cell">
                    {t.plan}
                  </th>
                  <th scope="col" className="hidden px-3 py-3 font-semibold sm:table-cell">
                    {t.hotspot}
                  </th>
                  <th scope="col" className="px-5 py-3 text-right font-semibold sm:px-6">
                    {t.price}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {unlimited.map(({ c, p }) => (
                  <tr key={`${c.id}-${p.price}`}>
                    <th scope="row" className="px-5 py-3 font-semibold sm:px-6">
                      <a href={`#${anchor(c)}`} className="tap hover:text-primary">
                        {c.name}
                      </a>
                      {/* Phones: plan and hotspot under the carrier instead of in their own columns. */}
                      <span className="mt-0.5 block text-xs font-normal text-muted-foreground sm:hidden">
                        {p.name?.[lang] ?? p.data[lang]}
                        {p.hotspot && ` · ${p.hotspot[lang]}`}
                      </span>
                    </th>
                    <td className="hidden px-3 py-3 text-muted-foreground sm:table-cell">
                      {p.name?.[lang] ?? p.data[lang]}
                    </td>
                    <td className="hidden px-3 py-3 text-muted-foreground sm:table-cell">
                      {p.hotspot?.[lang] ?? "—"}
                    </td>
                    <td className="whitespace-nowrap px-5 py-3 text-right font-display font-semibold sm:px-6">
                      <Money usd={p.price} />
                      <span className="block text-xs font-normal text-muted-foreground sm:inline">
                        {c.per?.[lang] ?? (lang === "en" ? "/mo" : "/mes")}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Carriers */}
        <div className="mt-12 space-y-8 md:mt-16 md:space-y-10">
          {CARRIERS.map((c) => (
            <CarrierPlans key={c.id} carrier={c} lang={lang} />
          ))}
        </div>

        <div className="mt-10 space-y-3 rounded-3xl border bg-card p-5 text-sm text-muted-foreground sm:p-6">
          <p className="flex gap-2">
            <Info className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
            <span>{t.disclaimer}</span>
          </p>
          <p className="pl-6">{t.others(OTHER_CARRIERS.join(", "))}</p>
          <p className="pl-6">
            {t.call}{" "}
            <a href={TEL} className="tap font-semibold text-ink underline-offset-4 hover:underline">
              {PHONE}
            </a>
            .
          </p>
        </div>
      </div>
    </section>
  );
}

function CarrierPlans({ carrier: c, lang }: { carrier: Carrier; lang: Lang }) {
  const t = UI[lang];
  const per = c.per?.[lang] ?? (lang === "en" ? "/mo" : "/mes");
  return (
    <article
      id={anchor(c)}
      aria-labelledby={`${anchor(c)}-name`}
      className="scroll-mt-40 rounded-3xl border bg-card p-4 sm:p-6 md:p-8"
    >
      <header className="flex flex-wrap items-center justify-between gap-3">
        <h3 id={`${anchor(c)}-name`} className="font-display text-2xl font-semibold md:text-3xl">
          {c.name}
        </h3>
        {c.network && (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-secondary px-3 py-1 text-xs font-semibold">
            <Wifi className="h-3.5 w-3.5 text-primary" /> {c.network[lang]}
          </span>
        )}
      </header>

      <div className="mt-4">
        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          {t.includes}
        </p>
        <ul className="mt-2 flex flex-wrap gap-2">
          {c.includes.map((x) => (
            <li
              key={x.en}
              className="inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium sm:text-sm"
            >
              <CircleCheck className="h-3.5 w-3.5 shrink-0 text-primary" />
              <MoneyText text={x[lang]} />
            </li>
          ))}
        </ul>
      </div>

      <ul className="mt-6 grid grid-cols-2 gap-2 sm:gap-3 lg:grid-cols-3 xl:grid-cols-4">
        {c.plans.map((p) => (
          <li
            key={p.price}
            className={cn(
              "relative flex flex-col rounded-2xl border p-3 sm:p-5",
              p.badge ? "border-primary/60 bg-primary/5" : "bg-background",
            )}
          >
            {p.badge && (
              <span className="mb-2 self-start rounded-full bg-primary px-2 py-0.5 text-[11px] font-bold uppercase tracking-wide text-primary-foreground">
                {p.badge[lang]}
              </span>
            )}
            <p className="font-display leading-none">
              <span className="text-3xl font-semibold sm:text-4xl">
                <Money usd={p.price} stacked />
              </span>
              <span className="mt-1 block font-sans text-xs text-muted-foreground sm:ml-0.5 sm:mt-0 sm:inline sm:text-sm">
                {per}
              </span>
            </p>
            {p.name && <p className="mt-2 text-sm font-semibold">{p.name[lang]}</p>}
            <p className="mt-2 text-sm font-semibold leading-snug text-ink sm:text-base">
              {p.data[lang]}
            </p>
            {p.hotspot && (
              <p className="mt-1 text-xs text-muted-foreground sm:text-sm">{p.hotspot[lang]}</p>
            )}
            {p.perks.length > 0 && (
              <ul className="mt-3 space-y-1.5 border-t pt-3 text-xs leading-snug text-muted-foreground sm:text-sm">
                {p.perks.map((x) => (
                  <li key={x.en} className="flex gap-1.5">
                    <CircleCheck className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" />
                    <span>
                      <MoneyText text={x[lang]} />
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>

      {c.notes.length > 0 && (
        <div className="mt-5 rounded-2xl bg-secondary/60 p-4 text-xs leading-relaxed text-muted-foreground sm:text-sm">
          <p className="font-semibold text-ink">{t.notes}</p>
          <ul className="mt-1.5 list-disc space-y-1 pl-4">
            {c.notes.map((n) => (
              <li key={n.en}>
                <MoneyText text={n[lang]} />
              </li>
            ))}
          </ul>
          <p className="mt-2 text-[11px] uppercase tracking-wider">
            {t.source}: {c.source[lang]}
          </p>
        </div>
      )}
    </article>
  );
}
