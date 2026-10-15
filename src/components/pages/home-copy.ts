import { GOOGLE_REVIEW_COUNT } from "@/components/reviews/data";
import { PHONE, RATING, STREET } from "@/components/site/business";

const REVIEWS_N = GOOGLE_REVIEW_COUNT;

// All visible text on the home page, in English and Spanish. Keep both in sync.
const en = {
  meta: {
    title: "Cell Phone Store & Phone Repair in Houston, TX | TIC Wireless",
    description:
      "Cell phone store at 3640 Hillcroft St, Suite C, Houston: phones with no-credit leasing from $40 down, same-day screen repair & unlocking. Se habla español.",
    imageAlt:
      "The storefront of TIC Wireless Electronic & Repair Center at 3640 Hillcroft St, Suite C, Houston",
    breadcrumb: "Home",
  },
  hero: {
    kicker: "3640 Hillcroft St · Southwest Houston",
    // The H1 (keyword line); the slogan is shown under it, outside the H1.
    title: ["Cell phone store & phone repair", "in Houston."],
    slogan: "Your phone, sorted.",
    body: [
      "The new iPhone 18 Pro Max and unlocked Android phones, with leasing from ",
      "$40 down",
      " — no credit needed, subject to approval. Plus prepaid plans, same-day repairs and the accessories you need.",
    ],
    directions: "Get directions",
    reviews: `${REVIEWS_N} Google reviews`,
    language: "Se habla español",
    imageKicker: "Just in",
    imageTitle: "iPhone 18 Pro Max",
    imageSub: "Unlocked · lease-to-own available",
    imageCta: "See the iPhone 18",
    imageAlt:
      "A hand holding a plum iPhone 18 Pro Max in front of its box at TIC Wireless Electronic & Repair Center",
    leaseLabel: "iPhone 18 Pro Max leasing",
    leaseUnit: "down",
    leaseNote: "Minimum down payment to lease the iPhone 18 Pro Max, subject to approval. Weekly, biweekly or monthly payments.",
  },
  ticker: [
    "Leasing from $40 down",
    "No credit needed",
    "Unlocked iPhones & Androids",
    "Prepaid plans",
    "Xfinity Prepaid internet",
    "Same-day repair",
    "Unlocking",
    "Se habla español",
  ],
  showroom: {
    kicker: "Our new store",
    title: "Bigger store. Same neighborhood.",
    body: `We moved down the street to ${STREET} — more room for phones, accessories and the team Hillcroft already knows.`,
    imageAlt:
      "Inside the new TIC Wireless Electronic & Repair Center store on Hillcroft: glass display counters, accessory walls and service stations",
    stats: [
      [`${RATING}★`, `${REVIEWS_N} Google reviews`],
      ["12", "Prepaid carriers"],
      ["Same day", "Most repairs"],
      ["7 days", "Open every week"],
    ],
  },
  services: {
    kicker: "What we do",
    more: "Learn more",
    title: "Everything mobile, under one roof.",
    intro:
      "Buying, switching, fixing or paying — skip the mall and the big-box lines. We handle it all on Hillcroft.",
    featured: {
      title: "Unlocked iPhones & Androids",
      body: "Walk out with a new phone today. Leasing starting at $40 down on iPhone and Galaxy models, subject to approval.",
      chips: ["Bad credit OK", "$40 down", "iPhone & Galaxy", "Take it home today"],
      link: "Leasing on consoles, laptops & more",
      imageAlt:
        "Samsung Galaxy S24 Ultra unboxed on the TIC Wireless Electronic & Repair Center counter",
    },
    items: [
      [
        "Prepaid plans",
        "12 carriers, including Verizon, AT&T, T-Mobile, Cricket and Simple Mobile. No contracts, no surprise bills.",
      ],
      [
        "Xfinity Prepaid internet",
        "Fast home internet on a prepaid plan, sold and set up right here in store.",
      ],
      [
        "Same-day repair",
        "Phones, tablets and laptops. Cracked screens, batteries and charging ports.",
      ],
      ["Unlocking", "Unlock your device and take it to the carrier that works best for you."],
      ["Buy · Sell · Trade", "Trade in your old phone toward something new, or sell it for cash."],
      [
        "Bill payments",
        "Pay your phone bill in person for the major prepaid carriers. No extra charges.",
      ],
      [
        "International recharge",
        "Top up family abroad — Tigo, Digicel, Movistar, Telcel and more.",
      ],
    ],
    cta: "Not sure what you need? Just ask.",
  },
  carriers: {
    kicker: "Plans & payments",
    title: "12 prepaid carriers, one counter.",
    recharge: "International recharge:",
    more: "& more",
  },
  repair: {
    kicker: "Repair · Unlock · Protect",
    title: "Cracked screen? Dead battery? Handled today.",
    body: "iPhone, Samsung and Android phones, tablets, laptops and computers — screens, batteries, charging ports and software. Then we'll fit tempered glass and a case so it doesn't happen again.",
    badgeLabel: "Turnaround",
    badge: "Same day",
    imageAlt: "Premium 9H tempered glass screen protector next to a Samsung Galaxy S21+ box",
    steps: [
      [
        "Walk in",
        "No appointment needed. Bring your iPhone, Samsung, tablet or laptop during store hours.",
      ],
      [
        "Honest diagnosis",
        "We check it in front of you, explain what's wrong and quote the price before any work starts.",
      ],
      ["Fixed today", "Most screen, battery and charging-port repairs are done the same day."],
    ],
    cta: "Call for a repair quote",
  },
  accessories: {
    kicker: "Accessories",
    title: "Gear up before you leave.",
    body: "Walls of cases, glass, chargers and sound — fitted to your phone at the counter.",
    items: [
      "Cases & iPhone cases",
      "Tempered & UV glass",
      "Car chargers & mounts",
      "Charging cables",
      "AirPods & Galaxy Buds",
      "JBL speakers & headphones",
      "Smartwatches & bands",
      "Memory cards",
    ],
    photos: [
      ["Wall of phone cases and screen protectors", "Cases for most models"],
      [
        "JBL speakers, smartwatches and wireless chargers in a display case",
        "JBL, watches & chargers",
      ],
      ["Apple iPad, AirPods and accessories in a glass display", "iPad & AirPods"],
      ["Boxed iPhone 15 Pro with an OtterBox case", "OtterBox & more"],
    ],
  },
  rating: {
    kicker: "Trusted on Hillcroft",
    body: `Rated ${RATING} out of 5 across ${REVIEWS_N} Google reviews.`,
    cta: "See us on Google",
    imageAlt: "Samsung Galaxy S22 Ultra on the counter next to a rugged case",
  },
  glance: {
    kicker: "At a glance",
    title: "TIC Wireless Electronic & Repair Center in 30 seconds.",
    summary:
      "TIC Wireless Electronic & Repair Center is an independent cell phone store and phone repair shop at 3640 Hillcroft St, Suite C in Southwest Houston, Texas. It sells unlocked iPhones and Androids with no-credit-needed leasing from $40 down (subject to approval), prepaid plans from 12 carriers and accessories, and does same-day phone repair, unlocking and bill payments — in English and Spanish.",
    facts: [
      ["Address", "3640 Hillcroft St, Suite C, Houston, TX 77057"],
      ["Phone", "(713) 339-9300"],
      ["Hours", "Mon–Sat 9 AM–8 PM · Sun 9 AM–5 PM · no appointment needed"],
      [
        "Leasing",
        "No credit needed · from $40 down · subject to approval · weekly, biweekly or monthly payments",
      ],
      ["Repairs", "Same-day screen, battery & charging-port repair for iPhone, Samsung & Android"],
      [
        "Prepaid carriers",
        "T-Mobile Prepaid, Verizon Prepaid, AT&T Prepaid, Cricket, Simple Mobile, Tracfone, H2O Wireless, Lyca Mobile, Gen Mobile, Metro by T-Mobile, Boost Mobile, GoSmart",
      ],
      ["Languages", "English & Spanish"],
      ["Rating", `${RATING}★ on Google · ${REVIEWS_N} reviews`],
    ],
  },
  area: {
    kicker: "Areas we serve",
    title: "Your neighborhood phone store in Southwest Houston.",
    body: [
      `You'll find us at ${STREET}, near Hillcroft & Windswept, just north of the Westpark Tollway — up Hillcroft from the Mahatma Gandhi District (Harwin / Hillcroft) and minutes from Gulfton, Sharpstown, Westchase and the Galleria.`,
      "Customers come to us from all over Southwest Houston for phones, prepaid plans, repairs and bill payments — in English or Spanish.",
    ],
    places: [
      "Westside / Mid West",
      "Mahatma Gandhi District",
      "Harwin",
      "Gulfton",
      "Sharpstown",
      "Westchase",
      "Galleria / Uptown",
      "Briarmeadow",
      "Bellaire",
      "Alief",
    ],
    zips: "Nearby ZIP codes: 77057 · 77036 · 77081 · 77074 · 77042 · 77056 · 77401",
    cta: "Find your area or ZIP code",
  },
  faq: {
    kicker: "Questions",
    title: "Good to know.",
    more: "Anything else? Call us at",
    languages: "English & Español",
    guides: "Helpful guides",
    allGuides: "All guides",
    items: [
      {
        q: "Where is TIC Wireless Electronic & Repair Center located?",
        a: `We're at ${STREET}, Houston, TX 77057 — in the shopping center on Hillcroft near Windswept, just north of the Westpark Tollway. Call ${PHONE} for directions.`,
      },
      {
        q: "Can I get a phone with bad credit or no credit?",
        a: "Yes. We offer leasing (lease-to-own) on unlocked iPhones and Android phones starting at $40 down. No credit is needed, so bad credit isn't automatically a deal-breaker, though approval isn't guaranteed. Stop by with a valid photo ID and we'll walk you through the options in a few minutes.",
      },
      {
        q: "Do you fix cracked iPhone and Samsung screens?",
        a: "Yes. We repair screens, batteries and charging ports on iPhone, Samsung and other Android phones, plus tablets and laptops. Most phone repairs are finished the same day, and we quote the price before we start.",
      },
      {
        q: "Can you unlock my phone?",
        a: "Yes. We unlock phones so you can switch to the carrier you want. Bring your phone in and we'll check it for you.",
      },
      {
        q: "Can I pay my phone bill at TIC Wireless Electronic & Repair Center?",
        a: "Yes. We take bill payments for all major prepaid carriers in store, with no extra charges. We also sell Xfinity Prepaid internet and international recharge.",
      },
      {
        q: "What are your hours?",
        a: "Monday to Saturday 9 AM – 8 PM and Sunday 9 AM – 5 PM.",
      },
      {
        q: "¿Hablan español?",
        a: "¡Sí! Se habla español. Te ayudamos con celulares, planes, reparaciones y pagos en tu idioma.",
      },
      {
        q: "Did TIC Wireless Electronic & Repair Center move?",
        a: `Yes — we moved from 3838 Hillcroft (Suite 100) to our new, bigger store at ${STREET}. Same team, same phone number.`,
      },
    ],
  },
  visit: {
    kicker: "Visit the store",
    title: "Come see us on Hillcroft.",
    caption:
      "in the shopping center near Hillcroft & Windswept, just north of the Westpark Tollway.",
    storefrontAlt:
      "The glass storefront of the new TIC Wireless Electronic & Repair Center store at 3640 Hillcroft St, Suite C, Houston",
    plazaAlt: "The shopping center at 3640 Hillcroft St, Suite C from the parking lot",
    plazaCta: "Look for the plaza",
    more: "Full location details, photos & parking",
    accessible: "Wheelchair-accessible entrance & parking",
    directions: "Directions",
    hours: [
      ["Monday – Saturday", "9:00 AM – 8:00 PM"],
      ["Sunday", "9:00 AM – 5:00 PM"],
    ],
    mapTitle:
      "Map showing TIC Wireless Electronic & Repair Center at 3640 Hillcroft St, Suite C, Houston",
  },
};

export type HomeCopy = typeof en;

const es: HomeCopy = {
  meta: {
    title: "Tienda de Celulares y Reparación en Houston, TX | TIC Wireless",
    description:
      "Tienda de celulares en Hillcroft, Houston: celulares a pagos sin crédito desde $40, cambio de pantalla el mismo día, liberación y planes prepagados.",
    imageAlt:
      "Fachada de TIC Wireless Electronic & Repair Center en 3640 Hillcroft St, Suite C, Houston",
    breadcrumb: "Inicio",
  },
  hero: {
    kicker: "3640 Hillcroft St · Suroeste de Houston",
    title: ["Tienda y reparación de celulares", "en Houston."],
    slogan: "Tu celular, resuelto.",
    body: [
      "El nuevo iPhone 18 Pro Max y celulares Android, desbloqueados y a pagos desde ",
      "$40 de enganche",
      " — sin necesidad de crédito, sujeto a aprobación. Además planes prepagados, reparaciones el mismo día y los accesorios que necesitas.",
    ],
    directions: "Cómo llegar",
    reviews: `${REVIEWS_N} reseñas en Google`,
    language: "We speak English",
    imageKicker: "Recién llegado",
    imageTitle: "iPhone 18 Pro Max",
    imageSub: "Desbloqueado · con opción a compra",
    imageCta: "Ver el iPhone 18",
    imageAlt:
      "Una mano sosteniendo un iPhone 18 Pro Max color ciruela frente a su caja en TIC Wireless Electronic & Repair Center",
    leaseLabel: "iPhone 18 Pro Max a pagos",
    leaseUnit: "de enganche",
    leaseNote: "Enganche mínimo para arrendar el iPhone 18 Pro Max, sujeto a aprobación. Pagos semanales, quincenales o mensuales.",
  },
  ticker: [
    "A pagos desde $40",
    "Sin necesidad de crédito",
    "iPhone y Android desbloqueados",
    "Planes prepagados",
    "Internet prepagado Xfinity",
    "Reparación el mismo día",
    "Liberación de celulares",
    "Se habla español",
  ],
  showroom: {
    kicker: "Nuestra nueva tienda",
    title: "Tienda más grande. El mismo barrio.",
    body: `Nos mudamos a unas cuadras, al ${STREET} — más espacio para celulares, accesorios y el equipo que Hillcroft ya conoce.`,
    imageAlt:
      "Interior de la nueva tienda TIC Wireless Electronic & Repair Center en Hillcroft: vitrinas, paredes de accesorios y estaciones de servicio",
    stats: [
      [`${RATING}★`, `${REVIEWS_N} reseñas en Google`],
      ["12", "Compañías prepagadas"],
      ["Mismo día", "La mayoría de reparaciones"],
      ["7 días", "Abiertos toda la semana"],
    ],
  },
  services: {
    kicker: "Lo que hacemos",
    more: "Ver más",
    title: "Todo para tu celular, en un solo lugar.",
    intro:
      "Comprar, cambiar de compañía, reparar o pagar — sin filas de centro comercial. Lo resolvemos todo en Hillcroft.",
    featured: {
      title: "iPhone y Android desbloqueados",
      body: "Llévate tu celular nuevo hoy mismo. A pagos desde $40 de enganche en modelos de iPhone y Galaxy, sujeto a aprobación.",
      chips: ["Mal crédito OK", "$40 de enganche", "iPhone y Galaxy", "Llévatelo hoy"],
      link: "Consolas, laptops y más a pagos",
      imageAlt:
        "Samsung Galaxy S24 Ultra en el mostrador de TIC Wireless Electronic & Repair Center",
    },
    items: [
      [
        "Planes prepagados",
        "12 compañías, entre ellas Verizon, AT&T, T-Mobile, Cricket y Simple Mobile. Sin contratos, sin sorpresas.",
      ],
      [
        "Internet prepagado Xfinity",
        "Internet rápido para tu casa en plan prepagado, a la venta y activado aquí mismo.",
      ],
      [
        "Reparación el mismo día",
        "Celulares, tabletas y laptops. Pantallas rotas, baterías y puertos de carga.",
      ],
      [
        "Liberación de celulares",
        "Libera tu teléfono y úsalo con la compañía que más te convenga.",
      ],
      [
        "Compra · Venta · Intercambio",
        "Cambia tu celular usado por uno nuevo, o véndelo en efectivo.",
      ],
      [
        "Pago de facturas",
        "Paga en persona la factura de las principales compañías prepagadas. Sin cargos extra.",
      ],
      [
        "Recargas internacionales",
        "Recarga a tu familia en el extranjero — Tigo, Digicel, Movistar, Telcel y más.",
      ],
    ],
    cta: "¿No sabes qué necesitas? Pregúntanos.",
  },
  carriers: {
    kicker: "Planes y pagos",
    title: "12 compañías prepagadas, en un solo mostrador.",
    recharge: "Recargas internacionales:",
    more: "y más",
  },
  repair: {
    kicker: "Reparar · Liberar · Proteger",
    title: "¿Pantalla rota? ¿Batería muerta? Listo hoy.",
    body: "Celulares iPhone, Samsung y Android, tabletas, laptops y computadoras — pantallas, baterías, puertos de carga y software. Después te ponemos mica de vidrio templado y funda para que no vuelva a pasar.",
    badgeLabel: "Entrega",
    badge: "Mismo día",
    imageAlt: "Mica de vidrio templado 9H junto a una caja de Samsung Galaxy S21+",
    steps: [
      [
        "Ven sin cita",
        "No necesitas cita. Trae tu iPhone, Samsung, tableta o laptop en horario de tienda.",
      ],
      [
        "Diagnóstico honesto",
        "Lo revisamos frente a ti, te explicamos la falla y te damos el precio antes de empezar.",
      ],
      [
        "Listo hoy",
        "La mayoría de cambios de pantalla, batería y puerto de carga quedan el mismo día.",
      ],
    ],
    cta: "Llama para cotizar tu reparación",
  },
  accessories: {
    kicker: "Accesorios",
    title: "Equípate antes de irte.",
    body: "Paredes llenas de fundas, micas, cargadores y audio — te los ponemos en el mostrador.",
    items: [
      "Fundas para iPhone y Android",
      "Micas de vidrio templado y UV",
      "Cargadores y bases para carro",
      "Cables de carga",
      "AirPods y Galaxy Buds",
      "Bocinas y audífonos JBL",
      "Relojes inteligentes y correas",
      "Memorias",
    ],
    photos: [
      ["Pared de fundas y micas para celular", "Fundas para la mayoría de modelos"],
      [
        "Bocinas JBL, relojes inteligentes y cargadores en una vitrina",
        "JBL, relojes y cargadores",
      ],
      ["iPad, AirPods y accesorios Apple en una vitrina", "iPad y AirPods"],
      ["iPhone 15 Pro en caja con funda OtterBox", "OtterBox y más"],
    ],
  },
  rating: {
    kicker: "La confianza de Hillcroft",
    body: `Calificación de ${RATING} de 5 en ${REVIEWS_N} reseñas de Google.`,
    cta: "Míranos en Google",
    imageAlt: "Samsung Galaxy S22 Ultra en el mostrador junto a una funda resistente",
  },
  glance: {
    kicker: "En resumen",
    title: "TIC Wireless Electronic & Repair Center en 30 segundos.",
    summary:
      "TIC Wireless Electronic & Repair Center es una tienda independiente de celulares y taller de reparación en 3640 Hillcroft St, Suite C, en el suroeste de Houston, Texas. Vende iPhone y Android desbloqueados a pagos sin necesidad de crédito desde $40 de enganche (sujeto a aprobación), planes prepagados de 12 compañías y accesorios, y hace reparaciones el mismo día, liberaciones y pago de facturas — en español e inglés.",
    facts: [
      ["Dirección", "3640 Hillcroft St, Suite C, Houston, TX 77057"],
      ["Teléfono", "(713) 339-9300"],
      ["Horario", "Lun–Sáb 9 AM–8 PM · Dom 9 AM–5 PM · sin cita"],
      [
        "Arrendamiento",
        "Sin necesidad de crédito · desde $40 de enganche · sujeto a aprobación · pagos semanales, quincenales o mensuales",
      ],
      [
        "Reparaciones",
        "Pantallas, baterías y puertos de carga el mismo día para iPhone, Samsung y Android",
      ],
      [
        "Compañías prepagadas",
        "T-Mobile Prepaid, Verizon Prepaid, AT&T Prepaid, Cricket, Simple Mobile, Tracfone, H2O Wireless, Lyca Mobile, Gen Mobile, Metro by T-Mobile, Boost Mobile, GoSmart",
      ],
      ["Idiomas", "Español e inglés"],
      ["Calificación", `${RATING}★ en Google · ${REVIEWS_N} reseñas`],
    ],
  },
  area: {
    kicker: "Zonas que atendemos",
    title: "Tu tienda de celulares de confianza en el suroeste de Houston.",
    body: [
      `Estamos en ${STREET}, cerca de Hillcroft y Windswept, justo al norte del Westpark Tollway — subiendo por Hillcroft desde el Distrito Mahatma Gandhi (Harwin / Hillcroft) y a minutos de Gulfton, Sharpstown, Westchase y la Galleria.`,
      "Clientes de todo el suroeste de Houston vienen por celulares, planes prepagados, reparaciones y pago de facturas — en español o en inglés.",
    ],
    places: [
      "Westside / Mid West",
      "Distrito Mahatma Gandhi",
      "Harwin",
      "Gulfton",
      "Sharpstown",
      "Westchase",
      "Galleria / Uptown",
      "Briarmeadow",
      "Bellaire",
      "Alief",
    ],
    zips: "Códigos postales cercanos: 77057 · 77036 · 77081 · 77074 · 77042 · 77056 · 77401",
    cta: "Busca tu zona o código postal",
  },
  faq: {
    kicker: "Preguntas",
    title: "Bueno saberlo.",
    more: "¿Algo más? Llámanos al",
    languages: "Español & English",
    guides: "Guías útiles",
    allGuides: "Todas las guías",
    items: [
      {
        q: "¿Dónde está TIC Wireless Electronic & Repair Center?",
        a: `Estamos en ${STREET}, Houston, TX 77057 — en el centro comercial sobre Hillcroft cerca de Windswept, justo al norte del Westpark Tollway. Llama al ${PHONE} si necesitas indicaciones.`,
      },
      {
        q: "¿Puedo sacar un celular a pagos con mal crédito o sin crédito?",
        a: "Sí. Tenemos arrendamiento con opción a compra en iPhone y Android desbloqueados desde $40 de enganche. No necesitas crédito, así que el mal crédito no es impedimento automático, aunque la aprobación no está garantizada. Ven con una identificación con foto y te explicamos las opciones en unos minutos.",
      },
      {
        q: "¿Reparan pantallas rotas de iPhone y Samsung?",
        a: "Sí. Reparamos pantallas, baterías y puertos de carga de iPhone, Samsung y otros Android, además de tabletas y laptops. La mayoría de reparaciones de celular quedan el mismo día y te damos el precio antes de empezar.",
      },
      {
        q: "¿Pueden liberar mi celular?",
        a: "Sí. Liberamos celulares para que puedas cambiarte a la compañía que quieras. Tráelo y lo revisamos.",
      },
      {
        q: "¿Puedo pagar mi factura de teléfono en TIC Wireless Electronic & Repair Center?",
        a: "Sí. Recibimos pagos de las principales compañías prepagadas, sin cargos extra. También vendemos internet prepagado Xfinity y recargas internacionales.",
      },
      {
        q: "¿Cuál es su horario?",
        a: "Lunes a sábado de 9 AM a 8 PM y domingo de 9 AM a 5 PM.",
      },
      {
        q: "Do you speak English?",
        a: "Yes! Our team helps customers in English and Spanish.",
      },
      {
        q: "¿TIC Wireless Electronic & Repair Center se cambió de lugar?",
        a: `Sí — nos mudamos del 3838 Hillcroft (Suite 100) a nuestra nueva tienda, más grande, en ${STREET}. El mismo equipo y el mismo número de teléfono.`,
      },
    ],
  },
  visit: {
    kicker: "Visita la tienda",
    title: "Te esperamos en Hillcroft.",
    caption:
      "en el centro comercial cerca de Hillcroft y Windswept, justo al norte del Westpark Tollway.",
    storefrontAlt:
      "Fachada de vidrio de la nueva tienda TIC Wireless Electronic & Repair Center en 3640 Hillcroft St, Suite C, Houston",
    plazaAlt: "El centro comercial de 3640 Hillcroft St, Suite C visto desde el estacionamiento",
    plazaCta: "Busca esta plaza",
    more: "Ubicación completa, fotos y estacionamiento",
    accessible: "Entrada y estacionamiento accesibles para silla de ruedas",
    directions: "Cómo llegar",
    hours: [
      ["Lunes – Sábado", "9:00 AM – 8:00 PM"],
      ["Domingo", "9:00 AM – 5:00 PM"],
    ],
    mapTitle:
      "Mapa de TIC Wireless Electronic & Repair Center en 3640 Hillcroft St, Suite C, Houston",
  },
};

export const HOME_COPY = { en, es };
