import { Link } from "@tanstack/react-router";
import { Money, MoneyText } from "@/components/intl/money";
import {
  Accessibility,
  ArrowRight,
  ArrowUpRight,
  Clock,
  Facebook,
  Globe,
  KeyRound,
  Languages,
  MapPin,
  Phone,
  Receipt,
  Repeat,
  Router,
  Smartphone,
  Wallet,
  Wrench,
} from "lucide-react";

import iphone18 from "@/assets/photos/iphone-18-pro-max.jpg";
import iphone18Sm from "@/assets/photos/iphone-18-pro-max-sm.jpg";
import counter from "@/assets/photos/store-counter.jpg";
import counterSm from "@/assets/photos/store-counter-sm.jpg";
import storefront from "@/assets/photos/storefront-3640.jpg";
import storefrontSm from "@/assets/photos/storefront-3640-sm.jpg";
import plaza from "@/assets/photos/plaza.jpg";
import plazaSm from "@/assets/photos/plaza-sm.jpg";
import s24 from "@/assets/photos/galaxy-s24-ultra.jpg";
import s24Sm from "@/assets/photos/galaxy-s24-ultra-sm.jpg";
import protector from "@/assets/photos/screen-protector.jpg";
import protectorSm from "@/assets/photos/screen-protector-sm.jpg";
import caseWall from "@/assets/photos/case-wall.jpg";
import caseWallSm from "@/assets/photos/case-wall-sm.jpg";
import jbl from "@/assets/photos/jbl-display.jpg";
import jblSm from "@/assets/photos/jbl-display-sm.jpg";
import appleDisplay from "@/assets/photos/apple-display.jpg";
import appleDisplaySm from "@/assets/photos/apple-display-sm.jpg";
import otterbox from "@/assets/photos/iphone-otterbox.jpg";
import otterboxSm from "@/assets/photos/iphone-otterbox-sm.jpg";
import s22 from "@/assets/photos/galaxy-s22-ultra.jpg";
import s22Sm from "@/assets/photos/galaxy-s22-ultra-sm.jpg";
import { AREAS, shortName } from "@/components/areas/data";
import { areaPath } from "@/components/areas/paths";
import { GUIDES } from "@/components/guides/data";
import { GuideCard } from "@/components/guides/guide-page";
import { HOME_COPY } from "@/components/pages/home-copy";
import { SHOP_ENABLED } from "@/components/site/features";
import { ProductCard } from "@/shop/components";
import { SHOP_COPY } from "@/shop/copy";
import type { Catalog } from "@/shop/types";
import {
  ADDRESS,
  CITY,
  DIRECTIONS,
  FACEBOOK,
  MAPS,
  PHONE,
  RATING,
  STREET,
  TEL,
} from "@/components/site/business";
import { MobileCallBar, OpenBadge, SiteFooter, SiteHeader, Stars } from "@/components/site/chrome";
import { FaqList } from "@/components/site/faq";
import { DotRing } from "@/components/site/logo";
import { Photo } from "@/components/site/photo";
import { ALTERNATES, type Lang } from "@/components/site/seo";

const SERVICE_ICONS = [Wallet, Router, Wrench, KeyRound, Repeat, Receipt, Globe];

const CARRIERS = [
  "Verizon Prepaid",
  "AT&T Prepaid",
  "T-Mobile",
  "Metro by T-Mobile",
  "Cricket",
  "Boost Mobile",
  "Simple Mobile",
  "Lyca Mobile",
  "GoSmart",
  "Gen Mobile",
  "Xfinity",
];
const RECHARGE = ["Tigo", "Digicel", "Movistar", "Telcel"];

const ACCESSORY_PHOTOS = [
  { src: caseWall, sm: caseWallSm, w: 2000, h: 1500, span: "sm:col-span-2 sm:row-span-2" },
  { src: jbl, sm: jblSm, w: 2000, h: 1500, span: "sm:col-span-2" },
  { src: appleDisplay, sm: appleDisplaySm, w: 1500, h: 2000, span: "" },
  { src: otterbox, sm: otterboxSm, w: 1500, h: 2000, span: "" },
];

export function HomePage({ lang, catalog }: { lang: Lang; catalog: Catalog }) {
  const t = HOME_COPY[lang];
  const shop = SHOP_COPY[lang];
  const featured = catalog.products.filter((p) => p.featured).slice(0, 4);
  return (
    <main className="overflow-x-hidden">
      <SiteHeader lang={lang} paths={ALTERNATES.home} />

      {/* Hero */}
      <section id="top" className="relative isolate overflow-hidden bg-ink text-white">
        <div className="grain absolute inset-0 -z-10 opacity-60" />
        <div className="absolute -right-40 top-1/3 -z-10 h-[46rem] w-[46rem] rounded-full bg-primary/25 blur-[160px]" />
        <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 pb-20 pt-32 lg:min-h-[100svh] lg:grid-cols-[1fr_1.05fr] lg:pb-16 lg:pt-28">
          <div className="animate-rise">
            <h1>
              <span className="eyebrow flex flex-wrap items-center gap-3 text-primary">
                <span className="h-px w-8 bg-primary" /> {<MoneyText text={t.hero.kicker} />}
              </span>
              <span className="mt-6 block text-[clamp(3rem,7.5vw,6.25rem)] font-semibold leading-[0.92]">
                {<MoneyText text={t.hero.title[0]} />}
                <br />
                <span className="text-primary">{<MoneyText text={t.hero.title[1]} />}</span>
              </span>
            </h1>
            <p className="mt-7 max-w-lg text-lg leading-relaxed text-white/70">
              {<MoneyText text={t.hero.body[0]} />}
              <strong className="font-semibold text-white">
                {<MoneyText text={t.hero.body[1]} />}
              </strong>
              {<MoneyText text={t.hero.body[2]} />}
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <a
                href={DIRECTIONS}
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 font-semibold text-primary-foreground transition hover:brightness-110"
              >
                {<MoneyText text={t.hero.directions} />}
                <ArrowUpRight className="h-4 w-4 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
              <a
                href={TEL}
                className="inline-flex items-center gap-2 rounded-full border border-white/20 px-7 py-3.5 font-semibold transition hover:border-white/60"
              >
                <Phone className="h-4 w-4" /> {PHONE}
              </a>
            </div>
            <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-4 border-t border-white/10 pt-8 text-white/70">
              <a
                href={MAPS}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 hover:text-white"
              >
                <span className="text-primary">
                  <Stars />
                </span>
                <span className="font-semibold text-white">{RATING}</span> ·{" "}
                {<MoneyText text={t.hero.reviews} />}
              </a>
              <OpenBadge lang={lang} />
              <span className="rounded-full border border-primary/40 px-3 py-1 text-sm text-primary">
                {<MoneyText text={t.hero.language} />}
              </span>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-md animate-rise [animation-delay:150ms] lg:mr-0 lg:max-w-[30rem]">
            <DotRing
              className="animate-spin-slow absolute -right-28 -top-20 -z-10 hidden h-[34rem] w-[34rem] opacity-60 lg:block"
              rings={[
                { r: 92, count: 26, dot: 2.6, className: "fill-primary" },
                { r: 76, count: 22, dot: 2.2, className: "fill-slate" },
                { r: 60, count: 18, dot: 1.8, className: "fill-primary/60" },
              ]}
            />
            {/* Soft glow in the phone's plum finish */}
            <div className="absolute inset-x-6 top-1/4 -z-10 h-2/3 rounded-full bg-[#8a3f68]/45 blur-[90px]" />
            <div className="relative overflow-hidden rounded-[2.25rem] shadow-2xl shadow-black/60 ring-1 ring-white/10">
              <Photo
                src={iphone18}
                srcSm={iphone18Sm}
                width={1400}
                height={1750}
                sizes="(min-width: 1024px) 480px, 100vw"
                priority
                alt={t.hero.imageAlt}
                className="aspect-[4/5] object-[55%_50%]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/10 to-transparent" />
              <span className="absolute right-5 top-5 inline-flex items-center gap-2 rounded-full bg-white/90 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-ink backdrop-blur">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-70" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
                </span>
                {<MoneyText text={t.hero.imageKicker} />}
              </span>
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-6 sm:p-7">
                <div>
                  <p className="font-display text-2xl font-semibold leading-tight sm:text-3xl">
                    {<MoneyText text={t.hero.imageTitle} />}
                  </p>
                  <p className="mt-1 text-sm text-white/75">
                    {<MoneyText text={t.hero.imageSub} />}
                  </p>
                </div>
                <Link
                  to={ALTERNATES.leasing[lang]}
                  className="group inline-flex shrink-0 items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition hover:brightness-110"
                >
                  {<MoneyText text={t.hero.imageCta} />}
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                </Link>
              </div>
            </div>
            <div className="absolute -left-6 top-8 hidden max-w-[13rem] rounded-2xl bg-white p-5 text-ink shadow-2xl sm:block lg:-left-8 xl:-left-24">
              <p className="eyebrow text-slate">{<MoneyText text={t.hero.leaseLabel} />}</p>
              <p className="mt-1 font-display text-3xl font-semibold">
                <Money usd={65} stacked />{" "}
                <span className="text-base font-medium text-muted-foreground">
                  {<MoneyText text={t.hero.leaseUnit} />}
                </span>
              </p>
              <p className="mt-0.5 text-sm leading-snug text-muted-foreground">
                {<MoneyText text={t.hero.leaseNote} />}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Ticker */}
      <section
        className="border-y border-ink/10 bg-primary py-4 text-primary-foreground"
        aria-label="Highlights"
      >
        <div className="flex w-max animate-marquee">
          {[0, 1].map((k) => (
            <ul key={k} className="flex shrink-0 items-center" aria-hidden={k === 1}>
              {t.ticker.map((item) => (
                <li key={item} className="eyebrow flex items-center gap-8 px-4 text-sm">
                  {<MoneyText text={item} />}
                  <span className="h-1.5 w-1.5 rounded-full bg-ink" />
                </li>
              ))}
            </ul>
          ))}
        </div>
      </section>

      {/* Showroom */}
      <section className="px-3 pt-3 sm:px-5 sm:pt-5">
        <div className="relative isolate mx-auto max-w-[1600px] overflow-hidden rounded-[2rem] text-white">
          <Photo
            src={counter}
            srcSm={counterSm}
            width={2000}
            height={1500}
            alt={t.showroom.imageAlt}
            className="absolute inset-0 -z-10"
          />
          <div className="absolute inset-0 -z-10 bg-gradient-to-t from-ink via-ink/60 to-ink/10" />
          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-ink/80 via-ink/30 to-transparent" />
          <div className="mx-auto flex min-h-[640px] max-w-7xl flex-col justify-end px-6 pb-10 md:min-h-[760px] md:px-10 md:pb-14">
            <p className="eyebrow text-primary">{<MoneyText text={t.showroom.kicker} />}</p>
            <h2 className="mt-4 max-w-3xl text-4xl font-semibold leading-[1.02] md:text-7xl">
              {<MoneyText text={t.showroom.title} />}
            </h2>
            <p className="mt-5 max-w-xl text-lg text-white/75">
              {<MoneyText text={t.showroom.body} />}
            </p>
            <dl className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-2xl bg-white/10 backdrop-blur-md md:grid-cols-4">
              {t.showroom.stats.map(([v, l]) => (
                <div key={l} className="flex flex-col-reverse bg-ink/40 p-5 md:p-6">
                  <dt className="mt-1 text-sm text-white/60">{l}</dt>
                  <dd className="font-display text-2xl font-semibold md:text-3xl">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="mx-auto max-w-7xl scroll-mt-24 px-5 py-24 md:py-32">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="eyebrow text-slate">{<MoneyText text={t.services.kicker} />}</p>
            <h2 className="mt-4 max-w-2xl text-4xl font-semibold leading-[1.02] md:text-6xl">
              {<MoneyText text={t.services.title} />}
            </h2>
          </div>
          <p className="max-w-sm text-muted-foreground">{<MoneyText text={t.services.intro} />}</p>
        </div>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <article className="relative isolate flex min-h-[460px] flex-col justify-between overflow-hidden rounded-3xl bg-ink p-8 text-white sm:col-span-2 md:p-10 lg:row-span-2">
            <Photo
              src={s24}
              srcSm={s24Sm}
              width={1500}
              height={2000}
              sizes="(min-width: 1024px) 50vw, 100vw"
              alt={t.services.featured.imageAlt}
              className="absolute inset-0 -z-10 opacity-90"
            />
            <div className="absolute inset-0 -z-10 bg-gradient-to-t from-ink via-ink/75 to-ink/20" />
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
              <Smartphone className="h-5 w-5" />
            </span>
            <div>
              <h3 className="max-w-md text-3xl font-semibold md:text-5xl">
                {<MoneyText text={t.services.featured.title} />}
              </h3>
              <p className="mt-3 max-w-md text-lg leading-relaxed text-white/75">
                {<MoneyText text={t.services.featured.body} />}
              </p>
              <div className="mt-8 flex flex-wrap gap-2">
                {t.services.featured.chips.map((chip) => (
                  <span
                    key={chip}
                    className="rounded-full border border-white/20 bg-white/5 px-4 py-1.5 text-sm text-white/85 backdrop-blur"
                  >
                    {<MoneyText text={chip} />}
                  </span>
                ))}
              </div>
              <Link
                to={ALTERNATES.leasing[lang]}
                className="mt-8 inline-flex items-center gap-2 font-semibold text-primary hover:underline"
              >
                {<MoneyText text={t.services.featured.link} />} <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </article>

          {t.services.items.map(([title, body], i) => {
            const Icon = SERVICE_ICONS[i] ?? Wrench;
            return (
              <article
                key={title}
                className="group rounded-3xl border bg-card p-7 transition hover:-translate-y-1 hover:shadow-xl hover:shadow-ink/5"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-secondary text-ink transition group-hover:bg-primary">
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="mt-6 text-lg font-semibold">{<MoneyText text={title} />}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {<MoneyText text={body} />}
                </p>
              </article>
            );
          })}

          <a
            href={TEL}
            className="group flex flex-col justify-between gap-8 rounded-3xl bg-primary p-7 text-primary-foreground transition hover:-translate-y-1"
          >
            <p className="font-display text-2xl font-semibold leading-tight">
              {<MoneyText text={t.services.cta} />}
            </p>
            <span className="inline-flex items-center gap-2 font-semibold">
              <Phone className="h-4 w-4" /> {PHONE}
              <ArrowUpRight className="h-4 w-4 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </span>
          </a>
        </div>
      </section>

      {/* Carriers */}
      <section className="border-y bg-secondary/60">
        <div className="mx-auto max-w-7xl px-5 py-16 md:py-20">
          <div className="grid gap-10 lg:grid-cols-[1fr_2fr] lg:items-center">
            <div>
              <p className="eyebrow text-slate">{<MoneyText text={t.carriers.kicker} />}</p>
              <h2 className="mt-4 text-3xl font-semibold leading-tight md:text-4xl">
                {<MoneyText text={t.carriers.title} />}
              </h2>
            </div>
            <div>
              <ul className="flex flex-wrap gap-2">
                {CARRIERS.map((c) => (
                  <li
                    key={c}
                    className="rounded-full border bg-card px-4 py-2 font-display text-sm font-medium text-ink"
                  >
                    {c}
                  </li>
                ))}
              </ul>
              <p className="mt-6 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                <Globe className="h-4 w-4" /> {<MoneyText text={t.carriers.recharge} />}
                {RECHARGE.map((r) => (
                  <span key={r} className="font-semibold text-ink">
                    {r}
                  </span>
                ))}
                <span>{<MoneyText text={t.carriers.more} />}</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Repair */}
      <section id="repair" className="scroll-mt-24 bg-ink text-white">
        <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 py-24 md:py-32 lg:grid-cols-2">
          <div className="relative">
            <div className="overflow-hidden rounded-3xl">
              <Photo
                src={protector}
                srcSm={protectorSm}
                width={1500}
                height={2000}
                sizes="(min-width: 1024px) 50vw, 100vw"
                alt={t.repair.imageAlt}
                className="aspect-[4/4.4]"
              />
            </div>
            <div className="absolute -bottom-6 left-6 rounded-2xl bg-primary px-6 py-4 text-primary-foreground shadow-2xl sm:left-auto sm:right-8">
              <p className="eyebrow">{<MoneyText text={t.repair.badgeLabel} />}</p>
              <p className="font-display text-3xl font-semibold">
                {<MoneyText text={t.repair.badge} />}
              </p>
            </div>
          </div>
          <div>
            <p className="eyebrow text-primary">{<MoneyText text={t.repair.kicker} />}</p>
            <h2 className="mt-4 text-4xl font-semibold leading-[1.02] md:text-6xl">
              {<MoneyText text={t.repair.title} />}
            </h2>
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-white/70">
              {<MoneyText text={t.repair.body} />}
            </p>
            <ol className="mt-10 space-y-6">
              {t.repair.steps.map(([title, body], i) => (
                <li key={title} className="flex gap-5 border-t border-white/10 pt-6">
                  <span className="font-display text-sm font-semibold text-primary">0{i + 1}</span>
                  <div>
                    <h3 className="text-lg font-semibold">{<MoneyText text={title} />}</h3>
                    <p className="mt-1 text-white/60">{<MoneyText text={body} />}</p>
                  </div>
                </li>
              ))}
            </ol>
            <a
              href={TEL}
              className="mt-10 inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 font-semibold text-primary-foreground transition hover:brightness-110"
            >
              <Phone className="h-4 w-4" /> {<MoneyText text={t.repair.cta} />}
            </a>
          </div>
        </div>
      </section>

      {/* Accessories */}
      <section id="accessories" className="mx-auto max-w-7xl scroll-mt-24 px-5 py-24 md:py-32">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.5fr] lg:items-end">
          <div>
            <p className="eyebrow text-slate">{<MoneyText text={t.accessories.kicker} />}</p>
            <h2 className="mt-4 text-4xl font-semibold leading-[1.02] md:text-6xl">
              {<MoneyText text={t.accessories.title} />}
            </h2>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-muted-foreground">
              {<MoneyText text={t.accessories.body} />}
            </p>
          </div>
          <ul className="flex flex-wrap gap-2 lg:justify-end">
            {t.accessories.items.map((a) => (
              <li key={a} className="rounded-full border bg-card px-4 py-2 text-sm font-medium">
                {a}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-12 grid auto-rows-[240px] gap-4 sm:grid-cols-2 md:auto-rows-[280px] lg:grid-cols-4">
          {ACCESSORY_PHOTOS.map((g, i) => {
            const [alt = "", caption = ""] = t.accessories.photos[i] ?? [];
            return (
              <figure
                key={caption}
                className={`group relative overflow-hidden rounded-3xl bg-secondary ${g.span}`}
              >
                <Photo
                  src={g.src}
                  srcSm={g.sm}
                  width={g.w}
                  height={g.h}
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  alt={alt}
                  className="transition duration-700 group-hover:scale-105"
                />
                <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/85 to-transparent px-5 pb-4 pt-12 text-sm font-semibold text-white">
                  {caption}
                </figcaption>
              </figure>
            );
          })}
        </div>
      </section>

      {/* Shop teaser */}
      {SHOP_ENABLED && featured.length > 0 && (
        <section className="mx-auto max-w-7xl px-5 pb-24 md:pb-32">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="eyebrow text-slate">{shop.homeTeaser.kicker}</p>
              <h2 className="mt-4 text-4xl font-semibold leading-[1.02] md:text-6xl">
                {shop.homeTeaser.title}
              </h2>
              <p className="mt-4 max-w-md text-muted-foreground">{shop.homeTeaser.body}</p>
            </div>
            <Link
              to={ALTERNATES.shop[lang]}
              className="group inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 font-semibold text-white transition hover:bg-ink-soft"
            >
              {shop.homeTeaser.cta}
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
            </Link>
          </div>
          <div className="mt-12 grid grid-cols-2 gap-x-4 gap-y-10 lg:grid-cols-4 lg:gap-x-6">
            {featured.map((p) => (
              <ProductCard key={p.id} product={p} lang={lang} />
            ))}
          </div>
        </section>
      )}

      {/* Rating band */}
      <section className="px-5">
        <div className="relative mx-auto grid max-w-7xl overflow-hidden rounded-[2rem] bg-primary text-primary-foreground md:grid-cols-[1.4fr_1fr]">
          <div className="relative px-8 py-14 md:px-14 md:py-20">
            <p className="eyebrow">{<MoneyText text={t.rating.kicker} />}</p>
            <p className="mt-4 flex flex-wrap items-baseline gap-4">
              <span className="font-display text-7xl font-semibold leading-none md:text-9xl">
                {RATING}
              </span>
              <Stars className="h-6 w-6 md:h-8 md:w-8" />
            </p>
            <p className="mt-4 max-w-md text-lg">{<MoneyText text={t.rating.body} />}</p>
            <a
              href={MAPS}
              target="_blank"
              rel="noreferrer"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-ink px-7 py-3.5 font-semibold text-white transition hover:bg-ink-soft"
            >
              {<MoneyText text={t.rating.cta} />} <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
          <div className="relative min-h-[280px]">
            <Photo
              src={s22}
              srcSm={s22Sm}
              width={1500}
              height={2000}
              sizes="(min-width: 768px) 40vw, 100vw"
              alt={t.rating.imageAlt}
              className="absolute inset-0"
            />
          </div>
        </div>
      </section>

      {/* At a glance: a plain, quotable summary for people, search engines and AI answers */}
      <section id="about" className="mx-auto max-w-7xl scroll-mt-24 px-5 pt-24 md:pt-32">
        <div className="grid gap-10 rounded-[2rem] border bg-card p-8 md:p-12 lg:grid-cols-[1fr_1.3fr]">
          <div>
            <p className="eyebrow text-slate">{<MoneyText text={t.glance.kicker} />}</p>
            <h2 className="mt-4 text-3xl font-semibold leading-tight md:text-4xl">
              {<MoneyText text={t.glance.title} />}
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
              {<MoneyText text={t.glance.summary} />}
            </p>
          </div>
          <dl className="grid content-start gap-x-8 gap-y-5 sm:grid-cols-2">
            {t.glance.facts.map(([label, value]) => (
              <div key={label} className="border-t pt-4">
                <dt className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  {label}
                </dt>
                <dd className="mt-1 font-medium">{<MoneyText text={value} />}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Areas served */}
      <section id="areas" className="mx-auto max-w-7xl scroll-mt-24 px-5 pt-24 md:pt-32">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:items-start">
          <div>
            <p className="eyebrow text-slate">{<MoneyText text={t.area.kicker} />}</p>
            <h2 className="mt-4 text-4xl font-semibold leading-[1.02] md:text-5xl">
              {<MoneyText text={t.area.title} />}
            </h2>
          </div>
          <div>
            {t.area.body.map((p) => (
              <p key={p} className="mb-4 text-lg leading-relaxed text-muted-foreground">
                {p}
              </p>
            ))}
            <ul className="mt-6 flex flex-wrap gap-2">
              {AREAS.map((a) => (
                <li key={a.slug}>
                  <Link
                    to={areaPath(lang, a.slug)}
                    className="inline-flex items-center gap-1.5 rounded-full border bg-card px-4 py-2 text-sm font-medium transition hover:border-primary hover:text-primary"
                  >
                    <MapPin className="h-3.5 w-3.5 text-primary" /> {shortName(a)}
                    <span className="text-xs text-muted-foreground">{a.miles.toFixed(1)} mi</span>
                  </Link>
                </li>
              ))}
            </ul>
            <p className="mt-5 text-sm text-muted-foreground">{<MoneyText text={t.area.zips} />}</p>
            <Link
              to={ALTERNATES.areas[lang]}
              className="mt-5 inline-flex items-center gap-1.5 font-semibold text-ink underline decoration-primary decoration-2 underline-offset-4"
            >
              {<MoneyText text={t.area.cta} />} <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="mx-auto max-w-7xl scroll-mt-24 px-5 py-24 md:py-32">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.6fr]">
          <div>
            <p className="eyebrow text-slate">{<MoneyText text={t.faq.kicker} />}</p>
            <h2 className="mt-4 text-4xl font-semibold leading-[1.02] md:text-6xl">
              {<MoneyText text={t.faq.title} />}
            </h2>
            <p className="mt-6 max-w-sm text-muted-foreground">
              {<MoneyText text={t.faq.more} />}{" "}
              <a href={TEL} className="font-semibold text-ink underline-offset-4 hover:underline">
                {PHONE}
              </a>
              .
            </p>
            <p className="mt-6 inline-flex items-center gap-2 rounded-full bg-secondary px-4 py-2 text-sm font-medium">
              <Languages className="h-4 w-4 text-primary" /> {<MoneyText text={t.faq.languages} />}
            </p>
          </div>
          <FaqList items={t.faq.items} />
        </div>
      </section>

      {/* Guides */}
      <section className="mx-auto max-w-7xl px-5 pb-24 md:pb-32">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 className="text-2xl font-semibold md:text-3xl">
            {<MoneyText text={t.faq.guides} />}
          </h2>
          <Link
            to={ALTERNATES.guides[lang]}
            className="inline-flex items-center gap-1.5 font-semibold text-ink underline decoration-primary decoration-2 underline-offset-4"
          >
            {<MoneyText text={t.faq.allGuides} />} <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {GUIDES.map((g) => (
            <GuideCard key={g.slug} guide={g} lang={lang} />
          ))}
        </div>
      </section>

      {/* Visit */}
      <section id="visit" className="scroll-mt-24 bg-ink text-white">
        <div className="mx-auto max-w-7xl px-5 py-24 md:py-32">
          <p className="eyebrow text-primary">{<MoneyText text={t.visit.kicker} />}</p>
          <h2 className="mt-4 text-4xl font-semibold leading-[1.02] md:text-6xl">
            {<MoneyText text={t.visit.title} />}
          </h2>

          <div className="mt-14 grid gap-4 lg:grid-cols-[1.3fr_1fr]">
            <figure className="relative min-h-[360px] overflow-hidden rounded-3xl">
              <Photo
                src={storefront}
                srcSm={storefrontSm}
                width={2000}
                height={1500}
                sizes="(min-width: 1024px) 60vw, 100vw"
                alt={t.visit.storefrontAlt}
                className="absolute inset-0"
              />
              <figcaption className="absolute inset-x-4 bottom-4 flex items-center gap-3 rounded-2xl bg-ink/80 px-5 py-4 text-sm backdrop-blur">
                <MapPin className="h-5 w-5 shrink-0 text-primary" />
                {ADDRESS} — {<MoneyText text={t.visit.caption} />}
              </figcaption>
            </figure>

            <div className="flex flex-col gap-4">
              <div className="rounded-3xl bg-white/5 p-8 ring-1 ring-white/10">
                <OpenBadge lang={lang} className="text-white/80" />
                <address className="not-italic">
                  <p className="mt-6 font-display text-2xl font-semibold">{STREET}</p>
                  <p className="text-white/70">{CITY}</p>
                  <a
                    href={TEL}
                    className="mt-4 block font-display text-2xl font-semibold text-primary"
                  >
                    {PHONE}
                  </a>
                </address>
                <dl className="mt-8 space-y-3">
                  {t.visit.hours.map(([d, h]) => (
                    <div
                      key={d}
                      className="flex justify-between gap-4 border-t border-white/10 pt-3 text-sm"
                    >
                      <dt className="flex items-center gap-2 text-white/60">
                        <Clock className="h-4 w-4" /> {d}
                      </dt>
                      <dd className="font-semibold">{h}</dd>
                    </div>
                  ))}
                </dl>
                <p className="mt-6 flex items-center gap-2 text-sm text-white/60">
                  <Accessibility className="h-4 w-4" /> {<MoneyText text={t.visit.accessible} />}
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <a
                    href={DIRECTIONS}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 font-semibold text-primary-foreground transition hover:brightness-110"
                  >
                    {<MoneyText text={t.visit.directions} />} <ArrowUpRight className="h-4 w-4" />
                  </a>
                  <a
                    href={FACEBOOK}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 font-semibold transition hover:border-white/60"
                  >
                    <Facebook className="h-4 w-4" /> Facebook
                  </a>
                </div>
              </div>
              <div className="relative min-h-[180px] flex-1 overflow-hidden rounded-3xl">
                <Photo
                  src={plaza}
                  srcSm={plazaSm}
                  width={2000}
                  height={1500}
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  alt={t.visit.plazaAlt}
                  className="absolute inset-0"
                />
                <a
                  href={MAPS}
                  target="_blank"
                  rel="noreferrer"
                  className="absolute bottom-4 left-4 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-ink shadow-lg"
                >
                  {<MoneyText text={t.visit.plazaCta} />} <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>

          <iframe
            title={t.visit.mapTitle}
            className="mt-4 h-[360px] w-full rounded-3xl border-0"
            loading="lazy"
            src={`https://maps.google.com/maps?q=TIC%20Wireless%2C%203640%20Hillcroft%20St%2C%20Houston%2C%20TX%2077057&z=16&hl=${lang}&output=embed`}
          />
        </div>
      </section>

      <SiteFooter lang={lang} />
      <MobileCallBar lang={lang} />
    </main>
  );
}
