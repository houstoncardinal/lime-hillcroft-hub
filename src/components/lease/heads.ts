import { LEASE_DEVICES, LEASE_PATHS, leaseDevicePaths, leaseFrom, type LeaseDevice } from "@/components/lease/catalog";
import { LEASE_COPY } from "@/components/lease/copy";
import { LATEST_DEVICES } from "@/components/products/inventory";
import { ogImage } from "@/components/site/og";
import { leasingService, pageSchema } from "@/components/site/schema";
import { ALTERNATES, absoluteUrl, pageHead, withBrand, type Lang } from "@/components/site/seo";

// No Product/Offer markup: these are in-store leases, not online sales (same rule as /devices).

const usd = (n: number) => `$${n.toLocaleString("en-US", { maximumFractionDigits: 2 })}`;

export function leaseHubHead(lang: Lang) {
  const t = LEASE_COPY[lang];
  const url = absoluteUrl(LEASE_PATHS[lang]);
  const image = ogImage("home", lang);
  return pageHead({
    paths: LEASE_PATHS,
    lang,
    title: withBrand(t.metaTitle),
    description: t.metaDescription,
    image,
    imageAlt: t.metaTitle,
    jsonLd: pageSchema({
      paths: LEASE_PATHS,
      lang,
      name: t.metaTitle,
      description: t.metaDescription,
      image,
      pageType: ["WebPage", "CollectionPage"],
      breadcrumb: [
        [t.home, ALTERNATES.home[lang]],
        [t.crumb, LEASE_PATHS[lang]],
      ],
      faqs: t.faqs,
      extra: [
        {
          "@type": "ItemList",
          "@id": `${url}#devices`,
          name: t.crumb,
          itemListElement: LEASE_DEVICES.map((d, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: d.name,
            url: absoluteUrl(leaseDevicePaths(d.id)[lang]),
          })),
        },
        leasingService(
          lang,
          LEASE_DEVICES.map((d) => d.name),
        ),
      ],
    }),
  });
}

export function leaseDeviceHead(lang: Lang, device: LeaseDevice | undefined) {
  const t = LEASE_COPY[lang];
  if (!device) return { meta: [{ title: withBrand(t.metaTitle) }] };
  const paths = leaseDevicePaths(device.id);
  const title = `${device.name} — ${t.crumb} | TIC Wireless Houston`;
  const description = t.deviceMeta(device.name, usd(leaseFrom(device).lease));
  const photo = device.deviceId ? LATEST_DEVICES.find((d) => d.id === device.deviceId) : undefined;
  const image = photo ? absoluteUrl(photo.image) : ogImage("home", lang);
  return pageHead({
    paths,
    lang,
    title,
    description,
    image,
    imageAlt: device.name,
    jsonLd: pageSchema({
      paths,
      lang,
      name: title,
      description,
      image,
      breadcrumb: [
        [t.home, ALTERNATES.home[lang]],
        [t.crumb, LEASE_PATHS[lang]],
        [device.name, paths[lang]],
      ],
      faqs: [],
      extra: [leasingService(lang, [device.name])],
    }),
  });
}
