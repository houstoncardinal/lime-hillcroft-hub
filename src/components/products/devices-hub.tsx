import { Link } from "@tanstack/react-router";
import { Phone, Search, X } from "lucide-react";
import { useMemo, useState } from "react";

import { MoneyText } from "@/components/intl/money";
import { inventoryDate } from "@/components/products/device-faqs";
import { LATEST_DEVICES, type Device } from "@/components/products/inventory";
import {
  DEVICES_HUB_COPY,
  DEVICE_FILTERS,
  DEVICE_SECTIONS,
  type Filter,
} from "@/components/products/devices-hub-copy";
import { DeviceCard } from "@/components/products/latest-devices";
import { PHONE, TEL } from "@/components/site/business";
import { SiteFooter, SiteHeader } from "@/components/site/chrome";
import { FaqList } from "@/components/site/faq";
import { LeasingPortals } from "@/components/site/leasing-portals";
import { ALTERNATES, type Lang } from "@/components/site/seo";
import { cn } from "@/lib/utils";

const match = DEVICE_FILTERS;

// Ordering inside a family, the way the makers list them: base, Plus/+, Pro, Pro Max/Ultra.
const tier = (name: string) =>
  /Pro Max|Ultra/.test(name) ? 3 : /\bPro\b/.test(name) ? 2 : /Plus|\+/.test(name) ? 1 : 0;
// Galaxy A by model number (A53, A36 … A03s); iPads as Pro, iPad, mini; foldables newest first.
const aNumber = (name: string) => Number(/A(\d+)/.exec(name)?.[1] ?? 0);
const ipadRank = (name: string) => (/Pro/.test(name) ? 0 : /mini/.test(name) ? 2 : 1);
const byModel = (a: Device, b: Device) => {
  if (a.kind === "galaxy-a") return aNumber(b.name) - aNumber(a.name);
  if (a.kind === "ipad") return ipadRank(a.name) - ipadRank(b.name);
  if (a.kind === "galaxy-fold")
    return (
      (b.year ?? 0) - (a.year ?? 0) || Number(/Flip/.test(a.name)) - Number(/Flip/.test(b.name))
    );
  return tier(a.name) - tier(b.name);
};

/** Devices grouped by model family: newest family first, models in the makers' order. */
function families(devices: Device[]) {
  const map = new Map<string, Device[]>();
  for (const d of devices) {
    const key = d.family ?? d.name;
    map.set(key, [...(map.get(key) ?? []), d]);
  }
  const year = (list: Device[]) => Math.max(...list.map((d) => d.year ?? 0));
  return [...map.entries()]
    .map(([family, list]) => [family, [...list].sort(byModel)] as const)
    .sort(([fa, a], [fb, b]) => year(b) - year(a) || fb.localeCompare(fa, "en", { numeric: true }));
}

const familyId = (family: string) => `family-${family.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;

export function DevicesHubPage({ lang }: { lang: Lang }) {
  const t = DEVICES_HUB_COPY[lang];
  const [filter, setFilter] = useState<Filter>("all");
  const [query, setQuery] = useState("");
  const q = query.trim().toLowerCase().replace(/\s+/g, " ");
  const shown = useMemo(
    () =>
      LATEST_DEVICES.filter(
        (d) =>
          match[filter](d) &&
          (!q || `${d.brand} ${d.name} ${d.family ?? ""}`.toLowerCase().includes(q)),
      ),
    [filter, q],
  );
  const counts = (f: Filter) => LATEST_DEVICES.filter(match[f]).length;

  return (
    <main className="overflow-x-hidden">
      <SiteHeader lang={lang} paths={ALTERNATES.devices} />

      <section className="relative isolate overflow-hidden bg-ink text-white">
        <div className="grain absolute inset-0 -z-10 opacity-60" />
        <div className="absolute -right-40 top-0 -z-10 h-[32rem] w-[32rem] rounded-full bg-primary/20 blur-[150px]" />
        <div className="mx-auto max-w-7xl px-5 pb-12 pt-28 md:pb-16 md:pt-32">
          <nav
            aria-label="Breadcrumb"
            className="mb-6 flex flex-wrap items-center gap-1.5 text-sm text-white/60"
          >
            <Link to={ALTERNATES.home[lang]} className="hover:text-white">
              {t.home}
            </Link>
            <span>/</span>
            <span className="text-white/85">{t.crumb}</span>
          </nav>
          <p className="eyebrow flex items-center gap-3 text-primary">
            <span className="h-px w-8 bg-primary" /> {t.kicker(inventoryDate(lang))}
          </p>
          <h1 className="mt-4 max-w-4xl text-[clamp(2.25rem,5.5vw,4.25rem)] font-semibold leading-[1.02]">
            {t.title[0]} <span className="text-primary">{t.title[1]}</span>
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-relaxed text-white/75">
            <MoneyText text={t.body} />
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <a
              href={TEL}
              className="inline-flex min-h-12 items-center gap-2 rounded-full bg-primary px-6 font-semibold text-primary-foreground transition hover:brightness-110"
            >
              <Phone className="h-4 w-4" /> {t.call}
            </a>
            <a
              href="#apply"
              className="inline-flex min-h-12 items-center gap-2 rounded-full border border-white/20 px-6 font-semibold transition hover:border-white/60"
            >
              {t.apply}
            </a>
          </div>
        </div>
      </section>

      {/* Filters: sticky under the header so they stay in reach while scrolling the list. */}
      <div className="sticky top-[84px] z-30 border-b bg-background/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-5 py-3 md:flex-row md:items-center md:justify-between">
          <div
            role="group"
            aria-label={lang === "en" ? "Filter by brand" : "Filtrar por marca"}
            className="-mx-5 flex gap-2 overflow-x-auto px-5 md:mx-0 md:px-0"
          >
            {(Object.keys(match) as Filter[]).map((f) => (
              <button
                key={f}
                type="button"
                onClick={() => setFilter(f)}
                aria-pressed={filter === f}
                className={cn(
                  "inline-flex min-h-10 shrink-0 items-center gap-1.5 rounded-full border px-4 text-sm font-semibold transition",
                  filter === f
                    ? "border-ink bg-ink text-white"
                    : "bg-card hover:border-primary hover:text-primary",
                )}
              >
                {t.filters[f]}
                <span
                  className={cn(
                    "text-xs",
                    filter === f ? "text-white/70" : "text-muted-foreground",
                  )}
                >
                  {counts(f)}
                </span>
              </button>
            ))}
          </div>
          <label className="relative block md:w-80">
            <span className="sr-only">{t.search}</span>
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t.search}
              className="min-h-11 w-full rounded-full border bg-card pl-10 pr-10 text-sm outline-none focus:border-primary"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                aria-label={t.clear}
                className="absolute right-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full text-muted-foreground hover:text-ink"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </label>
        </div>
      </div>

      <section className="mx-auto max-w-7xl px-5 py-10 md:py-14" aria-live="polite">
        {shown.length === 0 ? (
          <p className="rounded-3xl border bg-card p-8 text-center text-muted-foreground">
            {t.none}{" "}
            <a href={TEL} className="font-semibold text-ink underline decoration-primary">
              {PHONE}
            </a>
          </p>
        ) : (
          <div className="space-y-14">
            {DEVICE_SECTIONS.map((section) => {
              const list = shown.filter((d) => d.kind === section.kind);
              if (!list.length) return null;
              const fams = families(list);
              const split = fams.length > 1;
              return (
                <section
                  key={section.id}
                  id={section.id}
                  aria-labelledby={`${section.id}-title`}
                  className="scroll-mt-44"
                >
                  <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-2 border-b-2 border-ink pb-3">
                    <div>
                      <p className="eyebrow text-primary">{section.brand}</p>
                      <h2
                        id={`${section.id}-title`}
                        className="mt-1 text-3xl font-semibold md:text-4xl"
                      >
                        {t.sections[section.id]}
                      </h2>
                    </div>
                    <span className="text-sm text-muted-foreground">{t.models(list.length)}</span>
                  </div>
                  {split && (
                    <nav
                      aria-label={`${t.jump}: ${t.sections[section.id]}`}
                      className="-mx-5 mt-4 flex gap-2 overflow-x-auto px-5 md:mx-0 md:flex-wrap md:px-0"
                    >
                      {fams.map(([family]) => (
                        <a
                          key={family}
                          href={`#${familyId(family)}`}
                          className="inline-flex min-h-9 shrink-0 items-center rounded-full border bg-card px-3.5 text-sm font-medium hover:border-primary hover:text-primary"
                        >
                          {family}
                        </a>
                      ))}
                    </nav>
                  )}
                  <div className="mt-6 space-y-8">
                    {fams.map(([family, devices]) => (
                      <div key={family} id={familyId(family)} className="scroll-mt-44">
                        {split && (
                          <div className="flex items-baseline justify-between gap-4 pb-3">
                            <h3 className="text-xl font-semibold md:text-2xl">{family}</h3>
                            <span className="text-sm text-muted-foreground">
                              {t.models(devices.length)}
                            </span>
                          </div>
                        )}
                        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4 xl:grid-cols-5">
                          {devices.map((d) => (
                            <li key={d.id}>
                              <DeviceCard device={d} lang={lang} />
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </section>
              );
            })}
          </div>
        )}
      </section>

      <LeasingPortals lang={lang} />

      <section className="mx-auto max-w-7xl px-5 py-12 md:py-16">
        <div className="grid gap-8 lg:grid-cols-[1fr_1.6fr]">
          <h2 className="text-3xl font-semibold leading-tight md:text-4xl">{t.faqTitle}</h2>
          <FaqList items={t.faqs} />
        </div>
      </section>

      <SiteFooter lang={lang} portals={false} />
    </main>
  );
}
