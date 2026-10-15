// Visitor analytics for the public website: Google Analytics 4 and Hotjar.
// Both load after the page is interactive, so they never slow the first paint.
// The private dashboard (/admin) is never measured: the scripts don't load when a visit starts
// there, GA is switched off while it's open, and Hotjar masks every element on it.
//
// GA4 records page views (including in-app page changes), scrolls, outbound clicks and file
// downloads through its enhanced measurement (on by default in the GA data stream). On top of
// that, clicks on the store's key actions are sent as events — mark them as key events in
// GA → Admin → Events to count them as conversions:
//   phone_call        any tel: link (header, call bar, page buttons)
//   get_directions    Google Maps directions / map links
//   leasing_apply     a lease-to-own application (provider in "provider")
//   social_click      the Facebook page

/** Google Analytics 4 measurement ID ("G-XXXXXXXXXX", from GA → Admin → Data streams). */
export const GA_MEASUREMENT_ID = "G-14QM0N8626";

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

/** Sends a GA4 event; does nothing until GA has loaded (and never on /admin). */
export function trackEvent(name: string, params: Record<string, string | number> = {}) {
  (window as AnalyticsWindow).gtag?.("event", name, params);
}

/** What a clicked link means for the business, if anything. */
function linkEvent(a: HTMLAnchorElement): [string, Record<string, string>] | undefined {
  const href = a.getAttribute("href") ?? "";
  const label = (a.getAttribute("aria-label") ?? a.textContent ?? "").trim().slice(0, 100);
  const where = { link_text: label, page_path: location.pathname };
  if (href.startsWith("tel:")) return ["phone_call", { ...where, phone: href.slice(4) }];
  const portal = a.dataset["portal"];
  if (portal) return ["leasing_apply", { ...where, provider: portal, link_url: href }];
  if (/google\.[a-z.]+\/maps|maps\.google\.|maps\.app\.goo\.gl/.test(href))
    return ["get_directions", { ...where, link_url: href }];
  if (/facebook\.com/.test(href)) return ["social_click", { ...where, network: "facebook" }];
  return undefined;
}

let listening = false;
function listenForClicks(w: AnalyticsWindow) {
  if (listening) return;
  listening = true;
  // One listener on the document catches every link, including ones added later.
  w.document.addEventListener(
    "click",
    (e) => {
      const a = (e.target as Element | null)?.closest?.("a");
      const event = a && linkEvent(a);
      if (event) trackEvent(...event);
    },
    { capture: true },
  );
}

/** Call on every route change. */
export function syncAnalytics(pathname: string) {
  const onAdmin = pathname.startsWith("/admin");
  // Stops GA (including its automatic page views) while the dashboard is open.
  if (GA_MEASUREMENT_ID)
    (window as unknown as Record<string, unknown>)[`ga-disable-${GA_MEASUREMENT_ID}`] = onAdmin;
  // Hotjar masks the content of anything marked data-hj-suppress.
  document.body.toggleAttribute("data-hj-suppress", onAdmin);
  if (onAdmin || loaded) return;
  loaded = true;
  const w = window as AnalyticsWindow;
  const start = () => {
    loadGoogleAnalytics(w);
    listenForClicks(w);
    loadHotjar(w);
  };
  if ("requestIdleCallback" in w) w.requestIdleCallback(start, { timeout: 3000 });
  else setTimeout(start, 1500);
}
