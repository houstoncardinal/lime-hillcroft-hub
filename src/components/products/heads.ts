import { CATEGORY_PAGES, type CategoryKey } from "@/components/products/data";
import { PRODUCT_PHOTOS } from "@/components/products/photos";
import { ogImage } from "@/components/site/og";
import { clipSchema } from "@/components/site/store-clips";
import { leasingService, pageSchema } from "@/components/site/schema";
import { ALTERNATES, absoluteUrl, pageHead, withBrand, type Lang } from "@/components/site/seo";

export function categoryHead(key: CategoryKey, lang: Lang) {
  const page = CATEGORY_PAGES[key];
  const t = page.text[lang];
  const paths = ALTERNATES[key];
  const url = absoluteUrl(paths[lang]);
  const image = ogImage(key, lang);
  const store = { "@id": absoluteUrl("/#store") };
  return pageHead({
    paths,
    lang,
    title: withBrand(t.title),
    description: t.description,
    image,
    imageAlt: t.imageAlt,
    jsonLd: pageSchema({
      paths,
      lang,
      name: t.title,
      description: t.description,
      image,
      pageType: ["WebPage", "CollectionPage"],
      breadcrumb: [
        [lang === "en" ? "Home" : "Inicio", ALTERNATES.home[lang]],
        [t.breadcrumb, paths[lang]],
      ],
      faqs: t.faq,
      extra: [
        // Everything on the page, grouped as on the shelves. In-store items, no online prices.
        {
          "@type": "OfferCatalog",
          "@id": `${url}#catalog`,
          name: t.groupsTitle,
          itemListElement: page.groups.map((g) => ({
            "@type": "OfferCatalog",
            name: g.title[lang],
            description: g.body[lang],
            itemListElement: g.items.map((item) => ({
              "@type": "Offer",
              availability: "https://schema.org/InStoreOnly",
              seller: store,
              itemOffered: {
                "@type": "Product",
                name: item[lang],
                category: page.category,
              },
            })),
          })),
        },
        {
          "@type": "ImageGallery",
          "@id": `${url}#photos`,
          name: t.galleryTitle,
          about: store,
          image: page.gallery.map(([photo, caption]) => ({
            "@type": "ImageObject",
            contentUrl: absoluteUrl(`/photos/${PRODUCT_PHOTOS[photo].file}.jpg`),
            caption: caption[lang],
          })),
        },
        ...page.galleryVideos.map(([clip, caption]) =>
          clipSchema(clip, caption[lang], `${caption[lang]} — ${t.description}`, absoluteUrl),
        ),
        ...(page.leasing
          ? [
              leasingService(
                lang,
                page.groups.flatMap((g) => g.items.map((i) => i[lang])),
              ),
            ]
          : []),
      ],
    }),
  });
}
