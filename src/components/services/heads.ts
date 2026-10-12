import { SERVICES, type Service } from "@/components/services/data";
import { SERVICES_HUB } from "@/components/services/hub-copy";
import { servicePath, servicePaths } from "@/components/services/paths";
import { ogImage } from "@/components/site/og";
import { pageSchema, serviceNode } from "@/components/site/schema";
import { ALTERNATES, absoluteUrl, pageHead, withBrand, type Lang } from "@/components/site/seo";

export function servicesHubHead(lang: Lang) {
  const t = SERVICES_HUB[lang];
  const image = ogImage("services", lang);
  return pageHead({
    paths: ALTERNATES.services,
    lang,
    title: t.title,
    description: t.description,
    image,
    imageAlt: t.title,
    jsonLd: pageSchema({
      paths: ALTERNATES.services,
      lang,
      name: t.title,
      description: t.description,
      image,
      breadcrumb: [
        [t.breadcrumb[0] ?? "", ALTERNATES.home[lang]],
        [t.breadcrumb[1] ?? "", ALTERNATES.services[lang]],
      ],
      faqs: [],
      extra: [
        {
          "@type": "ItemList",
          "@id": `${absoluteUrl(ALTERNATES.services[lang])}#services`,
          itemListElement: SERVICES.map((s, i) => ({
            "@type": "ListItem",
            position: i + 1,
            url: absoluteUrl(servicePath(lang, s.slug)),
            name: s.text[lang].name,
          })),
        },
      ],
    }),
  });
}

export function serviceHead(lang: Lang, service: Service | undefined) {
  if (!service) return { meta: [{ title: SERVICES_HUB[lang].title }] };
  const t = service.text[lang];
  const paths = servicePaths(service.slug);
  const hub = SERVICES_HUB[lang];
  const image = ogImage(`service-${service.slug}`, lang);
  return pageHead({
    paths,
    lang,
    title: withBrand(t.metaTitle),
    description: t.metaDescription,
    image,
    imageAlt: t.imageAlt,
    jsonLd: pageSchema({
      paths,
      lang,
      name: t.metaTitle,
      description: t.metaDescription,
      image,
      breadcrumb: [
        [hub.breadcrumb[0] ?? "", ALTERNATES.home[lang]],
        [hub.breadcrumb[1] ?? "", ALTERNATES.services[lang]],
        [t.name, paths[lang]],
      ],
      faqs: t.faq,
      extra: [
        serviceNode({
          lang,
          path: paths[lang],
          name: t.name,
          serviceType: service.serviceType,
          description: t.intro,
          image,
          offers: t.offers,
        }),
      ],
    }),
  });
}
