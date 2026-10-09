import { useEffect, useState } from "react";

import {
  DEFAULT_THEME,
  THEME_EVENT,
  saveTheme,
  storedTheme,
  type ThemeId,
} from "@/components/site/themes";

/** The theme saved under `storageKey`, plus a setter that applies and remembers it. */
export function useTheme(storageKey: string) {
  // Start from the default so server and client render the same; the inline head script has
  // already applied the saved theme to <html>, so there is no flash.
  const [theme, setTheme] = useState<ThemeId>(DEFAULT_THEME);
  useEffect(() => {
    setTheme(storedTheme(storageKey));
    const onChange = (e: Event) => {
      const { key, id } = (e as CustomEvent<{ key: string; id: ThemeId }>).detail;
      if (key === storageKey) setTheme(id);
    };
    window.addEventListener(THEME_EVENT, onChange);
    return () => window.removeEventListener(THEME_EVENT, onChange);
  }, [storageKey]);
  const choose = (id: ThemeId) => {
    saveTheme(storageKey, id);
    setTheme(id);
  };
  return [theme, choose] as const;
}
