// Color themes for the website and the /admin dashboard. Each theme is a set of CSS tokens in
// src/styles.css under html[data-palette="<id>"]; "signature" (the TIC logo colors) is the default.
// The website and the dashboard remember their theme separately.

export type ThemeId = "signature" | "gold" | "emerald" | "royal" | "rose" | "ocean" | "crimson";

export type Theme = {
  id: ThemeId;
  name: string;
  description: { en: string; es: string };
  /** [ink, primary, paper] for the swatch preview. */
  swatch: [string, string, string];
};

export const THEMES: Theme[] = [
  {
    id: "signature",
    name: "Signature",
    description: { en: "TIC orange & navy", es: "Naranja y azul TIC" },
    swatch: ["#0f1a26", "#f0801e", "#faf8f4"],
  },
  {
    id: "gold",
    name: "Midnight Gold",
    description: { en: "Black, champagne & ivory", es: "Negro, champán y marfil" },
    swatch: ["#121110", "#dcc078", "#faf7ef"],
  },
  {
    id: "emerald",
    name: "Emerald",
    description: { en: "Forest green & jade", es: "Verde bosque y jade" },
    swatch: ["#0c2a20", "#3fd3a0", "#f5faf6"],
  },
  {
    id: "royal",
    name: "Royal",
    description: { en: "Deep indigo & violet", es: "Índigo y violeta" },
    swatch: ["#1a1340", "#b393f5", "#f8f6fc"],
  },
  {
    id: "rose",
    name: "Rosé",
    description: { en: "Plum & rose gold", es: "Ciruela y oro rosa" },
    swatch: ["#2c1424", "#eba7a0", "#fcf6f5"],
  },
  {
    id: "ocean",
    name: "Ocean",
    description: { en: "Deep sea & aqua", es: "Azul profundo y aqua" },
    swatch: ["#0a2235", "#4cc9e6", "#f4f9fb"],
  },
  {
    id: "crimson",
    name: "Crimson",
    description: { en: "Obsidian & ruby red", es: "Obsidiana y rojo rubí" },
    swatch: ["#160f10", "#f0605e", "#faf7f6"],
  },
];

export const DEFAULT_THEME: ThemeId = "signature";
export const SITE_THEME_KEY = "tic-theme";
export const ADMIN_THEME_KEY = "tic-admin-theme";
export const THEME_EVENT = "tic-theme-change";

const isTheme = (v: string | null): v is ThemeId => THEMES.some((t) => t.id === v);

export function storedTheme(key: string): ThemeId {
  try {
    const v = localStorage.getItem(key);
    return isTheme(v) ? v : DEFAULT_THEME;
  } catch {
    return DEFAULT_THEME;
  }
}

export function applyTheme(id: ThemeId) {
  document.documentElement.dataset["palette"] = id;
}

export function saveTheme(key: string, id: ThemeId) {
  try {
    localStorage.setItem(key, id);
  } catch {
    // Private mode: the theme still applies for this page view.
  }
  applyTheme(id);
  window.dispatchEvent(new CustomEvent(THEME_EVENT, { detail: { key, id } }));
}

/** Runs in <head> before first paint so a saved theme never flashes the default. */
export const THEME_INIT_SCRIPT = `(function(){try{var k=location.pathname.indexOf("/admin")===0?"${ADMIN_THEME_KEY}":"${SITE_THEME_KEY}";var t=localStorage.getItem(k);var ok=${JSON.stringify(THEMES.map((t) => t.id))};document.documentElement.setAttribute("data-palette",ok.indexOf(t)>-1?t:"${DEFAULT_THEME}")}catch(e){}})();`;
