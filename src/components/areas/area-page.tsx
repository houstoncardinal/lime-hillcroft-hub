import { Link } from "@tanstack/react-router";
import { MoneyText } from "@/components/intl/money";
import {
  ArrowRight,
  ArrowUpRight,
  Car,
  Clock,
  KeyRound,
  MapPin,
  Navigation,
  Phone,
  Receipt,
  ShoppingBag,
  Smartphone,
  Star,
  Timer,
  Wrench,
} from "lucide-react";

import plaza from "@/assets/photos/plaza.webp";
import plazaSm from "@/assets/photos/plaza-sm.webp";
import storefront from "@/assets/photos/storefront-3640.webp";
import storefrontSm from "@/assets/photos/storefront-3640-sm.webp";
import { areaCopy, routeSteps } from "@/components/areas/copy";
import { AREAS, areaName, shortName, type Area } from "@/components/areas/data";
import { LOCAL } from "@/components/areas/local";
import { areaPath, areaPaths, directionsFrom } from "@/components/areas/paths";
import { PHONE, TEL } from "@/components/site/business";
import { MobileCallBar, OpenBadge, SiteFooter, SiteHeader } from "@/components/site/chrome";
import { FaqList } from "@/components/site/faq";
import { DotRing } from "@/components/site/logo";
import { Photo } from "@/components/site/photo";
import { ReviewQuotes } from "@/components/reviews/review-quotes";
import { ALTERNATES, type Lang } from "@/components/site/seo";

const SERVICE_ICONS = [Wrench, Smartphone, KeyRound, Receipt, ShoppingBag];
const STAT_ICONS = [Car, Timer, MapPin, Clock];

export function AreaPage({ area, lang }: { area: Area; lang: Lang }) {
  const t = areaCopy(area, lang);
  const short = shortName(area);
  const local = LOCAL[area.slug];
  const nearby = area.nearby
    .map((slug) => AREAS.find((a) => a.slug === slug))
    .filter((a): a is Area => Boolean(a));

  return (
    <main className="overflow-x-hidden">
      <SiteHeader lang={lang} paths={areaPaths(area.slug)} />

      {/* Hero */}
      <section className="relative isolate overflow-hidden bg-ink text-white">
        <div className="grain absolute inset-0 -z-10 opacity-60" />
        <div className="absolute -right-40 top-0 -z-10 h-[36rem] w-[36rem] rounded-full bg-primary/20 blur-[150px]" />
        <DotRing
          className="animate-spin-slow absolute -right-24 top-16 -z-10 hidden h-[26rem] w-[26rem] opacity-40 lg:block"
          rings={[
            { r: 92, count: 26, dot: 2.6, className: "fill-primary" },
            { r: 76, count: 22, dot: 2.2, className: "fill-slate" },
          ]}
        />
        <div className="mx-auto max-w-7xl px-5 pb-24 pt-32 md:pb-28 md:pt-40">
          <nav
            aria-label="Breadcrumb"
            className="mb-8 flex flex-wrap items-center gap-1.5 text-sm text-white/60"
          >
            <Link to={ALTERNATES.home[lang]} className="hover:text-white">
              TIC Wireless Electronic & Repair Center
            </Link>
            <span>/</span>
            <Link to={ALTERNATES.areas[lang]} className="hover:text-white">
              {<MoneyText text={t.allAreas} />}
            </Link>
            <span>/</span>
            <span className="text-white">{short}</span>
          </nav>
          <p className="eyebrow flex items-center gap-3 text-primary">
            <span className="h-px w-8 bg-primary" /> {<MoneyText text={t.kicker} />}
          </p>
          <h1 className="mt-5 max-w-4xl text-[clamp(2.5rem,6vw,5rem)] font-semibold leading-[0.98]">
            {<MoneyText text={t.h1[0]} />}{" "}
            <span className="text-primary">{<MoneyText text={t.h1[1]} />}</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/75">{area.intro[lang]}</p>
          <p className="mt-4 max-w-2xl text-lg font-medium text-white">
            {<MoneyText text={t.distance} />}
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <a
              href={TEL}
              className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 font-semibold text-primary-foreground transition hover:brightness-110"
            >
              <Phone className="h-4 w-4" /> {<MoneyText text={t.call} />} {PHONE}
            </a>
            <a
              href={directionsFrom(short)}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 px-7 py-3.5 font-semibold transition hover:border-white/60"
            >
              <Navigation className="h-4 w-4" /> {<MoneyText text={t.directions} />}
            </a>
          </div>
          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-white/10 pt-6 text-sm text-white/70">
            <span className="flex items-center gap-1.5">
              <Star className="h-4 w-4 fill-primary text-primary" /> {<MoneyText text={t.rating} />}
            </span>
            <OpenBadge lang={lang} />
          </div>
        </div>
      </section>

      {/* Stats: a card that overlaps the bottom of the hero. It's positioned (z-10) so it paints
          above the hero instead of being clipped by it. */}
      <section className="relative z-10 mx-auto -mt-12 max-w-7xl px-4 sm:px-5 md:-mt-14">
        <ul className="grid grid-cols-2 overflow-hidden rounded-3xl border bg-card shadow-xl shadow-ink/10 lg:grid-cols-4">
          {t.stats.map(([label, value], i) => {
            const Icon = STAT_ICONS[i] ?? MapPin;
            return (
              <li
                key={label}
                className="flex flex-col gap-3 border-border p-4 odd:border-r [&:nth-child(-n+2)]:border-b sm:flex-row sm:items-center sm:gap-4 sm:p-6 lg:border-r lg:[&:nth-child(-n+2)]:border-b-0 lg:last:border-r-0"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary sm:h-12 sm:w-12">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <span className="min-w-0">
                  <span className="block text-[11px] font-semibold uppercase tracking-wider text-muted-foreground sm:text-xs">
                    {label}
                  </span>
                  <span className="mt-0.5 block font-display text-lg font-semibold leading-snug sm:text-xl">
                    {/* Hours read better as one line per day range. */}
                    {value.split(" · ").map((part) => (
                      <span key={part} className="block break-words">
                        <MoneyText text={part} />
                      </span>
                    ))}
                  </span>
                </span>
              </li>
            );
          })}
        </ul>
      </section>

      {/* Local: why this area chooses TIC + about the area */}
      {local && (
        <section className="mx-auto max-w-7xl px-5 pt-20 md:pt-28">
          <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr]">
            <div>
              <h2 className="text-3xl font-semibold leading-tight md:text-5xl">
                {<MoneyText text={t.whyTitle} />}
              </h2>
              <ul className="mt-8 grid gap-4 sm:grid-cols-3">
                {local.highlights[lang].map(([title, body], i) => (
                  <li key={title} className="rounded-3xl bg-ink p-6 text-white">
                    <span className="font-display text-sm font-semibold text-primary">
                      0{i + 1}
                    </span>
                    <p className="mt-3 font-semibold leading-snug">{<MoneyText text={title} />}</p>
                    <p className="mt-2 text-sm leading-relaxed text-white/65">
                      {<MoneyText text={body} />}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
            <aside className="rounded-3xl border bg-card p-7 lg:self-end">
              <h2 className="eyebrow text-slate">{<MoneyText text={t.aboutTitle} />}</h2>
              <p className="mt-4 leading-relaxed text-muted-foreground">
                {<MoneyText text={local.about[lang]} />}
              </p>
            </aside>
          </div>
        </section>
      )}

      {/* Services */}
      <section className="mx-auto max-w-7xl px-5 py-20 md:py-28">
        <h2 className="text-3xl font-semibold leading-tight md:text-5xl">
          {<MoneyText text={t.servicesTitle} />}
        </h2>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {t.services.map(([title, body, href], i) => {
            const Icon = SERVICE_ICONS[i] ?? Wrench;
            return (
              <Link
                key={title}
                to={href}
                className="group flex flex-col rounded-3xl border bg-card p-6 transition hover:-translate-y-1 hover:shadow-xl hover:shadow-ink/5"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-secondary text-ink transition group-hover:bg-primary">
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="mt-5 font-semibold">{<MoneyText text={title} />}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {<MoneyText text={body} />}
                </p>
                <ArrowRight className="mt-4 h-4 w-4 text-primary transition group-hover:translate-x-1" />
              </Link>
            );
          })}
        </div>
      </section>

      {/* Route */}
      <section className="bg-ink text-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-20 md:py-28 lg:grid-cols-[1fr_1.1fr] lg:items-center">
          <div>
            <h2 className="text-3xl font-semibold leading-tight md:text-5xl">
              {<MoneyText text={t.routeTitle} />}
            </h2>
            <ol className="mt-8 space-y-4">
              {[
                ...routeSteps(area, lang),
                "TIC Wireless Electronic & Repair Center · 3640 Hillcroft St, Suite C",
              ].map((step, i, all) => (
                <li key={step} className="flex items-start gap-4">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary font-display text-sm font-semibold text-primary-foreground">
                    {i === all.length - 1 ? <MapPin className="h-4 w-4" /> : i + 1}
                  </span>
                  <span className="pt-1 text-lg">{<MoneyText text={step} />}</span>
                </li>
              ))}
            </ol>
            <p className="mt-6 text-white/70">{<MoneyText text={t.routeEnd} />}</p>
            <p className="mt-2 text-xs text-white/65">{<MoneyText text={t.routeNote} />}</p>
            <a
              href={directionsFrom(short)}
              target="_blank"
              rel="noreferrer"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 font-semibold text-primary-foreground transition hover:brightness-110"
            >
              {<MoneyText text={t.directions} />} <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="col-span-2 overflow-hidden rounded-3xl">
              <Photo
                src={storefront}
                srcSm={storefrontSm}
                width={2000}
                height={1500}
                sizes="(min-width: 1024px) 50vw, 100vw"
                alt={
                  lang === "es"
                    ? "Fachada de vidrio de TIC Wireless Electronic & Repair Center en 3640 Hillcroft St, Suite C, Houston"
                    : "The glass storefront of TIC Wireless Electronic & Repair Center at 3640 Hillcroft St, Suite C, Houston"
                }
                className="aspect-[16/10]"
              />
            </div>
            <div className="overflow-hidden rounded-3xl">
              <Photo
                src={plaza}
                srcSm={plazaSm}
                width={2000}
                height={1500}
                sizes="(min-width: 1024px) 25vw, 50vw"
                alt={
                  lang === "es"
                    ? "El centro comercial de 3640 Hillcroft St, Suite C visto desde el estacionamiento"
                    : "The shopping center at 3640 Hillcroft St, Suite C from the parking lot"
                }
                className="aspect-[4/3]"
              />
            </div>
            <iframe
              title={`${lang === "es" ? "Mapa: TIC Wireless Electronic & Repair Center cerca de" : "Map: TIC Wireless Electronic & Repair Center near"} ${short}`}
              loading="lazy"
              className="aspect-[4/3] h-full w-full rounded-3xl border-0"
              src={`https://maps.google.com/maps?q=TIC%20Wireless%2C%203640%20Hillcroft%20St%2C%20Suite%20C%2C%20Houston%2C%20TX%2077057&z=13&hl=${lang}&output=embed`}
            />
          </div>
        </div>
      </section>

      <ReviewQuotes pick="general" lang={lang} />

      {/* FAQ */}
      <section className="mx-auto max-w-7xl px-5 py-20 md:py-28">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.6fr]">
          <h2 className="text-3xl font-semibold leading-tight md:text-5xl">
            {<MoneyText text={t.faqTitle} />}
          </h2>
          <FaqList items={t.faqs} />
        </div>
      </section>

      {/* Nearby */}
      <section className="border-t bg-secondary/60">
        <div className="mx-auto max-w-7xl px-5 py-16">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 className="text-2xl font-semibold md:text-3xl">
              {<MoneyText text={t.nearbyTitle} />}
            </h2>
            <Link
              to={ALTERNATES.areas[lang]}
              className="tap inline-flex items-center gap-1.5 font-semibold text-ink underline decoration-primary decoration-2 underline-offset-4"
            >
              {<MoneyText text={t.allAreas} />} <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {nearby.map((n) => (
              <AreaCard key={n.slug} area={n} lang={lang} />
            ))}
          </div>
        </div>
      </section>

      <SiteFooter lang={lang} />
      <MobileCallBar lang={lang} />
    </main>
  );
}

export function AreaCard({ area, lang }: { area: Area; lang: Lang }) {
  return (
    <Link
      to={areaPath(lang, area.slug)}
      className="group flex flex-col rounded-3xl border bg-card p-6 transition hover:-translate-y-1 hover:shadow-xl hover:shadow-ink/5"
    >
      <span className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        <MapPin className="h-3.5 w-3.5 text-primary" /> {area.zips.join(" · ")}
      </span>
      <span className="mt-3 font-display text-xl font-semibold leading-snug group-hover:text-primary">
        {areaName(area, lang)}
      </span>
      <span className="mt-auto flex items-center gap-4 pt-5 text-sm text-muted-foreground">
        <span className="flex items-center gap-1.5">
          <Car className="h-4 w-4" /> {area.miles.toFixed(1)} mi
        </span>
        <span className="flex items-center gap-1.5">
          <Clock className="h-4 w-4" /> ~{area.minutes} min
        </span>
        <ArrowRight className="ml-auto h-4 w-4 text-primary transition group-hover:translate-x-1" />
      </span>
    </Link>
  );
}
