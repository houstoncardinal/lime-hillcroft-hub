import { useEffect, useState } from "react";

/** Current time, refreshed every `ms` (for live clocks and running shift timers). */
export function useNow(ms = 1000) {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), ms);
    return () => clearInterval(id);
  }, [ms]);
  return now;
}

const ADMIN_KEY = "tic-admin-api-key";

/** ADMIN_API_KEY for server calls (Shopify). Kept in sessionStorage, cleared when the tab closes. */
export function useAdminKey() {
  const [key, setKey] = useState(() => {
    try {
      return sessionStorage.getItem(ADMIN_KEY) ?? "";
    } catch {
      return "";
    }
  });
  const save = (value: string) => {
    try {
      if (value) sessionStorage.setItem(ADMIN_KEY, value);
      else sessionStorage.removeItem(ADMIN_KEY);
    } catch {
      // ignore
    }
    setKey(value);
  };
  return [key, save] as const;
}
