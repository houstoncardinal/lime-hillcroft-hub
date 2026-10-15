import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  Accessibility,
  ArrowRight,
  ArrowUpRight,
  Car,
  Clock,
  Footprints,
  Languages,
  Map as MapIcon,
  MapPin,
  Phone,
  Store,
} from "lucide-react";

import apple from "@/assets/photos/apple-display.webp";
import appleSm from "@/assets/photos/apple-display-sm.webp";
import caseWall from "@/assets/photos/case-wall.webp";
import caseWallSm from "@/assets/photos/case-wall-sm.webp";
import consoles from "@/assets/photos/consoles-wide.webp";
import consolesSm from "@/assets/photos/consoles-wide-sm.webp";
import counter from "@/assets/photos/store-counter.webp";
import counterSm from "@/assets/photos/store-counter-sm.webp";
import jbl from "@/assets/photos/jbl-display.webp";
import jblSm from "@/assets/photos/jbl-display-sm.webp";
import laptops from "@/assets/photos/laptops-tablets.webp";
import laptopsSm from "@/assets/photos/laptops-tablets-sm.webp";
import phones from "@/assets/photos/phones-display.webp";
import phonesSm from "@/assets/photos/phones-display-sm.webp";
import plaza from "@/assets/photos/plaza.webp";
import plazaSm from "@/assets/photos/plaza-sm.webp";
import storefront from "@/assets/photos/storefront-3640.webp";
import storefrontSm from "@/assets/photos/storefront-3640-sm.webp";
import { AREAS, areaName } from "@/components/areas/data";
import { areaPath } from "@/components/areas/paths";
import { LOCATION_COPY, routeStep, type GalleryPhoto } from "@/components/location/copy";
import { SERVICES } from "@/components/services/data";
import { ServiceCard } from "@/components/services/service-page";
import { DIRECTIONS, MAPS, PHONE, TEL, hoursOn } from "@/components/site/business";
import { MobileCallBar, OpenBadge, SiteFooter, SiteHeader, Stars } from "@/components/site/chrome";
import { FaqList } from "@/components/site/faq";
import { Photo } from "@/components/site/photo";
import { StoreVideo } from "@/components/site/store-video";
import { ReviewsCarousel } from "@/components/reviews/reviews-carousel";
import { ALTERNATES, type Lang } from "@/components/site/seo";
import { cn } from "@/lib/utils";

const PHOTOS: Record<GalleryPhoto, { src: string; sm: string; w: number; h: number }> = {
  storefront: { src: storefront, sm: storefrontSm, w: 2000, h: 1500 },
  plaza: { src: plaza, sm: plazaSm, w: 2000, h: 1500 },
  phones: { src: phones, sm: phonesSm, w: 1600, h: 1200 },
  counter: { src: counter, sm: counterSm, w: 2000, h: 1500 },
  caseWall: { src: caseWall, sm: caseWallSm, w: 2000, h: 1500 },
  apple: { src: apple, sm: appleSm, w: 1500, h: 2000 },
  jbl: { src: jbl, sm: jblSm, w: 2000, h: 1500 },
  laptops: { src: laptops, sm: laptopsSm, w: 2000, h: 1400 },
  consoles: { src: consoles, sm: consolesSm, w: 1240, h: 720 },
};

const FACT_ICONS = [MapPin, Phone, Car, Accessibility, Languages, Footprints];

const MAP_EMBED = (lang: Lang) =>
  `https://maps.google.com/maps?q=TIC%20Wireless%2C%203640%20Hillcroft%20St%2C%20Suite%20C%2C%20Houston%2C%20TX%2077057&z=16&hl=${lang}&output=embed`;

const GOOGLE_REVIEWS = "https://www.google.com/maps?cid=10667472323669212127";

/** Day of the week in Houston (0 = Sunday), once the page is running in the browser. */
function useHoustonDay() {
  const [day, setDay] = useState<number | null>(null);
  useEffect(() => {
    const name = new Intl.DateTimeFormat("en-US", {
      timeZone: "America/Chicago",
      weekday: "short",
    }).format(new Date());
    setDay(["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(name));
  }, []);
  return day;
}

const fmtHour = (h: number) => `${h > 12 ? h - 12 : h}:00 ${h >= 12 ? "PM" : "AM"}`;

function SectionTitle({
  kicker,
  title,
  light,
}: {
  kicker: string;
  title: string;
  light?: boolean;
}) {
  return (
    <>
      <p className={cn("eyebrow", light ? "text-primary" : "text-ink/60")}>{kicker}</p>
      <h2 className="mt-3 text-3xl font-semibold leading-[1.05] sm:text-4xl md:text-5xl">
        {title}
      </h2>
    </>
  );
}

export function LocationPage({ lang }: { lang: Lang }) {
  const t = LOCATION_COPY[lang];
  const today = useHoustonDay();
  const [mapOn, setMapOn] = useState(false);
  // Monday first, like the sign on the door.
  const week = [1, 2, 3, 4, 5, 6, 0];
  const areas = [...AREAS].sort((a, b) => a.minutes - b.minutes || a.miles - b.miles);

  return (
    <main className="overflow-x-hidden">
      <SiteHeader lang={lang} paths={ALTERNATES.location} />

      {/* Hero */}
      <section className="relative isolate overflow-hidden bg-ink text-white">
        <div className="grain absolute inset-0 -z-10 opacity-60" />
        <div className="absolute -left-40 -top-20 -z-10 h-[30rem] w-[30rem] rounded-full bg-primary/20 blur-[150px]" />
        <div className="mx-auto grid max-w-7xl gap-10 px-5 pb-14 pt-28 sm:pt-32 md:pb-20 md:pt-40 lg:grid-cols-[1.1fr_1fr] lg:items-center">
          <div>
            <nav aria-label="Breadcrumb" className="text-sm text-white/60">
              <Link to={ALTERNATES.home[lang]} className="hover:text-white">
                {t.meta.breadcrumb[0]}
              </Link>
              <span className="mx-2">/</span>
              <span className="text-white">{t.meta.breadcrumb[1]}</span>
            </nav>
            <p className="eyebrow mt-6 flex items-center gap-3 text-primary">
              <span className="h-px w-8 bg-primary" /> {t.hero.kicker}
            </p>
            <h1 className="mt-5 text-[clamp(2.1rem,6vw,4.25rem)] font-semibold leading-[1.02]">
              {t.hero.h1[0]} <span className="text-primary">{t.hero.h1[1]}</span>
            </h1>
            <p className="mt-6 max-w-xl text-base text-white/75 sm:text-lg">{t.hero.body}</p>
            <OpenBadge lang={lang} className="mt-6 text-white/85" />
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href={DIRECTIONS}
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 font-semibold text-primary-foreground transition hover:brightness-110"
              >
                <MapPin className="h-4 w-4" /> {t.hero.directions}
              </a>
              <a
                href={TEL}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-white/20 px-6 py-3 font-semibold transition hover:border-white/60"
              >
                <Phone className="h-4 w-4" /> {t.hero.call} · {PHONE}
              </a>
            </div>
          </div>
          <figure className="relative aspect-[4/3] overflow-hidden rounded-3xl ring-1 ring-white/10 md:aspect-[16/9] lg:aspect-[4/3]">
            <Photo
              src={storefront}
              srcSm={storefrontSm}
              width={2000}
              height={1500}
              sizes="(min-width: 1024px) 45vw, 100vw"
              alt={t.hero.photoAlt}
              priority
              className="absolute inset-0"
            />
            <figcaption className="absolute left-3 top-3 inline-flex items-center gap-2 rounded-full bg-ink/80 px-3 py-1.5 text-xs font-semibold backdrop-blur sm:left-4 sm:top-4 sm:text-sm">
              <Store className="h-4 w-4 text-primary" /> Suite C
            </figcaption>
          </figure>
        </div>
      </section>

      {/* Quick facts + hours */}
      <section className="mx-auto max-w-7xl px-5 py-14 md:py-20">
        <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
          <ul className="grid content-start gap-3 sm:grid-cols-2">
            {t.facts.map(([label, value], i) => {
              const Icon = FACT_ICONS[i] ?? MapPin;
              const body = <span className="whitespace-pre-line font-semibold">{value}</span>;
              return (
                <li key={label} className="flex gap-4 rounded-2xl border bg-card p-5">
                  <span
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-secondary text-ink"
                    aria-hidden="true"
                  >
                    <Icon className="h-5 w-5" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-sm text-muted-foreground">{label}</p>
                    <p className="mt-0.5">
                      {i === 1 ? (
                        <a href={TEL} className="tap font-semibold text-primary">
                          {value}
                        </a>
                      ) : (
                        body
                      )}
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>

          <div className="rounded-3xl bg-ink p-6 text-white sm:p-8">
            <h2 className="flex items-center gap-2 font-display text-2xl font-semibold">
              <Clock className="h-5 w-5 text-primary" /> {t.hours.title}
            </h2>
            <OpenBadge lang={lang} className="mt-3 text-white/80" />
            <dl className="mt-6">
              {week.map((d) => {
                const [open, close] = hoursOn(d);
                const isToday = today === d;
                return (
                  <div
                    key={d}
                    className={cn(
                      "flex justify-between gap-4 border-t border-white/10 px-3 py-2.5 text-sm",
                      isToday && "rounded-xl border-transparent bg-white/10 font-semibold",
                    )}
                  >
                    <dt className={isToday ? "text-white" : "text-white/65"}>
                      {t.hours.days[d]}
                      {isToday && <span className="ml-2 text-primary">· {t.hours.today}</span>}
                    </dt>
                    <dd>
                      {fmtHour(open)} – {fmtHour(close)}
                    </dd>
                  </div>
                );
              })}
            </dl>
            <p className="mt-5 text-sm text-white/60">{t.hours.note}</p>
          </div>
        </div>
      </section>

      {/* How to find us */}
      <section className="bg-secondary/50">
        <div className="mx-auto max-w-7xl px-5 py-14 md:py-24">
          <SectionTitle kicker={t.find.kicker} title={t.find.title} />
          <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_1.3fr] lg:items-start">
            <ol className="space-y-6">
              {t.find.steps.map(([title, body], i) => (
                <li key={title} className="flex gap-4">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-ink font-semibold text-white">
                    {i + 1}
                  </span>
                  <div>
                    <h3 className="font-display text-lg font-semibold">{title}</h3>
                    <p className="mt-1 leading-relaxed text-muted-foreground">{body}</p>
                  </div>
                </li>
              ))}
              <li>
                <a
                  href={MAPS}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex min-h-12 items-center gap-2 rounded-full bg-ink px-6 py-3 font-semibold text-white transition hover:brightness-125"
                >
                  <MapIcon className="h-4 w-4" /> {t.find.openMaps}
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              </li>
            </ol>
            <div className="grid gap-3 sm:grid-cols-2">
              {(
                [
                  ["plaza", t.find.plazaAlt, t.find.plazaCaption],
                  ["storefront", t.find.storefrontAlt, t.find.storefrontCaption],
                ] as const
              ).map(([key, alt, caption], i) => {
                const p = PHOTOS[key];
                return (
                  <figure key={key} className="overflow-hidden rounded-3xl bg-card">
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <Photo
                        className="absolute inset-0"
                        src={p.src}
                        srcSm={p.sm}
                        width={p.w}
                        height={p.h}
                        sizes="(min-width: 1024px) 28vw, (min-width: 640px) 50vw, 100vw"
                        alt={alt}
                      />
                    </div>
                    <figcaption className="flex items-center gap-2 px-4 py-3 text-sm font-semibold">
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                        {i + 2}
                      </span>
                      {caption}
                    </figcaption>
                  </figure>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Driving times + map */}
      <section className="mx-auto max-w-7xl px-5 py-14 md:py-24">
        <SectionTitle kicker={t.drive.kicker} title={t.drive.title} />
        <p className="mt-4 max-w-2xl text-muted-foreground">{t.drive.body}</p>
        <div className="mt-10 grid gap-6 lg:grid-cols-[1.15fr_1fr]">
          <ul className="divide-y overflow-hidden rounded-3xl border bg-card">
            {areas.map((a) => (
              <li key={a.slug}>
                <Link
                  to={areaPath(lang, a.slug)}
                  className="group flex items-center gap-4 px-5 py-4 transition hover:bg-secondary/60"
                >
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold group-hover:text-primary">{areaName(a, lang)}</p>
                    <p className="mt-0.5 text-sm leading-snug text-muted-foreground">
                      {a.route.map((s) => routeStep(s, lang)).join(" → ")}
                    </p>
                  </div>
                  <div className="shrink-0 text-right">
                    <p className="font-display text-lg font-semibold tabular-nums">
                      {t.drive.min(a.minutes)}
                    </p>
                    <p className="text-xs text-muted-foreground tabular-nums">
                      {t.drive.mi(a.miles)}
                    </p>
                  </div>
                  <ArrowRight className="h-4 w-4 shrink-0 text-primary transition group-hover:translate-x-1" />
                </Link>
              </li>
            ))}
            <li>
              <Link
                to={ALTERNATES.areas[lang]}
                className="flex items-center justify-between px-5 py-4 text-sm font-semibold hover:bg-secondary/60"
              >
                {t.drive.all} <ArrowRight className="h-4 w-4 text-primary" />
              </Link>
            </li>
          </ul>

          <div className="relative min-h-[320px] overflow-hidden rounded-3xl bg-ink lg:min-h-0">
            {mapOn ? (
              <iframe
                title={t.map.title}
                className="absolute inset-0 h-full w-full border-0"
                src={MAP_EMBED(lang)}
                allowFullScreen
              />
            ) : (
              <button
                type="button"
                onClick={() => setMapOn(true)}
                className="group absolute inset-0 flex h-full w-full flex-col items-center justify-center gap-3 text-white"
              >
                <Photo
                  src={plaza}
                  srcSm={plazaSm}
                  width={2000}
                  height={1500}
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  alt=""
                  className="absolute inset-0 opacity-40 transition group-hover:opacity-50"
                />
                <span className="relative flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-xl">
                  <MapIcon className="h-6 w-6" />
                </span>
                <span className="relative font-display text-lg font-semibold">{t.map.load}</span>
                <span className="relative text-xs text-white/70">{t.map.note}</span>
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Inside the store */}
      <section className="bg-ink text-white">
        <div className="mx-auto max-w-7xl py-14 md:py-24">
          <div className="px-5">
            <SectionTitle kicker={t.inside.kicker} title={t.inside.title} light />
            <p className="mt-4 max-w-2xl text-white/70">{t.inside.body}</p>
          </div>
          {/* Swipeable row on phones, grid from tablets up. */}
          <ul className="mt-10 flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-px-5 px-5 pb-2 [scrollbar-width:none] sm:grid sm:grid-cols-2 sm:overflow-visible lg:grid-cols-3">
            <li className="w-[82%] shrink-0 snap-start sm:col-span-2 sm:w-auto lg:col-span-2 lg:row-span-2">
              <figure className="flex h-full flex-col overflow-hidden rounded-3xl bg-white/5 ring-1 ring-white/10">
                <div className="relative aspect-[4/3] overflow-hidden sm:aspect-auto sm:min-h-[18rem] sm:flex-1">
                  <StoreVideo
                    clip="storeInterior"
                    label={t.inside.video}
                    className="absolute inset-0"
                  />
                </div>
                <figcaption className="px-4 py-3 text-sm text-white/80">
                  {t.inside.video}
                </figcaption>
              </figure>
            </li>
            {t.inside.photos.map(([key, caption]) => {
              const p = PHOTOS[key];
              return (
                <li key={key} className="w-[82%] shrink-0 snap-start sm:w-auto">
                  <figure className="overflow-hidden rounded-3xl bg-white/5 ring-1 ring-white/10">
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <Photo
                        className="absolute inset-0"
                        src={p.src}
                        srcSm={p.sm}
                        width={p.w}
                        height={p.h}
                        sizes="(min-width: 1024px) 30vw, (min-width: 640px) 50vw, 82vw"
                        alt={caption}
                      />
                    </div>
                    <figcaption className="px-4 py-3 text-sm text-white/80">{caption}</figcaption>
                  </figure>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* Services at this location */}
      <section className="mx-auto max-w-7xl px-5 py-14 md:py-24">
        <SectionTitle kicker={t.offer.kicker} title={t.offer.title} />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s) => (
            <ServiceCard key={s.slug} service={s} lang={lang} />
          ))}
          <Link
            to={ALTERNATES.leasing[lang]}
            className="group flex flex-col justify-between gap-6 rounded-3xl bg-primary p-6 text-primary-foreground transition hover:-translate-y-1"
          >
            <span>
              <span className="block font-display text-lg font-semibold">{t.offer.leasing}</span>
              <span className="mt-2 block text-sm leading-relaxed opacity-85">
                {t.offer.leasingBody}
              </span>
            </span>
            <span className="flex items-center gap-1 text-sm font-semibold">
              {t.offer.more} <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
            </span>
          </Link>
        </div>
      </section>

      {/* What to bring + we moved + reviews */}
      <section className="bg-secondary/50">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 md:py-24 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <SectionTitle kicker={t.bring.kicker} title={t.bring.title} />
            <dl className="mt-8 grid gap-3 sm:grid-cols-2">
              {t.bring.items.map(([title, body]) => (
                <div key={title} className="rounded-2xl border bg-card p-5">
                  <dt className="font-semibold">{title}</dt>
                  <dd className="mt-1 text-sm leading-relaxed text-muted-foreground">{body}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="flex flex-col gap-4 lg:pt-16">
            <div className="rounded-3xl border-2 border-primary/40 bg-card p-6">
              <h2 className="font-display text-xl font-semibold">{t.moved.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{t.moved.body}</p>
            </div>
            <a
              href={GOOGLE_REVIEWS}
              target="_blank"
              rel="noreferrer"
              className="group rounded-3xl bg-ink p-6 text-white"
            >
              <span className="flex text-primary">
                <Stars className="text-xl" />
              </span>
              <span className="mt-3 block font-display text-2xl font-semibold">
                {t.reviews.rating}
              </span>
              <span className="block text-sm text-white/65">{t.reviews.count}</span>
              <span className="mt-4 flex items-center gap-1 text-sm font-semibold text-primary">
                {t.reviews.cta}
                <ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
              </span>
            </a>
          </div>
        </div>
      </section>

      <ReviewsCarousel lang={lang} className="bg-secondary/40" />

      {/* FAQ */}
      <section className="mx-auto max-w-3xl px-5 py-14 md:py-24">
        <h2 className="text-3xl font-semibold sm:text-4xl">{t.faqTitle}</h2>
        <div className="mt-8">
          <FaqList items={t.faqs} />
        </div>
      </section>

      {/* CTA */}
      <section className="px-3 pb-16 sm:px-5 md:pb-24">
        <div className="mx-auto max-w-7xl rounded-3xl bg-ink px-6 py-12 text-center text-white sm:px-10 md:py-16">
          <h2 className="text-3xl font-semibold sm:text-5xl">{t.cta.title}</h2>
          <p className="mx-auto mt-4 max-w-xl text-white/70">{t.cta.body}</p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <a
              href={TEL}
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 font-semibold text-primary-foreground"
            >
              <Phone className="h-4 w-4" /> {PHONE}
            </a>
            <a
              href={DIRECTIONS}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-white/20 px-6 py-3 font-semibold"
            >
              <MapPin className="h-4 w-4" /> {t.hero.directions}
            </a>
          </div>
        </div>
      </section>

      <SiteFooter lang={lang} />
      <MobileCallBar lang={lang} />
    </main>
  );
}
