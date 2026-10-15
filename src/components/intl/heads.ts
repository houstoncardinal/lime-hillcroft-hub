import { INTL_LANGS, intlPath, type IntlLang } from "@/components/intl/languages";
import { ogImage } from "@/components/site/og";
import { baseGraph } from "@/components/site/schema";
import { ALTERNATES, absoluteUrl } from "@/components/site/seo";

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
  if (!l) return { meta: [{ title: "TIC Wireless Electronic & Repair Center" }] };
  const url = absoluteUrl(intlPath(l.code));
  const img = absoluteUrl(ogImage(`lang-${l.code}`));
  return {
    meta: [
      { title: l.title },
      { name: "description", content: l.description },
      { name: "robots", content: "index, follow, max-snippet:-1, max-image-preview:large" },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "TIC Wireless Electronic & Repair Center" },
      { property: "og:locale", content: l.tag.replace("-", "_") },
      { property: "og:url", content: url },
      { property: "og:title", content: l.title },
      { property: "og:description", content: l.description },
      { property: "og:image", content: img },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:image:alt", content: l.h1 },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: l.title },
      { name: "twitter:description", content: l.description },
      { name: "twitter:image", content: img },
      { name: "twitter:image:alt", content: l.h1 },
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
              primaryImageOfPage: { "@type": "ImageObject", url: img, width: 1200, height: 630 },
              breadcrumb: { "@id": `${url}#breadcrumb` },
            },
            {
              "@type": "BreadcrumbList",
              "@id": `${url}#breadcrumb`,
              itemListElement: [
                {
                  "@type": "ListItem",
                  position: 1,
                  name: "TIC Wireless",
                  item: absoluteUrl(ALTERNATES.home.en),
                },
                { "@type": "ListItem", position: 2, name: l.native, item: url },
              ],
            },
          ],
        }),
      },
    ],
  };
}
