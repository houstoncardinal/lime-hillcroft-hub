import { Link } from "@tanstack/react-router";
import { ArrowRight, CircleCheck, MapPin, MessageCircleQuestion, Phone } from "lucide-react";

import { MoneyText } from "@/components/intl/money";
import { findService, type Service } from "@/components/services/data";
import { SERVICES_HUB } from "@/components/services/hub-copy";
import { servicePath, servicePaths } from "@/components/services/paths";
import { SERVICE_ICONS } from "@/components/services/icons";
import { SERVICE_PHOTOS } from "@/components/services/photos";
import { PrepaidPlans } from "@/components/services/prepaid-section";
import { ADDRESS, DIRECTIONS, HOURS, PHONE, TEL } from "@/components/site/business";
import { OpenBadge, SiteFooter, SiteHeader } from "@/components/site/chrome";
import { FaqList } from "@/components/site/faq";
import { LatestDevices } from "@/components/products/latest-devices";
import { PHONES } from "@/components/products/inventory";
import { LeasingPortals } from "@/components/site/leasing-portals";
import { NearYou } from "@/components/site/near-you";
import { Photo } from "@/components/site/photo";
import { ALTERNATES, type Lang } from "@/components/site/seo";
import { cn } from "@/lib/utils";
import { type ReviewPick } from "@/components/reviews/picks";
import { ReviewQuotes } from "@/components/reviews/review-quotes";

// Which real Google reviews each service page shows (see REVIEW_PICKS).
const SERVICE_REVIEWS: Record<string, ReviewPick> = {
  "unlocked-phones": "phones",
  "phone-repair": "repair",
  "iphone-repair": "repair",
  "samsung-repair": "repair",
  "prepaid-plans": "plans",
  "bill-payments": "bills",
  "buy-sell-trade": "trade",
};

const UI = {
  en: {
    home: "Home",
    call: "Call",
    directions: "Directions",
    faq: "Common questions",
    visit: "Visit the store",
    visitBody: "Walk in — no appointment needed. Se habla español.",
    hours: [
      ["Monday – Saturday", "9:00 AM – 8:00 PM"],
      ["Sunday", "9:00 AM – 5:00 PM"],
    ],
    related: "More services",
    leasing: "Leasing on consoles, laptops & phones",
  },
  es: {
    home: "Inicio",
    call: "Llamar",
    directions: "Cómo llegar",
    faq: "Preguntas frecuentes",
    visit: "Visita la tienda",
    visitBody: "Ven sin cita. We speak English.",
    hours: [
      ["Lunes – Sábado", "9:00 AM – 8:00 PM"],
      ["Domingo", "9:00 AM – 5:00 PM"],
    ],
    related: "Más servicios",
    leasing: "Consolas, laptops y celulares a pagos",
  },
};

export function ServicePage({ service, lang }: { service: Service; lang: Lang }) {
  const t = service.text[lang];
  const ui = UI[lang];
  const hub = SERVICES_HUB[lang];
  const Icon = SERVICE_ICONS[service.icon];
  const photo = SERVICE_PHOTOS[service.photo];
  const related = service.related.map(findService).filter((s): s is Service => Boolean(s));
  const hours = lang === "en" ? HOURS : ui.hours;

  return (
    <main className="overflow-x-hidden">
      <SiteHeader lang={lang} paths={servicePaths(service.slug)} />

      <section className="relative isolate overflow-hidden bg-ink text-white">
        <div className="grain absolute inset-0 -z-10 opacity-60" />
        <div className="absolute -left-40 -top-20 -z-10 h-[32rem] w-[32rem] rounded-full bg-primary/20 blur-[150px]" />
        <div className="mx-auto grid max-w-7xl gap-8 px-5 pb-12 pt-28 md:pb-16 md:pt-32 lg:grid-cols-[1.2fr_1fr] lg:items-center">
          <div>
            <nav
              aria-label="Breadcrumb"
              className="mb-8 flex flex-wrap items-center gap-1.5 text-sm text-white/60"
            >
              <Link to={ALTERNATES.home[lang]} className="hover:text-white">
                {ui.home}
              </Link>
              <span>/</span>
              <Link to={ALTERNATES.services[lang]} className="hover:text-white">
                {hub.breadcrumb[1]}
              </Link>
              <span>/</span>
              <span className="text-white/85">{t.name}</span>
            </nav>
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
              <Icon className="h-5 w-5" />
            </span>
            <h1 className="mt-6 text-[clamp(2.25rem,5.5vw,4.5rem)] font-semibold leading-[1.02]">
              {t.h1}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/75">
              <MoneyText text={t.intro} />
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={TEL}
                className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3.5 font-semibold text-primary-foreground transition hover:brightness-110"
              >
                <Phone className="h-4 w-4" /> {t.cta}
                <span className="hidden sm:inline">· {PHONE}</span>
              </a>
              <a
                href={DIRECTIONS}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3.5 font-semibold transition hover:border-white/60"
              >
                <MapPin className="h-4 w-4" /> {ui.directions}
              </a>
            </div>
            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {t.why.map((w) => (
                <li key={w} className="flex items-center gap-2 text-white/85">
                  <CircleCheck className="h-5 w-5 shrink-0 text-primary" /> {w}
                </li>
              ))}
            </ul>
          </div>
          <figure
            className={cn(
              "relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-white/10",
              photo.fit === "contain" && "bg-white",
            )}
          >
            <Photo
              src={photo.src}
              srcSm={photo.sm}
              width={photo.w}
              height={photo.h}
              sizes="(min-width: 1024px) 40vw, 100vw"
              alt={t.imageAlt}
              priority
              {...(photo.fit === "contain" ? { className: "object-contain px-6 pb-16 pt-8" } : {})}
              {...(photo.focus ? { style: { objectPosition: photo.focus } } : {})}
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/90 to-transparent p-6 pt-14">
              <OpenBadge lang={lang} />
            </div>
            {photo.credit && (
              <figcaption className="absolute right-3 top-3 rounded-full bg-ink/60 px-2.5 py-1 text-[11px] text-white/80 backdrop-blur">
                <a
                  href={photo.credit.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  {photo.credit.text}
                </a>
              </figcaption>
            )}
          </figure>
        </div>
      </section>

      {service.slug === "prepaid-plans" && <PrepaidPlans lang={lang} />}
      {service.slug === "unlocked-phones" && (
        <>
          <LatestDevices devices={PHONES} lang={lang} limit={16} className="bg-secondary/40" />
          <LeasingPortals lang={lang} />
        </>
      )}

      <div className="mx-auto max-w-7xl px-5 py-12 md:py-16">
        <div className="grid gap-8 lg:grid-cols-2">
          <section aria-labelledby="offers">
            <h2 id="offers" className="text-3xl font-semibold md:text-4xl">
              {t.offersTitle}
            </h2>
            <ul className="mt-8 space-y-4">
              {t.offers.map((o) => (
                <li key={o} className="flex gap-3 text-lg leading-relaxed">
                  <CircleCheck className="mt-1 h-5 w-5 shrink-0 text-primary" />
                  <span>
                    <MoneyText text={o} />
                  </span>
                </li>
              ))}
            </ul>
            {t.links && (
              <ul className="mt-8 flex flex-wrap gap-2">
                {t.links.map(([label, href]) => (
                  <li key={href}>
                    <Link
                      to={href}
                      className="group inline-flex min-h-11 items-center gap-1.5 rounded-full border px-5 font-semibold transition hover:border-primary hover:text-primary"
                    >
                      {label}
                      <ArrowRight className="h-4 w-4 text-primary transition group-hover:translate-x-0.5" />
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </section>

          <section aria-labelledby="steps" className="rounded-3xl bg-secondary/70 p-7 md:p-10">
            <h2 id="steps" className="text-3xl font-semibold md:text-4xl">
              {t.stepsTitle}
            </h2>
            <ol className="mt-8 space-y-6">
              {t.steps.map(([h, p], i) => (
                <li key={h} className="flex gap-4">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-ink font-display text-sm font-semibold text-white">
                    {i + 1}
                  </span>
                  <div>
                    <h3 className="font-display text-lg font-semibold">{h}</h3>
                    <p className="mt-1 leading-relaxed text-muted-foreground">{p}</p>
                  </div>
                </li>
              ))}
            </ol>
          </section>
        </div>

        <section className="mt-14 max-w-4xl">
          <h2 className="flex items-center gap-2 text-3xl font-semibold md:text-4xl">
            <MessageCircleQuestion className="h-7 w-7 text-primary" /> {ui.faq}
          </h2>
          <div className="mt-6">
            <FaqList items={t.faq} />
          </div>
        </section>

        <aside className="mt-14 grid gap-8 rounded-3xl bg-ink p-8 text-white md:grid-cols-[1.4fr_1fr] md:p-12">
          <div>
            <h2 className="text-3xl font-semibold">{ui.visit}</h2>
            <p className="mt-2 text-white/70">{ui.visitBody}</p>
            <address className="mt-6 not-italic text-lg">{ADDRESS}</address>
            <div className="mt-6 flex flex-wrap gap-2">
              <a
                href={TEL}
                className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 font-semibold text-primary-foreground transition hover:brightness-110"
              >
                <Phone className="h-4 w-4" /> {PHONE}
              </a>
              <a
                href={DIRECTIONS}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 px-5 py-3 font-semibold transition hover:border-white/60"
              >
                <MapPin className="h-4 w-4" /> {ui.directions}
              </a>
            </div>
          </div>
          <dl className="space-y-3 self-center">
            {hours.map(([d, h]) => (
              <div key={d} className="flex justify-between gap-6 border-b border-white/10 pb-3">
                <dt className="text-white/70">{d}</dt>
                <dd className="font-semibold">{h}</dd>
              </div>
            ))}
          </dl>
        </aside>
      </div>

      <ReviewQuotes
        pick={SERVICE_REVIEWS[service.slug] ?? "general"}
        lang={lang}
        className="border-t"
      />
      <NearYou lang={lang} />

      <section className="border-t bg-secondary/60">
        <div className="mx-auto max-w-7xl px-5 py-12">
          <h2 className="text-2xl font-semibold md:text-3xl">{ui.related}</h2>
          <div className="mt-8 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
            {related.map((s) => (
              <ServiceCard key={s.slug} service={s} lang={lang} />
            ))}
            <Link
              to={ALTERNATES.leasing[lang]}
              className="group flex flex-col justify-between gap-6 rounded-3xl bg-primary p-6 text-primary-foreground transition hover:-translate-y-1"
            >
              <span className="font-display text-lg font-semibold leading-snug">{ui.leasing}</span>
              <ArrowRight className="h-5 w-5 transition group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>

      <SiteFooter lang={lang} portals={service.slug !== "unlocked-phones"} />
    </main>
  );
}

export function ServiceCard({ service, lang }: { service: Service; lang: Lang }) {
  const Icon = SERVICE_ICONS[service.icon];
  const t = service.text[lang];
  return (
    <Link
      to={servicePath(lang, service.slug)}
      className="group flex flex-col rounded-3xl border bg-card p-4 transition hover:-translate-y-1 hover:shadow-xl hover:shadow-ink/5 sm:p-6"
    >
      <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-secondary text-ink transition group-hover:bg-primary">
        <Icon className="h-5 w-5" />
      </span>
      <span className="mt-3 font-display font-semibold leading-snug group-hover:text-primary sm:mt-5 sm:text-lg">
        {t.name}
      </span>
      <span className="mt-1.5 line-clamp-3 text-[13px] leading-snug text-muted-foreground sm:mt-2 sm:text-sm sm:leading-relaxed">
        {t.metaDescription}
      </span>
      <span className="mt-auto flex items-center gap-1 pt-3 text-sm font-semibold text-ink sm:pt-5">
        {SERVICES_HUB[lang].more}
        <ArrowRight className="h-4 w-4 text-primary transition group-hover:translate-x-1" />
      </span>
    </Link>
  );
}
