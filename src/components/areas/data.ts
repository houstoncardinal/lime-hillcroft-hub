import type { Lang } from "@/components/site/seo";

// Service-area pages. Distances and drive times were computed with OpenStreetMap routing
// (OSRM, no traffic) from each area's mapped center to the store at 3640 Hillcroft St; ZIP codes
// come from reverse-geocoding a grid of points across each area; local facts come from each
// area's Wikipedia article. Re-run the numbers if the store moves.

export type Area = {
  slug: string;
  name: string;
  /** Spanish display name, when it differs. */
  nameEs?: string;
  zips: string[];
  miles: number;
  minutes: number;
  /** Main roads from the area to the store, in order. */
  route: string[];
  intro: Record<Lang, string>;
  lat: number;
  lon: number;
  nearby: string[];
};

export const AREAS: Area[] = [
  {
    slug: "mahatma-gandhi-district",
    name: "Mahatma Gandhi District (Harwin / Hillcroft)",
    nameEs: "Distrito Mahatma Gandhi (Harwin / Hillcroft)",
    zips: ["77036", "77057", "77081"],
    miles: 1.0,
    minutes: 2,
    route: ["Hillcroft Avenue north", "Hillcroft St"],
    intro: {
      en: "Locals call it Harwin, Hillcroft or Little India — the stretch of Hillcroft Avenue and Harwin Drive lined with Indian and Pakistani restaurants and shops. TIC Wireless is right up Hillcroft from the district, so a cracked screen or a new phone is a two-minute drive away.",
      es: "Los vecinos le dicen Harwin, Hillcroft o Little India: la zona de Hillcroft Avenue y Harwin Drive llena de restaurantes y tiendas de India y Pakistán. TIC Wireless está subiendo por Hillcroft, a solo dos minutos en carro para arreglar una pantalla o comprar un celular nuevo.",
    },
    lat: 29.72055,
    lon: -95.49824,
    nearby: ["gulfton", "sharpstown", "bellaire"],
  },
  {
    slug: "gulfton",
    name: "Gulfton",
    zips: ["77081", "77057"],
    miles: 1.9,
    minutes: 4,
    route: ["Gulfton St", "Hillcroft Avenue north", "Hillcroft St"],
    intro: {
      en: "Gulfton sits between the 610 Loop and Beltway 8, west of Bellaire and north of Bellaire Boulevard — one of Houston's most diverse, international neighborhoods. Our team helps customers in English and Spanish, with prepaid plans and international recharge for calling family abroad.",
      es: "Gulfton está entre el Loop 610 y el Beltway 8, al oeste de Bellaire y al norte de Bellaire Boulevard: uno de los barrios más diversos e internacionales de Houston. Te atendemos en español o inglés, con planes prepagados y recargas internacionales para hablar con tu familia.",
    },
    lat: 29.71642,
    lon: -95.4849,
    nearby: ["mahatma-gandhi-district", "bellaire", "sharpstown"],
  },
  {
    slug: "sharpstown",
    name: "Sharpstown",
    zips: ["77036", "77074"],
    miles: 2.6,
    minutes: 6,
    route: ["Bellaire Blvd", "Southwest Freeway (I-69) frontage road", "Hillcroft Avenue north"],
    intro: {
      en: "Sharpstown, dedicated in 1955, was Houston's first master-planned, car-centered community — home to PlazAmericas (the former Sharpstown Center). From Sharpstown it's a quick hop up the Southwest Freeway frontage road to Hillcroft for same-day phone repair or a new phone.",
      es: "Sharpstown, inaugurado en 1955, fue la primera comunidad planificada de Houston y es hogar de PlazAmericas (antes Sharpstown Center). Desde Sharpstown llegas rápido por la lateral del Southwest Freeway hasta Hillcroft para reparar tu celular el mismo día o comprar uno nuevo.",
    },
    lat: 29.70345,
    lon: -95.51775,
    nearby: ["mahatma-gandhi-district", "alief", "gulfton"],
  },
  {
    slug: "westchase",
    name: "Westchase",
    zips: ["77042"],
    miles: 3.9,
    minutes: 9,
    route: ["Richmond Avenue east", "Hillcroft Avenue", "Hillcroft St"],
    intro: {
      en: "Westchase is a business district of 1,500+ companies between Westheimer, Gessner and the Westpark Tollway. If you work in Westchase, it's a straight shot east on Richmond Avenue to Hillcroft — come by on a lunch break for a screen or battery repair, a new phone, or a plan.",
      es: "Westchase es un distrito de negocios con más de 1,500 empresas entre Westheimer, Gessner y el Westpark Tollway. Si trabajas en Westchase, llegas directo por Richmond Avenue hacia el este hasta Hillcroft: ven en tu hora de comida a reparar tu pantalla o batería, comprar un celular o un plan.",
    },
    lat: 29.72762,
    lon: -95.5594,
    nearby: ["alief", "sharpstown", "galleria-uptown"],
  },
  {
    slug: "galleria-uptown",
    name: "Galleria / Uptown",
    zips: ["77056", "77027"],
    miles: 3.6,
    minutes: 8,
    route: ["Post Oak Blvd", "Westheimer Road west", "Hillcroft Avenue south"],
    intro: {
      en: "Uptown — the Galleria area along Post Oak Boulevard and Westheimer Road — is one of the largest business districts in the country. Skip the mall kiosks: TIC Wireless is about eight minutes west on Westheimer, then south on Hillcroft, with unlocked phones, leasing and same-day repairs.",
      es: "Uptown, la zona de la Galleria sobre Post Oak Boulevard y Westheimer Road, es uno de los distritos de negocios más grandes del país. Olvídate de los kioscos del mall: TIC Wireless está a unos ocho minutos al oeste por Westheimer y luego al sur por Hillcroft, con celulares desbloqueados, arrendamiento y reparaciones el mismo día.",
    },
    lat: 29.74556,
    lon: -95.46136,
    nearby: ["westchase", "bellaire", "gulfton"],
  },
  {
    slug: "bellaire",
    name: "Bellaire",
    zips: ["77401"],
    miles: 4.4,
    minutes: 8,
    route: ["Southwest Freeway (I-69)", "Westpark Drive", "Hillcroft Avenue"],
    intro: {
      en: "Bellaire, the “City of Homes” surrounded by Houston, is a short drive from our store via the Southwest Freeway and Westpark Drive. Bellaire families come to us for iPhone and Samsung screen repairs, new phones with leasing and accessories for the whole household.",
      es: "Bellaire, la “Ciudad de los Hogares” rodeada por Houston, está a un trayecto corto de la tienda por el Southwest Freeway y Westpark Drive. Familias de Bellaire vienen por reparaciones de pantalla de iPhone y Samsung, celulares nuevos a pagos y accesorios para toda la casa.",
    },
    lat: 29.70579,
    lon: -95.45883,
    nearby: ["gulfton", "meyerland", "galleria-uptown"],
  },
  {
    slug: "alief",
    name: "Alief",
    zips: ["77072", "77082", "77083"],
    miles: 6.6,
    minutes: 11,
    route: ["Westpark Tollway east", "Westpark Drive", "Hillcroft Avenue"],
    intro: {
      en: "Alief is one of the most ethnically diverse communities in Houston. From Alief it's about eleven minutes east on the Westpark Tollway to Hillcroft, where we handle phone repairs, unlocking, prepaid plans for every major carrier and international recharge.",
      es: "Alief es una de las comunidades más diversas de Houston. Desde Alief son unos once minutos hacia el este por el Westpark Tollway hasta Hillcroft, donde reparamos y liberamos celulares, vendemos planes prepagados de todas las compañías y hacemos recargas internacionales.",
    },
    lat: 29.71106,
    lon: -95.59633,
    nearby: ["sharpstown", "westchase", "mahatma-gandhi-district"],
  },
  {
    slug: "meyerland",
    name: "Meyerland",
    zips: ["77096"],
    miles: 5.4,
    minutes: 11,
    route: ["North Braeswood Blvd", "Hillcroft Avenue north", "Hillcroft St"],
    intro: {
      en: "Meyerland, home to Meyerland Plaza, is a straight drive up Hillcroft Avenue to our store — about eleven minutes without traffic. Bring in your phone for a same-day screen or battery repair, or upgrade to a new unlocked phone with leasing.",
      es: "Meyerland, donde está Meyerland Plaza, queda en línea recta subiendo por Hillcroft Avenue hasta la tienda: unos once minutos sin tráfico. Trae tu celular para cambio de pantalla o batería el mismo día, o estrena un celular desbloqueado a pagos.",
    },
    lat: 29.67915,
    lon: -95.46803,
    nearby: ["bellaire", "gulfton", "sharpstown"],
  },
];

export const areaName = (a: Area, lang: Lang) => (lang === "es" && a.nameEs) || a.name;
export const shortName = (a: Area) => a.name.replace(/ \(.*\)$/, "");
export const findArea = (slug: string) => AREAS.find((a) => a.slug === slug);
export const areaForZip = (zip: string) => AREAS.filter((a) => a.zips.includes(zip));
export const AREA_ZIPS = [...new Set(AREAS.flatMap((a) => a.zips))].sort();
