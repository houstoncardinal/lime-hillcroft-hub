// Public origin used for canonical URLs, hreflang, Open Graph and schema.org ids.
// Set VITE_SITE_URL when the site moves to a custom domain (and update public/sitemap.xml + robots.txt).
export const SITE_URL = String(
  import.meta.env["VITE_SITE_URL"] ?? "https://lime-hillcroft-hub.lovable.app",
).replace(/\/$/, "");

export type Lang = "en" | "es";

export const absoluteUrl = (path: string) =>
  /^https?:\/\//.test(path) ? path : `${SITE_URL}${path.startsWith("/") ? "" : "/"}${path}`;

// English and Spanish versions of each page, used for hreflang and the language switcher.
export const ALTERNATES = {
  home: { en: "/", es: "/es" },
  leasing: { en: "/leasing", es: "/es/arrendamiento" },
  shop: { en: "/shop", es: "/es/tienda" },
  areas: { en: "/areas", es: "/es/zonas" },
  guides: { en: "/guides", es: "/es/guias" },
  services: { en: "/services", es: "/es/servicios" },
} as const;

/** English and Spanish paths of one page. */
export type Paths = { en: string; es: string };

export type PageKey = keyof typeof ALTERNATES;

/** Adds the short brand to a page title when it still fits in Google's ~65-character title. */
export const withBrand = (title: string) =>
  title.length + 15 <= 65 ? `${title} | TIC Wireless` : title;

const LOCALE = { en: "en_US", es: "es_US" } as const;

export function pageHead({
  paths: alt,
  lang,
  title,
  description,
  image,
  imageAlt,
  jsonLd,
  noindex = false,
}: {
  paths: Paths;
  lang: Lang;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  jsonLd: object;
  /** Keep a page out of search results (e.g. preview products with placeholder prices). */
  noindex?: boolean;
}) {
  const url = absoluteUrl(alt[lang]);
  const img = absoluteUrl(image);
  return {
    meta: [
      { title },
      { name: "description", content: description },
      // Let Google (including AI Overviews) quote pages in full and show large images.
      {
        name: "robots",
        content: noindex
          ? "noindex, follow"
          : "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1",
      },
      { name: "geo.region", content: "US-TX" },
      { name: "geo.placename", content: "Houston" },
      { name: "geo.position", content: "29.7262272;-95.5014118" },
      { name: "ICBM", content: "29.7262272, -95.5014118" },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "TIC Wireless Electronic & Repair Center" },
      { property: "og:locale", content: LOCALE[lang] },
      { property: "og:locale:alternate", content: LOCALE[lang === "en" ? "es" : "en"] },
      { property: "og:url", content: url },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:image", content: img },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:image:alt", content: imageAlt },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
      { name: "twitter:image", content: img },
      { name: "twitter:image:alt", content: imageAlt },
    ],
    links: [
      { rel: "canonical", href: url },
      { rel: "alternate", hrefLang: "en-US", href: absoluteUrl(alt.en) },
      { rel: "alternate", hrefLang: "es-US", href: absoluteUrl(alt.es) },
      { rel: "alternate", hrefLang: "x-default", href: absoluteUrl(alt.en) },
    ],
    scripts: [{ type: "application/ld+json", children: JSON.stringify(jsonLd) }],
  };
}
