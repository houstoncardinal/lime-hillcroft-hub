// What goes on each page's share image (1200×630), rendered by scripts/og.mjs into public/og.
// Not imported by the app; the page heads point at the files through ogImage().
import { RATING, REVIEW_COUNT } from "@/components/site/business";
import { AREAS, shortName } from "@/components/areas/data";
import { GUIDES } from "@/components/guides/data";
import { CATEGORY_PAGES } from "@/components/products/data";
import { PRODUCT_PHOTOS } from "@/components/products/photos";
import { INTL_LANGS } from "@/components/intl/languages";
import { SERVICES } from "@/components/services/data";
import { ogImage } from "@/components/site/og";
import type { Lang } from "@/components/site/seo";

export type OgCard = {
  /** Public path of the image, e.g. /og/home-en.jpg. */
  file: string;
  lang: string;
  dir: "ltr" | "rtl";
  kicker: string;
  headline: string;
  sub: string;
  chips: string[];
  /** File name in src/assets/photos, without .jpg. */
  photo: string;
  /** CSS object-position for the photo crop. */
  focus?: string;
};

const LANGS: Lang[] = ["en", "es"];

// Photos for service pages, by PhotoKey (src/components/services/photos.ts).
const PHOTO_FILES: Record<string, string> = {
  iphone18: "iphone-18-pro-max",
  counter: "store-counter",
  jbl: "jbl-display",
  protector: "screen-protector",
  otterbox: "iphone-otterbox",
  s24: "galaxy-s24-ultra",
  storefront: "storefront-3640",
  s22: "galaxy-s22-ultra",
  laptops: "laptops-tablets",
  xfinity: "xfinity-prepaid-kit",
  simTray: "sim-tray-unlock",
};

// One in-store or storefront photo per area, so each area's card looks different.
const AREA_PHOTOS = [
  "storefront-3640",
  "store-counter",
  "case-wall",
  "apple-display",
  "jbl-display",
  "iphone-18-pro-max",
  "galaxy-s24-ultra",
  "screen-protector",
];

// Share-image crops that show the product better than the page photo.
const SERVICE_OG_PHOTO: Record<string, [string, string]> = {
  "prepaid-plans": ["consoles-wide", "45% 50%"],
  "international-recharge": ["storefront-3640", "85% 50%"],
};

const GUIDE_PHOTOS: Record<string, string> = {
  screen: "screen-protector",
  lease: "consoles-wide",
  unlock: "iphone-otterbox",
  plans: "store-counter",
};

const CHIPS = {
  en: ["Walk in · no appointment", "Open 7 days", "Se habla español"],
  es: ["Ven sin cita", "Abiertos 7 días", "We speak English"],
};

const T = {
  home: {
    en: {
      kicker: "Cell phone store & repair · Houston",
      headline: "Your phone store on Hillcroft — phones, repairs & plans.",
      sub: "Unlocked phones with leasing — no credit needed. Same-day repair, prepaid plans and unlocking.",
    },
    es: {
      kicker: "Tienda de celulares y reparación · Houston",
      headline: "Tu tienda de celulares en Hillcroft: celulares, reparaciones y planes.",
      sub: "Celulares desbloqueados a pagos sin necesidad de crédito. Reparación el mismo día, planes y liberación.",
    },
  },
  leasing: {
    en: {
      kicker: "Leasing · lease-to-own",
      headline: "PS5, Xbox, laptops & phones. Play now, pay over time.",
      sub: "Take it home today with weekly, biweekly or monthly options. No credit needed, subject to approval.",
    },
    es: {
      kicker: "Arrendamiento con opción a compra",
      headline: "PS5, Xbox, laptops y celulares. Juega hoy, paga poco a poco.",
      sub: "Llévatelo hoy con pagos semanales, quincenales o mensuales. Sin necesidad de crédito, sujeto a aprobación.",
    },
  },
  services: {
    en: {
      kicker: "Services",
      headline: "Everything mobile, under one roof.",
      sub: "Unlocked phones, same-day repair, prepaid plans, unlocking, bill payments and international recharge.",
    },
    es: {
      kicker: "Servicios",
      headline: "Todo para tu celular, en un solo lugar.",
      sub: "Celulares desbloqueados, reparación el mismo día, planes prepagados, liberación, pagos y recargas.",
    },
  },
  location: {
    en: {
      kicker: "Location & hours",
      headline: "3640 Hillcroft St, Suite C. Walk in, park out front.",
      sub: "Mon–Sat 9 AM – 8 PM · Sun 9 AM – 5 PM · Near Hillcroft & Windswept, north of the Westpark Tollway.",
    },
    es: {
      kicker: "Ubicación y horario",
      headline: "3640 Hillcroft St, Suite C. Ven sin cita, estaciona enfrente.",
      sub: "Lun–Sáb 9 AM – 8 PM · Dom 9 AM – 5 PM · Cerca de Hillcroft y Windswept, al norte del Westpark Tollway.",
    },
  },
  areas: {
    en: {
      kicker: "Areas we serve",
      headline: "Your phone store for Southwest Houston.",
      sub: "Gulfton, Sharpstown, Alief, Westchase, Bellaire, Meyerland, the Galleria and Harwin — minutes from Hillcroft.",
    },
    es: {
      kicker: "Zonas que atendemos",
      headline: "Tu tienda de celulares en el suroeste de Houston.",
      sub: "Gulfton, Sharpstown, Alief, Westchase, Bellaire, Meyerland, la Galleria y Harwin, a minutos de Hillcroft.",
    },
  },
  guides: {
    en: {
      kicker: "Guides",
      headline: "Straight answers about your phone.",
      sub: "Screen repair, lease-to-own, unlocking and prepaid plans — from the team on Hillcroft.",
    },
    es: {
      kicker: "Guías",
      headline: "Respuestas claras sobre tu celular.",
      sub: "Reparación de pantallas, arrendamiento, liberación y planes prepagados, del equipo en Hillcroft.",
    },
  },
};

const page = (
  id: string,
  lang: Lang,
  photo: string,
  t: { kicker: string; headline: string; sub: string },
  focus?: string,
): OgCard => ({
  file: ogImage(id, lang),
  lang,
  dir: "ltr",
  ...t,
  chips: CHIPS[lang],
  photo,
  ...(focus ? { focus } : {}),
});

export function ogCards(): OgCard[] {
  return [
    ...LANGS.flatMap((lang) => [
      page("home", lang, "storefront-3640", T.home[lang]),
      page("leasing", lang, "consoles-wide", T.leasing[lang], "0% 50%"),
      page("location", lang, "storefront-3640", T.location[lang]),
      ...(["accessories", "consoles", "laptops", "iphone18"] as const).map((key) => {
        const c = CATEGORY_PAGES[key];
        const t = c.text[lang];
        return page(key, lang, PRODUCT_PHOTOS[c.heroPhoto].file, {
          kicker: t.ogKicker,
          headline: t.ogHeadline,
          sub: t.ogSub,
        });
      }),
      page("reviews", lang, "store-counter", {
        kicker: lang === "en" ? "Customer reviews" : "Reseñas de clientes",
        headline:
          lang === "en"
            ? `${RATING}★ on Google from ${REVIEW_COUNT} customers.`
            : `${RATING}★ en Google de ${REVIEW_COUNT} clientes.`,
        sub:
          lang === "en"
            ? "Phone selection · Polite staff · Easy process · Same-day screen repair"
            : "Variedad de celulares · Personal amable · Proceso fácil · Reparación el mismo día",
      }),
      page("services", lang, "store-counter", T.services[lang]),
      ...SERVICES.map((s) => {
        const t = s.text[lang];
        const [photo, focus] = SERVICE_OG_PHOTO[s.slug] ?? [
          PHOTO_FILES[s.photo] ?? "storefront-3640",
        ];
        return page(
          `service-${s.slug}`,
          lang,
          photo,
          { kicker: t.ogKicker, headline: t.h1, sub: t.why.slice(0, 3).join(" · ") },
          focus,
        );
      }),
      page("areas", lang, "storefront-3640", T.areas[lang]),
      ...AREAS.map((a, i) => {
        const short = shortName(a);
        const zips = a.zips.join(", ");
        return page(
          `area-${a.slug}`,
          lang,
          AREA_PHOTOS[i % AREA_PHOTOS.length] ?? "storefront-3640",
          {
            kicker: lang === "en" ? `Serving ${short}` : `Atendemos ${short}`,
            headline:
              lang === "en"
                ? `Phone repair & cell phone store near ${short}`
                : `Reparación de celulares cerca de ${short}`,
            sub:
              lang === "en"
                ? `${a.miles.toFixed(1)} mi · about ${a.minutes} min by car · ZIP ${zips}`
                : `${a.miles.toFixed(1)} millas · unos ${a.minutes} min en carro · C.P. ${zips}`,
          },
        );
      }),
      page("guides", lang, "case-wall", T.guides[lang]),
      ...GUIDES.map((g) => {
        const t = g.text[lang];
        return page(
          `guide-${g.slug}`,
          lang,
          GUIDE_PHOTOS[g.icon] ?? "store-counter",
          {
            kicker: lang === "en" ? "Guide" : "Guía",
            headline: t.metaTitle,
            sub:
              lang === "en"
                ? `${g.readMinutes} min read · Straight answers from the team on Hillcroft`
                : `${g.readMinutes} min de lectura · Respuestas claras del equipo en Hillcroft`,
          },
          g.icon === "lease" ? "0% 50%" : undefined,
        );
      }),
    ]),
    ...INTL_LANGS.map((l): OgCard => ({
      file: ogImage(`lang-${l.code}`),
      lang: l.tag,
      dir: l.dir,
      kicker: l.native,
      headline: l.h1,
      sub: l.langNote,
      chips: [],
      photo: "storefront-3640",
    })),
  ];
}
