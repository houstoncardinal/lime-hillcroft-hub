import { LOCATION_COPY } from "@/components/location/copy";
import { ogImage } from "@/components/site/og";
import { clipSchema } from "@/components/site/store-clips";
import { pageSchema } from "@/components/site/schema";
import { ALTERNATES, absoluteUrl, pageHead, type Lang } from "@/components/site/seo";

// Store photos shown on the page, listed in the page's schema so they can appear in image search.
const PHOTOS = [
  "storefront-3640",
  "plaza",
  "store-counter",
  "case-wall",
  "apple-display",
  "jbl-display",
];

export function locationHead(lang: Lang) {
  const t = LOCATION_COPY[lang];
  const paths = ALTERNATES.location;
  const image = ogImage("location", lang);
  const url = absoluteUrl(paths[lang]);
  return pageHead({
    paths,
    lang,
    title: t.meta.title,
    description: t.meta.description,
    image,
    imageAlt: t.meta.imageAlt,
    jsonLd: pageSchema({
      paths,
      lang,
      name: t.meta.title,
      description: t.meta.description,
      image,
      pageType: ["WebPage", "ContactPage"],
      breadcrumb: [
        [t.meta.breadcrumb[0] ?? "", ALTERNATES.home[lang]],
        [t.meta.breadcrumb[1] ?? "", paths[lang]],
      ],
      faqs: t.faqs,
      extra: [
        // Page-scoped @id: the same clip is described differently on other pages.
        {
          ...clipSchema(
            "storeInterior",
            t.inside.video,
            `${t.inside.video} — ${t.meta.description}`,
            absoluteUrl,
          ),
          "@id": `${url}#video-storeInterior`,
        },
        {
          "@type": "ImageGallery",
          "@id": `${url}#photos`,
          name: t.inside.title,
          about: { "@id": absoluteUrl("/#store") },
          image: [
            [t.hero.photoAlt, PHOTOS[0]],
            [t.find.plazaAlt, PHOTOS[1]],
            ...t.inside.photos.slice(0, 4).map(([, caption], i) => [caption, PHOTOS[i + 2]]),
          ].map(([caption, file]) => ({
            "@type": "ImageObject",
            contentUrl: absoluteUrl(`/photos/${file}.jpg`),
            caption,
          })),
        },
      ],
    }),
  });
}
