import type { Faq } from "@/components/site/schema";
import type { Lang } from "@/components/site/seo";

// Store-location page. Facts only from the Google Business Profile, store signage and
// public/llms-full.txt — no landmarks or amenities we haven't confirmed.

export type GalleryPhoto =
  | "storefront"
  | "counter"
  | "caseWall"
  | "apple"
  | "jbl"
  | "laptops"
  | "consoles"
  | "plaza"
  | "phones";

const en = {
  meta: {
    title: "TIC Wireless Hillcroft Location, Hours & Directions | Houston",
    description:
      "Find TIC Wireless at 3640 Hillcroft St, Suite C, Houston 77057: store hours, parking, directions from Gulfton, Sharpstown, Alief and the Galleria, and photos.",
    breadcrumb: ["Home", "Location & hours"],
    imageAlt: "The glass storefront of TIC Wireless at 3640 Hillcroft St, Suite C, Houston",
  },
  hero: {
    kicker: "Store location · Hillcroft, Houston",
    h1: ["TIC Wireless on Hillcroft:", "location, hours & directions"],
    body: "Our store is at 3640 Hillcroft St, Suite C, in the shopping center near Hillcroft & Windswept, just north of the Westpark Tollway. Walk in any day of the week — no appointment needed, and se habla español.",
    call: "Call the store",
    directions: "Get directions",
    photoAlt: "The glass storefront of TIC Wireless Electronic & Repair Center, Suite C",
  },
  facts: [
    ["Address", "3640 Hillcroft St, Suite C\nHouston, TX 77057"],
    ["Phone", "(713) 339-9300"],
    ["Parking", "Shopping-center lot right in front of the store"],
    ["Access", "Wheelchair-accessible entrance & parking"],
    ["Languages", "English & Spanish"],
    ["Appointments", "Not needed — just walk in"],
  ],
  hours: {
    title: "Store hours",
    days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    today: "Today",
    note: "Holiday hours may vary — call (713) 339-9300 to confirm before you come.",
  },
  find: {
    kicker: "How to find us",
    title: "Easy to spot, easy to park.",
    steps: [
      [
        "Head for Hillcroft & Windswept",
        "We're on Hillcroft Avenue near Windswept Lane, just north of the Westpark Tollway in Southwest Houston.",
      ],
      [
        "Pull into the shopping center",
        "Look for the plaza at 3640 Hillcroft St and park in the lot — spaces are right in front of the stores.",
      ],
      [
        "Find Suite C",
        "Our glass storefront has the carrier posters in the windows. Walk straight in; the counter is just inside.",
      ],
    ],
    plazaAlt: "The shopping center at 3640 Hillcroft St from the parking lot",
    storefrontAlt: "TIC Wireless storefront in Suite C, seen from the sidewalk",
    plazaCaption: "The shopping center from the parking lot",
    storefrontCaption: "Our door — Suite C",
    openMaps: "Open in Google Maps",
  },
  drive: {
    kicker: "Driving times",
    title: "Minutes from your neighborhood.",
    body: "Distances and drive times without traffic, from the center of each area. Tap an area for turn-by-turn directions and local details.",
    area: "From",
    distance: "Distance",
    time: "Drive",
    route: "Route",
    mi: (n: number) => `${n.toFixed(1)} mi`,
    min: (n: number) => `${n} min`,
    all: "All areas we serve",
  },
  map: {
    title:
      "Map showing TIC Wireless Electronic & Repair Center at 3640 Hillcroft St, Suite C, Houston",
    load: "Show the map",
    note: "Loads Google Maps",
  },
  inside: {
    kicker: "Inside the store",
    title: "Take a look around.",
    body: "One counter for phones, plans, repairs and payments, a full wall of cases, and display cases of headphones, speakers, smartwatches, laptops and consoles.",
    photos: [
      ["counter", "The service counter, where we handle sales, plans, repairs and payments"],
      ["caseWall", "The case wall — iPhone and Samsung Galaxy cases, OtterBox and ZIZO"],
      ["apple", "MacBook, iPad and Galaxy Buds in the display case"],
      ["jbl", "JBL speakers, smartwatches and chargers"],
      ["laptops", "Laptops and tablets available with leasing"],
      ["consoles", "PlayStation 5, Nintendo Switch 2 and prepaid plan displays"],
      ["phones", "iPhones and Samsung Galaxy phones in the display case"],
    ] as [GalleryPhoto, string][],
    video: "A walk past the counter and accessory walls inside the store",
  },
  offer: {
    kicker: "At this location",
    title: "Everything you can do here.",
    leasing: "Leasing on consoles, laptops & phones",
    leasingBody: "PS5, Xbox, Switch 2, MacBook and more — no credit needed, subject to approval.",
    more: "Learn more",
  },
  bring: {
    kicker: "Before you visit",
    title: "What to bring.",
    items: [
      [
        "Leasing a phone, console or laptop",
        "A valid photo ID. The application takes a few minutes at the counter.",
      ],
      [
        "A repair",
        "Your phone and its passcode, so we can test it afterwards. Back it up first if you can.",
      ],
      [
        "Switching carriers & keeping your number",
        "Your current account number and transfer PIN. Keep the old line active until the switch is done.",
      ],
      ["Unlocking", "Just the phone — we check its lock status first."],
      [
        "Selling or trading in",
        "The phone, its charger if you have it, and your passcode. Sign out of iCloud or Google first.",
      ],
      [
        "Bill payments & recharge",
        "The phone number you're paying or topping up (with the country code for international).",
      ],
    ],
  },
  moved: {
    title: "We moved — same team, same number.",
    body: "TIC Wireless moved from 3838 Hillcroft St, Suite 100 to a bigger store at 3640 Hillcroft St, Suite C. Some map apps may still show the old address; the right one is 3640 Hillcroft St, Suite C, Houston, TX 77057.",
  },
  reviews: {
    rating: "4.7 on Google",
    count: "from 400+ reviews",
    cta: "Read our reviews",
  },
  faqTitle: "Location questions",
  faqs: [
    {
      q: "Where is TIC Wireless on Hillcroft?",
      a: "3640 Hillcroft St, Suite C, Houston, TX 77057 — in the shopping center on Hillcroft Avenue near Windswept Lane, just north of the Westpark Tollway.",
    },
    {
      q: "What are your store hours?",
      a: "Monday to Saturday 9:00 AM – 8:00 PM and Sunday 9:00 AM – 5:00 PM. Holiday hours may vary, so call (713) 339-9300 to confirm.",
    },
    {
      q: "Is there parking?",
      a: "Yes. Park in the shopping center lot right in front of the store. The entrance and parking are wheelchair accessible.",
    },
    {
      q: "Do I need an appointment?",
      a: "No. Walk in any time during store hours — for phones, plans, payments and repairs.",
    },
    {
      q: "Did TIC Wireless move?",
      a: "Yes. We moved from 3838 Hillcroft St, Suite 100 to 3640 Hillcroft St, Suite C. Same team and same phone number, (713) 339-9300.",
    },
    {
      q: "Do you speak Spanish?",
      a: "Yes — se habla español. Our team helps customers in English and Spanish, in the store and on the phone.",
    },
  ] as Faq[],
  cta: {
    title: "See you on Hillcroft.",
    body: "Questions before you come? Call and ask — we'll check stock, quote a repair or set something aside.",
  },
};

export type LocationCopy = typeof en;

const es: LocationCopy = {
  meta: {
    title: "TIC Wireless en Hillcroft: Ubicación, Horario y Cómo Llegar",
    description:
      "Visita TIC Wireless en 3640 Hillcroft St, Suite C, Houston 77057: horario, estacionamiento, cómo llegar desde Gulfton, Sharpstown, Alief y la Galleria, y fotos.",
    breadcrumb: ["Inicio", "Ubicación y horario"],
    imageAlt: "Fachada de vidrio de TIC Wireless en 3640 Hillcroft St, Suite C, Houston",
  },
  hero: {
    kicker: "Ubicación de la tienda · Hillcroft, Houston",
    h1: ["TIC Wireless en Hillcroft:", "ubicación, horario y cómo llegar"],
    body: "Estamos en 3640 Hillcroft St, Suite C, en el centro comercial cerca de Hillcroft y Windswept, justo al norte del Westpark Tollway. Ven cualquier día de la semana, sin cita. We speak English.",
    call: "Llama a la tienda",
    directions: "Cómo llegar",
    photoAlt: "Fachada de vidrio de TIC Wireless Electronic & Repair Center, Suite C",
  },
  facts: [
    ["Dirección", "3640 Hillcroft St, Suite C\nHouston, TX 77057"],
    ["Teléfono", "(713) 339-9300"],
    ["Estacionamiento", "En el lote del centro comercial, enfrente de la tienda"],
    ["Accesibilidad", "Entrada y estacionamiento para silla de ruedas"],
    ["Idiomas", "Español e inglés"],
    ["Citas", "No se necesita cita"],
  ],
  hours: {
    title: "Horario",
    days: ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"],
    today: "Hoy",
    note: "El horario en días festivos puede cambiar: llama al (713) 339-9300 para confirmar.",
  },
  find: {
    kicker: "Cómo encontrarnos",
    title: "Fácil de ver, fácil de estacionar.",
    steps: [
      [
        "Ve a Hillcroft y Windswept",
        "Estamos en Hillcroft Avenue cerca de Windswept Lane, justo al norte del Westpark Tollway, en el suroeste de Houston.",
      ],
      [
        "Entra al centro comercial",
        "Busca la plaza de 3640 Hillcroft St y estaciónate en el lote, justo enfrente de las tiendas.",
      ],
      [
        "Busca la Suite C",
        "Nuestra fachada de vidrio tiene los pósters de las compañías en las ventanas. Entra directo; el mostrador está a la entrada.",
      ],
    ],
    plazaAlt: "El centro comercial de 3640 Hillcroft St visto desde el estacionamiento",
    storefrontAlt: "Fachada de TIC Wireless en la Suite C, vista desde la banqueta",
    plazaCaption: "El centro comercial desde el estacionamiento",
    storefrontCaption: "Nuestra puerta: Suite C",
    openMaps: "Abrir en Google Maps",
  },
  drive: {
    kicker: "Tiempo en carro",
    title: "A minutos de tu colonia.",
    body: "Distancia y tiempo sin tráfico desde el centro de cada zona. Toca una zona para ver cómo llegar y más detalles.",
    area: "Desde",
    distance: "Distancia",
    time: "En carro",
    route: "Ruta",
    mi: (n: number) => `${n.toFixed(1)} mi`,
    min: (n: number) => `${n} min`,
    all: "Todas las zonas que atendemos",
  },
  map: {
    title: "Mapa de TIC Wireless Electronic & Repair Center en 3640 Hillcroft St, Suite C, Houston",
    load: "Mostrar el mapa",
    note: "Carga Google Maps",
  },
  inside: {
    kicker: "Dentro de la tienda",
    title: "Echa un vistazo.",
    body: "Un mostrador para celulares, planes, reparaciones y pagos, una pared llena de fundas y vitrinas con audífonos, bocinas, relojes, laptops y consolas.",
    photos: [
      ["counter", "El mostrador, donde atendemos ventas, planes, reparaciones y pagos"],
      ["caseWall", "La pared de fundas: iPhone y Samsung Galaxy, OtterBox y ZIZO"],
      ["apple", "MacBook, iPad y Galaxy Buds en la vitrina"],
      ["jbl", "Bocinas JBL, relojes inteligentes y cargadores"],
      ["laptops", "Laptops y tabletas disponibles a pagos"],
      ["consoles", "PlayStation 5, Nintendo Switch 2 y planes prepagados"],
      ["phones", "iPhone y Samsung Galaxy en la vitrina"],
    ],
    video: "Un recorrido por el mostrador y las paredes de accesorios de la tienda",
  },
  offer: {
    kicker: "En esta tienda",
    title: "Todo lo que puedes hacer aquí.",
    leasing: "Consolas, laptops y celulares a pagos",
    leasingBody:
      "PS5, Xbox, Switch 2, MacBook y más, sin necesidad de crédito. Sujeto a aprobación.",
    more: "Ver más",
  },
  bring: {
    kicker: "Antes de venir",
    title: "Qué traer.",
    items: [
      [
        "Arrendamiento de celular, consola o laptop",
        "Una identificación con foto vigente. La solicitud toma unos minutos en el mostrador.",
      ],
      [
        "Una reparación",
        "Tu celular y su código, para probarlo después. Si puedes, haz un respaldo antes.",
      ],
      [
        "Cambiarte de compañía con tu número",
        "Tu número de cuenta y el PIN de transferencia. Mantén la línea activa hasta terminar el cambio.",
      ],
      ["Liberación", "Solo el celular: primero revisamos si está bloqueado."],
      [
        "Vender o intercambiar",
        "El celular, su cargador si lo tienes y tu código. Cierra sesión de iCloud o Google antes.",
      ],
      [
        "Pagos y recargas",
        "El número que vas a pagar o recargar (con la clave del país si es internacional).",
      ],
    ],
  },
  moved: {
    title: "Nos mudamos: mismo equipo, mismo número.",
    body: "TIC Wireless se mudó de 3838 Hillcroft St, Suite 100 a una tienda más grande en 3640 Hillcroft St, Suite C. Algunas apps de mapas todavía muestran la dirección anterior; la correcta es 3640 Hillcroft St, Suite C, Houston, TX 77057.",
  },
  reviews: {
    rating: "4.7 en Google",
    count: "con más de 400 reseñas",
    cta: "Ver reseñas",
  },
  faqTitle: "Preguntas sobre la tienda",
  faqs: [
    {
      q: "¿Dónde está TIC Wireless en Hillcroft?",
      a: "En 3640 Hillcroft St, Suite C, Houston, TX 77057, en el centro comercial de Hillcroft Avenue cerca de Windswept Lane, justo al norte del Westpark Tollway.",
    },
    {
      q: "¿Cuál es el horario?",
      a: "De lunes a sábado de 9:00 AM a 8:00 PM y el domingo de 9:00 AM a 5:00 PM. En días festivos puede cambiar; llama al (713) 339-9300 para confirmar.",
    },
    {
      q: "¿Hay estacionamiento?",
      a: "Sí. Estaciónate en el lote del centro comercial, justo enfrente de la tienda. La entrada y el estacionamiento son accesibles para silla de ruedas.",
    },
    {
      q: "¿Necesito cita?",
      a: "No. Ven cuando quieras en horario de tienda, para celulares, planes, pagos y reparaciones.",
    },
    {
      q: "¿TIC Wireless se cambió de lugar?",
      a: "Sí. Nos mudamos de 3838 Hillcroft St, Suite 100 a 3640 Hillcroft St, Suite C. Mismo equipo y mismo teléfono, (713) 339-9300.",
    },
    {
      q: "¿Hablan inglés?",
      a: "Sí. Nuestro equipo atiende en español e inglés, en la tienda y por teléfono.",
    },
  ],
  cta: {
    title: "Te esperamos en Hillcroft.",
    body: "¿Dudas antes de venir? Llámanos: revisamos existencias, cotizamos una reparación o te apartamos algo.",
  },
};

export const LOCATION_COPY: Record<Lang, LocationCopy> = { en, es };

const ES_DIRECTIONS: [RegExp, string][] = [
  [/ north$/, " (norte)"],
  [/ south$/, " (sur)"],
  [/ east$/, " (este)"],
  [/ west$/, " (oeste)"],
  [/ frontage road/, " (carril lateral)"],
];

/** Area route steps in the page's language (street names stay as they are on the signs). */
export const routeStep = (step: string, lang: Lang) =>
  lang === "en" ? step : ES_DIRECTIONS.reduce((s, [re, to]) => s.replace(re, to), step);
