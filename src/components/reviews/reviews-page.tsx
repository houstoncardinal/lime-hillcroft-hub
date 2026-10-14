import { Link } from "@tanstack/react-router";
import { ArrowUpRight, MapPin, PenLine, Phone, Star } from "lucide-react";

import {
  GOOGLE_RATING,
  GOOGLE_REVIEW_COUNT,
  GOOGLE_REVIEWS_URL,
  REVIEWS_IMPORTED,
  REVIEW_TOPICS,
  WRITE_REVIEW_URL,
} from "@/components/reviews/data";
import { ReviewList } from "@/components/reviews/review-list";
import { GoogleMark } from "@/components/reviews/reviews-carousel";
import { DIRECTIONS, PHONE, TEL } from "@/components/site/business";
import { MobileCallBar, SiteFooter, SiteHeader } from "@/components/site/chrome";
import { REVIEWS_COPY } from "@/components/reviews/copy";
import { ALTERNATES, type Lang } from "@/components/site/seo";

export function ReviewsPage({ lang }: { lang: Lang }) {
  const t = REVIEWS_COPY[lang];
  const date = new Date(`${REVIEWS_IMPORTED}T12:00:00`).toLocaleDateString(
    lang === "en" ? "en-US" : "es-MX",
    { month: "long", day: "numeric", year: "numeric" },
  );
  return (
    <main className="overflow-x-hidden">
      <SiteHeader lang={lang} paths={ALTERNATES.reviews} />

      <section className="relative isolate overflow-hidden bg-ink text-white">
        <div className="grain absolute inset-0 -z-10 opacity-60" />
        <div className="absolute -right-40 -top-10 -z-10 h-[32rem] w-[32rem] rounded-full bg-primary/20 blur-[150px]" />
        <div className="mx-auto grid max-w-7xl gap-10 px-5 pb-14 pt-28 sm:pt-32 md:pb-20 md:pt-40 lg:grid-cols-[1.3fr_1fr] lg:items-end">
          <div>
            <nav aria-label="Breadcrumb" className="text-sm text-white/60">
              <Link to={ALTERNATES.home[lang]} className="hover:text-white">
                {t.breadcrumb[0]}
              </Link>
              <span className="mx-2">/</span>
              <span className="text-white">{t.breadcrumb[1]}</span>
            </nav>
            <h1 className="mt-6">
              <span className="eyebrow flex items-center gap-3 text-primary">
                <span className="h-px w-8 bg-primary" /> {t.kicker}
              </span>
              <span className="mt-5 block text-[clamp(2.2rem,6vw,4.5rem)] font-semibold leading-[1.02]">
                {t.h1[0]} <span className="text-primary">{t.h1[1]}</span>
              </span>
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-white/75 sm:text-lg">
              {t.intro}
            </p>
          </div>
          <div className="rounded-3xl bg-white/[0.06] p-6 ring-1 ring-white/10 sm:p-8">
            <p className="flex items-center gap-2 text-sm font-semibold text-white/80">
              <GoogleMark className="h-5 w-5" /> Google
            </p>
            <p className="mt-3 flex items-end gap-3">
              <span className="font-display text-7xl font-semibold leading-none">
                {GOOGLE_RATING}
              </span>
              <span className="mb-2 flex text-primary" aria-label={`${GOOGLE_RATING} / 5`}>
                {Array.from({ length: 5 }, (_, i) => (
                  <Star key={i} className="h-6 w-6 fill-current" />
                ))}
              </span>
            </p>
            <p className="mt-2 text-white/70">{t.reviews(GOOGLE_REVIEW_COUNT)}</p>
            <div className="mt-6 flex flex-col gap-2">
              <a
                href={GOOGLE_REVIEWS_URL}
                target="_blank"
                rel="noopener"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-primary px-5 font-semibold text-primary-foreground"
              >
                {t.readAll} <ArrowUpRight className="h-4 w-4" />
              </a>
              <a
                href={WRITE_REVIEW_URL}
                target="_blank"
                rel="noopener"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-white/20 px-5 font-semibold hover:border-white/60"
              >
                <PenLine className="h-4 w-4" /> {t.write}
              </a>
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="topics-title" className="mx-auto max-w-7xl px-5 pt-12 md:pt-16">
        <h2 id="topics-title" className="text-2xl font-semibold sm:text-3xl">
          {t.topics}
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">{t.topicsNote}</p>
        <ul className="mt-5 flex flex-wrap gap-2">
          {REVIEW_TOPICS.map(([en, es, count]) => (
            <li
              key={en}
              className="inline-flex items-center gap-2 rounded-full border bg-card px-4 py-2 text-sm font-semibold"
            >
              {lang === "en" ? en : es}
              <span className="rounded-full bg-primary/15 px-2 py-0.5 text-xs text-primary">
                {count}
              </span>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="list-title" className="mx-auto max-w-7xl px-5 py-12 md:py-16">
        <h2 id="list-title" className="text-2xl font-semibold sm:text-3xl">
          {t.latest}
        </h2>
        {t.original && <p className="mt-1 text-sm text-muted-foreground">{t.original}</p>}
        <ReviewList lang={lang} />
        <p className="mt-4 text-xs text-muted-foreground">{t.imported(date)}</p>
      </section>

      <section className="px-3 pb-16 sm:px-5 md:pb-24">
        <div className="mx-auto flex max-w-7xl flex-col items-start gap-6 rounded-3xl bg-ink px-6 py-10 text-white sm:px-10 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-3xl font-semibold">{t.cta}</h2>
            <p className="mt-1 text-white/70">{t.ctaBody}</p>
          </div>
          <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row">
            <a
              href={TEL}
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-primary px-6 font-semibold text-primary-foreground"
            >
              <Phone className="h-4 w-4" /> {PHONE}
            </a>
            <a
              href={DIRECTIONS}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-white/20 px-6 font-semibold"
            >
              <MapPin className="h-4 w-4" /> {t.directions}
            </a>
          </div>
        </div>
      </section>

      <SiteFooter lang={lang} />
      <MobileCallBar lang={lang} />
    </main>
  );
}
