// Visitor analytics for the public website: Google Analytics 4 and Hotjar.
// Both load after the page is interactive, so they never slow the first paint.
// The private dashboard (/admin) is never measured: the scripts don't load when a visit starts
// there, and Hotjar masks every element while the dashboard is open.

/** Google Analytics 4 measurement ID ("G-XXXXXXXXXX", from GA → Admin → Data streams). */
export const GA_MEASUREMENT_ID = "";

/** Hotjar site ID for TICWireless. */
export const HOTJAR_ID = 6795434;
const HOTJAR_SV = 6;

type AnalyticsWindow = Window & {
  dataLayer?: unknown[];
  gtag?: (...args: unknown[]) => void;
  hj?: ((...args: unknown[]) => void) & { q?: unknown[] };
  _hjSettings?: { hjid: number; hjsv: number };
};

let loaded = false;

function addScript(src: string) {
  const s = document.createElement("script");
  s.async = true;
  s.src = src;
  document.head.appendChild(s);
}

function loadGoogleAnalytics(w: AnalyticsWindow) {
  if (!GA_MEASUREMENT_ID) return;
  w.dataLayer = w.dataLayer ?? [];
  w.gtag = function gtag() {
    // eslint-disable-next-line prefer-rest-params -- gtag expects the arguments object
    w.dataLayer!.push(arguments);
  };
  w.gtag("js", new Date());
  // GA4's enhanced measurement records the site's in-app page changes automatically.
  w.gtag("config", GA_MEASUREMENT_ID);
  addScript(`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`);
}

// Hotjar's official snippet (Tracking Code for TICWireless), written out.
function loadHotjar(w: AnalyticsWindow) {
  w.hj =
    w.hj ??
    Object.assign(
      (...args: unknown[]) => {
        (w.hj!.q = w.hj!.q ?? []).push(args);
      },
      { q: [] as unknown[] },
    );
  w._hjSettings = { hjid: HOTJAR_ID, hjsv: HOTJAR_SV };
  addScript(`https://static.hotjar.com/c/hotjar-${HOTJAR_ID}.js?sv=${HOTJAR_SV}`);
}

/** Call on every route change. */
export function syncAnalytics(pathname: string) {
  const onAdmin = pathname.startsWith("/admin");
  // Hotjar masks the content of anything marked data-hj-suppress.
  document.body.toggleAttribute("data-hj-suppress", onAdmin);
  if (onAdmin || loaded) return;
  loaded = true;
  const w = window as AnalyticsWindow;
  const start = () => {
    loadGoogleAnalytics(w);
    loadHotjar(w);
  };
  if ("requestIdleCallback" in w) w.requestIdleCallback(start, { timeout: 3000 });
  else setTimeout(start, 1500);
}
