import { CATALOG_DEVICES } from "@/components/products/catalog";
import { devicePaths } from "@/components/products/device-paths";
import type { Lang } from "@/components/site/seo";

// Devices in the store, from the owner's lists (Oct 13 and Oct 16, 2026). The shelf devices
// below use crops of the store's own display-case photos (public/photos/devices); the iPhones
// and Galaxy S phones added Oct 16 (catalog.ts) use credited Wikimedia Commons photos. Shown on
// /devices, the home page, the unlocked-phones and laptops & tablets pages, and listed in
// llms-full.txt and the Tidio knowledge base, so the website, search engines and the chat agent
// all know what's in stock.
//
// "5G" is shown only for models that come in a 5G version: the Galaxy A20 and A03s don't.

export const INVENTORY_UPDATED = "2026-10-16";

type L = Record<Lang, string>;

export type DeviceKind = "iphone" | "galaxy-flagship" | "galaxy-a" | "ipad";

export type Device = {
  id: string;
  name: string;
  brand: "Apple" | "Samsung";
  kind: DeviceKind;
  /** Model family for grouping, e.g. "iPhone 16" or "Galaxy S24". */
  family?: string;
  /** Year the model came out (newest are listed first). */
  year?: number;
  /** "contain" shows a product photo whole on white instead of cropping it. */
  fit?: "contain";
  fiveG?: boolean;
  note?: L;
  image: string;
  w: number;
  h: number;
  alt: L;
  /** The device's own page (the card links to it). Defaults to /devices/<id>. */
  page?: L;
};

const img = (file: string) => `/photos/devices/${file}.webp`;
const box = (model: string): L => ({
  en: `Samsung ${model} box in the TIC Wireless display case`,
  es: `Caja de Samsung ${model} en la vitrina de TIC Wireless`,
});

const SHELF: Device[] = [
  {
    id: "iphone-18",
    name: "iPhone 18 Pro Max",
    brand: "Apple",
    kind: "iphone",
    family: "iPhone 18",
    year: 2026,
    fiveG: true,
    image: img("iphone-18"),
    w: 640,
    h: 800,
    alt: { en: "iPhone 18 Pro Max at TIC Wireless", es: "iPhone 18 Pro Max en TIC Wireless" },
  },
  {
    id: "galaxy-s20-ultra",
    family: "Galaxy S20",
    year: 2020,
    name: "Galaxy S20 Ultra",
    brand: "Samsung",
    kind: "galaxy-flagship",
    fiveG: true,
    image: img("s20-ultra"),
    w: 760,
    h: 950,
    alt: {
      en: "Samsung Galaxy S20 Ultra on display at TIC Wireless",
      es: "Samsung Galaxy S20 Ultra en exhibición en TIC Wireless",
    },
  },
  {
    id: "galaxy-note20-ultra",
    family: "Galaxy Note 20",
    year: 2020,
    name: "Galaxy Note 20 Ultra",
    brand: "Samsung",
    kind: "galaxy-flagship",
    fiveG: true,
    image: img("note20-ultra"),
    w: 760,
    h: 950,
    alt: {
      en: "Samsung Galaxy Note 20 Ultra in bronze on display at TIC Wireless",
      es: "Samsung Galaxy Note 20 Ultra color bronce en exhibición en TIC Wireless",
    },
  },
  {
    id: "galaxy-a53",
    family: "Galaxy A",
    year: 2022,
    name: "Galaxy A53 5G",
    brand: "Samsung",
    kind: "galaxy-a",
    fiveG: true,
    image: img("a53"),
    w: 470,
    h: 430,
    alt: box("Galaxy A53 5G"),
  },
  {
    id: "galaxy-a36",
    family: "Galaxy A",
    year: 2025,
    name: "Galaxy A36 5G",
    brand: "Samsung",
    kind: "galaxy-a",
    fiveG: true,
    image: img("a36"),
    w: 470,
    h: 430,
    alt: box("Galaxy A36 5G"),
  },
  {
    id: "galaxy-a26",
    family: "Galaxy A",
    year: 2025,
    name: "Galaxy A26 5G",
    brand: "Samsung",
    kind: "galaxy-a",
    fiveG: true,
    image: img("galaxy-a-row"),
    w: 800,
    h: 200,
    alt: {
      en: "Samsung Galaxy A-series boxes in the TIC Wireless display case",
      es: "Cajas de Samsung Galaxy serie A en la vitrina de TIC Wireless",
    },
  },
  {
    id: "galaxy-a16",
    family: "Galaxy A",
    year: 2024,
    name: "Galaxy A16 5G",
    brand: "Samsung",
    kind: "galaxy-a",
    fiveG: true,
    image: img("a16"),
    w: 470,
    h: 430,
    alt: box("Galaxy A16 5G"),
  },
  {
    id: "galaxy-a15",
    family: "Galaxy A",
    year: 2023,
    name: "Galaxy A15 5G",
    brand: "Samsung",
    kind: "galaxy-a",
    fiveG: true,
    image: img("a15"),
    w: 470,
    h: 430,
    alt: box("Galaxy A15 5G"),
  },
  {
    id: "galaxy-a14",
    family: "Galaxy A",
    year: 2023,
    name: "Galaxy A14 5G",
    brand: "Samsung",
    kind: "galaxy-a",
    fiveG: true,
    image: img("a14"),
    w: 470,
    h: 430,
    alt: box("Galaxy A14 5G"),
  },
  {
    id: "galaxy-a13",
    family: "Galaxy A",
    year: 2021,
    name: "Galaxy A13 5G",
    brand: "Samsung",
    kind: "galaxy-a",
    fiveG: true,
    image: img("a13"),
    w: 470,
    h: 430,
    alt: box("Galaxy A13 5G"),
  },
  {
    id: "galaxy-a20",
    family: "Galaxy A",
    year: 2019,
    name: "Galaxy A20",
    brand: "Samsung",
    kind: "galaxy-a",
    image: img("a20"),
    w: 470,
    h: 430,
    alt: box("Galaxy A20"),
  },
  {
    id: "galaxy-a03s",
    family: "Galaxy A",
    year: 2021,
    name: "Galaxy A03s",
    brand: "Samsung",
    kind: "galaxy-a",
    image: img("a03"),
    w: 470,
    h: 430,
    alt: box("Galaxy A03s"),
  },
  {
    id: "ipad-pro-m2",
    family: "iPad",
    year: 2022,
    name: "iPad Pro (M2)",
    brand: "Apple",
    kind: "ipad",
    image: img("ipad-pro"),
    w: 800,
    h: 676,
    alt: { en: "iPad Pro with M2 at TIC Wireless", es: "iPad Pro con M2 en TIC Wireless" },
  },
  {
    id: "ipad-mini-5",
    family: "iPad",
    year: 2019,
    name: "iPad mini (5th gen)",
    brand: "Apple",
    kind: "ipad",
    image: img("ipad-mini"),
    w: 640,
    h: 700,
    alt: {
      en: "iPad mini 5th generation in gold at TIC Wireless",
      es: "iPad mini de 5.ª generación color oro en TIC Wireless",
    },
  },
];

// Biggest models first within a year: Pro Max / Ultra, then Pro / Plus, then the rest.
const tier = (d: Device) => (/Pro Max|Ultra/.test(d.name) ? 0 : /Pro|\+|Plus/.test(d.name) ? 1 : 2);
const KIND_ORDER: DeviceKind[] = ["iphone", "galaxy-flagship", "galaxy-a", "ipad"];

// Every device opens its own page at /devices/<id> (src/components/products/devices.ts).
// Newest first, so the scrollers lead with the latest phones.
export const LATEST_DEVICES: (Device & { page: L })[] = [...SHELF, ...CATALOG_DEVICES]
  .map((d) => ({ ...d, page: d.page ?? devicePaths(d.id) }))
  .sort(
    (a, b) =>
      (b.year ?? 0) - (a.year ?? 0) ||
      KIND_ORDER.indexOf(a.kind) - KIND_ORDER.indexOf(b.kind) ||
      tier(a) - tier(b),
  );

export const PHONES = LATEST_DEVICES.filter((d) => d.kind !== "ipad");
export const TABLETS = LATEST_DEVICES.filter((d) => d.kind === "ipad");
