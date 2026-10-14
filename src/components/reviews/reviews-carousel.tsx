import { Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight } from "lucide-react";

import {
  GOOGLE_RATING,
  GOOGLE_REVIEW_COUNT,
  GOOGLE_REVIEWS_URL,
  FEATURED_REVIEWS,
  type Review,
} from "@/components/reviews/data";
import { REVIEW_UI } from "@/components/reviews/copy";
import { Stars } from "@/components/site/chrome";
import { Scroller } from "@/components/site/scroller";
import { ALTERNATES, type Lang } from "@/components/site/seo";
import { cn } from "@/lib/utils";

/** Google's "G" (public/google-g.svg: one cached file instead of an inline SVG per card). */
export function GoogleMark({ className = "h-4 w-4" }: { className?: string }) {
  return <img src="/google-g.svg" alt="" width={16} height={16} className={className} />;
}

// Google's relative dates ("4 months ago") in the page's language.
function when(text: string, lang: Lang) {
  if (lang === "en") return text;
  const m = /^(a|an|\d+) (month|year|week|day|hour)s? ago$/.exec(text);
  if (!m) return text;
  const n = m[1] === "a" || m[1] === "an" ? 1 : Number(m[1]);
  const unit = {
    month: ["mes", "meses"],
    year: ["año", "años"],
    week: ["semana", "semanas"],
    day: ["día", "días"],
    hour: ["hora", "horas"],
  }[m[2] as "month" | "year" | "week" | "day" | "hour"];
  return `hace ${n} ${n === 1 ? unit[0] : unit[1]}`;
}

export function ReviewCard({
  review,
  lang,
  className,
}: {
  review: Review;
  lang: Lang;
  className?: string;
}) {
  const initial = review.author.charAt(0);
  return (
    <figure className={cn("flex h-full flex-col rounded-3xl border bg-card p-5 sm:p-6", className)}>
      <div className="flex items-center justify-between">
        <Stars stars={review.stars} className="text-base text-[#FBBC04]" />
        <span className="font-display text-4xl leading-none text-primary/30" aria-hidden="true">
          &rdquo;
        </span>
      </div>
      <blockquote lang="en" className="mt-3 flex-1 text-[15px] leading-relaxed text-ink">
        {review.text}
      </blockquote>
      {review.translated && (
        <p className="mt-2 text-xs text-muted-foreground">{REVIEW_UI[lang].translated}</p>
      )}
      <figcaption className="mt-5 flex items-center gap-3 border-t pt-4">
        <span
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/15 font-display font-semibold text-primary"
          aria-hidden="true"
        >
          {initial}
        </span>
        <span className="min-w-0 flex-1">
          <span className="block truncate font-semibold">{review.author}</span>
          <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <GoogleMark className="h-3.5 w-3.5" /> {REVIEW_UI[lang].google} ·{" "}
            {when(review.when, lang)}
          </span>
        </span>
      </figcaption>
    </figure>
  );
}

/** Horizontally scrolling Google reviews, for the home and location pages. */
export function ReviewsCarousel({ lang, className }: { lang: Lang; className?: string }) {
  const t = REVIEW_UI[lang];
  return (
    <section aria-labelledby="reviews-title" className={cn("py-14 md:py-20", className)}>
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-3 px-5">
          <div className="max-w-2xl">
            <p className="eyebrow flex items-center gap-2 text-primary">
              <GoogleMark className="h-4 w-4" /> {t.kicker}
            </p>
            <h2
              id="reviews-title"
              className="mt-2 text-3xl font-semibold leading-tight sm:text-4xl"
            >
              {t.title}
            </h2>
            <p className="mt-2 flex items-center gap-2 font-semibold">
              <Stars className="text-base text-[#FBBC04]" />
              {t.summary(GOOGLE_RATING, GOOGLE_REVIEW_COUNT)}
            </p>
            {t.original && <p className="mt-1 text-xs text-muted-foreground">{t.original}</p>}
          </div>
        </div>
        <Scroller label={t.title} prevLabel={t.prev} nextLabel={t.next} className="mt-4">
          {FEATURED_REVIEWS.map((r) => (
            <li key={r.author} className="w-[85%] shrink-0 snap-start sm:w-80 lg:w-96">
              <ReviewCard review={r} lang={lang} />
            </li>
          ))}
        </Scroller>
        <div className="mt-4 flex flex-col gap-2 px-5 sm:flex-row">
          <Link
            to={ALTERNATES.reviews[lang]}
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-ink px-6 font-semibold text-white"
          >
            {t.all} <ArrowRight className="h-4 w-4" />
          </Link>
          <a
            href={GOOGLE_REVIEWS_URL}
            target="_blank"
            rel="noopener"
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border px-6 font-semibold hover:border-primary hover:text-primary"
          >
            <GoogleMark /> {t.onGoogle} <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
