// SEO maintenance for TIC Wireless.
//   node scripts/seo.mjs sitemap   → regenerate public/sitemap.xml from the site's pages
//   node scripts/seo.mjs indexnow  → tell Bing/IndexNow (used by ChatGPT & Copilot search) about every URL
// Run "sitemap" after adding pages; run "indexnow" after each deploy to the live domain.
import { execFileSync } from "node:child_process";
import fs from "node:fs";

import { loadModule, loadPages, root } from "./lib/pages.mjs";

// The live domain (same rule as SITE_URL in src/components/site/seo.ts: never a temp host).
const override = (process.env.SITE_URL ?? "").replace(/\/$/, "");
const SITE =
  override && !/\.(lovable|netlify)\.app$/i.test(override)
    ? override
    : "https://www.ticwirelesstx.com";
const today = new Date().toISOString().slice(0, 10);
// Used only when git can't date a page (no git checkout); never stamped on every page by default.
const FALLBACK_LASTMOD = "2026-10-14";
const xml = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

// Every indexable page, read from the same <head> data the site renders: canonical path,
// hreflang alternates and share image.
const pages = await loadPages();

// Store photos (copies in public/photos) shown on each page, listed for image search too.
const photos = (...names) => names.map((n) => `${SITE}/photos/${n}.jpg`);
const STORE = photos(
  "storefront-3640",
  "plaza",
  "store-counter",
  "case-wall",
  "apple-display",
  "jbl-display",
  "phones-display",
);
const ACCESSORIES = photos(
  "accessories-case-wall",
  "iphone-cases-wall",
  "samsung-cases-wall",
  "chargers-wall",
  "jbl-speakers-case",
  "airpods-watches-case",
  "jbl-display-case",
  "galaxy-watch-tab",
  "airpods-max-ipads",
);
const CONSOLES = photos(
  "consoles-table",
  "airpods-max-ipads",
  "jbl-speakers-case",
  "airpods-watches-case",
);
const IPHONE_18 = [
  ...photos(
    "iphone-18-pro-max",
    "iphone-cases-wall",
    "screen-protector",
    "chargers-wall",
    "store-counter",
  ),
  `${SITE}/photos/devices/iphone-18.jpg`,
];
const LAPTOPS = photos("laptops-tablets", "airpods-max-ipads", "galaxy-watch-tab", "apple-display");
const DEVICES = fs
  .readdirSync("public/photos/devices")
  .filter((f) => f.endsWith(".jpg"))
  .map((f) => `${SITE}/photos/devices/${f}`);
const PAGE_PHOTOS = {
  "/location": STORE,
  "/es/ubicacion": STORE,
  "/accessories": ACCESSORIES,
  "/es/accesorios": ACCESSORIES,
  "/game-consoles": CONSOLES,
  "/es/consolas": CONSOLES,
  "/laptops-tablets": [...LAPTOPS, ...DEVICES.filter((d) => d.includes("ipad"))],
  "/services/unlocked-phones": DEVICES.filter((d) => !d.includes("ipad")),
  "/es/servicios/unlocked-phones": DEVICES.filter((d) => !d.includes("ipad")),
  "/iphone-18": IPHONE_18,
  "/es/iphone-18": IPHONE_18,
  "/es/laptops-y-tabletas": [...LAPTOPS, ...DEVICES.filter((d) => d.includes("ipad"))],
};

// <lastmod> is the date a page's own content last changed: the last commit touching the files
// that hold its copy/data (shared chrome, schema and styles don't count), or today when one of
// those files has uncommitted edits. Guides use their own "updated" date, the same one their
// Article schema publishes. Add a rule here when adding a new kind of page.
const C = "src/components/";
const LASTMOD_SOURCES = [
  [
    /^\/(es)?$/,
    [
      "pages/home-page.tsx",
      "pages/home-copy.ts",
      "pages/heads.ts",
      "products/latest-devices.tsx",
      "products/inventory.ts",
    ],
  ],
  [
    /^\/(leasing|es\/arrendamiento)$/,
    [
      "pages/leasing-page.tsx",
      "pages/leasing-copy.ts",
      "pages/heads.ts",
      "site/leasing-portals.tsx",
    ],
  ],
  [/^\/(location|es\/ubicacion)$/, ["location/"]],
  [
    /^\/(accessories|game-consoles|laptops-tablets|iphone-18|es\/(accesorios|consolas|laptops-y-tabletas|iphone-18))$/,
    [
      "products/category-page.tsx",
      "products/data.ts",
      "products/inventory.ts",
      "products/photos.ts",
      "products/heads.ts",
    ],
  ],
  [
    /^\/(devices|es\/equipos)\/[^/]+$/,
    [
      "products/device-page.tsx",
      "products/devices.ts",
      "products/inventory.ts",
      "products/heads.ts",
    ],
  ],
  [/^\/(reviews|es\/resenas)$/, ["reviews/"]],
  [
    /^\/(services|es\/servicios)$/,
    ["services/hub-page.tsx", "services/hub-copy.ts", "services/data.ts", "services/heads.ts"],
  ],
  [
    /^\/(services|es\/servicios)\/prepaid-plans$/,
    [
      "services/service-page.tsx",
      "services/data.ts",
      "services/photos.ts",
      "services/heads.ts",
      "services/prepaid-plans.ts",
      "services/prepaid-section.tsx",
    ],
  ],
  [
    /^\/(services|es\/servicios)\/[^/]+$/,
    ["services/service-page.tsx", "services/data.ts", "services/photos.ts", "services/heads.ts"],
  ],
  [
    /^\/(areas|es\/zonas)$/,
    ["areas/hub-page.tsx", "areas/copy.ts", "areas/data.ts", "areas/heads.ts"],
  ],
  [
    /^\/(areas|es\/zonas)\/[^/]+$/,
    ["areas/area-page.tsx", "areas/copy.ts", "areas/data.ts", "areas/local.ts", "areas/heads.ts"],
  ],
  [
    /^\/(guides|es\/guias)$/,
    ["guides/hub-page.tsx", "guides/hub-copy.ts", "guides/data.ts", "guides/heads.ts"],
  ],
  [/^\/[a-z]{2}$/, ["intl/languages.ts", "intl/intl-page.tsx", "intl/heads.ts"]],
];
const git = (...args) => execFileSync("git", args, { cwd: root, encoding: "utf8" }).trim();
const gitDate = new Map();
function lastmodFor(path) {
  const rule = LASTMOD_SOURCES.find(([re]) => re.test(path));
  if (!rule) {
    console.warn(`lastmod: no source rule for ${path}; using ${FALLBACK_LASTMOD}`);
    return FALLBACK_LASTMOD;
  }
  const files = rule[1].map((f) => C + f);
  const key = files.join(" ");
  if (!gitDate.has(key)) {
    try {
      const dirty = git("status", "--porcelain", "--", ...files) !== "";
      gitDate.set(
        key,
        dirty ? today : git("log", "-1", "--format=%cs", "--", ...files) || FALLBACK_LASTMOD,
      );
    } catch {
      gitDate.set(key, FALLBACK_LASTMOD);
    }
  }
  return gitDate.get(key);
}

// Google ignores <priority> and <changefreq>, so the sitemap lists what it uses: the URL, its
// language alternates, its last change and its image.
const entry = (p) => `  <url>
    <loc>${SITE}${p.path}</loc>
    <lastmod>${p.lastmod}</lastmod>
${p.alternates.map(([lang, href]) => `    <xhtml:link rel="alternate" hreflang="${lang}" href="${xml(href)}"/>\n`).join("")}${[p.image, ...(PAGE_PHOTOS[p.path] ?? [])].map((i) => `    <image:image>\n      <image:loc>${xml(i)}</image:loc>\n    </image:image>\n`).join("")}  </url>`;

if (process.argv[2] === "sitemap") {
  const { GUIDES } = await loadModule("/src/components/guides/data.ts");
  const guideDate = (path) => GUIDES.find((g) => path.endsWith(`/${g.slug}`))?.updated;
  for (const p of pages) {
    p.lastmod = (/^\/(guides|es\/guias)\//.test(p.path) && guideDate(p.path)) || lastmodFor(p.path);
  }
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<!-- Generated by scripts/seo.mjs — run "node scripts/seo.mjs sitemap" after adding pages. -->
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${pages.map(entry).join("\n")}
</urlset>
`;
  fs.writeFileSync("public/sitemap.xml", xml);
  console.log(`sitemap.xml: ${pages.length} URLs`);
} else if (process.argv[2] === "indexnow") {
  const keyFile = fs.readdirSync("public").find((f) => /^[0-9a-f]{32}\.txt$/.test(f));
  if (!keyFile) throw new Error("IndexNow key file missing in public/");
  const key = keyFile.replace(".txt", "");
  const res = await fetch("https://api.indexnow.org/indexnow", {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify({
      host: new URL(SITE).host,
      key,
      keyLocation: `${SITE}/${keyFile}`,
      urlList: pages.map((p) => `${SITE}${p.path}`),
    }),
  });
  console.log(`IndexNow: ${res.status} ${res.statusText} (${pages.length} URLs)`);
} else {
  console.log("Usage: node scripts/seo.mjs sitemap | indexnow");
}
