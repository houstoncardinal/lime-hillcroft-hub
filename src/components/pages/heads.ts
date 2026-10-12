import { homeAlternates } from "@/components/intl/heads";
import { LEASING_COPY } from "@/components/pages/leasing-copy";
import { HOME_COPY } from "@/components/pages/home-copy";
import { leasingService, pageSchema } from "@/components/site/schema";
import { ALTERNATES, pageHead, type Lang } from "@/components/site/seo";

export function homeHead(lang: Lang) {
  const t = HOME_COPY[lang];
  const image = "/og/home.jpg";
  const head = pageHead({
    paths: ALTERNATES.home,
    lang,
    title: t.meta.title,
    description: t.meta.description,
    image,
    imageAlt: t.meta.imageAlt,
    jsonLd: pageSchema({
      paths: ALTERNATES.home,
      lang,
      name: t.meta.title,
      description: t.meta.description,
      image,
      breadcrumb: [[t.meta.breadcrumb, ALTERNATES.home[lang]]],
      faqs: t.faq.items,
    }),
  });
  // Home exists in English, Spanish and the additional-language summary pages.
  return { ...head, links: [head.links[0]!, ...homeAlternates()] };
}

export function leasingHead(lang: Lang) {
  const t = LEASING_COPY[lang];
  const image = "/og/leasing.jpg";
  return pageHead({
    paths: ALTERNATES.leasing,
    lang,
    title: t.meta.title,
    description: t.meta.description,
    image,
    imageAlt: t.meta.imageAlt,
    jsonLd: pageSchema({
      paths: ALTERNATES.leasing,
      lang,
      name: t.meta.title,
      description: t.meta.description,
      image,
      breadcrumb: [
        [t.meta.breadcrumb[0] ?? "", ALTERNATES.home[lang]],
        [t.meta.breadcrumb[1] ?? "", ALTERNATES.leasing[lang]],
      ],
      faqs: t.faq.items,
      extra: [
        leasingService(
          lang,
          t.categories.items.flatMap((c) => c.items),
        ),
      ],
    }),
  });
}
