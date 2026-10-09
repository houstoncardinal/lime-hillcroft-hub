import type { AnalyticsEvent, AnalyticsEventType } from "@/admin/types";

// First-party, cookie-free website statistics for the public pages.
// Events are kept in this browser's localStorage (local mode) and, when VITE_ANALYTICS_ENDPOINT
// is set, also beaconed to that endpoint so a backend can collect every visitor (docs/admin.md).

const KEY = "tic-analytics-v1";
const SESSION_KEY = "tic-session";
const MAX_EVENTS = 5000;
const ENDPOINT = import.meta.env["VITE_ANALYTICS_ENDPOINT"] as string | undefined;

function sessionId() {
  try {
    let id = sessionStorage.getItem(SESSION_KEY);
    if (!id) {
      id = crypto.randomUUID();
      sessionStorage.setItem(SESSION_KEY, id);
    }
    return id;
  } catch {
    return "anonymous";
  }
}

export function readTrackedEvents(): AnalyticsEvent[] {
  try {
    return JSON.parse(localStorage.getItem(KEY) ?? "[]") as AnalyticsEvent[];
  } catch {
    return [];
  }
}

let lastPageview = { path: "", at: 0 };

export function track(type: AnalyticsEventType, path = location.pathname) {
  if (path.startsWith("/admin") || navigator.doNotTrack === "1") return;
  // The root effect can fire twice for one navigation (hydration); count each page view once.
  if (type === "pageview") {
    if (lastPageview.path === path && Date.now() - lastPageview.at < 2000) return;
    lastPageview = { path, at: Date.now() };
  }
  const referrerHost = (() => {
    try {
      const host = document.referrer ? new URL(document.referrer).hostname : "";
      return host === location.hostname ? "" : host.replace(/^www\./, "");
    } catch {
      return "";
    }
  })();
  const event: AnalyticsEvent = {
    id: crypto.randomUUID(),
    type,
    path,
    lang: /^\/es(\/|$)/.test(path) ? "es" : "en",
    referrer: referrerHost,
    device: matchMedia("(max-width: 767px)").matches ? "mobile" : "desktop",
    sessionId: sessionId(),
    at: new Date().toISOString(),
  };
  try {
    const events = readTrackedEvents();
    events.push(event);
    localStorage.setItem(KEY, JSON.stringify(events.slice(-MAX_EVENTS)));
  } catch {
    // Storage blocked: skip local copy.
  }
  if (ENDPOINT) navigator.sendBeacon?.(ENDPOINT, JSON.stringify(event));
}

/** Classify a clicked link into a conversion event, if it is one. */
export function conversionFor(anchor: HTMLAnchorElement): AnalyticsEventType | null {
  const href = anchor.getAttribute("href") ?? "";
  if (href.startsWith("tel:")) return "call";
  if (/google\.com\/maps/.test(href)) return "directions";
  if (anchor.hasAttribute("hreflang")) return "language";
  return null;
}

export function clearTrackedEvents() {
  try {
    localStorage.removeItem(KEY);
  } catch {
    // ignore
  }
}
