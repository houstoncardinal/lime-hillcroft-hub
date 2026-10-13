import { REVIEWS_COPY } from "@/components/reviews/copy";
import { ogImage } from "@/components/site/og";
import { pageSchema } from "@/components/site/schema";
import { ALTERNATES, pageHead, type Lang } from "@/components/site/seo";

// No Review/AggregateRating markup: Google doesn't allow a business to mark up its own reviews.
export function reviewsHead(lang: Lang) {
  const t = REVIEWS_COPY[lang];
  const paths = ALTERNATES.reviews;
  const image = ogImage("reviews", lang);
  return pageHead({
    paths,
    lang,
    title: t.title,
    description: t.description,
    image,
    imageAlt: t.imageAlt,
    jsonLd: pageSchema({
      paths,
      lang,
      name: t.title,
      description: t.description,
      image,
      breadcrumb: [
        [t.breadcrumb[0] ?? "", ALTERNATES.home[lang]],
        [t.breadcrumb[1] ?? "", paths[lang]],
      ],
      faqs: [],
    }),
  });
}
