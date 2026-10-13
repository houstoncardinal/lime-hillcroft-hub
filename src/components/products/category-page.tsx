import { Link } from "@tanstack/react-router";
import { ArrowRight, CircleCheck, MapPin, MessageCircleQuestion, Phone } from "lucide-react";

import { MoneyText } from "@/components/intl/money";
import { CATEGORY_PAGES, type CategoryKey } from "@/components/products/data";
import { TABLETS } from "@/components/products/inventory";
import { LatestDevices } from "@/components/products/latest-devices";
import { PRODUCT_PHOTOS } from "@/components/products/photos";
import { ADDRESS, DIRECTIONS, PHONE, TEL } from "@/components/site/business";
import { MobileCallBar, OpenBadge, SiteFooter, SiteHeader } from "@/components/site/chrome";
import { FaqList } from "@/components/site/faq";
import { LeasingPortals } from "@/components/site/leasing-portals";
import { Photo } from "@/components/site/photo";
import { StoreVideo } from "@/components/site/store-video";
import { ALTERNATES, type Lang } from "@/components/site/seo";

const UI = {
  en: {
    home: "Home",
    directions: "Directions",
    apply: "Apply for leasing",
    faq: "Common questions",
    related: "Keep exploring",
    visit: "See it in person",
    visitBody: "Walk in any day — no appointment needed. Se habla español.",
    location: "Location & hours",
  },
  es: {
    home: "Inicio",
    directions: "Cómo llegar",
    apply: "Solicita arrendamiento",
    faq: "Preguntas frecuentes",
    related: "Sigue explorando",
    visit: "Míralo en persona",
    visitBody: "Ven cualquier día, sin cita. We speak English.",
    location: "Ubicación y horario",
  },
};

export function CategoryPage({ category, lang }: { category: CategoryKey; lang: Lang }) {
  const page = CATEGORY_PAGES[category];
  const t = page.text[lang];
  const ui = UI[lang];
  const hero = PRODUCT_PHOTOS[page.heroPhoto];

  return (
    <main className="overflow-x-hidden">
      <SiteHeader lang={lang} paths={ALTERNATES[category]} />

      {/* Hero */}
      <section className="relative isolate overflow-hidden bg-ink text-white">
        {/* Looping store clip behind the hero, darkened so the text stays readable. */}
        <div className="absolute inset-0 -z-20">
          <StoreVideo clip={page.heroVideo} className="opacity-45" />
        </div>
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-ink via-ink/85 to-ink/55" />
        <div className="absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-t from-ink to-transparent" />
        <div className="grain absolute inset-0 -z-10 opacity-40" />
        <div className="mx-auto grid max-w-7xl gap-10 px-5 pb-14 pt-28 sm:pt-32 md:pb-20 md:pt-40 lg:grid-cols-[1.1fr_1fr] lg:items-center">
          <div>
            <nav aria-label="Breadcrumb" className="text-sm text-white/60">
              <Link to={ALTERNATES.home[lang]} className="hover:text-white">
                {ui.home}
              </Link>
              <span className="mx-2">/</span>
              <span className="text-white">{t.breadcrumb}</span>
            </nav>
            <h1 className="mt-6">
              <span className="eyebrow flex items-center gap-3 text-primary">
                <span className="h-px w-8 bg-primary" /> {t.kicker}
              </span>
              <span className="mt-5 block text-[clamp(2.25rem,6vw,4.5rem)] font-semibold leading-[1.02]">
                {t.h1[0]} <span className="text-primary">{t.h1[1]}</span>
              </span>
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-white/75 sm:text-lg">
              <MoneyText text={t.intro} />
            </p>
            <ul className="mt-6 flex flex-wrap gap-2">
              {t.chips.map((c) => (
                <li
                  key={c}
                  className="rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-sm text-white/85"
                >
                  <MoneyText text={c} />
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              {page.leasing && (
                <a
                  href="#apply"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-primary px-6 font-semibold text-primary-foreground transition hover:brightness-110"
                >
                  {ui.apply} <ArrowRight className="h-4 w-4" />
                </a>
              )}
              <a
                href={TEL}
                className={
                  page.leasing
                    ? "inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-white/20 px-6 font-semibold transition hover:border-white/60"
                    : "inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-primary px-6 font-semibold text-primary-foreground transition hover:brightness-110"
                }
              >
                <Phone className="h-4 w-4" /> {t.cta}
              </a>
              <a
                href={DIRECTIONS}
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-white/20 px-6 font-semibold transition hover:border-white/60"
              >
                <MapPin className="h-4 w-4" /> {ui.directions}
              </a>
            </div>
          </div>
          <figure className="relative aspect-[4/3] overflow-hidden rounded-3xl ring-1 ring-white/10 md:aspect-[16/9] lg:aspect-[4/3]">
            {page.heroCardVideo ? (
              <StoreVideo
                clip={page.heroCardVideo}
                label={t.imageAlt}
                className="absolute inset-0"
              />
            ) : (
              <Photo
                src={hero.src}
                srcSm={hero.sm}
                width={hero.w}
                height={hero.h}
                sizes="(min-width: 1024px) 45vw, 100vw"
                alt={t.imageAlt}
                priority
                className="absolute inset-0"
              />
            )}
            <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/90 to-transparent p-5 pt-16">
              <OpenBadge lang={lang} />
            </figcaption>
          </figure>
        </div>
      </section>

      {/* Product groups */}
      <section aria-labelledby="groups-title" className="mx-auto max-w-7xl px-5 py-14 md:py-24">
        <p className="eyebrow text-ink/60">{t.groupsKicker}</p>
        <h2
          id="groups-title"
          className="mt-3 max-w-3xl text-3xl font-semibold leading-[1.05] sm:text-4xl md:text-5xl"
        >
          {t.groupsTitle}
        </h2>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {page.groups.map((g) => {
            const p = PRODUCT_PHOTOS[g.photo];
            return (
              <article
                key={g.id}
                id={g.id}
                className="flex scroll-mt-24 flex-col overflow-hidden rounded-3xl border bg-card"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-secondary">
                  <Photo
                    src={p.src}
                    srcSm={p.sm}
                    width={p.w}
                    height={p.h}
                    sizes="(min-width: 1024px) 30vw, (min-width: 640px) 50vw, 100vw"
                    alt={g.photoAlt[lang]}
                    className="absolute inset-0"
                    {...(g.focus
                      ? {
                          style: {
                            objectPosition: g.focus,
                            transform: `scale(${g.zoom ?? 1})`,
                            transformOrigin: g.focus,
                          },
                        }
                      : {})}
                  />
                </div>
                <div className="flex flex-1 flex-col p-5 sm:p-6">
                  <h3 className="font-display text-xl font-semibold">{g.title[lang]}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                    {g.body[lang]}
                  </p>
                  <ul className="mt-4 space-y-2 border-t pt-4 text-sm">
                    {g.items.map((item) => (
                      <li key={item.en} className="flex gap-2">
                        <CircleCheck className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                        <span>{item[lang]}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {category === "laptops" && (
        <LatestDevices
          devices={TABLETS}
          lang={lang}
          title={
            lang === "en" ? "Just in: iPads on our shelves." : "Recién llegados: iPad en vitrina."
          }
          className="pt-0 md:pt-0"
        />
      )}

      {/* How buying / leasing works */}
      <section aria-labelledby="buy-title" className="bg-secondary/50">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 md:py-20 lg:grid-cols-[1fr_1.1fr] lg:items-start">
          <div>
            <p className="eyebrow text-ink/60">{t.buyKicker}</p>
            <h2
              id="buy-title"
              className="mt-3 text-3xl font-semibold leading-[1.05] sm:text-4xl md:text-5xl"
            >
              {t.buyTitle}
            </h2>
            <p className="mt-4 max-w-xl leading-relaxed text-muted-foreground">
              <MoneyText text={t.buyBody} />
            </p>
          </div>
          <ol className="space-y-4">
            {t.buySteps.map(([title, body], i) => (
              <li key={title} className="flex gap-4 rounded-2xl border bg-card p-5">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-ink font-semibold text-white">
                  {i + 1}
                </span>
                <div>
                  <h3 className="font-display text-lg font-semibold">{title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                    <MoneyText text={body} />
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {page.leasing && <LeasingPortals lang={lang} />}

      {/* Gallery: swipe on phones, grid from tablets up */}
      <section aria-labelledby="gallery-title" className="bg-ink text-white">
        <div className="mx-auto max-w-7xl py-14 md:py-20">
          <h2 id="gallery-title" className="px-5 text-3xl font-semibold sm:text-4xl">
            {t.galleryTitle}
          </h2>
          <ul className="mt-8 flex snap-x snap-mandatory scroll-px-5 gap-3 overflow-x-auto px-5 pb-2 [scrollbar-width:none] sm:grid sm:grid-cols-2 sm:overflow-visible lg:grid-cols-3">
            {page.galleryVideos.map(([clip, caption]) => (
              <li key={clip} className="w-[82%] shrink-0 snap-start sm:w-auto">
                <figure className="overflow-hidden rounded-3xl bg-white/5 ring-1 ring-white/10">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <StoreVideo clip={clip} label={caption[lang]} className="absolute inset-0" />
                  </div>
                  <figcaption className="px-4 py-3 text-sm text-white/80">
                    {caption[lang]}
                  </figcaption>
                </figure>
              </li>
            ))}
            {page.gallery.map(([key, caption]) => {
              const p = PRODUCT_PHOTOS[key];
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
                        alt={caption[lang]}
                      />
                    </div>
                    <figcaption className="px-4 py-3 text-sm text-white/80">
                      {caption[lang]}
                    </figcaption>
                  </figure>
                </li>
              );
            })}
          </ul>
          <div className="mt-10 px-5">
            <h3 className="text-xs font-bold uppercase tracking-[0.18em] text-white/50">
              {t.brandsTitle}
            </h3>
            <ul className="mt-3 flex flex-wrap gap-2">
              {page.brands.map((b) => (
                <li key={b} className="rounded-full bg-white/10 px-4 py-1.5 text-sm font-semibold">
                  {b}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-3xl px-5 py-14 md:py-20">
        <h2 className="flex items-center gap-2 text-3xl font-semibold sm:text-4xl">
          <MessageCircleQuestion className="h-7 w-7 text-primary" /> {ui.faq}
        </h2>
        <div className="mt-6">
          <FaqList items={t.faq} />
        </div>
      </section>

      {/* Related + visit */}
      <section className="mx-auto max-w-7xl px-5 pb-16 md:pb-24">
        <div className="grid gap-4 lg:grid-cols-[1fr_1.4fr]">
          <nav aria-label={ui.related} className="rounded-3xl border bg-card p-6">
            <h2 className="font-display text-xl font-semibold">{ui.related}</h2>
            <ul className="mt-3 divide-y">
              {t.related.map(([label, href]) => (
                <li key={href}>
                  <Link
                    to={href}
                    className="flex min-h-12 items-center justify-between gap-3 font-semibold hover:text-primary"
                  >
                    {label} <ArrowRight className="h-4 w-4 text-primary" />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <aside className="rounded-3xl bg-ink p-6 text-white sm:p-8">
            <h2 className="font-display text-2xl font-semibold">{ui.visit}</h2>
            <p className="mt-1 text-white/70">{ui.visitBody}</p>
            <p className="mt-4">{ADDRESS}</p>
            <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:flex-wrap">
              <a
                href={TEL}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-primary px-5 font-semibold text-primary-foreground"
              >
                <Phone className="h-4 w-4" /> {PHONE}
              </a>
              <Link
                to={ALTERNATES.location[lang]}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-white/20 px-5 font-semibold hover:border-white/60"
              >
                <MapPin className="h-4 w-4" /> {ui.location}
              </Link>
            </div>
          </aside>
        </div>
      </section>

      {/* Consoles have the full apply section above; accessories are bought outright. */}
      <SiteFooter lang={lang} portals={false} />
      <MobileCallBar lang={lang} />
    </main>
  );
}
