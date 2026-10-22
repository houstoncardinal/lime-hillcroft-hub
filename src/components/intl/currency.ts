import { useSyncExternalStore } from "react";

import { getRates, type Rates } from "@/components/intl/rates";

// Visitor currency: detected from the browser's region, changeable in the language menu,
// remembered per browser. Prices on the site stay in US dollars; other currencies are shown as
// approximate conversions.

export const CURRENCIES: [code: string, name: string][] = [
  ["USD", "US dollar"],
  ["MXN", "Mexican peso"],
  ["CAD", "Canadian dollar"],
  ["EUR", "Euro"],
  ["GBP", "British pound"],
  ["GTQ", "Guatemalan quetzal"],
  ["HNL", "Honduran lempira"],
  ["NIO", "Nicaraguan córdoba"],
  ["CRC", "Costa Rican colón"],
  ["DOP", "Dominican peso"],
  ["COP", "Colombian peso"],
  ["PEN", "Peruvian sol"],
  ["BRL", "Brazilian real"],
  ["INR", "Indian rupee"],
  ["PKR", "Pakistani rupee"],
  ["BDT", "Bangladeshi taka"],
  ["VND", "Vietnamese đồng"],
  ["CNY", "Chinese yuan"],
  ["KRW", "South Korean won"],
  ["PHP", "Philippine peso"],
  ["NGN", "Nigerian naira"],
  ["SAR", "Saudi riyal"],
  ["AED", "UAE dirham"],
  ["EGP", "Egyptian pound"],
  ["JPY", "Japanese yen"],
];

const REGION_CURRENCY: Record<string, string> = {
  US: "USD",
  SV: "USD",
  EC: "USD",
  PR: "USD",
  MX: "MXN",
  CA: "CAD",
  GB: "GBP",
  DE: "EUR",
  FR: "EUR",
  ES: "EUR",
  IT: "EUR",
  NL: "EUR",
  PT: "EUR",
  IE: "EUR",
  BE: "EUR",
  AT: "EUR",
  GT: "GTQ",
  HN: "HNL",
  NI: "NIO",
  CR: "CRC",
  DO: "DOP",
  CO: "COP",
  PE: "PEN",
  BR: "BRL",
  IN: "INR",
  PK: "PKR",
  BD: "BDT",
  VN: "VND",
  CN: "CNY",
  KR: "KRW",
  PH: "PHP",
  NG: "NGN",
  SA: "SAR",
  AE: "AED",
  EG: "EGP",
  JP: "JPY",
};

const KEY = "tic-currency";
const supported = (c: string | null | undefined): c is string =>
  Boolean(c && CURRENCIES.some(([code]) => code === c));

export function detectCurrency() {
  try {
    for (const tag of navigator.languages ?? [navigator.language]) {
      const region = new Intl.Locale(tag).maximize().region;
      const c = region ? REGION_CURRENCY[region] : undefined;
      if (c) return c;
    }
  } catch {
    // Older browsers: fall through.
  }
  return "USD";
}

type State = { code: string; rates: Rates | null };
let state: State | null = null;
const listeners = new Set<() => void>();
const emit = () => listeners.forEach((l) => l());
let ratesRequested = false;

function read(): State {
  if (state) return state;
  let saved: string | null = null;
  try {
    saved = localStorage.getItem(KEY);
  } catch {
    // ignore
  }
  state = { code: supported(saved) ? saved : detectCurrency(), rates: null };
  return state;
}

function ensureRates() {
  if (ratesRequested) return;
  ratesRequested = true;
  void getRates()
    .then((rates) => {
      state = { ...read(), rates };
      emit();
    })
    .catch(() => undefined);
}

const SERVER: State = { code: "USD", rates: null };

export function useCurrency() {
  const s = useSyncExternalStore(
    (l) => {
      listeners.add(l);
      if (read().code !== "USD") ensureRates();
      return () => listeners.delete(l);
    },
    read,
    () => SERVER,
  );
  const rate = s.code === "USD" ? 1 : (s.rates?.rates[s.code] ?? null);
  return { code: s.code, rate };
}

export function setCurrency(code: string) {
  if (!supported(code)) return;
  try {
    localStorage.setItem(KEY, code);
  } catch {
    // ignore
  }
  state = { ...read(), code };
  if (code !== "USD") ensureRates();
  emit();
}

// Formatted with en-US conventions so every currency gets an unambiguous symbol
// (e.g. MX$736, CA$55, ₹3,879) instead of a bare "$" that could be confused with US dollars.
export function formatMoney(amount: number, code: string, locale = "en-US") {
  // Whole units are plenty for an approximate figure; keep cents only for small amounts.
  const exact = code === "USD";
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: code,
    maximumFractionDigits: exact ? 2 : 0,
    minimumFractionDigits: exact ? 2 : 0,
  }).format(amount);
}
