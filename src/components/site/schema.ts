import { CITY, FACEBOOK, MAPS, STREET } from "@/components/site/business";
import { ALTERNATES, absoluteUrl, type Lang, type Paths } from "@/components/site/seo";

// schema.org JSON-LD for every page, as one connected @graph.
// No aggregateRating: Google's guidelines don't allow a business to mark up its own (or
// re-published third-party) star ratings, so the 4.7 Google rating stays visible text only.

const STORE_ID = absoluteUrl("/#store");
// Bump when the business facts on the site change (freshness signal for search and AI answers).
const SITE_UPDATED = "2026-10-12";
const WEBSITE_ID = absoluteUrl("/#website");
const LANGUAGE = { en: "en-US", es: "es-US" } as const;

const houston = {
  "@type": "City",
  name: "Houston",
  sameAs: "https://en.wikipedia.org/wiki/Houston",
};

const neighborhoods = [
  ["Mid West (Westside)", null],
  [
    "Mahatma Gandhi District (Harwin / Hillcroft)",
    "https://en.wikipedia.org/wiki/Mahatma_Gandhi_District,_Houston",
  ],
  ["Gulfton", "https://en.wikipedia.org/wiki/Gulfton,_Houston"],
  ["Sharpstown", "https://en.wikipedia.org/wiki/Sharpstown,_Houston"],
  ["Westchase", "https://en.wikipedia.org/wiki/Westchase,_Houston"],
  ["Uptown (Galleria)", "https://en.wikipedia.org/wiki/Uptown_Houston"],
  ["Briarmeadow", null],
  ["Alief", "https://en.wikipedia.org/wiki/Alief,_Houston"],
  ["Meyerland", "https://en.wikipedia.org/wiki/Meyerland,_Houston"],
] as const;

// Bellaire is its own city (surrounded by Houston), so it isn't listed as part of Houston.
const bellaire = {
  "@type": "City",
  name: "Bellaire",
  sameAs: "https://en.wikipedia.org/wiki/Bellaire,_Texas",
};

const services = {
  en: [
    [
      "Phone leasing",
      "Unlocked iPhones and Android phones with leasing (lease-to-own) options, no credit needed.",
    ],
    [
      "Game console, laptop & tablet leasing",
      "Lease-to-own on PlayStation 5, Xbox, Nintendo Switch 2, MacBooks, laptops and iPads.",
    ],
    [
      "Prepaid cell phone plans",
      "Prepaid plans from T-Mobile, Verizon, AT&T, Cricket, Simple Mobile, Tracfone, H2O Wireless, Lyca, Gen Mobile, Metro, Boost and GoSmart.",
    ],
    ["Xfinity Prepaid internet", "Prepaid home internet sold and set up in store."],
    [
      "Cell phone repair",
      "Same-day screen, battery and charging-port repair for iPhone, Samsung and Android.",
    ],
    [
      "Tablet, laptop & computer repair",
      "Screen, battery, hardware and software repair for tablets, laptops and computers.",
    ],
    ["Phone unlocking", "Carrier unlocking so your phone works on the network you choose."],
    ["Buy, sell & trade phones", "Trade in or sell your used phone."],
    [
      "Phone bill payments",
      "In-store bill payments for major prepaid carriers with no extra charges.",
    ],
    [
      "International recharge",
      "International mobile top-ups including Tigo, Digicel, Movistar and Telcel.",
    ],
    [
      "Phone accessories",
      "Cases, tempered glass, chargers, cables, AirPods, Galaxy Buds, JBL speakers and smartwatches.",
    ],
  ],
  es: [
    [
      "Celulares a pagos",
      "iPhone y Android desbloqueados con arrendamiento con opción a compra, sin necesidad de crédito.",
    ],
    [
      "Consolas, laptops y tabletas a pagos",
      "Arrendamiento con opción a compra en PlayStation 5, Xbox, Nintendo Switch 2, MacBook, laptops y iPad.",
    ],
    [
      "Planes prepagados",
      "Planes prepagados de T-Mobile, Verizon, AT&T, Cricket, Simple Mobile, Tracfone, H2O Wireless, Lyca, Gen Mobile, Metro, Boost y GoSmart.",
    ],
    [
      "Internet prepagado Xfinity",
      "Internet para el hogar prepagado, a la venta y activado en la tienda.",
    ],
    [
      "Reparación de celulares",
      "Cambio de pantalla, batería y puerto de carga el mismo día para iPhone, Samsung y Android.",
    ],
    [
      "Reparación de tabletas, laptops y computadoras",
      "Reparación de pantallas, baterías, hardware y software.",
    ],
    [
      "Liberación de celulares",
      "Desbloqueo de compañía para usar tu teléfono con la red que elijas.",
    ],
    ["Compra, venta e intercambio de celulares", "Intercambia o vende tu celular usado."],
    ["Pago de facturas", "Paga tu factura de teléfono en la tienda, sin cargos extra."],
    [
      "Recargas internacionales",
      "Recargas a celulares en el extranjero: Tigo, Digicel, Movistar, Telcel y más.",
    ],
    [
      "Accesorios para celular",
      "Fundas, micas de vidrio templado, cargadores, cables, AirPods, Galaxy Buds, bocinas JBL y relojes inteligentes.",
    ],
  ],
} as const;

const DESCRIPTION = {
  en: "TIC Wireless Electronic & Repair Center is a one-stop cell phone store on Hillcroft in Houston: leasing on unlocked iPhones and Androids with no credit needed, lease-to-own on game consoles and laptops, prepaid plans, Xfinity Prepaid internet, same-day phone repair, unlocking, bill payments, international recharge and accessories. Se habla español.",
  es: "TIC Wireless Electronic & Repair Center es una tienda de celulares en Hillcroft, Houston: celulares a pagos sin necesidad de crédito, consolas y laptops con opción a compra, planes prepagados, internet prepagado Xfinity, reparación de celulares el mismo día, liberación, pago de facturas, recargas internacionales y accesorios. Se habla español.",
};

function store(lang: Lang) {
  return {
    "@type": ["MobilePhoneStore", "ElectronicsStore"],
    "@id": STORE_ID,
    name: "TIC Wireless Electronic & Repair Center",
    alternateName: ["TIC Wireless", "TIC Wireless - Hillcroft", "TIC Wireless Houston"],
    slogan: "Buy · Sell · Repair · Unlock",
    description: DESCRIPTION[lang],
    // One entity, one url: the same on every page and in every language.
    url: absoluteUrl("/"),
    priceRange: "$$",
    logo: {
      "@type": "ImageObject",
      url: absoluteUrl("/logo.jpg"),
      width: 640,
      height: 190,
    },
    image: [
      absoluteUrl("/photos/storefront-3640.jpg"),
      absoluteUrl("/photos/plaza.jpg"),
      absoluteUrl("/photos/store-counter.jpg"),
      absoluteUrl("/photos/case-wall.jpg"),
    ],
    telephone: "+1-713-339-9300",
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+1-713-339-9300",
      contactType: "customer service",
      availableLanguage: ["English", "Spanish"],
      areaServed: "US-TX",
      hoursAvailable: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
          opens: "09:00",
          closes: "20:00",
        },
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: "Sunday",
          opens: "09:00",
          closes: "17:00",
        },
      ],
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: STREET,
      addressLocality: "Houston",
      addressRegion: "TX",
      postalCode: CITY.slice(-5),
      addressCountry: "US",
    },
    geo: { "@type": "GeoCoordinates", latitude: 29.7262272, longitude: -95.5014118 },
    hasMap: MAPS,
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        opens: "09:00",
        closes: "20:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Sunday",
        opens: "09:00",
        closes: "17:00",
      },
    ],
    currenciesAccepted: "USD",
    knowsLanguage: ["en", "es"],
    knowsAbout: [
      "Unlocked smartphones",
      "iPhone",
      "Samsung Galaxy",
      "Phone leasing",
      "Lease-to-own",
      "Prepaid cell phone plans",
      "Cell phone repair",
      "iPhone screen repair",
      "Phone battery replacement",
      "Phone unlocking",
      "Phone accessories",
      "Xfinity Prepaid internet",
      "International mobile recharge",
      "PlayStation 5",
      "Xbox Series X",
      "Nintendo Switch 2",
      "MacBook",
      "iPad",
      "Samsung Galaxy Tab",
      "Lease-to-own electronics",
      "JBL speakers",
      "AirPods",
      "Phone cases and screen protectors",
    ],
    publicAccess: true,
    amenityFeature: [
      {
        "@type": "LocationFeatureSpecification",
        name: "Wheelchair-accessible entrance",
        value: true,
      },
      {
        "@type": "LocationFeatureSpecification",
        name: "Wheelchair-accessible parking lot",
        value: true,
      },
    ],
    areaServed: [
      houston,
      ...neighborhoods.map(([name, sameAs]) => ({
        "@type": "Place",
        name,
        containedInPlace: houston,
        ...(sameAs ? { sameAs } : {}),
      })),
      bellaire,
      {
        "@type": "GeoCircle",
        geoMidpoint: { "@type": "GeoCoordinates", latitude: 29.7262272, longitude: -95.5014118 },
        geoRadius: 16000,
      },
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name:
        lang === "en"
          ? "Phones, plans, repair & leasing"
          : "Celulares, planes, reparación y arrendamiento",
      itemListElement: services[lang].map(([name, description]) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name, description, provider: { "@id": STORE_ID } },
      })),
    },
    sameAs: [
      FACEBOOK,
      "https://www.tiktok.com/@tic.wireless",
      "https://www.yelp.com/biz/tic-wireless-hillcroft-houston",
      "https://www.bbb.org/us/tx/houston/profile/cell-phone-supplies/tic-wireless-0915-90048521",
      "https://www.google.com/maps?cid=10667472323669212127",
    ],
  };
}

function website() {
  return {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: absoluteUrl("/"),
    name: "TIC Wireless Electronic & Repair Center",
    inLanguage: ["en-US", "es-US"],
    publisher: { "@id": STORE_ID },
  };
}

/** The store and website nodes, for pages that build their own graph (language pages). */
export function baseGraph(lang: Lang) {
  return [store(lang), website()];
}

export type Faq = { q: string; a: string };

export function pageSchema({
  paths,
  lang,
  name,
  description,
  image,
  breadcrumb,
  faqs,
  extra = [],
  pageType = "WebPage",
  datePublished,
  dateModified = SITE_UPDATED,
}: {
  paths: Paths;
  lang: Lang;
  name: string;
  description: string;
  image: string;
  breadcrumb: [string, string][];
  faqs: Faq[];
  extra?: object[];
  /** schema.org page type, e.g. ["WebPage", "ContactPage"] for the location page. */
  pageType?: string | string[];
  /** When this page's own content was first published (e.g. a guide). */
  datePublished?: string;
  /** When this page's own content last changed; defaults to the site-wide business-facts date. */
  dateModified?: string;
}) {
  const url = absoluteUrl(paths[lang]);
  return {
    "@context": "https://schema.org",
    "@graph": [
      store(lang),
      website(),
      {
        "@type": pageType,
        "@id": `${url}#webpage`,
        url,
        name,
        description,
        inLanguage: LANGUAGE[lang],
        ...(datePublished ? { datePublished } : {}),
        dateModified,
        isPartOf: { "@id": WEBSITE_ID },
        about: { "@id": STORE_ID },
        primaryImageOfPage: {
          "@type": "ImageObject",
          url: absoluteUrl(image),
          width: 1200,
          height: 630,
        },
        breadcrumb: { "@id": `${url}#breadcrumb` },
        ...(faqs.length ? { mainEntity: { "@id": `${url}#faq` } } : {}),
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${url}#breadcrumb`,
        itemListElement: breadcrumb.map(([itemName, path], i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: itemName,
          item: absoluteUrl(path),
        })),
      },
      ...(faqs.length
        ? [
            {
              "@type": "FAQPage",
              "@id": `${url}#faq`,
              inLanguage: LANGUAGE[lang],
              mainEntity: faqs.map((f) => ({
                "@type": "Question",
                name: f.q,
                acceptedAnswer: { "@type": "Answer", text: f.a },
              })),
            },
          ]
        : []),
      ...extra,
    ],
  };
}

export function leasingService(lang: Lang, items: string[]) {
  const url = absoluteUrl(ALTERNATES.leasing[lang]);
  return {
    "@type": "Service",
    "@id": `${url}#service`,
    name:
      lang === "en"
        ? "Leasing (lease-to-own) on consoles, laptops and phones"
        : "Consolas, laptops y celulares a pagos con opción a compra",
    serviceType: lang === "en" ? "Leasing (lease-to-own)" : "Arrendamiento con opción a compra",
    description:
      lang === "en"
        ? "Take home a PlayStation 5, Xbox, Nintendo Switch 2, MacBook, laptop, iPad or phone today with leasing (lease-to-own) options. No credit needed; options starting at $40 down. Subject to approval."
        : "Llévate hoy un PlayStation 5, Xbox, Nintendo Switch 2, MacBook, laptop, iPad o celular con arrendamiento con opción a compra. Sin necesidad de crédito; opciones desde $40 de enganche. Sujeto a aprobación.",
    url,
    provider: { "@id": STORE_ID },
    areaServed: houston,
    availableChannel: {
      "@type": "ServiceChannel",
      serviceLocation: { "@id": STORE_ID },
      servicePhone: {
        "@type": "ContactPoint",
        telephone: "+1-713-339-9300",
        contactType: "sales",
        availableLanguage: ["English", "Spanish"],
      },
    },
    offers: {
      "@type": "Offer",
      url,
      description:
        lang === "en"
          ? "Options starting at $40 down. Subject to approval."
          : "Opciones desde $40 de enganche. Sujeto a aprobación.",
      priceSpecification: {
        "@type": "PriceSpecification",
        minPrice: 40,
        priceCurrency: "USD",
        description: lang === "en" ? "Starting down payment" : "Enganche inicial",
      },
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: lang === "en" ? "Products available to lease" : "Productos disponibles a pagos",
      // Typed as Service (the lease), not Product: no online prices, so no Product snippets.
      itemListElement: items.map((item) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: `${lang === "en" ? "Lease-to-own" : "A pagos con opción a compra"}: ${item}`,
        },
      })),
    },
  };
}

/** A Service offered at the store (service pages). No prices: they change and are quoted in store. */
export function serviceNode({
  lang,
  path,
  name,
  serviceType,
  description,
  image,
  offers,
}: {
  lang: Lang;
  path: string;
  name: string;
  serviceType: string;
  description: string;
  image: string;
  offers: string[];
}) {
  const url = absoluteUrl(path);
  return {
    "@type": "Service",
    "@id": `${url}#service`,
    name,
    serviceType,
    description,
    url,
    image: absoluteUrl(image),
    inLanguage: LANGUAGE[lang],
    provider: { "@id": STORE_ID },
    areaServed: houston,
    availableLanguage: ["English", "Spanish"],
    availableChannel: {
      "@type": "ServiceChannel",
      serviceLocation: { "@id": STORE_ID },
      servicePhone: {
        "@type": "ContactPoint",
        telephone: "+1-713-339-9300",
        contactType: "customer service",
        availableLanguage: ["English", "Spanish"],
      },
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name,
      itemListElement: offers.map((o) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: o.replace(/\.$/, "") },
      })),
    },
  };
}
