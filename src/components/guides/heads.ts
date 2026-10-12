import { ogImage } from "@/components/site/og";
import { GUIDES, type Guide } from "@/components/guides/data";
import { GUIDES_HUB } from "@/components/guides/hub-copy";
import { guidePath, guidePaths } from "@/components/guides/paths";
import { pageSchema } from "@/components/site/schema";
import { ALTERNATES, absoluteUrl, pageHead, withBrand, type Lang } from "@/components/site/seo";

const LANGUAGE = { en: "en-US", es: "es-US" } as const;

export function guidesHubHead(lang: Lang) {
  const t = GUIDES_HUB[lang];
  const image = ogImage("guides", lang);
  return pageHead({
    paths: ALTERNATES.guides,
    lang,
    title: t.title,
    description: t.description,
    image,
    imageAlt: t.title,
    jsonLd: pageSchema({
      paths: ALTERNATES.guides,
      lang,
      name: t.title,
      description: t.description,
      image,
      breadcrumb: [
        [t.breadcrumb[0] ?? "", ALTERNATES.home[lang]],
        [t.breadcrumb[1] ?? "", ALTERNATES.guides[lang]],
      ],
      faqs: [],
      extra: [
        {
          "@type": "ItemList",
          "@id": `${absoluteUrl(ALTERNATES.guides[lang])}#guides`,
          itemListElement: GUIDES.map((g, i) => ({
            "@type": "ListItem",
            position: i + 1,
            url: absoluteUrl(guidePath(lang, g.slug)),
            name: g.text[lang].title,
          })),
        },
      ],
    }),
  });
}

export function guideHead(lang: Lang, guide: Guide | undefined) {
  if (!guide) return { meta: [{ title: GUIDES_HUB[lang].title }] };
  const t = guide.text[lang];
  const paths = guidePaths(guide.slug);
  const url = absoluteUrl(paths[lang]);
  const hub = GUIDES_HUB[lang];
  const store = { "@id": absoluteUrl("/#store") };
  const image = ogImage(`guide-${guide.slug}`, lang);
  return pageHead({
    paths,
    lang,
    title: withBrand(t.metaTitle),
    description: t.description,
    image,
    imageAlt: t.title,
    jsonLd: pageSchema({
      paths,
      lang,
      name: t.title,
      description: t.description,
      image,
      breadcrumb: [
        [hub.breadcrumb[0] ?? "", ALTERNATES.home[lang]],
        [hub.breadcrumb[1] ?? "", ALTERNATES.guides[lang]],
        [t.title, paths[lang]],
      ],
      faqs: t.faq,
      extra: [
        {
          "@type": "Article",
          "@id": `${url}#article`,
          headline: t.title,
          description: t.description,
          abstract: t.quick.join(" "),
          inLanguage: LANGUAGE[lang],
          datePublished: guide.published,
          dateModified: guide.updated,
          author: store,
          publisher: store,
          image: absoluteUrl(image),
          mainEntityOfPage: { "@id": `${url}#webpage` },
          articleSection: hub.breadcrumb[1],
          wordCount: [
            t.description,
            ...t.quick,
            ...t.sections.flatMap((s) => [s.h, ...s.p, ...(s.list ?? [])]),
          ]
            .join(" ")
            .split(/\s+/).length,
        },
      ],
    }),
  });
}
