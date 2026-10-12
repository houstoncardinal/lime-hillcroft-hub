import type { Lang } from "@/components/site/seo";

// Prepaid plans shown on /services/prepaid-plans. Copied from the carriers' in-store brochures
// and counter signs (photographed at the store) and, for T-Mobile, prepaid.t-mobile.com.
// Carriers change prices often: update PLANS_CHECKED and the plans together, and only state a
// carrier's network when its own material says so.

export const PLANS_CHECKED = "2026-10-12";

type L = Record<Lang, string>;
const l = (en: string, es: string): L => ({ en, es });

export type PrepaidPlan = {
  /** Monthly price in USD. */
  price: number;
  name?: L;
  /** Headline data allowance. */
  data: L;
  /** Unlimited high-speed (or deprioritized) data — used for the comparison table. */
  unlimited?: boolean;
  hotspot?: L;
  perks: L[];
  badge?: L;
};

export type Carrier = {
  id: string;
  name: string;
  network?: L;
  /** Shown under the price, e.g. "/mo with AutoPay". */
  per?: L;
  includes: L[];
  plans: PrepaidPlan[];
  notes: L[];
  source: L;
};

// Shared phrases.
const MO = l("/mo", "/mes");
const AUTOPAY = l("/mo with AutoPay", "/mes con AutoPay");
const UNL_TT = l("Unlimited talk & text", "Llamadas y textos ilimitados");
const MX_CA = l("Talk & text to Mexico & Canada", "Llamadas y textos a México y Canadá");
const SPAM = l("Spam filter", "Filtro de spam");
const BROCHURE = l(
  "Carrier brochure at our counter",
  "Folleto de la compañía en nuestro mostrador",
);
const SIGN = l("Carrier counter sign at our store", "Letrero de la compañía en nuestra tienda");

const hotspot = (gb: string) => l(`${gb} hotspot`, `${gb} de hotspot`);
const intlCredit = (amt: string) =>
  l(`${amt} international calling credit`, `${amt} de crédito para llamadas internacionales`);
const roamCredit = (amt: string) =>
  l(`${amt} international roaming credit`, `${amt} de crédito para roaming internacional`);

export const CARRIERS: Carrier[] = [
  {
    id: "t-mobile",
    name: "T-Mobile Prepaid",
    per: AUTOPAY,
    includes: [
      UNL_TT,
      l(
        "5-year price guarantee on talk, text & 5G data",
        "Precio garantizado por 5 años en llamadas, textos y datos 5G",
      ),
      l("Free Caller ID and Scam ID", "Identificador de llamadas y Scam ID gratis"),
      l(
        "Use it in Mexico & Canada (up to 5GB high-speed data)",
        "Úsalo en México y Canadá (hasta 5GB de datos de alta velocidad)",
      ),
    ],
    plans: [
      {
        price: 40,
        name: l("Starter Monthly", "Starter Monthly"),
        data: l("15GB 5G data", "15GB de datos 5G"),
        perks: [l("$45 the first month", "$45 el primer mes")],
      },
      {
        price: 45,
        name: l("Unlimited Monthly", "Unlimited Monthly"),
        data: l("Unlimited 5G data", "Datos 5G ilimitados"),
        unlimited: true,
        hotspot: l("Unlimited hotspot at 3G speeds", "Hotspot ilimitado a velocidad 3G"),
        perks: [
          l("$50 the first month", "$50 el primer mes"),
          l("Video streams in SD", "Video en calidad SD"),
        ],
      },
      {
        price: 60,
        name: l("Unlimited Plus Monthly", "Unlimited Plus Monthly"),
        data: l("Unlimited 5G data", "Datos 5G ilimitados"),
        unlimited: true,
        hotspot: l("5GB high-speed hotspot", "5GB de hotspot de alta velocidad"),
        badge: l("Most popular", "El más popular"),
        perks: [
          l("$65 the first month", "$65 el primer mes"),
          l("International benefits included", "Beneficios internacionales incluidos"),
        ],
      },
    ],
    notes: [
      l("Without AutoPay, $5 more per month.", "Sin AutoPay, $5 más al mes."),
      l(
        "Add-ons: $5 Mexico & Canada unlimited calling & texting; $15 international calling to landlines in 70+ countries and mobiles in 30+.",
        "Extras: $5 llamadas y textos ilimitados a México y Canadá; $15 llamadas internacionales a fijos en 70+ países y celulares en 30+.",
      ),
      l(
        "Heavy users (over 35GB/mo) may see lower speeds during congestion. A device connection charge applies at activation.",
        "Quienes usan más de 35GB al mes pueden notar menor velocidad en horas de congestión. Se cobra un cargo de conexión al activar.",
      ),
    ],
    source: l("prepaid.t-mobile.com", "prepaid.t-mobile.com"),
  },
  {
    id: "verizon",
    name: "Verizon Prepaid",
    network: l("Verizon network", "Red de Verizon"),
    per: AUTOPAY,
    includes: [
      UNL_TT,
      l("International texting", "Textos internacionales"),
      l(
        "Talk, text & data to and from Mexico & Canada",
        "Llamadas, textos y datos hacia y desde México y Canadá",
      ),
      l(
        "Call Filter, Digital Secure (basic) & Verizon Cloud",
        "Call Filter, Digital Secure (básico) y Verizon Cloud",
      ),
    ],
    plans: [
      {
        price: 35,
        data: l("15GB 5G data", "15GB de datos 5G"),
        hotspot: l("Hotspot from your data", "Hotspot de tus datos del plan"),
        perks: [l("$45 the first month", "$45 el primer mes")],
      },
      {
        price: 50,
        name: l("Unlimited", "Unlimited"),
        data: l("Unlimited 5G data", "Datos 5G ilimitados"),
        unlimited: true,
        hotspot: hotspot("5GB"),
        perks: [
          l("$60 the first month", "$60 el primer mes"),
          l("Add a line for $30/mo", "Agrega una línea por $30/mes"),
        ],
      },
      {
        price: 60,
        name: l("Unlimited Plus", "Unlimited Plus"),
        data: l("Unlimited · 5G Ultra Wideband", "Ilimitados · 5G Ultra Wideband"),
        unlimited: true,
        hotspot: l("25GB premium hotspot", "25GB de hotspot premium"),
        perks: [
          l("$70 the first month", "$70 el primer mes"),
          l("50GB premium network access", "50GB de acceso premium a la red"),
          l("Global Choice: calling to 1 country/mo", "Global Choice: llamadas a 1 país al mes"),
          l("Add a line for $40/mo", "Agrega una línea por $40/mes"),
        ],
      },
    ],
    notes: [
      l(
        "Loyalty discounts: save $5/mo per line after 3 payments, then $10/mo after 9 payments.",
        "Descuentos por lealtad: ahorra $5/mes por línea después de 3 pagos y $10/mes después de 9.",
      ),
      l(
        "Save $20/mo when you add an Unlimited line. Smartwatch line $10/mo.",
        "Ahorra $20/mes al agregar una línea Unlimited. Línea para reloj inteligente $10/mes.",
      ),
      l(
        "TravelPass: use your plan in 140+ countries for $12/day.",
        "TravelPass: usa tu plan en más de 140 países por $12 al día.",
      ),
    ],
    source: BROCHURE,
  },
  {
    id: "att",
    name: "AT&T Prepaid",
    network: l("AT&T network", "Red de AT&T"),
    includes: [
      l(
        "Unlimited talk & text on unlimited plans",
        "Llamadas y textos ilimitados en planes ilimitados",
      ),
      l("Texting from the U.S. to 230+ countries", "Textos desde EE. UU. a más de 230 países"),
      l("AT&T ActiveArmor mobile security", "Seguridad móvil AT&T ActiveArmor"),
      l("AT&T Level Up", "AT&T Level Up"),
    ],
    plans: [
      {
        price: 20,
        name: l("Simple. Affordable.", "Simple. Affordable."),
        data: l("5GB data with 5G", "5GB de datos con 5G"),
        hotspot: l("Hotspot enabled", "Hotspot habilitado"),
        badge: l("New", "Nuevo"),
        perks: [
          l("Unlimited calling · 5,000 texts", "Llamadas ilimitadas · 5,000 textos"),
          l("Mexico & Canada", "México y Canadá"),
        ],
      },
      {
        price: 35,
        name: l("Unlimited Saver", "Unlimited Saver"),
        data: l("30GB at up to 3 Mbps", "30GB a hasta 3 Mbps"),
        perks: [l("Then up to 1.5 Mbps", "Después hasta 1.5 Mbps")],
      },
      {
        price: 45,
        name: l("Unlimited Enhanced Select", "Unlimited Enhanced Select"),
        data: l("Unlimited 5G data", "Datos 5G ilimitados"),
        unlimited: true,
        hotspot: hotspot("10GB"),
        badge: l("Most popular", "El más popular"),
        perks: [
          MX_CA,
          l("Ask about 3 months free when you prepay", "Pregunta por 3 meses gratis al prepagar"),
        ],
      },
      {
        price: 60,
        name: l("Unlimited Ultra Select", "Unlimited Ultra Select"),
        data: l("Unlimited 5G · 50GB high-speed", "Ilimitados 5G · 50GB de alta velocidad"),
        unlimited: true,
        hotspot: hotspot("30GB"),
        perks: [
          MX_CA,
          l("500 min to 30+ countries", "500 min a más de 30 países"),
          l("HD streaming · 100GB AT&T Personal Cloud", "Video HD · 100GB en AT&T Personal Cloud"),
        ],
      },
      {
        price: 75,
        name: l("Unlimited Premier Select", "Unlimited Premier Select"),
        data: l("Unlimited premium 5G data", "Datos 5G premium ilimitados"),
        unlimited: true,
        hotspot: hotspot("50GB"),
        perks: [
          MX_CA,
          l("Unlimited calling to 85 countries", "Llamadas ilimitadas a 85 países"),
          l("HD streaming · 100GB AT&T Personal Cloud", "Video HD · 100GB en AT&T Personal Cloud"),
        ],
      },
    ],
    notes: [
      l(
        "Data-only plans for tablets & hotspots: 15GB $35, 50GB $55, 100GB $90.",
        "Planes solo de datos para tabletas y hotspots: 15GB $35, 50GB $55, 100GB $90.",
      ),
      l(
        "Add-ons: International $10/mo (250 min to 70 countries), International Plus $15/mo (unlimited to 85+ countries), International travel $40 for 7 days (5GB + unlimited talk & text).",
        "Extras: International $10/mes (250 min a 70 países), International Plus $15/mes (ilimitado a 85+ países), viaje internacional $40 por 7 días (5GB + llamadas y textos ilimitados).",
      ),
      l(
        "Prices are for a single line; taxes & fees extra.",
        "Precios por una línea; impuestos y cargos aparte.",
      ),
    ],
    source: BROCHURE,
  },
  {
    id: "cricket",
    name: "Cricket Wireless",
    network: l("AT&T network", "Red de AT&T"),
    per: AUTOPAY,
    includes: [UNL_TT, MX_CA],
    plans: [
      {
        price: 30,
        name: l("Sensible 10GB", "Sensible 10GB"),
        data: l("10GB data", "10GB de datos"),
        perks: [],
      },
      {
        price: 35,
        name: l("Select Unlimited", "Select Unlimited"),
        data: l("Unlimited data", "Datos ilimitados"),
        unlimited: true,
        perks: [l("4 lines for $100/mo", "4 líneas por $100/mes")],
      },
      {
        price: 45,
        name: l("Smart Unlimited", "Smart Unlimited"),
        data: l("Unlimited high-speed data", "Datos ilimitados de alta velocidad"),
        unlimited: true,
        hotspot: hotspot("15GB"),
        perks: [
          l("Works in Mexico & Canada", "Funciona en México y Canadá"),
          l("Texting to 200+ countries", "Textos a más de 200 países"),
          l("100GB cloud storage · 2 lines $75/mo", "100GB en la nube · 2 líneas $75/mes"),
        ],
      },
      {
        price: 55,
        name: l("Supreme Unlimited", "Supreme Unlimited"),
        data: l("Unlimited high-speed data", "Datos ilimitados de alta velocidad"),
        unlimited: true,
        hotspot: hotspot("50GB"),
        perks: [
          l("Works in Mexico & Canada", "Funciona en México y Canadá"),
          l("Texting to 200+ countries", "Textos a más de 200 países"),
          l("150GB cloud storage", "150GB en la nube"),
          l("HBO Max Basic with ads", "HBO Max Básico con anuncios"),
        ],
      },
    ],
    notes: [
      l(
        "AutoPay prices include a $5 credit starting the second month.",
        "Los precios con AutoPay incluyen un crédito de $5 a partir del segundo mes.",
      ),
      l(
        "Cricket Passport for travel from $10/day. Unlimited smartwatch plan $10/mo.",
        "Cricket Passport para viajar desde $10 al día. Plan ilimitado para reloj $10/mes.",
      ),
    ],
    source: SIGN,
  },
  {
    id: "simple-mobile",
    name: "Simple Mobile",
    network: l("Verizon network", "Red de Verizon"),
    per: MO,
    includes: [
      l("Unlimited nationwide talk & text", "Llamadas y textos nacionales ilimitados"),
      l("Unlimited global texting", "Textos internacionales ilimitados"),
      l("International calling on every plan", "Llamadas internacionales en todos los planes"),
    ],
    plans: [
      {
        price: 25,
        data: l("15GB 5G data", "15GB de datos 5G"),
        hotspot: l("Hotspot capable", "Hotspot disponible"),
        perks: [
          l("Calling to 100+ countries", "Llamadas a más de 100 países"),
          l("Roaming in 17 countries (3GB)", "Roaming en 17 países (3GB)"),
          intlCredit("$10"),
        ],
      },
      {
        price: 30,
        data: l("20GB 5G data", "20GB de datos 5G"),
        hotspot: l("Hotspot capable", "Hotspot disponible"),
        perks: [
          l("Calling to 125+ countries", "Llamadas a más de 125 países"),
          l("Roaming in 17 countries (5GB)", "Roaming en 17 países (5GB)"),
          intlCredit("$10"),
        ],
      },
      {
        price: 40,
        data: l("30GB 5G data", "30GB de datos 5G"),
        hotspot: l("Hotspot capable", "Hotspot disponible"),
        perks: [
          l("Calling to 125+ countries", "Llamadas a más de 125 países"),
          l("Roaming in 17 countries (5GB)", "Roaming en 17 países (5GB)"),
          intlCredit("$10"),
        ],
      },
      {
        price: 50,
        name: l("Unlimited World", "Unlimited World"),
        data: l("Unlimited 5G data", "Datos 5G ilimitados"),
        unlimited: true,
        hotspot: hotspot("20GB"),
        badge: l("4 lines $25/mo each", "4 líneas a $25/mes c/u"),
        perks: [
          l("Calling to 200+ countries", "Llamadas a más de 200 países"),
          l("Roaming in 17 countries (5GB)", "Roaming en 17 países (5GB)"),
          intlCredit("$15"),
        ],
      },
      {
        price: 60,
        name: l("Unlimited World+", "Unlimited World+"),
        data: l("Unlimited 5G Ultra Wideband", "Ilimitados 5G Ultra Wideband"),
        unlimited: true,
        hotspot: hotspot("30GB"),
        perks: [
          l("Calling to 200+ countries", "Llamadas a más de 200 países"),
          l("Roaming in 140+ countries (10GB)", "Roaming en más de 140 países (10GB)"),
          intlCredit("$20"),
        ],
      },
    ],
    notes: [
      l(
        "Get 4 lines on Unlimited World for $25/mo each, plus taxes & fees.",
        "4 líneas en Unlimited World por $25/mes cada una, más impuestos y cargos.",
      ),
      l(
        "International calling country counts depend on the network your line activates on.",
        "El número de países para llamadas depende de la red en la que se active tu línea.",
      ),
    ],
    source: BROCHURE,
  },
  {
    id: "tracfone",
    name: "Tracfone",
    network: l("Verizon network", "Red de Verizon"),
    per: l("/30 days", "/30 días"),
    includes: [
      UNL_TT,
      l("Hotspot included", "Hotspot incluido"),
      l(
        "Unused data carries over while service is active",
        "Los datos que no uses se acumulan mientras tu servicio esté activo",
      ),
    ],
    plans: [
      { price: 15, data: l("1GB carryover data", "1GB de datos acumulables"), perks: [] },
      {
        price: 20,
        data: l("4GB carryover data", "4GB de datos acumulables"),
        perks: [MX_CA, SPAM],
      },
      {
        price: 30,
        data: l("10GB carryover data", "10GB de datos acumulables"),
        perks: [MX_CA, SPAM],
      },
      {
        price: 40,
        data: l("20GB carryover data", "20GB de datos acumulables"),
        perks: [MX_CA, SPAM],
      },
      {
        price: 50,
        name: l("Tracfone Freedom", "Tracfone Freedom"),
        data: l("Unlimited data, talk & text", "Datos, llamadas y textos ilimitados"),
        unlimited: true,
        hotspot: hotspot("15GB"),
        perks: [
          l(
            "Talk, text & roaming in Mexico & Canada",
            "Llamadas, textos y roaming en México y Canadá",
          ),
          SPAM,
          l(
            "Identity protection by IDnotify (Experian)",
            "Protección de identidad IDnotify (Experian)",
          ),
        ],
      },
    ],
    notes: [
      l("Save up to 20% with multi-month plans.", "Ahorra hasta 20% con planes de varios meses."),
      l(
        "Tracfone Freedom doesn't include carryover data. Video streams at up to 480p.",
        "Tracfone Freedom no incluye datos acumulables. Video hasta 480p.",
      ),
    ],
    source: BROCHURE,
  },
  {
    id: "h2o",
    name: "H2O Wireless",
    per: MO,
    includes: [
      UNL_TT,
      l(
        "Unlimited talk & text to 100+ countries (from the U.S.)",
        "Llamadas y textos ilimitados a más de 100 países (desde EE. UU.)",
      ),
      l(
        "Works in 100+ destinations when you travel",
        "Funciona en más de 100 destinos cuando viajas",
      ),
      l("No contracts, no overage fees", "Sin contratos ni cargos extra"),
    ],
    plans: [
      {
        price: 20,
        data: l("10GB high-speed data", "10GB de alta velocidad"),
        hotspot: hotspot("2GB"),
        perks: [roamCredit("$5"), intlCredit("$1.50")],
      },
      {
        price: 30,
        data: l("30GB high-speed data", "30GB de alta velocidad"),
        hotspot: hotspot("5GB"),
        badge: l("Best deal", "Mejor oferta"),
        perks: [roamCredit("$10"), intlCredit("$5")],
      },
      {
        price: 40,
        data: l("Unlimited (slower after 40GB)", "Ilimitados (más lento después de 40GB)"),
        unlimited: true,
        hotspot: hotspot("10GB"),
        perks: [roamCredit("$20"), intlCredit("$10")],
      },
      {
        price: 50,
        data: l("Unlimited (slower after 60GB)", "Ilimitados (más lento después de 60GB)"),
        unlimited: true,
        hotspot: hotspot("15GB"),
        perks: [roamCredit("$30"), intlCredit("$20")],
      },
      {
        price: 60,
        data: l("Unlimited (slower after 60GB)", "Ilimitados (más lento después de 60GB)"),
        unlimited: true,
        hotspot: hotspot("20GB"),
        perks: [roamCredit("$40"), intlCredit("$30")],
      },
    ],
    notes: [
      l(
        "Data, hotspot and international top-ups are available — ask at the counter.",
        "Hay recargas de datos, hotspot e internacionales; pregunta en el mostrador.",
      ),
    ],
    source: SIGN,
  },
  {
    id: "lyca",
    name: "Lyca Mobile",
    per: MO,
    includes: [
      l(
        "Unlimited international talk & text to 100 countries",
        "Llamadas y textos internacionales ilimitados a 100 países",
      ),
      l(
        "$19+ plans: unlimited roaming talk & text in Mexico & Canada",
        "Planes de $19+: llamadas y textos ilimitados en roaming en México y Canadá",
      ),
      l("eSIM, WiFi calling & hotspot", "eSIM, llamadas por WiFi y hotspot"),
    ],
    plans: [
      { price: 15, data: l("1GB data", "1GB de datos"), hotspot: hotspot("1GB"), perks: [] },
      {
        price: 19,
        data: l("5GB data", "5GB de datos"),
        hotspot: hotspot("5GB"),
        badge: l("Popular", "Popular"),
        perks: [intlCredit("$5")],
      },
      {
        price: 23,
        data: l("8GB data", "8GB de datos"),
        hotspot: hotspot("8GB"),
        perks: [intlCredit("$5")],
      },
      {
        price: 29,
        data: l("15GB data", "15GB de datos"),
        hotspot: hotspot("10GB"),
        perks: [intlCredit("$5")],
      },
      {
        price: 33,
        data: l("18GB data", "18GB de datos"),
        hotspot: hotspot("10GB"),
        perks: [intlCredit("$5")],
      },
      {
        price: 39,
        data: l("25GB data", "25GB de datos"),
        hotspot: hotspot("10GB"),
        perks: [intlCredit("$5")],
      },
      {
        price: 49,
        data: l("Unlimited data", "Datos ilimitados"),
        unlimited: true,
        hotspot: hotspot("15GB"),
        perks: [
          intlCredit("$10"),
          l("5GB data in Mexico & Canada", "5GB de datos en México y Canadá"),
        ],
      },
      {
        price: 59,
        data: l("Unlimited data", "Datos ilimitados"),
        unlimited: true,
        hotspot: hotspot("25GB"),
        perks: [
          intlCredit("$15"),
          l("5GB data in Mexico & Canada", "5GB de datos en México y Canadá"),
        ],
      },
    ],
    notes: [
      l("Prices for new customers.", "Precios para clientes nuevos."),
      l(
        "Unlimited plans: first 40GB at 5G speeds. International calling covers the first 10 numbers dialed per country.",
        "Planes ilimitados: los primeros 40GB a velocidad 5G. Las llamadas internacionales cubren los primeros 10 números marcados por país.",
      ),
    ],
    source: BROCHURE,
  },
  {
    id: "gen-mobile",
    name: "Gen Mobile",
    per: MO,
    includes: [
      l(
        "Unlimited nationwide talk & global text",
        "Llamadas nacionales y textos globales ilimitados",
      ),
      l(
        "Unlimited talk to 100+ international destinations",
        "Llamadas ilimitadas a más de 100 destinos internacionales",
      ),
      l(
        "$20+ plans: $10/mo international talk credit + $10/mo Mexico & Canada roaming credit",
        "Planes de $20+: $10/mes de crédito internacional + $10/mes de crédito de roaming en México y Canadá",
      ),
    ],
    plans: [
      {
        price: 10,
        data: l("2GB data", "2GB de datos"),
        hotspot: l("Hotspot included", "Hotspot incluido"),
        badge: l("Lowest price", "Precio más bajo"),
        perks: [],
      },
      {
        price: 20,
        data: l("8GB data", "8GB de datos"),
        hotspot: l("Up to 5GB hotspot", "Hasta 5GB de hotspot"),
        perks: [],
      },
      {
        price: 30,
        data: l("15GB data", "15GB de datos"),
        hotspot: l("Up to 10GB hotspot", "Hasta 10GB de hotspot"),
        perks: [],
      },
      {
        price: 40,
        data: l("25GB data", "25GB de datos"),
        hotspot: l("Up to 10GB hotspot", "Hasta 10GB de hotspot"),
        perks: [],
      },
      {
        price: 50,
        data: l("Unlimited data", "Datos ilimitados"),
        unlimited: true,
        hotspot: l("Up to 10GB hotspot", "Hasta 10GB de hotspot"),
        perks: [
          l("45GB high-speed, then up to 512kbps", "45GB de alta velocidad, luego hasta 512kbps"),
        ],
      },
    ],
    notes: [
      l(
        "On the $10–$40 plans, speeds slow to 128kbps after your data; video streams at about 360p.",
        "En los planes de $10–$40, la velocidad baja a 128kbps al terminar tus datos; video a unos 360p.",
      ),
    ],
    source: BROCHURE,
  },
];

/** Carriers we sell without a current brochure on file — ask in store for today's plans. */
export const OTHER_CARRIERS = ["Metro by T-Mobile", "Boost Mobile", "GoSmart"];

export const lowestPrice = Math.min(...CARRIERS.flatMap((c) => c.plans.map((p) => p.price)));
export const lowestUnlimited = Math.min(
  ...CARRIERS.flatMap((c) => c.plans.filter((p) => p.unlimited).map((p) => p.price)),
);
