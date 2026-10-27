import { CATALOG_PHOTOS } from "@/components/products/catalog-photos";
import type { DeviceDetail, ProductPhoto, SpecKey } from "@/components/products/devices";
import type { Device, DeviceKind } from "@/components/products/inventory";
import type { Lang } from "@/components/site/seo";

// iPhones and Galaxy S phones from the owner's stock list (Oct 16, 2026): Galaxy S21–S26 and
// iPhone 11–18 Pro. (The Galaxy S20 Ultra, Note 20 Ultra and iPhone 18 Pro Max were already on
// the site — see inventory.ts.) Specs are the manufacturer's US launch specs, checked against
// Apple's tech-spec pages and Samsung's comparison pages where noted; values not confirmed are
// left out, and every page says the unit on the shelf may differ. These are mostly pre-owned,
// unlocked phones, so condition, storage and color are always "ask in store".
//
// Photos come from Wikimedia Commons (catalog-photos.ts, generated with credits).

type L = Record<Lang, string>;
type V = string | L;

type Cam = [mp: number, role: "wide" | "main" | "uw" | "tele" | "lidar", zoom?: number];

type Model = {
  id: string;
  /** Defaults to "iphone" for Apple and "galaxy-flagship" for Samsung. */
  kind?: DeviceKind;
  name: string;
  brand: "Apple" | "Samsung";
  family: string;
  year: number;
  fiveG: boolean;
  /** One line under the title: what makes this model worth it. */
  pitch: L;
  /** Fourth highlight: the model's standout feature. */
  feature: L;
  display: {
    size: number;
    panel: string;
    res?: string;
    hz?: number;
    aod?: boolean;
    island?: boolean;
    /** Foldables: the outside (cover) screen, in inches. */
    cover?: number;
  };
  chip: string;
  ram?: V;
  /** Storage sizes ("1 TB" style), or "from:128 GB" when the full list isn't confirmed. */
  storage?: string[] | `from:${string}`;
  cams: Cam[];
  /** Samsung Space Zoom, e.g. 30 or 100. */
  spaceZoom?: number;
  front: V;
  battery: { mah?: number; videoHours?: number };
  charging: L;
  network: V;
  water?: string;
  extras: L;
};

const CAM: Record<Cam[1], L> = {
  wide: { en: "wide", es: "gran angular" },
  main: { en: "main", es: "principal" },
  uw: { en: "ultra-wide", es: "ultra gran angular" },
  tele: { en: "telephoto", es: "teleobjetivo" },
  lidar: { en: "LiDAR scanner", es: "escáner LiDAR" },
};

const bi = (en: string, es: string): L => ({ en, es });

function displaySpec(d: Model["display"]): L {
  const parts = (lang: Lang) =>
    [
      `${d.size}″ ${d.panel}${d.res ? `, ${d.res}` : ""}`,
      d.hz ? (lang === "en" ? `up to ${d.hz} Hz` : `hasta ${d.hz} Hz`) : "",
      d.aod ? (lang === "en" ? "Always-On" : "siempre activa") : "",
      d.island ? "Dynamic Island" : "",
      d.cover
        ? lang === "en"
          ? `${d.cover}″ cover screen`
          : `pantalla exterior de ${d.cover}″`
        : "",
    ]
      .filter(Boolean)
      .join(", ");
  return { en: parts("en"), es: parts("es") };
}

function camsSpec(cams: Cam[], spaceZoom?: number): L {
  const one = (lang: Lang) =>
    cams
      .map(([mp, role, zoom]) =>
        role === "lidar"
          ? CAM.lidar[lang]
          : `${mp} MP ${zoom ? `${zoom}x ` : ""}${CAM[role][lang]}`,
      )
      .join(" · ") +
    (spaceZoom
      ? lang === "en"
        ? ` (up to ${spaceZoom}x Space Zoom)`
        : ` (Space Zoom hasta ${spaceZoom}x)`
      : "");
  return { en: one("en"), es: one("es") };
}

function storageSpec(s: Model["storage"]): V | undefined {
  if (!s) return undefined;
  if (typeof s === "string") {
    const size = s.slice(5);
    return bi(`From ${size}`, `Desde ${size}`);
  }
  if (s.length === 1) return s[0] ?? "";
  const head = s.slice(0, -1).join(", ");
  const last = s.at(-1) ?? "";
  return bi(`${head} or ${last}`, `${head} o ${last}`);
}

function batterySpec(b: Model["battery"]): V {
  const mah = b.mah ? `${b.mah.toLocaleString("en-US")} mAh` : "";
  if (!b.videoHours) return mah;
  const en = `Up to ${b.videoHours} hours of video playback`;
  const es = `Hasta ${b.videoHours} horas de reproducción de video`;
  return mah ? bi(`${mah} · ${en.toLowerCase()}`, `${mah} · ${es.toLowerCase()}`) : bi(en, es);
}

function toDetail(m: Model, photos: ProductPhoto[]): DeviceDetail {
  const full = `${m.brand === "Samsung" ? "Samsung " : ""}${m.name}`;
  const main = m.cams[0]?.[0] ?? 12;
  const specs: [SpecKey, V | undefined][] = [
    ["display", displaySpec(m.display)],
    ["chip", m.chip],
    ["memory", m.ram],
    ["storage", storageSpec(m.storage)],
    ["rear", camsSpec(m.cams, m.spaceZoom)],
    ["front", m.front],
    ["battery", batterySpec(m.battery)],
    ["charging", m.charging],
    ["network", m.network],
    ["water", m.water],
    ["extras", m.extras],
  ];
  const panelShort = m.display.panel
    .replace(/^Super Retina XDR /, "")
    .replace(/^Liquid Retina HD /, "");
  const battery =
    m.battery.videoHours !== undefined
      ? bi(
          `Up to ${m.battery.videoHours} hours of video`,
          `Hasta ${m.battery.videoHours} horas de video`,
        )
      : bi(
          `${(m.battery.mah ?? 0).toLocaleString("en-US")} mAh battery`,
          `Batería de ${(m.battery.mah ?? 0).toLocaleString("en-US")} mAh`,
        );
  const [photo, ...more] = photos;
  return {
    id: m.id,
    year: m.year,
    tagline: m.pitch,
    summary: {
      en: `The ${full} came out in ${m.year}. It has a ${m.display.size}-inch ${panelShort} display, the ${m.chip} chip, a ${main} MP main camera and ${m.battery.videoHours ? `up to ${m.battery.videoHours} hours of video playback` : `a ${(m.battery.mah ?? 0).toLocaleString("en-US")} mAh battery`}. ${m.pitch.en} We sell it unlocked at our Hillcroft store — ask us about the condition, storage and color of the unit on the shelf.`,
      es: `El ${full} salió en ${m.year}. Tiene pantalla ${panelShort} de ${m.display.size} pulgadas, chip ${m.chip}, cámara principal de ${main} MP y ${m.battery.videoHours ? `hasta ${m.battery.videoHours} horas de reproducción de video` : `batería de ${(m.battery.mah ?? 0).toLocaleString("en-US")} mAh`}. ${m.pitch.es} Lo vendemos desbloqueado en nuestra tienda de Hillcroft; pregúntanos por el estado, la capacidad y el color de la unidad en vitrina.`,
    },
    highlights: [
      bi(
        `${m.display.size}″ ${panelShort}${m.display.hz ? `, ${m.display.hz} Hz` : ""}`,
        `Pantalla ${panelShort} de ${m.display.size}″${m.display.hz ? ` a ${m.display.hz} Hz` : ""}`,
      ),
      bi(`${main} MP main camera`, `Cámara principal de ${main} MP`),
      battery,
      m.feature,
    ],
    specs: specs.filter((s): s is [SpecKey, V] => s[1] !== undefined && s[1] !== ""),
    ...(photo ? { photo } : {}),
    ...(more.length ? { morePhotos: more } : {}),
  };
}

function toDevice(m: Model, photo: ProductPhoto | undefined): Device {
  return {
    id: m.id,
    name: m.name,
    brand: m.brand,
    kind: m.kind ?? (m.brand === "Apple" ? "iphone" : "galaxy-flagship"),
    family: m.family,
    year: m.year,
    fiveG: m.fiveG,
    image: photo?.src ?? "/photos/phones-display.jpg",
    w: photo?.w ?? 900,
    h: photo?.h ?? 675,
    alt: photo?.alt ?? bi(`${m.name} at TIC Wireless`, `${m.name} en TIC Wireless`),
    fit: "contain",
  };
}

// ---------------------------------------------------------------------------------------------
// Samsung Galaxy S. US models: Snapdragon in the S21–S25 lines; Exynos 2600 in the S26
// (Samsung US FAQ). S26 specs from samsung.com/us (compare page and S26 page, 2026).

const SAMSUNG_25W = bi(
  "25 W fast charging, wireless charging",
  "Carga rápida de 25 W, carga inalámbrica",
);
const SAMSUNG_45W = bi(
  "45 W fast charging, wireless charging",
  "Carga rápida de 45 W, carga inalámbrica",
);
const AMOLED = "Dynamic AMOLED 2X";
const sPen = bi("Built-in S Pen", "S Pen integrado");
const galaxyAi = bi("Galaxy AI", "Galaxy AI");

const SAMSUNG: Model[] = [
  {
    id: "galaxy-s21",
    name: "Galaxy S21",
    brand: "Samsung",
    family: "Galaxy S21",
    year: 2021,
    fiveG: true,
    pitch: bi(
      "A compact 5G flagship with a 120 Hz screen and a 3x zoom camera.",
      "Un modelo insignia 5G compacto con pantalla de 120 Hz y cámara con zoom 3x.",
    ),
    feature: bi("30x Space Zoom", "Space Zoom 30x"),
    display: { size: 6.2, panel: AMOLED, res: "FHD+", hz: 120 },
    chip: "Snapdragon 888",
    ram: "8 GB",
    storage: ["128 GB", "256 GB"],
    cams: [
      [12, "wide"],
      [12, "uw"],
      [64, "tele", 3],
    ],
    spaceZoom: 30,
    front: "10 MP",
    battery: { mah: 4000 },
    charging: SAMSUNG_25W,
    network: "5G",
    water: "IP68",
    extras: bi(
      "Ultrasonic in-display fingerprint reader, stereo speakers",
      "Lector de huella ultrasónico en pantalla, bocinas estéreo",
    ),
  },
  {
    id: "galaxy-s21-plus",
    name: "Galaxy S21+",
    brand: "Samsung",
    family: "Galaxy S21",
    year: 2021,
    fiveG: true,
    pitch: bi(
      "The bigger S21: a 6.7-inch 120 Hz screen and a larger battery.",
      "El S21 más grande: pantalla de 6.7 pulgadas a 120 Hz y más batería.",
    ),
    feature: bi("4,800 mAh battery", "Batería de 4,800 mAh"),
    display: { size: 6.7, panel: AMOLED, res: "FHD+", hz: 120 },
    chip: "Snapdragon 888",
    ram: "8 GB",
    storage: ["128 GB", "256 GB"],
    cams: [
      [12, "wide"],
      [12, "uw"],
      [64, "tele", 3],
    ],
    spaceZoom: 30,
    front: "10 MP",
    battery: { mah: 4800 },
    charging: SAMSUNG_25W,
    network: "5G",
    water: "IP68",
    extras: bi(
      "Ultrasonic in-display fingerprint reader, stereo speakers",
      "Lector de huella ultrasónico en pantalla, bocinas estéreo",
    ),
  },
  {
    id: "galaxy-s21-ultra",
    name: "Galaxy S21 Ultra",
    brand: "Samsung",
    family: "Galaxy S21",
    year: 2021,
    fiveG: true,
    pitch: bi(
      "A 108 MP camera with two zoom lenses and the first Galaxy S to work with the S Pen.",
      "Cámara de 108 MP con dos lentes de zoom y el primer Galaxy S compatible con S Pen.",
    ),
    feature: bi("100x Space Zoom", "Space Zoom 100x"),
    display: { size: 6.8, panel: AMOLED, res: "QHD+", hz: 120 },
    chip: "Snapdragon 888",
    ram: "12 GB or 16 GB",
    storage: ["128 GB", "256 GB", "512 GB"],
    cams: [
      [108, "wide"],
      [12, "uw"],
      [10, "tele", 3],
      [10, "tele", 10],
    ],
    spaceZoom: 100,
    front: "40 MP",
    battery: { mah: 5000 },
    charging: SAMSUNG_25W,
    network: "5G",
    water: "IP68",
    extras: bi(
      "Works with the S Pen (sold separately)",
      "Compatible con S Pen (se vende por separado)",
    ),
  },
  {
    id: "galaxy-s22",
    name: "Galaxy S22",
    brand: "Samsung",
    family: "Galaxy S22",
    year: 2022,
    fiveG: true,
    pitch: bi(
      "A small, light flagship with a 50 MP camera and 3x zoom.",
      "Un modelo insignia pequeño y ligero con cámara de 50 MP y zoom 3x.",
    ),
    feature: bi("Compact 6.1″ size", "Tamaño compacto de 6.1″"),
    display: { size: 6.1, panel: AMOLED, res: "FHD+", hz: 120 },
    chip: "Snapdragon 8 Gen 1",
    ram: "8 GB",
    storage: ["128 GB", "256 GB"],
    cams: [
      [50, "wide"],
      [12, "uw"],
      [10, "tele", 3],
    ],
    spaceZoom: 30,
    front: "10 MP",
    battery: { mah: 3700 },
    charging: SAMSUNG_25W,
    network: "5G",
    water: "IP68",
    extras: bi(
      "Gorilla Glass Victus+, in-display fingerprint reader",
      "Gorilla Glass Victus+, lector de huella en pantalla",
    ),
  },
  {
    id: "galaxy-s22-plus",
    name: "Galaxy S22+",
    brand: "Samsung",
    family: "Galaxy S22",
    year: 2022,
    fiveG: true,
    pitch: bi(
      "The S22 with a bigger 6.6-inch screen and 45 W fast charging.",
      "El S22 con pantalla más grande de 6.6 pulgadas y carga rápida de 45 W.",
    ),
    feature: bi("45 W fast charging", "Carga rápida de 45 W"),
    display: { size: 6.6, panel: AMOLED, res: "FHD+", hz: 120 },
    chip: "Snapdragon 8 Gen 1",
    ram: "8 GB",
    storage: ["128 GB", "256 GB"],
    cams: [
      [50, "wide"],
      [12, "uw"],
      [10, "tele", 3],
    ],
    spaceZoom: 30,
    front: "10 MP",
    battery: { mah: 4500 },
    charging: SAMSUNG_45W,
    network: "5G",
    water: "IP68",
    extras: bi(
      "Gorilla Glass Victus+, in-display fingerprint reader",
      "Gorilla Glass Victus+, lector de huella en pantalla",
    ),
  },
  {
    id: "galaxy-s22-ultra",
    name: "Galaxy S22 Ultra",
    brand: "Samsung",
    family: "Galaxy S22",
    year: 2022,
    fiveG: true,
    pitch: bi(
      "The first Galaxy S with a built-in S Pen, plus a 108 MP camera and 100x zoom.",
      "El primer Galaxy S con S Pen integrado, más cámara de 108 MP y zoom de 100x.",
    ),
    feature: sPen,
    display: { size: 6.8, panel: AMOLED, res: "QHD+", hz: 120 },
    chip: "Snapdragon 8 Gen 1",
    ram: "8 GB or 12 GB",
    storage: ["128 GB", "256 GB", "512 GB", "1 TB"],
    cams: [
      [108, "wide"],
      [12, "uw"],
      [10, "tele", 3],
      [10, "tele", 10],
    ],
    spaceZoom: 100,
    front: "40 MP",
    battery: { mah: 5000 },
    charging: SAMSUNG_45W,
    network: "5G",
    water: "IP68",
    extras: bi(
      "Built-in S Pen, in-display fingerprint reader",
      "S Pen integrado, lector de huella en pantalla",
    ),
  },
  {
    id: "galaxy-s23",
    name: "Galaxy S23",
    brand: "Samsung",
    family: "Galaxy S23",
    year: 2023,
    fiveG: true,
    pitch: bi(
      "Snapdragon 8 Gen 2 for Galaxy in a compact body with great battery life.",
      "Snapdragon 8 Gen 2 for Galaxy en un cuerpo compacto con gran batería.",
    ),
    feature: bi("Snapdragon 8 Gen 2 for Galaxy", "Snapdragon 8 Gen 2 for Galaxy"),
    display: { size: 6.1, panel: AMOLED, res: "FHD+", hz: 120 },
    chip: "Snapdragon 8 Gen 2 for Galaxy",
    ram: "8 GB",
    storage: "from:128 GB",
    cams: [
      [50, "wide"],
      [12, "uw"],
      [10, "tele", 3],
    ],
    spaceZoom: 30,
    front: "12 MP",
    battery: { mah: 3900 },
    charging: SAMSUNG_25W,
    network: "5G",
    water: "IP68",
    extras: bi(
      "Gorilla Glass Victus 2, in-display fingerprint reader",
      "Gorilla Glass Victus 2, lector de huella en pantalla",
    ),
  },
  {
    id: "galaxy-s23-plus",
    name: "Galaxy S23+",
    brand: "Samsung",
    family: "Galaxy S23",
    year: 2023,
    fiveG: true,
    pitch: bi(
      "A 6.6-inch S23 with a 4,700 mAh battery and 45 W charging.",
      "Un S23 de 6.6 pulgadas con batería de 4,700 mAh y carga de 45 W.",
    ),
    feature: bi("45 W fast charging", "Carga rápida de 45 W"),
    display: { size: 6.6, panel: AMOLED, res: "FHD+", hz: 120 },
    chip: "Snapdragon 8 Gen 2 for Galaxy",
    ram: "8 GB",
    storage: ["256 GB", "512 GB"],
    cams: [
      [50, "wide"],
      [12, "uw"],
      [10, "tele", 3],
    ],
    spaceZoom: 30,
    front: "12 MP",
    battery: { mah: 4700 },
    charging: SAMSUNG_45W,
    network: "5G",
    water: "IP68",
    extras: bi(
      "Gorilla Glass Victus 2, in-display fingerprint reader",
      "Gorilla Glass Victus 2, lector de huella en pantalla",
    ),
  },
  {
    id: "galaxy-s23-ultra",
    name: "Galaxy S23 Ultra",
    brand: "Samsung",
    family: "Galaxy S23",
    year: 2023,
    fiveG: true,
    pitch: bi(
      "Samsung's first 200 MP camera, a built-in S Pen and 100x zoom.",
      "La primera cámara de 200 MP de Samsung, S Pen integrado y zoom de 100x.",
    ),
    feature: sPen,
    display: { size: 6.8, panel: AMOLED, res: "QHD+", hz: 120 },
    chip: "Snapdragon 8 Gen 2 for Galaxy",
    ram: "8 GB or 12 GB",
    storage: ["256 GB", "512 GB", "1 TB"],
    cams: [
      [200, "wide"],
      [12, "uw"],
      [10, "tele", 3],
      [10, "tele", 10],
    ],
    spaceZoom: 100,
    front: "12 MP",
    battery: { mah: 5000 },
    charging: SAMSUNG_45W,
    network: "5G",
    water: "IP68",
    extras: bi("Built-in S Pen, Gorilla Glass Victus 2", "S Pen integrado, Gorilla Glass Victus 2"),
  },
  {
    id: "galaxy-s24",
    name: "Galaxy S24",
    brand: "Samsung",
    family: "Galaxy S24",
    year: 2024,
    fiveG: true,
    pitch: bi(
      "Galaxy AI in a compact phone, with seven years of updates promised by Samsung.",
      "Galaxy AI en un celular compacto, con siete años de actualizaciones prometidos por Samsung.",
    ),
    feature: galaxyAi,
    display: { size: 6.2, panel: AMOLED, res: "FHD+", hz: 120 },
    chip: "Snapdragon 8 Gen 3 for Galaxy",
    ram: "8 GB",
    storage: "from:128 GB",
    cams: [
      [50, "wide"],
      [12, "uw"],
      [10, "tele", 3],
    ],
    spaceZoom: 30,
    front: "12 MP",
    battery: { mah: 4000 },
    charging: SAMSUNG_25W,
    network: "5G",
    water: "IP68",
    extras: bi(
      "Galaxy AI, 7 years of Android updates",
      "Galaxy AI, 7 años de actualizaciones de Android",
    ),
  },
  {
    id: "galaxy-s24-plus",
    name: "Galaxy S24+",
    brand: "Samsung",
    family: "Galaxy S24",
    year: 2024,
    fiveG: true,
    pitch: bi(
      "A sharp 6.7-inch QHD+ screen, 12 GB of RAM and Galaxy AI.",
      "Pantalla QHD+ de 6.7 pulgadas, 12 GB de RAM y Galaxy AI.",
    ),
    feature: galaxyAi,
    display: { size: 6.7, panel: AMOLED, res: "QHD+", hz: 120 },
    chip: "Snapdragon 8 Gen 3 for Galaxy",
    ram: "12 GB",
    storage: ["256 GB", "512 GB"],
    cams: [
      [50, "wide"],
      [12, "uw"],
      [10, "tele", 3],
    ],
    spaceZoom: 30,
    front: "12 MP",
    battery: { mah: 4900 },
    charging: SAMSUNG_45W,
    network: "5G",
    water: "IP68",
    extras: bi(
      "Galaxy AI, 7 years of Android updates",
      "Galaxy AI, 7 años de actualizaciones de Android",
    ),
  },
  {
    id: "galaxy-s24-ultra",
    name: "Galaxy S24 Ultra",
    brand: "Samsung",
    family: "Galaxy S24",
    year: 2024,
    fiveG: true,
    pitch: bi(
      "A titanium Ultra with a 200 MP camera, 5x zoom, a built-in S Pen and Galaxy AI.",
      "Un Ultra de titanio con cámara de 200 MP, zoom 5x, S Pen integrado y Galaxy AI.",
    ),
    feature: bi("Titanium frame, built-in S Pen", "Marco de titanio, S Pen integrado"),
    display: { size: 6.8, panel: AMOLED, res: "QHD+", hz: 120 },
    chip: "Snapdragon 8 Gen 3 for Galaxy",
    ram: "12 GB",
    storage: ["256 GB", "512 GB", "1 TB"],
    cams: [
      [200, "wide"],
      [12, "uw"],
      [50, "tele", 5],
      [10, "tele", 3],
    ],
    spaceZoom: 100,
    front: "12 MP",
    battery: { mah: 5000 },
    charging: SAMSUNG_45W,
    network: "5G",
    water: "IP68",
    extras: bi(
      "Built-in S Pen, Gorilla Armor glass, Galaxy AI, 7 years of updates",
      "S Pen integrado, vidrio Gorilla Armor, Galaxy AI, 7 años de actualizaciones",
    ),
  },
  {
    id: "galaxy-s25",
    name: "Galaxy S25",
    brand: "Samsung",
    family: "Galaxy S25",
    year: 2025,
    fiveG: true,
    pitch: bi(
      "Snapdragon 8 Elite for Galaxy and 12 GB of RAM in Samsung's most compact flagship.",
      "Snapdragon 8 Elite for Galaxy y 12 GB de RAM en el modelo insignia más compacto de Samsung.",
    ),
    feature: galaxyAi,
    display: { size: 6.2, panel: AMOLED, res: "FHD+", hz: 120 },
    chip: "Snapdragon 8 Elite for Galaxy",
    ram: "12 GB",
    storage: ["128 GB", "256 GB"],
    cams: [
      [50, "wide"],
      [12, "uw"],
      [10, "tele", 3],
    ],
    spaceZoom: 30,
    front: "12 MP",
    battery: { mah: 4000 },
    charging: SAMSUNG_25W,
    network: "5G",
    water: "IP68",
    extras: bi(
      "Galaxy AI, 7 years of Android updates",
      "Galaxy AI, 7 años de actualizaciones de Android",
    ),
  },
  {
    id: "galaxy-s25-plus",
    name: "Galaxy S25+",
    brand: "Samsung",
    family: "Galaxy S25",
    year: 2025,
    fiveG: true,
    pitch: bi(
      "A 6.7-inch QHD+ Galaxy with Snapdragon 8 Elite and 45 W charging.",
      "Un Galaxy QHD+ de 6.7 pulgadas con Snapdragon 8 Elite y carga de 45 W.",
    ),
    feature: bi("45 W fast charging", "Carga rápida de 45 W"),
    display: { size: 6.7, panel: AMOLED, res: "QHD+", hz: 120 },
    chip: "Snapdragon 8 Elite for Galaxy",
    ram: "12 GB",
    storage: ["256 GB", "512 GB"],
    cams: [
      [50, "wide"],
      [12, "uw"],
      [10, "tele", 3],
    ],
    spaceZoom: 30,
    front: "12 MP",
    battery: { mah: 4900 },
    charging: SAMSUNG_45W,
    network: "5G",
    water: "IP68",
    extras: bi(
      "Galaxy AI, 7 years of Android updates",
      "Galaxy AI, 7 años de actualizaciones de Android",
    ),
  },
  {
    id: "galaxy-s25-ultra",
    name: "Galaxy S25 Ultra",
    brand: "Samsung",
    family: "Galaxy S25",
    year: 2025,
    fiveG: true,
    pitch: bi(
      "A 6.9-inch titanium Ultra with a 200 MP camera, a 50 MP ultra-wide and a built-in S Pen.",
      "Un Ultra de titanio de 6.9 pulgadas con cámara de 200 MP, ultra gran angular de 50 MP y S Pen integrado.",
    ),
    feature: bi("Titanium frame, built-in S Pen", "Marco de titanio, S Pen integrado"),
    display: { size: 6.9, panel: AMOLED, res: "QHD+", hz: 120 },
    chip: "Snapdragon 8 Elite for Galaxy",
    ram: "12 GB",
    storage: ["256 GB", "512 GB", "1 TB"],
    cams: [
      [200, "wide"],
      [50, "uw"],
      [50, "tele", 5],
      [10, "tele", 3],
    ],
    spaceZoom: 100,
    front: "12 MP",
    battery: { mah: 5000 },
    charging: SAMSUNG_45W,
    network: "5G",
    water: "IP68",
    extras: bi(
      "Built-in S Pen, Gorilla Armor 2 glass, Galaxy AI, 7 years of updates",
      "S Pen integrado, vidrio Gorilla Armor 2, Galaxy AI, 7 años de actualizaciones",
    ),
  },
  {
    id: "galaxy-s26",
    name: "Galaxy S26",
    brand: "Samsung",
    family: "Galaxy S26",
    year: 2026,
    fiveG: true,
    pitch: bi(
      "Samsung's 2026 compact flagship, now with a bigger 6.3-inch screen and a 4,300 mAh battery.",
      "El modelo insignia compacto de Samsung de 2026, ahora con pantalla de 6.3 pulgadas y batería de 4,300 mAh.",
    ),
    feature: galaxyAi,
    display: { size: 6.3, panel: AMOLED, res: "FHD+", hz: 120 },
    chip: "Samsung Exynos 2600",
    cams: [
      [50, "wide"],
      [12, "uw"],
      [10, "tele", 3],
    ],
    spaceZoom: 30,
    front: "12 MP",
    battery: { mah: 4300 },
    charging: bi("Fast charging, wireless charging", "Carga rápida, carga inalámbrica"),
    network: "5G",
    extras: bi("Galaxy AI, 8K video recording", "Galaxy AI, grabación de video 8K"),
  },
  {
    id: "galaxy-s26-ultra",
    name: "Galaxy S26 Ultra",
    brand: "Samsung",
    family: "Galaxy S26",
    year: 2026,
    fiveG: true,
    pitch: bi(
      "Samsung's newest Ultra: the world's first built-in Privacy Display, a 200 MP camera and the S Pen.",
      "El Ultra más nuevo de Samsung: la primera pantalla de privacidad integrada del mundo, cámara de 200 MP y S Pen.",
    ),
    feature: bi("Built-in Privacy Display", "Pantalla de privacidad integrada"),
    display: { size: 6.9, panel: AMOLED, res: "QHD+", hz: 120 },
    chip: "Snapdragon 8 Elite Gen 5 for Galaxy",
    cams: [
      [200, "wide"],
      [50, "uw"],
      [50, "tele", 5],
      [10, "tele", 3],
    ],
    spaceZoom: 100,
    front: "12 MP",
    battery: { mah: 5000 },
    charging: bi(
      "Super-Fast Charging 3.0 (up to 75% in about 30 minutes), wireless charging",
      "Super-Fast Charging 3.0 (hasta 75% en unos 30 minutos), carga inalámbrica",
    ),
    network: "5G",
    extras: bi(
      "Built-in S Pen, Privacy Display, Galaxy AI, 4K 120 fps video",
      "S Pen integrado, pantalla de privacidad, Galaxy AI, video 4K a 120 fps",
    ),
  },
];

// ---------------------------------------------------------------------------------------------
// iPhone. Battery figures are Apple's "video playback" numbers (support.apple.com tech specs).

const OLED = "Super Retina XDR OLED";
const LIGHTNING = (w: string): L =>
  bi(`Lightning; fast charging; ${w}`, `Lightning; carga rápida; ${w}`);
const MAGSAFE_LIGHTNING = LIGHTNING("MagSafe and Qi wireless charging");
const USBC_MAGSAFE = bi(
  "USB-C; fast charging; MagSafe and Qi2 wireless charging",
  "USB-C; carga rápida; carga inalámbrica MagSafe y Qi2",
);
const ESIM_US = "eSIM only (US models)";
const emergency = bi(
  "Crash Detection and Emergency SOS via satellite",
  "Detección de choques y SOS de emergencia vía satélite",
);
const appleIntelligence = bi("Apple Intelligence", "Apple Intelligence");

const IPHONE: Model[] = [
  {
    id: "iphone-11",
    name: "iPhone 11",
    brand: "Apple",
    family: "iPhone 11",
    year: 2019,
    fiveG: false,
    pitch: bi(
      "A dependable, affordable iPhone with a dual camera and Night mode.",
      "Un iPhone confiable y económico con cámara doble y modo Noche.",
    ),
    feature: bi("Night mode dual camera", "Cámara doble con modo Noche"),
    display: { size: 6.1, panel: "Liquid Retina HD LCD" },
    chip: "A13 Bionic",
    storage: ["64 GB", "128 GB", "256 GB"],
    cams: [
      [12, "wide"],
      [12, "uw"],
    ],
    front: "12 MP TrueDepth",
    battery: { videoHours: 17 },
    charging: LIGHTNING("Qi wireless charging"),
    network: "4G LTE",
    water: "IP68",
    extras: bi("Face ID, Dual SIM (nano-SIM and eSIM)", "Face ID, SIM doble (nano-SIM y eSIM)"),
  },
  {
    id: "iphone-11-pro-max",
    name: "iPhone 11 Pro Max",
    brand: "Apple",
    family: "iPhone 11",
    year: 2019,
    fiveG: false,
    pitch: bi(
      "Apple's first triple-camera iPhone, with a 6.5-inch OLED display and long battery life.",
      "El primer iPhone con cámara triple de Apple, pantalla OLED de 6.5 pulgadas y batería de larga duración.",
    ),
    feature: bi("Triple camera with 2x telephoto", "Cámara triple con teleobjetivo 2x"),
    display: { size: 6.5, panel: OLED },
    chip: "A13 Bionic",
    storage: ["64 GB", "256 GB", "512 GB"],
    cams: [
      [12, "wide"],
      [12, "uw"],
      [12, "tele", 2],
    ],
    front: "12 MP TrueDepth",
    battery: { videoHours: 20 },
    charging: LIGHTNING("Qi wireless charging"),
    network: "4G LTE",
    water: "IP68",
    extras: bi("Face ID, textured matte glass back", "Face ID, parte trasera de vidrio mate"),
  },
  {
    id: "iphone-12",
    name: "iPhone 12",
    brand: "Apple",
    family: "iPhone 12",
    year: 2020,
    fiveG: true,
    pitch: bi(
      "The first 5G iPhone, with an OLED display, Ceramic Shield and MagSafe.",
      "El primer iPhone 5G, con pantalla OLED, Ceramic Shield y MagSafe.",
    ),
    feature: bi("5G and MagSafe", "5G y MagSafe"),
    display: { size: 6.1, panel: OLED },
    chip: "A14 Bionic",
    storage: ["64 GB", "128 GB", "256 GB"],
    cams: [
      [12, "wide"],
      [12, "uw"],
    ],
    front: "12 MP TrueDepth",
    battery: { videoHours: 17 },
    charging: MAGSAFE_LIGHTNING,
    network: "5G",
    water: "IP68",
    extras: bi("Face ID, Ceramic Shield front", "Face ID, frente Ceramic Shield"),
  },
  {
    id: "iphone-12-pro-max",
    name: "iPhone 12 Pro Max",
    brand: "Apple",
    family: "iPhone 12",
    year: 2020,
    fiveG: true,
    pitch: bi(
      "A 6.7-inch 5G iPhone with a LiDAR scanner and sensor-shift stabilization.",
      "Un iPhone 5G de 6.7 pulgadas con escáner LiDAR y estabilización por desplazamiento del sensor.",
    ),
    feature: bi("2.5x telephoto and LiDAR", "Teleobjetivo 2.5x y LiDAR"),
    display: { size: 6.7, panel: OLED },
    chip: "A14 Bionic",
    storage: ["128 GB", "256 GB", "512 GB"],
    cams: [
      [12, "wide"],
      [12, "uw"],
      [12, "tele", 2.5],
      [0, "lidar"],
    ],
    front: "12 MP TrueDepth",
    battery: { videoHours: 20 },
    charging: MAGSAFE_LIGHTNING,
    network: "5G",
    water: "IP68",
    extras: bi(
      "Face ID, Apple ProRAW, stainless steel frame",
      "Face ID, Apple ProRAW, marco de acero inoxidable",
    ),
  },
  {
    id: "iphone-13",
    name: "iPhone 13",
    brand: "Apple",
    family: "iPhone 13",
    year: 2021,
    fiveG: true,
    pitch: bi(
      "A great all-rounder with Cinematic mode and better battery life than the iPhone 12.",
      "Un gran todo terreno con modo Cine y más batería que el iPhone 12.",
    ),
    feature: bi("Cinematic mode video", "Video en modo Cine"),
    display: { size: 6.1, panel: OLED },
    chip: "A15 Bionic",
    storage: ["128 GB", "256 GB", "512 GB"],
    cams: [
      [12, "wide"],
      [12, "uw"],
    ],
    front: "12 MP TrueDepth",
    battery: { videoHours: 19 },
    charging: MAGSAFE_LIGHTNING,
    network: "5G",
    water: "IP68",
    extras: bi("Face ID, Ceramic Shield front", "Face ID, frente Ceramic Shield"),
  },
  {
    id: "iphone-13-pro-max",
    name: "iPhone 13 Pro Max",
    brand: "Apple",
    family: "iPhone 13",
    year: 2021,
    fiveG: true,
    pitch: bi(
      "A 120 Hz ProMotion display, 3x zoom, macro photos and huge battery life.",
      "Pantalla ProMotion de 120 Hz, zoom 3x, fotos macro y una batería enorme.",
    ),
    feature: bi("120 Hz ProMotion display", "Pantalla ProMotion de 120 Hz"),
    display: { size: 6.7, panel: OLED, hz: 120 },
    chip: "A15 Bionic",
    storage: ["128 GB", "256 GB", "512 GB", "1 TB"],
    cams: [
      [12, "wide"],
      [12, "uw"],
      [12, "tele", 3],
      [0, "lidar"],
    ],
    front: "12 MP TrueDepth",
    battery: { videoHours: 28 },
    charging: MAGSAFE_LIGHTNING,
    network: "5G",
    water: "IP68",
    extras: bi(
      "Face ID, macro photography, ProRes video",
      "Face ID, fotografía macro, video ProRes",
    ),
  },
  {
    id: "iphone-14",
    name: "iPhone 14",
    brand: "Apple",
    family: "iPhone 14",
    year: 2022,
    fiveG: true,
    pitch: bi(
      "Safety features like Crash Detection and Emergency SOS via satellite, in a 6.1-inch iPhone.",
      "Funciones de seguridad como Detección de choques y SOS vía satélite, en un iPhone de 6.1 pulgadas.",
    ),
    feature: emergency,
    display: { size: 6.1, panel: OLED },
    chip: "A15 Bionic",
    storage: ["128 GB", "256 GB", "512 GB"],
    cams: [
      [12, "main"],
      [12, "uw"],
    ],
    front: "12 MP TrueDepth",
    battery: { videoHours: 20 },
    charging: MAGSAFE_LIGHTNING,
    network: "5G",
    water: "IP68",
    extras: bi(`Face ID, ${ESIM_US}`, "Face ID, solo eSIM (modelos de EE. UU.)"),
  },
  {
    id: "iphone-14-plus",
    name: "iPhone 14 Plus",
    brand: "Apple",
    family: "iPhone 14",
    year: 2022,
    fiveG: true,
    pitch: bi(
      "A big 6.7-inch screen and all-day-plus battery without the Pro price.",
      "Pantalla grande de 6.7 pulgadas y batería de sobra sin el precio de un Pro.",
    ),
    feature: emergency,
    display: { size: 6.7, panel: OLED },
    chip: "A15 Bionic",
    storage: ["128 GB", "256 GB", "512 GB"],
    cams: [
      [12, "main"],
      [12, "uw"],
    ],
    front: "12 MP TrueDepth",
    battery: { videoHours: 26 },
    charging: MAGSAFE_LIGHTNING,
    network: "5G",
    water: "IP68",
    extras: bi(`Face ID, ${ESIM_US}`, "Face ID, solo eSIM (modelos de EE. UU.)"),
  },
  {
    id: "iphone-14-pro",
    name: "iPhone 14 Pro",
    brand: "Apple",
    family: "iPhone 14",
    year: 2022,
    fiveG: true,
    pitch: bi(
      "The first iPhone with the Dynamic Island, an Always-On display and a 48 MP camera.",
      "El primer iPhone con Dynamic Island, pantalla siempre activa y cámara de 48 MP.",
    ),
    feature: bi("Dynamic Island", "Dynamic Island"),
    display: { size: 6.1, panel: OLED, hz: 120, aod: true, island: true },
    chip: "A16 Bionic",
    storage: ["128 GB", "256 GB", "512 GB", "1 TB"],
    cams: [
      [48, "main"],
      [12, "uw"],
      [12, "tele", 3],
      [0, "lidar"],
    ],
    front: "12 MP TrueDepth",
    battery: { videoHours: 23 },
    charging: MAGSAFE_LIGHTNING,
    network: "5G",
    water: "IP68",
    extras: bi(
      `Face ID, ${ESIM_US}, Crash Detection`,
      "Face ID, solo eSIM (modelos de EE. UU.), Detección de choques",
    ),
  },
  {
    id: "iphone-14-pro-max",
    name: "iPhone 14 Pro Max",
    brand: "Apple",
    family: "iPhone 14",
    year: 2022,
    fiveG: true,
    pitch: bi(
      "The 6.7-inch 14 Pro: Dynamic Island, a 48 MP camera and the longest battery of its year.",
      "El 14 Pro de 6.7 pulgadas: Dynamic Island, cámara de 48 MP y la batería más larga de su año.",
    ),
    feature: bi("Dynamic Island", "Dynamic Island"),
    display: { size: 6.7, panel: OLED, hz: 120, aod: true, island: true },
    chip: "A16 Bionic",
    storage: ["128 GB", "256 GB", "512 GB", "1 TB"],
    cams: [
      [48, "main"],
      [12, "uw"],
      [12, "tele", 3],
      [0, "lidar"],
    ],
    front: "12 MP TrueDepth",
    battery: { videoHours: 29 },
    charging: MAGSAFE_LIGHTNING,
    network: "5G",
    water: "IP68",
    extras: bi(
      `Face ID, ${ESIM_US}, Crash Detection`,
      "Face ID, solo eSIM (modelos de EE. UU.), Detección de choques",
    ),
  },
  {
    id: "iphone-15",
    name: "iPhone 15",
    brand: "Apple",
    family: "iPhone 15",
    year: 2023,
    fiveG: true,
    pitch: bi(
      "USB-C, the Dynamic Island and a 48 MP camera come to the standard iPhone.",
      "USB-C, Dynamic Island y cámara de 48 MP llegan al iPhone estándar.",
    ),
    feature: bi("USB-C and Dynamic Island", "USB-C y Dynamic Island"),
    display: { size: 6.1, panel: OLED, island: true },
    chip: "A16 Bionic",
    storage: ["128 GB", "256 GB", "512 GB"],
    cams: [
      [48, "main"],
      [12, "uw"],
    ],
    front: "12 MP TrueDepth",
    battery: { videoHours: 20 },
    charging: USBC_MAGSAFE,
    network: "5G",
    water: "IP68",
    extras: bi(
      `Face ID, ${ESIM_US}, 2x optical-quality zoom`,
      "Face ID, solo eSIM (modelos de EE. UU.), zoom 2x de calidad óptica",
    ),
  },
  {
    id: "iphone-15-plus",
    name: "iPhone 15 Plus",
    brand: "Apple",
    family: "iPhone 15",
    year: 2023,
    fiveG: true,
    pitch: bi(
      "The big-screen iPhone 15 with USB-C and excellent battery life.",
      "El iPhone 15 de pantalla grande con USB-C y excelente batería.",
    ),
    feature: bi("USB-C and Dynamic Island", "USB-C y Dynamic Island"),
    display: { size: 6.7, panel: OLED, island: true },
    chip: "A16 Bionic",
    storage: ["128 GB", "256 GB", "512 GB"],
    cams: [
      [48, "main"],
      [12, "uw"],
    ],
    front: "12 MP TrueDepth",
    battery: { videoHours: 26 },
    charging: USBC_MAGSAFE,
    network: "5G",
    water: "IP68",
    extras: bi(
      `Face ID, ${ESIM_US}, 2x optical-quality zoom`,
      "Face ID, solo eSIM (modelos de EE. UU.), zoom 2x de calidad óptica",
    ),
  },
  {
    id: "iphone-15-pro-max",
    name: "iPhone 15 Pro Max",
    brand: "Apple",
    family: "iPhone 15",
    year: 2023,
    fiveG: true,
    pitch: bi(
      "A titanium iPhone with 5x zoom, the A17 Pro chip and the Action button.",
      "Un iPhone de titanio con zoom 5x, chip A17 Pro y botón de Acción.",
    ),
    feature: bi("Titanium design, 5x telephoto", "Diseño de titanio, teleobjetivo 5x"),
    display: { size: 6.7, panel: OLED, hz: 120, aod: true, island: true },
    chip: "A17 Pro",
    storage: ["256 GB", "512 GB", "1 TB"],
    cams: [
      [48, "main"],
      [12, "uw"],
      [12, "tele", 5],
    ],
    front: "12 MP TrueDepth",
    battery: { videoHours: 29 },
    charging: bi(
      "USB-C (USB 3); fast charging; MagSafe and Qi2 wireless charging",
      "USB-C (USB 3); carga rápida; carga inalámbrica MagSafe y Qi2",
    ),
    network: "5G",
    water: "IP68",
    extras: bi(
      `Action button, Face ID, ${ESIM_US}, Apple Intelligence`,
      "Botón de Acción, Face ID, solo eSIM (modelos de EE. UU.), Apple Intelligence",
    ),
  },
  {
    id: "iphone-16",
    name: "iPhone 16",
    brand: "Apple",
    family: "iPhone 16",
    year: 2024,
    fiveG: true,
    pitch: bi(
      "Built for Apple Intelligence, with Camera Control and the Action button.",
      "Hecho para Apple Intelligence, con Control de Cámara y botón de Acción.",
    ),
    feature: appleIntelligence,
    display: { size: 6.1, panel: OLED, island: true },
    chip: "A18",
    storage: ["128 GB", "256 GB", "512 GB"],
    cams: [
      [48, "main"],
      [12, "uw"],
    ],
    front: "12 MP TrueDepth",
    battery: { videoHours: 22 },
    charging: USBC_MAGSAFE,
    network: "5G",
    water: "IP68",
    extras: bi(
      `Camera Control, Action button, Face ID, ${ESIM_US}`,
      "Control de Cámara, botón de Acción, Face ID, solo eSIM (modelos de EE. UU.)",
    ),
  },
  {
    id: "iphone-16-plus",
    name: "iPhone 16 Plus",
    brand: "Apple",
    family: "iPhone 16",
    year: 2024,
    fiveG: true,
    pitch: bi(
      "The 6.7-inch iPhone 16 with Apple Intelligence and long battery life.",
      "El iPhone 16 de 6.7 pulgadas con Apple Intelligence y batería de larga duración.",
    ),
    feature: appleIntelligence,
    display: { size: 6.7, panel: OLED, island: true },
    chip: "A18",
    storage: ["128 GB", "256 GB", "512 GB"],
    cams: [
      [48, "main"],
      [12, "uw"],
    ],
    front: "12 MP TrueDepth",
    battery: { videoHours: 27 },
    charging: USBC_MAGSAFE,
    network: "5G",
    water: "IP68",
    extras: bi(
      `Camera Control, Action button, Face ID, ${ESIM_US}`,
      "Control de Cámara, botón de Acción, Face ID, solo eSIM (modelos de EE. UU.)",
    ),
  },
  {
    id: "iphone-16-pro",
    name: "iPhone 16 Pro",
    brand: "Apple",
    family: "iPhone 16",
    year: 2024,
    fiveG: true,
    pitch: bi(
      "A 6.3-inch titanium Pro with 5x zoom, a 48 MP ultra-wide and 4K 120 fps video.",
      "Un Pro de titanio de 6.3 pulgadas con zoom 5x, ultra gran angular de 48 MP y video 4K a 120 fps.",
    ),
    feature: bi("Titanium design, 5x telephoto", "Diseño de titanio, teleobjetivo 5x"),
    display: { size: 6.3, panel: OLED, hz: 120, aod: true, island: true },
    chip: "A18 Pro",
    storage: ["128 GB", "256 GB", "512 GB", "1 TB"],
    cams: [
      [48, "main"],
      [48, "uw"],
      [12, "tele", 5],
    ],
    front: "12 MP TrueDepth",
    battery: { videoHours: 27 },
    charging: bi(
      "USB-C (USB 3); fast charging; MagSafe and Qi2 wireless charging",
      "USB-C (USB 3); carga rápida; carga inalámbrica MagSafe y Qi2",
    ),
    network: "5G",
    water: "IP68",
    extras: bi(
      "Camera Control, Action button, Apple Intelligence, Face ID",
      "Control de Cámara, botón de Acción, Apple Intelligence, Face ID",
    ),
  },
  {
    id: "iphone-16-pro-max",
    name: "iPhone 16 Pro Max",
    brand: "Apple",
    family: "iPhone 16",
    year: 2024,
    fiveG: true,
    pitch: bi(
      "The biggest iPhone 16: a 6.9-inch display and up to 33 hours of video playback.",
      "El iPhone 16 más grande: pantalla de 6.9 pulgadas y hasta 33 horas de video.",
    ),
    feature: bi("Titanium design, 5x telephoto", "Diseño de titanio, teleobjetivo 5x"),
    display: { size: 6.9, panel: OLED, hz: 120, aod: true, island: true },
    chip: "A18 Pro",
    storage: ["256 GB", "512 GB", "1 TB"],
    cams: [
      [48, "main"],
      [48, "uw"],
      [12, "tele", 5],
    ],
    front: "12 MP TrueDepth",
    battery: { videoHours: 33 },
    charging: bi(
      "USB-C (USB 3); fast charging; MagSafe and Qi2 wireless charging",
      "USB-C (USB 3); carga rápida; carga inalámbrica MagSafe y Qi2",
    ),
    network: "5G",
    water: "IP68",
    extras: bi(
      "Camera Control, Action button, Apple Intelligence, Face ID",
      "Control de Cámara, botón de Acción, Apple Intelligence, Face ID",
    ),
  },
  {
    id: "iphone-17",
    name: "iPhone 17",
    brand: "Apple",
    family: "iPhone 17",
    year: 2025,
    fiveG: true,
    pitch: bi(
      "ProMotion comes to the standard iPhone, with two 48 MP cameras and 256 GB to start.",
      "ProMotion llega al iPhone estándar, con dos cámaras de 48 MP y desde 256 GB.",
    ),
    feature: bi("18 MP Center Stage front camera", "Cámara frontal Center Stage de 18 MP"),
    display: { size: 6.3, panel: OLED, hz: 120, aod: true, island: true },
    chip: "A19",
    storage: ["256 GB", "512 GB"],
    cams: [
      [48, "main"],
      [48, "uw"],
    ],
    front: "18 MP Center Stage",
    battery: { videoHours: 30 },
    charging: USBC_MAGSAFE,
    network: "5G",
    water: "IP68",
    extras: bi(
      "Ceramic Shield 2, Camera Control, Apple Intelligence",
      "Ceramic Shield 2, Control de Cámara, Apple Intelligence",
    ),
  },
  {
    id: "iphone-17-pro",
    name: "iPhone 17 Pro",
    brand: "Apple",
    family: "iPhone 17",
    year: 2025,
    fiveG: true,
    pitch: bi(
      "An aluminum unibody Pro with three 48 MP cameras and 8x optical-quality zoom.",
      "Un Pro de aluminio de una pieza con tres cámaras de 48 MP y zoom de calidad óptica 8x.",
    ),
    feature: bi("8x optical-quality zoom", "Zoom de calidad óptica 8x"),
    display: { size: 6.3, panel: OLED, hz: 120, aod: true, island: true },
    chip: "A19 Pro",
    storage: ["256 GB", "512 GB", "1 TB"],
    cams: [
      [48, "main"],
      [48, "uw"],
      [48, "tele", 4],
    ],
    front: "18 MP Center Stage",
    battery: { videoHours: 33 },
    charging: bi(
      "USB-C (USB 3); fast charging; MagSafe wireless charging up to 25 W",
      "USB-C (USB 3); carga rápida; carga inalámbrica MagSafe hasta 25 W",
    ),
    network: "5G",
    water: "IP68",
    extras: bi(
      "Vapor-chamber cooling, Camera Control, Apple Intelligence",
      "Enfriamiento con cámara de vapor, Control de Cámara, Apple Intelligence",
    ),
  },
  {
    id: "iphone-17-pro-max",
    name: "iPhone 17 Pro Max",
    brand: "Apple",
    family: "iPhone 17",
    year: 2025,
    fiveG: true,
    pitch: bi(
      "A 6.9-inch Pro with up to 39 hours of video playback — the longest of the iPhone 17 line.",
      "Un Pro de 6.9 pulgadas con hasta 39 horas de video, la mayor batería de la línea iPhone 17.",
    ),
    feature: bi("Up to 39 hours of video", "Hasta 39 horas de video"),
    display: { size: 6.9, panel: OLED, hz: 120, aod: true, island: true },
    chip: "A19 Pro",
    storage: ["256 GB", "512 GB", "1 TB", "2 TB"],
    cams: [
      [48, "main"],
      [48, "uw"],
      [48, "tele", 4],
    ],
    front: "18 MP Center Stage",
    battery: { videoHours: 39 },
    charging: bi(
      "USB-C (USB 3); fast charging; MagSafe wireless charging up to 25 W",
      "USB-C (USB 3); carga rápida; carga inalámbrica MagSafe hasta 25 W",
    ),
    network: "5G",
    water: "IP68",
    extras: bi(
      "8x optical-quality zoom, vapor-chamber cooling, Apple Intelligence",
      "Zoom de calidad óptica 8x, enfriamiento con cámara de vapor, Apple Intelligence",
    ),
  },
  {
    id: "iphone-18-pro",
    name: "iPhone 18 Pro",
    brand: "Apple",
    family: "iPhone 18",
    year: 2026,
    fiveG: true,
    pitch: bi(
      "Apple's newest Pro in the 6.3-inch size, with the A20 Pro chip and a variable-aperture camera.",
      "El Pro más nuevo de Apple en tamaño de 6.3 pulgadas, con chip A20 Pro y cámara de apertura variable.",
    ),
    feature: bi("Variable-aperture main camera", "Cámara principal con apertura variable"),
    display: { size: 6.3, panel: OLED, hz: 120, aod: true, island: true },
    chip: "A20 Pro",
    cams: [
      [48, "main"],
      [48, "uw"],
      [48, "tele", 4],
    ],
    front: "18 MP Center Stage",
    battery: { videoHours: 36 },
    charging: bi(
      "USB-C; up to 50% in about 15 minutes; MagSafe wireless charging",
      "USB-C; hasta 50% en unos 15 minutos; carga inalámbrica MagSafe",
    ),
    network: bi(
      "5G (including mmWave) with Apple's C2 modem; Wi-Fi 7",
      "5G (incluye mmWave) con el módem C2 de Apple; Wi-Fi 7",
    ),
    extras: bi(
      "8x optical-quality zoom, Siri AI and Apple Intelligence, eSIM",
      "Zoom de calidad óptica 8x, Siri AI y Apple Intelligence, eSIM",
    ),
  },
];

// ---------------------------------------------------------------------------------------------
// Samsung Galaxy Z foldables (owner's list, Oct 27, 2026). Z Fold8 Ultra, Z Fold7 and Z Flip7
// specs checked against GSMArena's spec pages (Oct 2026); Z Fold6 and Z Fold3 are Samsung's US
// launch specs.

const FOLD_EXTRAS = bi(
  "Galaxy AI, multitasking with up to three apps side by side",
  "Galaxy AI, multitarea con hasta tres apps lado a lado",
);

const GALAXY_Z: Model[] = [
  {
    id: "galaxy-z-fold8-ultra",
    kind: "galaxy-fold",
    name: "Galaxy Z Fold8 Ultra",
    brand: "Samsung",
    family: "Galaxy Z",
    year: 2026,
    fiveG: true,
    pitch: bi(
      "Samsung's biggest foldable: an 8-inch inner screen, a 200 MP camera and a 5,000 mAh battery.",
      "El plegable más grande de Samsung: pantalla interior de 8 pulgadas, cámara de 200 MP y batería de 5,000 mAh.",
    ),
    feature: bi("8″ inner screen, 6.5″ cover screen", "Pantalla interior de 8″ y exterior de 6.5″"),
    display: { size: 8, panel: AMOLED, res: "2256 × 2504", hz: 120, cover: 6.5 },
    chip: "Snapdragon 8 Elite Gen 5 for Galaxy",
    ram: "12 GB or 16 GB",
    storage: ["256 GB", "512 GB", "1 TB"],
    cams: [
      [200, "wide"],
      [50, "uw"],
      [10, "tele", 3],
    ],
    front: bi("10 MP inner · 10 MP cover", "10 MP interior · 10 MP exterior"),
    battery: { mah: 5000 },
    charging: bi(
      "45 W wired, 20 W Qi2.2 wireless, reverse wireless charging",
      "Carga de 45 W por cable, inalámbrica Qi2.2 de 20 W, carga inversa",
    ),
    network: "5G",
    water: "IP48",
    extras: bi(
      "Android 17 with One UI 9, 215 g, 8.9 mm folded",
      "Android 17 con One UI 9, 215 g, 8.9 mm cerrado",
    ),
  },
  {
    id: "galaxy-z-fold7",
    kind: "galaxy-fold",
    name: "Galaxy Z Fold7",
    brand: "Samsung",
    family: "Galaxy Z",
    year: 2025,
    fiveG: true,
    pitch: bi(
      "A thin, light Fold with an 8-inch inner screen and a 200 MP camera.",
      "Un Fold delgado y ligero con pantalla interior de 8 pulgadas y cámara de 200 MP.",
    ),
    feature: bi("8.9 mm thin when folded, 215 g", "Solo 8.9 mm cerrado y 215 g"),
    display: { size: 8, panel: AMOLED, res: "1968 × 2184", hz: 120, cover: 6.5 },
    chip: "Snapdragon 8 Elite for Galaxy",
    ram: bi("12 GB (16 GB with 1 TB)", "12 GB (16 GB con 1 TB)"),
    storage: ["256 GB", "512 GB", "1 TB"],
    cams: [
      [200, "wide"],
      [12, "uw"],
      [10, "tele", 3],
    ],
    front: bi("10 MP inner · 10 MP cover", "10 MP interior · 10 MP exterior"),
    battery: { mah: 4400 },
    charging: bi(
      "25 W wired, 15 W wireless, reverse wireless charging",
      "Carga de 25 W por cable, inalámbrica de 15 W, carga inversa",
    ),
    network: "5G",
    water: "IP48",
    extras: FOLD_EXTRAS,
  },
  {
    id: "galaxy-z-flip7",
    kind: "galaxy-fold",
    name: "Galaxy Z Flip7",
    brand: "Samsung",
    family: "Galaxy Z",
    year: 2025,
    fiveG: true,
    pitch: bi(
      "A pocket-size flip phone with a 4.1-inch FlexWindow cover screen and a 50 MP camera.",
      "Un plegable de bolsillo con pantalla exterior FlexWindow de 4.1 pulgadas y cámara de 50 MP.",
    ),
    feature: bi("4.1″ FlexWindow cover screen", "Pantalla exterior FlexWindow de 4.1″"),
    display: { size: 6.9, panel: AMOLED, hz: 120, cover: 4.1 },
    chip: "Samsung Exynos 2500",
    ram: "12 GB",
    storage: ["256 GB", "512 GB"],
    cams: [
      [50, "wide"],
      [12, "uw"],
    ],
    front: "10 MP",
    battery: { mah: 4300 },
    charging: bi(
      "25 W wired, 15 W wireless, reverse wireless charging",
      "Carga de 25 W por cable, inalámbrica de 15 W, carga inversa",
    ),
    network: "5G",
    water: "IP48",
    extras: bi("Galaxy AI, hands-free FlexCam", "Galaxy AI, FlexCam con manos libres"),
  },
  {
    id: "galaxy-z-fold6",
    kind: "galaxy-fold",
    name: "Galaxy Z Fold6",
    brand: "Samsung",
    family: "Galaxy Z",
    year: 2024,
    fiveG: true,
    pitch: bi(
      "A 7.6-inch foldable with Galaxy AI and S Pen support.",
      "Un plegable de 7.6 pulgadas con Galaxy AI y compatibilidad con S Pen.",
    ),
    feature: bi("Works with S Pen Fold Edition", "Compatible con S Pen Fold Edition"),
    display: { size: 7.6, panel: AMOLED, res: "2160 × 1856", hz: 120, cover: 6.3 },
    chip: "Snapdragon 8 Gen 3 for Galaxy",
    ram: "12 GB",
    storage: ["256 GB", "512 GB", "1 TB"],
    cams: [
      [50, "wide"],
      [12, "uw"],
      [10, "tele", 3],
    ],
    front: bi("10 MP cover · 4 MP under-display", "10 MP exterior · 4 MP bajo la pantalla"),
    battery: { mah: 4400 },
    charging: SAMSUNG_25W,
    network: "5G",
    water: "IP48",
    extras: bi(
      "Galaxy AI, S Pen Fold Edition support (sold separately)",
      "Galaxy AI, compatible con S Pen Fold Edition (se vende por separado)",
    ),
  },
  {
    id: "galaxy-z-fold3",
    kind: "galaxy-fold",
    name: "Galaxy Z Fold3",
    brand: "Samsung",
    family: "Galaxy Z",
    year: 2021,
    fiveG: true,
    pitch: bi(
      "The first water-resistant Fold, with S Pen support and a 7.6-inch inner screen.",
      "El primer Fold resistente al agua, compatible con S Pen y con pantalla interior de 7.6 pulgadas.",
    ),
    feature: bi("IPX8 water resistance", "Resistencia al agua IPX8"),
    display: { size: 7.6, panel: AMOLED, res: "2208 × 1768", hz: 120, cover: 6.2 },
    chip: "Snapdragon 888",
    ram: "12 GB",
    storage: ["256 GB", "512 GB"],
    cams: [
      [12, "wide"],
      [12, "uw"],
      [12, "tele", 2],
    ],
    front: bi("10 MP cover · 4 MP under-display", "10 MP exterior · 4 MP bajo la pantalla"),
    battery: { mah: 4400 },
    charging: SAMSUNG_25W,
    network: "5G",
    water: "IPX8",
    extras: bi(
      "S Pen Fold Edition support (sold separately)",
      "Compatible con S Pen Fold Edition (se vende por separado)",
    ),
  },
];

// ---------------------------------------------------------------------------------------------
// iPad (A16), 11th generation, 2025. Apple tech specs (support.apple.com/122240).

const IPAD: Model[] = [
  {
    id: "ipad-11",
    kind: "ipad",
    name: "iPad (11th gen, A16)",
    brand: "Apple",
    family: "iPad",
    year: 2025,
    fiveG: false,
    pitch: bi(
      "Apple's everyday iPad with the A16 chip, an 11-inch display and Touch ID.",
      "El iPad para todos los días de Apple, con chip A16, pantalla de 11 pulgadas y Touch ID.",
    ),
    feature: bi("Touch ID in the top button", "Touch ID en el botón superior"),
    display: { size: 11, panel: "Liquid Retina", res: "2360 × 1640" },
    chip: "A16",
    storage: ["128 GB", "256 GB", "512 GB"],
    cams: [[12, "wide"]],
    front: bi("12 MP landscape Center Stage", "12 MP horizontal con Encuadre centrado"),
    battery: { videoHours: 10 },
    charging: bi("USB-C", "USB-C"),
    network: bi(
      "Wi-Fi 6; 5G on Wi-Fi + Cellular models",
      "Wi-Fi 6; 5G en modelos Wi-Fi + Cellular",
    ),
    extras: bi(
      "Works with Apple Pencil (USB-C), Apple Pencil (1st generation) and Magic Keyboard Folio; Blue, Pink, Yellow or Silver",
      "Compatible con Apple Pencil (USB-C), Apple Pencil (1.ª generación) y Magic Keyboard Folio; azul, rosa, amarillo o plata",
    ),
  },
];

const MODELS = [...IPHONE, ...SAMSUNG, ...GALAXY_Z, ...IPAD];

export const CATALOG_DEVICES: Device[] = MODELS.map((m) => toDevice(m, CATALOG_PHOTOS[m.id]?.[0]));
export const CATALOG_DETAILS: DeviceDetail[] = MODELS.map((m) =>
  toDetail(m, CATALOG_PHOTOS[m.id] ?? []),
);
