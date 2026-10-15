import { PHONE, STREET } from "@/components/site/business";

// All visible text on the leasing landing page, in English and Spanish. Keep both in sync.
const en = {
  meta: {
    title: "Lease-to-Own Phones, PS5 & Laptops in Houston — No Credit Needed",
    description:
      "Lease-to-own iPhones, Samsung Galaxy phones, PS5, Xbox, MacBook & laptops in Houston. No credit needed, from $40 down, subject to approval. On Hillcroft.",
    imageAlt:
      "PlayStation 5 and Nintendo Switch 2 on display at TIC Wireless Electronic & Repair Center Houston",
    breadcrumb: ["Home", "Leasing"],
  },
  hero: {
    kicker: "Leasing · lease-to-own · Houston",
    // The H1 (keyword line); the slogan is shown under it, outside the H1.
    title: ["Lease-to-own phones, PS5 & laptops", "— no credit needed."],
    slogan: "Take it home today. Pay over time.",
    body: [
      "Take home an iPhone or Samsung Galaxy phone, a PlayStation 5, Xbox, Nintendo Switch 2, MacBook, laptop or iPad today — ",
      "no credit needed",
      ", starting at ",
      "$40 down",
      ", subject to approval.",
    ],
    call: "Check your options",
    visit: "Visit the store",
    chips: ["No credit needed", "From $40 down", "Take it home today", "Se habla español"],
    mainAlt:
      "PlayStation 5 Slim and Nintendo Switch 2 on display at TIC Wireless Electronic & Repair Center next to a lease-to-own, no credit needed sign",
    mainCaption: "PS5 & Switch 2 — in store now",
    tiles: [
      ["MacBook Air and iPads in a display case", "MacBook & iPad"],
      ["iPhone 18 Pro Max at TIC Wireless", "iPhone 18 Pro Max"],
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
    "iPhone 18 Pro Max",
    "Galaxy S series",
    "AirPods Max",
    "Smartwatches",
    "JBL speakers",
  ],
  categories: {
    kicker: "What you can take home",
    title: "Not just phones. Almost anything we sell.",
    intro:
      "A new phone for you, a console for the kids, a laptop for school or work — one simple plan at one counter.",
    items: [
      {
        title: "Phones",
        items: ["iPhone 18 Pro Max", "iPhone 17 Pro", "Samsung Galaxy", "Unlocked Android"],
        alt: "Boxed iPhone 17 Pro phones with a TIC Wireless Electronic & Repair Center business card",
      },
      {
        title: "Game consoles",
        items: [
          "PlayStation 5",
          "Xbox Series X & S",
          "Nintendo Switch 2",
          "Controllers & headsets",
        ],
        alt: "PlayStation 5 Slim and Nintendo Switch 2 boxes on display at TIC Wireless Electronic & Repair Center",
      },
      {
        title: "Laptops & tablets",
        items: [
          "MacBook Air & MacBook Neo",
          "iPad, iPad Pro & iPad mini",
          "Galaxy Tab S10 FE+ & A9+",
          "Windows laptops",
        ],
        alt: "MacBook Air, iPad Pro, iPad and iPad mini boxes in a TIC Wireless Electronic & Repair Center display case",
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
    title: "Bad credit? You can still apply.",
    body: "No credit is needed for our lease-to-own options, so bad credit isn't automatically a deal-breaker. Approval isn't guaranteed — it takes a few minutes at the counter to find out.",
    quote: "Arrendamiento con opción a compra — sin necesidad de crédito.",
    items: [
      [
        "No credit needed",
        "No credit history is needed to apply, and bad credit is OK. Subject to approval.",
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
    title: "Leasing, explained.",
    items: [
      {
        q: "Can I get an iPhone or Samsung phone with bad credit?",
        a: "Yes, you can apply. Lease-to-own on unlocked iPhones and Samsung Galaxy phones needs no credit, from $40 down, so bad credit isn't automatically a deal-breaker. Approval isn't guaranteed; bring a valid photo ID and it takes a few minutes in store to find out.",
      },
      {
        q: "Can I get a PS5 or Xbox with bad credit?",
        a: "Yes. We offer lease-to-own options where no credit is needed, so bad credit isn't a deal-breaker. Approval isn't guaranteed, but it takes just a few minutes in store to find out.",
      },
      {
        q: "Can I lease a laptop or MacBook with no credit?",
        a: "Yes. Lease-to-own works on laptops, MacBooks and iPads as well as phones and consoles. Stop by or call and we'll check what's in stock.",
      },
      {
        q: "What's the difference between leasing and a loan?",
        a: "A loan is money you borrow and pay back over time. Lease-to-own works differently: you lease the item and make regular payments; once the plan is complete — or you buy it out early — it's yours. Lease-to-own isn't a loan, and the total cost to own is more than the cash price. We'll walk you through the exact terms before you sign.",
      },
      {
        q: "How much do I pay upfront?",
        a: "Options start at $40 down. The exact amount depends on the item you choose and the plan you're approved for.",
      },
      {
        q: "Can I pay it off early?",
        a: "Ask us about early-payoff options when you apply — we'll explain how they work for your plan before you sign.",
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
    "Leasing (lease-to-own) options are provided by third-party partners and are subject to approval; not all applicants are approved. Lease-to-own is not a loan or credit, and the total cost to own is more than the cash price. Down payment, payment amounts and terms vary by item and plan. Ask in store for full details before signing.",
};

export type LeasingCopy = typeof en;

const es: LeasingCopy = {
  meta: {
    title: "Celulares, PS5 y Laptops a Pagos en Houston — Sin Crédito",
    description:
      "iPhone, Samsung Galaxy, PS5, Xbox, MacBook y laptops a pagos en Houston. Sin necesidad de crédito, desde $40 de enganche, sujeto a aprobación. En Hillcroft.",
    imageAlt:
      "PlayStation 5 y Nintendo Switch 2 en exhibición en TIC Wireless Electronic & Repair Center Houston",
    breadcrumb: ["Inicio", "Arrendamiento"],
  },
  hero: {
    kicker: "A pagos con opción a compra · Houston",
    title: ["Celulares, PS5 y laptops a pagos", "— sin necesidad de crédito."],
    slogan: "Llévatelo hoy. Paga poco a poco.",
    body: [
      "Llévate hoy un iPhone o Samsung Galaxy, un PlayStation 5, Xbox, Nintendo Switch 2, MacBook, laptop o iPad — ",
      "sin necesidad de crédito",
      ", desde ",
      "$40 de enganche",
      ", sujeto a aprobación.",
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
      "PlayStation 5 Slim y Nintendo Switch 2 en exhibición en TIC Wireless Electronic & Repair Center junto a un letrero de arrendamiento sin necesidad de crédito",
    mainCaption: "PS5 y Switch 2 — ya en tienda",
    tiles: [
      ["MacBook Air y iPad en una vitrina", "MacBook y iPad"],
      ["iPhone 18 Pro Max en TIC Wireless", "iPhone 18 Pro Max"],
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
    "iPhone 18 Pro Max",
    "Galaxy serie S",
    "AirPods Max",
    "Relojes inteligentes",
    "Bocinas JBL",
  ],
  categories: {
    kicker: "Lo que te puedes llevar",
    title: "No solo celulares. Casi todo lo que vendemos.",
    intro:
      "Un celular nuevo para ti, una consola para los niños, una laptop para la escuela o el trabajo — un solo plan, en un solo mostrador.",
    items: [
      {
        title: "Celulares",
        items: ["iPhone 18 Pro Max", "iPhone 17 Pro", "Samsung Galaxy", "Android desbloqueado"],
        alt: "Cajas de iPhone 17 Pro con una tarjeta de presentación de TIC Wireless Electronic & Repair Center",
      },
      {
        title: "Consolas de videojuegos",
        items: ["PlayStation 5", "Xbox Series X y S", "Nintendo Switch 2", "Controles y audífonos"],
        alt: "Cajas de PlayStation 5 Slim y Nintendo Switch 2 en exhibición en TIC Wireless Electronic & Repair Center",
      },
      {
        title: "Laptops y tabletas",
        items: [
          "MacBook Air y MacBook Neo",
          "iPad, iPad Pro y iPad mini",
          "Galaxy Tab S10 FE+ y A9+",
          "Laptops Windows",
        ],
        alt: "Cajas de MacBook Air, iPad Pro, iPad y iPad mini en una vitrina de TIC Wireless Electronic & Repair Center",
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
    title: "¿Mal crédito? Igual puedes aplicar.",
    body: "Nuestras opciones de arrendamiento con opción a compra no necesitan crédito, así que el mal crédito no es impedimento automático. La aprobación no está garantizada: en unos minutos en el mostrador sabes si calificas.",
    quote: "Lease-to-own — no credit needed.",
    items: [
      [
        "Sin necesidad de crédito",
        "No necesitas historial de crédito para aplicar, y el mal crédito está bien. Sujeto a aprobación.",
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
    title: "El arrendamiento, explicado.",
    items: [
      {
        q: "¿Puedo sacar un iPhone o Samsung a pagos con mal crédito?",
        a: "Sí, puedes aplicar. El arrendamiento con opción a compra en iPhone y Samsung Galaxy desbloqueados no necesita crédito y empieza desde $40 de enganche, así que el mal crédito no es impedimento automático. La aprobación no está garantizada; trae una identificación con foto y en unos minutos en la tienda sabes si calificas.",
      },
      {
        q: "¿Puedo sacar un PS5 o Xbox a pagos con mal crédito?",
        a: "Sí. Tenemos opciones de arrendamiento con opción a compra sin necesidad de crédito, así que el mal crédito no es impedimento. La aprobación no está garantizada, pero en unos minutos en la tienda sabes si calificas.",
      },
      {
        q: "¿Puedo sacar una laptop o MacBook a pagos sin crédito?",
        a: "Sí. El arrendamiento con opción a compra aplica a laptops, MacBook y iPad además de celulares y consolas. Ven o llámanos y revisamos qué tenemos disponible.",
      },
      {
        q: "¿Cuál es la diferencia entre el arrendamiento y un préstamo?",
        a: "Un préstamo es dinero que pides y pagas con el tiempo. El arrendamiento con opción a compra funciona distinto: rentas el equipo y haces pagos regulares; al terminar el plan — o si lo liquidas antes — es tuyo. No es un préstamo, y el costo total es mayor que el precio de contado. Te explicamos los términos exactos antes de firmar.",
      },
      {
        q: "¿Cuánto doy de enganche?",
        a: "Las opciones empiezan desde $40 de enganche. La cantidad exacta depende del equipo y del plan que te aprueben.",
      },
      {
        q: "¿Puedo liquidarlo antes?",
        a: "Pregúntanos por las opciones de liquidación anticipada al aplicar; te explicamos cómo funcionan en tu plan antes de firmar.",
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
    "El arrendamiento con opción a compra es ofrecido por compañías asociadas y está sujeto a aprobación; no todos los solicitantes son aprobados. El arrendamiento con opción a compra no es un préstamo ni crédito, y el costo total es mayor que el precio de contado. El enganche, los pagos y los términos varían según el equipo y el plan. Pide todos los detalles en la tienda antes de firmar.",
};

export const LEASING_COPY = { en, es };
