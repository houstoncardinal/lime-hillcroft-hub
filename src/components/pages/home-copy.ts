import { PHONE, RATING, STREET } from "@/components/site/business";

// All visible text on the home page, in English and Spanish. Keep both in sync.
const en = {
  meta: {
    title: "Cell Phone Store & Phone Repair on Hillcroft, Houston | TIC Wireless",
    description:
      "Cell phone store at 3640 Hillcroft St, Houston: phones with no-credit financing from $40 down, same-day screen repair & unlocking. Se habla español.",
    imageAlt: "Boxed iPhone 17 Pro phones at TIC Wireless in Houston",
    breadcrumb: "Home",
  },
  hero: {
    kicker: "Cell phone store & repair · Hillcroft, Houston",
    title: ["Your phone,", "sorted."],
    body: [
      "The latest unlocked iPhones and Androids with financing from ",
      "$40 down",
      " — bad credit, no problem. Plus prepaid plans, same-day repairs and every accessory you need.",
    ],
    directions: "Get directions",
    reviews: "400+ Google reviews",
    language: "Se habla español",
    imageCaption: "iPhone 17 Pro — in stock, unlocked.",
    imageAlt:
      "Five boxed iPhone 17 Pro phones in cosmic orange, deep blue and silver with a TIC Wireless business card",
    financingLabel: "Financing",
    financingUnit: "down",
    financingNote: "Bad credit? No problem.",
  },
  ticker: [
    "Financing from $40 down",
    "Bad credit? No problem",
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
      "Inside the new TIC Wireless store on Hillcroft: glass display counters, accessory walls and service stations",
    stats: [
      [`${RATING}★`, "400+ Google reviews"],
      ["12+", "Carriers & recharge brands"],
      ["Same day", "Most repairs"],
      ["7 days", "Open every week"],
    ],
  },
  services: {
    kicker: "What we do",
    title: "Everything mobile, under one roof.",
    intro:
      "Buying, switching, fixing or paying — skip the mall and the big-box lines. We handle it all on Hillcroft.",
    featured: {
      title: "Unlocked iPhones & Androids",
      body: "Walk out with a new phone today. Financing starting at $40 down on the latest iPhone and Galaxy models.",
      chips: ["Bad credit OK", "$40 down", "iPhone & Galaxy", "Take it home today"],
      link: "Financing on consoles, laptops & more",
      imageAlt: "Samsung Galaxy S24 Ultra unboxed on the TIC Wireless counter",
    },
    items: [
      [
        "Prepaid plans",
        "Verizon, AT&T, T-Mobile, Cricket, Simple Mobile and more. No contracts, no surprise bills.",
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
      ["Bill payments", "Pay your phone bill in person for all major carriers. No extra charges."],
      [
        "International recharge",
        "Top up family abroad — Tigo, Digicel, Movistar, Telcel and more.",
      ],
    ],
    cta: "Not sure what you need? Just ask.",
  },
  carriers: {
    kicker: "Plans & payments",
    title: "Every major prepaid carrier, one counter.",
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
      ["Wall of phone cases and screen protectors", "Cases for every model"],
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
    body: `Rated ${RATING} out of 5 across 400+ Google reviews.`,
    cta: "See us on Google",
    imageAlt: "Samsung Galaxy S22 Ultra on the counter next to a rugged case",
  },
  area: {
    kicker: "Areas we serve",
    title: "Your neighborhood phone store in Southwest Houston.",
    body: [
      `You'll find us at ${STREET}, on Hillcroft between Richmond Ave and the Westpark Tollway — just north of the Mahatma Gandhi District (Harwin / Hillcroft) and minutes from Gulfton, Sharpstown, Westchase and the Galleria.`,
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
    zips: "Nearby ZIP codes: 77057 · 77036 · 77063 · 77042 · 77081 · 77074 · 77056",
  },
  faq: {
    kicker: "Questions",
    title: "Good to know.",
    more: "Anything else? Call us at",
    languages: "English & Español",
    items: [
      {
        q: "Where is TIC Wireless located?",
        a: `We're at ${STREET}, Houston, TX 77057 — in the shopping center on Hillcroft near Windswept, just north of the Westpark Tollway. Call ${PHONE} for directions.`,
      },
      {
        q: "Can I get a phone with bad credit or no credit?",
        a: "Yes. We offer financing and lease-to-own on unlocked iPhones and Android phones starting at $40 down — bad credit is no problem. Stop by and we'll walk you through the options in a few minutes.",
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
        q: "Can I pay my phone bill at TIC Wireless?",
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
        q: "Did TIC Wireless move?",
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
      "The glass storefront of the new TIC Wireless store at 3640 Hillcroft St, Houston",
    plazaAlt: "The shopping center at 3640 Hillcroft St from the parking lot",
    plazaCta: "Look for the plaza",
    accessible: "Wheelchair-accessible entrance & parking",
    directions: "Directions",
    hours: [
      ["Monday – Saturday", "9:00 AM – 8:00 PM"],
      ["Sunday", "9:00 AM – 5:00 PM"],
    ],
    mapTitle: "Map showing TIC Wireless at 3640 Hillcroft St, Houston",
  },
};

export type HomeCopy = typeof en;

const es: HomeCopy = {
  meta: {
    title: "Tienda de Celulares y Reparación en Hillcroft, Houston | TIC Wireless",
    description:
      "Tienda de celulares en 3640 Hillcroft St, Houston: celulares a pagos sin crédito desde $40, cambio de pantalla el mismo día, liberación y planes prepagados.",
    imageAlt: "Cajas de iPhone 17 Pro en TIC Wireless, Houston",
    breadcrumb: "Inicio",
  },
  hero: {
    kicker: "Tienda de celulares y reparación · Hillcroft, Houston",
    title: ["Tu celular,", "resuelto."],
    body: [
      "Los iPhone y Android desbloqueados más nuevos, a pagos desde ",
      "$40 de enganche",
      " — ¿mal crédito? No hay problema. Además planes prepagados, reparaciones el mismo día y todos los accesorios que necesitas.",
    ],
    directions: "Cómo llegar",
    reviews: "400+ reseñas en Google",
    language: "We speak English",
    imageCaption: "iPhone 17 Pro — disponible y desbloqueado.",
    imageAlt:
      "Cinco cajas de iPhone 17 Pro en naranja, azul y plata con una tarjeta de presentación de TIC Wireless",
    financingLabel: "A pagos",
    financingUnit: "de enganche",
    financingNote: "¿Mal crédito? No hay problema.",
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
      "Interior de la nueva tienda TIC Wireless en Hillcroft: vitrinas, paredes de accesorios y estaciones de servicio",
    stats: [
      [`${RATING}★`, "400+ reseñas en Google"],
      ["12+", "Compañías y recargas"],
      ["Mismo día", "La mayoría de reparaciones"],
      ["7 días", "Abiertos toda la semana"],
    ],
  },
  services: {
    kicker: "Lo que hacemos",
    title: "Todo para tu celular, en un solo lugar.",
    intro:
      "Comprar, cambiar de compañía, reparar o pagar — sin filas de centro comercial. Lo resolvemos todo en Hillcroft.",
    featured: {
      title: "iPhone y Android desbloqueados",
      body: "Llévate tu celular nuevo hoy mismo. A pagos desde $40 de enganche en los últimos modelos de iPhone y Galaxy.",
      chips: ["Mal crédito OK", "$40 de enganche", "iPhone y Galaxy", "Llévatelo hoy"],
      link: "Consolas, laptops y más a pagos",
      imageAlt: "Samsung Galaxy S24 Ultra en el mostrador de TIC Wireless",
    },
    items: [
      [
        "Planes prepagados",
        "Verizon, AT&T, T-Mobile, Cricket, Simple Mobile y más. Sin contratos, sin sorpresas.",
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
        "Paga tu factura de teléfono en persona para todas las compañías. Sin cargos extra.",
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
    title: "Todas las compañías prepagadas, en un solo mostrador.",
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
      ["Pared de fundas y micas para celular", "Fundas para cada modelo"],
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
    body: `Calificación de ${RATING} de 5 en más de 400 reseñas de Google.`,
    cta: "Míranos en Google",
    imageAlt: "Samsung Galaxy S22 Ultra en el mostrador junto a una funda resistente",
  },
  area: {
    kicker: "Zonas que atendemos",
    title: "Tu tienda de celulares de confianza en el suroeste de Houston.",
    body: [
      `Estamos en ${STREET}, sobre Hillcroft entre Richmond Ave y el Westpark Tollway — justo al norte del Distrito Mahatma Gandhi (Harwin / Hillcroft) y a minutos de Gulfton, Sharpstown, Westchase y la Galleria.`,
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
    zips: "Códigos postales cercanos: 77057 · 77036 · 77063 · 77042 · 77081 · 77074 · 77056",
  },
  faq: {
    kicker: "Preguntas",
    title: "Bueno saberlo.",
    more: "¿Algo más? Llámanos al",
    languages: "Español & English",
    items: [
      {
        q: "¿Dónde está TIC Wireless?",
        a: `Estamos en ${STREET}, Houston, TX 77057 — en el centro comercial sobre Hillcroft cerca de Windswept, justo al norte del Westpark Tollway. Llama al ${PHONE} si necesitas indicaciones.`,
      },
      {
        q: "¿Puedo sacar un celular a pagos con mal crédito o sin crédito?",
        a: "Sí. Tenemos financiamiento y arrendamiento con opción a compra en iPhone y Android desbloqueados desde $40 de enganche — el mal crédito no es problema. Ven y te explicamos las opciones en unos minutos.",
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
        q: "¿Puedo pagar mi factura de teléfono en TIC Wireless?",
        a: "Sí. Recibimos pagos de todas las compañías prepagadas principales, sin cargos extra. También vendemos internet prepagado Xfinity y recargas internacionales.",
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
        q: "¿TIC Wireless se cambió de lugar?",
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
      "Fachada de vidrio de la nueva tienda TIC Wireless en 3640 Hillcroft St, Houston",
    plazaAlt: "El centro comercial de 3640 Hillcroft St visto desde el estacionamiento",
    plazaCta: "Busca esta plaza",
    accessible: "Entrada y estacionamiento accesibles para silla de ruedas",
    directions: "Cómo llegar",
    hours: [
      ["Lunes – Sábado", "9:00 AM – 8:00 PM"],
      ["Domingo", "9:00 AM – 5:00 PM"],
    ],
    mapTitle: "Mapa de TIC Wireless en 3640 Hillcroft St, Houston",
  },
};

export const HOME_COPY = { en, es };
