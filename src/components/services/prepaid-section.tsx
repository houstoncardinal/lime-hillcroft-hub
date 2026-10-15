import { ChevronDown, ChevronRight, CircleCheck, Info, Phone, Wifi } from "lucide-react";
import { useEffect, useState } from "react";

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

// Prepaid plans as tabs: "Compare unlimited" plus one tab per carrier, so only one panel shows
// at a time. Every panel is in the HTML (search engines and AI read all plans); the tab in the
// URL hash (#plans-t-mobile) opens directly, so carriers can be linked and shared.

const UI = {
  en: {
    kicker: "Plans & prices",
    title: "Compare prepaid plans from every carrier.",
    body: "Pick a carrier to see every plan, or compare all unlimited plans. We activate and move your number at the counter — in English or Spanish.",
    tabs: "Carriers",
    compare: "Compare unlimited",
    unlimitedBody: "Every unlimited plan we sell, cheapest first. Tap a carrier for all its plans.",
    carrier: "Carrier",
    plan: "Plan",
    price: "Price",
    hotspot: "Hotspot",
    includes: "Every plan includes",
    notes: "Good to know",
    source: "Source",
    checked: (d: string) => `Prices checked ${d}`,
    disclaimer:
      "Prices set by each carrier, as advertised. Plus taxes & fees; we confirm today's price before you pay.",
    others: (names: string) => `Also available: ${names} — ask at the counter.`,
    call: "Call",
    plans: (n: number) => `${n} plans`,
  },
  es: {
    kicker: "Planes y precios",
    title: "Compara planes prepagados de todas las compañías.",
    body: "Elige una compañía para ver todos sus planes o compara los ilimitados. Activamos y pasamos tu número en el mostrador, en español o inglés.",
    tabs: "Compañías",
    compare: "Comparar ilimitados",
    unlimitedBody:
      "Todos los planes ilimitados que vendemos, del más barato al más caro. Toca una compañía para ver todos sus planes.",
    carrier: "Compañía",
    plan: "Plan",
    price: "Precio",
    hotspot: "Hotspot",
    includes: "Todos los planes incluyen",
    notes: "Para saber",
    source: "Fuente",
    checked: (d: string) => `Precios revisados el ${d}`,
    disclaimer:
      "Precios fijados por cada compañía, como se anuncian. Más impuestos y cargos; confirmamos el precio del día antes de que pagues.",
    others: (names: string) => `También: ${names}. Pregunta en el mostrador.`,
    call: "Llamar",
    plans: (n: number) => `${n} planes`,
  },
};

const COMPARE = "compare";
const tabId = (id: string) => `plans-${id}`;

function checkedDate(lang: Lang) {
  return new Date(`${PLANS_CHECKED}T12:00:00`).toLocaleDateString(
    lang === "en" ? "en-US" : "es-MX",
    { month: "short", day: "numeric", year: "numeric" },
  );
}

export function PrepaidPlans({ lang }: { lang: Lang }) {
  const t = UI[lang];
  const [active, setActive] = useState(COMPARE);
  const unlimited = CARRIERS.flatMap((c) =>
    c.plans.filter((p) => p.unlimited).map((p) => ({ c, p })),
  ).sort((a, b) => a.p.price - b.p.price);
  const tabs = [
    { id: COMPARE, label: t.compare },
    ...CARRIERS.map((c) => ({ id: c.id, label: c.name })),
  ];

  // Open the tab named in the URL (#plans-t-mobile), now and on back/forward.
  useEffect(() => {
    const fromHash = () => {
      const id = window.location.hash.replace(/^#plans-/, "");
      if (tabs.some((x) => x.id === id)) setActive(id);
    };
    fromHash();
    window.addEventListener("hashchange", fromHash);
    return () => window.removeEventListener("hashchange", fromHash);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- tab ids never change
  }, []);

  const open = (id: string, scroll = false) => {
    setActive(id);
    history.replaceState(null, "", `#${tabId(id)}`);
    if (scroll) document.getElementById("plans")?.scrollIntoView({ behavior: "smooth" });
    // Keep the chosen tab visible in the scrolling tab bar.
    document.getElementById(`tab-${id}`)?.scrollIntoView({ block: "nearest", inline: "center" });
  };

  return (
    <section id="plans" aria-labelledby="plans-title" className="scroll-mt-20 bg-secondary/50">
      <div className="mx-auto max-w-7xl px-5 pb-6 pt-8 md:pt-10">
        <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-3">
          <div className="max-w-2xl">
            <p className="eyebrow text-ink/60">{t.kicker}</p>
            <h2
              id="plans-title"
              className="mt-2 text-2xl font-semibold leading-tight sm:text-3xl md:text-4xl"
            >
              {t.title}
            </h2>
            <p className="mt-2 text-sm text-muted-foreground sm:text-base">{t.body}</p>
          </div>
          <p className="text-xs font-medium text-ink/60">{t.checked(checkedDate(lang))}</p>
        </div>
      </div>

      {/* Tab bar: sticks under the header; swipe on phones, wraps on wide screens. */}
      <div className="sticky top-[72px] z-30 border-y bg-background/95 backdrop-blur">
        <div
          role="tablist"
          aria-label={t.tabs}
          className="mx-auto flex max-w-7xl gap-1.5 overflow-x-auto px-5 py-2.5 [scrollbar-width:none] xl:flex-wrap"
        >
          {tabs.map((x) => {
            const on = active === x.id;
            return (
              <button
                key={x.id}
                id={`tab-${x.id}`}
                type="button"
                role="tab"
                aria-selected={on}
                aria-controls={tabId(x.id)}
                onClick={() => open(x.id)}
                className={cn(
                  "inline-flex h-10 shrink-0 cursor-pointer items-center rounded-full px-3.5 text-sm font-semibold transition",
                  on
                    ? "bg-ink text-white"
                    : "border bg-card hover:border-primary hover:text-primary",
                  x.id === COMPARE && !on && "border-primary/50 text-primary",
                )}
              >
                {x.label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-5 py-6 md:py-8">
        {/* Compare unlimited */}
        <div
          id={tabId(COMPARE)}
          role="tabpanel"
          aria-labelledby={`tab-${COMPARE}`}
          hidden={active !== COMPARE}
          className="overflow-hidden rounded-3xl border bg-card"
        >
          <p className="border-b px-5 py-3 text-sm text-muted-foreground sm:px-6">
            {t.unlimitedBody}
          </p>
          <table className="w-full text-left text-sm">
            <thead className="bg-secondary/60 text-xs uppercase tracking-wider text-muted-foreground">
              <tr>
                <th scope="col" className="px-5 py-2.5 font-semibold sm:px-6">
                  {t.carrier}
                </th>
                <th scope="col" className="hidden px-3 py-2.5 font-semibold sm:table-cell">
                  {t.plan}
                </th>
                <th scope="col" className="hidden px-3 py-2.5 font-semibold md:table-cell">
                  {t.hotspot}
                </th>
                <th scope="col" className="px-5 py-2.5 text-right font-semibold sm:px-6">
                  {t.price}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {unlimited.map(({ c, p }) => (
                <tr
                  key={`${c.id}-${p.price}`}
                  onClick={() => open(c.id, true)}
                  className="cursor-pointer transition hover:bg-secondary/50"
                >
                  <th scope="row" className="px-5 py-2.5 font-semibold sm:px-6">
                    <a
                      href={`#${tabId(c.id)}`}
                      onClick={(e) => {
                        e.preventDefault();
                        open(c.id, true);
                      }}
                      className="inline-flex min-h-10 items-center gap-1 hover:text-primary"
                    >
                      {c.name}
                      <ChevronRight className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
                    </a>
                    <span className="block text-xs font-normal text-muted-foreground sm:hidden">
                      {p.name?.[lang] ?? p.data[lang]}
                      {p.hotspot && ` · ${p.hotspot[lang]}`}
                    </span>
                  </th>
                  <td className="hidden px-3 py-2.5 text-muted-foreground sm:table-cell">
                    {p.name?.[lang] ?? p.data[lang]}
                    <span className="block text-xs md:hidden">{p.hotspot?.[lang]}</span>
                  </td>
                  <td className="hidden px-3 py-2.5 text-muted-foreground md:table-cell">
                    {p.hotspot?.[lang] ?? "—"}
                  </td>
                  <td className="whitespace-nowrap px-5 py-2.5 text-right font-display font-semibold sm:px-6">
                    <Money usd={p.price} />
                    <span className="block text-xs font-normal text-muted-foreground">
                      {c.per?.[lang] ?? (lang === "en" ? "/mo" : "/mes")}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {CARRIERS.map((c) => (
          <CarrierPanel key={c.id} carrier={c} lang={lang} hidden={active !== c.id} />
        ))}

        {/* Fine print + help, one compact strip */}
        <div className="mt-4 flex flex-col gap-3 rounded-2xl border bg-card p-4 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p className="flex gap-2">
            <Info className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
            <span>
              {t.disclaimer} {t.others(OTHER_CARRIERS.join(", "))}
            </span>
          </p>
          <a
            href={TEL}
            className="inline-flex h-10 shrink-0 items-center justify-center gap-2 rounded-full bg-ink px-4 text-sm font-semibold text-white"
          >
            <Phone className="h-4 w-4" /> {t.call} {PHONE}
          </a>
        </div>
      </div>
    </section>
  );
}

function CarrierPanel({
  carrier: c,
  lang,
  hidden,
}: {
  carrier: Carrier;
  lang: Lang;
  hidden: boolean;
}) {
  const t = UI[lang];
  const per = c.per?.[lang] ?? (lang === "en" ? "/mo" : "/mes");
  return (
    <article
      id={tabId(c.id)}
      role="tabpanel"
      aria-labelledby={`tab-${c.id}`}
      hidden={hidden}
      className="rounded-3xl border bg-card p-4 sm:p-6"
    >
      <header className="flex flex-wrap items-center gap-x-3 gap-y-2">
        <h3 className="font-display text-xl font-semibold sm:text-2xl">{c.name}</h3>
        {c.network && (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-secondary px-2.5 py-1 text-xs font-semibold">
            <Wifi className="h-3.5 w-3.5 text-primary" aria-hidden="true" /> {c.network[lang]}
          </span>
        )}
        <span className="text-xs text-muted-foreground">{t.plans(c.plans.length)}</span>
      </header>

      <p className="mt-3 text-xs leading-relaxed text-muted-foreground sm:text-sm">
        <span className="font-semibold text-ink">{t.includes}: </span>
        {c.includes.map((x, i) => (
          <span key={x.en}>
            {i > 0 && " · "}
            <MoneyText text={x[lang]} />
          </span>
        ))}
      </p>

      <ul className="mt-4 grid grid-cols-2 gap-2 sm:gap-3 lg:grid-cols-3 xl:grid-cols-4">
        {c.plans.map((p) => (
          <li
            key={p.price}
            className={cn(
              "flex flex-col rounded-2xl border p-3 sm:p-4",
              p.badge ? "border-primary/60 bg-primary/5" : "bg-background",
            )}
          >
            {p.badge && (
              <span className="mb-1.5 self-start rounded-full bg-primary px-2 py-0.5 text-[11px] font-bold uppercase tracking-wide text-primary-foreground">
                {p.badge[lang]}
              </span>
            )}
            <p className="font-display leading-none">
              <span className="text-2xl font-semibold sm:text-3xl">
                <Money usd={p.price} stacked />
              </span>
              <span className="mt-1 block font-sans text-xs text-muted-foreground">{per}</span>
            </p>
            {p.name && <p className="mt-2 text-sm font-semibold">{p.name[lang]}</p>}
            <p className="mt-1 text-sm font-semibold leading-snug text-ink">{p.data[lang]}</p>
            {p.hotspot && <p className="mt-0.5 text-xs text-muted-foreground">{p.hotspot[lang]}</p>}
            {p.perks.length > 0 && (
              <ul className="mt-2 space-y-1 border-t pt-2 text-xs leading-snug text-muted-foreground">
                {p.perks.map((x) => (
                  <li key={x.en} className="flex gap-1.5">
                    <CircleCheck
                      className="mt-0.5 h-3 w-3 shrink-0 text-primary"
                      aria-hidden="true"
                    />
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
        <details className="group mt-3 rounded-2xl bg-secondary/60 text-xs text-muted-foreground sm:text-sm">
          <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between px-4 font-semibold text-ink [&::-webkit-details-marker]:hidden">
            {t.notes}
            <ChevronDown className="h-4 w-4 transition group-open:rotate-180" aria-hidden="true" />
          </summary>
          <ul className="list-disc space-y-1 px-4 pb-3 pl-8 leading-relaxed">
            {c.notes.map((n) => (
              <li key={n.en}>
                <MoneyText text={n[lang]} />
              </li>
            ))}
          </ul>
          <p className="px-4 pb-3 text-[11px] uppercase tracking-wider">
            {t.source}: {c.source[lang]}
          </p>
        </details>
      )}
    </article>
  );
}
