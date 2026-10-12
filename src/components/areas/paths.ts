import { ALTERNATES, type Lang } from "@/components/site/seo";

export const areaPath = (lang: Lang, slug: string) => `${ALTERNATES.areas[lang]}/${slug}`;
export const areaPaths = (slug: string) => ({ en: areaPath("en", slug), es: areaPath("es", slug) });
export const directionsFrom = (origin: string) =>
  `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(`${origin}, Houston, TX`)}&destination=TIC+Wireless&destination_place_id=ChIJixKWSLTDQIYR3zudR495CpQ`;
