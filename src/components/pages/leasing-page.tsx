import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  CalendarClock,
  Gamepad2,
  Headphones,
  Laptop,
  Phone,
  ShieldCheck,
  Smartphone,
  Wallet,
} from "lucide-react";

import { LeasingPortals } from "@/components/site/leasing-portals";
import { Money, MoneyText } from "@/components/intl/money";
import consoles from "@/assets/photos/consoles-wide.webp";
import consolesSm from "@/assets/photos/consoles-wide-sm.webp";
import laptops from "@/assets/photos/laptops-tablets.webp";
import laptopsSm from "@/assets/photos/laptops-tablets-sm.webp";
import iphone17 from "@/assets/photos/iphone-17-pro.webp";
import iphone17Sm from "@/assets/photos/iphone-17-pro-sm.webp";
import iphone18 from "@/assets/photos/iphone-18-pro-max.webp";
import iphone18Sm from "@/assets/photos/iphone-18-pro-max-sm.webp";
import jbl from "@/assets/photos/jbl-display.webp";
import jblSm from "@/assets/photos/jbl-display-sm.webp";
import { LEASING_COPY } from "@/components/pages/leasing-copy";
import { DIRECTIONS, PHONE, TEL } from "@/components/site/business";
import { MobileCallBar, OpenBadge, SiteFooter, SiteHeader } from "@/components/site/chrome";
import { FaqList } from "@/components/site/faq";
import { DotRing } from "@/components/site/logo";
import { Photo } from "@/components/site/photo";
import { ReviewQuotes } from "@/components/reviews/review-quotes";
import { ALTERNATES, type Lang } from "@/components/site/seo";

// Where each "What you can take home" card leads (same order as the cards).
const CATEGORY_LINKS: Record<Lang, string>[] = [
  { en: "/services/unlocked-phones", es: "/es/servicios/unlocked-phones" },
  ALTERNATES.consoles,
  ALTERNATES.laptops,
  { en: "/accessories#audio", es: "/es/accesorios#audio" },
];

const CATEGORY_MEDIA = [
  { icon: Smartphone, src: iphone17, sm: iphone17Sm, w: 2000, h: 1206 },
  { icon: Gamepad2, src: consoles, sm: consolesSm, w: 1240, h: 720 },
  { icon: Laptop, src: laptops, sm: laptopsSm, w: 2000, h: 1400 },
  { icon: Headphones, src: jbl, sm: jblSm, w: 2000, h: 1500 },
];
const TILE_MEDIA: { src: string; sm: string; w: number; h: number; focus?: string }[] = [
  { src: laptops, sm: laptopsSm, w: 2000, h: 1400 },
  { src: iphone18, sm: iphone18Sm, w: 1400, h: 1750, focus: "55% 40%" },
];
const PERK_ICONS = [BadgeCheck, Wallet, CalendarClock, ShieldCheck];

export function LeasingPage({ lang }: { lang: Lang }) {
  const t = LEASING_COPY[lang];
  return (
    <main className="overflow-x-hidden">
      <SiteHeader lang={lang} paths={ALTERNATES.leasing} />

      {/* Hero */}
      <section className="relative isolate overflow-hidden bg-ink text-white">
        <div className="grain absolute inset-0 -z-10 opacity-60" />
        <div className="absolute -left-40 top-1/2 -z-10 h-[40rem] w-[40rem] rounded-full bg-primary/20 blur-[160px]" />
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 pb-14 pt-28 lg:grid-cols-[1fr_1.1fr] lg:pb-12 lg:pt-28">
          <div className="animate-rise">
            <p className="eyebrow flex items-center gap-3 text-primary">
              <span className="h-px w-8 bg-primary" /> {<MoneyText text={t.hero.kicker} />}
            </p>
            <h1 className="mt-6 text-[clamp(2.5rem,6vw,5rem)] font-semibold leading-[0.95]">
              {<MoneyText text={t.hero.title[0]} />}{" "}
              <span className="text-primary">{<MoneyText text={t.hero.title[1]} />}</span>
            </h1>
            <p className="mt-5 font-display text-2xl font-semibold text-white/85 md:text-3xl">
              {<MoneyText text={t.hero.slogan} />}
            </p>
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-white/70">
              {<MoneyText text={t.hero.body[0]} />}
              <strong className="font-semibold text-white">
                {<MoneyText text={t.hero.body[1]} />}
              </strong>
              {<MoneyText text={t.hero.body[2]} />}
              <strong className="font-semibold text-white">
                {<MoneyText text={t.hero.body[3]} />}
              </strong>
              {<MoneyText text={t.hero.body[4]} />}
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <a
                href={TEL}
                className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 font-semibold text-primary-foreground transition hover:brightness-110"
              >
                <Phone className="h-4 w-4" /> {<MoneyText text={t.hero.call} />}
              </a>
              <a
                href={DIRECTIONS}
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-center gap-2 rounded-full border border-white/20 px-7 py-3.5 font-semibold transition hover:border-white/60"
              >
                {<MoneyText text={t.hero.visit} />}
                <ArrowUpRight className="h-4 w-4 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            </div>
            <ul className="mt-8 flex flex-wrap gap-2 border-t border-white/10 pt-8">
              {t.hero.chips.map((chip) => (
                <li
                  key={chip}
                  className="rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-sm text-white/85"
                >
                  {<MoneyText text={chip} />}
                </li>
              ))}
            </ul>
          </div>

          <div className="relative grid animate-rise grid-cols-2 gap-3 [animation-delay:150ms] sm:gap-4">
            <DotRing
              className="animate-spin-slow absolute -right-28 -top-28 -z-10 hidden h-[30rem] w-[30rem] opacity-60 lg:block"
              rings={[
                { r: 92, count: 26, dot: 2.6, className: "fill-primary" },
                { r: 76, count: 22, dot: 2.2, className: "fill-slate" },
              ]}
            />
            <figure className="relative col-span-2 overflow-hidden rounded-[2rem] ring-1 ring-white/10">
              <Photo
                src={consoles}
                srcSm={consolesSm}
                width={1240}
                height={720}
                priority
                sizes="(min-width: 1024px) 50vw, 100vw"
                alt={t.hero.mainAlt}
                className="aspect-[16/9]"
              />
              <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/85 to-transparent px-5 pb-4 pt-8 font-display text-lg font-semibold">
                {<MoneyText text={t.hero.mainCaption} />}
              </figcaption>
            </figure>
            {TILE_MEDIA.map((g, i) => {
              const [alt = "", caption = ""] = t.hero.tiles[i] ?? [];
              return (
                <figure
                  key={caption}
                  className="relative overflow-hidden rounded-3xl ring-1 ring-white/10"
                >
                  <Photo
                    src={g.src}
                    srcSm={g.sm}
                    width={g.w}
                    height={g.h}
                    sizes="(min-width: 1024px) 25vw, 50vw"
                    alt={alt}
                    className="aspect-[4/3]"
                    {...(g.focus ? { style: { objectPosition: g.focus } } : {})}
                  />
                  <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/85 to-transparent px-4 pb-3 pt-8 text-sm font-semibold">
                    {caption}
                  </figcaption>
                </figure>
              );
            })}
            <div className="absolute right-4 -top-6 hidden rounded-2xl bg-white p-5 text-ink shadow-2xl sm:block lg:-right-6">
              <p className="eyebrow text-slate">{<MoneyText text={t.hero.cardLabel} />}</p>
              <p className="mt-1 font-display text-3xl font-semibold">
                <Money usd={40} stacked />{" "}
                <span className="text-base font-medium text-muted-foreground">
                  {<MoneyText text={t.hero.cardUnit} />}
                </span>
              </p>
              <p className="text-sm text-muted-foreground">
                {<MoneyText text={t.hero.cardNote} />}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Ticker */}
      <section
        className="border-y border-ink/10 bg-primary py-4 text-primary-foreground"
        aria-label="Products"
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

      <LeasingPortals lang={lang} />

      {/* Categories */}
      <section className="mx-auto max-w-7xl px-5 py-16 md:py-20">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="eyebrow text-slate">{<MoneyText text={t.categories.kicker} />}</p>
            <h2 className="mt-4 max-w-2xl text-4xl font-semibold leading-[1.02] md:text-5xl">
              {<MoneyText text={t.categories.title} />}
            </h2>
          </div>
          <p className="max-w-sm text-muted-foreground">
            {<MoneyText text={t.categories.intro} />}
          </p>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {t.categories.items.map(({ title, items, alt }, i) => {
            const m = CATEGORY_MEDIA[i];
            if (!m) return null;
            const Icon = m.icon;
            return (
              <Link
                key={title}
                to={CATEGORY_LINKS[i]?.[lang] ?? ALTERNATES.leasing[lang]}
                className={`group relative isolate flex min-h-[300px] flex-col justify-end overflow-hidden rounded-3xl bg-ink p-6 text-white transition hover:-translate-y-1 hover:shadow-2xl sm:min-h-[360px] md:min-h-[420px] md:p-10 ${i === 0 ? "md:min-h-[520px]" : ""}`}
              >
                <Photo
                  src={m.src}
                  srcSm={m.sm}
                  width={m.w}
                  height={m.h}
                  sizes="(min-width: 768px) 50vw, 100vw"
                  alt={alt}
                  className="absolute inset-0 -z-10 transition duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 -z-10 bg-gradient-to-t from-ink via-ink/70 to-ink/5" />
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="mt-5 text-3xl font-semibold md:text-4xl">
                  {<MoneyText text={title} />}
                </h3>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {items.map((item) => (
                    <li
                      key={item}
                      className="rounded-full border border-white/20 bg-white/10 px-3.5 py-1 text-sm backdrop-blur"
                    >
                      {<MoneyText text={item} />}
                    </li>
                  ))}
                </ul>
                <span className="mt-5 inline-flex items-center gap-1.5 font-semibold text-primary">
                  {lang === "en" ? `See ${title.toLowerCase()}` : `Ver ${title.toLowerCase()}`}
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                </span>
              </Link>
            );
          })}
        </div>
        <p className="mt-6 text-sm text-muted-foreground">
          {<MoneyText text={t.categories.stock[0]} />}{" "}
          <a href={TEL} className="font-semibold text-ink hover:underline">
            {PHONE}
          </a>{" "}
          {<MoneyText text={t.categories.stock[1]} />}
        </p>
      </section>

      {/* How it works */}
      <section className="bg-ink text-white">
        <div className="mx-auto max-w-7xl px-5 py-16 md:py-20">
          <p className="eyebrow text-primary">{<MoneyText text={t.steps.kicker} />}</p>
          <h2 className="mt-4 max-w-3xl text-4xl font-semibold leading-[1.02] md:text-5xl">
            {<MoneyText text={t.steps.title} />}
          </h2>
          <ol className="mt-12 grid gap-px overflow-hidden rounded-3xl bg-white/10 md:grid-cols-2 lg:grid-cols-4">
            {t.steps.items.map(([title, body], i) => (
              <li key={title} className="flex flex-col bg-ink p-8">
                <span className="font-display text-6xl font-semibold text-primary">0{i + 1}</span>
                <h3 className="mt-8 text-xl font-semibold">{<MoneyText text={title} />}</h3>
                <p className="mt-2 leading-relaxed text-white/60">{<MoneyText text={body} />}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Perks */}
      <section className="mx-auto max-w-7xl px-5 py-16 md:py-20">
        <div className="grid gap-8 lg:grid-cols-[1fr_1.6fr]">
          <div>
            <p className="eyebrow text-slate">{<MoneyText text={t.perks.kicker} />}</p>
            <h2 className="mt-4 text-4xl font-semibold leading-[1.02] md:text-5xl">
              {<MoneyText text={t.perks.title} />}
            </h2>
            <p className="mt-6 max-w-sm text-lg leading-relaxed text-muted-foreground">
              {<MoneyText text={t.perks.body} />}
            </p>
            <p
              lang={lang === "en" ? "es" : "en"}
              className="mt-6 max-w-sm border-l-2 border-primary pl-4 text-sm italic text-muted-foreground"
            >
              {<MoneyText text={t.perks.quote} />}
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {t.perks.items.map(([title, body], i) => {
              const Icon = PERK_ICONS[i] ?? BadgeCheck;
              return (
                <article key={title} className="rounded-3xl border bg-card p-7">
                  <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/15 text-primary">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-6 text-lg font-semibold">{<MoneyText text={title} />}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {<MoneyText text={body} />}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <ReviewQuotes pick="leasing" lang={lang} className="border-t" />

      {/* FAQ */}
      <section id="faq" className="border-t bg-secondary/60">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 py-16 md:py-20 lg:grid-cols-[1fr_1.6fr]">
          <div>
            <p className="eyebrow text-slate">{<MoneyText text={t.faq.kicker} />}</p>
            <h2 className="mt-4 text-4xl font-semibold leading-[1.02] md:text-5xl">
              {<MoneyText text={t.faq.title} />}
            </h2>
          </div>
          <FaqList items={t.faq.items} />
        </div>
      </section>

      {/* CTA */}
      <section className="px-5 py-16 md:py-20">
        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-primary px-8 py-12 text-primary-foreground md:px-16 md:py-16">
          <DotRing
            className="absolute -right-16 -top-16 h-80 w-80 opacity-40"
            rings={[
              { r: 80, count: 12, dot: 7, className: "fill-ink" },
              { r: 52, count: 10, dot: 5, className: "fill-ink/60" },
            ]}
          />
          <div className="relative max-w-2xl">
            <h2 className="text-4xl font-semibold leading-[1.02] md:text-5xl">
              {<MoneyText text={t.cta.title} />}
            </h2>
            <p className="mt-5 text-lg">{<MoneyText text={t.cta.body} />}</p>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <a
                href={TEL}
                className="inline-flex items-center gap-2 rounded-full bg-ink px-7 py-3.5 font-semibold text-white transition hover:bg-ink-soft"
              >
                <Phone className="h-4 w-4" /> {PHONE}
              </a>
              <a
                href={DIRECTIONS}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-ink/30 px-7 py-3.5 font-semibold transition hover:border-ink"
              >
                {<MoneyText text={t.cta.directions} />} <ArrowUpRight className="h-4 w-4" />
              </a>
              <OpenBadge lang={lang} className="ml-2 rounded-full bg-ink px-4 py-2 text-white" />
            </div>
          </div>
        </div>
        <p className="mx-auto mt-8 max-w-7xl text-xs leading-relaxed text-muted-foreground">
          {<MoneyText text={t.disclaimer} />}
        </p>
      </section>

      <SiteFooter lang={lang} portals={false} />
      <MobileCallBar lang={lang} />
    </main>
  );
}
