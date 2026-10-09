import { useSyncExternalStore } from "react";

import { readTrackedEvents } from "@/admin/tracker";
import type {
  AdminData,
  Employee,
  MovementReason,
  PayrollLine,
  PayrollStatus,
  Product,
  Settings,
  TimeEntry,
} from "@/admin/types";

// Local-mode data store: everything lives in this browser's localStorage. Screens only use
// the hook and actions below, so this module is the one place to swap for a database
// (see supabase/migrations and docs/admin.md).

const KEY = "tic-admin-v1";

const uid = () => crypto.randomUUID();
const nowIso = () => new Date().toISOString();

export async function hashSecret(secret: string) {
  const bytes = new TextEncoder().encode(`tic:${secret}`);
  const digest = await crypto.subtle.digest("SHA-256", bytes);
  return [...new Uint8Array(digest)].map((b) => b.toString(16).padStart(2, "0")).join("");
}

const DEFAULT_SETTINGS: Settings = {
  storeName: "TIC Wireless",
  passcodeHash: null,
  overtimeThreshold: 40,
  overtimeMultiplier: 1.5,
  payPeriod: "biweekly",
  demo: false,
};

function empty(): AdminData {
  return {
    version: 1,
    products: [],
    movements: [],
    employees: [],
    timeEntries: [],
    payrollRuns: [],
    events: [],
    settings: { ...DEFAULT_SETTINGS },
  };
}

let cache: AdminData | null = null;
const listeners = new Set<() => void>();

function load(): AdminData {
  if (cache) return cache;
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) return (cache = { ...empty(), ...(JSON.parse(raw) as AdminData) });
  } catch {
    // Unreadable or blocked storage: fall through to fresh sample data.
  }
  // First visit: start with sample data so every screen has something to show.
  cache = seedDemo(empty());
  try {
    localStorage.setItem(KEY, JSON.stringify(cache));
  } catch {
    // Blocked storage: the dashboard still works in memory for this session.
  }
  return cache;
}

function commit(next: AdminData) {
  cache = next;
  try {
    localStorage.setItem(KEY, JSON.stringify(next));
  } catch {
    // Storage full or blocked: keep working in memory for this session.
  }
  listeners.forEach((l) => l());
}

function update(fn: (draft: AdminData) => void) {
  const draft = structuredClone(load());
  fn(draft);
  commit(draft);
}

const subscribe = (l: () => void) => {
  listeners.add(l);
  const onStorage = (e: StorageEvent) => {
    if (e.key === KEY) {
      cache = null;
      l();
    }
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(l);
    window.removeEventListener("storage", onStorage);
  };
};

const serverSnapshot = empty();

export function useAdminData() {
  return useSyncExternalStore(subscribe, load, () => serverSnapshot);
}

/** Sample events plus real visits tracked in this browser by the public-site tracker. */
export function useAnalyticsEvents() {
  const data = useAdminData();
  return [...data.events, ...readTrackedEvents()];
}

// ---------- Inventory ----------

export type ProductInput = Omit<Product, "id" | "updatedAt" | "syncStatus"> & {
  syncStatus?: Product["syncStatus"];
};

export const inventory = {
  save(input: ProductInput & { id?: string }, by: string) {
    update((d) => {
      const existing = input.id ? d.products.find((p) => p.id === input.id) : undefined;
      if (existing) {
        const delta = input.quantity - existing.quantity;
        Object.assign(existing, input, {
          updatedAt: nowIso(),
          syncStatus: existing.shopifyVariantId ? "pending" : existing.syncStatus,
        });
        if (delta !== 0)
          d.movements.unshift({
            id: uid(),
            productId: existing.id,
            delta,
            reason: "Adjusted",
            note: "Edited product",
            by,
            at: nowIso(),
          });
      } else {
        const id = uid();
        d.products.unshift({
          ...input,
          id,
          syncStatus: input.syncStatus ?? "unlinked",
          updatedAt: nowIso(),
        });
        if (input.quantity)
          d.movements.unshift({
            id: uid(),
            productId: id,
            delta: input.quantity,
            reason: "Received",
            note: "Initial stock",
            by,
            at: nowIso(),
          });
      }
    });
  },
  adjust(productId: string, delta: number, reason: MovementReason, note: string, by: string) {
    update((d) => {
      const p = d.products.find((x) => x.id === productId);
      if (!p || delta === 0) return;
      p.quantity = Math.max(0, p.quantity + delta);
      p.updatedAt = nowIso();
      if (p.shopifyVariantId && reason !== "Shopify sync") p.syncStatus = "pending";
      d.movements.unshift({ id: uid(), productId, delta, reason, note, by, at: nowIso() });
    });
  },
  remove(ids: string[]) {
    update((d) => {
      d.products = d.products.filter((p) => !ids.includes(p.id));
    });
  },
  /** Apply Shopify product data: link by SKU, create missing products, take Shopify's quantity. */
  mergeShopify(
    rows: {
      sku: string;
      name: string;
      brand: string;
      price: number;
      quantity: number;
      productId: string;
      variantId: string;
      inventoryItemId: string;
    }[],
  ) {
    let linked = 0;
    let created = 0;
    update((d) => {
      for (const r of rows) {
        const p = r.sku ? d.products.find((x) => x.sku === r.sku) : undefined;
        if (p) {
          const delta = r.quantity - p.quantity;
          Object.assign(p, {
            shopifyProductId: r.productId,
            shopifyVariantId: r.variantId,
            shopifyInventoryItemId: r.inventoryItemId,
            quantity: r.quantity,
            syncStatus: "synced",
            updatedAt: nowIso(),
          });
          if (delta)
            d.movements.unshift({
              id: uid(),
              productId: p.id,
              delta,
              reason: "Shopify sync",
              note: "Imported from Shopify",
              by: "Shopify",
              at: nowIso(),
            });
          linked++;
        } else {
          d.products.unshift({
            id: uid(),
            sku: r.sku || `SHOP-${r.variantId.split("/").pop()}`,
            name: r.name,
            brand: r.brand,
            category: "Accessories",
            condition: "New",
            location: "Back stock",
            cost: 0,
            price: r.price,
            quantity: r.quantity,
            reorderPoint: 2,
            barcode: "",
            notes: "Imported from Shopify",
            financeable: false,
            shopifyProductId: r.productId,
            shopifyVariantId: r.variantId,
            shopifyInventoryItemId: r.inventoryItemId,
            syncStatus: "synced",
            updatedAt: nowIso(),
          });
          created++;
        }
      }
    });
    return { linked, created };
  },
  markSynced(ids: string[], status: Product["syncStatus"]) {
    update((d) => {
      for (const p of d.products) if (ids.includes(p.id)) p.syncStatus = status;
    });
  },
};

// ---------- Employees & time clock ----------

export type EmployeeInput = Omit<Employee, "id" | "pinHash"> & { pin?: string };

export const staff = {
  async save(input: EmployeeInput & { id?: string }) {
    const pinHash = input.pin ? await hashSecret(input.pin) : undefined;
    const { pin: _pin, ...rest } = input;
    update((d) => {
      const existing = input.id ? d.employees.find((e) => e.id === input.id) : undefined;
      if (existing) Object.assign(existing, rest, pinHash ? { pinHash } : {});
      else d.employees.push({ ...rest, id: uid(), pinHash: pinHash ?? "" });
    });
  },
  setActive(id: string, active: boolean) {
    update((d) => {
      const e = d.employees.find((x) => x.id === id);
      if (e) e.active = active;
    });
  },
  /** Find the active employee whose PIN matches. */
  async byPin(pin: string) {
    const h = await hashSecret(pin);
    return load().employees.find((e) => e.active && e.pinHash === h) ?? null;
  },
  openEntry(employeeId: string) {
    return load().timeEntries.find((t) => t.employeeId === employeeId && !t.clockOut) ?? null;
  },
  clockIn(employeeId: string) {
    update((d) => {
      if (d.timeEntries.some((t) => t.employeeId === employeeId && !t.clockOut)) return;
      d.timeEntries.unshift({
        id: uid(),
        employeeId,
        clockIn: nowIso(),
        clockOut: null,
        breakMinutes: 0,
        note: "",
        editedBy: null,
      });
    });
  },
  clockOut(employeeId: string, breakMinutes: number) {
    update((d) => {
      const t = d.timeEntries.find((x) => x.employeeId === employeeId && !x.clockOut);
      if (t) {
        t.clockOut = nowIso();
        t.breakMinutes = breakMinutes;
      }
    });
  },
  saveEntry(entry: Omit<TimeEntry, "id"> & { id?: string }, by: string) {
    update((d) => {
      const existing = entry.id ? d.timeEntries.find((t) => t.id === entry.id) : undefined;
      if (existing) Object.assign(existing, entry, { editedBy: by });
      else d.timeEntries.unshift({ ...entry, id: uid(), editedBy: by });
    });
  },
  removeEntry(id: string) {
    update((d) => {
      d.timeEntries = d.timeEntries.filter((t) => t.id !== id);
    });
  },
};

// ---------- Payroll ----------

export const payroll = {
  create(periodStart: Date, periodEnd: Date, lines: PayrollLine[]) {
    const id = uid();
    update((d) => {
      d.payrollRuns.unshift({
        id,
        periodStart: periodStart.toISOString(),
        periodEnd: periodEnd.toISOString(),
        status: "draft",
        lines,
        createdAt: nowIso(),
        approvedAt: null,
        paidAt: null,
      });
    });
    return id;
  },
  setStatus(id: string, status: PayrollStatus) {
    update((d) => {
      const r = d.payrollRuns.find((x) => x.id === id);
      if (!r) return;
      r.status = status;
      if (status === "approved") r.approvedAt = nowIso();
      if (status === "paid") r.paidAt = nowIso();
    });
  },
  remove(id: string) {
    update((d) => {
      d.payrollRuns = d.payrollRuns.filter((r) => r.id !== id);
    });
  },
};

// ---------- Settings & data management ----------

export const settings = {
  save(patch: Partial<Settings>) {
    update((d) => {
      Object.assign(d.settings, patch);
    });
  },
  async setPasscode(passcode: string | null) {
    const passcodeHash = passcode ? await hashSecret(passcode) : null;
    update((d) => {
      d.settings.passcodeHash = passcodeHash;
    });
  },
  async checkPasscode(passcode: string) {
    return (await hashSecret(passcode)) === load().settings.passcodeHash;
  },
  /** Remove all sample records and start clean (keeps passcode and payroll rules). */
  clearDemo() {
    const s = load().settings;
    commit({ ...empty(), settings: { ...s, demo: false } });
  },
  loadDemo() {
    const s = load().settings;
    commit(seedDemo({ ...empty(), settings: { ...s } }));
  },
  exportJson() {
    return JSON.stringify(load(), null, 2);
  },
  importJson(json: string) {
    const parsed = JSON.parse(json) as AdminData;
    if (parsed.version !== 1 || !Array.isArray(parsed.products))
      throw new Error("Not a TIC export");
    commit({ ...empty(), ...parsed });
  },
};

// ---------- Sample data ----------

// Sample PINs: 1234, 2468, 1357, 8080 (hashed with hashSecret).
const SAMPLE_STAFF: [string, Employee["role"], number, string, string][] = [
  [
    "Sample Manager",
    "Manager",
    2200,
    "#3987e5",
    "3383e4f2054341305f1f22ecd4caf64d7cd92a0df52f25278e3e1461a805ec2b",
  ],
  [
    "Sample Technician",
    "Repair technician",
    2000,
    "#d95926",
    "495902de9fc63622ae419115ec56b5bb4e801e96f06be75e2415cc586e181869",
  ],
  [
    "Sample Associate",
    "Sales associate",
    1500,
    "#199e70",
    "5eeae2e7c9e7edd523f62a85f68dc738393c5dcb1df41e4b519c59a1ff9c6776",
  ],
  [
    "Sample Cashier",
    "Cashier",
    1400,
    "#9085e9",
    "23429f69bf8944188baa948a3cb90cb58b0aacc2ffc26b510c93f249a0cea3c2",
  ],
];

// Products seen in the store's own photos; prices and quantities are placeholders.
const SAMPLE_PRODUCTS: [
  string,
  string,
  Product["category"],
  number,
  number,
  number,
  number,
  Product["location"],
  boolean,
][] = [
  [
    "iPhone 17 Pro 256GB Cosmic Orange",
    "Apple",
    "Phones",
    99900,
    112900,
    4,
    2,
    "Display case",
    true,
  ],
  ["iPhone 17 Pro 256GB Deep Blue", "Apple", "Phones", 99900, 112900, 2, 2, "Display case", true],
  ["iPhone 15 Pro 128GB", "Apple", "Phones", 64900, 74900, 3, 2, "Display case", true],
  ["Galaxy S24 Ultra 256GB", "Samsung", "Phones", 84900, 99900, 3, 2, "Display case", true],
  [
    "Galaxy S22 Ultra 128GB (Refurb)",
    "Samsung",
    "Phones",
    34900,
    44900,
    1,
    2,
    "Display case",
    true,
  ],
  ["Moto G 2025", "Motorola", "Phones", 12900, 17900, 9, 4, "Display case", true],
  ["PlayStation 5 Slim Digital", "Sony", "Game consoles", 39900, 44999, 2, 2, "Display case", true],
  ["Nintendo Switch 2", "Nintendo", "Game consoles", 39900, 44999, 1, 2, "Display case", true],
  ["Xbox Series X", "Microsoft", "Game consoles", 44900, 52999, 0, 1, "Back stock", true],
  ['MacBook Air 13" M4', "Apple", "Laptops", 89900, 99900, 2, 1, "Display case", true],
  ['iPad 11" 128GB', "Apple", "Tablets", 29900, 34900, 3, 2, "Display case", true],
  ['iPad Pro 11" M5', "Apple", "Tablets", 89900, 99900, 1, 1, "Display case", true],
  ["iPad mini 128GB", "Apple", "Tablets", 44900, 49900, 1, 1, "Display case", true],
  ["AirPods Max", "Apple", "Audio", 47900, 54900, 1, 1, "Display case", true],
  ["Galaxy Buds3 Pro", "Samsung", "Audio", 18900, 24999, 4, 2, "Display case", false],
  ["JBL Charge 5", "JBL", "Audio", 13900, 17999, 5, 2, "Display case", false],
  ["JBL Flip 6", "JBL", "Audio", 9900, 12999, 6, 3, "Display case", false],
  ["JBL Go 4", "JBL", "Audio", 3900, 4999, 12, 4, "Display case", false],
  ["Galaxy Watch Ultra", "Samsung", "Wearables", 52900, 64999, 1, 1, "Display case", true],
  [
    "OtterBox Defender iPhone 17 Pro",
    "OtterBox",
    "Accessories",
    3500,
    6999,
    8,
    4,
    "Accessory wall",
    false,
  ],
  [
    "Premium 9H Tempered Glass",
    "Generic",
    "Accessories",
    150,
    1999,
    60,
    20,
    "Accessory wall",
    false,
  ],
  ["USB-C 20W Fast Charger", "Generic", "Accessories", 400, 1999, 25, 10, "Accessory wall", false],
  ["Car Phone Mount", "Generic", "Accessories", 600, 2499, 14, 5, "Accessory wall", false],
  ["iPhone 15 Screen (OLED)", "Aftermarket", "Repair parts", 6500, 0, 3, 2, "Repair bench", false],
  ["Galaxy S23 Battery", "Aftermarket", "Repair parts", 1800, 0, 1, 2, "Repair bench", false],
];

function seedDemo(d: AdminData): AdminData {
  const now = Date.now();
  const at = (daysAgo: number, hour = 12) => {
    const t = new Date(now - daysAgo * 86_400_000);
    t.setHours(hour, Math.floor(Math.random() * 60), 0, 0);
    return t.toISOString();
  };
  d.settings.demo = true;
  d.employees = SAMPLE_STAFF.map(([name, role, rate, color, pinHash], i) => ({
    id: uid(),
    name,
    role,
    email: "",
    phone: "",
    hourlyRate: rate,
    pinHash,
    color,
    active: true,
    startDate: at(400 - i * 60).slice(0, 10),
  }));
  d.products = SAMPLE_PRODUCTS.map(
    ([name, brand, category, cost, price, quantity, reorderPoint, location, financeable], i) => ({
      id: uid(),
      sku: `TIC-${(1001 + i).toString()}`,
      name,
      brand,
      category,
      condition: name.includes("Refurb") ? "Refurbished" : "New",
      location,
      cost,
      price,
      quantity,
      reorderPoint,
      barcode: "",
      notes: "",
      financeable,
      shopifyProductId: null,
      shopifyVariantId: null,
      shopifyInventoryItemId: null,
      syncStatus: "unlinked",
      updatedAt: at(i % 9),
    }),
  );
  for (let i = 0; i < 40; i++) {
    const p = d.products[Math.floor(Math.random() * d.products.length)];
    if (!p) continue;
    const sold = Math.random() < 0.7;
    d.movements.push({
      id: uid(),
      productId: p.id,
      delta: sold ? -1 : 1 + Math.floor(Math.random() * 4),
      reason: sold ? "Sold" : "Received",
      note: "",
      by: "Sample Manager",
      at: at(Math.floor(i / 2), 10 + (i % 9)),
    });
  }
  d.movements.sort((a, b) => b.at.localeCompare(a.at));
  // Three weeks of shifts; the manager runs long enough to show overtime.
  for (let day = 21; day >= 1; day--) {
    d.employees.forEach((emp, i) => {
      const date = new Date(now - day * 86_400_000);
      if ((date.getDay() + i) % 7 === 0) return;
      const start = new Date(date);
      start.setHours(9 + (i % 2), i * 7, 0, 0);
      const length = i === 0 ? 9.25 : 7 + (i % 2);
      d.timeEntries.push({
        id: uid(),
        employeeId: emp.id,
        clockIn: start.toISOString(),
        clockOut: new Date(start.getTime() + length * 3_600_000).toISOString(),
        breakMinutes: 30,
        note: "",
        editedBy: null,
      });
    });
  }
  d.timeEntries.sort((a, b) => b.clockIn.localeCompare(a.clockIn));
  // 30 days of sample website traffic.
  const paths = ["/", "/", "/", "/financing", "/es", "/es/financiamiento"];
  const refs = [
    "google.com",
    "google.com",
    "google.com",
    "",
    "facebook.com",
    "maps.google.com",
    "tiktok.com",
  ];
  for (let day = 29; day >= 0; day--) {
    const weekend = [0, 6].includes(new Date(now - day * 86_400_000).getDay());
    const sessions = Math.round((weekend ? 55 : 38) + Math.random() * 20 + (29 - day) * 0.8);
    for (let s = 0; s < sessions; s++) {
      const sessionId = uid();
      const path = paths[Math.floor(Math.random() * paths.length)] ?? "/";
      const base = {
        sessionId,
        lang: path.startsWith("/es") ? ("es" as const) : ("en" as const),
        referrer: refs[Math.floor(Math.random() * refs.length)] ?? "",
        device: Math.random() < 0.74 ? ("mobile" as const) : ("desktop" as const),
      };
      const time = at(day, 9 + Math.floor(Math.random() * 11));
      d.events.push({ ...base, id: uid(), type: "pageview", path, at: time });
      if (Math.random() < 0.35)
        d.events.push({
          ...base,
          id: uid(),
          type: "pageview",
          path: path === "/" ? "/financing" : "/",
          at: time,
        });
      if (Math.random() < 0.09) d.events.push({ ...base, id: uid(), type: "call", path, at: time });
      if (Math.random() < 0.12)
        d.events.push({ ...base, id: uid(), type: "directions", path, at: time });
    }
  }
  return d;
}
