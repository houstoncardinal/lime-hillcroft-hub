import { ALTERNATES, type Lang } from "@/components/site/seo";

// Lease-to-own catalog: devices the store leases in person, with the owner's price sheet
// ("100% Phone Price – Sheet1", received 2026-11-10). Buy-in-full and leasing prices are the
// sheet's; weekly / bi-weekly / monthly payments are the sheet's estimates and are only shown
// where the sheet gives one. Rows with no price, cash-only rows and unlabeled rows are left out.
// The sheet's internal columns (discount eligibility, "check cost") are not published.
// These pages never use Shopify: customers apply with a leasing partner and pick up in store.

export const LEASE_PRICES_UPDATED = "2026-11-10";

type L = Record<Lang, string>;

export type LeaseOption = {
  /** Storage / size / condition, e.g. "256GB · Sealed". */
  label: L;
  /** Buy-in-full (cash) price, USD. Missing when the sheet only has a leasing price. */
  cash?: number;
  /** Leasing price, USD. */
  lease: number;
  weekly?: number;
  biweekly?: number;
  monthly?: number;
};

export type LeaseCategory =
  | "iphone"
  | "samsung"
  | "other-phones"
  | "watches"
  | "ipads"
  | "macbooks"
  | "consoles"
  | "tv";

export type LeaseDevice = {
  id: string;
  name: string;
  brand: string;
  category: LeaseCategory;
  /** The model's spec page and photo at /devices/<id>, when the site has one. */
  deviceId?: string;
  note?: L;
  options: LeaseOption[];
};

export const LEASE_CATEGORIES: { id: LeaseCategory; title: L }[] = [
  { id: "iphone", title: { en: "iPhone", es: "iPhone" } },
  { id: "samsung", title: { en: "Samsung Galaxy", es: "Samsung Galaxy" } },
  { id: "other-phones", title: { en: "Other phones", es: "Otros celulares" } },
  { id: "watches", title: { en: "Apple Watch", es: "Apple Watch" } },
  { id: "ipads", title: { en: "iPad", es: "iPad" } },
  { id: "macbooks", title: { en: "MacBook", es: "MacBook" } },
  { id: "consoles", title: { en: "Game consoles", es: "Consolas" } },
  { id: "tv", title: { en: "TVs", es: "Televisores" } },
];

const l = (en: string, es = en): L => ({ en, es });
const SEALED = (s: string) => l(`${s} · Sealed`, `${s} · Sellado`);
const OPEN_BOX = (s: string) => l(`${s} · Open box`, `${s} · Caja abierta`);
const PRE_OWNED = (s?: string) =>
  s ? l(`${s} · Pre-owned`, `${s} · Seminuevo`) : l("Pre-owned", "Seminuevo");
const AB = (s: string) => l(`${s} · A/B grade`, `${s} · Grado A/B`);
const UNLOCKED = (s: string) => l(`${s} · Unlocked`, `${s} · Desbloqueado`);

/** One price row: label, buy-in-full, leasing, then the sheet's weekly / bi-weekly / monthly. */
const o = (
  label: L | string,
  cash: number | undefined,
  lease: number,
  weekly?: number,
  biweekly?: number,
  monthly?: number,
): LeaseOption => ({
  label: typeof label === "string" ? l(label) : label,
  ...(cash ? { cash } : {}),
  lease,
  ...(weekly ? { weekly } : {}),
  ...(biweekly ? { biweekly } : {}),
  ...(monthly ? { monthly } : {}),
});

export const LEASE_DEVICES: LeaseDevice[] = [
  // ---------- iPhone ----------
  { id: "iphone-18-pro-max", name: "iPhone 18 Pro Max", brand: "Apple", category: "iphone", deviceId: "iphone-18",
    options: [o("256GB", 1699, 1799, 101), o("512GB", 1950, 2050)] },
  { id: "iphone-18-pro", name: "iPhone 18 Pro", brand: "Apple", category: "iphone", deviceId: "iphone-18-pro",
    options: [o("256GB", 1550, 1650)] },
  { id: "iphone-17-pro-max", name: "iPhone 17 Pro Max", brand: "Apple", category: "iphone", deviceId: "iphone-17-pro-max",
    options: [o(SEALED("256GB"), 1359, 1399), o(OPEN_BOX("256GB"), 1399, 1429, 70, 140, 271)] },
  { id: "iphone-17-pro", name: "iPhone 17 Pro", brand: "Apple", category: "iphone", deviceId: "iphone-17-pro",
    options: [o("256GB", 1199, 1299, 64)] },
  { id: "iphone-air", name: "iPhone Air", brand: "Apple", category: "iphone",
    options: [o("256GB", 1099, 1150, 88, 177, 342)] },
  { id: "iphone-17", name: "iPhone 17", brand: "Apple", category: "iphone", deviceId: "iphone-17",
    options: [o("256GB", 950, 1049)] },
  { id: "iphone-16-pro-max", name: "iPhone 16 Pro Max", brand: "Apple", category: "iphone", deviceId: "iphone-16-pro-max",
    options: [o("256GB", 1049, 1149, 56, 113, 218), o("512GB", 1129, 1229), o("1TB", 1150, 1249)] },
  { id: "iphone-16-pro", name: "iPhone 16 Pro", brand: "Apple", category: "iphone", deviceId: "iphone-16-pro",
    options: [o("256GB", 799, 899, 44, 88, 171)] },
  { id: "iphone-16-plus", name: "iPhone 16 Plus", brand: "Apple", category: "iphone", deviceId: "iphone-16-plus",
    options: [o("128GB", 849, 899, 44, 88, 171), o("256GB", 899, 949)] },
  { id: "iphone-16", name: "iPhone 16", brand: "Apple", category: "iphone", deviceId: "iphone-16",
    options: [o("128GB", 749, 799, 39, 78, 152), o(PRE_OWNED("128GB"), 600, 650)] },
  { id: "iphone-15-pro-max", name: "iPhone 15 Pro Max", brand: "Apple", category: "iphone", deviceId: "iphone-15-pro-max",
    options: [o("256GB", 849, 899, 44, 88, 171)] },
  { id: "iphone-15-pro", name: "iPhone 15 Pro", brand: "Apple", category: "iphone",
    options: [o("256GB", 679, 779)] },
  { id: "iphone-15-plus", name: "iPhone 15 Plus", brand: "Apple", category: "iphone", deviceId: "iphone-15-plus",
    options: [o("128GB", 699, 799, 39, 78, 152), o("256GB", 750, 829)] },
  { id: "iphone-15", name: "iPhone 15", brand: "Apple", category: "iphone", deviceId: "iphone-15",
    options: [o("128GB", 599, 699, 34, 69)] },
  { id: "iphone-14-pro-max", name: "iPhone 14 Pro Max", brand: "Apple", category: "iphone", deviceId: "iphone-14-pro-max",
    options: [o("128GB", 699, 799, 39, 78, 152)] },
  { id: "iphone-14-pro", name: "iPhone 14 Pro", brand: "Apple", category: "iphone", deviceId: "iphone-14-pro",
    options: [o("128GB", 575, 675, 33, 66, 128), o("256GB", 675, 775), o(PRE_OWNED(), 450, 500)] },
  { id: "iphone-14-plus", name: "iPhone 14 Plus", brand: "Apple", category: "iphone", deviceId: "iphone-14-plus",
    options: [o("128GB", 549, 599, 29, 59, 114)] },
  { id: "iphone-14", name: "iPhone 14", brand: "Apple", category: "iphone", deviceId: "iphone-14",
    options: [o("128GB", 479, 549, 27, 54, 104), o("256GB", 499, 569)] },
  { id: "iphone-13-pro-max", name: "iPhone 13 Pro Max", brand: "Apple", category: "iphone", deviceId: "iphone-13-pro-max",
    options: [o(UNLOCKED("128GB"), 599, 649, 32, 64, 123)] },
  { id: "iphone-13", name: "iPhone 13", brand: "Apple", category: "iphone", deviceId: "iphone-13",
    options: [
      o(l("128GB · Unlocked · Black", "128GB · Desbloqueado · Negro"), 399, 450),
      o(l("128GB · Unlocked · Red / Pink", "128GB · Desbloqueado · Rojo / Rosa"), 425, 475, 23, 47, 90),
    ] },
  { id: "iphone-12-pro-max", name: "iPhone 12 Pro Max", brand: "Apple", category: "iphone", deviceId: "iphone-12-pro-max",
    options: [o("128GB · 5G", 525, 599, 29, 59, 114)] },
  { id: "iphone-12", name: "iPhone 12", brand: "Apple", category: "iphone", deviceId: "iphone-12",
    options: [o(AB("64GB · 5G"), 299, 350, 17, 34, 66), o("64GB · 5G", 350, 385, 19, undefined, 73)] },
  { id: "iphone-11-pro-max", name: "iPhone 11 Pro Max", brand: "Apple", category: "iphone", deviceId: "iphone-11-pro-max",
    options: [o(UNLOCKED("256GB"), 350, 400, 20, 39, 76)] },
  { id: "iphone-11", name: "iPhone 11", brand: "Apple", category: "iphone", deviceId: "iphone-11",
    options: [
      o(AB("64GB · Unlocked"), 225, 275),
      o(UNLOCKED("64GB"), 279, 349, 17, 34, 66),
      o(UNLOCKED("128GB"), 309, 369),
    ] },
  { id: "iphone-xs-max", name: "iPhone XS Max", brand: "Apple", category: "iphone",
    options: [o(UNLOCKED("64GB"), 299, 349, 17, 34, 66), o(UNLOCKED("256GB"), 329, 379.99)] },
  { id: "iphone-xr", name: "iPhone XR", brand: "Apple", category: "iphone",
    options: [o(l("Unlocked · A/B grade", "Desbloqueado · Grado A/B"), 215, 249, 12, 24, 47)] },
  { id: "iphone-se-2", name: "iPhone SE (2nd generation)", brand: "Apple", category: "iphone",
    options: [o(AB("64GB · Unlocked"), 175, 199, 10, 20, 38)] },
  { id: "iphone-8-plus", name: "iPhone 8 Plus", brand: "Apple", category: "iphone",
    options: [o(AB("64GB · Unlocked"), 185, 209, 10, 21, 40)] },
  { id: "iphone-8", name: "iPhone 8", brand: "Apple", category: "iphone",
    options: [o(AB("64GB · Unlocked"), 129, 149, 7, 15, 28), o(UNLOCKED("64GB"), 135, 155)] },

  // ---------- Samsung Galaxy ----------
  { id: "galaxy-z-fold7", name: "Galaxy Z Fold7", brand: "Samsung", category: "samsung", deviceId: "galaxy-z-fold7",
    options: [o(UNLOCKED("256GB"), 1249, 1349, 66, 132)] },
  { id: "galaxy-z-flip7", name: "Galaxy Z Flip7", brand: "Samsung", category: "samsung", deviceId: "galaxy-z-flip7",
    options: [o(UNLOCKED("512GB"), 1049, 1099)] },
  { id: "galaxy-z-fold6", name: "Galaxy Z Fold6", brand: "Samsung", category: "samsung", deviceId: "galaxy-z-fold6",
    options: [o("512GB", 950, 1049, 51, 103, 199), o("1TB", 999, 1099, undefined, undefined, 209)] },
  { id: "galaxy-z-fold5", name: "Galaxy Z Fold5", brand: "Samsung", category: "samsung",
    note: l("Special price", "Precio especial"),
    options: [o("256GB", 750, 849, 42, 83, 161)] },
  { id: "galaxy-z-flip4", name: "Galaxy Z Flip4", brand: "Samsung", category: "samsung",
    options: [o(UNLOCKED("128GB"), 429, 529, 26, 52, 100)] },
  { id: "galaxy-s26-ultra", name: "Galaxy S26 Ultra", brand: "Samsung", category: "samsung", deviceId: "galaxy-s26-ultra",
    options: [o(UNLOCKED("256GB"), 1149, 1249), o(UNLOCKED("512GB"), 1349, 1449)] },
  { id: "galaxy-s25-ultra", name: "Galaxy S25 Ultra", brand: "Samsung", category: "samsung", deviceId: "galaxy-s25-ultra",
    options: [
      o("256GB", 949, 1050, undefined, 103, 199),
      o("512GB", 1050, 1149, 56, 113, 218),
      o("1TB", 1099, 1199),
    ] },
  { id: "galaxy-s24-ultra", name: "Galaxy S24 Ultra", brand: "Samsung", category: "samsung", deviceId: "galaxy-s24-ultra",
    options: [o("256GB", 899, 949, 47, 93, 180)] },
  { id: "galaxy-s24", name: "Galaxy S24", brand: "Samsung", category: "samsung", deviceId: "galaxy-s24",
    options: [o("128GB", 599, 649, 32, 64, 123)] },
  { id: "galaxy-s23-ultra", name: "Galaxy S23 Ultra", brand: "Samsung", category: "samsung", deviceId: "galaxy-s23-ultra",
    options: [o("256GB", 675, 729, 36, 72, 138), o("512GB", 699, 750)] },
  { id: "galaxy-s23", name: "Galaxy S23", brand: "Samsung", category: "samsung", deviceId: "galaxy-s23",
    options: [o("128GB", 549, 599)] },
  { id: "galaxy-s22-ultra", name: "Galaxy S22 Ultra", brand: "Samsung", category: "samsung", deviceId: "galaxy-s22-ultra",
    options: [o("128GB", 499, 599, 29, 59, 114), o("256GB", undefined, 649, 32, 64, 123)] },
  { id: "galaxy-s22-plus", name: "Galaxy S22+", brand: "Samsung", category: "samsung", deviceId: "galaxy-s22-plus",
    options: [o("128GB", 450, 550)] },
  { id: "galaxy-s22", name: "Galaxy S22", brand: "Samsung", category: "samsung", deviceId: "galaxy-s22",
    options: [o(l("128GB · A grade", "128GB · Grado A"), 299, 349), o("128GB", 349, 399, 20, 39, 76)] },
  { id: "galaxy-s21-ultra", name: "Galaxy S21 Ultra", brand: "Samsung", category: "samsung", deviceId: "galaxy-s21-ultra",
    options: [o(UNLOCKED("128GB"), 429, 529, 26, 52, 100)] },
  { id: "galaxy-s21-plus", name: "Galaxy S21+", brand: "Samsung", category: "samsung", deviceId: "galaxy-s21-plus",
    options: [o("128GB", 389, 489, 24, 48, 93)] },
  { id: "galaxy-s21", name: "Galaxy S21", brand: "Samsung", category: "samsung", deviceId: "galaxy-s21",
    options: [o("128GB · 5G", 329, 399, 20, 39, 76), o(PRE_OWNED(), 225, 275)] },
  { id: "galaxy-note20-ultra", name: "Galaxy Note20 Ultra", brand: "Samsung", category: "samsung", deviceId: "galaxy-note20-ultra",
    options: [o("128GB", 475, 529, 26, 52, 100)] },
  { id: "galaxy-s20-ultra", name: "Galaxy S20 Ultra 5G", brand: "Samsung", category: "samsung", deviceId: "galaxy-s20-ultra",
    options: [o("5G", 399, 499, 24, 49, 95)] },
  { id: "galaxy-s20-plus", name: "Galaxy S20+ 5G", brand: "Samsung", category: "samsung",
    options: [o("5G", 349, 449, 22, 44, 85)] },
  { id: "galaxy-note10-plus", name: "Galaxy Note10+", brand: "Samsung", category: "samsung",
    options: [o(UNLOCKED("256GB"), 375, 449, 22, 44, 85)] },
  { id: "galaxy-s9-plus", name: "Galaxy S9+", brand: "Samsung", category: "samsung",
    options: [o("64GB", 245, 299, 15, 29, 57)] },
  { id: "galaxy-a54", name: "Galaxy A54 5G", brand: "Samsung", category: "samsung",
    options: [o("128GB", 369, 429, 21, 42, 81)] },
  { id: "galaxy-a15", name: "Galaxy A15 5G", brand: "Samsung", category: "samsung", deviceId: "galaxy-a15",
    options: [o("128GB", 249, 279, 14, 27, 53)] },
  { id: "galaxy-a13", name: "Galaxy A13 5G", brand: "Samsung", category: "samsung", deviceId: "galaxy-a13",
    options: [o("64GB", 189, 245, 12, 24, 47)] },
  { id: "galaxy-a03s", name: "Galaxy A03s", brand: "Samsung", category: "samsung", deviceId: "galaxy-a03s",
    options: [o(UNLOCKED("32GB"), 139, 179, 9, 18, 34)] },

  // ---------- Other phones ----------
  { id: "moto-g-ace-5g", name: "Moto G Ace 5G", brand: "Motorola", category: "other-phones",
    options: [o("64GB", 159, 189, 9, 19, 36)] },
  { id: "alcatel-3v", name: "Alcatel 3V", brand: "Alcatel", category: "other-phones",
    note: l("Unlocked — not for AT&T or Cricket", "Desbloqueado — no funciona con AT&T ni Cricket"),
    options: [o("32GB", 129, 149, 7, 15, 28)] },

  // ---------- Apple Watch ----------
  { id: "apple-watch-series-12", name: "Apple Watch Series 12", brand: "Apple", category: "watches",
    options: [o("44mm · GPS + Cellular", 499, 599, 29, 59, 114), o("46mm · GPS + Cellular", 600, 650)] },
  { id: "apple-watch-series-11", name: "Apple Watch Series 11", brand: "Apple", category: "watches",
    options: [o("42mm · GPS + Cellular", 499, 549), o("46mm · GPS + Cellular", 549, 599, 27, 54, 104)] },
  { id: "apple-watch-se", name: "Apple Watch SE", brand: "Apple", category: "watches",
    options: [
      o("40mm · GPS", 299, 299, 15, 29, 57),
      o(l("2nd generation · 44mm · GPS + Cellular", "2.ª generación · 44mm · GPS + Cellular"), 299, 299, 15, 29, 57),
    ] },

  // ---------- iPad ----------
  { id: "ipad-pro-11-m2", name: 'iPad Pro 11" (4th generation, M2)', brand: "Apple", category: "ipads", deviceId: "ipad-pro-m2",
    options: [o("256GB", 600, 650, 32, 64, 123)] },
  { id: "ipad-11", name: "iPad (11th generation)", brand: "Apple", category: "ipads", deviceId: "ipad-11",
    options: [
      o("128GB · Wi-Fi + Cellular", 550, 599, 29, 59, 114),
      o("128GB · Wi-Fi", 599, 649),
      o("256GB · Wi-Fi + Cellular", 799, 849),
    ] },
  { id: "ipad-mini-6", name: "iPad mini (6th generation)", brand: "Apple", category: "ipads",
    options: [o("64GB · Wi-Fi + Cellular", 349, 399)] },
  { id: "ipad-mini-5", name: "iPad mini (5th generation)", brand: "Apple", category: "ipads", deviceId: "ipad-mini-5",
    options: [o("64GB · Wi-Fi + Cellular", 235, 265), o("256GB · Wi-Fi + Cellular", 249, 280)] },
  { id: "ipad-9", name: "iPad (9th generation)", brand: "Apple", category: "ipads",
    options: [o("64GB · Wi-Fi + Cellular", 275, 299, 15, 29, 57)] },
  { id: "ipad-8", name: "iPad (8th generation)", brand: "Apple", category: "ipads",
    options: [o("128GB · Wi-Fi + Cellular", 249, 279, 12, 24, 47)] },
  { id: "ipad-6", name: "iPad (6th generation)", brand: "Apple", category: "ipads",
    options: [
      o(l("32GB · Wi-Fi · A/B grade", "32GB · Wi-Fi · Grado A/B"), 165, 175, 8, 16, 31),
      o(l("128GB · Wi-Fi + Cellular · A/B grade", "128GB · Wi-Fi + Cellular · Grado A/B"), 190, 195, 9, 19, 36),
    ] },

  // ---------- MacBook ----------
  { id: "macbook-air-13-m5", name: 'MacBook Air 13" (M5)', brand: "Apple", category: "macbooks",
    options: [o("16GB RAM · 512GB", 1549, 1649)] },
  { id: "macbook-air-15-m5", name: 'MacBook Air 15" (M5)', brand: "Apple", category: "macbooks",
    options: [o("16GB RAM · 512GB", 1299, 1729)] },
  { id: "macbook-air-13-m4", name: 'MacBook Air 13" (M4)', brand: "Apple", category: "macbooks",
    options: [o("16GB RAM · 256GB", 1050, 1150, 56, 113, 218)] },
  { id: "macbook-neo-13", name: 'MacBook Neo 13"', brand: "Apple", category: "macbooks",
    options: [o("8GB RAM · 256GB", 799, 899), o("8GB RAM · 512GB", 899, 999)] },

  // ---------- Game consoles ----------
  { id: "playstation-5-pro", name: "PlayStation 5 Pro", brand: "Sony", category: "consoles",
    options: [o(l("Digital Edition · 2TB", "Edición Digital · 2TB"), 1459, 1499)] },
  { id: "playstation-5", name: "PlayStation 5", brand: "Sony", category: "consoles",
    options: [
      o(l("Disc + Digital", "Disco + Digital"), 799, 899, 44, 88, 171),
      o(l("Digital Edition", "Edición Digital"), 750, 850),
    ] },
  { id: "xbox-series-x", name: "Xbox Series X", brand: "Microsoft", category: "consoles",
    options: [o("1TB", 799, 950, 47, 93, 180)] },
  { id: "nintendo-switch-2", name: "Nintendo Switch 2", brand: "Nintendo", category: "consoles",
    options: [o(l("Console", "Consola"), 650, 750, 37, 74, 142)] },
  { id: "playstation-portal", name: "PlayStation Portal", brand: "Sony", category: "consoles",
    options: [o(l("Remote player", "Reproductor remoto"), 300, 450)] },

  // ---------- TVs ----------
  { id: "samsung-tv-65", name: 'Samsung 65" TV', brand: "Samsung", category: "tv",
    options: [o('65"', 550, 650)] },
];

export const findLeaseDevice = (id: string) => LEASE_DEVICES.find((d) => d.id === id);

/** The lowest leasing price, with that same option's weekly estimate when the sheet has one. */
export function leaseFrom(d: LeaseDevice) {
  const cheapest = d.options.reduce((a, b) => (b.lease < a.lease ? b : a));
  return { lease: cheapest.lease, weekly: cheapest.weekly };
}

/** Devices shown first on the home page: the newest flagships of each kind. */
export const LEASE_FEATURED = [
  "iphone-18-pro-max",
  "iphone-17-pro-max",
  "galaxy-s26-ultra",
  "galaxy-z-fold7",
  "iphone-16-pro-max",
  "macbook-air-13-m4",
  "playstation-5",
  "apple-watch-series-11",
];

export const LEASE_PATHS = ALTERNATES.leaseCatalog;
export const leaseDevicePath = (lang: Lang, id: string) => `${LEASE_PATHS[lang]}/${id}`;
export const leaseDevicePaths = (id: string) => ({
  en: leaseDevicePath("en", id),
  es: leaseDevicePath("es", id),
});
