import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

import { GOOGLE_RATING, GOOGLE_REVIEW_COUNT } from "@/components/reviews/data";
import { REVIEW_UI } from "@/components/reviews/copy";
import { pickedReviews, type ReviewPick } from "@/components/reviews/picks";
import { GoogleMark, ReviewCard } from "@/components/reviews/reviews-carousel";
import { Stars } from "@/components/site/chrome";
import { ALTERNATES, type Lang } from "@/components/site/seo";
import { cn } from "@/lib/utils";

/** A row of three matching Google reviews with the overall rating and a link to all reviews. */
export function ReviewQuotes({
  pick,
  lang,
  className,
}: {
  pick: ReviewPick;
  lang: Lang;
  className?: string;
}) {
  const t = REVIEW_UI[lang];
  const reviews = pickedReviews(pick);
  if (!reviews.length) return null;
  return (
    <section aria-labelledby={`reviews-${pick}`} className={cn("py-14 md:py-20", className)}>
      <div className="mx-auto max-w-7xl px-5">
        <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-3">
          <div className="max-w-2xl">
            <p className="eyebrow flex items-center gap-2 text-primary">
              <GoogleMark className="h-4 w-4" /> {t.kicker}
            </p>
            <h2
              id={`reviews-${pick}`}
              className="mt-2 text-3xl font-semibold leading-tight sm:text-4xl"
            >
              {t.title}
            </h2>
            <p className="mt-2 flex flex-wrap items-center gap-2 font-semibold">
              <Stars className="text-base text-[#FBBC04]" />
              {t.summary(GOOGLE_RATING, GOOGLE_REVIEW_COUNT)}
            </p>
            {t.original && <p className="mt-1 text-xs text-muted-foreground">{t.original}</p>}
          </div>
          <Link
            to={ALTERNATES.reviews[lang]}
            className="tap inline-flex items-center gap-1.5 font-semibold text-ink underline decoration-primary decoration-2 underline-offset-4"
          >
            {t.all} <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <ul className="mt-8 grid gap-4 md:grid-cols-3">
          {reviews.map((r) => (
            <li key={r.author}>
              <ReviewCard review={r} lang={lang} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
