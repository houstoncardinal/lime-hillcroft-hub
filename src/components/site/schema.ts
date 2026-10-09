import { CITY, FACEBOOK, MAPS, STREET } from "@/components/site/business";
import { ALTERNATES, absoluteUrl, type Lang, type Paths } from "@/components/site/seo";

// schema.org JSON-LD for every page, as one connected @graph.
// No aggregateRating: Google's guidelines don't allow a business to mark up its own (or
// re-published third-party) star ratings, so the 4.7 Google rating stays visible text only.

const STORE_ID = absoluteUrl("/#store");
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
] as const;

const services = {
  en: [
    [
      "Phone financing",
      "Unlocked iPhones and Android phones with financing and lease-to-own options, no credit needed.",
    ],
    [
      "Game console, laptop & tablet financing",
      "Lease-to-own on PlayStation 5, Xbox, Nintendo Switch 2, MacBooks, laptops and iPads.",
    ],
    [
      "Prepaid cell phone plans",
      "Prepaid plans from Verizon, AT&T, T-Mobile, Metro, Cricket, Boost, Simple Mobile, Lyca and more.",
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
      "iPhone y Android desbloqueados con financiamiento y arrendamiento con opción a compra, sin necesidad de crédito.",
    ],
    [
      "Consolas, laptops y tabletas a pagos",
      "Arrendamiento con opción a compra en PlayStation 5, Xbox, Nintendo Switch 2, MacBook, laptops y iPad.",
    ],
    [
      "Planes prepagados",
      "Planes prepagados de Verizon, AT&T, T-Mobile, Metro, Cricket, Boost, Simple Mobile, Lyca y más.",
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
  en: "TIC Wireless is a one-stop cell phone store on Hillcroft in Houston: financing on unlocked iPhones and Androids with no credit needed, lease-to-own on game consoles and laptops, prepaid plans, Xfinity Prepaid internet, same-day phone repair, unlocking, bill payments, international recharge and accessories. Se habla español.",
  es: "TIC Wireless es una tienda de celulares en Hillcroft, Houston: celulares a pagos sin necesidad de crédito, consolas y laptops con opción a compra, planes prepagados, internet prepagado Xfinity, reparación de celulares el mismo día, liberación, pago de facturas, recargas internacionales y accesorios. Se habla español.",
};

function store(lang: Lang) {
  return {
    "@type": ["MobilePhoneStore", "ElectronicsStore"],
    "@id": STORE_ID,
    name: "TIC Wireless",
    alternateName: ["TIC Wireless - Hillcroft", "TIC Wireless Houston"],
    slogan: "Buy · Sell · Repair · Unlock",
    description: DESCRIPTION[lang],
    url: absoluteUrl(ALTERNATES.home[lang]),
    logo: {
      "@type": "ImageObject",
      url: absoluteUrl("/logo.jpg"),
      width: 640,
      height: 190,
    },
    image: [
      absoluteUrl("/og/store.jpg"),
      absoluteUrl("/og/home.jpg"),
      absoluteUrl("/og/financing.jpg"),
    ],
    telephone: "+1-713-339-9300",
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
          ? "Phones, plans, repair & financing"
          : "Celulares, planes, reparación y financiamiento",
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
    name: "TIC Wireless",
    inLanguage: ["en-US", "es-US"],
    publisher: { "@id": STORE_ID },
  };
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
}: {
  paths: Paths;
  lang: Lang;
  name: string;
  description: string;
  image: string;
  breadcrumb: [string, string][];
  faqs: Faq[];
  extra?: object[];
}) {
  const url = absoluteUrl(paths[lang]);
  return {
    "@context": "https://schema.org",
    "@graph": [
      store(lang),
      website(),
      {
        "@type": "WebPage",
        "@id": `${url}#webpage`,
        url,
        name,
        description,
        inLanguage: LANGUAGE[lang],
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

export function financingService(lang: Lang, items: string[]) {
  const url = absoluteUrl(ALTERNATES.financing[lang]);
  return {
    "@type": "Service",
    "@id": `${url}#service`,
    name:
      lang === "en"
        ? "Lease-to-own & financing on consoles, laptops and phones"
        : "Consolas, laptops y celulares a pagos con opción a compra",
    serviceType: lang === "en" ? "Lease-to-own financing" : "Arrendamiento con opción a compra",
    description:
      lang === "en"
        ? "Take home a PlayStation 5, Xbox, Nintendo Switch 2, MacBook, laptop, iPad or phone today with lease-to-own and financing options. No credit needed; options starting at $40 down. Subject to approval."
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
      name: lang === "en" ? "Products available with financing" : "Productos disponibles a pagos",
      itemListElement: items.map((item) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Product", name: item },
      })),
    },
  };
}
