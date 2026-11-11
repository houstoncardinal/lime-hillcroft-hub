import { CARRIER_COUNT, carrierList } from "@/components/services/carriers";
import { RATING, REVIEW_COUNT } from "@/components/site/business";
import type { Faq } from "@/components/site/schema";
import type { Lang } from "@/components/site/seo";

// Detailed service pages (/services/<slug>, /es/servicios/<slug>). Only facts already confirmed
// for the store — no carrier policies stated as fixed rules. The prepaid page's plan prices live
// in prepaid-plans.ts (dated); every other price is quoted in store.

export type PhotoKey =
  | "repair"
  | "iphone18"
  | "counter"
  | "jbl"
  | "protector"
  | "otterbox"
  | "s24"
  | "storefront"
  | "s22"
  | "laptops"
  | "xfinity"
  | "simTray";

type ServiceText = {
  name: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  intro: string;
  offersTitle: string;
  offers: string[];
  /** Contextual links shown under the offers list: [label, path]. */
  links?: [string, string][];
  stepsTitle: string;
  steps: [string, string][];
  why: string[];
  faq: Faq[];
  cta: string;
  ogKicker: string;
  imageAlt: string;
};

export type Service = {
  slug: string;
  icon: "phone" | "plans" | "internet" | "repair" | "unlock" | "trade" | "bill" | "globe";
  photo: PhotoKey;
  related: string[];
  serviceType: string;
  text: Record<Lang, ServiceText>;
};

const CARRIERS = carrierList("en");

export const SERVICES: Service[] = [
  {
    slug: "unlocked-phones",
    icon: "phone",
    photo: "iphone18",
    related: ["phone-repair", "trade-in-or-sell", "prepaid-plans"],
    serviceType: "Mobile phone sales",
    text: {
      en: {
        name: "Unlocked iPhones & Androids",
        metaTitle: "Unlocked iPhones & Androids in Houston — iPhone 18 Pro Max",
        metaDescription:
          "Buy a new unlocked iPhone 18 Pro Max, Samsung Galaxy or Android phone on Hillcroft in Houston. Leasing with no credit needed, subject to approval.",
        h1: "Unlocked iPhones & Android phones in Houston",
        intro:
          "Walk out with a new phone the same day. We carry unlocked iPhones — including the iPhone 18 Pro Max — plus Samsung Galaxy and other Android phones. Ask us which carriers each model works with, and we'll set it up on a compatible plan in store.",
        offersTitle: "What we offer",
        offers: [
          "New unlocked iPhones, including the iPhone 18 Pro Max and iPhone 17 Pro.",
          "Samsung Galaxy phones — including the Galaxy A15 5G, A16 5G, A36 5G and A53 — plus Motorola moto g and other unlocked Androids.",
          "Leasing (lease-to-own) with no credit needed — bad credit is OK, subject to approval.",
          "Weekly, biweekly or monthly payment options.",
          "Trade in your old phone toward a new one.",
          "Cases, tempered glass and chargers fitted before you leave.",
        ],
        links: [["iPhone 18 & iPhone 18 Pro Max in Houston", "/iphone-18"]],
        stepsTitle: "How it works",
        steps: [
          [
            "Call or walk in",
            "Stock changes often — call (713) 339-9300 to check a model, color or storage size, or just stop by.",
          ],
          [
            "Pick your phone",
            "Compare models in person and ask anything. Our team helps in English and Spanish.",
          ],
          [
            "Pay or lease",
            "Pay in full, or apply for leasing at the counter with a valid photo ID — it takes minutes.",
          ],
          [
            "Set up and go",
            "Choose a prepaid plan, transfer your number and leave with your new phone working.",
          ],
        ],
        why: [
          "Unlocked phones — no carrier lock-in",
          "No credit needed for leasing",
          "Same-day setup in store",
          `${RATING}★ on Google, ${REVIEW_COUNT} reviews`,
        ],
        faq: [
          {
            q: "Do you have the iPhone 18 Pro Max?",
            a: "Yes, the iPhone 18 Pro Max is available unlocked. Stock changes often, so call (713) 339-9300 to confirm the color and storage you want.",
          },
          {
            q: "Can I get an iPhone with bad credit?",
            a: "You can apply. We offer leasing (lease-to-own) on unlocked iPhones — including the iPhone 18 Pro Max — and Samsung Galaxy phones with no credit needed, from $40 initial payment. Bad credit isn't automatically a deal-breaker, though approval isn't guaranteed. Bring a valid photo ID; it takes a few minutes in store to find out.",
          },
          {
            q: "Will an unlocked phone work with my carrier?",
            a: "Unlocked phones work with any compatible carrier. We can set you up on Verizon Prepaid, AT&T Prepaid, T-Mobile Prepaid, Cricket, Simple Mobile and more in store.",
          },
        ],
        cta: "Check availability",
        ogKicker: "New phones",
        imageAlt:
          "A plum iPhone 18 Pro Max in front of its box at TIC Wireless Electronic & Repair Center",
      },
      es: {
        name: "iPhone y Android desbloqueados",
        metaTitle: "iPhone y Android Desbloqueados en Houston — iPhone 18 Pro Max",
        metaDescription:
          "Compra un iPhone 18 Pro Max, Samsung Galaxy o Android desbloqueado en Hillcroft, Houston. A pagos sin necesidad de crédito, sujeto a aprobación.",
        h1: "iPhone y celulares Android desbloqueados en Houston",
        intro:
          "Llévate tu celular nuevo el mismo día. Tenemos iPhone desbloqueados —incluyendo el iPhone 18 Pro Max— además de Samsung Galaxy y otros Android. Pregúntanos con qué compañías funciona cada modelo y te lo activamos en un plan compatible en la tienda.",
        offersTitle: "Lo que ofrecemos",
        offers: [
          "iPhone nuevos desbloqueados, incluyendo el iPhone 18 Pro Max y el iPhone 17 Pro.",
          "Samsung Galaxy —incluidos Galaxy A15 5G, A16 5G, A36 5G y A53— además de Motorola moto g y otros Android desbloqueados.",
          "Arrendamiento con opción a compra sin necesidad de crédito; con mal crédito también puedes aplicar, sujeto a aprobación.",
          "Opciones de pago semanales, quincenales o mensuales.",
          "Cambia tu celular usado por uno nuevo.",
          "Fundas, micas y cargadores instalados antes de irte.",
        ],
        links: [["iPhone 18 y iPhone 18 Pro Max en Houston", "/es/iphone-18"]],
        stepsTitle: "Cómo funciona",
        steps: [
          [
            "Llama o ven",
            "El inventario cambia seguido: llama al (713) 339-9300 para confirmar modelo, color o capacidad, o ven directamente.",
          ],
          [
            "Escoge tu celular",
            "Compara modelos en persona y pregunta lo que quieras. Te atendemos en español o inglés.",
          ],
          [
            "Paga de contado o a pagos",
            "Paga de contado o aplica al arrendamiento en el mostrador con una identificación con foto; toma minutos.",
          ],
          [
            "Configúralo y listo",
            "Elige un plan prepagado, pasa tu número y sal con tu celular funcionando.",
          ],
        ],
        why: [
          "Celulares desbloqueados, sin plazo forzoso",
          "Arrendamiento sin necesidad de crédito",
          "Configuración el mismo día",
          `${RATING}★ en Google, ${REVIEW_COUNT} reseñas`,
        ],
        faq: [
          {
            q: "¿Tienen el iPhone 18 Pro Max?",
            a: "Sí, el iPhone 18 Pro Max está disponible desbloqueado. El inventario cambia seguido; llama al (713) 339-9300 para confirmar color y capacidad.",
          },
          {
            q: "¿Puedo sacar un iPhone con mal crédito?",
            a: "Puedes aplicar. Tenemos arrendamiento con opción a compra en iPhone desbloqueados —incluyendo el iPhone 18 Pro Max— y Samsung Galaxy, sin necesidad de crédito y desde $40 de pago inicial. El mal crédito no es impedimento automático, aunque la aprobación no está garantizada. Trae una identificación con foto; en unos minutos en la tienda sabes si calificas.",
          },
          {
            q: "¿Un celular desbloqueado funciona con mi compañía?",
            a: "Los celulares desbloqueados funcionan con cualquier compañía compatible. Te activamos en Verizon Prepaid, AT&T Prepaid, T-Mobile Prepaid, Cricket, Simple Mobile y más en la tienda.",
          },
        ],
        cta: "Confirmar disponibilidad",
        ogKicker: "Celulares nuevos",
        imageAlt:
          "Un iPhone 18 Pro Max color ciruela frente a su caja en TIC Wireless Electronic & Repair Center",
      },
    },
  },
  {
    slug: "phone-repair",
    icon: "repair",
    photo: "repair",
    related: ["unlocked-phones", "phone-unlocking", "trade-in-or-sell"],
    serviceType: "Mobile phone repair",
    text: {
      en: {
        name: "Phone & device repair",
        metaTitle: "Same-Day Phone & Screen Repair on Hillcroft in Houston",
        metaDescription:
          "Cracked screen, dead battery or bad charging port? Same-day iPhone, Samsung & Android repair on Hillcroft in Houston. Walk in — quote before work starts.",
        h1: "iPhone, Samsung & device repair in Houston",
        intro:
          "Cracked iPhone or Samsung screen, a battery that won't last, or a phone that won't charge? Bring it to our store on Hillcroft in Houston — no appointment needed. We check it in front of you, quote the price before any work starts, and most phone repairs are done the same day.",
        offersTitle: "What we repair",
        offers: [
          "Cracked or broken screens on iPhone, Samsung and other Android phones.",
          "Battery replacement for phones that drain fast or shut off.",
          "Charging port repair when your phone won't charge or connect.",
          "Software problems and setup help.",
          "Tablet, laptop and computer repairs.",
          "Tempered glass and cases fitted after the repair.",
        ],
        stepsTitle: "How repairs work",
        steps: [
          [
            "Walk in",
            "No appointment needed during store hours. Call ahead with your model if you want a quote first.",
          ],
          [
            "Diagnosis in front of you",
            "We check the device with you there and explain what's wrong in plain language.",
          ],
          [
            "Price before work",
            "You get the price and time estimate before we start — no surprises.",
          ],
          [
            "Fixed, usually same day",
            "Most screen, battery and charging-port repairs are finished the same day.",
          ],
        ],
        why: [
          "Most repairs same day",
          "Price quoted before work starts",
          "iPhone, Samsung & Android",
          "English & Spanish",
        ],
        faq: [
          {
            q: "How much does a screen repair cost?",
            a: "It depends on your exact model. Call (713) 339-9300 with your phone model or stop by — we quote the price before any work starts.",
          },
          {
            q: "How long does a phone repair take?",
            a: "Most phone screen, battery and charging-port repairs are done the same day. We'll give you a time estimate when we check the phone.",
          },
          {
            q: "Do I need an appointment?",
            a: "No — just walk in during store hours: Monday–Saturday 9 AM–8 PM and Sunday 9 AM–5 PM.",
          },
          {
            q: "Do you fix Samsung Galaxy screens?",
            a: "Yes. We repair cracked or broken screens on Samsung Galaxy and other Android phones, as well as iPhone. Most screen repairs are done the same day — call (713) 339-9300 with your model for a quote.",
          },
          {
            q: "Can you fix my iPhone the same day?",
            a: "Most iPhone screen, battery and charging-port repairs are done the same day. We check the phone in front of you and give you the price and a time estimate before we start.",
          },
          {
            q: "Can you replace my phone's battery?",
            a: "Yes. We replace batteries on iPhone, Samsung and other Android phones that drain fast or shut off, usually the same day, and we quote the price before any work starts.",
          },
          {
            q: "My phone won't charge. Can you fix it?",
            a: "Yes, we repair charging ports and replace batteries. Walk in — no appointment needed — and we'll check it in front of you and quote the price first.",
          },
          {
            q: "Should I back up my phone first?",
            a: "If the screen still lets you, yes — back up to iCloud or Google before any repair, and bring your passcode so we can test the phone afterwards.",
          },
        ],
        cta: "Call for a repair quote",
        ogKicker: "Repairs",
        imageAlt:
          "Illustrative image of a technician repairing an opened smartphone with precision tools",
      },
      es: {
        name: "Reparación de celulares y equipos",
        metaTitle: "Reparación de Celulares el Mismo Día en Hillcroft, Houston",
        metaDescription:
          "¿Pantalla rota, batería que no dura o no carga? Reparamos iPhone, Samsung y Android el mismo día en Hillcroft, Houston. Precio antes de empezar.",
        h1: "Reparación de iPhone, Samsung y equipos en Houston",
        intro:
          "¿Pantalla rota de iPhone o Samsung, batería que no aguanta o celular que no carga? Tráelo a nuestra tienda en Hillcroft, Houston, sin cita. Lo revisamos frente a ti, te damos el precio antes de empezar y la mayoría de reparaciones quedan el mismo día.",
        offersTitle: "Lo que reparamos",
        offers: [
          "Pantallas rotas de iPhone, Samsung y otros Android.",
          "Cambio de batería para celulares que se descargan rápido o se apagan.",
          "Reparación del puerto de carga cuando el celular no carga o no conecta.",
          "Problemas de software y ayuda con la configuración.",
          "Reparación de tabletas, laptops y computadoras.",
          "Micas de vidrio templado y fundas después de la reparación.",
        ],
        stepsTitle: "Cómo funcionan las reparaciones",
        steps: [
          [
            "Ven sin cita",
            "No necesitas cita en horario de tienda. Llama antes con tu modelo si quieres una cotización.",
          ],
          [
            "Diagnóstico frente a ti",
            "Revisamos el equipo contigo presente y te explicamos la falla en palabras claras.",
          ],
          [
            "Precio antes de empezar",
            "Te damos el precio y el tiempo estimado antes de empezar, sin sorpresas.",
          ],
          [
            "Listo, casi siempre el mismo día",
            "La mayoría de pantallas, baterías y puertos de carga quedan el mismo día.",
          ],
        ],
        why: [
          "La mayoría, el mismo día",
          "Precio antes de empezar",
          "iPhone, Samsung y Android",
          "Español e inglés",
        ],
        faq: [
          {
            q: "¿Cuánto cuesta cambiar la pantalla?",
            a: "Depende de tu modelo. Llama al (713) 339-9300 con el modelo de tu celular o ven a la tienda; te damos el precio antes de empezar.",
          },
          {
            q: "¿Cuánto tarda una reparación?",
            a: "La mayoría de pantallas, baterías y puertos de carga quedan el mismo día. Te damos un tiempo estimado al revisar el celular.",
          },
          {
            q: "¿Necesito cita?",
            a: "No, solo ven en horario de tienda: lunes a sábado de 9 AM a 8 PM y domingo de 9 AM a 5 PM.",
          },
          {
            q: "¿Reparan pantallas de Samsung Galaxy?",
            a: "Sí. Reparamos pantallas rotas de Samsung Galaxy y otros Android, además de iPhone. La mayoría quedan el mismo día; llama al (713) 339-9300 con tu modelo para cotizar.",
          },
          {
            q: "¿Pueden reparar mi iPhone el mismo día?",
            a: "La mayoría de reparaciones de pantalla, batería y puerto de carga de iPhone quedan el mismo día. Revisamos el celular frente a ti y te damos el precio y el tiempo estimado antes de empezar.",
          },
          {
            q: "¿Pueden cambiar la batería de mi celular?",
            a: "Sí. Cambiamos baterías de iPhone, Samsung y otros Android que se descargan rápido o se apagan, normalmente el mismo día, y te damos el precio antes de empezar.",
          },
          {
            q: "Mi celular no carga. ¿Lo pueden arreglar?",
            a: "Sí, reparamos puertos de carga y cambiamos baterías. Ven sin cita: lo revisamos frente a ti y te damos el precio primero.",
          },
          {
            q: "¿Debo respaldar mi celular antes?",
            a: "Si la pantalla todavía te deja, sí: respalda en iCloud o Google antes de cualquier reparación y trae tu código para probar el celular al final.",
          },
        ],
        cta: "Llamar para cotizar",
        ogKicker: "Reparaciones",
        imageAlt:
          "Imagen ilustrativa de un técnico reparando un celular abierto con herramientas de precisión",
      },
    },
  },
  {
    slug: "iphone-repair",
    icon: "repair",
    photo: "otterbox",
    related: ["phone-repair", "samsung-repair", "unlocked-phones"],
    serviceType: "iPhone repair",
    text: {
      en: {
        name: "iPhone repair",
        metaTitle: "iPhone Screen & Battery Repair in Houston — Same Day",
        metaDescription:
          "Cracked iPhone screen, weak battery or won't charge? iPhone repair on Hillcroft in Houston — most done the same day, price quoted before work. Walk in.",
        h1: "iPhone repair in Houston, on Hillcroft",
        intro:
          "Cracked iPhone screen, a battery that won't last the day, or an iPhone that won't charge? Walk in to our store at 3640 Hillcroft St — no appointment needed. We check your iPhone in front of you, quote the price before any work starts, and most screen, battery and charging-port repairs are done the same day.",
        offersTitle: "iPhone repairs we do",
        offers: [
          "Cracked or broken iPhone screens.",
          "iPhone battery replacement when it drains fast or shuts off.",
          "Charging port repair when your iPhone won't charge or connect.",
          "Software problems and setup help.",
          "Tell us your model — for example an iPhone 14 Pro Max, iPhone 17 Pro or iPhone 18 Pro Max — and we'll confirm the repair and the price before we start.",
          "Tempered glass and a case fitted after the repair.",
        ],
        links: [
          ["All phone repairs", "/services/phone-repair"],
          ["Samsung Galaxy repair", "/services/samsung-repair"],
        ],
        stepsTitle: "How iPhone repair works",
        steps: [
          [
            "Walk in",
            "No appointment needed during store hours. Call (713) 339-9300 with your iPhone model if you want a quote first.",
          ],
          [
            "Checked in front of you",
            "We look at your iPhone with you there and explain what's wrong in plain language.",
          ],
          [
            "Price before work",
            "You get the price and a time estimate before we start — no surprises.",
          ],
          [
            "Fixed, usually same day",
            "Most iPhone screen, battery and charging-port repairs are finished the same day.",
          ],
        ],
        why: [
          "Most repairs same day",
          "Price quoted before work starts",
          "Walk in, no appointment",
          "English & Spanish",
        ],
        faq: [
          {
            q: "How much does an iPhone screen repair cost?",
            a: "It depends on your exact iPhone model. Call (713) 339-9300 with your model or stop by — we quote the price before any work starts.",
          },
          {
            q: "Can you fix my iPhone the same day?",
            a: "Most iPhone screen, battery and charging-port repairs are done the same day. We check the phone in front of you and give you the price and a time estimate before we start.",
          },
          {
            q: "Can you fix my iPhone model?",
            a: "Call (713) 339-9300 with your exact model or bring the iPhone in. We'll check it and tell you whether we can do the repair, and the price, before any work starts.",
          },
          {
            q: "Can you replace my iPhone battery?",
            a: "Yes. We replace iPhone batteries that drain fast or shut off, usually the same day, and we quote the price before any work starts.",
          },
          {
            q: "My iPhone won't charge. Can you fix it?",
            a: "We repair charging ports and replace batteries. Walk in — no appointment needed — and we'll check it in front of you and quote the price first.",
          },
          {
            q: "Do I need an appointment?",
            a: "No — just walk in during store hours: Monday–Saturday 9 AM–8 PM and Sunday 9 AM–5 PM.",
          },
          {
            q: "Should I back up my iPhone first?",
            a: "If the screen still lets you, yes — back up to iCloud before any repair, and bring your passcode so we can test the iPhone afterwards.",
          },
        ],
        cta: "Call for an iPhone repair quote",
        ogKicker: "iPhone repair",
        imageAlt: "A boxed iPhone and a Drop+ MagSafe case on the display case at TIC Wireless",
      },
      es: {
        name: "Reparación de iPhone",
        metaTitle: "Reparación de iPhone en Houston — Pantalla y Batería",
        metaDescription:
          "¿Pantalla de iPhone rota, batería que no dura o no carga? Reparamos iPhone en Hillcroft, Houston; la mayoría el mismo día y con precio antes de empezar.",
        h1: "Reparación de iPhone en Houston, en Hillcroft",
        intro:
          "¿Pantalla de iPhone rota, batería que no aguanta el día o un iPhone que no carga? Ven a nuestra tienda en 3640 Hillcroft St, sin cita. Revisamos tu iPhone frente a ti, te damos el precio antes de empezar y la mayoría de reparaciones de pantalla, batería y puerto de carga quedan el mismo día.",
        offersTitle: "Reparaciones de iPhone",
        offers: [
          "Pantallas de iPhone rotas o estrelladas.",
          "Cambio de batería de iPhone cuando se descarga rápido o se apaga.",
          "Reparación del puerto de carga cuando tu iPhone no carga o no conecta.",
          "Problemas de software y ayuda con la configuración.",
          "Dinos tu modelo —por ejemplo iPhone 14 Pro Max, iPhone 17 Pro o iPhone 18 Pro Max— y te confirmamos la reparación y el precio antes de empezar.",
          "Mica de vidrio templado y funda después de la reparación.",
        ],
        links: [
          ["Todas las reparaciones", "/es/servicios/phone-repair"],
          ["Reparación de Samsung Galaxy", "/es/servicios/samsung-repair"],
        ],
        stepsTitle: "Cómo funciona la reparación de iPhone",
        steps: [
          [
            "Ven sin cita",
            "No necesitas cita en horario de tienda. Llama al (713) 339-9300 con el modelo de tu iPhone si quieres una cotización antes.",
          ],
          [
            "Revisión frente a ti",
            "Revisamos tu iPhone contigo presente y te explicamos la falla en palabras claras.",
          ],
          [
            "Precio antes de empezar",
            "Te damos el precio y el tiempo estimado antes de empezar, sin sorpresas.",
          ],
          [
            "Listo, casi siempre el mismo día",
            "La mayoría de reparaciones de pantalla, batería y puerto de carga de iPhone quedan el mismo día.",
          ],
        ],
        why: [
          "La mayoría, el mismo día",
          "Precio antes de empezar",
          "Ven sin cita",
          "Español e inglés",
        ],
        faq: [
          {
            q: "¿Cuánto cuesta cambiar la pantalla de un iPhone?",
            a: "Depende del modelo exacto de tu iPhone. Llama al (713) 339-9300 con tu modelo o ven a la tienda; te damos el precio antes de empezar.",
          },
          {
            q: "¿Pueden reparar mi iPhone el mismo día?",
            a: "La mayoría de reparaciones de pantalla, batería y puerto de carga de iPhone quedan el mismo día. Revisamos el celular frente a ti y te damos el precio y el tiempo estimado antes de empezar.",
          },
          {
            q: "¿Reparan mi modelo de iPhone?",
            a: "Llama al (713) 339-9300 con tu modelo exacto o trae el iPhone. Lo revisamos y te decimos si podemos hacer la reparación, y el precio, antes de empezar.",
          },
          {
            q: "¿Pueden cambiar la batería de mi iPhone?",
            a: "Sí. Cambiamos baterías de iPhone que se descargan rápido o se apagan, normalmente el mismo día, y te damos el precio antes de empezar.",
          },
          {
            q: "Mi iPhone no carga. ¿Lo pueden arreglar?",
            a: "Reparamos puertos de carga y cambiamos baterías. Ven sin cita: lo revisamos frente a ti y te damos el precio primero.",
          },
          {
            q: "¿Necesito cita?",
            a: "No, solo ven en horario de tienda: lunes a sábado de 9 AM a 8 PM y domingo de 9 AM a 5 PM.",
          },
          {
            q: "¿Debo respaldar mi iPhone antes?",
            a: "Si la pantalla todavía te deja, sí: respalda en iCloud antes de cualquier reparación y trae tu código para probar el iPhone al final.",
          },
        ],
        cta: "Llamar para cotizar",
        ogKicker: "Reparación de iPhone",
        imageAlt: "Un iPhone en caja y una funda Drop+ MagSafe en la vitrina de TIC Wireless",
      },
    },
  },
  {
    slug: "samsung-repair",
    icon: "repair",
    photo: "s22",
    related: ["phone-repair", "iphone-repair", "unlocked-phones"],
    serviceType: "Samsung Galaxy and Android phone repair",
    text: {
      en: {
        name: "Samsung Galaxy repair",
        metaTitle: "Samsung Galaxy Screen Repair in Houston — Same Day",
        metaDescription:
          "Cracked Galaxy screen, weak battery or bad charging port? Samsung & Android repair on Hillcroft in Houston, most done same day. Price quoted before work.",
        h1: "Samsung Galaxy & Android repair in Houston",
        intro:
          "Cracked Samsung Galaxy screen, a battery that drains fast, or a phone that won't charge? Walk in to our store at 3640 Hillcroft St — no appointment needed. We repair Samsung Galaxy and other Android phones: we check yours in front of you, quote the price before any work starts, and most screen, battery and charging-port repairs are done the same day.",
        offersTitle: "Galaxy & Android repairs we do",
        offers: [
          "Cracked or broken Samsung Galaxy screens.",
          "Battery replacement for Galaxy and other Android phones that drain fast or shut off.",
          "Charging port repair when your phone won't charge or connect.",
          "Software problems and setup help.",
          "Tell us your model — Galaxy S, A, Note or Z Flip, or another Android phone — and we'll confirm the repair and the price before we start.",
          "Tempered glass and a case fitted after the repair.",
        ],
        links: [
          ["All phone repairs", "/services/phone-repair"],
          ["iPhone repair", "/services/iphone-repair"],
        ],
        stepsTitle: "How Galaxy repair works",
        steps: [
          [
            "Walk in",
            "No appointment needed during store hours. Call (713) 339-9300 with your Galaxy model if you want a quote first.",
          ],
          [
            "Checked in front of you",
            "We look at your phone with you there and explain what's wrong in plain language.",
          ],
          [
            "Price before work",
            "You get the price and a time estimate before we start — no surprises.",
          ],
          [
            "Fixed, usually same day",
            "Most Galaxy screen, battery and charging-port repairs are finished the same day.",
          ],
        ],
        why: [
          "Most repairs same day",
          "Price quoted before work starts",
          "Samsung Galaxy & Android",
          "English & Spanish",
        ],
        faq: [
          {
            q: "How much does a Samsung screen repair cost?",
            a: "It depends on your exact Galaxy model. Call (713) 339-9300 with your model or stop by — we quote the price before any work starts.",
          },
          {
            q: "Do you fix Samsung Galaxy screens the same day?",
            a: "Most Galaxy screen, battery and charging-port repairs are done the same day. We check the phone in front of you and give you the price and a time estimate before we start.",
          },
          {
            q: "Can you fix my Galaxy model?",
            a: "Call (713) 339-9300 with your exact model — Galaxy S, A, Note, Z Flip or another Android phone — or bring it in. We'll check it and tell you whether we can do the repair, and the price, before any work starts.",
          },
          {
            q: "Can you replace my Samsung battery?",
            a: "Yes. We replace batteries on Samsung Galaxy and other Android phones that drain fast or shut off, usually the same day, and we quote the price before any work starts.",
          },
          {
            q: "My Galaxy won't charge. Can you fix it?",
            a: "We repair charging ports and replace batteries. Walk in — no appointment needed — and we'll check it in front of you and quote the price first.",
          },
          {
            q: "Do I need an appointment?",
            a: "No — just walk in during store hours: Monday–Saturday 9 AM–8 PM and Sunday 9 AM–5 PM.",
          },
          {
            q: "Should I back up my phone first?",
            a: "If the screen still lets you, yes — back up to your Google or Samsung account before any repair, and bring your PIN or pattern so we can test the phone afterwards.",
          },
        ],
        cta: "Call for a Galaxy repair quote",
        ogKicker: "Samsung repair",
        imageAlt:
          "A Samsung Galaxy S22 Ultra in its box next to a rugged ring-stand case at TIC Wireless",
      },
      es: {
        name: "Reparación de Samsung Galaxy",
        metaTitle: "Reparación de Samsung Galaxy en Houston — Mismo Día",
        metaDescription:
          "¿Pantalla de Galaxy rota, batería que no dura o no carga? Reparamos Samsung y Android en Hillcroft, Houston, casi siempre el mismo día. Precio antes de empezar.",
        h1: "Reparación de Samsung Galaxy y Android en Houston",
        intro:
          "¿Pantalla de Samsung Galaxy rota, batería que se descarga rápido o un celular que no carga? Ven a nuestra tienda en 3640 Hillcroft St, sin cita. Reparamos Samsung Galaxy y otros Android: revisamos el tuyo frente a ti, te damos el precio antes de empezar y la mayoría de reparaciones de pantalla, batería y puerto de carga quedan el mismo día.",
        offersTitle: "Reparaciones de Galaxy y Android",
        offers: [
          "Pantallas de Samsung Galaxy rotas o estrelladas.",
          "Cambio de batería para Galaxy y otros Android que se descargan rápido o se apagan.",
          "Reparación del puerto de carga cuando el celular no carga o no conecta.",
          "Problemas de software y ayuda con la configuración.",
          "Dinos tu modelo —Galaxy S, A, Note o Z Flip, u otro Android— y te confirmamos la reparación y el precio antes de empezar.",
          "Mica de vidrio templado y funda después de la reparación.",
        ],
        links: [
          ["Todas las reparaciones", "/es/servicios/phone-repair"],
          ["Reparación de iPhone", "/es/servicios/iphone-repair"],
        ],
        stepsTitle: "Cómo funciona la reparación de Galaxy",
        steps: [
          [
            "Ven sin cita",
            "No necesitas cita en horario de tienda. Llama al (713) 339-9300 con el modelo de tu Galaxy si quieres una cotización antes.",
          ],
          [
            "Revisión frente a ti",
            "Revisamos tu celular contigo presente y te explicamos la falla en palabras claras.",
          ],
          [
            "Precio antes de empezar",
            "Te damos el precio y el tiempo estimado antes de empezar, sin sorpresas.",
          ],
          [
            "Listo, casi siempre el mismo día",
            "La mayoría de reparaciones de pantalla, batería y puerto de carga de Galaxy quedan el mismo día.",
          ],
        ],
        why: [
          "La mayoría, el mismo día",
          "Precio antes de empezar",
          "Samsung Galaxy y Android",
          "Español e inglés",
        ],
        faq: [
          {
            q: "¿Cuánto cuesta cambiar la pantalla de un Samsung?",
            a: "Depende del modelo exacto de tu Galaxy. Llama al (713) 339-9300 con tu modelo o ven a la tienda; te damos el precio antes de empezar.",
          },
          {
            q: "¿Reparan pantallas de Samsung Galaxy el mismo día?",
            a: "La mayoría de reparaciones de pantalla, batería y puerto de carga de Galaxy quedan el mismo día. Revisamos el celular frente a ti y te damos el precio y el tiempo estimado antes de empezar.",
          },
          {
            q: "¿Reparan mi modelo de Galaxy?",
            a: "Llama al (713) 339-9300 con tu modelo exacto —Galaxy S, A, Note, Z Flip u otro Android— o tráelo. Lo revisamos y te decimos si podemos hacer la reparación, y el precio, antes de empezar.",
          },
          {
            q: "¿Pueden cambiar la batería de mi Samsung?",
            a: "Sí. Cambiamos baterías de Samsung Galaxy y otros Android que se descargan rápido o se apagan, normalmente el mismo día, y te damos el precio antes de empezar.",
          },
          {
            q: "Mi Galaxy no carga. ¿Lo pueden arreglar?",
            a: "Reparamos puertos de carga y cambiamos baterías. Ven sin cita: lo revisamos frente a ti y te damos el precio primero.",
          },
          {
            q: "¿Necesito cita?",
            a: "No, solo ven en horario de tienda: lunes a sábado de 9 AM a 8 PM y domingo de 9 AM a 5 PM.",
          },
          {
            q: "¿Debo respaldar mi celular antes?",
            a: "Si la pantalla todavía te deja, sí: respalda en tu cuenta de Google o Samsung antes de cualquier reparación y trae tu PIN o patrón para probar el celular al final.",
          },
        ],
        cta: "Llamar para cotizar",
        ogKicker: "Reparación de Samsung",
        imageAlt:
          "Un Samsung Galaxy S22 Ultra en su caja junto a una funda resistente con anillo en TIC Wireless",
      },
    },
  },
  {
    slug: "prepaid-plans",
    icon: "plans",
    photo: "counter",
    related: ["bill-payments", "phone-unlocking", "international-recharge"],
    serviceType: "Prepaid mobile phone plans",
    text: {
      en: {
        name: "Prepaid phone plans",
        metaTitle: `Prepaid Plans in Houston — Compare ${CARRIER_COUNT} Carriers from $10/mo`,
        metaDescription:
          "Compare T-Mobile, Verizon, AT&T, Cricket, Simple Mobile, Tracfone, H2O, Lyca & Gen Mobile prepaid plans and prices. Unlimited from $35/mo. On Hillcroft.",
        h1: `Prepaid phone plans in Houston — ${CARRIER_COUNT} carriers`,
        intro:
          "Compare prepaid plans from the major carriers at one counter, get set up in store, and keep your number. Prepaid means no contract, no credit check and no surprise bills.",
        offersTitle: "Carriers we offer",
        offers: [
          `${CARRIERS}.`,
          "New activations and switching carriers — keep your number when you transfer.",
          "Help choosing the right plan for how much data you actually use.",
          "Monthly plan payments in store with no extra charges.",
          "International recharge for family abroad.",
          "Xfinity Prepaid home internet.",
        ],
        stepsTitle: "Switching is simple",
        steps: [
          [
            "Keep your old line active",
            "Don't cancel first — your number transfers from the active account.",
          ],
          [
            "Bring your account info",
            "Have your current account number and number-transfer PIN ready.",
          ],
          [
            "Pick a plan",
            "We compare current plans with you; prices change, so we'll show you today's options.",
          ],
          [
            "Activate in store",
            "We activate the new service and make sure calls and data work before you leave.",
          ],
        ],
        why: [
          `${CARRIER_COUNT} prepaid carriers`,
          "No contract, no credit check",
          "Keep your number",
          "Se habla español",
        ],
        faq: [
          {
            q: "Which prepaid carriers do you have?",
            a: `${CARRIERS} — plus Xfinity Prepaid home internet.`,
          },
          {
            q: "How much are prepaid plans?",
            a: "Plans start at $10/mo (Gen Mobile, 2GB). Unlimited data starts at $35/mo with AutoPay (Cricket Select Unlimited), and most unlimited plans with hotspot run $45–$60/mo. See every plan above — prices change, so we confirm today's price before you pay.",
          },
          {
            q: "Is there a Cricket or T-Mobile Prepaid store near me?",
            a: `We activate Cricket and T-Mobile Prepaid plans, plus ${CARRIER_COUNT - 2} other prepaid carriers, at 3640 Hillcroft St, Suite C, Houston, TX 77057 — near Hillcroft & Windswept in Southwest Houston. Walk in during store hours; no appointment needed.`,
          },
          {
            q: "Can I keep my phone number?",
            a: "Usually, yes. Keep your old line active until the transfer is done and bring your account number and transfer PIN. Your phone also needs to be unlocked for a different network.",
          },
        ],
        cta: "Compare plans in store",
        ogKicker: "Prepaid plans",
        imageAlt: "The counter at TIC Wireless Electronic & Repair Center with carrier displays",
      },
      es: {
        name: "Planes prepagados",
        metaTitle: `Planes Prepagados en Houston — ${CARRIER_COUNT} Compañías desde $10/mes`,
        metaDescription:
          "Compara planes y precios de T-Mobile, Verizon, AT&T, Cricket, Simple Mobile, Tracfone, H2O, Lyca y Gen Mobile. Ilimitados desde $35/mes. En Hillcroft.",
        h1: `Planes prepagados en Houston — ${CARRIER_COUNT} compañías`,
        intro:
          "Compara planes prepagados de las principales compañías en un solo mostrador, actívalo en la tienda y conserva tu número. Prepagado significa sin contrato, sin revisión de crédito y sin sorpresas.",
        offersTitle: "Compañías que manejamos",
        offers: [
          `${carrierList("es")}.`,
          "Activaciones nuevas y cambio de compañía, conservando tu número.",
          "Te ayudamos a elegir el plan según los datos que realmente usas.",
          "Pago mensual del plan en la tienda sin cargos extra.",
          "Recargas internacionales para tu familia.",
          "Internet prepagado Xfinity para tu casa.",
        ],
        stepsTitle: "Cambiarte es fácil",
        steps: [
          [
            "Mantén activa tu línea",
            "No canceles primero: tu número se transfiere desde la cuenta activa.",
          ],
          [
            "Trae los datos de tu cuenta",
            "Ten a la mano tu número de cuenta y el PIN de transferencia.",
          ],
          [
            "Elige un plan",
            "Comparamos los planes contigo; los precios cambian, así que te mostramos las opciones de hoy.",
          ],
          [
            "Actívalo en la tienda",
            "Activamos tu servicio y verificamos llamadas y datos antes de que te vayas.",
          ],
        ],
        why: [
          `${CARRIER_COUNT} compañías prepagadas`,
          "Sin contrato ni crédito",
          "Conserva tu número",
          "We speak English",
        ],
        faq: [
          {
            q: "¿Qué compañías prepagadas tienen?",
            a: `${carrierList("es")}, además de internet prepagado Xfinity.`,
          },
          {
            q: "¿Cuánto cuestan los planes?",
            a: "Hay planes desde $10/mes (Gen Mobile, 2GB). Los datos ilimitados empiezan en $35/mes con AutoPay (Cricket Select Unlimited) y la mayoría de los ilimitados con hotspot cuestan entre $45 y $60/mes. Mira todos los planes arriba; los precios cambian, así que confirmamos el precio del día antes de que pagues.",
          },
          {
            q: "¿Hay una tienda de Cricket o T-Mobile Prepaid cerca de mí?",
            a: `Activamos planes de Cricket y T-Mobile Prepaid, además de otras ${CARRIER_COUNT - 2} compañías prepagadas, en 3640 Hillcroft St, Suite C, Houston, TX 77057, cerca de Hillcroft y Windswept en el suroeste de Houston. Ven en horario de tienda; no necesitas cita.`,
          },
          {
            q: "¿Puedo conservar mi número?",
            a: "Normalmente sí. Mantén activa tu línea vieja hasta terminar la transferencia y trae tu número de cuenta y PIN. Tu celular también debe estar liberado para otra red.",
          },
        ],
        cta: "Comparar planes en la tienda",
        ogKicker: "Planes prepagados",
        imageAlt:
          "El mostrador de TIC Wireless Electronic & Repair Center con exhibidores de compañías",
      },
    },
  },
  {
    slug: "xfinity-prepaid-internet",
    icon: "internet",
    photo: "xfinity",
    related: ["prepaid-plans", "bill-payments", "unlocked-phones"],
    serviceType: "Prepaid home internet",
    // Plans and terms from Xfinity's prepaid internet page (checked 2026-11-10); see xfinity-section.tsx.
    text: {
      en: {
        name: "Xfinity Prepaid internet",
        metaTitle: "Xfinity Prepaid Internet in Houston — From $30/mo",
        metaDescription:
          "Xfinity Prepaid home internet on Hillcroft in Houston: 100 Mbps for $30/mo or 200 Mbps for $45/mo, WiFi equipment, taxes and fees included. No credit check, no annual contract.",
        h1: "Xfinity Prepaid home internet in Houston",
        intro:
          "Home internet on the Xfinity network, prepaid: 100 Mbps for $30/mo or 200 Mbps for $45/mo, with WiFi equipment, unlimited data, and taxes and fees included. No credit check and no annual contract — and we help you get set up in store, in English or Spanish.",
        offersTitle: "What we help with",
        offers: [
          "Xfinity Prepaid internet starter kits, sold in store.",
          "Help activating your service in the Xfinity app.",
          "Checking whether Xfinity Prepaid is available at your address.",
          "WiFi-ready phones, tablets and laptops if you need a new device.",
          "Prepaid phone plans to go with your home internet.",
        ],
        stepsTitle: "Getting connected",
        steps: [
          ["Check your address", "Xfinity Prepaid isn't available everywhere — bring your address or call ahead."],
          ["Get your kit in store", "Pick up the starter kit with the WiFi gateway, and pick 100 or 200 Mbps."],
          ["Plug in and activate", "Self-install in minutes and activate in the Xfinity app — we can help."],
          ["Stay connected", "Autopay keeps you online. Turn autopay off to pause, and back on to resume."],
        ],
        why: ["From $30/mo", "No credit check", "No annual contract", "Set up help in store"],
        faq: [
          {
            q: "What is Xfinity Prepaid internet?",
            a: "Prepaid high-speed home internet on the Xfinity network. There's no credit check and no annual contract, you pay ahead each month, and you get unlimited data and WiFi equipment you don't have to return.",
          },
          {
            q: "What plans are there, and how much are they?",
            a: "Two speeds: 100 Mbps for $30/month, good for everyday browsing, music and social media, or 200 Mbps for $45/month for smoother streaming. Taxes and fees are included in the monthly price. Prices are set by Xfinity and can change.",
          },
          {
            q: "How fast is it?",
            a: "Up to 100 or 200 Mbps download, depending on your plan, and up to 10 Mbps upload. Actual speeds vary and are not guaranteed.",
          },
          {
            q: "Is it fast enough for streaming and gaming?",
            a: "For most homes, yes — including streaming, gaming and video calls on several devices at once. It's a wired connection, so speeds stay consistent with low lag, unlike 5G home internet.",
          },
          {
            q: "Can I upgrade my speed later?",
            a: "Yes. You can upgrade from 100 Mbps to 200 Mbps instantly from the Plans page of your account, or move to a faster Xfinity internet plan where it's available.",
          },
          {
            q: "Do I need a credit check or a contract?",
            a: "No. There's no credit check and no annual contract.",
          },
          {
            q: "How do I set it up?",
            a: "It's self-install: plug in the WiFi gateway that comes in the starter kit (a refurbished gateway) and activate your service in the Xfinity app in minutes. We're happy to help you activate it in store.",
          },
          {
            q: "How do I pay each month?",
            a: "Xfinity takes monthly payments online only, by credit, debit or prepaid card, and autopay and paperless billing are required. We can help you set that up when you activate.",
          },
          {
            q: "Can I pause my service?",
            a: "Yes. Turn off autopay and your service and payments pause until you turn it back on — handy for a seasonal home or rental.",
          },
          {
            q: "Is there a money-back guarantee?",
            a: "No. Xfinity's 30-day money-back guarantee doesn't apply to prepaid internet service, and service is limited to a single outlet.",
          },
          {
            q: "Is Xfinity Prepaid available at my address?",
            a: "It's not available in all areas. Bring your address or call (713) 339-9300 and we'll help you check before you buy.",
          },
        ],
        cta: "Ask about Xfinity Prepaid",
        ogKicker: "Xfinity Prepaid",
        imageAlt: "Xfinity prepaid internet starter kit box with the WiFi gateway that comes in it",
      },
      es: {
        name: "Internet prepagado Xfinity",
        metaTitle: "Internet Prepagado Xfinity en Houston — Desde $30/mes",
        metaDescription:
          "Internet prepagado Xfinity en Hillcroft, Houston: 100 Mbps por $30/mes o 200 Mbps por $45/mes, con equipo WiFi, impuestos y cargos incluidos. Sin revisión de crédito ni contrato anual.",
        h1: "Internet prepagado Xfinity en Houston",
        intro:
          "Internet para tu casa en la red de Xfinity, prepagado: 100 Mbps por $30/mes o 200 Mbps por $45/mes, con equipo WiFi, datos ilimitados, e impuestos y cargos incluidos. Sin revisión de crédito ni contrato anual, y te ayudamos a activarlo en la tienda, en español o inglés.",
        offersTitle: "En qué te ayudamos",
        offers: [
          "Kits de inicio de internet prepagado Xfinity, a la venta en la tienda.",
          "Ayuda para activar tu servicio en la app de Xfinity.",
          "Verificamos si Xfinity Prepaid está disponible en tu domicilio.",
          "Celulares, tabletas y laptops con WiFi si necesitas un equipo nuevo.",
          "Planes prepagados de celular para complementar tu internet.",
        ],
        stepsTitle: "Cómo conectarte",
        steps: [
          ["Verifica tu domicilio", "Xfinity Prepaid no está disponible en todas partes: trae tu dirección o llámanos antes."],
          ["Recoge tu kit en la tienda", "Llévate el kit de inicio con el módem WiFi y elige 100 o 200 Mbps."],
          ["Conéctalo y actívalo", "Lo instalas tú en minutos y lo activas en la app de Xfinity; te ayudamos."],
          ["Sigue conectado", "El pago automático te mantiene en línea. Desactívalo para pausar y actívalo para continuar."],
        ],
        why: ["Desde $30/mes", "Sin revisión de crédito", "Sin contrato anual", "Ayuda en la tienda"],
        faq: [
          {
            q: "¿Qué es el internet prepagado Xfinity?",
            a: "Internet de alta velocidad prepagado para tu casa, en la red de Xfinity. Sin revisión de crédito ni contrato anual: pagas por adelantado cada mes e incluye datos ilimitados y equipo WiFi que no tienes que devolver.",
          },
          {
            q: "¿Qué planes hay y cuánto cuestan?",
            a: "Dos velocidades: 100 Mbps por $30 al mes, ideal para navegar, música y redes sociales, o 200 Mbps por $45 al mes para streaming más fluido. Los impuestos y cargos están incluidos en el precio mensual. Xfinity fija los precios y pueden cambiar.",
          },
          {
            q: "¿Qué tan rápido es?",
            a: "Hasta 100 o 200 Mbps de descarga, según tu plan, y hasta 10 Mbps de subida. La velocidad real varía y no está garantizada.",
          },
          {
            q: "¿Es suficiente para streaming y juegos?",
            a: "Para la mayoría de los hogares, sí, incluso streaming, juegos y videollamadas en varios equipos a la vez. Es una conexión por cable, así que la velocidad es constante y con poca latencia, a diferencia del internet 5G.",
          },
          {
            q: "¿Puedo subir de velocidad después?",
            a: "Sí. Puedes cambiar de 100 a 200 Mbps al instante en la página de Planes de tu cuenta, o pasarte a un plan de internet más rápido de Xfinity donde esté disponible.",
          },
          {
            q: "¿Necesito revisión de crédito o contrato?",
            a: "No. No hay revisión de crédito ni contrato anual.",
          },
          {
            q: "¿Cómo lo instalo?",
            a: "Lo instalas tú: conecta el módem WiFi que viene en el kit de inicio (un módem reacondicionado) y activa tu servicio en la app de Xfinity en minutos. Con gusto te ayudamos a activarlo en la tienda.",
          },
          {
            q: "¿Cómo pago cada mes?",
            a: "Xfinity recibe los pagos mensuales solo en línea, con tarjeta de crédito, débito o prepagada, y se requiere pago automático y factura sin papel. Te ayudamos a configurarlo al activarlo.",
          },
          {
            q: "¿Puedo pausar mi servicio?",
            a: "Sí. Desactiva el pago automático y tu servicio y tus pagos se pausan hasta que lo vuelvas a activar; útil para una casa de temporada o una propiedad en renta.",
          },
          {
            q: "¿Hay garantía de devolución?",
            a: "No. La garantía de devolución de 30 días de Xfinity no aplica al internet prepagado, y el servicio es para una sola toma.",
          },
          {
            q: "¿Xfinity Prepaid está disponible en mi domicilio?",
            a: "No está disponible en todas las zonas. Trae tu dirección o llama al (713) 339-9300 y te ayudamos a verificarlo antes de comprar.",
          },
        ],
        cta: "Preguntar por Xfinity Prepaid",
        ogKicker: "Xfinity Prepaid",
        imageAlt: "Caja del kit de inicio de internet prepagado Xfinity con el módem WiFi que incluye",
      },
    },
  },
  {
    slug: "phone-unlocking",
    icon: "unlock",
    photo: "simTray",
    related: ["prepaid-plans", "phone-repair", "unlocked-phones"],
    serviceType: "Mobile phone unlocking",
    text: {
      en: {
        name: "Phone unlocking",
        metaTitle: "Phone Unlocking in Houston — Switch to the Carrier You Want",
        metaDescription:
          "Unlock your iPhone or Android phone on Hillcroft in Houston and switch to the carrier you want. We check your phone first. Walk in, no appointment.",
        h1: "Phone unlocking in Houston",
        intro:
          "A carrier-locked phone only works with the carrier that sold it. We unlock phones so you can use the carrier you choose — and we check your phone first so you know where you stand.",
        offersTitle: "How we help",
        offers: [
          "Unlocking for iPhone and Android phones.",
          "A quick check of your phone's lock status at the counter.",
          "Switching you to a new prepaid carrier once your phone is unlocked.",
          "Keeping your number when you change carriers.",
          "Unlocked phones for sale if yours can't be unlocked.",
        ],
        stepsTitle: "How unlocking works",
        steps: [
          ["Bring your phone", "Walk in during store hours — no appointment needed."],
          ["We check it", "We look at the lock status and what your carrier requires."],
          ["Unlock", "We walk you through unlocking so the phone works with other carriers."],
          ["Switch if you want", "Pick a prepaid plan and we activate it in store."],
        ],
        why: [
          "iPhone & Android",
          "Lock status checked first",
          "Switch carriers in store",
          "Se habla español",
        ],
        faq: [
          {
            q: "How do I know if my phone is locked?",
            a: "On iPhone, go to Settings → General → About and look for “Carrier Lock” — “No SIM restrictions” means it's unlocked. On Android, the simplest test is a SIM from another carrier. Or bring it in and we'll check.",
          },
          {
            q: "Can every phone be unlocked?",
            a: "Carriers set their own rules — usually the phone must be paid off and not reported lost or stolen. We check your phone first and tell you your options.",
          },
          {
            q: "Will unlocking erase my phone?",
            a: "Unlocking doesn't normally erase your data, but always back up first, especially before switching SIMs or carriers.",
          },
        ],
        cta: "Ask about unlocking",
        ogKicker: "Unlocking",
        imageAlt: "A phone showing the Insert SIM card screen with its SIM tray ejected",
      },
      es: {
        name: "Liberación de celulares",
        metaTitle: "Liberación de Celulares en Houston — Cámbiate de Compañía",
        metaDescription:
          "Libera tu iPhone o Android en Hillcroft, Houston, y cámbiate a la compañía que quieras. Primero revisamos tu celular. Ven sin cita.",
        h1: "Liberación de celulares en Houston",
        intro:
          "Un celular bloqueado solo funciona con la compañía que lo vendió. Liberamos celulares para que uses la compañía que quieras, y primero revisamos el tuyo para que sepas tus opciones.",
        offersTitle: "Cómo te ayudamos",
        offers: [
          "Liberación de iPhone y celulares Android.",
          "Revisión rápida del estado de bloqueo en el mostrador.",
          "Cambio a una nueva compañía prepagada una vez liberado.",
          "Conservas tu número al cambiarte de compañía.",
          "Celulares desbloqueados a la venta si el tuyo no se puede liberar.",
        ],
        stepsTitle: "Cómo funciona la liberación",
        steps: [
          ["Trae tu celular", "Ven en horario de tienda, sin cita."],
          ["Lo revisamos", "Vemos el estado de bloqueo y lo que pide tu compañía."],
          ["Liberación", "Te guiamos para liberar el celular y usarlo con otras compañías."],
          ["Cámbiate si quieres", "Elige un plan prepagado y lo activamos en la tienda."],
        ],
        why: [
          "iPhone y Android",
          "Revisamos el bloqueo primero",
          "Cambio de compañía en tienda",
          "We speak English",
        ],
        faq: [
          {
            q: "¿Cómo sé si mi celular está bloqueado?",
            a: "En iPhone, ve a Ajustes → General → Información y busca “Bloqueo del operador”; “Sin restricciones de SIM” significa liberado. En Android, lo más fácil es probar un SIM de otra compañía. O tráelo y lo revisamos.",
          },
          {
            q: "¿Se puede liberar cualquier celular?",
            a: "Cada compañía tiene sus reglas; normalmente el celular debe estar pagado y sin reporte de robo o extravío. Primero lo revisamos y te decimos tus opciones.",
          },
          {
            q: "¿Liberarlo borra mi información?",
            a: "Normalmente no borra tus datos, pero siempre haz un respaldo antes, sobre todo si vas a cambiar de SIM o de compañía.",
          },
        ],
        cta: "Preguntar por liberación",
        ogKicker: "Liberación",
        imageAlt: "Un celular con la pantalla para insertar la SIM y la bandeja de la SIM afuera",
      },
    },
  },
  {
    slug: "trade-in-or-sell",
    icon: "trade",
    photo: "s24",
    related: ["unlocked-phones", "phone-repair", "phone-unlocking"],
    serviceType: "Mobile phone trade-in",
    text: {
      en: {
        name: "Trade In Or Sell Your Device",
        metaTitle: "Trade In or Sell Your Phone in Houston — Offer in Store",
        metaDescription:
          "Trade in your old iPhone, Samsung Galaxy or Android toward a new device, or sell it, at TIC Wireless on Hillcroft in Houston. We check it and make you an offer on the spot.",
        h1: "Trade in or sell your device in Houston",
        intro:
          "Upgrading? Put your old phone toward a new one, or sell it. Bring it to our store on Hillcroft — we check it in front of you and make you an offer on the spot.",
        offersTitle: "What you can do",
        offers: [
          "Trade in your old phone toward a new unlocked iPhone, Samsung Galaxy or Android.",
          "Sell your phone and take the offer.",
          "Lease your next device — no credit needed, subject to approval.",
          "Move your contacts and number to the new phone.",
        ],
        stepsTitle: "How trade-in works",
        steps: [
          ["Bring your device", "Bring the phone, its charger if you have it, and your passcode."],
          ["We check it", "We look at the model, storage, condition and whether everything works."],
          ["Get an offer", "Put it toward a new device, or take the offer for your phone."],
          ["Transfer and go", "We help move your number and data to your new phone."],
        ],
        why: [
          "Upgrade for less",
          "Offer on the spot",
          "Help moving your data",
          "English & Spanish",
        ],
        faq: [
          {
            q: "How much will I get for my old phone?",
            a: "It depends on the model, storage and condition. Bring it in — we check it in front of you and make you an offer on the spot. You can also call with the model for an idea first.",
          },
          {
            q: "What should I do before trading in or selling my phone?",
            a: "Back it up, sign out of iCloud (turn off Find My) or your Google account, and bring your passcode so we can check the phone.",
          },
          {
            q: "Can I put my trade-in toward a lease-to-own device?",
            a: "Yes — put your old phone toward a new device, and leasing is available on the new one with no credit needed, subject to approval.",
          },
          {
            q: "My phone is cracked or doesn't work well. Can I still bring it?",
            a: "Yes, bring it in. Condition affects the offer, so we'll check it and tell you what we can do — or quote a repair if you'd rather keep it.",
          },
          {
            q: "Do you take tablets and other devices?",
            a: "Phones are what we trade in most. For an iPad, tablet or other device, call (713) 339-9300 with the model and we'll let you know.",
          },
        ],
        cta: "Get an offer in store",
        ogKicker: "Trade In Or Sell",
        imageAlt: "Samsung Galaxy S24 Ultra unboxed on the store counter",
      },
      es: {
        name: "Cambia o vende tu equipo",
        metaTitle: "Cambia o Vende tu Celular en Houston — Oferta en Tienda",
        metaDescription:
          "Cambia tu iPhone, Samsung Galaxy o Android usado por un equipo nuevo, o véndelo, en TIC Wireless en Hillcroft, Houston. Lo revisamos y te hacemos una oferta al momento.",
        h1: "Cambia o vende tu equipo en Houston",
        intro:
          "¿Vas a estrenar? Usa tu celular viejo para el nuevo, o véndelo. Tráelo a nuestra tienda en Hillcroft: lo revisamos frente a ti y te hacemos una oferta al momento.",
        offersTitle: "Lo que puedes hacer",
        offers: [
          "Cambiar tu celular usado por un iPhone, Samsung Galaxy o Android desbloqueado nuevo.",
          "Vender tu celular y aceptar la oferta.",
          "Arrendar tu próximo equipo, sin necesidad de crédito y sujeto a aprobación.",
          "Pasar tus contactos y tu número al celular nuevo.",
        ],
        stepsTitle: "Cómo funciona el intercambio",
        steps: [
          ["Trae tu equipo", "Trae el celular, su cargador si lo tienes y tu código."],
          ["Lo revisamos", "Vemos el modelo, el almacenamiento, el estado y si todo funciona."],
          ["Recibe una oferta", "Úsala para un equipo nuevo o acepta la oferta por tu celular."],
          ["Pasa tus datos y listo", "Te ayudamos a pasar tu número y datos al nuevo celular."],
        ],
        why: ["Estrena por menos", "Oferta al momento", "Ayuda con tus datos", "Español e inglés"],
        faq: [
          {
            q: "¿Cuánto me dan por mi celular?",
            a: "Depende del modelo, el almacenamiento y el estado. Tráelo: lo revisamos frente a ti y te hacemos una oferta al momento. También puedes llamar con el modelo para darte una idea.",
          },
          {
            q: "¿Qué hago antes de cambiar o vender mi celular?",
            a: "Haz un respaldo, cierra sesión de iCloud (apaga Buscar) o de tu cuenta de Google y trae tu código para revisarlo.",
          },
          {
            q: "¿Puedo usar mi celular para un equipo con arrendamiento?",
            a: "Sí: usa tu celular viejo para un equipo nuevo, y el nuevo puede ser con arrendamiento, sin necesidad de crédito y sujeto a aprobación.",
          },
          {
            q: "Mi celular está roto o no funciona bien. ¿Lo puedo traer?",
            a: "Sí, tráelo. El estado cambia la oferta, así que lo revisamos y te decimos qué podemos hacer, o te cotizamos la reparación si prefieres quedártelo.",
          },
          {
            q: "¿Reciben tabletas y otros equipos?",
            a: "Lo que más recibimos son celulares. Para un iPad, tableta u otro equipo, llama al (713) 339-9300 con el modelo y te decimos.",
          },
        ],
        cta: "Recibir una oferta en tienda",
        ogKicker: "Cambia o vende",
        imageAlt: "Samsung Galaxy S24 Ultra en el mostrador de la tienda",
      },
    },
  },
  {
    slug: "bill-payments",
    icon: "bill",
    photo: "storefront",
    related: ["prepaid-plans", "international-recharge", "xfinity-prepaid-internet"],
    serviceType: "Mobile bill payment",
    text: {
      en: {
        name: "Phone bill payments",
        metaTitle: "Pay Your Phone Bill in Person in Houston — No Extra Charges",
        metaDescription:
          "Pay your prepaid phone bill in person at our Hillcroft store in Houston — the major prepaid carriers, no extra charges. Open 7 days. Se habla español.",
        h1: "Pay your phone bill in person in Houston",
        intro:
          "Prefer to pay in person? Pay your prepaid phone bill at our store on Hillcroft, with no extra charges. Open 7 days a week.",
        offersTitle: "What you can pay",
        offers: [
          "Prepaid phone bills for the major prepaid carriers — ask us about yours.",
          "No extra charges for paying in store.",
          "Help changing or renewing your prepaid plan.",
          "International recharge while you're here.",
        ],
        stepsTitle: "How it works",
        steps: [
          ["Come by", "Monday–Saturday 9 AM–8 PM, Sunday 9 AM–5 PM."],
          ["Tell us your number", "Bring the phone number on the account you're paying."],
          ["Pay", "Pay at the counter — no extra charges."],
          ["Done", "Your payment is applied and you're good to go."],
        ],
        why: ["No extra charges", "Major prepaid carriers", "Open 7 days", "Se habla español"],
        faq: [
          {
            q: "Which bills can I pay at TIC Wireless?",
            a: "Prepaid phone bills for the major prepaid carriers. Call (713) 339-9300 or ask at the counter to check yours.",
          },
          {
            q: "Is there a fee to pay my bill in store?",
            a: "No — we take prepaid bill payments in store with no extra charges.",
          },
        ],
        cta: "Visit to pay your bill",
        ogKicker: "Bill payments",
        imageAlt:
          "The glass storefront of TIC Wireless Electronic & Repair Center with carrier signs",
      },
      es: {
        name: "Pago de facturas",
        metaTitle: "Paga tu Factura de Celular en Persona en Houston — Sin Cargos",
        metaDescription:
          "Paga en persona tu factura prepagada en nuestra tienda de Hillcroft, Houston: las principales compañías prepagadas, sin cargos extra. Abiertos 7 días.",
        h1: "Paga tu factura de celular en persona en Houston",
        intro:
          "¿Prefieres pagar en persona? Paga tu factura prepagada en nuestra tienda de Hillcroft, sin cargos extra. Abiertos los 7 días.",
        offersTitle: "Lo que puedes pagar",
        offers: [
          "Facturas de las principales compañías prepagadas; pregúntanos por la tuya.",
          "Sin cargos extra por pagar en la tienda.",
          "Ayuda para cambiar o renovar tu plan prepagado.",
          "Recargas internacionales en la misma visita.",
        ],
        stepsTitle: "Cómo funciona",
        steps: [
          ["Ven a la tienda", "Lunes a sábado de 9 AM a 8 PM, domingo de 9 AM a 5 PM."],
          ["Dinos tu número", "Trae el número de teléfono de la cuenta que vas a pagar."],
          ["Paga", "Paga en el mostrador, sin cargos extra."],
          ["Listo", "Tu pago se aplica y quedas al corriente."],
        ],
        why: [
          "Sin cargos extra",
          "Principales compañías prepagadas",
          "Abiertos 7 días",
          "We speak English",
        ],
        faq: [
          {
            q: "¿Qué facturas puedo pagar en TIC Wireless?",
            a: "Facturas de las principales compañías prepagadas. Llama al (713) 339-9300 o pregunta en el mostrador por la tuya.",
          },
          {
            q: "¿Cobran comisión por pagar en la tienda?",
            a: "No, recibimos pagos de facturas prepagadas sin cargos extra.",
          },
        ],
        cta: "Ven a pagar tu factura",
        ogKicker: "Pago de facturas",
        imageAlt:
          "La fachada de vidrio de TIC Wireless Electronic & Repair Center con letreros de compañías",
      },
    },
  },
  {
    slug: "international-recharge",
    icon: "globe",
    photo: "storefront",
    related: ["bill-payments", "prepaid-plans", "phone-unlocking"],
    serviceType: "International mobile top-up",
    text: {
      en: {
        name: "International recharge",
        metaTitle: "International Phone Recharge in Houston — Tigo, Telcel & More",
        metaDescription:
          "Send mobile top-ups to family abroad from Hillcroft in Houston: Tigo, Digicel, Movistar, Telcel and more. Walk in, help in English & Spanish.",
        h1: "International phone recharge in Houston",
        intro:
          "Top up a phone for family and friends abroad from our store on Hillcroft. We do international mobile recharges including Tigo, Digicel, Movistar and Telcel, and more.",
        offersTitle: "Recharge brands",
        offers: [
          "Tigo, Digicel, Movistar and Telcel, and more.",
          "Fast in-store recharge — just bring the number you're topping up.",
          "Help in English and Spanish.",
          "Prepaid plans for your own phone, with international calling options.",
        ],
        stepsTitle: "How it works",
        steps: [
          [
            "Bring the number",
            "Bring the full phone number of the person you're sending to, with the country.",
          ],
          [
            "Choose the carrier",
            "Tell us their carrier — Tigo, Digicel, Movistar, Telcel or others.",
          ],
          ["Pay and send", "We send the recharge while you're at the counter."],
        ],
        why: [
          "Tigo, Digicel, Movistar, Telcel",
          "Done at the counter",
          "Open 7 days",
          "Se habla español",
        ],
        faq: [
          {
            q: "Which international carriers can I recharge?",
            a: "We do recharges including Tigo, Digicel, Movistar and Telcel, and more. Ask in store about the carrier you need.",
          },
          {
            q: "What do I need to send a recharge?",
            a: "The full phone number, including the country, and the carrier of the person you're sending to.",
          },
        ],
        cta: "Visit to send a recharge",
        ogKicker: "International recharge",
        imageAlt:
          "The TIC Wireless Electronic & Repair Center storefront with an Unlimited World sign",
      },
      es: {
        name: "Recargas internacionales",
        metaTitle: "Recargas Internacionales en Houston — Tigo, Telcel y Más",
        metaDescription:
          "Envía recargas a celulares de tu familia en otro país desde Hillcroft, Houston: Tigo, Digicel, Movistar, Telcel y más. Ven sin cita, te atendemos en español.",
        h1: "Recargas internacionales en Houston",
        intro:
          "Recarga el celular de tu familia y amigos en otro país desde nuestra tienda en Hillcroft. Hacemos recargas internacionales, incluyendo Tigo, Digicel, Movistar, Telcel y más.",
        offersTitle: "Compañías para recargar",
        offers: [
          "Tigo, Digicel, Movistar, Telcel y más.",
          "Recarga rápida en la tienda: solo trae el número que vas a recargar.",
          "Te atendemos en español o inglés.",
          "Planes prepagados para tu celular, con opciones de llamadas internacionales.",
        ],
        stepsTitle: "Cómo funciona",
        steps: [
          ["Trae el número", "Trae el número completo de la persona, con el país."],
          ["Elige la compañía", "Dinos su compañía: Tigo, Digicel, Movistar, Telcel u otra."],
          ["Paga y envía", "Enviamos la recarga mientras estás en el mostrador."],
        ],
        why: [
          "Tigo, Digicel, Movistar, Telcel",
          "Lista en el mostrador",
          "Abiertos 7 días",
          "Se habla español",
        ],
        faq: [
          {
            q: "¿A qué compañías internacionales puedo recargar?",
            a: "Hacemos recargas incluyendo Tigo, Digicel, Movistar, Telcel y más. Pregunta en la tienda por la compañía que necesitas.",
          },
          {
            q: "¿Qué necesito para enviar una recarga?",
            a: "El número completo, incluyendo el país, y la compañía de la persona a quien le envías.",
          },
        ],
        cta: "Ven a enviar una recarga",
        ogKicker: "Recargas internacionales",
        imageAlt:
          "La fachada de TIC Wireless Electronic & Repair Center con un letrero de Unlimited World",
      },
    },
  },
];

export const findService = (slug: string) => SERVICES.find((s) => s.slug === slug);
