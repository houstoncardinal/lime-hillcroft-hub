import { PHONE } from "@/components/site/business";
import { SHOP_ENABLED } from "@/components/site/features";
import type { Faq } from "@/components/site/schema";
import { withBrand, type Lang } from "@/components/site/seo";

import { areaName, shortName, type Area } from "@/components/areas/data";
import { LOCAL } from "@/components/areas/local";

const mi = (n: number) => n.toFixed(1);
const zipList = (a: Area) => a.zips.join(", ");

// Text for the area hub and each area page. Area-specific numbers are filled in per page.
export function areaCopy(a: Area, lang: Lang) {
  const name = areaName(a, lang);
  const short = shortName(a);
  const local = LOCAL[a.slug];
  if (lang === "es") {
    return {
      title: withBrand(`Reparación de Celulares en ${short}, Houston ${a.zips[0]}`),
      description: `Reparación de celulares el mismo día a ${mi(a.miles)} millas de ${short}: pantallas, baterías, liberación, arrendamiento sin crédito y planes prepagados.`,
      kicker: `Atendemos ${name} · ${zipList(a)}`,
      h1: [`Reparación de celulares cerca de`, short],
      distance: `TIC Wireless Electronic & Repair Center está a ${mi(a.miles)} millas de ${short} — unos ${a.minutes} minutos en carro sin tráfico — en 3640 Hillcroft St, Suite C.`,
      stats: [
        ["Distancia", `${mi(a.miles)} mi`],
        ["En carro", `~${a.minutes} min`],
        ["Códigos postales", zipList(a)],
        ["Horario", "Lun–Sáb 9–8 · Dom 9–5"],
      ] as [string, string][],
      call: "Llamar",
      directions: `Cómo llegar desde ${short}`,
      servicesTitle: `Lo que hacemos para ${short}`,
      services: [
        ["Reparación el mismo día", "Pantallas, baterías y puertos de carga.", "/es#repair"],
        ["Celulares a pagos", "Sin crédito, desde $40 de enganche.", "/es/arrendamiento"],
        ["Liberación", "Usa la compañía que quieras.", "/es#services"],
        ["Planes y pagos", "Prepagados, pago de facturas y recargas.", "/es#services"],
        [
          "Accesorios",
          "Fundas, micas, AirPods y JBL.",
          SHOP_ENABLED ? "/es/tienda" : "/es#accessories",
        ],
      ] as [string, string, string][],
      routeTitle: `Cómo llegar desde ${short}`,
      routeEnd:
        "Busca el centro comercial sobre Hillcroft cerca de Windswept, al norte del Westpark Tollway: 3640 Hillcroft St, Suite C.",
      routeNote: "Ruta y tiempo calculados con mapas de OpenStreetMap, sin tráfico.",
      faqTitle: `Preguntas de clientes de ${short}`,
      nearbyTitle: "Zonas cercanas",
      allAreas: "Todas las zonas",
      rating: "4.7★ en Google · más de 400 reseñas",
      whyTitle: `Por qué ${short} elige TIC Wireless Electronic & Repair Center`,
      aboutTitle: `Sobre ${short}`,
      faqs: [
        ...(local ? [local.faq.es] : []),
        {
          q: `¿Dónde puedo reparar mi celular cerca de ${short}?`,
          a: `En TIC Wireless Electronic & Repair Center, 3640 Hillcroft St, Suite C, Houston, TX 77057, a ${mi(a.miles)} millas de ${short}. La mayoría de cambios de pantalla, batería y puerto de carga quedan el mismo día, y te damos el precio antes de empezar.`,
        },
        {
          q: `¿Qué tan lejos está TIC Wireless Electronic & Repair Center de ${zipList(a)}?`,
          a: `Unas ${mi(a.miles)} millas, alrededor de ${a.minutes} minutos en carro sin tráfico, por ${a.route.join(", ")}.`,
        },
        {
          q: `¿Puedo sacar un celular sin crédito cerca de ${short}?`,
          a: "Sí. Tenemos arrendamiento con opción a compra en iPhone y Android desbloqueados, sin necesidad de crédito, desde $40 de enganche y con pagos semanales, quincenales o mensuales (sujeto a aprobación).",
        },
      ] as Faq[],
    };
  }
  return {
    title: withBrand(`Phone Repair near ${short}, Houston ${a.zips[0]}`),
    description: `Same-day phone repair & cell phone store ${mi(a.miles)} mi from ${short}: screens, batteries, unlocking, no-credit phone leasing and prepaid plans.`,
    kicker: `Serving ${name} · ${zipList(a)}`,
    h1: [`Phone repair & cell phone store near`, short],
    distance: `TIC Wireless Electronic & Repair Center is ${mi(a.miles)} miles from ${short} — about ${a.minutes} minutes by car without traffic — at 3640 Hillcroft St, Suite C.`,
    stats: [
      ["Distance", `${mi(a.miles)} mi`],
      ["Drive", `~${a.minutes} min`],
      ["ZIP codes", zipList(a)],
      ["Hours", "Mon–Sat 9–8 · Sun 9–5"],
    ] as [string, string][],
    call: "Call",
    directions: `Directions from ${short}`,
    servicesTitle: `What we do for ${short}`,
    services: [
      ["Same-day repair", "Screens, batteries and charging ports.", "/#repair"],
      ["Phones with leasing", "No credit needed, from $40 down.", "/leasing"],
      ["Unlocking", "Use the carrier you choose.", "/#services"],
      ["Plans & payments", "Prepaid plans, bill pay and recharge.", "/#services"],
      ["Accessories", "Cases, glass, AirPods and JBL.", SHOP_ENABLED ? "/shop" : "/#accessories"],
    ] as [string, string, string][],
    routeTitle: `Getting here from ${short}`,
    routeEnd:
      "Look for the shopping center on Hillcroft near Windswept, just north of the Westpark Tollway: 3640 Hillcroft St, Suite C.",
    routeNote: "Route and drive time calculated with OpenStreetMap routing, without traffic.",
    faqTitle: `Questions from ${short} customers`,
    nearbyTitle: "Nearby areas",
    allAreas: "All areas we serve",
    rating: "4.7★ on Google · 400+ reviews",
    whyTitle: `Why ${short} chooses TIC Wireless Electronic & Repair Center`,
    aboutTitle: `About ${short}`,
    faqs: [
      ...(local ? [local.faq.en] : []),
      {
        q: `Where can I get my phone fixed near ${short}?`,
        a: `At TIC Wireless Electronic & Repair Center, 3640 Hillcroft St, Suite C, Houston, TX 77057 — ${mi(a.miles)} miles from ${short}. Most screen, battery and charging-port repairs are done the same day, and we quote the price before any work starts.`,
      },
      {
        q: `How far is TIC Wireless Electronic & Repair Center from ${zipList(a)}?`,
        a: `About ${mi(a.miles)} miles — roughly ${a.minutes} minutes by car without traffic, via ${a.route.join(", ")}.`,
      },
      {
        q: `Can I get a phone with no credit near ${short}?`,
        a: "Yes. We offer leasing (lease-to-own) on unlocked iPhones and Androids with no credit needed, from $40 down, with weekly, biweekly or monthly payments (subject to approval).",
      },
    ] as Faq[],
  };
}

export const HUB_COPY = {
  en: {
    title: "Phone Repair in Southwest Houston — Find Your Area | TIC Wireless",
    description:
      "Same-day phone repair, no-credit phone leasing and prepaid plans for Gulfton, Sharpstown, Alief, Westchase, Bellaire, Meyerland, the Galleria & Harwin.",
    kicker: "Areas we serve",
    h1: ["Your phone store for", "Southwest Houston."],
    body: "One store on Hillcroft, minutes from the neighborhoods around us. Find your area or ZIP code for distance, drive time and directions.",
    zipLabel: "Enter your ZIP code",
    zipPlaceholder: "e.g. 77036",
    zipFound: (names: string) => `ZIP code served — see ${names}:`,
    zipNear: "We're close by. Call (713) 339-9300 for directions, or pick the nearest area below.",
    zipInvalid: "Enter a 5-digit ZIP code.",
    cardCta: "Distance & directions",
    breadcrumb: ["Home", "Areas we serve"],
  },
  es: {
    title: "Reparación de Celulares en el Suroeste de Houston | TIC Wireless",
    description:
      "Reparación de celulares el mismo día, celulares a pagos sin crédito y planes para Gulfton, Sharpstown, Alief, Westchase, Bellaire, Meyerland, Galleria y Harwin.",
    kicker: "Zonas que atendemos",
    h1: ["Tu tienda de celulares en el", "suroeste de Houston."],
    body: "Una tienda en Hillcroft, a minutos de los barrios que nos rodean. Busca tu zona o código postal para ver distancia, tiempo y cómo llegar.",
    zipLabel: "Escribe tu código postal",
    zipPlaceholder: "ej. 77036",
    zipFound: (names: string) => `Código postal atendido — mira ${names}:`,
    zipNear:
      "Estamos cerca. Llama al (713) 339-9300 para indicaciones, o elige la zona más cercana abajo.",
    zipInvalid: "Escribe un código postal de 5 dígitos.",
    cardCta: "Distancia y cómo llegar",
    breadcrumb: ["Inicio", "Zonas que atendemos"],
  },
};
