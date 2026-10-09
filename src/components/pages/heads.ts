import { FINANCING_COPY } from "@/components/pages/financing-copy";
import { HOME_COPY } from "@/components/pages/home-copy";
import { financingService, pageSchema } from "@/components/site/schema";
import { ALTERNATES, pageHead, type Lang } from "@/components/site/seo";

export function homeHead(lang: Lang) {
  const t = HOME_COPY[lang];
  const image = "/og/home.jpg";
  return pageHead({
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
}

export function financingHead(lang: Lang) {
  const t = FINANCING_COPY[lang];
  const image = "/og/financing.jpg";
  return pageHead({
    paths: ALTERNATES.financing,
    lang,
    title: t.meta.title,
    description: t.meta.description,
    image,
    imageAlt: t.meta.imageAlt,
    jsonLd: pageSchema({
      paths: ALTERNATES.financing,
      lang,
      name: t.meta.title,
      description: t.meta.description,
      image,
      breadcrumb: [
        [t.meta.breadcrumb[0] ?? "", ALTERNATES.home[lang]],
        [t.meta.breadcrumb[1] ?? "", ALTERNATES.financing[lang]],
      ],
      faqs: t.faq.items,
      extra: [
        financingService(
          lang,
          t.categories.items.flatMap((c) => c.items),
        ),
      ],
    }),
  });
}
