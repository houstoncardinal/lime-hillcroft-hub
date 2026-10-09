// Data model for the /admin dashboard. Mirrors supabase/migrations/20261009000000_admin.sql
// so the local store can be swapped for a database without touching the screens.

export const CATEGORIES = [
  "Phones",
  "Game consoles",
  "Laptops",
  "Tablets",
  "Audio",
  "Wearables",
  "Accessories",
  "Repair parts",
] as const;
export type Category = (typeof CATEGORIES)[number];

export const CONDITIONS = ["New", "Open box", "Refurbished", "Used"] as const;
export type Condition = (typeof CONDITIONS)[number];

export const LOCATIONS = ["Display case", "Accessory wall", "Back stock", "Repair bench"] as const;
export type Location = (typeof LOCATIONS)[number];

export type SyncStatus = "unlinked" | "synced" | "pending" | "error";

export type Product = {
  id: string;
  sku: string;
  name: string;
  brand: string;
  category: Category;
  condition: Condition;
  location: Location;
  /** Unit cost in cents. */
  cost: number;
  /** Retail price in cents. */
  price: number;
  quantity: number;
  reorderPoint: number;
  barcode: string;
  notes: string;
  /** Lease-to-own / financing eligible (shown on the public financing page). */
  financeable: boolean;
  shopifyProductId: string | null;
  shopifyVariantId: string | null;
  shopifyInventoryItemId: string | null;
  syncStatus: SyncStatus;
  updatedAt: string;
};

export const MOVEMENT_REASONS = [
  "Received",
  "Sold",
  "Returned",
  "Adjusted",
  "Damaged",
  "Shopify sync",
] as const;
export type MovementReason = (typeof MOVEMENT_REASONS)[number];

export type StockMovement = {
  id: string;
  productId: string;
  delta: number;
  reason: MovementReason;
  note: string;
  by: string;
  at: string;
};

export const ROLES = [
  "Owner",
  "Manager",
  "Sales associate",
  "Repair technician",
  "Cashier",
] as const;
export type Role = (typeof ROLES)[number];

export type Employee = {
  id: string;
  name: string;
  role: Role;
  email: string;
  phone: string;
  /** Hourly rate in cents. */
  hourlyRate: number;
  /** 4-digit time-clock PIN (stored as a SHA-256 hash). */
  pinHash: string;
  color: string;
  active: boolean;
  startDate: string;
};

export type TimeEntry = {
  id: string;
  employeeId: string;
  clockIn: string;
  clockOut: string | null;
  breakMinutes: number;
  note: string;
  /** Set when a manager edits the entry after the fact. */
  editedBy: string | null;
};

export type PayrollStatus = "draft" | "approved" | "paid";

export type PayrollLine = {
  employeeId: string;
  name: string;
  rate: number;
  regularMinutes: number;
  overtimeMinutes: number;
  /** Gross pay in cents. */
  gross: number;
};

export type PayrollRun = {
  id: string;
  periodStart: string;
  periodEnd: string;
  status: PayrollStatus;
  lines: PayrollLine[];
  createdAt: string;
  approvedAt: string | null;
  paidAt: string | null;
};

export type AnalyticsEventType = "pageview" | "call" | "directions" | "language";

export type AnalyticsEvent = {
  id: string;
  type: AnalyticsEventType;
  path: string;
  lang: "en" | "es";
  referrer: string;
  device: "mobile" | "desktop";
  sessionId: string;
  at: string;
};

export const CAMERA_SOURCES = [
  "none",
  "hls",
  "webrtc",
  "mjpeg",
  "snapshot",
  "embed",
  "device",
] as const;
export type CameraSource = (typeof CAMERA_SOURCES)[number];

export const CAMERA_ZONES = [
  "Entrance",
  "Sales floor",
  "Display cases",
  "Register",
  "Repair bench",
  "Stock room",
  "Parking lot",
] as const;
export type CameraZone = (typeof CAMERA_ZONES)[number];

/** Placeholder backdrops (store photos) shown while a camera isn't connected. */
export const CAMERA_PLACEHOLDERS = [
  "storefront",
  "counter",
  "case-wall",
  "display",
  "apple",
  "plaza",
] as const;
export type CameraPlaceholder = (typeof CAMERA_PLACEHOLDERS)[number];

export type Camera = {
  id: string;
  name: string;
  zone: CameraZone;
  source: CameraSource;
  /** Stream, snapshot or embed URL (unused for "none" and "device"). */
  url: string;
  /** Browser camera to use when source is "device". */
  deviceId: string;
  /** Seconds between refreshes for "snapshot" sources. */
  refreshSeconds: number;
  enabled: boolean;
  placeholder: CameraPlaceholder;
};

export type Settings = {
  storeName: string;
  /** SHA-256 hash of the dashboard passcode (local mode). */
  passcodeHash: string | null;
  /** Weekly overtime threshold in hours (FLSA: 40). */
  overtimeThreshold: number;
  overtimeMultiplier: number;
  payPeriod: "weekly" | "biweekly";
  /** Whether the store currently holds generated sample data. */
  demo: boolean;
};

export type AdminData = {
  version: 1;
  products: Product[];
  movements: StockMovement[];
  employees: Employee[];
  timeEntries: TimeEntry[];
  payrollRuns: PayrollRun[];
  events: AnalyticsEvent[];
  cameras: Camera[];
  settings: Settings;
};
