import { PHONE, STREET } from "@/components/site/business";

// All visible text on the leasing landing page, in English and Spanish. Keep both in sync.
const en = {
  meta: {
    title: "Lease-to-Own Phones, PS5 & Laptops in Houston — all credit welcome",
    description:
      "Lease-to-own iPhones, Samsung Galaxy phones, PS5, Xbox, MacBook & laptops in Houston. all credit welcome, terms set by your provider, subject to approval. On Hillcroft.",
    imageAlt:
      "PlayStation 5 and Nintendo Switch 2 on display at TIC Wireless Electronic & Repair Center Houston",
    breadcrumb: ["Home", "Leasing"],
  },
  hero: {
    kicker: "Leasing · lease-to-own · Houston",
    // The H1 (keyword line); the slogan is shown under it, outside the H1.
    title: ["Lease-to-own phones, PS5 & laptops", "— all credit welcome."],
    slogan: "Take it home today. Pay over time.",
    body: [
      "Take home an iPhone or Samsung Galaxy phone, a PlayStation 5, Xbox, Nintendo Switch 2, MacBook, laptop or iPad today — ",
      "all credit welcome",
      ", starting at ",
      "terms set by your provider",
      ", subject to approval.",
    ],
    call: "Check your options",
    visit: "Visit the store",
    chips: ["all credit welcome", "terms set by your provider", "Take it home today", "Se habla español"],
    mainAlt:
      "PlayStation 5 Slim and Nintendo Switch 2 on display at TIC Wireless Electronic & Repair Center next to a lease-to-own, all credit welcome sign",
    mainCaption: "PS5 & Switch 2 — in store now",
    tiles: [
      ["MacBook Air and iPads in a display case", "MacBook & iPad"],
      ["iPhone 18 Pro Max at TIC Wireless", "iPhone 18 Pro Max"],
    ],
    cardLabel: "Lease-to-own",
    cardUnit: "to start",
    cardNote: "all credit welcome.",
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
        alt: "iPhone 17 Pro, iPhone 18 Pro Max, Galaxy S26 Ultra and Galaxy Z Fold7, official Apple and Samsung images",
      },
      {
        title: "Game consoles",
        items: [
          "PlayStation 5",
          "Xbox Series X & S",
          "Nintendo Switch 2",
          "Controllers & headsets",
        ],
        alt: "PlayStation 5, Xbox Series X and Nintendo Switch 2, official product images",
      },
      {
        title: "Laptops & tablets",
        items: [
          "MacBook Air & MacBook Neo",
          "iPad, iPad Pro & iPad mini",
          "Galaxy Tab S10 FE+ & A9+",
          "Windows laptops",
        ],
        alt: "MacBook Air, iPad Pro and iPad mini, official Apple images",
      },
      {
        title: "Audio & wearables",
        items: ["AirPods & AirPods Max", "Galaxy Buds", "JBL speakers", "Smartwatches"],
        alt: "AirPods Max, Apple Watch and AirPods Pro, official Apple images",
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
        "terms set by your provider, depending on the item and the plan you're approved for.",
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
    body: "All Credit Welcome for our lease-to-own options, so bad credit isn't automatically a deal-breaker. Approval isn't guaranteed — it takes a few minutes at the counter to find out.",
    quote: "Arrendamiento con opción a compra — Todo crédito es bienvenido.",
    items: [
      [
        "all credit welcome",
        "All Credit Welcome, and bad credit is OK. Subject to approval.",
      ],
      ["terms set by your provider", "Start with a small amount instead of paying the full price on day one."],
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
        a: "Yes, you can apply. Lease-to-own on unlocked iPhones and Samsung Galaxy phones welcomes all credit, terms set by your provider, so bad credit isn't automatically a deal-breaker. Approval isn't guaranteed; bring a valid photo ID and it takes a few minutes in store to find out.",
      },
      {
        q: "Can I get a PS5 or Xbox with bad credit?",
        a: "Yes. We offer lease-to-own options where All Credit Welcome, so bad credit isn't a deal-breaker. Approval isn't guaranteed, but it takes just a few minutes in store to find out.",
      },
      {
        q: "Can I lease a laptop or MacBook with all credit welcome?",
        a: "Yes. Lease-to-own works on laptops, MacBooks and iPads as well as phones and consoles. Stop by or call and we'll check what's in stock.",
      },
      {
        q: "What's the difference between leasing and a loan?",
        a: "A loan is money you borrow and pay back over time. Lease-to-own works differently: you lease the item and make regular payments; once the plan is complete — or you buy it out early — it's yours. Lease-to-own isn't a loan, and the total cost to own is more than the cash price. We'll walk you through the exact terms before you sign.",
      },
      {
        q: "How much do I pay upfront?",
        a: "terms set by your provider. The exact amount depends on the item you choose and the plan you're approved for.",
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
        a: "¡Claro! Arrendamiento con opción a compra, Todo crédito es bienvenido. Te explicamos todo en español.",
      },
    ],
  },
  cta: {
    title: "Ready to take it home?",
    body: `Stop by ${STREET} or call — we'll check stock and walk you through your options in minutes.`,
    directions: "Get directions",
  },
  disclaimer:
    "Leasing (lease-to-own) options are provided by third-party partners and are subject to approval; not all applicants are approved. Lease-to-own is not a loan or credit, and the total cost to own is more than the cash price. Initial payment, payment amounts and terms vary by item and plan. Ask in store for full details before signing.",
};

export type LeasingCopy = typeof en;

const es: LeasingCopy = {
  meta: {
    title: "Celulares, PS5 y Laptops a Pagos en Houston — Todo crédito es bienvenido",
    description:
      "iPhone, Samsung Galaxy, PS5, Xbox, MacBook y laptops a pagos en Houston. Todo crédito es bienvenido, términos definidos por el proveedor, sujeto a aprobación. En Hillcroft.",
    imageAlt:
      "PlayStation 5 y Nintendo Switch 2 en exhibición en TIC Wireless Electronic & Repair Center Houston",
    breadcrumb: ["Inicio", "Arrendamiento"],
  },
  hero: {
    kicker: "A pagos con opción a compra · Houston",
    title: ["Celulares, PS5 y laptops a pagos", "— Todo crédito es bienvenido."],
    slogan: "Llévatelo hoy. Paga poco a poco.",
    body: [
      "Llévate hoy un iPhone o Samsung Galaxy, un PlayStation 5, Xbox, Nintendo Switch 2, MacBook, laptop o iPad — ",
      "Todo crédito es bienvenido",
      ", desde ",
      "términos definidos por el proveedor",
      ", sujeto a aprobación.",
    ],
    call: "Consulta tus opciones",
    visit: "Visita la tienda",
    chips: [
      "Todo crédito es bienvenido",
      "términos definidos por el proveedor",
      "Llévatelo hoy",
      "We speak English",
    ],
    mainAlt:
      "PlayStation 5 Slim y Nintendo Switch 2 en exhibición en TIC Wireless Electronic & Repair Center junto a un letrero de arrendamiento Todo crédito es bienvenido",
    mainCaption: "PS5 y Switch 2 — ya en tienda",
    tiles: [
      ["MacBook Air y iPad en una vitrina", "MacBook y iPad"],
      ["iPhone 18 Pro Max en TIC Wireless", "iPhone 18 Pro Max"],
    ],
    cardLabel: "Opción a compra",
    cardUnit: "para empezar",
    cardNote: "Todo crédito es bienvenido.",
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
        alt: "iPhone 17 Pro, iPhone 18 Pro Max, Galaxy S26 Ultra y Galaxy Z Fold7, imágenes oficiales de Apple y Samsung",
      },
      {
        title: "Consolas de videojuegos",
        items: ["PlayStation 5", "Xbox Series X y S", "Nintendo Switch 2", "Controles y audífonos"],
        alt: "PlayStation 5, Xbox Series X y Nintendo Switch 2, imágenes oficiales",
      },
      {
        title: "Laptops y tabletas",
        items: [
          "MacBook Air y MacBook Neo",
          "iPad, iPad Pro y iPad mini",
          "Galaxy Tab S10 FE+ y A9+",
          "Laptops Windows",
        ],
        alt: "MacBook Air, iPad Pro y iPad mini, imágenes oficiales de Apple",
      },
      {
        title: "Audio y relojes",
        items: ["AirPods y AirPods Max", "Galaxy Buds", "Bocinas JBL", "Relojes inteligentes"],
        alt: "AirPods Max, Apple Watch y AirPods Pro, imágenes oficiales de Apple",
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
        "Da un pago inicial pequeño",
        "Opciones términos definidos por el proveedor, según el equipo y el plan que te aprueben.",
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
    body: "Nuestras opciones de arrendamiento con opción a compra acepta todo crédito, así que el mal crédito no es impedimento automático. La aprobación no está garantizada: en unos minutos en el mostrador sabes si calificas.",
    quote: "Lease-to-own — all credit welcome.",
    items: [
      [
        "Todo crédito es bienvenido",
        "Todo crédito es bienvenido, y el mal crédito está bien. Sujeto a aprobación.",
      ],
      [
        "términos definidos por el proveedor",
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
        a: "Sí, puedes aplicar. El arrendamiento con opción a compra en iPhone y Samsung Galaxy desbloqueados acepta todo crédito y términos definidos por el proveedor, así que el mal crédito no es impedimento automático. La aprobación no está garantizada; trae una identificación con foto y en unos minutos en la tienda sabes si calificas.",
      },
      {
        q: "¿Puedo sacar un PS5 o Xbox a pagos con mal crédito?",
        a: "Sí. Tenemos opciones de arrendamiento con opción a compra Todo crédito es bienvenido, así que el mal crédito no es impedimento. La aprobación no está garantizada, pero en unos minutos en la tienda sabes si calificas.",
      },
      {
        q: "¿Puedo sacar una laptop o MacBook a pagos Todo crédito es bienvenido?",
        a: "Sí. El arrendamiento con opción a compra aplica a laptops, MacBook y iPad además de celulares y consolas. Ven o llámanos y revisamos qué tenemos disponible.",
      },
      {
        q: "¿Cuál es la diferencia entre el arrendamiento y un préstamo?",
        a: "Un préstamo es dinero que pides y pagas con el tiempo. El arrendamiento con opción a compra funciona distinto: rentas el equipo y haces pagos regulares; al terminar el plan — o si lo liquidas antes — es tuyo. No es un préstamo, y el costo total es mayor que el precio de contado. Te explicamos los términos exactos antes de firmar.",
      },
      {
        q: "¿Cuánto doy de pago inicial?",
        a: "Las opciones términos definidos por el proveedor. La cantidad exacta depende del equipo y del plan que te aprueben.",
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
    "El arrendamiento con opción a compra es ofrecido por compañías asociadas y está sujeto a aprobación; no todos los solicitantes son aprobados. El arrendamiento con opción a compra no es un préstamo ni crédito, y el costo total es mayor que el precio de contado. El pago inicial, los pagos y los términos varían según el equipo y el plan. Pide todos los detalles en la tienda antes de firmar.",
};

export const LEASING_COPY = { en, es };
