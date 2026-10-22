import { CATEGORY_PAGES, type CategoryKey } from "@/components/products/data";
import { deviceFaqs } from "@/components/products/device-faqs";
import { devicePaths } from "@/components/products/device-paths";
import { DEVICE_PAGES, deviceTitle, type DeviceDetail } from "@/components/products/devices";
import { DEVICES_HUB_COPY } from "@/components/products/devices-hub-copy";
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

export function deviceHead(lang: Lang, entry: DevicePageEntry | undefined) {
  if (!entry) return { meta: [{ title: withBrand(lang === "en" ? "Devices" : "Equipos") }] };
  const { device, detail } = entry;
  const name = deviceTitle(device, detail);
  const leaseFrom = detail.leaseFrom ?? 40;
  const paths = devicePaths(device.id);
  const tablet = device.kind === "ipad";
  const title =
    lang === "en"
      ? `${name} in Houston | TIC Wireless`
      : `${name} en Houston | TIC Wireless`;
  const description = lang === "en"
    ? `${name} at TIC Wireless in Houston. Explore features and lease-to-own options on Hillcroft. Financing subject to approval.`
    : `${name} en TIC Wireless, Houston. Consulta características y opciones de arrendamiento en Hillcroft. Sujeto a aprobación.`;
  const image = ogImage(tablet ? "laptops" : "service-unlocked-phones", lang);
  const photo = detail.photo
    ? absoluteUrl(detail.photo.jpg)
    : absoluteUrl(device.image.replace(/\.webp$/, ".jpg"));
  return pageHead({
    paths,
    lang,
    title: withBrand(title),
    description,
    image,
    imageAlt: device.alt[lang],
    jsonLd: pageSchema({
      paths,
      lang,
      name: title,
      description,
      image,
      pageType: ["WebPage", "ItemPage"],
      breadcrumb: [
        [lang === "en" ? "Home" : "Inicio", ALTERNATES.home[lang]],
        tablet
          ? [lang === "en" ? "Laptops & tablets" : "Laptops y tabletas", ALTERNATES.laptops[lang]]
          : [
              lang === "en" ? "Unlocked phones" : "Celulares desbloqueados",
              servicePath(lang, "unlocked-phones"),
            ],
        [device.name, paths[lang]],
      ],
      faqs: deviceFaqs(device, lang, name, leaseFrom),
      // No Product node: in-store items have no online price, and a Product without offers is
      // a Search Console error (see categoryHead). The photo and leasing offer are described.
      extra: [
        {
          "@type": "ImageObject",
          "@id": `${absoluteUrl(paths[lang])}#photo`,
          contentUrl: photo,
          caption: detail.photo ? detail.photo.alt[lang] : device.alt[lang],
          ...(detail.photo?.credit
            ? {
                creditText: detail.photo.credit.author,
                license: detail.photo.credit.href,
              }
            : {}),
        },
        leasingService(lang, [name]),
      ],
    }),
  });
}

export function devicesHubHead(lang: Lang) {
  const t = DEVICES_HUB_COPY[lang];
  const paths = ALTERNATES.devices;
  const url = absoluteUrl(paths[lang]);
  const image = ogImage("service-unlocked-phones", lang);
  return pageHead({
    paths,
    lang,
    title: withBrand(t.metaTitle),
    description: t.metaDescription,
    image,
    imageAlt: t.metaTitle,
    jsonLd: pageSchema({
      paths,
      lang,
      name: t.metaTitle,
      description: t.metaDescription,
      image,
      pageType: ["WebPage", "CollectionPage"],
      breadcrumb: [
        [t.home, ALTERNATES.home[lang]],
        [t.crumb, paths[lang]],
      ],
      faqs: t.faqs,
      extra: [
        // A list of names and links, not Products: in-store items have no online prices.
        {
          "@type": "ItemList",
          "@id": `${url}#devices`,
          name: t.crumb,
          itemListElement: DEVICE_PAGES.map(({ device, detail }, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: deviceTitle(device, detail),
            url: absoluteUrl(devicePaths(device.id)[lang]),
          })),
        },
        leasingService(
          lang,
          DEVICE_PAGES.map(({ device, detail }) => deviceTitle(device, detail)),
        ),
      ],
    }),
  });
}
