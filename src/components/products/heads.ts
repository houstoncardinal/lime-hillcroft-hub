import { CATEGORY_PAGES, type CategoryKey } from "@/components/products/data";
import { DEVICE_PAGES, deviceTitle, type DeviceDetail } from "@/components/products/devices";
import type { Device } from "@/components/products/inventory";
import { PRODUCT_PHOTOS } from "@/components/products/photos";
import { ogImage } from "@/components/site/og";
import { clipSchema } from "@/components/site/store-clips";
import { leasingService, pageSchema } from "@/components/site/schema";
import { servicePath } from "@/components/services/paths";
import { ALTERNATES, absoluteUrl, pageHead, withBrand, type Lang } from "@/components/site/seo";

type DevicePageEntry = { device: Device; detail: DeviceDetail };

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
        // Everything on the page, grouped as on the shelves. A plain list of names, not
        // Products: in-store items have no online prices, and a Product without offers is a
        // Search Console "Product snippets" error.
        {
          "@type": "ItemList",
          "@id": `${url}#catalog`,
          name: t.groupsTitle,
          about: store,
          itemListElement: page.groups.map((g, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: g.title[lang],
            description: g.body[lang],
            item: {
              "@type": "ItemList",
              name: g.title[lang],
              itemListElement: g.items.map((item, j) => ({
                "@type": "ListItem",
                position: j + 1,
                name: item[lang],
              })),
            },
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
        // Page-scoped @id: the same clip is described differently on other pages.
        ...page.galleryVideos.map(([clip, caption]) => ({
          ...clipSchema(clip, caption[lang], `${caption[lang]} — ${t.description}`, absoluteUrl),
          "@id": `${url}#video-${clip}`,
        })),
        ...(page.leasing
          ? [
              leasingService(
                lang,
                (page.leaseItems ?? page.groups.flatMap((g) => g.items)).map((i) => i[lang]),
              ),
            ]
          : []),
      ],
    }),
  });
}
