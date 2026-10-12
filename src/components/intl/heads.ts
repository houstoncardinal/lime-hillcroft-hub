import { INTL_LANGS, intlPath, type IntlLang } from "@/components/intl/languages";
import { baseGraph } from "@/components/site/schema";
import { ALTERNATES, absoluteUrl } from "@/components/site/seo";

const IMAGE = "/og/home.jpg";

/** hreflang links shared by the home page in every language. */
export const homeAlternates = () => [
  { rel: "alternate", hrefLang: "en-US", href: absoluteUrl(ALTERNATES.home.en) },
  { rel: "alternate", hrefLang: "es-US", href: absoluteUrl(ALTERNATES.home.es) },
  ...INTL_LANGS.map((l) => ({
    rel: "alternate",
    hrefLang: l.tag,
    href: absoluteUrl(intlPath(l.code)),
  })),
  { rel: "alternate", hrefLang: "x-default", href: absoluteUrl(ALTERNATES.home.en) },
];

export function intlHead(l: IntlLang | undefined) {
  if (!l) return { meta: [{ title: "TIC Wireless" }] };
  const url = absoluteUrl(intlPath(l.code));
  const img = absoluteUrl(IMAGE);
  return {
    meta: [
      { title: l.title },
      { name: "description", content: l.description },
      { name: "robots", content: "index, follow, max-snippet:-1, max-image-preview:large" },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "TIC Wireless" },
      { property: "og:locale", content: l.tag.replace("-", "_") },
      { property: "og:url", content: url },
      { property: "og:title", content: l.title },
      { property: "og:description", content: l.description },
      { property: "og:image", content: img },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: url }, ...homeAlternates()],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            ...baseGraph("en"),
            {
              "@type": "WebPage",
              "@id": `${url}#webpage`,
              url,
              name: l.title,
              description: l.description,
              inLanguage: l.tag,
              isPartOf: { "@id": absoluteUrl("/#website") },
              about: { "@id": absoluteUrl("/#store") },
            },
          ],
        }),
      },
    ],
  };
}
