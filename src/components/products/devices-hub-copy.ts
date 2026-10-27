import type { Device, DeviceKind } from "@/components/products/inventory";
import { PHONE } from "@/components/site/business";

// Text for the all-devices page (/devices, /es/equipos), shared by the page and its <head>.

/** The page's sections, in order: one per company and product line. */
export const DEVICE_SECTIONS = [
  { id: "iphone", brand: "Apple", kind: "iphone" },
  { id: "galaxy-s", brand: "Samsung", kind: "galaxy-flagship" },
  { id: "galaxy-z", brand: "Samsung", kind: "galaxy-fold" },
  { id: "galaxy-a", brand: "Samsung", kind: "galaxy-a" },
  { id: "ipad", brand: "Apple", kind: "ipad" },
] as const satisfies readonly { id: string; brand: string; kind: DeviceKind }[];

export type SectionId = (typeof DEVICE_SECTIONS)[number]["id"];
export type Filter = "all" | SectionId;

export const DEVICE_FILTERS: Record<Filter, (d: Device) => boolean> = {
  all: () => true,
  ...(Object.fromEntries(
    DEVICE_SECTIONS.map((s) => [s.id, (d: Device) => d.kind === s.kind]),
  ) as Record<SectionId, (d: Device) => boolean>),
};

export const DEVICES_HUB_COPY = {
  en: {
    home: "Home",
    crumb: "All devices",
    kicker: (date: string) => `In store · updated ${date}`,
    title: ["Every phone & tablet", "in our store."],
    body: "iPhone 11 through iPhone 18 Pro Max, Samsung Galaxy S20 through S26 Ultra, Galaxy Z Fold and Flip foldables, Galaxy A phones and iPads — sold unlocked at 3640 Hillcroft St, with leasing from $40 down, no credit needed, subject to approval. Stock changes quickly, so call to confirm the model, storage and color you want.",
    call: "Call to check stock",
    apply: "Apply for leasing",
    metaTitle: "Unlocked iPhones & Samsung Galaxy Phones in Houston — All Models",
    metaDescription:
      "iPhone 11 to iPhone 18 Pro Max and Galaxy S20 to S26 Ultra in stock on Hillcroft in Houston. Unlocked, with leasing from $40 down, no credit needed.",
    sections: {
      iphone: "iPhone",
      "galaxy-s": "Galaxy S & Note",
      "galaxy-z": "Galaxy Z Fold & Flip",
      "galaxy-a": "Galaxy A",
      ipad: "iPad",
    } as Record<SectionId, string>,
    jump: "Jump to",
    filters: {
      all: "All",
      iphone: "iPhone",
      "galaxy-s": "Galaxy S",
      "galaxy-z": "Galaxy Z",
      "galaxy-a": "Galaxy A",
      ipad: "iPad",
    } as Record<Filter, string>,
    search: "Search a model, e.g. 15 Pro Max",
    clear: "Clear search",
    models: (n: number) => `${n} ${n === 1 ? "model" : "models"}`,
    none: "No device matches that search. Call us — we may have it in the back or can order it.",
    faqTitle: "Questions about our phones",
    faqs: [
      {
        q: "Are these phones new or pre-owned?",
        a: "We carry both, and it depends on the model and the unit. Ask us about the exact phone — we'll tell you its condition, storage, color and price before you buy.",
      },
      {
        q: "Are the phones unlocked?",
        a: "Our phones are sold unlocked, so you can use the carrier you want. Ask us which carriers a phone works with and we'll check the exact unit, and we can set up a prepaid plan in store.",
      },
      {
        q: "Can I get a phone with no credit?",
        a: "Yes, you can apply. Leasing (lease-to-own) needs no credit, starts at $40 down (iPhone 18 Pro Max from $65 down) and is subject to approval. Apply online with Progressive Leasing, American First Finance or Payvantage, or in store with a valid photo ID.",
      },
      {
        q: "Is everything on this page in stock right now?",
        a: `This list is from our shelves on the date shown. Stock changes quickly, so call ${PHONE} to confirm before you come in, or ask us to set a phone aside.`,
      },
    ],
  },
  es: {
    home: "Inicio",
    crumb: "Todos los equipos",
    kicker: (date: string) => `En tienda · actualizado el ${date}`,
    title: ["Todos los celulares y tabletas", "de nuestra tienda."],
    body: "Del iPhone 11 al iPhone 18 Pro Max, del Samsung Galaxy S20 al S26 Ultra, plegables Galaxy Z Fold y Flip, celulares Galaxy A y iPads, desbloqueados en 3640 Hillcroft St y a pagos desde $40 de enganche, sin necesidad de crédito, sujeto a aprobación. El inventario cambia rápido: llama para confirmar el modelo, la capacidad y el color.",
    call: "Llama para ver existencias",
    apply: "Solicita arrendamiento",
    metaTitle: "iPhone y Samsung Galaxy desbloqueados en Houston — Todos los modelos",
    metaDescription:
      "Del iPhone 11 al iPhone 18 Pro Max y del Galaxy S20 al S26 Ultra en Hillcroft, Houston. Desbloqueados y a pagos desde $40 de enganche, sin crédito.",
    sections: {
      iphone: "iPhone",
      "galaxy-s": "Galaxy S y Note",
      "galaxy-z": "Galaxy Z Fold y Flip",
      "galaxy-a": "Galaxy A",
      ipad: "iPad",
    } as Record<SectionId, string>,
    jump: "Ir a",
    filters: {
      all: "Todos",
      iphone: "iPhone",
      "galaxy-s": "Galaxy S",
      "galaxy-z": "Galaxy Z",
      "galaxy-a": "Galaxy A",
      ipad: "iPad",
    } as Record<Filter, string>,
    search: "Busca un modelo, p. ej. 15 Pro Max",
    clear: "Borrar búsqueda",
    models: (n: number) => `${n} ${n === 1 ? "modelo" : "modelos"}`,
    none: "Ningún equipo coincide con esa búsqueda. Llámanos: puede que lo tengamos o podemos pedirlo.",
    faqTitle: "Preguntas sobre nuestros celulares",
    faqs: [
      {
        q: "¿Los celulares son nuevos o usados?",
        a: "Tenemos de los dos; depende del modelo y de la unidad. Pregúntanos por el celular exacto y te decimos su estado, capacidad, color y precio antes de comprar.",
      },
      {
        q: "¿Los celulares están desbloqueados?",
        a: "Vendemos los celulares desbloqueados, para que uses la compañía que quieras. Pregúntanos con qué compañías funciona y revisamos la unidad exacta; también activamos planes prepagados en la tienda.",
      },
      {
        q: "¿Puedo sacar un celular sin crédito?",
        a: "Sí, puedes solicitarlo. El arrendamiento con opción a compra no necesita crédito, empieza desde $40 de enganche (iPhone 18 Pro Max desde $65) y está sujeto a aprobación. Solicita en línea con Progressive Leasing, American First Finance o Payvantage, o en la tienda con una identificación con foto.",
      },
      {
        q: "¿Todo lo de esta página está en existencia?",
        a: `Esta lista es de nuestras vitrinas en la fecha indicada. El inventario cambia rápido: llama al ${PHONE} para confirmar antes de venir o pide que te apartemos un celular.`,
      },
    ],
  },
};
