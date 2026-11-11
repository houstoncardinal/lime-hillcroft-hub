import { Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  ArrowRight,
  CalendarClock,
  ChevronDown,
  ChevronRight,
  Info,
  MapPin,
  Phone,
  ShieldCheck,
  Sparkles,
  Store,
} from "lucide-react";

import {
  LEASE_CATEGORIES,
  LEASE_DEVICES,
  LEASE_PATHS,
  LEASE_PRICES_UPDATED,
  leaseDevicePaths,
  leaseFrom,
  payment,
  type Frequency,
  type LeaseDevice,
} from "@/components/lease/catalog";
import { LEASE_COPY } from "@/components/lease/copy";
import { shopifyHandle } from "@/components/lease/shopify-links";
import { SHOP_ENABLED } from "@/components/site/features";
import { productPath } from "@/shop/paths";
import {
  FrequencyToggle,
  LeaseCard,
  LeaseMoney,
  LeasePhoto,
  PaymentSummary,
  leasePhotos,
} from "@/components/lease/lease-ui";
import { devicePath } from "@/components/products/device-paths";
import { DIRECTIONS, TEL } from "@/components/site/business";
import { SiteFooter, SiteHeader } from "@/components/site/chrome";
import { IN_HOUSE, PORTALS, PortalButton } from "@/components/site/leasing-portals";
import { ALTERNATES, type Lang } from "@/components/site/seo";
import { cn } from "@/lib/utils";

function Crumbs({ lang, name }: { lang: Lang; name?: string }) {
  const t = LEASE_COPY[lang];
  return (
    <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-1 text-sm text-white/60">
      <Link to={ALTERNATES.home[lang]} className="hover:text-white">
        {t.home}
      </Link>
      <ChevronRight className="h-3.5 w-3.5" />
      {name ? (
        <>
          <Link to={LEASE_PATHS[lang]} className="hover:text-white">
            {t.crumb}
          </Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="text-white/85">{name}</span>
        </>
      ) : (
        <span className="text-white/85">{t.crumb}</span>
      )}
    </nav>
  );
}

function Steps({ lang }: { lang: Lang }) {
  const t = LEASE_COPY[lang];
  return (
    <section aria-labelledby="lease-steps" className="mx-auto max-w-7xl px-5 py-12 md:py-16">
      <h2 id="lease-steps" className="text-3xl font-semibold md:text-4xl">
        {t.stepsTitle}
      </h2>
      <ol className="mt-8 grid gap-4 md:grid-cols-3">
        {t.steps.map(([Icon, title, body], i) => (
          <li key={title} className="rounded-3xl border bg-card p-6">
            <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
              <Icon className="h-5 w-5" />
            </span>
            <p className="mt-4 font-display text-lg font-semibold">
              {i + 1}. {title}
            </p>
            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{body}</p>
          </li>
        ))}
      </ol>
      <p className="mt-6 text-xs leading-relaxed text-muted-foreground">{t.fine}</p>
    </section>
  );
}

/** /lease-to-own: every device, grouped by category. */
export function LeaseHubPage({ lang }: { lang: Lang }) {
  const t = LEASE_COPY[lang];
  const [frequency, setFrequency] = useState<Frequency>("weekly");
  const groups = LEASE_CATEGORIES.map((c) => ({
    ...c,
    devices: LEASE_DEVICES.filter((d) => d.category === c.id),
  })).filter((g) => g.devices.length);
  return (
    <main className="overflow-x-hidden">
      <SiteHeader lang={lang} paths={LEASE_PATHS} />
      <section className="relative isolate overflow-hidden bg-ink text-white">
        <div className="grain absolute inset-0 -z-10 opacity-60" />
        <div className="absolute -right-24 -top-24 -z-10 h-96 w-96 rounded-full bg-primary/25 blur-[120px]" />
        <div className="mx-auto max-w-7xl px-5 pb-10 pt-28 md:pb-14 md:pt-32">
          <Crumbs lang={lang} />
          <p className="eyebrow mt-6 flex items-center gap-3 text-primary">
            <span className="h-px w-8 bg-primary" /> {t.kicker}
          </p>
          <h1 className="mt-3 max-w-3xl text-[clamp(2.25rem,5vw,3.75rem)] font-semibold leading-[1.05]">
            {t.title}
          </h1>
          <p className="mt-4 max-w-3xl text-lg leading-relaxed text-white/75">{t.body}</p>
          {/* Jump links to each category */}
          <nav aria-label={t.crumb} className="mt-8 flex flex-wrap gap-2">
            {groups.map((g) => (
              <a
                key={g.id}
                href={`#${g.id}`}
                className="inline-flex min-h-10 items-center rounded-full border border-white/20 px-4 text-sm font-semibold transition hover:border-primary hover:text-primary"
              >
                {g.title[lang]} <span className="ml-1.5 text-white/50">{g.devices.length}</span>
              </a>
            ))}
          </nav>
          <div className="mt-6 max-w-md">
            <p className="mb-2 text-sm font-semibold text-white/80">{t.showPayments}</p>
            <FrequencyToggle
              value={frequency}
              onChange={setFrequency}
              lang={lang}
              label={t.showPayments}
              tone="dark"
            />
            <p className="mt-2 text-xs leading-relaxed text-white/60">{t.freqNote}</p>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl space-y-14 px-5 py-12 md:py-16">
        {groups.map((g) => (
          <section key={g.id} id={g.id} aria-labelledby={`${g.id}-title`} className="scroll-mt-28">
            <div className="flex items-baseline justify-between gap-4">
              <h2 id={`${g.id}-title`} className="text-3xl font-semibold">
                {g.title[lang]}
              </h2>
              <span className="text-sm text-muted-foreground">
                {g.devices.length}
              </span>
            </div>
            <ul className="mt-6 grid grid-cols-1 gap-3 min-[420px]:grid-cols-2 sm:gap-5 lg:grid-cols-4">
              {g.devices.map((d) => (
                <li key={d.id}>
                  <LeaseCard device={d} lang={lang} frequency={frequency} />
                </li>
              ))}
            </ul>
          </section>
        ))}
        <p className="text-sm text-muted-foreground">{t.updated(LEASE_PRICES_UPDATED)}</p>
      </div>

      <Steps lang={lang} />

      {/* Visible FAQ (also in the page's structured data) */}
      <section aria-labelledby="lease-faq" className="mx-auto max-w-3xl px-5 pb-16">
        <h2 id="lease-faq" className="text-2xl font-semibold">
          FAQ
        </h2>
        <div className="mt-4 divide-y rounded-3xl border bg-card">
          {t.faqs.map((f) => (
            <details key={f.q} className="group p-5">
              <summary className="cursor-pointer list-none font-semibold marker:hidden">
                {f.q}
              </summary>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.a}</p>
            </details>
          ))}
        </div>
      </section>
      <SiteFooter lang={lang} />
    </main>
  );
}

/** /lease-to-own/<id>: every option with its prices, and all leasing applications. */
export function LeaseDevicePage({ device, lang }: { device: LeaseDevice; lang: Lang }) {
  const t = LEASE_COPY[lang];
  const [index, setIndex] = useState(() => device.options.indexOf(leaseFrom(device).option));
  const [frequency, setFrequency] = useState<Frequency>("weekly");
  const option = device.options[index] ?? device.options[0]!;
  const photos = leasePhotos(device);
  const [photoIndex, setPhotoIndex] = useState(0);
  const shown = photos[photoIndex] ?? photos[0];
  const credit = shown?.credit;
  const shopHandle = shopifyHandle(device, option);
  const onlineOptions = device.options.filter((x) => shopifyHandle(device, x));
  const from = leaseFrom(device);
  const category = LEASE_CATEGORIES.find((c) => c.id === device.category)!;
  const related = LEASE_DEVICES.filter(
    (d) => d.category === device.category && d.id !== device.id,
  ).slice(0, 4);

  return (
    <main className="overflow-x-hidden">
      <SiteHeader lang={lang} paths={leaseDevicePaths(device.id)} />
      <section className="relative isolate overflow-hidden bg-ink text-white">
        <div className="grain absolute inset-0 -z-10 opacity-60" />
        <div className="mx-auto max-w-7xl px-5 pb-8 pt-28 md:pt-32">
          <Crumbs lang={lang} name={device.name} />
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-5 py-8 md:py-12 lg:grid-cols-[1fr_1.05fr] lg:gap-12">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <LeasePhoto
            device={device}
            lang={lang}
            photo={shown}
            sizes="(min-width: 1024px) 45vw, 100vw"
            className="aspect-square rounded-[2rem] border"
            priority
          />
          {photos.length > 1 && (
            <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
              {photos.map((p, i) => (
                <button
                  key={p.image}
                  type="button"
                  onClick={() => setPhotoIndex(i)}
                  aria-label={p.alt[lang]}
                  aria-pressed={i === photoIndex}
                  className={cn(
                    "h-20 w-20 shrink-0 cursor-pointer overflow-hidden rounded-2xl border bg-white p-1.5 transition",
                    i === photoIndex ? "border-primary ring-2 ring-primary" : "hover:border-ink/30",
                  )}
                >
                  <img src={p.image} alt="" width={p.w} height={p.h} loading="lazy" decoding="async" className="h-full w-full object-contain" />
                </button>
              ))}
            </div>
          )}
          {credit && (
            <p className="mt-2 text-[11px] text-muted-foreground">
              {lang === "en" ? "Photo" : "Foto"}:{" "}
              <a href={credit.href} target="_blank" rel="noopener noreferrer" className="underline-offset-2 hover:underline">
                {credit.author}
              </a>
              , {credit.license} · Wikimedia Commons
            </p>
          )}
          {device.deviceId && (
            <Link
              to={devicePath(lang, device.deviceId)}
              className="mt-4 inline-flex items-center gap-2 text-sm font-semibold hover:text-primary"
            >
              {t.fullSpecs} <ArrowRight className="h-4 w-4 text-primary" />
            </Link>
          )}
        </div>

        <div className="min-w-0">
          <p className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            {device.brand} · {t.crumb}
          </p>
          <h1 className="mt-2 text-4xl font-semibold leading-tight md:text-5xl">{device.name}</h1>
          {device.note && (
            <p className="mt-3 inline-flex rounded-full bg-primary/10 px-3 py-1 text-sm font-semibold text-primary">
              {device.note[lang]}
            </p>
          )}
          <p className="mt-4 text-lg text-muted-foreground">
            {t.from}{" "}
            <span className="font-semibold text-foreground">
              <LeaseMoney usd={from.lease} />
            </span>{" "}
            {lang === "en" ? "or" : "o"}{" "}
            <span className="font-semibold text-primary">
              <LeaseMoney usd={payment(from.option, frequency)} />
              {t.per[frequency]}
            </span>
          </p>

          {/* 1. How often */}
          <p className="mt-8 text-sm font-semibold">{t.payQuestion}</p>
          <FrequencyToggle
            value={frequency}
            onChange={setFrequency}
            lang={lang}
            label={t.payQuestion}
            className="mt-3 max-w-md"
          />
          <p className="mt-2 max-w-md text-xs leading-relaxed text-muted-foreground">{t.freqNote}</p>

          {/* 2. Which option — each shows only the chosen schedule's payment */}
          {device.options.length > 1 && (
            <fieldset className="mt-6">
              <legend className="mb-3 text-sm font-semibold">{t.chooseOption}</legend>
              <div className="flex flex-wrap gap-2">
                {device.options.map((x, i) => (
                  <button
                    key={x.label.en}
                    type="button"
                    aria-pressed={i === index}
                    onClick={() => setIndex(i)}
                    className={cn(
                      "cursor-pointer rounded-2xl border bg-card px-4 py-2.5 text-left transition",
                      i === index ? "border-primary ring-1 ring-primary" : "hover:border-ink/30",
                    )}
                  >
                    <span className="block text-sm font-semibold leading-snug">{x.label[lang]}</span>
                    <span className="block text-xs tabular-nums text-muted-foreground">
                      <LeaseMoney usd={payment(x, frequency)} />
                      {t.per[frequency]}
                    </span>
                  </button>
                ))}
              </div>
            </fieldset>
          )}

          {/* 3. The payment */}
          <div className="mt-4">
            {device.options.length === 1 && (
              <p className="mb-2 text-sm font-semibold">{option.label[lang]}</p>
            )}
            <PaymentSummary option={option} frequency={frequency} lang={lang} />
          </div>

          {/* Special online option: the same model on our Shopify store, with Affirm pay-in-4 */}
          {SHOP_ENABLED && shopHandle && (
            <section
              aria-labelledby="pay-in-4-title"
              className="mt-4 rounded-3xl border border-shoppay/30 bg-shoppay/[0.06] p-5 sm:p-6"
            >
              <p className="inline-flex items-center gap-1.5 rounded-full bg-shoppay px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-shoppay-foreground">
                <Sparkles className="h-3.5 w-3.5" /> {t.payIn4Kicker}
              </p>
              <h2 id="pay-in-4-title" className="mt-3 font-display text-lg font-semibold sm:text-xl">
                {t.payIn4Title}
              </h2>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{t.payIn4Body}</p>
              <p className="mt-2 flex items-start gap-2 text-sm font-bold leading-snug text-ink sm:text-[15px]">
                <Info className="mt-0.5 h-4 w-4 shrink-0 text-shoppay" aria-hidden="true" />
                <span className="underline decoration-shoppay decoration-2 underline-offset-4">
                  {t.payIn4Note}
                </span>
              </p>
              <Link
                to={productPath(lang, shopHandle)}
                className="mt-4 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-shoppay px-6 font-bold text-shoppay-foreground shadow-lg shadow-shoppay/25 transition hover:brightness-110 sm:w-auto"
              >
                <CalendarClock className="h-5 w-5" /> {t.payIn4Button}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </section>
          )}
          {SHOP_ENABLED && !shopHandle && onlineOptions.length > 0 && (
            <p className="mt-3 text-xs text-muted-foreground">
              {t.payIn4Other(onlineOptions.map((x) => x.label[lang]).join(", "))}
            </p>
          )}

          {/* Applications */}
          <section
            aria-labelledby="apply-title"
            className="relative isolate mt-6 overflow-hidden rounded-3xl bg-ink p-5 text-white sm:p-6"
          >
            <div className="absolute -right-16 -top-16 -z-10 h-48 w-48 rounded-full bg-primary/30 blur-[80px]" />
            <h2 id="apply-title" className="font-display text-xl font-semibold sm:text-2xl">
              {t.applyTitle}
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-white/70">{t.applyBody}</p>
            <ul className="mt-5 grid gap-2">
              {PORTALS.map((p, i) => (
                <li
                  key={p.id}
                  className="flex flex-col gap-3 rounded-2xl bg-white/[0.06] p-3 ring-1 ring-white/10 sm:flex-row sm:items-center"
                >
                  <span className="flex min-w-0 flex-1 items-center gap-3">
                    <span className="flex h-10 min-w-10 shrink-0 items-center justify-center rounded-xl bg-primary px-2 font-display text-xs font-bold text-primary-foreground">
                      {p.initials}
                    </span>
                    <span className="min-w-0">
                      <span className="flex flex-wrap items-center gap-2 font-semibold leading-tight">
                        {p.name}
                        {i === 0 && (
                          <span className="rounded-full bg-primary/20 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-primary">
                            {t.primary}
                          </span>
                        )}
                      </span>
                      <span className="block text-xs leading-snug text-white/60">
                        {p.blurb[lang]}
                      </span>
                    </span>
                  </span>
                  <PortalButton
                    portal={p}
                    lang={lang}
                    short
                    className="min-h-11 w-full shrink-0 bg-primary text-primary-foreground hover:brightness-110 sm:w-auto"
                  />
                </li>
              ))}
              {/* Special option: the store's own In-House Financing */}
              <li>
                <Link
                  to={ALTERNATES.inHouse[lang]}
                  className="flex flex-col gap-3 rounded-2xl bg-primary/15 p-3 ring-1 ring-primary/40 transition hover:bg-primary/25 sm:flex-row sm:items-center"
                >
                  <span className="flex min-w-0 flex-1 items-center gap-3">
                    <span className="flex h-10 min-w-10 shrink-0 items-center justify-center rounded-xl bg-white px-2 text-ink">
                      <Store className="h-5 w-5" />
                    </span>
                    <span className="min-w-0">
                      <span className="flex flex-wrap items-center gap-2 font-semibold leading-tight">
                        {IN_HOUSE.name[lang]}
                        <span className="rounded-full bg-primary px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-primary-foreground">
                          {IN_HOUSE.kicker[lang]}
                        </span>
                      </span>
                      <span className="block text-xs leading-snug text-white/70">{IN_HOUSE.blurb[lang]}</span>
                    </span>
                  </span>
                  <span className="inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-full bg-white px-5 text-sm font-bold text-ink sm:w-auto">
                    {IN_HOUSE.cta[lang]} <ArrowRight className="h-4 w-4" />
                  </span>
                </Link>
              </li>
            </ul>
            <p className="mt-4 flex items-start gap-2 text-xs leading-relaxed text-white/60">
              <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
              {t.noCheckout}
            </p>
            <div className="mt-4 grid gap-2 sm:grid-cols-2">
              <a
                href={TEL}
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-white/10 px-5 text-sm font-bold transition hover:bg-white/20"
              >
                <Phone className="h-4 w-4" /> {t.call}
              </a>
              <a
                href={DIRECTIONS}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-white/20 px-5 text-sm font-bold transition hover:border-white/60"
              >
                <MapPin className="h-4 w-4" /> {t.directions}
              </a>
            </div>
          </section>

          {/* Every option at a glance, closed by default to keep the page simple */}
          {device.options.length > 1 && (
            <details className="group mt-6 rounded-2xl border bg-card">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-4 py-3.5 font-semibold [&::-webkit-details-marker]:hidden">
                {t.compare}
                <ChevronDown className="h-4 w-4 transition group-open:rotate-180" />
              </summary>
              <table className="w-full border-t text-xs sm:text-sm">
                <thead className="bg-secondary text-left text-[11px] uppercase tracking-wider text-muted-foreground">
                  <tr>
                    <th className="px-3 py-2.5 font-semibold sm:px-4">{t.option}</th>
                    <th className="px-3 py-2.5 text-right font-semibold sm:px-4">{t.leasingPrice}</th>
                    <th className="px-3 py-2.5 text-right font-semibold sm:px-4">{t.freq[frequency]}</th>
                  </tr>
                </thead>
                <tbody className="tabular-nums">
                  {device.options.map((x) => (
                    <tr key={x.label.en} className="border-t">
                      <td className="px-3 py-3 font-medium sm:px-4">{x.label[lang]}</td>
                      <td className="px-3 py-3 text-right sm:px-4">
                        <LeaseMoney usd={x.lease} />
                      </td>
                      <td className="px-3 py-3 text-right font-semibold text-primary sm:px-4">
                        <LeaseMoney usd={payment(x, frequency)} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </details>
          )}
          <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
            {t.updated(LEASE_PRICES_UPDATED)} {t.fine}
          </p>
        </div>
      </section>

      {related.length > 0 && (
        <section className="mx-auto max-w-7xl px-5 pb-4">
          <h2 className="text-3xl font-semibold">{t.more(category.title[lang])}</h2>
          <ul className="mt-6 grid grid-cols-1 gap-3 min-[420px]:grid-cols-2 sm:gap-5 lg:grid-cols-4">
            {related.map((d) => (
              <li key={d.id}>
                <LeaseCard device={d} lang={lang} />
              </li>
            ))}
          </ul>
        </section>
      )}

      <Steps lang={lang} />
      <SiteFooter lang={lang} portals={false} />
    </main>
  );
}
