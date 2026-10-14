import { useState } from "react";

import { REVIEWS, type ReviewTopic } from "@/components/reviews/data";
import { REVIEW_LIST } from "@/components/reviews/copy";
import { ReviewCard } from "@/components/reviews/reviews-carousel";
import type { Lang } from "@/components/site/seo";
import { cn } from "@/lib/utils";

const PAGE = 24;

/**
 * All imported reviews with topic filters and "show more". Every review is in the HTML (for
 * search engines and AI answers); the rest are only hidden until asked for.
 */
export function ReviewList({ lang }: { lang: Lang }) {
  const t = REVIEW_LIST[lang];
  const [topic, setTopic] = useState<ReviewTopic | "all">("all");
  const [shown, setShown] = useState(PAGE);
  const list = topic === "all" ? REVIEWS : REVIEWS.filter((r) => r.topic === topic);
  const count = (k: ReviewTopic) => REVIEWS.filter((r) => r.topic === k).length;
  const chips: [ReviewTopic | "all", string, number][] = [
    ["all", t.all, REVIEWS.length],
    ["phones", t.phones, count("phones")],
    ["leasing", t.leasing, count("leasing")],
    ["repair", t.repair, count("repair")],
    ["accessories", t.accessories, count("accessories")],
    ["service", t.service, count("service")],
  ];

  return (
    <>
      <div role="group" aria-label={t.filter} className="mt-5 flex flex-wrap gap-2">
        {chips.map(([k, label, n]) => (
          <button
            key={k}
            type="button"
            aria-pressed={topic === k}
            onClick={() => {
              setTopic(k);
              setShown(PAGE);
            }}
            className={cn(
              "inline-flex min-h-10 cursor-pointer items-center gap-2 rounded-full px-4 text-sm font-semibold transition",
              topic === k ? "bg-ink text-white" : "border bg-card hover:border-primary",
            )}
          >
            {label}
            <span
              className={cn("text-xs", topic === k ? "text-white/70" : "text-muted-foreground")}
            >
              {n}
            </span>
          </button>
        ))}
      </div>
      <div className="mt-6 gap-4 sm:columns-2 lg:columns-3">
        {list.map((r, i) => (
          <ReviewCard
            key={`${r.author}-${i}`}
            review={r}
            lang={lang}
            className={cn("mb-4 h-auto break-inside-avoid", i >= shown && "hidden")}
          />
        ))}
      </div>
      {shown < list.length && (
        <div className="mt-2 flex flex-col items-center gap-2">
          <button
            type="button"
            onClick={() => setShown((n) => n + PAGE)}
            className="inline-flex min-h-12 cursor-pointer items-center rounded-full bg-ink px-6 font-semibold text-white"
          >
            {t.more(Math.min(PAGE, list.length - shown))}
          </button>
          <p className="text-xs text-muted-foreground">
            {t.of(Math.min(shown, list.length), list.length)}
          </p>
        </div>
      )}
    </>
  );
}
