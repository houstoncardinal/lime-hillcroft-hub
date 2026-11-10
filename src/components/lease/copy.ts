import { CircleCheck, IdCard, Store } from "lucide-react";

import { PHONE } from "@/components/site/business";
import type { Faq } from "@/components/site/schema";
import type { Lang } from "@/components/site/seo";

// Text for the lease-to-own catalog (/lease-to-own, /es/arrendamiento-equipos) and its device
// pages. Prices come from catalog.ts; nothing here is a financing offer.

const fmtDate = (iso: string, lang: Lang) =>
  new Date(`${iso}T12:00:00`).toLocaleDateString(lang === "es" ? "es-MX" : "en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

export const LEASE_COPY = {
  en: {
    home: "Home",
    crumb: "Lease-to-own",
    kicker: "Lease-to-own ready",
    title: "Take it home today. No credit needed.",
    body: "Every device below can be leased in store. Pick one, see every storage and condition option with its leasing price and estimated payments, then apply online with a leasing partner and pick it up at our Hillcroft store.",
    homeTitle: "Lease-to-own ready devices",
    homeBody:
      "Phones, iPads, MacBooks, watches and consoles you can lease in store — no credit needed. See every option and its price, then apply online in minutes.",
    viewAll: (n: number) => `See all ${n} lease-to-own devices`,
    metaTitle: "Lease-to-Own Phones, iPads, MacBooks & Consoles in Houston — No Credit Needed",
    metaDescription:
      "Lease an iPhone, Samsung Galaxy, iPad, MacBook, Apple Watch, PlayStation or Xbox at TIC Wireless on Hillcroft in Houston. Leasing prices and weekly, bi-weekly or monthly payment estimates for every option; apply online with Acima, Progressive Leasing, American First Finance or Payvantage.",
    deviceMeta: (name: string, from: string) =>
      `Lease the ${name} at TIC Wireless in Houston from ${from} — no credit needed. Every storage and condition option with its leasing price and payment estimates; apply online and pick it up in store.`,
    from: "Leasing from",
    perWeek: "/wk est.",
    payQuestion: "Payment frequency",
    freqNote:
      "Pick the schedule that matches how often you get paid — weekly, every two weeks or monthly. Your leasing company confirms your schedule when you're approved.",
    freq: { weekly: "Weekly", biweekly: "Bi-weekly", monthly: "Monthly" },
    per: { weekly: "/wk", biweekly: "/2 wks", monthly: "/mo" },
    perLong: { weekly: "per week", biweekly: "every 2 weeks", monthly: "per month" },
    estimated: "Estimated payment",
    paymentsFrom: "Est. payments from",
    bannerTitle: "Lease-to-own · No credit needed",
    bannerSub: "Apply online, take it home today",
    bannerCta: (n: number) => `See all ${n} devices`,
    bannerCtaShort: "See all",
    bannerPick: "Featured devices",
    payIn4Kicker: "Special online option",
    payIn4Title: "Rather buy online? Pay in 4 with Affirm",
    payIn4Body:
      "Check out on our online store with Shop Pay Installments by Affirm: split the price into 4 interest-free payments, every 2 weeks. Subject to approval by Affirm.",
    payIn4Note: "The online price can differ from the leasing price.",
    payIn4Button: "Pay in 4 with Affirm",
    payIn4Other: (labels: string) => `Pay in 4 online is available for: ${labels}.`,
    fromWord: "From",
    freqWord: { weekly: "weekly", biweekly: "every 2 weeks", monthly: "monthly" },
    compare: "Compare all options",
    showPayments: "Payment frequency",
    options: (n: number) => (n === 1 ? "1 option" : `${n} options`),
    details: "See options",
    chooseOption: "Choose an option",
    leasingPrice: "Leasing price",
    estPayments: "Estimated payments",
    weekly: "Weekly",
    biweekly: "Every 2 weeks",
    monthly: "Monthly",
    noEstimate: "Ask us for your payment estimate — it depends on the plan you're approved for.",
    applyTitle: "Apply with a leasing partner",
    applyBody:
      "Apply online in a few minutes. Once approved, come to the store with your ID, pick this device and take it home the same day.",
    primary: "Primary partner",
    noCheckout: "No online checkout needed — leasing is completed in store.",
    call: "Call",
    directions: "Directions",
    allPrices: "All options and prices",
    option: "Option",
    fullSpecs: "Full specs and photos",
    more: (cat: string) => `More ${cat} to lease`,
    stepsTitle: "How lease-to-own works",
    steps: [
      [CircleCheck, "Pick your device", "Choose the model, storage and condition you want."],
      [IdCard, "Apply online", "Apply with Acima, Progressive Leasing, American First Finance or Payvantage."],
      [Store, "Pick it up today", "Bring your ID to 3640 Hillcroft St, Suite C and take it home."],
    ] as const,
    updated: (iso: string) => `Prices updated ${fmtDate(iso, "en")}. Call ${PHONE} to confirm stock.`,
    fine: "Leasing is subject to approval by the leasing company. Lease-to-own is not a loan or credit; the total cost to own is more than the item's retail price. Payments shown are estimates from our price list; your actual payments, schedule and any initial payment are set by the leasing company when you're approved. Stock, colors and condition vary — call to confirm.",
    faqs: [
      {
        q: "Do I need credit to lease a phone at TIC Wireless?",
        a: "No credit is needed. Lease-to-own is subject to approval by the leasing company, and you can apply online with Acima, Progressive Leasing, American First Finance or Payvantage before you come in.",
      },
      {
        q: "Should I choose weekly, bi-weekly or monthly payments?",
        a: "Choose the schedule that matches how often you get paid: weekly if you're paid every week, bi-weekly if you're paid every two weeks, or monthly. Payments shown are estimates; the leasing company confirms your schedule and amounts when you're approved.",
      },
      {
        q: "Can I check out online?",
        a: "Lease-to-own devices are not checked out online. Apply with a leasing partner, then pick up your device at 3640 Hillcroft St, Suite C, Houston, TX 77057.",
      },
    ] satisfies Faq[],
  },
  es: {
    home: "Inicio",
    crumb: "Arrendamiento",
    kicker: "Listos para arrendamiento",
    title: "Llévatelo hoy. Sin necesidad de crédito.",
    body: "Todos estos equipos se pueden arrendar en la tienda. Elige uno, mira cada opción de almacenamiento y condición con su precio de arrendamiento y pagos aproximados, solicita en línea con un socio de arrendamiento y recógelo en nuestra tienda de Hillcroft.",
    homeTitle: "Equipos listos para arrendamiento",
    homeBody:
      "Celulares, iPad, MacBook, relojes y consolas que puedes arrendar en la tienda — sin necesidad de crédito. Mira cada opción y su precio, y solicita en línea en minutos.",
    viewAll: (n: number) => `Ver los ${n} equipos en arrendamiento`,
    metaTitle: "Celulares, iPad, MacBook y Consolas en Arrendamiento en Houston — Sin Crédito",
    metaDescription:
      "Arrienda un iPhone, Samsung Galaxy, iPad, MacBook, Apple Watch, PlayStation o Xbox en TIC Wireless sobre Hillcroft en Houston. Precio de arrendamiento y pagos semanales, quincenales o mensuales aproximados para cada opción; solicita en línea con Acima, Progressive Leasing, American First Finance o Payvantage.",
    deviceMeta: (name: string, from: string) =>
      `Arrienda el ${name} en TIC Wireless en Houston desde ${from} — sin necesidad de crédito. Cada opción de almacenamiento y condición con su precio de arrendamiento y pagos aproximados; solicita en línea y recógelo en la tienda.`,
    from: "Arrendamiento desde",
    perWeek: "/sem aprox.",
    payQuestion: "Frecuencia de pago",
    freqNote:
      "Elige el calendario que coincida con la frecuencia con la que te pagan — semanal, cada dos semanas o mensual. La compañía de arrendamiento confirma tu calendario al aprobarte.",
    freq: { weekly: "Semanal", biweekly: "Quincenal", monthly: "Mensual" },
    per: { weekly: "/sem", biweekly: "/2 sem", monthly: "/mes" },
    perLong: { weekly: "por semana", biweekly: "cada 2 semanas", monthly: "al mes" },
    estimated: "Pago aproximado",
    paymentsFrom: "Pagos aprox. desde",
    bannerTitle: "Arrendamiento · Sin crédito",
    bannerSub: "Solicita en línea y llévatelo hoy",
    bannerCta: (n: number) => `Ver los ${n} equipos`,
    bannerCtaShort: "Ver todo",
    bannerPick: "Equipos destacados",
    payIn4Kicker: "Opción especial en línea",
    payIn4Title: "¿Prefieres comprar en línea? Paga en 4 con Affirm",
    payIn4Body:
      "Paga en nuestra tienda en línea con Shop Pay Installments de Affirm: divide el precio en 4 pagos sin intereses, cada 2 semanas. Sujeto a la aprobación de Affirm.",
    payIn4Note: "El precio en línea puede ser distinto al de arrendamiento.",
    payIn4Button: "Paga en 4 con Affirm",
    payIn4Other: (labels: string) => `Pago en 4 en línea disponible para: ${labels}.`,
    fromWord: "Desde",
    freqWord: { weekly: "semanal", biweekly: "cada 2 semanas", monthly: "mensual" },
    compare: "Comparar todas las opciones",
    showPayments: "Frecuencia de pago",
    options: (n: number) => (n === 1 ? "1 opción" : `${n} opciones`),
    details: "Ver opciones",
    chooseOption: "Elige una opción",
    leasingPrice: "Precio de arrendamiento",
    estPayments: "Pagos aproximados",
    weekly: "Semanal",
    biweekly: "Cada 2 semanas",
    monthly: "Mensual",
    noEstimate: "Pregúntanos por tu pago aproximado — depende del plan que te aprueben.",
    applyTitle: "Solicita con un socio de arrendamiento",
    applyBody:
      "Solicita en línea en unos minutos. Ya aprobado, ven a la tienda con tu identificación, elige este equipo y llévatelo el mismo día.",
    primary: "Socio principal",
    noCheckout: "No necesitas pagar en línea — el arrendamiento se completa en la tienda.",
    call: "Llamar",
    directions: "Cómo llegar",
    allPrices: "Todas las opciones y precios",
    option: "Opción",
    fullSpecs: "Especificaciones y fotos",
    more: (cat: string) => `Más ${cat} en arrendamiento`,
    stepsTitle: "Cómo funciona el arrendamiento",
    steps: [
      [CircleCheck, "Elige tu equipo", "Escoge el modelo, almacenamiento y condición que quieres."],
      [IdCard, "Solicita en línea", "Solicita con Acima, Progressive Leasing, American First Finance o Payvantage."],
      [Store, "Recógelo hoy", "Trae tu identificación a 3640 Hillcroft St, Suite C y llévatelo."],
    ] as const,
    updated: (iso: string) =>
      `Precios actualizados el ${fmtDate(iso, "es")}. Llama al ${PHONE} para confirmar disponibilidad.`,
    fine: "El arrendamiento está sujeto a la aprobación de la compañía de arrendamiento. No es un préstamo ni crédito; el costo total es mayor que el precio de venta del artículo. Los pagos mostrados son aproximados según nuestra lista de precios; tus pagos reales, calendario y cualquier pago inicial los fija la compañía al aprobarte. La disponibilidad, colores y condición varían — llama para confirmar.",
    faqs: [
      {
        q: "¿Necesito crédito para arrendar un celular en TIC Wireless?",
        a: "No necesitas crédito. El arrendamiento está sujeto a la aprobación de la compañía, y puedes solicitar en línea con Acima, Progressive Leasing, American First Finance o Payvantage antes de venir.",
      },
      {
        q: "¿Me conviene pagar semanal, quincenal o mensual?",
        a: "Elige el calendario que coincida con la frecuencia con la que te pagan: semanal si te pagan cada semana, quincenal si te pagan cada dos semanas, o mensual. Los pagos mostrados son aproximados; la compañía de arrendamiento confirma tu calendario y montos al aprobarte.",
      },
      {
        q: "¿Puedo pagar en línea?",
        a: "Los equipos en arrendamiento no se pagan en línea. Solicita con un socio de arrendamiento y recoge tu equipo en 3640 Hillcroft St, Suite C, Houston, TX 77057.",
      },
    ] satisfies Faq[],
  },
};
