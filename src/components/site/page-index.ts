// Every indexable page with its <head>, for the SEO audit (scripts/seo-audit.mjs) and the
// share-image generator (scripts/og.mjs). Not imported by the app.
import { AREAS } from "@/components/areas/data";
import { areaHead, areasHubHead } from "@/components/areas/heads";
import { areaPath } from "@/components/areas/paths";
import { GUIDES } from "@/components/guides/data";
import { guideHead, guidesHubHead } from "@/components/guides/heads";
import { guidePath } from "@/components/guides/paths";
import { intlHead } from "@/components/intl/heads";
import { INTL_LANGS, intlPath } from "@/components/intl/languages";
import { homeHead, leasingHead } from "@/components/pages/heads";
import { SERVICES } from "@/components/services/data";
import { serviceHead, servicesHubHead } from "@/components/services/heads";
import { servicePath } from "@/components/services/paths";
import { SHOP_ENABLED } from "@/components/site/features";
import { ALTERNATES, type Lang } from "@/components/site/seo";
import { shopHead } from "@/shop/heads";

type Head = { meta?: Record<string, string>[]; links?: Record<string, string>[] };

const LANGS: Lang[] = ["en", "es"];

function pages(): [string, Head][] {
  return [
    ...LANGS.flatMap((l): [string, Head][] => [
      [ALTERNATES.home[l], homeHead(l)],
      [ALTERNATES.leasing[l], leasingHead(l)],
      ...(SHOP_ENABLED ? [[ALTERNATES.shop[l], shopHead(l, undefined)] as [string, Head]] : []),
      [ALTERNATES.services[l], servicesHubHead(l)],
      ...SERVICES.map((s): [string, Head] => [servicePath(l, s.slug), serviceHead(l, s)]),
      [ALTERNATES.areas[l], areasHubHead(l)],
      ...AREAS.map((a): [string, Head] => [areaPath(l, a.slug), areaHead(l, a)]),
      [ALTERNATES.guides[l], guidesHubHead(l)],
      ...GUIDES.map((g): [string, Head] => [guidePath(l, g.slug), guideHead(l, g)]),
    ]),
    ...INTL_LANGS.map((l): [string, Head] => [intlPath(l.code), intlHead(l)]),
  ];
}

const metaValue = (head: Head, key: string) =>
  head.meta?.find((m) => m["name"] === key || m["property"] === key)?.["content"] ?? "";

export function allPageHeads() {
  return pages().map(([path, head]) => ({
    path,
    title: head.meta?.find((m) => "title" in m)?.["title"] ?? "",
    description: metaValue(head, "description"),
    image: metaValue(head, "og:image"),
    imageAlt: metaValue(head, "og:image:alt"),
    /** [hreflang, absolute URL] pairs, as in the page's <link rel="alternate"> tags. */
    alternates: (head.links ?? [])
      .filter((link) => link["rel"] === "alternate" && link["hrefLang"])
      .map((link) => [link["hrefLang"] ?? "", link["href"] ?? ""]),
  }));
}
