import { CATALOG_DETAILS } from "@/components/products/catalog";
import { LATEST_DEVICES, type Device } from "@/components/products/inventory";
import type { Lang } from "@/components/site/seo";

// Details for each device's own page (/devices/<id>). Specs are the manufacturer's published
// specs for the US model at launch; the unit on our shelf may differ in storage, color and
// condition, so every page tells people to call to confirm. The iPhone 18 page covers the
// iPhone 18 Pro Max with only what Apple's spec sheet and launch announcement state
// (support.apple.com/en-us/148591, Sept 2026); storage sizes and prices aren't listed. The
// broader /iphone-18 landing page (cases, trade-in) stays as it is.
//
// Product photos are the store's own or from Wikimedia Commons under the license shown; each
// Commons photo is credited on its page.

type L = Record<Lang, string>;
/** A spec value: one string when it reads the same in both languages. */
type V = string | L;

export type SpecKey =
  | "display"
  | "chip"
  | "memory"
  | "storage"
  | "rear"
  | "front"
  | "battery"
  | "charging"
  | "network"
  | "water"
  | "extras";

export const SPEC_LABELS: Record<SpecKey, L> = {
  display: { en: "Display", es: "Pantalla" },
  chip: { en: "Processor", es: "Procesador" },
  memory: { en: "Memory (RAM)", es: "Memoria (RAM)" },
  storage: { en: "Storage", es: "Almacenamiento" },
  rear: { en: "Rear cameras", es: "Cámaras traseras" },
  front: { en: "Front camera", es: "Cámara frontal" },
  battery: { en: "Battery", es: "Batería" },
  charging: { en: "Charging", es: "Carga" },
  network: { en: "Network", es: "Red" },
  water: { en: "Water resistance", es: "Resistencia al agua" },
  extras: { en: "Also", es: "Además" },
};

export type DeviceDetail = {
  id: string;
  /** Page title when it should be more specific than the shelf card's name. */
  title?: string;
  /** Lowest lease-to-own down payment in USD when it isn't the store-wide $40. */
  leaseFrom?: number;
  /** Year the model came out. */
  year: number;
  tagline: L;
  summary: L;
  highlights: L[];
  specs: [SpecKey, V][];
  /** Main product photo (public/photos/devices/product), or the store's own. */
  photo?: ProductPhoto;
  /** More photos for the gallery. */
  morePhotos?: ProductPhoto[];
};

export type ProductPhoto = {
  /** Shown on the page (.webp). */
  src: string;
  /** Same photo as .jpg, for schema and the sitemap. */
  jpg: string;
  w: number;
  h: number;
  alt: L;
  /** Fill the frame instead of showing the whole photo on white (store photos). */
  cover?: true;
  /** Attribution for freely licensed photos; none for the store's own photos. */
  credit?: { author: string; license: string; href: string };
};

const product = (
  file: string,
  w: number,
  h: number,
  alt: L,
  author: string,
  license: string,
  commonsFile: string,
): ProductPhoto => ({
  src: `/photos/devices/product/${file}.webp`,
  jpg: `/photos/devices/product/${file}.jpg`,
  w,
  h,
  alt,
  credit: { author, license, href: `https://commons.wikimedia.org/wiki/File:${commonsFile}` },
});

const DETAILS: DeviceDetail[] = [
  {
    id: "iphone-18",
    title: "iPhone 18 Pro Max",
    // Same figure as the /iphone-18 page and the home page hero card.
    leaseFrom: 65,
    year: 2026,
    tagline: {
      en: "Apple's newest and biggest iPhone: a 6.9-inch display, A20 Pro and a variable-aperture camera.",
      es: "El iPhone más nuevo y más grande de Apple: pantalla de 6.9 pulgadas, A20 Pro y cámara con apertura variable.",
    },
    summary: {
      en: "The iPhone 18 Pro Max is Apple's 2026 flagship. It has a 6.9-inch ProMotion display, the A20 Pro chip, three 48 MP cameras — including the first iPhone main camera with variable aperture and a telephoto with up to 8x optical-quality zoom — and, in Apple's words, the largest increase in battery life ever on iPhone. Sold unlocked in our store, in black, silver, glacier or burgundy; call to confirm the color and storage on the shelf.",
      es: "El iPhone 18 Pro Max es el modelo insignia de Apple de 2026. Tiene pantalla ProMotion de 6.9 pulgadas, chip A20 Pro, tres cámaras de 48 MP —incluida la primera cámara principal de iPhone con apertura variable y un teleobjetivo con zoom de calidad óptica de hasta 8x— y, según Apple, el mayor aumento de batería en la historia del iPhone. Lo vendemos desbloqueado, en negro, plata, glaciar o vino; llama para confirmar el color y la capacidad en vitrina.",
    },
    highlights: [
      { en: "6.9″ ProMotion display, up to 120 Hz", es: "Pantalla ProMotion de 6.9″ hasta 120 Hz" },
      { en: "A20 Pro chip", es: "Chip A20 Pro" },
      {
        en: "48 MP main camera with variable aperture",
        es: "Cámara principal de 48 MP con apertura variable",
      },
      { en: "Up to 45 hours of video playback", es: "Hasta 45 horas de reproducción de video" },
    ],
    specs: [
      [
        "display",
        {
          en: "6.9″ Super Retina XDR OLED, ProMotion up to 120 Hz, Always-On, Dynamic Island",
          es: "6.9″ Super Retina XDR OLED, ProMotion hasta 120 Hz, siempre activa, Dynamic Island",
        },
      ],
      [
        "chip",
        {
          en: "Apple A20 Pro (6-core CPU, 7-core GPU)",
          es: "Apple A20 Pro (CPU de 6 núcleos, GPU de 7 núcleos)",
        },
      ],
      [
        "rear",
        {
          en: "48 MP Fusion Main with variable aperture (ƒ/1.48–ƒ/4) · 48 MP Ultra Wide · 48 MP 4x Telephoto (8x optical-quality zoom)",
          es: "48 MP Fusion principal con apertura variable (ƒ/1.48–ƒ/4) · 48 MP ultra gran angular · 48 MP teleobjetivo 4x (zoom de calidad óptica 8x)",
        },
      ],
      [
        "battery",
        {
          en: "Up to 45 hours of video playback (eSIM-only US model)",
          es: "Hasta 45 horas de reproducción de video (modelo de EE. UU. solo eSIM)",
        },
      ],
      [
        "charging",
        {
          en: "USB-C; 5 minutes of wired charging gives about 7 hours of video playback",
          es: "USB-C; 5 minutos de carga por cable dan unas 7 horas de video",
        },
      ],
      [
        "network",
        {
          en: "5G (including mmWave) with Apple's C2 modem; Wi-Fi 7 and Bluetooth 6",
          es: "5G (incluye mmWave) con el módem C2 de Apple; Wi-Fi 7 y Bluetooth 6",
        },
      ],
      [
        "extras",
        {
          en: "Face ID, eSIM, iOS 27 with Apple Intelligence; black, silver, glacier or burgundy",
          es: "Face ID, eSIM, iOS 27 con Apple Intelligence; negro, plata, glaciar o vino",
        },
      ],
    ],
    photo: {
      src: "/photos/iphone-18-pro-max.jpg",
      jpg: "/photos/iphone-18-pro-max.jpg",
      w: 800,
      h: 1000,
      cover: true,
      alt: {
        en: "An iPhone 18 Pro Max held in front of its box at TIC Wireless",
        es: "Un iPhone 18 Pro Max frente a su caja en TIC Wireless",
      },
    },
  },
  {
    id: "galaxy-s20-ultra",
    year: 2020,
    tagline: {
      en: "The big-screen Galaxy with a 108 MP camera and 100x Space Zoom.",
      es: "El Galaxy de pantalla grande con cámara de 108 MP y Space Zoom de 100x.",
    },
    summary: {
      en: "Samsung's 2020 flagship: a 6.9-inch 120 Hz display, a 108 MP main camera with up to 100x zoom, 5G and a 5,000 mAh battery. Still one of the most capable Android phones you can take home for the price.",
      es: "El modelo insignia de Samsung de 2020: pantalla de 6.9 pulgadas a 120 Hz, cámara principal de 108 MP con zoom de hasta 100x, 5G y batería de 5,000 mAh. Sigue siendo uno de los Android más completos por su precio.",
    },
    highlights: [
      {
        en: "6.9″ QHD+ 120 Hz Dynamic AMOLED",
        es: "Pantalla Dynamic AMOLED QHD+ de 6.9″ a 120 Hz",
      },
      { en: "108 MP camera, up to 100x Space Zoom", es: "Cámara de 108 MP, Space Zoom hasta 100x" },
      {
        en: "5,000 mAh battery, 45 W fast charging",
        es: "Batería de 5,000 mAh, carga rápida de 45 W",
      },
      { en: "5G and IP68 water resistance", es: "5G y resistencia al agua IP68" },
    ],
    specs: [
      [
        "display",
        {
          en: "6.9″ Dynamic AMOLED 2X, QHD+, up to 120 Hz",
          es: "6.9″ Dynamic AMOLED 2X, QHD+, hasta 120 Hz",
        },
      ],
      ["chip", "Qualcomm Snapdragon 865"],
      ["memory", "12 GB"],
      [
        "storage",
        {
          en: "128 GB or 512 GB, plus microSD (up to 1 TB)",
          es: "128 GB o 512 GB, más microSD (hasta 1 TB)",
        },
      ],
      [
        "rear",
        {
          en: "108 MP wide · 48 MP telephoto (up to 100x Space Zoom) · 12 MP ultra-wide · depth sensor",
          es: "108 MP gran angular · 48 MP teleobjetivo (Space Zoom hasta 100x) · 12 MP ultra gran angular · sensor de profundidad",
        },
      ],
      ["front", "40 MP"],
      ["battery", "5,000 mAh"],
      [
        "charging",
        {
          en: "Up to 45 W wired, wireless and reverse wireless charging",
          es: "Hasta 45 W por cable, carga inalámbrica e inalámbrica inversa",
        },
      ],
      ["network", "5G"],
      ["water", "IP68"],
      [
        "extras",
        {
          en: "In-display fingerprint reader, stereo speakers",
          es: "Lector de huella en pantalla, bocinas estéreo",
        },
      ],
    ],
    photo: product(
      "s20-ultra",
      1200,
      683,
      {
        en: "Back of a Samsung Galaxy S20 Ultra showing its camera module",
        es: "Parte trasera de un Samsung Galaxy S20 Ultra con su módulo de cámaras",
      },
      "PantheraLeo1359531",
      "CC BY 4.0",
      "R%C3%BCckseite_Galaxy_S20_Ultra_20200305.jpg",
    ),
  },
  {
    id: "galaxy-note20-ultra",
    year: 2020,
    tagline: {
      en: "Built-in S Pen, a 6.9-inch 120 Hz screen and a 108 MP camera.",
      es: "S Pen integrado, pantalla de 6.9 pulgadas a 120 Hz y cámara de 108 MP.",
    },
    summary: {
      en: "The last and best of Samsung's Note line: a built-in S Pen for notes and drawing, a 6.9-inch 120 Hz display, a 108 MP camera with 5x optical zoom, and 5G. The one on our shelf is in Mystic Bronze.",
      es: "El último y mejor de la línea Note de Samsung: S Pen integrado para notas y dibujo, pantalla de 6.9 pulgadas a 120 Hz, cámara de 108 MP con zoom óptico de 5x y 5G. El que tenemos en vitrina es color Mystic Bronze.",
    },
    highlights: [
      { en: "Built-in S Pen", es: "S Pen integrado" },
      { en: "6.9″ QHD+ 120 Hz display", es: "Pantalla QHD+ de 6.9″ a 120 Hz" },
      {
        en: "108 MP camera, 5x optical / 50x Space Zoom",
        es: "Cámara de 108 MP, zoom óptico 5x / Space Zoom 50x",
      },
      { en: "5G and IP68", es: "5G e IP68" },
    ],
    specs: [
      [
        "display",
        {
          en: "6.9″ Dynamic AMOLED 2X, QHD+, up to 120 Hz",
          es: "6.9″ Dynamic AMOLED 2X, QHD+, hasta 120 Hz",
        },
      ],
      ["chip", "Qualcomm Snapdragon 865+"],
      ["memory", "12 GB"],
      ["storage", { en: "128 GB or 512 GB, plus microSD", es: "128 GB o 512 GB, más microSD" }],
      [
        "rear",
        {
          en: "108 MP wide · 12 MP 5x telephoto (up to 50x Space Zoom) · 12 MP ultra-wide · laser autofocus",
          es: "108 MP gran angular · 12 MP teleobjetivo 5x (Space Zoom hasta 50x) · 12 MP ultra gran angular · enfoque láser",
        },
      ],
      ["front", "10 MP"],
      ["battery", "4,500 mAh"],
      [
        "charging",
        {
          en: "25 W wired, wireless and reverse wireless charging",
          es: "25 W por cable, carga inalámbrica e inalámbrica inversa",
        },
      ],
      ["network", "5G"],
      ["water", "IP68"],
      [
        "extras",
        {
          en: "S Pen with Air Actions, in-display fingerprint reader",
          es: "S Pen con Air Actions, lector de huella en pantalla",
        },
      ],
    ],
    photo: product(
      "note20-ultra",
      900,
      1200,
      {
        en: "Samsung Galaxy Note 20 Ultra in Mystic Bronze",
        es: "Samsung Galaxy Note 20 Ultra color Mystic Bronze",
      },
      "Kskhh",
      "CC BY-SA 4.0",
      "Samsung_Galaxy_Note_20_Ultra_Mystic_Bronze.jpg",
    ),
  },
  {
    id: "galaxy-a53",
    year: 2022,
    tagline: {
      en: "A 120 Hz AMOLED screen and a 64 MP camera at a mid-range price.",
      es: "Pantalla AMOLED a 120 Hz y cámara de 64 MP a precio de gama media.",
    },
    summary: {
      en: "One of Samsung's best-selling mid-range phones: a smooth 6.5-inch 120 Hz Super AMOLED display, a 64 MP camera with image stabilization, IP67 water resistance and a battery that lasts all day.",
      es: "Uno de los gama media más vendidos de Samsung: pantalla Super AMOLED de 6.5 pulgadas a 120 Hz, cámara de 64 MP con estabilización, resistencia al agua IP67 y batería que dura todo el día.",
    },
    highlights: [
      { en: "6.5″ Super AMOLED, 120 Hz", es: "Super AMOLED de 6.5″ a 120 Hz" },
      { en: "64 MP camera with OIS", es: "Cámara de 64 MP con OIS" },
      { en: "5,000 mAh battery", es: "Batería de 5,000 mAh" },
      { en: "5G and IP67", es: "5G e IP67" },
    ],
    specs: [
      ["display", { en: "6.5″ Super AMOLED, FHD+, 120 Hz", es: "6.5″ Super AMOLED, FHD+, 120 Hz" }],
      ["chip", "Samsung Exynos 1280"],
      ["memory", "6 GB"],
      [
        "storage",
        { en: "128 GB, plus microSD (up to 1 TB)", es: "128 GB, más microSD (hasta 1 TB)" },
      ],
      [
        "rear",
        {
          en: "64 MP wide (OIS) · 12 MP ultra-wide · 5 MP macro · 5 MP depth",
          es: "64 MP gran angular (OIS) · 12 MP ultra gran angular · 5 MP macro · 5 MP profundidad",
        },
      ],
      ["front", "32 MP"],
      ["battery", "5,000 mAh"],
      ["charging", { en: "25 W fast charging", es: "Carga rápida de 25 W" }],
      ["network", "5G"],
      ["water", "IP67"],
      [
        "extras",
        {
          en: "In-display fingerprint reader, stereo speakers",
          es: "Lector de huella en pantalla, bocinas estéreo",
        },
      ],
    ],
    photo: product(
      "a53",
      1200,
      900,
      { en: "Samsung Galaxy A53 5G lying on a table", es: "Samsung Galaxy A53 5G sobre una mesa" },
      "RuinDig/Yuki Uchida",
      "CC BY 4.0",
      "Galaxy-A53-5G_02.jpg",
    ),
  },
  {
    id: "galaxy-a36",
    year: 2025,
    tagline: {
      en: "A 2025 Galaxy with a 6.7-inch 120 Hz screen and 45 W charging.",
      es: "Un Galaxy de 2025 con pantalla de 6.7 pulgadas a 120 Hz y carga de 45 W.",
    },
    summary: {
      en: "Samsung's 2025 mid-range phone: a big 6.7-inch 120 Hz Super AMOLED display, a 50 MP stabilized camera, Snapdragon power, 45 W fast charging and six years of Android updates promised by Samsung.",
      es: "El gama media de Samsung de 2025: pantalla Super AMOLED grande de 6.7 pulgadas a 120 Hz, cámara de 50 MP estabilizada, procesador Snapdragon, carga rápida de 45 W y seis años de actualizaciones de Android prometidos por Samsung.",
    },
    highlights: [
      { en: "6.7″ Super AMOLED, 120 Hz", es: "Super AMOLED de 6.7″ a 120 Hz" },
      { en: "50 MP camera with OIS", es: "Cámara de 50 MP con OIS" },
      { en: "45 W fast charging", es: "Carga rápida de 45 W" },
      { en: "6 years of Android updates", es: "6 años de actualizaciones de Android" },
    ],
    specs: [
      ["display", { en: "6.7″ Super AMOLED, FHD+, 120 Hz", es: "6.7″ Super AMOLED, FHD+, 120 Hz" }],
      ["chip", "Qualcomm Snapdragon 6 Gen 3"],
      ["memory", { en: "6 GB or 8 GB", es: "6 GB u 8 GB" }],
      ["storage", { en: "128 GB or 256 GB", es: "128 GB o 256 GB" }],
      [
        "rear",
        {
          en: "50 MP wide (OIS) · 8 MP ultra-wide · 5 MP macro",
          es: "50 MP gran angular (OIS) · 8 MP ultra gran angular · 5 MP macro",
        },
      ],
      ["front", "12 MP"],
      ["battery", "5,000 mAh"],
      ["charging", { en: "45 W fast charging", es: "Carga rápida de 45 W" }],
      ["network", "5G"],
      ["water", "IP67"],
      [
        "extras",
        {
          en: "In-display fingerprint reader, Gorilla Glass Victus+",
          es: "Lector de huella en pantalla, Gorilla Glass Victus+",
        },
      ],
    ],
    photo: product(
      "a36",
      578,
      1200,
      {
        en: "Samsung Galaxy A36 5G with its home screen on",
        es: "Samsung Galaxy A36 5G con la pantalla de inicio encendida",
      },
      "Captainmorlypogi1959",
      "CC BY-SA 4.0",
      "Samsung_Galaxy_A36_5G_2025_(cropped).jpg",
    ),
  },
  {
    id: "galaxy-a26",
    year: 2025,
    tagline: {
      en: "A 6.7-inch 120 Hz AMOLED phone with IP67 and six years of updates.",
      es: "Pantalla AMOLED de 6.7 pulgadas a 120 Hz, IP67 y seis años de actualizaciones.",
    },
    summary: {
      en: "A 2025 Galaxy that punches above its price: a 6.7-inch 120 Hz Super AMOLED display, a 50 MP stabilized camera, IP67 water resistance, a microSD slot and six years of Android updates promised by Samsung.",
      es: "Un Galaxy de 2025 que da más de lo que cuesta: pantalla Super AMOLED de 6.7 pulgadas a 120 Hz, cámara de 50 MP estabilizada, resistencia al agua IP67, ranura microSD y seis años de actualizaciones de Android prometidos por Samsung.",
    },
    highlights: [
      { en: "6.7″ Super AMOLED, 120 Hz", es: "Super AMOLED de 6.7″ a 120 Hz" },
      { en: "50 MP camera with OIS", es: "Cámara de 50 MP con OIS" },
      { en: "IP67 water resistance", es: "Resistencia al agua IP67" },
      { en: "microSD slot", es: "Ranura microSD" },
    ],
    specs: [
      ["display", { en: "6.7″ Super AMOLED, FHD+, 120 Hz", es: "6.7″ Super AMOLED, FHD+, 120 Hz" }],
      ["chip", "Samsung Exynos 1380"],
      ["memory", { en: "6 GB or 8 GB", es: "6 GB u 8 GB" }],
      [
        "storage",
        {
          en: "128 GB or 256 GB, plus microSD (up to 2 TB)",
          es: "128 GB o 256 GB, más microSD (hasta 2 TB)",
        },
      ],
      [
        "rear",
        {
          en: "50 MP wide (OIS) · 8 MP ultra-wide · 2 MP macro",
          es: "50 MP gran angular (OIS) · 8 MP ultra gran angular · 2 MP macro",
        },
      ],
      ["front", "13 MP"],
      ["battery", "5,000 mAh"],
      ["charging", { en: "25 W fast charging", es: "Carga rápida de 25 W" }],
      ["network", "5G"],
      ["water", "IP67"],
      [
        "extras",
        {
          en: "Side fingerprint reader, 6 years of Android updates",
          es: "Lector de huella lateral, 6 años de actualizaciones de Android",
        },
      ],
    ],
    photo: product(
      "a26",
      610,
      1200,
      {
        en: "Samsung Galaxy A26 5G with its home screen on",
        es: "Samsung Galaxy A26 5G con la pantalla de inicio encendida",
      },
      "Captainmorlypogi1959",
      "CC BY-SA 4.0",
      "Samsung_Galaxy_A26_5G_2025_(cropped).jpg",
    ),
  },
  {
    id: "galaxy-a16",
    year: 2024,
    tagline: {
      en: "An affordable 5G Galaxy with a 6.7-inch AMOLED screen and six years of updates.",
      es: "Un Galaxy 5G económico con pantalla AMOLED de 6.7 pulgadas y seis años de actualizaciones.",
    },
    summary: {
      en: "A budget-friendly 5G phone with a big 6.7-inch Super AMOLED display, a 50 MP camera, a 5,000 mAh battery and a microSD slot — and Samsung promises six years of Android updates, rare at this price.",
      es: "Un celular 5G económico con pantalla Super AMOLED grande de 6.7 pulgadas, cámara de 50 MP, batería de 5,000 mAh y ranura microSD; Samsung promete seis años de actualizaciones de Android, algo raro a este precio.",
    },
    highlights: [
      { en: "6.7″ Super AMOLED, 90 Hz", es: "Super AMOLED de 6.7″ a 90 Hz" },
      { en: "50 MP main camera", es: "Cámara principal de 50 MP" },
      { en: "5,000 mAh battery", es: "Batería de 5,000 mAh" },
      { en: "6 years of Android updates", es: "6 años de actualizaciones de Android" },
    ],
    specs: [
      ["display", { en: "6.7″ Super AMOLED, FHD+, 90 Hz", es: "6.7″ Super AMOLED, FHD+, 90 Hz" }],
      [
        "chip",
        {
          en: "MediaTek Dimensity 6300 (US model)",
          es: "MediaTek Dimensity 6300 (modelo de EE. UU.)",
        },
      ],
      [
        "storage",
        { en: "128 GB, plus microSD (up to 1.5 TB)", es: "128 GB, más microSD (hasta 1.5 TB)" },
      ],
      [
        "rear",
        {
          en: "50 MP wide · 5 MP ultra-wide · 2 MP macro",
          es: "50 MP gran angular · 5 MP ultra gran angular · 2 MP macro",
        },
      ],
      ["front", "13 MP"],
      ["battery", "5,000 mAh"],
      ["charging", { en: "25 W fast charging", es: "Carga rápida de 25 W" }],
      ["network", "5G"],
      ["water", "IP54"],
      ["extras", { en: "Side fingerprint reader", es: "Lector de huella lateral" }],
    ],
    photo: product(
      "a16",
      686,
      1200,
      {
        en: "Samsung Galaxy A16 5G with its home screen on",
        es: "Samsung Galaxy A16 5G con la pantalla de inicio encendida",
      },
      "Captainmorlypogi1959",
      "CC BY-SA 4.0",
      "Samsung_Galaxy_A16_5G_2025_(cropped).jpg",
    ),
  },
  {
    id: "galaxy-a15",
    year: 2023,
    tagline: {
      en: "A Super AMOLED 5G phone with a 50 MP camera at an entry-level price.",
      es: "Un 5G con pantalla Super AMOLED y cámara de 50 MP a precio de entrada.",
    },
    summary: {
      en: "An easy, affordable everyday phone: a 6.5-inch Super AMOLED display, 5G, a 50 MP camera, a 5,000 mAh battery and room to add a microSD card.",
      es: "Un celular sencillo y económico para el día a día: pantalla Super AMOLED de 6.5 pulgadas, 5G, cámara de 50 MP, batería de 5,000 mAh y espacio para tarjeta microSD.",
    },
    highlights: [
      { en: "6.5″ Super AMOLED, 90 Hz", es: "Super AMOLED de 6.5″ a 90 Hz" },
      { en: "50 MP main camera", es: "Cámara principal de 50 MP" },
      { en: "5,000 mAh battery", es: "Batería de 5,000 mAh" },
      { en: "5G", es: "5G" },
    ],
    specs: [
      ["display", { en: "6.5″ Super AMOLED, FHD+, 90 Hz", es: "6.5″ Super AMOLED, FHD+, 90 Hz" }],
      ["chip", "MediaTek Dimensity 6100+"],
      [
        "storage",
        {
          en: "64 GB or 128 GB, plus microSD (up to 1 TB)",
          es: "64 GB o 128 GB, más microSD (hasta 1 TB)",
        },
      ],
      [
        "rear",
        {
          en: "50 MP wide · 5 MP ultra-wide · 2 MP macro",
          es: "50 MP gran angular · 5 MP ultra gran angular · 2 MP macro",
        },
      ],
      ["front", "13 MP"],
      ["battery", "5,000 mAh"],
      ["charging", { en: "25 W fast charging", es: "Carga rápida de 25 W" }],
      ["network", "5G"],
      [
        "extras",
        {
          en: "Side fingerprint reader, headphone jack",
          es: "Lector de huella lateral, entrada para audífonos",
        },
      ],
    ],
    photo: product(
      "a15",
      1200,
      948,
      {
        en: "Back of a Samsung Galaxy A15 in dark blue",
        es: "Parte trasera de un Samsung Galaxy A15 azul oscuro",
      },
      "PantheraLeo1359531",
      "CC BY 4.0",
      "Samsung_Galaxy_A15_20240529_HOF7502_RAW-Export_cens.png",
    ),
  },
  {
    id: "galaxy-a14",
    year: 2023,
    tagline: {
      en: "A big-screen 5G phone with a 50 MP camera and a two-day-class battery.",
      es: "Un 5G de pantalla grande con cámara de 50 MP y batería de larga duración.",
    },
    summary: {
      en: "A simple, dependable 5G phone: a 6.6-inch 90 Hz display, a 50 MP camera, a 5,000 mAh battery and a microSD slot for photos and videos.",
      es: "Un celular 5G sencillo y confiable: pantalla de 6.6 pulgadas a 90 Hz, cámara de 50 MP, batería de 5,000 mAh y ranura microSD para fotos y videos.",
    },
    highlights: [
      { en: "6.6″ FHD+ display, 90 Hz", es: "Pantalla FHD+ de 6.6″ a 90 Hz" },
      { en: "50 MP main camera", es: "Cámara principal de 50 MP" },
      { en: "5,000 mAh battery", es: "Batería de 5,000 mAh" },
      { en: "5G", es: "5G" },
    ],
    specs: [
      ["display", { en: "6.6″ LCD, FHD+, 90 Hz", es: "6.6″ LCD, FHD+, 90 Hz" }],
      [
        "chip",
        {
          en: "MediaTek Dimensity 700 (US model)",
          es: "MediaTek Dimensity 700 (modelo de EE. UU.)",
        },
      ],
      ["memory", "4 GB"],
      [
        "storage",
        { en: "64 GB, plus microSD (up to 1 TB)", es: "64 GB, más microSD (hasta 1 TB)" },
      ],
      [
        "rear",
        {
          en: "50 MP wide · 2 MP macro · 2 MP depth",
          es: "50 MP gran angular · 2 MP macro · 2 MP profundidad",
        },
      ],
      ["front", "13 MP"],
      ["battery", "5,000 mAh"],
      ["charging", { en: "15 W charging", es: "Carga de 15 W" }],
      ["network", "5G"],
      [
        "extras",
        {
          en: "Side fingerprint reader, headphone jack",
          es: "Lector de huella lateral, entrada para audífonos",
        },
      ],
    ],
    photo: product(
      "a14",
      610,
      1200,
      {
        en: "Back of a Samsung Galaxy A14 5G showing its three cameras",
        es: "Parte trasera de un Samsung Galaxy A14 5G con sus tres cámaras",
      },
      "Worm-b0y16",
      "CC0",
      "Samsung_Galaxy_A14_5G.jpg",
    ),
  },
  {
    id: "galaxy-a13",
    year: 2021,
    tagline: {
      en: "An affordable 5G Galaxy with a 50 MP camera and a 5,000 mAh battery.",
      es: "Un Galaxy 5G económico con cámara de 50 MP y batería de 5,000 mAh.",
    },
    summary: {
      en: "A budget 5G phone that covers the basics well: a 6.5-inch 90 Hz display, a 50 MP camera, a 5,000 mAh battery and a microSD slot.",
      es: "Un celular 5G económico que cumple bien lo básico: pantalla de 6.5 pulgadas a 90 Hz, cámara de 50 MP, batería de 5,000 mAh y ranura microSD.",
    },
    highlights: [
      { en: "6.5″ display, 90 Hz", es: "Pantalla de 6.5″ a 90 Hz" },
      { en: "50 MP main camera", es: "Cámara principal de 50 MP" },
      { en: "5,000 mAh battery", es: "Batería de 5,000 mAh" },
      { en: "5G", es: "5G" },
    ],
    specs: [
      ["display", { en: "6.5″ LCD, HD+, 90 Hz", es: "6.5″ LCD, HD+, 90 Hz" }],
      ["chip", "MediaTek Dimensity 700"],
      ["memory", "4 GB"],
      [
        "storage",
        { en: "64 GB, plus microSD (up to 1 TB)", es: "64 GB, más microSD (hasta 1 TB)" },
      ],
      [
        "rear",
        {
          en: "50 MP wide · 2 MP macro · 2 MP depth",
          es: "50 MP gran angular · 2 MP macro · 2 MP profundidad",
        },
      ],
      ["front", "5 MP"],
      ["battery", "5,000 mAh"],
      ["charging", { en: "15 W charging", es: "Carga de 15 W" }],
      ["network", "5G"],
      [
        "extras",
        {
          en: "Side fingerprint reader, headphone jack",
          es: "Lector de huella lateral, entrada para audífonos",
        },
      ],
    ],
    photo: product(
      "a13",
      636,
      1200,
      {
        en: "Samsung Galaxy A13 on a store display stand",
        es: "Samsung Galaxy A13 en un exhibidor de tienda",
      },
      "Hajoon0102",
      "CC BY-SA 4.0",
      "Samsung_Galaxy_A13_(cropped).jpg",
    ),
  },
  {
    id: "galaxy-a20",
    year: 2019,
    tagline: {
      en: "A simple Galaxy with a Super AMOLED screen and an ultra-wide camera.",
      es: "Un Galaxy sencillo con pantalla Super AMOLED y cámara ultra gran angular.",
    },
    summary: {
      en: "An easy starter phone: a 6.4-inch Super AMOLED display, a dual camera with ultra-wide, a 4,000 mAh battery and fast charging. Works on 4G LTE.",
      es: "Un celular sencillo para empezar: pantalla Super AMOLED de 6.4 pulgadas, cámara doble con ultra gran angular, batería de 4,000 mAh y carga rápida. Funciona en 4G LTE.",
    },
    highlights: [
      { en: "6.4″ Super AMOLED display", es: "Pantalla Super AMOLED de 6.4″" },
      { en: "13 MP + ultra-wide camera", es: "Cámara de 13 MP + ultra gran angular" },
      { en: "4,000 mAh battery", es: "Batería de 4,000 mAh" },
      { en: "4G LTE", es: "4G LTE" },
    ],
    specs: [
      ["display", { en: "6.4″ Super AMOLED, HD+", es: "6.4″ Super AMOLED, HD+" }],
      ["chip", "Samsung Exynos 7884"],
      ["memory", "3 GB"],
      [
        "storage",
        { en: "32 GB, plus microSD (up to 512 GB)", es: "32 GB, más microSD (hasta 512 GB)" },
      ],
      [
        "rear",
        { en: "13 MP wide · 5 MP ultra-wide", es: "13 MP gran angular · 5 MP ultra gran angular" },
      ],
      ["front", "8 MP"],
      ["battery", "4,000 mAh"],
      ["charging", { en: "15 W fast charging", es: "Carga rápida de 15 W" }],
      ["network", "4G LTE"],
      [
        "extras",
        {
          en: "Rear fingerprint reader, headphone jack",
          es: "Lector de huella trasero, entrada para audífonos",
        },
      ],
    ],
    photo: product(
      "a20",
      1200,
      900,
      { en: "Front of a Samsung Galaxy A20", es: "Frente de un Samsung Galaxy A20" },
      "Pancho507",
      "CC BY-SA 4.0",
      "Samsung_Galaxy_A20_front.jpg",
    ),
  },
  {
    id: "galaxy-a03s",
    year: 2021,
    tagline: {
      en: "A no-fuss Galaxy with a big 6.5-inch screen and a 5,000 mAh battery.",
      es: "Un Galaxy práctico con pantalla grande de 6.5 pulgadas y batería de 5,000 mAh.",
    },
    summary: {
      en: "A low-cost phone for calls, texts, WhatsApp and video: a 6.5-inch display, a triple camera, a 5,000 mAh battery, a fingerprint reader and a microSD slot. Works on 4G LTE.",
      es: "Un celular económico para llamadas, mensajes, WhatsApp y videos: pantalla de 6.5 pulgadas, cámara triple, batería de 5,000 mAh, lector de huella y ranura microSD. Funciona en 4G LTE.",
    },
    highlights: [
      { en: "6.5″ HD+ display", es: "Pantalla HD+ de 6.5″" },
      { en: "13 MP triple camera", es: "Cámara triple de 13 MP" },
      { en: "5,000 mAh battery", es: "Batería de 5,000 mAh" },
      { en: "4G LTE", es: "4G LTE" },
    ],
    specs: [
      ["display", { en: "6.5″ LCD, HD+", es: "6.5″ LCD, HD+" }],
      ["chip", "MediaTek Helio P35"],
      [
        "storage",
        { en: "32 GB, plus microSD (up to 1 TB)", es: "32 GB, más microSD (hasta 1 TB)" },
      ],
      [
        "rear",
        {
          en: "13 MP wide · 2 MP macro · 2 MP depth",
          es: "13 MP gran angular · 2 MP macro · 2 MP profundidad",
        },
      ],
      ["front", "5 MP"],
      ["battery", "5,000 mAh"],
      ["network", "4G LTE"],
      [
        "extras",
        {
          en: "Side fingerprint reader, headphone jack",
          es: "Lector de huella lateral, entrada para audífonos",
        },
      ],
    ],
  },
  {
    id: "ipad-pro-m2",
    year: 2022,
    tagline: {
      en: "Apple's M2 chip, a ProMotion display and Apple Pencil hover.",
      es: "Chip M2 de Apple, pantalla ProMotion y Apple Pencil con detección al pasar.",
    },
    summary: {
      en: "The 11-inch iPad Pro (4th generation) with M2 is a laptop-class tablet: a 120 Hz ProMotion Liquid Retina display, Face ID, Thunderbolt USB-C, pro cameras with LiDAR, and support for Apple Pencil (2nd generation) and Magic Keyboard.",
      es: "El iPad Pro de 11 pulgadas (4.ª generación) con M2 es una tableta con potencia de laptop: pantalla Liquid Retina ProMotion a 120 Hz, Face ID, USB-C Thunderbolt, cámaras profesionales con LiDAR y compatibilidad con Apple Pencil (2.ª generación) y Magic Keyboard.",
    },
    highlights: [
      { en: "Apple M2 chip", es: "Chip Apple M2" },
      { en: "120 Hz ProMotion display", es: "Pantalla ProMotion a 120 Hz" },
      { en: "Face ID and Thunderbolt USB-C", es: "Face ID y USB-C Thunderbolt" },
      { en: "Apple Pencil (2nd gen) hover", es: "Apple Pencil (2.ª gen.) con detección al pasar" },
    ],
    specs: [
      [
        "display",
        {
          en: "11″ Liquid Retina, 2388 × 1668, ProMotion up to 120 Hz",
          es: "11″ Liquid Retina, 2388 × 1668, ProMotion hasta 120 Hz",
        },
      ],
      ["chip", "Apple M2"],
      ["storage", { en: "128 GB to 2 TB", es: "De 128 GB a 2 TB" }],
      [
        "rear",
        {
          en: "12 MP wide · 10 MP ultra-wide · LiDAR scanner",
          es: "12 MP gran angular · 10 MP ultra gran angular · escáner LiDAR",
        },
      ],
      [
        "front",
        {
          en: "12 MP ultra-wide with Center Stage",
          es: "12 MP ultra gran angular con Encuadre centrado",
        },
      ],
      [
        "battery",
        {
          en: "Up to 10 hours of web browsing or video",
          es: "Hasta 10 horas de navegación o video",
        },
      ],
      ["charging", "USB-C (Thunderbolt / USB 4)"],
      [
        "network",
        {
          en: "Wi-Fi 6E; some models add 5G cellular",
          es: "Wi-Fi 6E; algunos modelos con celular 5G",
        },
      ],
      [
        "extras",
        {
          en: "Face ID, four speakers, Apple Pencil (2nd gen) and Magic Keyboard support",
          es: "Face ID, cuatro bocinas, compatible con Apple Pencil (2.ª gen.) y Magic Keyboard",
        },
      ],
    ],
    photo: product(
      "ipad-pro",
      1200,
      898,
      {
        en: "iPad Pro with M2 in a Magic Keyboard on a store display",
        es: "iPad Pro con M2 en un Magic Keyboard en una exhibición de tienda",
      },
      "Captainmorlypogi1959",
      "CC BY-SA 4.0",
      "IPad_Pro_M2_(12.9_inch)_6th_Generation_2024.jpg",
    ),
  },
  {
    id: "ipad-mini-5",
    year: 2019,
    tagline: {
      en: "A one-hand iPad with an A12 Bionic chip and Apple Pencil support.",
      es: "Un iPad para una mano con chip A12 Bionic y compatible con Apple Pencil.",
    },
    summary: {
      en: "The small iPad that fits in a jacket pocket: a 7.9-inch Retina display with True Tone, the A12 Bionic chip, Touch ID and support for the first-generation Apple Pencil. Great for reading, kids, video and travel. Ours is in gold.",
      es: "El iPad pequeño que cabe en el bolsillo de una chamarra: pantalla Retina de 7.9 pulgadas con True Tone, chip A12 Bionic, Touch ID y compatible con el Apple Pencil de primera generación. Ideal para leer, para niños, videos y viajes. El nuestro es color oro.",
    },
    highlights: [
      { en: "7.9″ Retina display with True Tone", es: "Pantalla Retina de 7.9″ con True Tone" },
      { en: "A12 Bionic chip", es: "Chip A12 Bionic" },
      { en: "Touch ID", es: "Touch ID" },
      { en: "Apple Pencil (1st gen) support", es: "Compatible con Apple Pencil (1.ª gen.)" },
    ],
    specs: [
      ["display", { en: "7.9″ Retina, True Tone", es: "7.9″ Retina, True Tone" }],
      ["chip", "Apple A12 Bionic"],
      ["storage", { en: "64 GB or 256 GB", es: "64 GB o 256 GB" }],
      ["rear", "8 MP"],
      ["front", "7 MP FaceTime HD"],
      [
        "battery",
        {
          en: "Up to 10 hours of web browsing or video",
          es: "Hasta 10 horas de navegación o video",
        },
      ],
      ["charging", "Lightning"],
      [
        "network",
        {
          en: "Wi-Fi; some models add 4G LTE cellular",
          es: "Wi-Fi; algunos modelos con celular 4G LTE",
        },
      ],
      [
        "extras",
        {
          en: "Touch ID, headphone jack, Apple Pencil (1st gen) support",
          es: "Touch ID, entrada para audífonos, compatible con Apple Pencil (1.ª gen.)",
        },
      ],
    ],
    photo: product(
      "ipad-mini",
      900,
      1200,
      {
        en: "iPad mini 5th generation in gold, front",
        es: "iPad mini de 5.ª generación color oro, de frente",
      },
      "まる。",
      "CC BY-SA 3.0",
      "IPad_mini_(5th_generation).JPG",
    ),
  },
];

const ALL_DETAILS = [...DETAILS, ...CATALOG_DETAILS];

/** Devices with their own /devices page, newest first (the order of LATEST_DEVICES). */
export const DEVICE_PAGES: { device: Device; detail: DeviceDetail }[] = LATEST_DEVICES.flatMap(
  (device) => {
    const detail = ALL_DETAILS.find((d) => d.id === device.id);
    return detail ? [{ device, detail }] : [];
  },
);

/** Full name for headings and titles, e.g. "Samsung Galaxy A16 5G" or "iPhone 18 Pro Max". */
export const deviceTitle = (device: Device, detail: DeviceDetail) =>
  detail.title ?? `${device.brand === "Samsung" ? "Samsung " : ""}${device.name}`;

export const findDevice = (id: string) => DEVICE_PAGES.find((p) => p.device.id === id);

export const specValue = (v: V, lang: Lang) => (typeof v === "string" ? v : v[lang]);

/** Shown with every spec table. */
export const SPECS_NOTE: L = {
  en: "Manufacturer specs for the US model at launch. The unit on our shelf may differ in storage, color and condition — call to confirm before you come in.",
  es: "Especificaciones del fabricante para el modelo de EE. UU. al salir a la venta. La unidad en vitrina puede variar en capacidad, color y estado; llama para confirmar antes de venir.",
};
