import { createServerFn } from "@tanstack/react-start";

// Daily USD exchange rates (open.er-api.com, free, no key). Cached on the server for 6 hours.
// Used only to show approximate conversions next to US-dollar prices.

export type Rates = { rates: Record<string, number>; updated: string };

const TTL = 6 * 60 * 60 * 1000;
let cache: { at: number; data: Rates } | null = null;

export const getRates = createServerFn({ method: "GET" }).handler(
  async (): Promise<Rates | null> => {
    if (cache && Date.now() - cache.at < TTL) return cache.data;
    try {
      const res = await fetch("https://open.er-api.com/v6/latest/USD", {
        signal: AbortSignal.timeout(6000),
      });
      const json = (await res.json()) as {
        result?: string;
        rates?: Record<string, number>;
        time_last_update_utc?: string;
      };
      if (json.result !== "success" || !json.rates) return cache?.data ?? null;
      cache = {
        at: Date.now(),
        data: { rates: json.rates, updated: json.time_last_update_utc ?? "" },
      };
      return cache.data;
    } catch {
      return cache?.data ?? null;
    }
  },
);
