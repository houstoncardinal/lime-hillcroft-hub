import { areaCopy, HUB_COPY } from "@/components/areas/copy";
import { AREAS, shortName, type Area } from "@/components/areas/data";
import { areaPath, areaPaths } from "@/components/areas/paths";
import { pageSchema } from "@/components/site/schema";
import { ALTERNATES, absoluteUrl, pageHead, type Lang } from "@/components/site/seo";

const IMAGE = "/og/store.jpg";

export function areasHubHead(lang: Lang) {
  const t = HUB_COPY[lang];
  return pageHead({
    paths: ALTERNATES.areas,
    lang,
    title: t.title,
    description: t.description,
    image: IMAGE,
    imageAlt: t.title,
    jsonLd: pageSchema({
      paths: ALTERNATES.areas,
      lang,
      name: t.title,
      description: t.description,
      image: IMAGE,
      breadcrumb: [
        [t.breadcrumb[0] ?? "", ALTERNATES.home[lang]],
        [t.breadcrumb[1] ?? "", ALTERNATES.areas[lang]],
      ],
      faqs: [],
      extra: [
        {
          "@type": "ItemList",
          "@id": `${absoluteUrl(ALTERNATES.areas[lang])}#areas`,
          itemListElement: AREAS.map((a, i) => ({
            "@type": "ListItem",
            position: i + 1,
            url: absoluteUrl(areaPath(lang, a.slug)),
            name: shortName(a),
          })),
        },
      ],
    }),
  });
}

export function areaHead(lang: Lang, area: Area | undefined) {
  if (!area) return { meta: [{ title: HUB_COPY[lang].title }] };
  const t = areaCopy(area, lang);
  const paths = areaPaths(area.slug);
  const url = absoluteUrl(paths[lang]);
  const hub = HUB_COPY[lang];
  return pageHead({
    paths,
    lang,
    title: t.title,
    description: t.description,
    image: IMAGE,
    imageAlt: t.title,
    jsonLd: pageSchema({
      paths,
      lang,
      name: t.title,
      description: t.description,
      image: IMAGE,
      breadcrumb: [
        [hub.breadcrumb[0] ?? "", ALTERNATES.home[lang]],
        [hub.breadcrumb[1] ?? "", ALTERNATES.areas[lang]],
        [shortName(area), paths[lang]],
      ],
      faqs: t.faqs,
      extra: [
        {
          "@type": "Service",
          "@id": `${url}#service`,
          name: t.h1.join(" "),
          serviceType:
            lang === "en" ? "Cell phone repair and sales" : "Reparación y venta de celulares",
          description: t.distance,
          url,
          provider: { "@id": absoluteUrl("/#store") },
          areaServed: {
            "@type": "Place",
            name: shortName(area),
            geo: { "@type": "GeoCoordinates", latitude: area.lat, longitude: area.lon },
            address: {
              "@type": "PostalAddress",
              addressLocality: area.slug === "bellaire" ? "Bellaire" : "Houston",
              addressRegion: "TX",
              postalCode: area.zips[0],
              addressCountry: "US",
            },
            containedInPlace: { "@type": "City", name: "Houston" },
          },
        },
      ],
    }),
  });
}
