import { INTL_LANGS } from "@/components/intl/languages";

// Remembers the visitor's language and works out what their device prefers.
//
// Rules (see LanguageAuto in language-auto.tsx):
//  - A choice the visitor makes (EN/ES toggle, language menu) is saved and always wins.
//  - First visit, device prefers Spanish, page is English → switch to the Spanish page.
//  - Device prefers English but the page is Spanish → offer English, don't redirect: Google
//    crawls as English, and redirecting would hide the Spanish pages from search.
//  - Device prefers one of the summary languages (vi, zh, ar…) → offer that summary page.
//  - Crawlers are never redirected.

const KEY = "tic-lang";
const DISMISS_KEY = "tic-lang-offer-dismissed";

export type SiteLang = "en" | "es" | (typeof INTL_LANGS)[number]["code"];

const SUPPORTED = new Set<string>(["en", "es", ...INTL_LANGS.map((l) => l.code)]);

// Browser language tags that map to a site language with a different code.
const ALIASES: Record<string, string> = { fil: "tl", tl: "tl", "zh-hans": "zh", "zh-cn": "zh" };

function read(key: string) {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

function write(key: string, value: string) {
  try {
    localStorage.setItem(key, value);
  } catch {
    // Private mode or blocked storage: the choice just won't be remembered.
  }
}

/** The language the visitor chose on this site, if any. */
export const getLangPref = () => read(KEY);

/** Save a language the visitor picked (called by every language link and toggle). */
export const setLangPref = (lang: string) => write(KEY, lang);

export const offerDismissed = () => read(DISMISS_KEY) === "1";
export const dismissOffer = () => write(DISMISS_KEY, "1");

/** The first of the device's preferred languages that this site has, e.g. "es" for es-MX. */
export function deviceLang(): SiteLang | null {
  if (typeof navigator === "undefined") return null;
  const tags = navigator.languages?.length ? navigator.languages : [navigator.language];
  for (const tag of tags) {
    const lower = (tag ?? "").toLowerCase();
    const code = ALIASES[lower] ?? ALIASES[lower.split("-")[0] ?? ""] ?? lower.split("-")[0] ?? "";
    if (SUPPORTED.has(code)) return code as SiteLang;
  }
  return null;
}

/** Search engines and other bots: never redirect them. */
export function isBot() {
  if (typeof navigator === "undefined") return true;
  return (
    Boolean((navigator as Navigator & { webdriver?: boolean }).webdriver) ||
    /bot|crawl|spider|slurp|lighthouse|headless|preview|facebookexternalhit|whatsapp/i.test(
      navigator.userAgent,
    )
  );
}
