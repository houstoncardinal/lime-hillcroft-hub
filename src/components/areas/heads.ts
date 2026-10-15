import { ogImage } from "@/components/site/og";
import { areaCopy, HUB_COPY } from "@/components/areas/copy";
import { AREAS, shortName, type Area } from "@/components/areas/data";
import { areaPath, areaPaths } from "@/components/areas/paths";
import { pageSchema } from "@/components/site/schema";
import { ALTERNATES, absoluteUrl, pageHead, type Lang } from "@/components/site/seo";

export function areasHubHead(lang: Lang) {
  const t = HUB_COPY[lang];
  const image = ogImage("areas", lang);
  return pageHead({
    paths: ALTERNATES.areas,
    lang,
    title: t.title,
    description: t.description,
    image,
    imageAlt: t.title,
    jsonLd: pageSchema({
      paths: ALTERNATES.areas,
      lang,
      name: t.title,
      description: t.description,
      image,
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
  const image = ogImage(`area-${area.slug}`, lang);
  const store = { "@id": absoluteUrl("/#store") };
  const bellaire = area.slug === "bellaire";
  return pageHead({
    paths,
    lang,
    title: t.title,
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
        [hub.breadcrumb[1] ?? "", ALTERNATES.areas[lang]],
        [shortName(area), paths[lang]],
      ],
      faqs: t.faqs,
      extra: [
        {
          "@type": "Service",
          "@id": `${url}#service`,
          name:
            lang === "en"
              ? `Phone repair & cell phone store serving ${shortName(area)}`
              : `Reparación y tienda de celulares para ${shortName(area)}`,
          serviceType:
            lang === "en" ? "Cell phone repair and sales" : "Reparación y venta de celulares",
          // What the service is (the distance stays in the visible copy).
          description:
            lang === "en"
              ? `Same-day phone repair (screens, batteries, charging ports), unlocking, unlocked phones with leasing (no credit needed, subject to approval), prepaid plans and accessories for customers in ${shortName(area)}, at our store on Hillcroft in Southwest Houston.`
              : `Reparación de celulares el mismo día (pantallas, baterías, puertos de carga), liberación, celulares desbloqueados a pagos (sin necesidad de crédito, sujeto a aprobación), planes prepagados y accesorios para clientes de ${shortName(area)}, en nuestra tienda en Hillcroft, en el suroeste de Houston.`,
          url,
          inLanguage: lang === "en" ? "en-US" : "es-US",
          provider: store,
          availableLanguage: ["English", "Spanish"],
          availableChannel: {
            "@type": "ServiceChannel",
            serviceLocation: store,
            servicePhone: {
              "@type": "ContactPoint",
              telephone: "+1-713-339-9300",
              contactType: "customer service",
              availableLanguage: ["English", "Spanish"],
            },
          },
          areaServed: {
            "@type": "Place",
            name: shortName(area),
            geo: { "@type": "GeoCoordinates", latitude: area.lat, longitude: area.lon },
            address: {
              "@type": "PostalAddress",
              addressLocality: bellaire ? "Bellaire" : "Houston",
              addressRegion: "TX",
              postalCode: area.zips,
              addressCountry: "US",
            },
            // Bellaire is its own city, surrounded by Houston, not part of it.
            ...(bellaire ? {} : { containedInPlace: { "@type": "City", name: "Houston" } }),
          },
        },
      ],
    }),
  });
}
