import { IN_HOUSE_COPY } from "@/components/pages/in-house-page";
import { ogImage } from "@/components/site/og";
import { pageSchema } from "@/components/site/schema";
import { ALTERNATES, pageHead, withBrand, type Lang } from "@/components/site/seo";

export function inHouseHead(lang: Lang) {
  const t = IN_HOUSE_COPY[lang];
  const image = ogImage("leasing", lang);
  return pageHead({
    paths: ALTERNATES.inHouse,
    lang,
    title: withBrand(t.metaTitle),
    description: t.metaDescription,
    image,
    imageAlt: t.title,
    jsonLd: pageSchema({
      paths: ALTERNATES.inHouse,
      lang,
      name: t.title,
      description: t.metaDescription,
      image,
      breadcrumb: [
        [t.home, ALTERNATES.home[lang]],
        [t.crumb, ALTERNATES.inHouse[lang]],
      ],
      faqs: t.faqs,
    }),
  });
}
