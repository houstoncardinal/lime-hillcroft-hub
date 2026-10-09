import { PHONE, STREET } from "@/components/site/business";

// All visible text on the financing landing page, in English and Spanish. Keep both in sync.
const en = {
  meta: {
    title: "PS5, Xbox & Laptop Financing, No Credit Needed | TIC Wireless",
    description:
      "PS5, Xbox, Switch 2, MacBook, laptop & phone financing in Houston. Lease-to-own, no credit needed, from $40 down. TIC Wireless, 3640 Hillcroft St.",
    imageAlt: "PlayStation 5 and Nintendo Switch 2 on display at TIC Wireless Houston",
    breadcrumb: ["Home", "Financing"],
  },
  hero: {
    kicker: "Financing & lease-to-own · Houston",
    title: ["Play now.", "Pay over time."],
    body: [
      "Take home a PlayStation 5, Xbox, Nintendo Switch 2, MacBook, laptop, iPad or the latest phone today — ",
      "no credit needed",
      ", starting at ",
      "$40 down",
      ".",
    ],
    call: "Check your options",
    visit: "Visit the store",
    chips: ["No credit needed", "From $40 down", "Take it home today", "Se habla español"],
    mainAlt:
      "PlayStation 5 Slim and Nintendo Switch 2 on display at TIC Wireless next to a lease-to-own, no credit needed sign",
    mainCaption: "PS5 & Switch 2 — in store now",
    tiles: [
      ["MacBook Air and iPads in a display case", "MacBook & iPad"],
      ["Boxed iPhone 17 Pro phones", "iPhone 17 Pro"],
    ],
    cardLabel: "Lease-to-own",
    cardUnit: "to start",
    cardNote: "No credit needed.",
  },
  ticker: [
    "PlayStation 5",
    "Xbox Series X & S",
    "Nintendo Switch 2",
    "MacBook Air",
    "Windows laptops",
    "iPad & iPad Pro",
    "iPhone 17 Pro",
    "Galaxy S series",
    "AirPods Max",
    "Smartwatches",
    "JBL speakers",
  ],
  categories: {
    kicker: "What you can take home",
    title: "Not just phones. Almost anything we sell.",
    intro:
      "Consoles for the kids, a laptop for school or work, a new phone for you — one simple plan at one counter.",
    items: [
      {
        title: "Game consoles",
        items: [
          "PlayStation 5",
          "Xbox Series X & S",
          "Nintendo Switch 2",
          "Controllers & headsets",
        ],
        alt: "PlayStation 5 Slim and Nintendo Switch 2 boxes on display at TIC Wireless",
      },
      {
        title: "Laptops & tablets",
        items: ["MacBook Air", "Windows laptops", "iPad, iPad Pro & iPad mini", "Galaxy Tab"],
        alt: "MacBook Air, iPad Pro, iPad and iPad mini boxes in a TIC Wireless display case",
      },
      {
        title: "Phones",
        items: ["iPhone 17 Pro", "Samsung Galaxy", "Unlocked Android", "Any carrier"],
        alt: "Boxed iPhone 17 Pro phones with a TIC Wireless business card",
      },
      {
        title: "Audio & wearables",
        items: ["AirPods & AirPods Max", "Galaxy Buds", "JBL speakers", "Smartwatches"],
        alt: "JBL speakers, smartwatches and chargers in a display case",
      },
    ],
    stock: ["Stock changes often — call", "to check availability on a specific model."],
  },
  steps: {
    kicker: "How it works",
    title: "From the counter to your couch in four steps.",
    items: [
      ["Pick it out", "Come see it in store, or call ahead and we'll check what's in stock."],
      [
        "Apply in minutes",
        "A quick application at the counter. Bring a valid photo ID — we'll tell you if anything else is needed.",
      ],
      [
        "Pay a little to start",
        "Options starting at $40 down, depending on the item and the plan you're approved for.",
      ],
      [
        "Take it home today",
        "Walk out with your console, laptop or phone and make regular payments over time.",
      ],
    ],
  },
  perks: {
    kicker: "Why TIC",
    title: "Bad credit? No problem.",
    body: "Big-box stores say no. We find a way to get you the console, laptop or phone you need.",
    quote: "Arrendamiento con opción a compra — sin necesidad de crédito.",
    items: [
      [
        "No credit needed",
        "Lease-to-own options don't require perfect credit. Bad credit? No problem.",
      ],
      ["From $40 down", "Start with a small amount instead of paying the full price on day one."],
      [
        "Predictable payments",
        "Regular payments on a set schedule. Ask us about early-payoff options.",
      ],
      [
        "Real store, real people",
        "Sign up face to face on Hillcroft — in English or Spanish — not on a faceless website.",
      ],
    ],
  },
  faq: {
    kicker: "Questions",
    title: "Financing, explained.",
    items: [
      {
        q: "Can I get a PS5 or Xbox with bad credit?",
        a: "Yes. We offer lease-to-own options where no credit is needed, so bad credit isn't a deal-breaker. Approval isn't guaranteed, but it takes just a few minutes in store to find out.",
      },
      {
        q: "Can I finance a laptop or MacBook with no credit?",
        a: "Yes. Lease-to-own works on laptops, MacBooks and iPads as well as phones and consoles. Stop by or call and we'll check what's in stock.",
      },
      {
        q: "What's the difference between financing and lease-to-own?",
        a: "Financing is a loan you pay back over time. Lease-to-own means you lease the item and make regular payments; once the plan is complete — or you buy it out early — it's yours. Lease-to-own isn't a loan, and the total cost to own can be more than the cash price. We'll walk you through the exact terms before you sign.",
      },
      {
        q: "How much do I pay upfront?",
        a: "Options start at $40 down. The exact amount depends on the item you choose and the plan you're approved for.",
      },
      {
        q: "Can I pay it off early?",
        a: "Ask us about early-payoff options when you apply — paying it off sooner can lower your total cost.",
      },
      {
        q: "Do you have the console or laptop I want in stock?",
        a: `Stock changes often. Call ${PHONE} and we'll check for you, or ask us to set one aside.`,
      },
      {
        q: "¿Puedo aplicar en español?",
        a: "¡Claro! Arrendamiento con opción a compra, sin necesidad de crédito. Te explicamos todo en español.",
      },
    ],
  },
  cta: {
    title: "Ready to take it home?",
    body: `Stop by ${STREET} or call — we'll check stock and walk you through your options in minutes.`,
    directions: "Get directions",
  },
  disclaimer:
    "Financing and lease-to-own options are provided by third-party partners and are subject to approval; not all applicants are approved. Lease-to-own is not a loan or credit, and the total cost to own may be more than the retail price. Down payment, payment amounts and terms vary by item and plan. Ask in store for full details before signing.",
};

export type FinancingCopy = typeof en;

const es: FinancingCopy = {
  meta: {
    title: "PS5, Xbox y Laptops a Pagos Sin Crédito | TIC Wireless Houston",
    description:
      "PS5, Xbox, Switch 2, MacBook, laptops y celulares a pagos en Houston. Sin necesidad de crédito, desde $40 de enganche. TIC Wireless, 3640 Hillcroft St.",
    imageAlt: "PlayStation 5 y Nintendo Switch 2 en exhibición en TIC Wireless Houston",
    breadcrumb: ["Inicio", "Financiamiento"],
  },
  hero: {
    kicker: "A pagos con opción a compra · Houston",
    title: ["Juega hoy.", "Paga poco a poco."],
    body: [
      "Llévate hoy un PlayStation 5, Xbox, Nintendo Switch 2, MacBook, laptop, iPad o el celular más nuevo — ",
      "sin necesidad de crédito",
      ", desde ",
      "$40 de enganche",
      ".",
    ],
    call: "Consulta tus opciones",
    visit: "Visita la tienda",
    chips: [
      "Sin necesidad de crédito",
      "Desde $40 de enganche",
      "Llévatelo hoy",
      "We speak English",
    ],
    mainAlt:
      "PlayStation 5 Slim y Nintendo Switch 2 en exhibición en TIC Wireless junto a un letrero de arrendamiento sin necesidad de crédito",
    mainCaption: "PS5 y Switch 2 — ya en tienda",
    tiles: [
      ["MacBook Air y iPad en una vitrina", "MacBook y iPad"],
      ["Cajas de iPhone 17 Pro", "iPhone 17 Pro"],
    ],
    cardLabel: "Opción a compra",
    cardUnit: "para empezar",
    cardNote: "Sin necesidad de crédito.",
  },
  ticker: [
    "PlayStation 5",
    "Xbox Series X y S",
    "Nintendo Switch 2",
    "MacBook Air",
    "Laptops Windows",
    "iPad y iPad Pro",
    "iPhone 17 Pro",
    "Galaxy serie S",
    "AirPods Max",
    "Relojes inteligentes",
    "Bocinas JBL",
  ],
  categories: {
    kicker: "Lo que te puedes llevar",
    title: "No solo celulares. Casi todo lo que vendemos.",
    intro:
      "Una consola para los niños, una laptop para la escuela o el trabajo, un celular nuevo para ti — un solo plan, en un solo mostrador.",
    items: [
      {
        title: "Consolas de videojuegos",
        items: ["PlayStation 5", "Xbox Series X y S", "Nintendo Switch 2", "Controles y audífonos"],
        alt: "Cajas de PlayStation 5 Slim y Nintendo Switch 2 en exhibición en TIC Wireless",
      },
      {
        title: "Laptops y tabletas",
        items: ["MacBook Air", "Laptops Windows", "iPad, iPad Pro y iPad mini", "Galaxy Tab"],
        alt: "Cajas de MacBook Air, iPad Pro, iPad y iPad mini en una vitrina de TIC Wireless",
      },
      {
        title: "Celulares",
        items: ["iPhone 17 Pro", "Samsung Galaxy", "Android desbloqueado", "Cualquier compañía"],
        alt: "Cajas de iPhone 17 Pro con una tarjeta de presentación de TIC Wireless",
      },
      {
        title: "Audio y relojes",
        items: ["AirPods y AirPods Max", "Galaxy Buds", "Bocinas JBL", "Relojes inteligentes"],
        alt: "Bocinas JBL, relojes inteligentes y cargadores en una vitrina",
      },
    ],
    stock: [
      "El inventario cambia seguido — llama al",
      "para confirmar si tenemos el modelo que buscas.",
    ],
  },
  steps: {
    kicker: "Cómo funciona",
    title: "Del mostrador a tu casa en cuatro pasos.",
    items: [
      [
        "Escoge tu equipo",
        "Ven a verlo a la tienda, o llámanos y revisamos qué tenemos disponible.",
      ],
      [
        "Aplica en minutos",
        "Una solicitud rápida en el mostrador. Trae una identificación oficial con foto — te avisamos si se necesita algo más.",
      ],
      [
        "Da un enganche pequeño",
        "Opciones desde $40 de enganche, según el equipo y el plan que te aprueben.",
      ],
      [
        "Llévatelo hoy",
        "Sal con tu consola, laptop o celular y haz pagos regulares con el tiempo.",
      ],
    ],
  },
  perks: {
    kicker: "¿Por qué TIC?",
    title: "¿Mal crédito? No hay problema.",
    body: "Las tiendas grandes dicen que no. Nosotros buscamos la forma de que te lleves la consola, laptop o celular que necesitas.",
    quote: "Lease-to-own — no credit needed.",
    items: [
      [
        "Sin necesidad de crédito",
        "Las opciones de arrendamiento no requieren crédito perfecto. ¿Mal crédito? No hay problema.",
      ],
      [
        "Desde $40 de enganche",
        "Empieza con poco en lugar de pagar el precio completo el primer día.",
      ],
      [
        "Pagos fijos",
        "Pagos regulares en fechas fijas. Pregúntanos por las opciones de liquidación anticipada.",
      ],
      [
        "Tienda real, gente real",
        "Aplica en persona en Hillcroft — en español o en inglés — no en una página sin rostro.",
      ],
    ],
  },
  faq: {
    kicker: "Preguntas",
    title: "El financiamiento, explicado.",
    items: [
      {
        q: "¿Puedo sacar un PS5 o Xbox a pagos con mal crédito?",
        a: "Sí. Tenemos opciones de arrendamiento con opción a compra sin necesidad de crédito, así que el mal crédito no es impedimento. La aprobación no está garantizada, pero en unos minutos en la tienda sabes si calificas.",
      },
      {
        q: "¿Puedo sacar una laptop o MacBook a pagos sin crédito?",
        a: "Sí. El arrendamiento con opción a compra aplica a laptops, MacBook y iPad además de celulares y consolas. Ven o llámanos y revisamos qué tenemos disponible.",
      },
      {
        q: "¿Cuál es la diferencia entre financiamiento y arrendamiento con opción a compra?",
        a: "El financiamiento es un préstamo que pagas con el tiempo. En el arrendamiento con opción a compra rentas el equipo y haces pagos regulares; al terminar el plan — o si lo liquidas antes — es tuyo. No es un préstamo, y el costo total puede ser mayor que el precio de contado. Te explicamos los términos exactos antes de firmar.",
      },
      {
        q: "¿Cuánto doy de enganche?",
        a: "Las opciones empiezan desde $40 de enganche. La cantidad exacta depende del equipo y del plan que te aprueben.",
      },
      {
        q: "¿Puedo liquidarlo antes?",
        a: "Pregúntanos por las opciones de liquidación anticipada al aplicar — pagarlo antes puede bajar tu costo total.",
      },
      {
        q: "¿Tienen la consola o laptop que busco?",
        a: `El inventario cambia seguido. Llama al ${PHONE} y lo revisamos, o pídenos que te lo apartemos.`,
      },
      {
        q: "Can I apply in English?",
        a: "Of course. Our team walks you through every option in English or Spanish.",
      },
    ],
  },
  cta: {
    title: "¿Listo para llevártelo?",
    body: `Ven al ${STREET} o llámanos — revisamos el inventario y te explicamos tus opciones en minutos.`,
    directions: "Cómo llegar",
  },
  disclaimer:
    "El financiamiento y el arrendamiento con opción a compra son ofrecidos por compañías asociadas y están sujetos a aprobación; no todos los solicitantes son aprobados. El arrendamiento con opción a compra no es un préstamo ni crédito, y el costo total puede ser mayor que el precio de contado. El enganche, los pagos y los términos varían según el equipo y el plan. Pide todos los detalles en la tienda antes de firmar.",
};

export const FINANCING_COPY = { en, es };
