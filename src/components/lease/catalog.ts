import { ALTERNATES, type Lang } from "@/components/site/seo";

// Lease-to-own catalog: devices the store leases in person, with the owner's price sheet
// ("Price Sheet with both Budget and Regular – Sheet1", received 2026-11-14; earlier sheet
// 2026-11-10). Leasing prices are the sheet's, exactly. Payment estimates are the sheet's where it
// gives them; rows without estimates get them from the sheet's own formula (leaseEstimates below,
// which reproduces every estimate on the sheet) and are marked `calculated`. Rows with no leasing
// price (out of stock, or price only) are left out. Unlabeled rows are left out, except the
// iPhone 13 Pro Max 256GB, whose prices sit one line under its label.
// The sheet's internal columns (discount eligibility, "check cost") are not published.
// These pages never use Shopify: customers apply with a leasing partner and pick up in store.

export const LEASE_PRICES_UPDATED = "2026-11-14";

type L = Record<Lang, string>;

export type LeaseOption = {
  /** Storage / size / condition, e.g. "256GB · Sealed". */
  label: L;
  /** Buy-in-full (cash) price from the sheet, USD — kept for reference, never shown on lease pages. */
  cash?: number;
  /** Leasing price, USD. */
  lease: number;
  /** Estimated payments, USD: the sheet's, or calculated with its formula (see `calculated`). */
  weekly: number;
  biweekly: number;
  monthly: number;
  /** True when the sheet gave no estimates and they come from leaseEstimates(). */
  calculated?: true;
};

/**
 * The price sheet's payment formula, worked out from its 101 rows that have estimates (all
 * reproduced exactly): weekly = leasing price × 1.08 ÷ 22, bi-weekly = × 1.08 ÷ 11, monthly =
 * × 0.1899, each rounded to the nearest dollar (.50 rounds up). Computed in cents so $379.99-style
 * prices round the same way the sheet does.
 */
export function leaseEstimates(lease: number) {
  const cents = Math.round(lease * 100);
  const dollars = (num: number, den: number) => Math.round((cents * num) / den / 100);
  return { weekly: dollars(108, 2200), biweekly: dollars(108, 1100), monthly: dollars(1899, 10000) };
}

export type LeaseCategory =
  | "iphone"
  | "samsung"
  | "other-phones"
  | "watches"
  | "ipads"
  | "macbooks"
  | "laptops"
  | "consoles"
  | "tv"
  | "audio";

export type LeaseDevice = {
  id: string;
  name: string;
  brand: string;
  category: LeaseCategory;
  /** The model's spec page and photo at /devices/<id>, when the site has one. */
  deviceId?: string;
  note?: L;
  /** Key facts from the manufacturer's product page, shown on the device's lease page. */
  highlights?: L[];
  options: LeaseOption[];
};

export const LEASE_CATEGORIES: { id: LeaseCategory; title: L }[] = [
  { id: "iphone", title: { en: "iPhone", es: "iPhone" } },
  { id: "samsung", title: { en: "Samsung Galaxy", es: "Samsung Galaxy" } },
  { id: "other-phones", title: { en: "Other phones", es: "Otros celulares" } },
  { id: "watches", title: { en: "Smartwatches", es: "Relojes inteligentes" } },
  { id: "ipads", title: { en: "iPad & tablets", es: "iPad y tabletas" } },
  { id: "macbooks", title: { en: "MacBook", es: "MacBook" } },
  { id: "laptops", title: { en: "Laptops", es: "Laptops" } },
  { id: "consoles", title: { en: "Game consoles", es: "Consolas" } },
  { id: "tv", title: { en: "TVs", es: "Televisores" } },
  { id: "audio", title: { en: "Headphones & speakers", es: "Audífonos y bocinas" } },
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
  weekly: number,
  biweekly: number,
  monthly: number,
): LeaseOption => ({
  label: typeof label === "string" ? l(label) : label,
  ...(cash ? { cash } : {}),
  lease,
  weekly,
  biweekly,
  monthly,
});

/** A row the sheet prices for leasing but gives no estimates for: payments from its formula. */
const n = (label: L | string, cash: number | undefined, lease: number): LeaseOption => ({
  label: typeof label === "string" ? l(label) : label,
  ...(cash ? { cash } : {}),
  lease,
  ...leaseEstimates(lease),
  calculated: true,
});

export const LEASE_DEVICES: LeaseDevice[] = [
  // ---------- iPhone ----------
  { id: "iphone-18-pro-max", name: "iPhone 18 Pro Max", brand: "Apple", category: "iphone", deviceId: "iphone-18",
    options: [o("256GB", 1649, 1699, 83, 167, 323), o("512GB", 1899, 1949, 96, 191, 370)] },
  { id: "iphone-18-pro", name: "iPhone 18 Pro", brand: "Apple", category: "iphone", deviceId: "iphone-18-pro",
    options: [o("256GB", 1499, 1549, 76, 152, 294)] },
  { id: "iphone-17-pro-max", name: "iPhone 17 Pro Max", brand: "Apple", category: "iphone", deviceId: "iphone-17-pro-max",
    options: [o(SEALED("256GB"), 1359, 1399, 69, 137, 266), o(OPEN_BOX("256GB"), 1399, 1429, 70, 140, 271)] },
  { id: "iphone-17-pro", name: "iPhone 17 Pro", brand: "Apple", category: "iphone", deviceId: "iphone-17-pro",
    options: [o("256GB", 1199, 1299, 64, 128, 247)] },
  { id: "iphone-air", name: "iPhone Air", brand: "Apple", category: "iphone",
    options: [o("256GB", 899, 999, 49, 98, 190)] },
  { id: "iphone-17", name: "iPhone 17", brand: "Apple", category: "iphone", deviceId: "iphone-17",
    options: [o("256GB", 950, 1049, 51, 103, 199)] },
  { id: "iphone-16-pro-max", name: "iPhone 16 Pro Max", brand: "Apple", category: "iphone", deviceId: "iphone-16-pro-max",
    options: [
      o("256GB", 1049, 1149, 56, 113, 218),
      o("512GB", 1129, 1229, 60, 121, 233),
      o("1TB", 1150, 1249, 61, 123, 237),
    ] },
  { id: "iphone-16-pro", name: "iPhone 16 Pro", brand: "Apple", category: "iphone", deviceId: "iphone-16-pro",
    options: [o("256GB", 799, 899, 44, 88, 171)] },
  { id: "iphone-16-plus", name: "iPhone 16 Plus", brand: "Apple", category: "iphone", deviceId: "iphone-16-plus",
    options: [o("128GB", 849, 899, 44, 88, 171), o("256GB", 899, 949, 47, 93, 180)] },
  { id: "iphone-16", name: "iPhone 16", brand: "Apple", category: "iphone", deviceId: "iphone-16",
    options: [o("128GB", 749, 799, 39, 78, 152), o(PRE_OWNED(), 600, 650, 32, 64, 123)] },
  { id: "iphone-15-pro-max", name: "iPhone 15 Pro Max", brand: "Apple", category: "iphone", deviceId: "iphone-15-pro-max",
    options: [o("256GB", 849, 899, 44, 88, 171)] },
  { id: "iphone-15-pro", name: "iPhone 15 Pro", brand: "Apple", category: "iphone",
    options: [o("256GB", 679, 779, 38, 76, 148)] },
  { id: "iphone-15-plus", name: "iPhone 15 Plus", brand: "Apple", category: "iphone", deviceId: "iphone-15-plus",
    options: [o("128GB", 699, 799, 39, 78, 152), o("256GB", 750, 829, 41, 81, 157)] },
  { id: "iphone-15", name: "iPhone 15", brand: "Apple", category: "iphone", deviceId: "iphone-15",
    options: [o("128GB", 599, 699, 34, 69, 133)] },
  { id: "iphone-14-pro-max", name: "iPhone 14 Pro Max", brand: "Apple", category: "iphone", deviceId: "iphone-14-pro-max",
    options: [o("128GB", 699, 799, 39, 78, 152)] },
  { id: "iphone-14-pro", name: "iPhone 14 Pro", brand: "Apple", category: "iphone", deviceId: "iphone-14-pro",
    options: [
      o("128GB", 575, 675, 33, 66, 128),
      o("256GB", 675, 775, 38, 76, 147),
      o(PRE_OWNED(), 450, 500, 25, 49, 95),
    ] },
  { id: "iphone-14-plus", name: "iPhone 14 Plus", brand: "Apple", category: "iphone", deviceId: "iphone-14-plus",
    options: [o("128GB", 549, 599, 29, 59, 114)] },
  { id: "iphone-14", name: "iPhone 14", brand: "Apple", category: "iphone", deviceId: "iphone-14",
    options: [o("128GB", 479, 549, 27, 54, 104), o("256GB", 499, 569, 28, 56, 108)] },
  { id: "iphone-13-pro-max", name: "iPhone 13 Pro Max", brand: "Apple", category: "iphone", deviceId: "iphone-13-pro-max",
    // 256GB: the sheet puts its prices on the line just under the "256 Unlocked" label.
    options: [o(UNLOCKED("128GB"), 599, 649, 32, 64, 123), o(UNLOCKED("256GB"), 650, 750, 37, 74, 142)] },
  { id: "iphone-13", name: "iPhone 13", brand: "Apple", category: "iphone", deviceId: "iphone-13",
    options: [
      o(l("128GB · Unlocked · Black", "128GB · Desbloqueado · Negro"), 399, 450, 22, 44, 85),
      o(l("128GB · Unlocked · Red / Pink", "128GB · Desbloqueado · Rojo / Rosa"), 425, 475, 23, 47, 90),
    ] },
  { id: "iphone-12-pro-max", name: "iPhone 12 Pro Max", brand: "Apple", category: "iphone", deviceId: "iphone-12-pro-max",
    options: [o("128GB · 5G", 525, 599, 29, 59, 114)] },
  { id: "iphone-12", name: "iPhone 12", brand: "Apple", category: "iphone", deviceId: "iphone-12",
    options: [o(AB("64GB · 5G"), 299, 350, 17, 34, 66), o("64GB · 5G", 350, 385, 19, 38, 73)] },
  { id: "iphone-11-pro-max", name: "iPhone 11 Pro Max", brand: "Apple", category: "iphone", deviceId: "iphone-11-pro-max",
    options: [o(UNLOCKED("256GB"), 350, 400, 20, 39, 76)] },
  { id: "iphone-11", name: "iPhone 11", brand: "Apple", category: "iphone", deviceId: "iphone-11",
    options: [
      o(AB("64GB · Unlocked"), 225, 275, 14, 27, 52),
      o(UNLOCKED("64GB"), 279, 349, 17, 34, 66),
      o(UNLOCKED("128GB"), 309, 369, 18, 36, 70),
    ] },
  { id: "iphone-xs-max", name: "iPhone XS Max", brand: "Apple", category: "iphone",
    options: [o(UNLOCKED("64GB"), 299, 349, 17, 34, 66), o(UNLOCKED("256GB"), 329, 379.99, 19, 37, 72)] },
  { id: "iphone-xr", name: "iPhone XR", brand: "Apple", category: "iphone",
    options: [o(l("Unlocked · A/B grade", "Desbloqueado · Grado A/B"), 215, 249, 12, 24, 47)] },
  { id: "iphone-se-2", name: "iPhone SE (2nd generation)", brand: "Apple", category: "iphone",
    options: [o(AB("64GB · Unlocked"), 175, 199, 10, 20, 38)] },

  // ---------- Samsung Galaxy ----------
  // Samsung specs below from samsung.com and Samsung's US newsroom.
  { id: "galaxy-z-fold8-ultra", name: "Galaxy Z Fold8 Ultra", brand: "Samsung", category: "samsung", deviceId: "galaxy-z-fold8-ultra",
    highlights: [
      l("8-inch main display", "Pantalla principal de 8 pulgadas"),
      l("200 MP main camera with HDR in 200 MP mode", "Cámara principal de 200 MP con HDR en modo 200 MP"),
      l("New 50 MP ultra-wide camera", "Nueva cámara ultra gran angular de 50 MP"),
      l("5,000 mAh battery with 45 W fast charging", "Batería de 5,000 mAh con carga rápida de 45 W"),
      l("Just 4.1 mm thin unfolded and 215 g", "Solo 4.1 mm de grosor desplegado y 215 g de peso"),
    ],
    options: [n("256GB", 1999, 2099)] },
  { id: "galaxy-z-fold7", name: "Galaxy Z Fold7", brand: "Samsung", category: "samsung", deviceId: "galaxy-z-fold7",
    options: [o(UNLOCKED("256GB"), 1249, 1349, 66, 132, 256)] },
  { id: "galaxy-z-flip7", name: "Galaxy Z Flip7", brand: "Samsung", category: "samsung", deviceId: "galaxy-z-flip7",
    options: [o(UNLOCKED("512GB"), 1049, 1099, 54, 108, 209)] },
  { id: "galaxy-z-fold6", name: "Galaxy Z Fold6", brand: "Samsung", category: "samsung", deviceId: "galaxy-z-fold6",
    options: [o("512GB", 950, 1049, 51, 103, 199), o("1TB", 999, 1099, 54, 108, 209)] },
  { id: "galaxy-z-fold5", name: "Galaxy Z Fold5", brand: "Samsung", category: "samsung",
    note: l("Special price", "Precio especial"),
    options: [o("256GB", 750, 849, 42, 83, 161)] },
  { id: "galaxy-z-flip4", name: "Galaxy Z Flip4", brand: "Samsung", category: "samsung",
    options: [o(UNLOCKED("128GB"), 429, 529, 26, 52, 100)] },
  { id: "galaxy-s26-ultra", name: "Galaxy S26 Ultra", brand: "Samsung", category: "samsung", deviceId: "galaxy-s26-ultra",
    options: [o(UNLOCKED("256GB"), 1149, 1249, 61, 123, 237), o(UNLOCKED("512GB"), 1349, 1449, 71, 142, 275)] },
  { id: "galaxy-s25-ultra", name: "Galaxy S25 Ultra", brand: "Samsung", category: "samsung", deviceId: "galaxy-s25-ultra",
    options: [
      o("256GB", 949, 1050, 52, 103, 199),
      o("512GB", 1050, 1149, 56, 113, 218),
      o("1TB", 1099, 1199, 59, 118, 228),
    ] },
  { id: "galaxy-s24-ultra", name: "Galaxy S24 Ultra", brand: "Samsung", category: "samsung", deviceId: "galaxy-s24-ultra",
    options: [o("256GB", 849, 929, 46, 91, 176)] },
  { id: "galaxy-s24", name: "Galaxy S24", brand: "Samsung", category: "samsung", deviceId: "galaxy-s24",
    options: [o("128GB", 599, 649, 32, 64, 123)] },
  { id: "galaxy-s23-ultra", name: "Galaxy S23 Ultra", brand: "Samsung", category: "samsung", deviceId: "galaxy-s23-ultra",
    options: [o("256GB", 675, 729, 36, 72, 138), o("512GB", 699, 750, 37, 74, 142)] },
  { id: "galaxy-s23", name: "Galaxy S23", brand: "Samsung", category: "samsung", deviceId: "galaxy-s23",
    options: [o("128GB", 549, 599, 29, 59, 114)] },
  { id: "galaxy-s22-ultra", name: "Galaxy S22 Ultra", brand: "Samsung", category: "samsung", deviceId: "galaxy-s22-ultra",
    options: [o("128GB", 499, 599, 29, 59, 114), o("256GB", undefined, 649, 32, 64, 123)] },
  { id: "galaxy-s22-plus", name: "Galaxy S22+", brand: "Samsung", category: "samsung", deviceId: "galaxy-s22-plus",
    options: [o("128GB", 450, 550, 27, 54, 104)] },
  { id: "galaxy-s22", name: "Galaxy S22", brand: "Samsung", category: "samsung", deviceId: "galaxy-s22",
    options: [o(l("128GB · A grade", "128GB · Grado A"), 299, 349, 17, 34, 66), o("128GB", 349, 399, 20, 39, 76)] },
  { id: "galaxy-s21-ultra", name: "Galaxy S21 Ultra", brand: "Samsung", category: "samsung", deviceId: "galaxy-s21-ultra",
    options: [o(UNLOCKED("128GB"), 429, 529, 26, 52, 100)] },
  { id: "galaxy-s21-plus", name: "Galaxy S21+", brand: "Samsung", category: "samsung", deviceId: "galaxy-s21-plus",
    options: [o("128GB", 389, 489, 24, 48, 93)] },
  { id: "galaxy-s21", name: "Galaxy S21", brand: "Samsung", category: "samsung", deviceId: "galaxy-s21",
    options: [o("128GB · 5G", 329, 399, 20, 39, 76), o(PRE_OWNED(), 225, 275, 14, 27, 52)] },
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
  { id: "galaxy-a36", name: "Galaxy A36 5G", brand: "Samsung", category: "samsung", deviceId: "galaxy-a36",
    highlights: [
      l("6.7-inch FHD+ Super AMOLED display, 120 Hz", "Pantalla Super AMOLED FHD+ de 6.7 pulgadas, 120 Hz"),
      l("50 MP main camera and 12 MP front camera", "Cámara principal de 50 MP y cámara frontal de 12 MP"),
      l("5,000 mAh battery with 45 W Super Fast Charging (charger sold separately)", "Batería de 5,000 mAh con Carga Súper Rápida de 45 W (cargador se vende por separado)"),
      l("IP67 dust and water resistance", "Resistencia al polvo y al agua IP67"),
      l("Corning Gorilla Glass Victus+ front and back", "Corning Gorilla Glass Victus+ al frente y atrás"),
      l("6 generations of OS upgrades and 6 years of security updates", "6 generaciones de actualizaciones del sistema operativo y 6 años de actualizaciones de seguridad"),
    ],
    options: [n("128GB", 329, 349)] },
  { id: "galaxy-a35", name: "Galaxy A35 5G", brand: "Samsung", category: "samsung",
    highlights: [
      l("6.6-inch FHD+ Super AMOLED display, 120 Hz", "Pantalla Super AMOLED FHD+ de 6.6 pulgadas, 120 Hz"),
      l("50 MP main camera", "Cámara principal de 50 MP"),
      l("5,000 mAh battery (typical)", "Batería de 5,000 mAh (típica)"),
      l("IP67 dust and water resistance", "Resistencia al polvo y al agua IP67"),
      l("128 GB storage, microSD up to 1 TB", "128 GB de almacenamiento, microSD de hasta 1 TB"),
    ],
    options: [n("128GB", 299, 329)] },
  { id: "galaxy-a26", name: "Galaxy A26 5G", brand: "Samsung", category: "samsung", deviceId: "galaxy-a26",
    highlights: [
      l("6.7-inch FHD+ Super AMOLED display, up to 120 Hz", "Pantalla Super AMOLED FHD+ de 6.7 pulgadas, hasta 120 Hz"),
      l("50 MP main camera and 13 MP selfie camera", "Cámara principal de 50 MP y cámara frontal de 13 MP"),
      l("5,000 mAh battery (typical)", "Batería de 5,000 mAh (típica)"),
      l("IP67 dust and water resistance", "Resistencia al polvo y al agua IP67"),
      l("Corning Gorilla Glass Victus+ front and back", "Corning Gorilla Glass Victus+ al frente y atrás"),
      l("6 generations of OS upgrades and 6 years of security updates", "6 generaciones de actualizaciones del sistema operativo y 6 años de actualizaciones de seguridad"),
    ],
    options: [n("128GB", 279.99, 299)] },
  { id: "galaxy-a53", name: "Galaxy A53 5G", brand: "Samsung", category: "samsung", deviceId: "galaxy-a53",
    highlights: [
      l("6.5-inch FHD+ Super AMOLED display, 120 Hz", "Pantalla Super AMOLED FHD+ de 6.5 pulgadas, 120 Hz"),
      l("64 MP main camera with optical image stabilization (OIS)", "Cámara principal de 64 MP con estabilización óptica de imagen (OIS)"),
      l("5 nm Exynos 1280 octa-core processor", "Procesador octa-core Exynos 1280 de 5 nm"),
      l("5,000 mAh battery (typical)", "Batería de 5,000 mAh (típica)"),
      l("IP67 dust and water resistance", "Resistencia al polvo y al agua IP67"),
    ],
    options: [n("128GB", 359, 379)] },
  { id: "galaxy-a54", name: "Galaxy A54 5G", brand: "Samsung", category: "samsung",
    options: [n("128GB", 369, 399)] },
  { id: "galaxy-a16", name: "Galaxy A16 5G", brand: "Samsung", category: "samsung", deviceId: "galaxy-a16",
    highlights: [
      l("6.7-inch Super AMOLED display, up to 90 Hz", "Pantalla Super AMOLED de 6.7 pulgadas, hasta 90 Hz"),
      l("50 MP main camera", "Cámara principal de 50 MP"),
      l("5,000 mAh battery (typical)", "Batería de 5,000 mAh (típica)"),
      l("128 GB storage, microSD up to 1.5 TB", "128 GB de almacenamiento, microSD de hasta 1.5 TB"),
      l("IP54 dust and water resistance", "Resistencia al polvo y al agua IP54"),
    ],
    options: [n("128GB", 259, 269)] },
  { id: "galaxy-a15", name: "Galaxy A15 5G", brand: "Samsung", category: "samsung", deviceId: "galaxy-a15",
    options: [n("128GB", 229, 239)] },
  { id: "galaxy-a14", name: "Galaxy A14 5G", brand: "Samsung", category: "samsung", deviceId: "galaxy-a14",
    highlights: [
      l("6.6-inch FHD+ display with up to 90 Hz refresh rate", "Pantalla FHD+ de 6.6 pulgadas con frecuencia de hasta 90 Hz"),
      l("50 MP main camera", "Cámara principal de 50 MP"),
      l("5,000 mAh battery (typical)", "Batería de 5,000 mAh (típica)"),
      l("64 GB storage, expandable with microSD up to 1 TB", "64 GB de almacenamiento, ampliable con microSD de hasta 1 TB"),
      l("4 GB RAM", "4 GB de RAM"),
    ],
    options: [n("64GB", 199, 209)] },
  { id: "galaxy-a13", name: "Galaxy A13 5G", brand: "Samsung", category: "samsung", deviceId: "galaxy-a13",
    options: [n("64GB", 179, 189)] },
  { id: "galaxy-a03s", name: "Galaxy A03s", brand: "Samsung", category: "samsung", deviceId: "galaxy-a03s",
    options: [n(UNLOCKED("32GB"), 139, 149)] },

  // ---------- Other phones ----------
  { id: "moto-g-ace-5g", name: "Moto G Ace 5G", brand: "Motorola", category: "other-phones",
    options: [o("64GB", 159, 189, 9, 19, 36)] },
  // Motorola specs from motorola.com/us product pages and Motorola support.
  { id: "moto-g-5g-2025", name: "Moto G 5G (2025)", brand: "Motorola", category: "other-phones",
    highlights: [
      l("6.7-inch 120Hz display", "Pantalla de 6.7 pulgadas a 120 Hz"),
      l("50MP camera", "Cámara de 50 MP"),
      l("5000mAh battery with 30W TurboPower charging", "Batería de 5000 mAh con carga TurboPower de 30 W"),
      l("128GB storage, expandable up to 1TB with microSD (sold separately)", "128 GB de almacenamiento, ampliable hasta 1 TB con microSD (se vende por separado)"),
      l("MediaTek Dimensity 6300 processor with 4GB RAM", "Procesador MediaTek Dimensity 6300 con 4 GB de RAM"),
      l("Android 15", "Android 15"),
    ],
    options: [n("128GB", 220, 229)] },
  // The sheet says "Moto G Stylus 5G 128GB" without a year; the 2024 model is the newest with
  // "5G" in its name that comes in 128GB at this price (owner to confirm: box shows XT2419-1).
  { id: "moto-g-stylus-5g", name: "Moto G Stylus 5G (2024)", brand: "Motorola", category: "other-phones",
    highlights: [
      l("Built-in stylus", "Lápiz óptico integrado"),
      l("6.7-inch pOLED display with Dolby Atmos sound", "Pantalla pOLED de 6.7 pulgadas con sonido Dolby Atmos"),
      l("50MP rear camera and 32MP front camera", "Cámara trasera de 50 MP y cámara frontal de 32 MP"),
      l("5000mAh battery with 30W TurboPower charging", "Batería de 5000 mAh con carga TurboPower de 30 W"),
      l("8GB RAM and 128GB storage", "8 GB de RAM y 128 GB de almacenamiento"),
      l("5G connectivity", "Conectividad 5G"),
    ],
    options: [n("128GB", 229, 249)] },

  // ---------- Apple Watch ----------
  // Specs from Apple's tech-spec pages (support.apple.com/en-us/125095, 111832, 125094).
  { id: "apple-watch-ultra-3", name: "Apple Watch Ultra 3", brand: "Apple", category: "watches",
    highlights: [
      l("49mm Grade 5 titanium case in Natural or Black", "Caja de titanio grado 5 de 49 mm en natural o negro"),
      l("S10 chip with 64GB capacity", "Chip S10 con 64 GB de capacidad"),
      l("Wide-angle OLED Always-On display (LTPO3), up to 3000 nits", "Pantalla OLED de gran angular siempre activa (LTPO3), hasta 3000 nits"),
      l("Up to 42 hours of battery life (72 hours in Low Power Mode)", "Hasta 42 horas de batería (72 horas en modo de bajo consumo)"),
      l("5G cellular plus satellite Emergency SOS, Messages and Find My", "5G celular y conexión satelital para Emergencia SOS, Mensajes y Encontrar"),
      l("Water resistant to 100m; recreational diving to 40m", "Resistente al agua hasta 100 m; buceo recreativo hasta 40 m"),
    ],
    options: [n("49mm · GPS + Cellular", 750, 899)] },
  { id: "apple-watch-ultra-2", name: "Apple Watch Ultra 2", brand: "Apple", category: "watches",
    highlights: [
      l("49mm Grade 5 titanium case in Natural or Black", "Caja de titanio grado 5 de 49 mm en natural o negro"),
      l("S9 SiP chip with 64GB capacity", "Chip S9 SiP con 64 GB de capacidad"),
      l("Flat sapphire crystal display, up to 3000 nits", "Pantalla plana de cristal de zafiro, hasta 3000 nits"),
      l("Up to 36 hours of battery life (72 hours in Low Power Mode)", "Hasta 36 horas de batería (72 horas en modo de bajo consumo)"),
      l("Water resistant to 100m; EN13319 recreational diving to 40m", "Resistente al agua hasta 100 m; buceo recreativo EN13319 hasta 40 m"),
      l("Precision dual-frequency GPS and customizable Action button", "GPS de doble frecuencia de precisión y botón de Acción personalizable"),
    ],
    options: [o("49mm · GPS + Cellular", undefined, 649, 32, 64, 123)] },
  { id: "apple-watch-series-12", name: "Apple Watch Series 12", brand: "Apple", category: "watches",
    options: [o("42mm · GPS + Cellular", 499, 549, 27, 54, 104), o("46mm · GPS + Cellular", 550, 599, 29, 59, 114)] },
  { id: "apple-watch-series-11", name: "Apple Watch Series 11", brand: "Apple", category: "watches",
    options: [o("42mm · GPS + Cellular", 479, 529, 26, 52, 100), o("46mm · GPS + Cellular", 549, 579, 28, 57, 110)] },
  // The 3rd generation replaces the SE 40mm GPS and SE (2nd generation) rows; same page address.
  { id: "apple-watch-se", name: "Apple Watch SE 3", brand: "Apple", category: "watches",
    highlights: [
      l("40mm or 44mm aluminum case in Midnight or Starlight", "Caja de aluminio de 40 mm o 44 mm en color medianoche o blanco estelar"),
      l("S10 chip with 64GB capacity", "Chip S10 con 64 GB de capacidad"),
      l("Always-On Retina display, up to 1000 nits", "Pantalla Retina siempre activa, hasta 1000 nits"),
      l("Up to 18 hours of battery life (32 hours in Low Power Mode)", "Hasta 18 horas de batería (32 horas en modo de bajo consumo)"),
      l("Fast charge: up to 80% in about 45 minutes", "Carga rápida: hasta 80 % en unos 45 minutos"),
      l("5G (RedCap) and LTE on cellular models; water resistant to 50m", "5G (RedCap) y LTE en modelos celulares; resistente al agua hasta 50 m"),
    ],
    options: [n("40mm · GPS + Cellular", 349, 379), n("44mm · GPS + Cellular", 379, 399)] },
  // Galaxy watch specs from samsung.com/us and Samsung's US newsroom (Watch4 Classic launch).
  { id: "galaxy-watch8-classic", name: "Galaxy Watch8 Classic", brand: "Samsung", category: "watches",
    highlights: [
      l("Physical rotating bezel and customizable Quick Button", "Bisel giratorio físico y Botón Rápido personalizable"),
      l("Brighter display up to 3,000 nits", "Pantalla más brillante de hasta 3,000 nits"),
      l("445mAh battery, up to 30 hours with Always On Display", "Batería de 445 mAh, hasta 30 horas con pantalla siempre activa"),
      l("64GB of storage", "64 GB de almacenamiento"),
      l("Antioxidant Index and sleep apnea detection", "Índice antioxidante y detección de apnea del sueño"),
      l("Google Gemini assistant with One UI 8 Watch", "Asistente Google Gemini con One UI 8 Watch"),
    ],
    options: [n("46mm", 450, 550)] },
  { id: "galaxy-watch4-classic", name: "Galaxy Watch4 Classic", brand: "Samsung", category: "watches",
    highlights: [
      l('1.2" Super AMOLED display (396×396), always-on', 'Pantalla Super AMOLED de 1.2" (396×396), siempre activa'),
      l("Stainless steel case with rotating bezel", "Caja de acero inoxidable con bisel giratorio"),
      l("BioActive Sensor with body composition measurement", "Sensor BioActive con medición de composición corporal"),
      l("5ATM + IP68 and MIL-STD-810G durability", "Resistencia 5ATM + IP68 y MIL-STD-810G"),
      l("1.5GB RAM + 16GB storage", "1.5 GB de RAM + 16 GB de almacenamiento"),
      l("Up to 40 hours of battery life", "Hasta 40 horas de batería"),
    ],
    options: [n("42mm", 175, 199)] },

  // ---------- iPad ----------
  { id: "ipad-pro-11-m2", name: 'iPad Pro 11" (4th generation, M2)', brand: "Apple", category: "ipads", deviceId: "ipad-pro-m2",
    options: [o("256GB", 600, 650, 32, 64, 123)] },
  { id: "ipad-11", name: "iPad (11th generation)", brand: "Apple", category: "ipads", deviceId: "ipad-11",
    // New sheet: the 128GB Wi-Fi + Cellular row has no prices; Wi-Fi 128GB and Cellular 256GB do.
    options: [o("128GB · Wi-Fi", 549, 599, 29, 59, 114), o("256GB · Wi-Fi + Cellular", 699, 749, 37, 74, 142)] },
  { id: "ipad-mini-6", name: "iPad mini (6th generation)", brand: "Apple", category: "ipads",
    options: [o("64GB · Wi-Fi + Cellular", 349, 399, 20, 39, 76)] },
  { id: "ipad-mini-5", name: "iPad mini (5th generation)", brand: "Apple", category: "ipads", deviceId: "ipad-mini-5",
    options: [o("64GB · Wi-Fi + Cellular", 235, 265, 13, 26, 50), o("256GB · Wi-Fi + Cellular", 249, 280, 14, 27, 53)] },
  { id: "ipad-9", name: "iPad (9th generation)", brand: "Apple", category: "ipads",
    options: [o("64GB · Wi-Fi + Cellular", 275, 299, 15, 29, 57)] },
  { id: "ipad-8", name: "iPad (8th generation)", brand: "Apple", category: "ipads",
    options: [o("128GB · Wi-Fi + Cellular", 249, 279, 14, 27, 53)] },
  { id: "ipad-6", name: "iPad (6th generation)", brand: "Apple", category: "ipads",
    options: [
      o(l("32GB · Wi-Fi · A/B grade", "32GB · Wi-Fi · Grado A/B"), 165, 175, 9, 17, 33),
      o(l("128GB · Wi-Fi + Cellular · A/B grade", "128GB · Wi-Fi + Cellular · Grado A/B"), 190, 195, 10, 19, 37),
    ] },

  // Galaxy tablets (not iPads, so no Payvantage / In-House Leasing).
  { id: "galaxy-tab-a9-plus", name: "Galaxy Tab A9+ 5G", brand: "Samsung", category: "ipads",
    highlights: [
      l("11-inch WUXGA (1920 x 1200) display, up to 90 Hz", "Pantalla WUXGA (1920 x 1200) de 11 pulgadas, hasta 90 Hz"),
      l("5G (Sub-6) cellular plus Wi-Fi", "Conectividad celular 5G (Sub-6) y Wi-Fi"),
      l("Quad speakers with Dolby Atmos", "Cuatro bocinas con Dolby Atmos"),
      l("7,040 mAh battery (typical)", "Batería de 7,040 mAh (típica)"),
      l("microSD expansion up to 1 TB", "Ampliable con microSD de hasta 1 TB"),
      l("Slim 6.9 mm design", "Diseño delgado de 6.9 mm"),
    ],
    options: [n("Wi-Fi + Cellular (5G)", 249, 269)] },
  // The sheet says "Tab A 8.0 Wifi + Cell (pre-owned)": the 2019 LTE model (SM-T295/T297).
  { id: "galaxy-tab-a8", name: "Galaxy Tab A 8.0 (2019)", brand: "Samsung", category: "ipads",
    highlights: [
      l("8.0-inch WXGA (1280 x 800) display", "Pantalla WXGA (1280 x 800) de 8.0 pulgadas"),
      l("4G LTE cellular connectivity", "Conectividad celular 4G LTE"),
      l("32 GB storage, microSD up to 512 GB", "32 GB de almacenamiento, microSD de hasta 512 GB"),
      l("5,100 mAh battery (typical)", "Batería de 5,100 mAh (típica)"),
      l("Lightweight at 347 g", "Ligera, con solo 347 g"),
      l("8 MP rear and 2 MP front cameras", "Cámara trasera de 8 MP y frontal de 2 MP"),
    ],
    options: [n(PRE_OWNED("Wi-Fi + Cellular"), 75, 75)] },

  // ---------- MacBook ----------
  { id: "macbook-air-13-m5", name: 'MacBook Air 13" (M5)', brand: "Apple", category: "macbooks",
    options: [o("16GB RAM · 512GB", 1450, 1499, 74, 147, 285)] },
  { id: "macbook-air-15-m5", name: 'MacBook Air 15" (M5)', brand: "Apple", category: "macbooks",
    options: [o("16GB RAM · 512GB", 1499, 1549, 76, 152, 294)] },
  { id: "macbook-air-13-m4", name: 'MacBook Air 13" (M4)', brand: "Apple", category: "macbooks",
    options: [o("16GB RAM · 256GB", 1050, 1150, 56, 113, 218)] },
  { id: "macbook-neo-13", name: 'MacBook Neo 13"', brand: "Apple", category: "macbooks",
    options: [o("8GB RAM · 256GB", 799, 899, 44, 88, 171), o("8GB RAM · 512GB", 899, 999, 49, 98, 190)] },

  // ---------- Laptops ----------
  // Only specs the maker confirms for these models (Dell: dell.com DC15250 page; HP: its
  // 14-dq6xxx service guide and store listing). Processor and RAM vary by configuration.
  { id: "dell-15-dc15250", name: "Dell 15 Laptop", brand: "Dell", category: "laptops",
    note: l("Model DC15250 · Touchscreen", "Modelo DC15250 · Pantalla táctil"),
    highlights: [
      l("15.6-inch Full HD (1920x1080) touchscreen", "Pantalla táctil Full HD (1920x1080) de 15.6 pulgadas"),
      l("512GB M.2 PCIe NVMe SSD", "SSD M.2 PCIe NVMe de 512 GB"),
      l("Intel Core processor", "Procesador Intel Core"),
      l("DDR5 memory", "Memoria DDR5"),
      l("Windows 11 Home", "Windows 11 Home"),
      l("Carbon Black finish", "Acabado Carbon Black"),
    ],
    options: [n(l("512GB SSD · Touchscreen", "SSD de 512 GB · Pantalla táctil"), 579.99, 599.99)] },
  { id: "hp-laptop-14", name: "HP Laptop 14", brand: "HP", category: "laptops",
    note: l("Model 14-dq6103ds", "Modelo 14-dq6103ds"),
    highlights: [
      l("Intel Processor N150", "Procesador Intel N150"),
      l("128GB UFS storage", "Almacenamiento UFS de 128 GB"),
      l("14-inch HD (1366x768) anti-glare display, 250 nits", "Pantalla HD (1366x768) antirreflejo de 14 pulgadas, 250 nits"),
      l("Wi-Fi 6 and Bluetooth 5.4", "Wi-Fi 6 y Bluetooth 5.4"),
      l("Windows 11", "Windows 11"),
    ],
    options: [n("128GB", 479, 479)] },

  // ---------- Game consoles ----------
  { id: "playstation-5-pro", name: "PlayStation 5 Pro", brand: "Sony", category: "consoles",
    options: [o(l("Digital Edition · 2TB", "Edición Digital · 2TB"), 1599, 1649, 81, 162, 313)] },
  { id: "playstation-5", name: "PlayStation 5", brand: "Sony", category: "consoles",
    options: [
      o(l("Disc + Digital", "Disco + Digital"), 799, 899, 44, 88, 171),
      o(l("Digital Edition", "Edición Digital"), 750, 850, 42, 83, 161),
    ] },
  { id: "xbox-series-x", name: "Xbox Series X", brand: "Microsoft", category: "consoles",
    options: [o("1TB", 799, 899, 44, 88, 171)] },
  { id: "nintendo-switch-2", name: "Nintendo Switch 2", brand: "Nintendo", category: "consoles",
    options: [o(l("Console", "Consola"), 650, 750, 37, 74, 142)] },
  { id: "playstation-portal", name: "PlayStation Portal", brand: "Sony", category: "consoles",
    options: [o(l("Remote player", "Reproductor remoto"), 300, 450, 22, 44, 85)] },

  // ---------- TVs ----------
  // From samsung.com/us (un65u8000hfxza), checked 2026-11-10.
  { id: "samsung-tv-65", name: 'Samsung 65" Crystal UHD U8000H', brand: "Samsung", category: "tv",
    note: l("4K Smart TV · Model UN65U8000HFXZA", "Smart TV 4K · Modelo UN65U8000HFXZA"),
    highlights: [
      l('65" class 4K Crystal UHD screen (64.5" diagonal)', 'Pantalla 4K Crystal UHD clase 65" (64.5" en diagonal)'),
      l("Crystal Processor 4K with 4K upscaling", "Procesador Crystal 4K con escalado a 4K"),
      l("PurColor, HDR and Color Booster", "PurColor, HDR y Color Booster"),
      l("Motion Xcelerator for smoother sports and games", "Motion Xcelerator para deportes y juegos más fluidos"),
      l("Samsung Gaming Hub and Samsung TV Plus free channels", "Samsung Gaming Hub y canales gratis de Samsung TV Plus"),
      l("One UI Tizen smart TV, secured by Samsung Knox", "Smart TV One UI Tizen, protegida con Samsung Knox"),
      l("3 HDMI ports (one eARC), USB, Wi-Fi and Ethernet", "3 puertos HDMI (uno eARC), USB, Wi-Fi y Ethernet"),
      l('56.9" × 32.7" without stand · 56.9" × 34.7" with stand', '56.9" × 32.7" sin base · 56.9" × 34.7" con base'),
    ],
    options: [o('65" · UN65U8000HFXZA', 449, 479, 24, 47, 91)] },

  // ---------- Headphones & speakers ----------
  // Apple specs from support.apple.com/en-us/125135 (Pro 3), 121203/121204 (AirPods 4), 121205 (Max).
  { id: "airpods-pro-3", name: "AirPods Pro 3", brand: "Apple", category: "audio",
    highlights: [
      l("Active Noise Cancellation with Adaptive Audio and Transparency mode", "Cancelación Activa de Ruido con Audio Adaptativo y modo Ambiente"),
      l("Heart rate sensor for workouts", "Sensor de frecuencia cardiaca para entrenamientos"),
      l("Up to 8 hours of listening with ANC (up to 24 hours with case)", "Hasta 8 horas de audio con ANC (hasta 24 horas con el estuche)"),
      l("IP57 dust, sweat and water resistance", "Resistencia al polvo, sudor y agua IP57"),
      l("Apple H2 chip; MagSafe Charging Case (USB-C) with speaker", "Chip Apple H2; estuche de carga MagSafe (USB-C) con bocina"),
      l("Hearing Test, Hearing Aid and Live Translation features", "Funciones de Prueba de Audición, Audífono y Traducción en Vivo"),
    ],
    options: [n(l("MagSafe Charging Case (USB-C)", "Estuche de carga MagSafe (USB-C)"), 249, 289)] },
  { id: "airpods-4", name: "AirPods 4", brand: "Apple", category: "audio",
    highlights: [
      l("H2 headphone chip", "Chip para audífonos H2"),
      l("Personalized Spatial Audio with dynamic head tracking", "Audio Espacial Personalizado con seguimiento dinámico de la cabeza"),
      l("Up to 30 hours of listening time with charging case", "Hasta 30 horas de audio con el estuche de carga"),
      l("IP54 dust, sweat and water resistance", "Resistencia al polvo, sudor y agua IP54"),
      l("USB-C charging case; ANC model adds wireless charging and a Find My speaker", "Estuche de carga USB-C; el modelo con ANC agrega carga inalámbrica y bocina para Encontrar"),
      l("ANC model: Active Noise Cancellation, Adaptive Audio and Transparency mode", "Modelo con ANC: Cancelación Activa de Ruido, Audio Adaptativo y modo Ambiente"),
    ],
    options: [
      n(l("AirPods 4", "AirPods 4"), 159, 179),
      n(l("With Active Noise Cancellation", "Con Cancelación Activa de Ruido"), 209, 229),
    ] },
  { id: "airpods-max", name: "AirPods Max", brand: "Apple", category: "audio",
    highlights: [
      l("Available in Midnight, Starlight, Blue, Purple and Orange", "Disponible en medianoche, blanco estelar, azul, morado y naranja"),
      l("Active Noise Cancellation and Transparency mode", "Cancelación Activa de Ruido y modo Ambiente"),
      l("Up to 20 hours of listening time with ANC", "Hasta 20 horas de audio con ANC"),
      l("USB-C charging, with Lossless Audio via USB-C", "Carga por USB-C, con audio sin pérdida mediante USB-C"),
      l("Apple H1 chip in each ear cup; nine microphones", "Chip Apple H1 en cada copa; nueve micrófonos"),
      l("Digital Crown for volume and playback control", "Corona Digital para controlar volumen y reproducción"),
    ],
    options: [n("USB-C", 550, 599)] },
  // Galaxy Buds specs from samsung.com/us and Samsung's US newsroom; JBL from JBL's newsroom.
  { id: "galaxy-buds4-pro", name: "Galaxy Buds4 Pro", brand: "Samsung", category: "audio",
    highlights: [
      l("Adaptive ANC 2.0 with real-time processing", "ANC adaptativa 2.0 con procesamiento en tiempo real"),
      l("New wider woofer plus planar tweeter, each with its own amplifier", "Nuevo woofer más amplio y tweeter planar, cada uno con su propio amplificador"),
      l("Hi-Res audio up to 24-bit/96kHz on compatible Galaxy devices", "Audio de alta resolución hasta 24 bits/96 kHz en dispositivos Galaxy compatibles"),
      l("IP57 dust and water resistance (earbuds only)", "Resistencia al polvo y al agua IP57 (solo auriculares)"),
      l("Canal-fit blade design with metal finish and transparent clamshell case", "Diseño intrauricular tipo blade con acabado metálico y estuche transparente tipo concha"),
    ],
    options: [n(l("With charging case", "Con estuche de carga"), 249.99, 279.99)] },
  { id: "galaxy-buds2-pro", name: "Galaxy Buds2 Pro", brand: "Samsung", category: "audio",
    highlights: [
      l("24-bit Hi-Fi sound (Galaxy devices, One UI 4.0+)", "Sonido Hi-Fi de 24 bits (dispositivos Galaxy, One UI 4.0+)"),
      l("Custom coaxial 2-way speaker (tweeter + woofer)", "Bocina coaxial personalizada de 2 vías (tweeter + woofer)"),
      l("Active Noise Cancellation with 3 high-SNR microphones", "Cancelación activa de ruido con 3 micrófonos de alta SNR"),
      l("IPX7 water resistance (earbuds)", "Resistencia al agua IPX7 (auriculares)"),
      l("Up to 8 hours (29 with case) ANC off; 5 hours (18 with case) ANC on", "Hasta 8 horas (29 con estuche) sin ANC; 5 horas (18 con estuche) con ANC"),
    ],
    options: [n(l("With charging case", "Con estuche de carga"), 179, 199)] },
  { id: "galaxy-buds-fe", name: "Galaxy Buds FE", brand: "Samsung", category: "audio",
    highlights: [
      l("Active Noise Cancellation and Ambient Sound", "Cancelación activa de ruido y Sonido Ambiente"),
      l("Up to 8.5 hours of playback (30 hours with case), ANC off", "Hasta 8.5 horas de reproducción (30 horas con estuche), sin ANC"),
      l("Up to 6 hours with ANC on (21 hours with case)", "Hasta 6 horas con ANC (21 horas con estuche)"),
      l("Three-microphone system for clearer calls", "Sistema de tres micrófonos para llamadas más claras"),
      l("IPX2 splash resistance", "Resistencia a salpicaduras IPX2"),
    ],
    options: [n(l("With charging case", "Con estuche de carga"), 99.99, 120)] },
  { id: "jbl-boombox-3", name: "JBL Boombox 3", brand: "JBL", category: "audio",
    highlights: [
      l("3-way speaker system: racetrack subwoofer, two mid-range drivers, two tweeters", "Sistema de 3 vías: subwoofer ovalado, dos medios y dos tweeters"),
      l("Up to 24 hours of playtime", "Hasta 24 horas de reproducción"),
      l("IP67 waterproof and dustproof", "Resistente al agua y al polvo IP67"),
      l("Built-in power bank to charge your devices", "Batería externa integrada para cargar tus dispositivos"),
      l("JBL PartyBoost multi-speaker pairing", "Conexión de varias bocinas con JBL PartyBoost"),
    ],
    options: [n(l("Portable speaker", "Bocina portátil"), 399.99, 449.99)] },
  { id: "jbl-charge-6", name: "JBL Charge 6", brand: "JBL", category: "audio",
    highlights: [
      l("Up to 28 hours of playtime with Playtime Boost", "Hasta 28 horas de reproducción con Playtime Boost"),
      l("IP68 waterproof, dustproof and drop-proof", "Resistente al agua, al polvo y a caídas (IP68)"),
      l("AI Sound Boost with upgraded woofer for deeper bass", "AI Sound Boost con woofer mejorado para graves más profundos"),
      l("Built-in USB-C power bank", "Batería externa USB-C integrada"),
      l("Detachable carrying strap", "Correa de transporte desmontable"),
      l("Bluetooth 5.4 and Auracast multi-speaker connection", "Bluetooth 5.4 y conexión de varias bocinas con Auracast"),
    ],
    options: [n(l("Portable speaker", "Bocina portátil"), 199.99, 219)] },
  { id: "jbl-flip-7", name: "JBL Flip 7", brand: "JBL", category: "audio",
    highlights: [
      l("Up to 16 hours of playtime with Playtime Boost", "Hasta 16 horas de reproducción con Playtime Boost"),
      l("IP68 waterproof, dustproof and drop-proof", "Resistente al agua, al polvo y a caídas (IP68)"),
      l("AI Sound Boost for powerful bass without distortion", "AI Sound Boost para graves potentes sin distorsión"),
      l("Bluetooth 5.4 and Auracast multi-speaker connection", "Bluetooth 5.4 y conexión de varias bocinas con Auracast"),
      l("Lossless high-resolution audio over USB-C", "Audio de alta resolución sin pérdida por USB-C"),
      l("PushLock system with interchangeable carrying accessories", "Sistema PushLock con accesorios de transporte intercambiables"),
    ],
    options: [n(l("Portable speaker", "Bocina portátil"), 159.99, 179.99)] },
];

/**
 * Payvantage and In-House Leasing are only for iPhones, Samsung Galaxy phones and the cellular
 * versions of iPads (owner's rule). Other devices show the other three partners only.
 */
export function phoneLeasingOnly(device: LeaseDevice, option: LeaseOption) {
  if (device.category === "iphone" || device.category === "samsung") return true;
  return device.category === "ipads" && device.brand === "Apple" && /cellular/i.test(option.label.en);
}

/** Lease partners that only apply to phones and cellular iPads (see phoneLeasingOnly). */
export const PHONE_ONLY_PORTALS = ["payvantage"];

/** The lease page for a retired /devices/<id> page (by its shared deviceId), for redirects. */
export const leaseIdForDevice = (deviceId: string) =>
  LEASE_DEVICES.find((d) => d.deviceId === deviceId || d.id === deviceId)?.id;

export const findLeaseDevice = (id: string) => LEASE_DEVICES.find((d) => d.id === id);

export type Frequency = "weekly" | "biweekly" | "monthly";
export const FREQUENCIES: Frequency[] = ["weekly", "biweekly", "monthly"];

/** Estimated payment for one option on one schedule (the sheet's, or its formula's). */
export const payment = (o: LeaseOption, f: Frequency) => o[f];

/** The option with the lowest leasing price ("from" prices on cards and tiles). */
export function cheapestOption(d: LeaseDevice) {
  return d.options.reduce((a, b) => (b.lease < a.lease ? b : a));
}

/** The lowest leasing price, with that same option's estimated payments. */
export function leaseFrom(d: LeaseDevice) {
  const o = cheapestOption(d);
  return { lease: o.lease, weekly: payment(o, "weekly"), option: o };
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
