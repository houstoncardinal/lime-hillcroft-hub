import type { Lang } from "@/components/site/seo";

// Latest devices in the store, from the owner's list (Oct 13, 2026). Images are crops of the
// store's own display-case photos (public/photos/devices). Shown on the unlocked-phones page,
// the laptops & tablets page and the home page, and listed in llms-full.txt, so the website,
// search engines and the Tidio chat agent all know what's in stock.
//
// "5G" is shown only for models that come in a 5G version: the Galaxy A20 and A03s don't.

export const INVENTORY_UPDATED = "2026-10-13";

type L = Record<Lang, string>;

export type DeviceKind = "iphone" | "galaxy-flagship" | "galaxy-a" | "ipad";

export type Device = {
  id: string;
  name: string;
  brand: "Apple" | "Samsung";
  kind: DeviceKind;
  fiveG?: boolean;
  note?: L;
  image: string;
  w: number;
  h: number;
  alt: L;
};

const img = (file: string) => `/photos/devices/${file}.webp`;
const box = (model: string): L => ({
  en: `Samsung ${model} box in the TIC Wireless display case`,
  es: `Caja de Samsung ${model} en la vitrina de TIC Wireless`,
});

export const LATEST_DEVICES: Device[] = [
  {
    id: "iphone-18",
    name: "iPhone 18",
    brand: "Apple",
    kind: "iphone",
    fiveG: true,
    note: { en: "Including iPhone 18 Pro Max", es: "Incluye iPhone 18 Pro Max" },
    image: img("iphone-18"),
    w: 640,
    h: 800,
    alt: { en: "iPhone 18 Pro Max at TIC Wireless", es: "iPhone 18 Pro Max en TIC Wireless" },
  },
  {
    id: "galaxy-s20-ultra",
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

export const PHONES = LATEST_DEVICES.filter((d) => d.kind !== "ipad");
export const TABLETS = LATEST_DEVICES.filter((d) => d.kind === "ipad");
