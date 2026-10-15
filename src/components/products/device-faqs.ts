import { INVENTORY_UPDATED, type Device } from "@/components/products/inventory";
import { PHONE, STREET } from "@/components/site/business";
import { PORTALS } from "@/components/site/leasing-portals";
import type { Faq } from "@/components/site/schema";
import type { Lang } from "@/components/site/seo";

// Date and FAQ for each device page (/devices/<id>), shared by the page and its <head> schema.

export const inventoryDate = (lang: Lang) =>
  new Date(`${INVENTORY_UPDATED}T12:00:00`).toLocaleDateString(lang === "en" ? "en-US" : "es-MX", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

export function deviceFaqs(device: Device, lang: Lang): Faq[] {
  const name = `${device.brand === "Samsung" ? "Samsung " : ""}${device.name}`;
  const date = inventoryDate(lang);
  const tablet = device.kind === "ipad";
  if (lang === "es") {
    return [
      {
        q: `¿Tienen el ${name} en existencia?`,
        a: `Estaba en nuestra vitrina de ${STREET}, Suite C, Houston, el ${date}. El inventario cambia rápido, así que llama al ${PHONE} para confirmar antes de venir.`,
      },
      {
        q: `¿Puedo sacar el ${name} a pagos sin crédito?`,
        a: `Sí, puedes solicitarlo. Ofrecemos arrendamiento con opción a compra sin necesidad de crédito, desde $40 de enganche, sujeto a aprobación. Solicita en línea con ${PORTALS.map((p) => p.name).join(", ")}, o en la tienda con una identificación con foto.`,
      },
      tablet
        ? {
            q: `¿El ${name} es Wi-Fi o celular?`,
            a: "Depende de la unidad. Pregúntanos y te decimos si la que tenemos es solo Wi-Fi o Wi-Fi + celular, y qué capacidad tiene.",
          }
        : {
            q: `¿Con qué compañías funciona el ${name}?`,
            a: "Pregúntanos y revisamos la unidad exacta. Los celulares desbloqueados funcionan con la mayoría de las compañías, y en la tienda también activamos planes prepagados de T-Mobile, Cricket, Metro, Boost y más.",
          },
      {
        q: "¿Qué capacidad, color y estado tiene?",
        a: `Llama al ${PHONE} o ven a la tienda y te mostramos la unidad: capacidad, color, estado y precio. Las especificaciones de esta página son las del fabricante.`,
      },
    ];
  }
  return [
    {
      q: `Is the ${name} in stock?`,
      a: `It was on our shelves at ${STREET}, Suite C, Houston on ${date}. Stock changes quickly, so call ${PHONE} to confirm before you come in.`,
    },
    {
      q: `Can I lease the ${name} with no credit?`,
      a: `Yes, you can apply. We offer lease-to-own with no credit needed, from $40 down, subject to approval. Apply online with ${PORTALS.map((p) => p.name).join(", ")}, or in store with a valid photo ID.`,
    },
    tablet
      ? {
          q: `Is the ${name} Wi-Fi or cellular?`,
          a: "It depends on the unit. Ask us and we'll tell you whether the one on our shelf is Wi-Fi only or Wi-Fi + Cellular, and how much storage it has.",
        }
      : {
          q: `Which carriers does the ${name} work with?`,
          a: "Ask us and we'll check the exact unit. Unlocked phones work with most carriers, and we also activate prepaid plans from T-Mobile, Cricket, Metro, Boost and more in store.",
        },
    {
      q: "What storage, color and condition is it?",
      a: `Call ${PHONE} or stop by and we'll show you the unit: storage, color, condition and price. The specs on this page are the manufacturer's.`,
    },
  ];
}
