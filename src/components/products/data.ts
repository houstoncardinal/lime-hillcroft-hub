import type { Faq } from "@/components/site/schema";
import type { Lang } from "@/components/site/seo";
import type { ClipKey } from "@/components/site/store-clips";

// Product category pages (/accessories, /game-consoles and their Spanish versions). Products are
// what's on the store's walls and display cases in the photos (October 2026) plus items already
// confirmed in public/llms-full.txt. No prices: stock and sale tags change daily.
// Wording rule from the owner: phones and consoles are "leasing" (never "financing");
// accessories are bought outright.

export type ProductPhoto =
  | "caseWall"
  | "iphoneCases"
  | "samsungCases"
  | "chargers"
  | "jbl"
  | "airpodsWatches"
  | "consoles"
  | "protector"
  | "jblCase"
  | "watchTab"
  | "airpodsMax"
  | "laptopsTablets"
  | "appleDisplay";

type L = Record<Lang, string>;
const l = (en: string, es: string): L => ({ en, es });
/** A product or brand name that reads the same in both languages. */
const n = (name: string): L => ({ en: name, es: name });

export type ProductGroup = {
  id: string;
  title: L;
  body: L;
  photo: ProductPhoto;
  /** The point of the photo to show (CSS position), e.g. one console on a shared shelf photo. */
  focus?: string;
  /** How far to zoom in on that point (1 = whole photo). */
  zoom?: number;
  photoAlt: L;
  items: L[];
};

export type CategoryKey = "accessories" | "consoles" | "laptops";

export type CategoryPageData = {
  key: CategoryKey;
  /** schema.org Product category for the items. */
  category: string;
  heroPhoto: ProductPhoto;
  /** Looping store clip behind the hero. */
  heroVideo: ClipKey;
  /** Show this clip in the hero card instead of heroPhoto. */
  heroCardVideo?: ClipKey;
  /** Clips shown first in the gallery. */
  galleryVideos: [ClipKey, L][];
  gallery: [ProductPhoto, L][];
  brands: string[];
  groups: ProductGroup[];
  /** Leasing section with the online applications (consoles). */
  leasing: boolean;
  text: Record<
    Lang,
    {
      title: string;
      description: string;
      breadcrumb: string;
      imageAlt: string;
      kicker: string;
      h1: [string, string];
      intro: string;
      chips: string[];
      cta: string;
      groupsKicker: string;
      groupsTitle: string;
      buyKicker: string;
      buyTitle: string;
      buyBody: string;
      buySteps: [string, string][];
      galleryTitle: string;
      brandsTitle: string;
      faq: Faq[];
      related: [string, string][];
      ogKicker: string;
      ogHeadline: string;
      ogSub: string;
    }
  >;
};

export const ACCESSORIES: CategoryPageData = {
  key: "accessories",
  category: "Cell phone accessories",
  heroPhoto: "caseWall",
  heroVideo: "accessoryWall",
  heroCardVideo: "jblSpeakers",
  galleryVideos: [
    [
      "accessoryWall",
      l(
        "Walk along the case and accessory walls at TIC Wireless",
        "Recorrido por las paredes de fundas y accesorios de TIC Wireless",
      ),
    ],
    [
      "jblSpeakers",
      l(
        "JBL Flip 7, Charge 6 and Go speakers in the display case",
        "Bocinas JBL Flip 7, Charge 6 y Go en la vitrina",
      ),
    ],
  ],
  gallery: [
    [
      "caseWall",
      l(
        "Wall of iPhone and Samsung Galaxy cases and tempered glass at TIC Wireless",
        "Pared de fundas para iPhone y Samsung Galaxy y micas de vidrio templado en TIC Wireless",
      ),
    ],
    [
      "chargers",
      l(
        "Chargers, cables, power banks and car mounts on the accessory wall",
        "Cargadores, cables, baterías portátiles y soportes para auto en la pared de accesorios",
      ),
    ],
    [
      "jbl",
      l(
        "JBL Flip 7, Charge 6 and Go 4 speakers and camera lens protectors in the display case",
        "Bocinas JBL Flip 7, Charge 6 y Go 4 y protectores de cámara en la vitrina",
      ),
    ],
    [
      "jblCase",
      l(
        "JBL speakers, wireless neckband earbuds and an LED ring light in the display case",
        "Bocinas JBL, audífonos de cuello y aro de luz LED en la vitrina",
      ),
    ],
    [
      "watchTab",
      l(
        "Samsung Galaxy Watch and smartwatch boxes in the display case",
        "Cajas de Samsung Galaxy Watch y relojes inteligentes en la vitrina",
      ),
    ],
    [
      "airpodsMax",
      l(
        "AirPods Max, iPads and Galaxy boxes in the display case",
        "AirPods Max, iPad y cajas Galaxy en la vitrina",
      ),
    ],
    [
      "airpodsWatches",
      l(
        "AirPods, AirPods Pro, Beats, Galaxy Watch and smartwatches in the display case",
        "AirPods, AirPods Pro, Beats, Galaxy Watch y relojes inteligentes en la vitrina",
      ),
    ],
    [
      "iphoneCases",
      l(
        "iPhone cases — Drop+, mybat Maverick, MagSafe clear and privacy glass",
        "Fundas para iPhone: Drop+, mybat Maverick, transparentes MagSafe y micas de privacidad",
      ),
    ],
    [
      "samsungCases",
      l(
        "Samsung Galaxy cases including ZIZO Bolt, Division and Realm series",
        "Fundas para Samsung Galaxy, incluidas ZIZO Bolt, Division y Realm",
      ),
    ],
  ],
  brands: [
    "ZIZO",
    "mybat",
    "JBL",
    "Apple",
    "Samsung",
    "Beats",
    "Motorola",
    "Razer",
    "Acer",
    "XO",
    "Trusmi",
    "Fitbit",
    "OtterBox",
  ],
  groups: [
    {
      id: "cases",
      title: l("Phone cases", "Fundas para celular"),
      body: l(
        "Hundreds of cases on the wall for iPhone and Samsung Galaxy — from slim clear cases to rugged holsters.",
        "Cientos de fundas en la pared para iPhone y Samsung Galaxy: desde transparentes delgadas hasta resistentes con clip.",
      ),
      photo: "samsungCases",
      photoAlt: l(
        "Samsung Galaxy cases on the wall at TIC Wireless",
        "Fundas para Samsung Galaxy en la pared de TIC Wireless",
      ),
      items: [
        l(
          "Cases for iPhone and Samsung Galaxy S, A & Z Flip",
          "Para iPhone y Samsung Galaxy S, A y Z Flip",
        ),
        n("ZIZO Bolt, Division & Realm series"),
        l("Heavy-duty & Drop+ protective cases", "Fundas resistentes y Drop+"),
        l("Clear MagSafe-compatible cases", "Transparentes compatibles con MagSafe"),
        l("Ring-stand & kickstand cases", "Con anillo y soporte"),
        l("Glitter, floral & designer cases", "Con brillos, flores y diseños"),
        l("Kids' tablet cases with handle", "Fundas para tableta de niños con asa"),
      ],
    },
    {
      id: "screen-protection",
      title: l("Screen & camera protection", "Protección de pantalla y cámara"),
      body: l(
        "Tempered glass for the screen you have, plus lens protectors and watch covers.",
        "Vidrio templado para tu pantalla, además de protectores de cámara y de reloj.",
      ),
      photo: "iphoneCases",
      focus: "50% 92%",
      zoom: 1.4,
      photoAlt: l(
        "Privacy and 3D tempered glass screen protectors",
        "Micas de vidrio templado de privacidad y 3D",
      ),
      items: [
        l("Tempered & full-glue glass", "Vidrio templado y full glue"),
        l("Privacy tempered glass", "Mica de privacidad"),
        l("Premium 3D & full-cover glass", "Vidrio 3D premium y de cobertura completa"),
        l("Camera lens protectors", "Protectores para cámara"),
        l("iPad & tablet tempered glass", "Vidrio templado para iPad y tabletas"),
        l("Apple Watch covers & screen protectors", "Protectores y bumpers para Apple Watch"),
      ],
    },
    {
      id: "charging",
      title: l("Chargers, cables & power", "Cargadores, cables y baterías"),
      body: l(
        "Fast chargers for home and car, the right cable for your phone, and backup power.",
        "Cargadores rápidos para casa y auto, el cable correcto para tu celular y batería de respaldo.",
      ),
      photo: "chargers",
      focus: "35% 35%",
      zoom: 1.5,
      photoAlt: l(
        "Wall chargers, car chargers, cables and power banks",
        "Cargadores de pared, cargadores de auto, cables y baterías portátiles",
      ),
      items: [
        l(
          "USB-C fast wall chargers (Samsung 25W & 45W, Apple 20W)",
          "Cargadores rápidos USB-C (Samsung 25W y 45W, Apple 20W)",
        ),
        l("Car chargers up to 48W", "Cargadores de auto de hasta 48W"),
        l("USB-C & Lightning cables", "Cables USB-C y Lightning"),
        l("10,000mAh & magnetic power banks", "Baterías portátiles de 10,000mAh y magnéticas"),
        l("Wireless chargers & 3-in-1 stations", "Cargadores inalámbricos y estaciones 3 en 1"),
        l("Apple Watch chargers", "Cargadores para Apple Watch"),
        l("HDMI, AUX & USB-C audio adapters", "Adaptadores HDMI, AUX y de audio USB-C"),
      ],
    },
    {
      id: "car",
      title: l("Car mounts & on-the-go", "Soportes para auto y más"),
      body: l(
        "Keep your phone in view while you drive, and protected wherever you go.",
        "Ten tu celular a la vista mientras manejas y protegido a donde vayas.",
      ),
      photo: "chargers",
      focus: "22% 100%",
      zoom: 2.3,
      photoAlt: l(
        "Cup-holder, dashboard and magnetic car mounts",
        "Soportes para portavasos, tablero y magnéticos para auto",
      ),
      items: [
        l("Cup-holder & dashboard mounts", "Soportes para portavasos y tablero"),
        l("Magnetic vent holders & plates", "Soportes magnéticos para rejilla y placas"),
        l("Bluetooth FM transmitters", "Transmisores FM Bluetooth"),
        l("AquaLock waterproof phone pouch", "Funda impermeable AquaLock"),
        l("LED ring light with phone holder", "Aro de luz LED con soporte"),
        l("Memory cards", "Tarjetas de memoria"),
      ],
    },
    {
      id: "audio",
      title: l("Speakers & earbuds", "Bocinas y audífonos"),
      body: l(
        "Name-brand audio in the display case, from pocket speakers to party speakers.",
        "Audio de marca en la vitrina, desde bocinas de bolsillo hasta bocinas para fiesta.",
      ),
      photo: "jblCase",
      focus: "55% 55%",
      zoom: 1.25,
      photoAlt: l("JBL Flip 7, Charge 6 and Go speakers", "Bocinas JBL Flip 7, Charge 6 y Go"),
      items: [
        n("JBL Go 3, Go 4, Flip 6, Flip 7 & Charge 6"),
        n("JBL PartyBox Encore Essential"),
        l("Apple AirPods, AirPods Pro & AirPods Max", "Apple AirPods, AirPods Pro y AirPods Max"),
        n("Beats Studio Buds+ & Powerbeats Pro 2"),
        n("Samsung Galaxy Buds2, Buds2 Pro & Buds3 Pro"),
        n("PlayStation PULSE Explore"),
        l("Wireless neckband earbuds", "Audífonos inalámbricos de cuello"),
      ],
    },
    {
      id: "wearables",
      title: l("Smartwatches & wearables", "Relojes inteligentes"),
      body: l(
        "Smartwatches for every budget, plus bands, covers and chargers.",
        "Relojes inteligentes para todo presupuesto, además de correas, protectores y cargadores.",
      ),
      photo: "watchTab",
      focus: "45% 45%",
      zoom: 1.4,
      photoAlt: l(
        "Trusmi smartwatches and Galaxy Watch in the display case",
        "Relojes Trusmi y Galaxy Watch en la vitrina",
      ),
      items: [
        n("Samsung Galaxy Watch Ultra, Watch6 & Watch4 Classic"),
        n("Fitbit Versa 4"),
        l("Trusmi smartwatches", "Relojes inteligentes Trusmi"),
        l("Smartwatch & earbuds sets", "Paquetes de reloj y audífonos"),
        l("Watch bands & bumper cases", "Correas y bumpers para reloj"),
      ],
    },
  ],
  leasing: false,
  text: {
    en: {
      title: "Phone Accessories in Houston — Cases, Chargers & JBL",
      description:
        "Cases for iPhone & Galaxy, tempered glass, fast chargers, power banks, car mounts, JBL speakers, AirPods & smartwatches on Hillcroft in Houston.",
      breadcrumb: "Accessories",
      imageAlt: "The case and screen protector wall at TIC Wireless on Hillcroft, Houston",
      kicker: "Phone accessories · Hillcroft, Houston",
      h1: ["Phone accessories,", "walls of them."],
      intro:
        "Cases for iPhone and Samsung Galaxy, tempered glass, fast chargers, car mounts, JBL speakers, AirPods and smartwatches — all on the wall and in the display cases at our store on Hillcroft. Walk in, find it, take it home.",
      chips: ["iPhone & Galaxy cases", "Tempered glass", "Fast chargers", "JBL & AirPods"],
      cta: "Call to check stock",
      groupsKicker: "What we carry",
      groupsTitle: "Everything for your phone, in one stop.",
      buyKicker: "How buying works",
      buyTitle: "Simple: pick it, pay, done.",
      buyBody:
        "Accessories are priced to buy outright at the counter — no application, no plan. Big-ticket items like AirPods Max or a JBL PartyBox can be added to a phone or console lease; ask at the counter.",
      buySteps: [
        ["Bring your phone", "We'll match the right case, glass and charger to your exact model."],
        [
          "Check the fit",
          "Try it before you pay — accessory sales are final, so we help you get it right.",
        ],
        [
          "Pay & go",
          "Pay at the counter and walk out with it. Look for sale tags around the store.",
        ],
      ],
      galleryTitle: "Inside the store",
      brandsTitle: "Brands on our shelves",
      faq: [
        {
          q: "Do you have cases for my phone?",
          a: "Very likely. We carry cases for most iPhone and Samsung Galaxy models — S series, A series and Z Flip — including ZIZO, mybat, Drop+, MagSafe clear and ring-stand cases. Call (713) 339-9300 with your model to check.",
        },
        {
          q: "What screen protectors do you sell?",
          a: "Tempered glass, full-glue glass, privacy glass, premium 3D and full-cover glass, plus camera lens protectors, iPad glass and Apple Watch covers.",
        },
        {
          q: "Do you have fast chargers?",
          a: "Yes — USB-C fast wall chargers including Samsung 25W and 45W and Apple 20W, car chargers up to 48W, USB-C and Lightning cables, power banks and wireless chargers.",
        },
        {
          q: "Can I pay for accessories over time?",
          a: "Accessories are bought outright at the counter. Leasing is for phones, game consoles, laptops and tablets; bigger audio like AirPods Max can be added to a lease — ask us.",
        },
        {
          q: "Can I return or exchange an accessory?",
          a: "Accessory sales are final, so bring your phone and we'll help you check the fit before you buy.",
        },
      ],
      related: [
        ["Game consoles", "/game-consoles"],
        ["Unlocked phones", "/services/unlocked-phones"],
        ["Phone repair", "/services/phone-repair"],
      ],
      ogKicker: "Phone accessories",
      ogHeadline: "Cases, glass, chargers, JBL & AirPods — on Hillcroft.",
      ogSub: "iPhone & Galaxy cases · Tempered glass · Fast chargers · Car mounts · Smartwatches",
    },
    es: {
      title: "Accesorios para Celular en Houston — Fundas, Cargadores y JBL",
      description:
        "Fundas para iPhone y Galaxy, micas de vidrio, cargadores rápidos, baterías, soportes para auto, bocinas JBL, AirPods y relojes en Hillcroft, Houston.",
      breadcrumb: "Accesorios",
      imageAlt: "La pared de fundas y micas de TIC Wireless en Hillcroft, Houston",
      kicker: "Accesorios para celular · Hillcroft, Houston",
      h1: ["Accesorios para tu celular,", "paredes completas."],
      intro:
        "Fundas para iPhone y Samsung Galaxy, micas de vidrio templado, cargadores rápidos, soportes para auto, bocinas JBL, AirPods y relojes inteligentes, en la pared y en las vitrinas de nuestra tienda en Hillcroft. Ven, encuéntralo y llévatelo.",
      chips: ["Fundas iPhone y Galaxy", "Vidrio templado", "Cargadores rápidos", "JBL y AirPods"],
      cta: "Llama para ver existencias",
      groupsKicker: "Lo que tenemos",
      groupsTitle: "Todo para tu celular en un solo lugar.",
      buyKicker: "Cómo comprar",
      buyTitle: "Fácil: escoge, paga y listo.",
      buyBody:
        "Los accesorios se compran de contado en el mostrador, sin solicitud ni plan. Artículos más grandes como AirPods Max o una JBL PartyBox se pueden agregar al arrendamiento de un celular o consola; pregunta en el mostrador.",
      buySteps: [
        ["Trae tu celular", "Te encontramos la funda, mica y cargador exactos para tu modelo."],
        [
          "Revisa que quede",
          "Pruébalo antes de pagar: las ventas de accesorios son finales, así que te ayudamos a acertar.",
        ],
        [
          "Paga y listo",
          "Paga en el mostrador y llévatelo. Busca las etiquetas de oferta en la tienda.",
        ],
      ],
      galleryTitle: "Dentro de la tienda",
      brandsTitle: "Marcas en nuestros estantes",
      faq: [
        {
          q: "¿Tienen fundas para mi celular?",
          a: "Muy probablemente. Tenemos fundas para la mayoría de los iPhone y Samsung Galaxy (series S, A y Z Flip), incluidas ZIZO, mybat, Drop+, transparentes MagSafe y con anillo. Llama al (713) 339-9300 con tu modelo.",
        },
        {
          q: "¿Qué micas venden?",
          a: "Vidrio templado, full glue, de privacidad, 3D premium y de cobertura completa, además de protectores de cámara, vidrio para iPad y protectores para Apple Watch.",
        },
        {
          q: "¿Tienen cargadores rápidos?",
          a: "Sí: cargadores USB-C rápidos, incluidos Samsung de 25W y 45W y Apple de 20W, cargadores de auto de hasta 48W, cables USB-C y Lightning, baterías portátiles y cargadores inalámbricos.",
        },
        {
          q: "¿Puedo pagar los accesorios a plazos?",
          a: "Los accesorios se compran de contado en el mostrador. El arrendamiento es para celulares, consolas, laptops y tabletas; audio más grande como AirPods Max se puede agregar a un arrendamiento. Pregúntanos.",
        },
        {
          q: "¿Puedo devolver o cambiar un accesorio?",
          a: "Las ventas de accesorios son finales, así que trae tu celular y te ayudamos a revisar que quede antes de comprar.",
        },
      ],
      related: [
        ["Consolas", "/es/consolas"],
        ["Celulares desbloqueados", "/es/servicios/unlocked-phones"],
        ["Reparación de celulares", "/es/servicios/phone-repair"],
      ],
      ogKicker: "Accesorios para celular",
      ogHeadline: "Fundas, micas, cargadores, JBL y AirPods en Hillcroft.",
      ogSub: "Fundas iPhone y Galaxy · Vidrio templado · Cargadores rápidos · Soportes · Relojes",
    },
  },
};

export const CONSOLES: CategoryPageData = {
  key: "consoles",
  category: "Video game consoles",
  heroPhoto: "consoles",
  heroVideo: "storeInterior",
  galleryVideos: [
    [
      "storeInterior",
      l(
        "Inside TIC Wireless on Hillcroft — the counter where you apply and pick up",
        "Dentro de TIC Wireless en Hillcroft: el mostrador donde solicitas y recoges",
      ),
    ],
  ],
  gallery: [
    [
      "consoles",
      l(
        "PS5 Slim Digital Edition, PS5 Slim, Xbox Series X, Nintendo Switch 2, AirPods Max, Razer Kishi and JBL speakers on display",
        "PS5 Slim Digital, PS5 Slim, Xbox Series X, Nintendo Switch 2, AirPods Max, Razer Kishi y bocinas JBL en exhibición",
      ),
    ],
    [
      "airpodsMax",
      l("AirPods Max and iPads in the display case", "AirPods Max y iPad en la vitrina"),
    ],
    [
      "jbl",
      l(
        "JBL speakers and accessories in the display case",
        "Bocinas JBL y accesorios en la vitrina",
      ),
    ],
    [
      "airpodsWatches",
      l(
        "AirPods, Beats and smartwatches in the display case",
        "AirPods, Beats y relojes inteligentes en la vitrina",
      ),
    ],
  ],
  brands: ["PlayStation", "Xbox", "Nintendo", "Razer", "Apple", "JBL"],
  groups: [
    {
      id: "playstation",
      title: n("PlayStation 5"),
      body: l(
        "The slim PS5 in both editions — with a disc drive or all-digital.",
        "El PS5 slim en sus dos versiones: con lector de discos o totalmente digital.",
      ),
      photo: "consoles",
      focus: "38% 62%",
      zoom: 1.7,
      photoAlt: l(
        "PS5 Slim Digital Edition and PS5 Slim boxes",
        "Cajas de PS5 Slim Digital y PS5 Slim",
      ),
      items: [
        l("PS5 Slim — 1TB, with disc drive", "PS5 Slim de 1TB con lector de discos"),
        l(
          "PS5 Slim Digital Edition — 825GB, disc-free",
          "PS5 Slim Digital Edition de 825GB, sin disco",
        ),
        l("PlayStation PULSE Explore earbuds", "Audífonos PlayStation PULSE Explore"),
      ],
    },
    {
      id: "xbox",
      title: n("Xbox"),
      body: l(
        "Xbox Series X with a 1TB SSD and 4K gaming at up to 120 FPS.",
        "Xbox Series X con SSD de 1TB y juegos en 4K a hasta 120 FPS.",
      ),
      photo: "consoles",
      focus: "80% 52%",
      zoom: 2.1,
      photoAlt: l("Xbox Series X 1TB box", "Caja de Xbox Series X de 1TB"),
      items: [l("Xbox Series X — 1TB SSD", "Xbox Series X con SSD de 1TB"), n("Xbox Series S")],
    },
    {
      id: "nintendo",
      title: n("Nintendo Switch 2"),
      body: l(
        "The new Nintendo Switch 2 — play on the TV or take it with you.",
        "El nuevo Nintendo Switch 2: juega en la tele o llévatelo contigo.",
      ),
      photo: "consoles",
      focus: "68% 18%",
      zoom: 2.4,
      photoAlt: l("Nintendo Switch 2 box", "Caja de Nintendo Switch 2"),
      items: [n("Nintendo Switch 2")],
    },
    {
      id: "gear",
      title: l("Gaming gear & audio", "Accesorios para gamers y audio"),
      body: l(
        "Play on your phone, hear every footstep, and bring the party.",
        "Juega en tu celular, escucha cada detalle y arma la fiesta.",
      ),
      photo: "consoles",
      focus: "28% 2%",
      zoom: 2.6,
      photoAlt: l("Razer Kishi controller and AirPods Max", "Control Razer Kishi y AirPods Max"),
      items: [
        l("Razer Kishi phone controller", "Control para celular Razer Kishi"),
        n("Apple AirPods Max"),
        l("JBL PartyBox & Charge speakers", "Bocinas JBL PartyBox y Charge"),
      ],
    },
  ],
  leasing: true,
  text: {
    en: {
      title: "PS5, Xbox & Nintendo Switch 2 in Houston — Leasing $40 Down",
      description:
        "PS5 Slim, Xbox Series X and Nintendo Switch 2 on Hillcroft in Houston. Lease-to-own with no credit needed, as low as $40 down. Apply online in minutes.",
      breadcrumb: "Game consoles",
      imageAlt:
        "PS5 Slim, Xbox Series X and Nintendo Switch 2 on display at TIC Wireless in Houston",
      kicker: "Game consoles · Leasing · Houston",
      h1: ["PS5, Xbox & Switch 2.", "Take it home today."],
      intro:
        "PlayStation 5, Xbox Series X and Nintendo Switch 2 are in store on Hillcroft, and you don't need credit to take one home. Our leasing programs start as low as $40 down, with weekly, biweekly or monthly payments.",
      chips: ["No credit needed", "As low as $40 down", "Take it home today", "Se habla español"],
      cta: "Call to check stock",
      groupsKicker: "In store now",
      groupsTitle: "The consoles everyone's asking for.",
      buyKicker: "How leasing works",
      buyTitle: "Play now. Pay over time.",
      buyBody:
        "Leasing (lease-to-own) lets you take the console home today and make regular payments. When the plan is complete — or you pay it off early — it's yours. Subject to approval; the total cost to own is more than the cash price, and we explain every term before you sign.",
      buySteps: [
        ["Apply", "Online in a few minutes below, or at the counter with a valid photo ID."],
        ["Pick your console", "PS5, Xbox or Switch 2 — add a controller or headset if you like."],
        [
          "Take it home today",
          "Start with as low as $40 down, then weekly, biweekly or monthly payments.",
        ],
      ],
      galleryTitle: "On display at the store",
      brandsTitle: "Brands we carry",
      faq: [
        {
          q: "Which game consoles do you have?",
          a: "PlayStation 5 Slim (1TB with disc drive and the 825GB Digital Edition), Xbox Series X with a 1TB SSD, Xbox Series S and Nintendo Switch 2. Stock changes quickly — call (713) 339-9300 to check.",
        },
        {
          q: "Can I get a PS5 or Xbox with no credit?",
          a: "Yes. Our leasing programs need no credit, with options as low as $40 down. Approval isn't guaranteed and depends on the program.",
        },
        {
          q: "What do I need to apply?",
          a: "A valid photo ID. If you apply online, have your ID and bank details ready — it takes a few minutes, then come to the store to pick up your console.",
        },
        {
          q: "How do the payments work?",
          a: "You choose weekly, biweekly or monthly payments. When the plan is complete, the console is yours, and you can ask about early-payoff options when you apply.",
        },
        {
          q: "Is leasing the same as a loan?",
          a: "No. Lease-to-own means you lease the console and make regular payments until you own it. The total cost is more than paying cash, and we explain all terms in store before you sign.",
        },
      ],
      related: [
        ["Leasing on phones & laptops", "/leasing"],
        ["Accessories", "/accessories"],
        ["How lease-to-own works", "/guides/how-lease-to-own-works"],
      ],
      ogKicker: "Game consoles · Leasing",
      ogHeadline: "PS5, Xbox & Nintendo Switch 2. Take it home today.",
      ogSub: "No credit needed · As low as $40 down · Weekly, biweekly or monthly payments",
    },
    es: {
      title: "PS5, Xbox y Nintendo Switch 2 en Houston — Desde $40",
      description:
        "PS5 Slim, Xbox Series X y Nintendo Switch 2 en Hillcroft, Houston. Arrendamiento sin necesidad de crédito, desde $40 de enganche. Solicita en línea.",
      breadcrumb: "Consolas",
      imageAlt:
        "PS5 Slim, Xbox Series X y Nintendo Switch 2 en exhibición en TIC Wireless en Houston",
      kicker: "Consolas · Arrendamiento · Houston",
      h1: ["PS5, Xbox y Switch 2.", "Llévatelo hoy."],
      intro:
        "PlayStation 5, Xbox Series X y Nintendo Switch 2 están en la tienda de Hillcroft y no necesitas crédito para llevarte uno. Nuestros programas de arrendamiento empiezan desde $40 de enganche, con pagos semanales, quincenales o mensuales.",
      chips: [
        "Sin necesidad de crédito",
        "Desde $40 de enganche",
        "Llévatelo hoy",
        "We speak English",
      ],
      cta: "Llama para ver existencias",
      groupsKicker: "En la tienda",
      groupsTitle: "Las consolas que todos quieren.",
      buyKicker: "Cómo funciona el arrendamiento",
      buyTitle: "Juega hoy. Paga poco a poco.",
      buyBody:
        "El arrendamiento con opción a compra te permite llevarte la consola hoy y hacer pagos regulares. Al completar el plan, o si lo liquidas antes, es tuya. Sujeto a aprobación; el costo total es mayor que el precio de contado y te explicamos cada término antes de firmar.",
      buySteps: [
        [
          "Solicita",
          "En línea en unos minutos aquí abajo, o en el mostrador con identificación con foto.",
        ],
        ["Elige tu consola", "PS5, Xbox o Switch 2; agrega un control o audífonos si quieres."],
        [
          "Llévatela hoy",
          "Empieza desde $40 de enganche y luego pagos semanales, quincenales o mensuales.",
        ],
      ],
      galleryTitle: "En exhibición en la tienda",
      brandsTitle: "Marcas que manejamos",
      faq: [
        {
          q: "¿Qué consolas tienen?",
          a: "PlayStation 5 Slim (1TB con lector de discos y la Digital Edition de 825GB), Xbox Series X con SSD de 1TB, Xbox Series S y Nintendo Switch 2. Las existencias cambian rápido: llama al (713) 339-9300.",
        },
        {
          q: "¿Puedo llevarme un PS5 o Xbox sin crédito?",
          a: "Sí. Nuestros programas de arrendamiento no piden crédito y empiezan desde $40 de enganche. La aprobación no está garantizada y depende del programa.",
        },
        {
          q: "¿Qué necesito para solicitar?",
          a: "Una identificación con foto vigente. Si solicitas en línea, ten a la mano tu ID y tus datos bancarios; toma unos minutos y luego vienes a la tienda por tu consola.",
        },
        {
          q: "¿Cómo son los pagos?",
          a: "Tú eliges pagos semanales, quincenales o mensuales. Al completar el plan la consola es tuya, y puedes preguntar por opciones para liquidar antes al solicitar.",
        },
        {
          q: "¿El arrendamiento es un préstamo?",
          a: "No. Con el arrendamiento con opción a compra rentas la consola y haces pagos regulares hasta que es tuya. El costo total es mayor que pagar de contado y te explicamos todo en la tienda antes de firmar.",
        },
      ],
      related: [
        ["Arrendamiento de celulares y laptops", "/es/arrendamiento"],
        ["Accesorios", "/es/accesorios"],
        ["Cómo funciona el arrendamiento", "/es/guias/how-lease-to-own-works"],
      ],
      ogKicker: "Consolas · Arrendamiento",
      ogHeadline: "PS5, Xbox y Nintendo Switch 2. Llévatelo hoy.",
      ogSub:
        "Sin necesidad de crédito · Desde $40 de enganche · Pagos semanales, quincenales o mensuales",
    },
  },
};

export const LAPTOPS: CategoryPageData = {
  key: "laptops",
  category: "Laptops and tablets",
  heroPhoto: "laptopsTablets",
  heroVideo: "storeInterior",
  galleryVideos: [],
  gallery: [
    [
      "laptopsTablets",
      l(
        "MacBook Air, iPad Pro, iPad and iPad mini boxes in the display case",
        "Cajas de MacBook Air, iPad Pro, iPad y iPad mini en la vitrina",
      ),
    ],
    [
      "airpodsMax",
      l(
        "MacBook Neo, iPad, AirPods Max and Galaxy Tab A9+ 5G in the display case",
        "MacBook Neo, iPad, AirPods Max y Galaxy Tab A9+ 5G en la vitrina",
      ),
    ],
    [
      "watchTab",
      l(
        "MacBook Air and Samsung Galaxy Tab S10 FE+ in the display case",
        "MacBook Air y Samsung Galaxy Tab S10 FE+ en la vitrina",
      ),
    ],
    [
      "appleDisplay",
      l(
        "MacBook Air, iPads, Galaxy Buds and Galaxy Watch in the display case",
        "MacBook Air, iPad, Galaxy Buds y Galaxy Watch en la vitrina",
      ),
    ],
  ],
  brands: ["Apple", "Samsung"],
  groups: [
    {
      id: "macbook",
      title: n("MacBook"),
      body: l(
        "Apple laptops for school, work and everything in between.",
        "Laptops de Apple para la escuela, el trabajo y todo lo demás.",
      ),
      photo: "airpodsMax",
      focus: "53% 82%",
      zoom: 2.4,
      photoAlt: l("MacBook Neo box in the display case", "Caja de MacBook Neo en la vitrina"),
      items: [
        l("MacBook Air (13-inch)", "MacBook Air (13 pulgadas)"),
        l("MacBook Air in sky blue", "MacBook Air en azul cielo"),
        n("MacBook Neo"),
      ],
    },
    {
      id: "ipad",
      title: n("iPad"),
      body: l(
        "From the pocket-size iPad mini to the iPad Pro.",
        "Desde el iPad mini de bolsillo hasta el iPad Pro.",
      ),
      photo: "laptopsTablets",
      focus: "78% 45%",
      zoom: 1.6,
      photoAlt: l("iPad Pro, iPad and iPad mini boxes", "Cajas de iPad Pro, iPad y iPad mini"),
      items: [
        n("iPad Pro (M2)"),
        n("iPad Pro"),
        n("iPad"),
        n("iPad mini (5th gen)"),
        n("iPad mini"),
      ],
    },
    {
      id: "galaxy-tab",
      title: n("Samsung Galaxy Tab"),
      body: l(
        "Android tablets with big screens, including a 5G model.",
        "Tabletas Android de pantalla grande, incluida una con 5G.",
      ),
      photo: "watchTab",
      focus: "62% 82%",
      zoom: 2.2,
      photoAlt: l("Samsung Galaxy Tab S10 FE+ box", "Caja de Samsung Galaxy Tab S10 FE+"),
      items: [n("Galaxy Tab S10 FE+"), n("Galaxy Tab A9+ 5G")],
    },
    {
      id: "more",
      title: l("Windows laptops & extras", "Laptops Windows y extras"),
      body: l(
        "Ask about Windows laptops in stock, and protect what you take home.",
        "Pregunta por laptops Windows disponibles y protege lo que te llevas.",
      ),
      photo: "appleDisplay",
      focus: "35% 75%",
      zoom: 1.5,
      photoAlt: l("MacBook Air box in the display case", "Caja de MacBook Air en la vitrina"),
      items: [
        l("Windows laptops — ask for current models", "Laptops Windows: pregunta por modelos"),
        l("iPad & tablet tempered glass", "Vidrio templado para iPad y tabletas"),
        l("Tablet cases, chargers & cables", "Fundas, cargadores y cables para tabletas"),
        l("Laptop & tablet repair", "Reparación de laptops y tabletas"),
      ],
    },
  ],
  leasing: true,
  text: {
    en: {
      title: "MacBook, iPad & Galaxy Tab in Houston — Leasing from $40 Down",
      description:
        "MacBook Air, MacBook Neo, iPad Pro, iPad, iPad mini and Galaxy Tab on Hillcroft in Houston. Lease-to-own with no credit needed, as low as $40 down.",
      breadcrumb: "Laptops & tablets",
      imageAlt: "MacBook Air, iPad Pro, iPad and iPad mini on display at TIC Wireless in Houston",
      kicker: "Laptops & tablets · Leasing · Houston",
      h1: ["MacBook, iPad & Galaxy Tab.", "Take it home today."],
      intro:
        "MacBook Air, MacBook Neo, iPad Pro, iPad, iPad mini and Samsung Galaxy Tab are in the display cases on Hillcroft. No credit? No problem — our leasing programs start as low as $40 down, with weekly, biweekly or monthly payments.",
      chips: ["No credit needed", "As low as $40 down", "Apple & Samsung", "Se habla español"],
      cta: "Call to check stock",
      groupsKicker: "In store now",
      groupsTitle: "Laptops and tablets for school, work and play.",
      buyKicker: "How leasing works",
      buyTitle: "Get the laptop now. Pay over time.",
      buyBody:
        "Leasing (lease-to-own) lets you take your laptop or tablet home today and make regular payments. When the plan is complete — or you pay it off early — it's yours. Subject to approval; the total cost to own is more than the cash price, and we explain every term before you sign.",
      buySteps: [
        ["Apply", "Online in a few minutes below, or at the counter with a valid photo ID."],
        [
          "Pick your device",
          "MacBook, iPad or Galaxy Tab — add a case or screen glass if you like.",
        ],
        [
          "Take it home today",
          "Start with as low as $40 down, then weekly, biweekly or monthly payments.",
        ],
      ],
      galleryTitle: "On display at the store",
      brandsTitle: "Brands we carry",
      faq: [
        {
          q: "Which laptops and tablets do you have?",
          a: "MacBook Air, MacBook Neo, iPad Pro, iPad, iPad mini, Samsung Galaxy Tab S10 FE+ and Galaxy Tab A9+ 5G, plus Windows laptops when in stock. Stock changes quickly — call (713) 339-9300 to check.",
        },
        {
          q: "Can I get a MacBook or iPad with no credit?",
          a: "Yes. Our leasing programs need no credit, with options as low as $40 down. Approval isn't guaranteed and depends on the program.",
        },
        {
          q: "What do I need to apply?",
          a: "A valid photo ID. If you apply online, have your ID and bank details ready — it takes a few minutes, then come to the store to pick up your device.",
        },
        {
          q: "Do you repair laptops and tablets too?",
          a: "Yes — screens, batteries and other repairs for tablets, laptops and computers. Bring it in and we'll quote the price before any work starts.",
        },
      ],
      related: [
        ["Game consoles", "/game-consoles"],
        ["Unlocked phones", "/services/unlocked-phones"],
        ["Accessories", "/accessories"],
        ["Laptop & tablet repair", "/services/phone-repair"],
      ],
      ogKicker: "Laptops & tablets · Leasing",
      ogHeadline: "MacBook, iPad & Galaxy Tab. Take it home today.",
      ogSub: "No credit needed · As low as $40 down · Weekly, biweekly or monthly payments",
    },
    es: {
      title: "MacBook, iPad y Galaxy Tab en Houston — Desde $40",
      description:
        "MacBook Air, MacBook Neo, iPad Pro, iPad, iPad mini y Galaxy Tab en Hillcroft, Houston. Arrendamiento sin necesidad de crédito, desde $40 de enganche.",
      breadcrumb: "Laptops y tabletas",
      imageAlt: "MacBook Air, iPad Pro, iPad y iPad mini en exhibición en TIC Wireless en Houston",
      kicker: "Laptops y tabletas · Arrendamiento · Houston",
      h1: ["MacBook, iPad y Galaxy Tab.", "Llévatelo hoy."],
      intro:
        "MacBook Air, MacBook Neo, iPad Pro, iPad, iPad mini y Samsung Galaxy Tab están en las vitrinas de Hillcroft. ¿Sin crédito? No hay problema: nuestros programas de arrendamiento empiezan desde $40 de enganche, con pagos semanales, quincenales o mensuales.",
      chips: [
        "Sin necesidad de crédito",
        "Desde $40 de enganche",
        "Apple y Samsung",
        "We speak English",
      ],
      cta: "Llama para ver existencias",
      groupsKicker: "En la tienda",
      groupsTitle: "Laptops y tabletas para la escuela, el trabajo y más.",
      buyKicker: "Cómo funciona el arrendamiento",
      buyTitle: "Llévate la laptop hoy. Paga poco a poco.",
      buyBody:
        "El arrendamiento con opción a compra te permite llevarte tu laptop o tableta hoy y hacer pagos regulares. Al completar el plan, o si lo liquidas antes, es tuya. Sujeto a aprobación; el costo total es mayor que el precio de contado y te explicamos cada término antes de firmar.",
      buySteps: [
        [
          "Solicita",
          "En línea en unos minutos aquí abajo, o en el mostrador con identificación con foto.",
        ],
        ["Elige tu equipo", "MacBook, iPad o Galaxy Tab; agrega funda o mica si quieres."],
        [
          "Llévatelo hoy",
          "Empieza desde $40 de enganche y luego pagos semanales, quincenales o mensuales.",
        ],
      ],
      galleryTitle: "En exhibición en la tienda",
      brandsTitle: "Marcas que manejamos",
      faq: [
        {
          q: "¿Qué laptops y tabletas tienen?",
          a: "MacBook Air, MacBook Neo, iPad Pro, iPad, iPad mini, Samsung Galaxy Tab S10 FE+ y Galaxy Tab A9+ 5G, además de laptops Windows cuando hay. Las existencias cambian rápido: llama al (713) 339-9300.",
        },
        {
          q: "¿Puedo llevarme una MacBook o iPad sin crédito?",
          a: "Sí. Nuestros programas de arrendamiento no piden crédito y empiezan desde $40 de enganche. La aprobación no está garantizada y depende del programa.",
        },
        {
          q: "¿Qué necesito para solicitar?",
          a: "Una identificación con foto vigente. Si solicitas en línea, ten a la mano tu ID y tus datos bancarios; toma unos minutos y luego vienes a la tienda por tu equipo.",
        },
        {
          q: "¿También reparan laptops y tabletas?",
          a: "Sí: pantallas, baterías y otras reparaciones de tabletas, laptops y computadoras. Tráela y te damos el precio antes de empezar.",
        },
      ],
      related: [
        ["Consolas", "/es/consolas"],
        ["Celulares desbloqueados", "/es/servicios/unlocked-phones"],
        ["Accesorios", "/es/accesorios"],
        ["Reparación de laptops y tabletas", "/es/servicios/phone-repair"],
      ],
      ogKicker: "Laptops y tabletas · Arrendamiento",
      ogHeadline: "MacBook, iPad y Galaxy Tab. Llévatelo hoy.",
      ogSub:
        "Sin necesidad de crédito · Desde $40 de enganche · Pagos semanales, quincenales o mensuales",
    },
  },
};

export const CATEGORY_PAGES = {
  accessories: ACCESSORIES,
  consoles: CONSOLES,
  laptops: LAPTOPS,
} as const;
