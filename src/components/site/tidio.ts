// Tidio live chat (with the Lyro AI agent) for the public website. Hidden on /admin.
const TIDIO_SRC = "https://code.tidio.co/tedhms7syyp7cizyn988nmc1uazxmxrs.js";

type TidioApi = { show: () => void; hide: () => void };
type TidioWindow = Window & { tidioChatApi?: TidioApi };
type TidioDocument = Document & { tidioChatLang?: string };

let scheduled = false;


/** Load the chat once and show it on public pages; hide it inside the dashboard. */
export function syncTidio(pathname: string) {
  const w = window as TidioWindow;
  (document as TidioDocument).tidioChatLang = /^\/es(\/|$)/.test(pathname) ? "es" : "en";
  const onAdmin = pathname.startsWith("/admin");
  if (onAdmin) {
    w.tidioChatApi?.hide();
    return;
  }
  if (!scheduled) {
    // The widget is ~380 KB of script, so it waits until the visitor interacts with the page
    // (or a few seconds pass). That keeps it out of the first paint and the PageSpeed score.
    scheduled = true;
    const events = ["pointerdown", "keydown", "scroll", "touchstart"] as const;
    const load = () => {
      events.forEach((e) => window.removeEventListener(e, load));
      clearTimeout(timer);
      if (location.pathname.startsWith("/admin")) return;
      // Open the widget in Spanish on Spanish pages.
      (document as TidioDocument).tidioChatLang = /^\/es(\/|$)/.test(location.pathname)
        ? "es"
        : "en";
      const s = document.createElement("script");
      s.src = TIDIO_SRC;
      s.async = true;
      document.body.appendChild(s);
      document.addEventListener("tidioChat-ready", () => {
        if (location.pathname.startsWith("/admin")) w.tidioChatApi?.hide();
      });
    };
    const timer = setTimeout(load, 6000);
    events.forEach((e) => window.addEventListener(e, load, { once: true, passive: true }));
    return;
  }
  w.tidioChatApi?.show();
}

/**
 * Hide the chat launcher while a full-screen overlay (the mobile menu or the cart drawer) is
 * open, so it can't cover its controls, and bring it back afterwards. Counts overlapping
 * overlays, so closing one keeps the chat hidden while another is still open.
 */
let hiddenRequests = 0;

export function setChatHidden(hidden: boolean) {
  hiddenRequests = Math.max(0, hiddenRequests + (hidden ? 1 : -1));
  const hiddenNow = hiddenRequests > 0;
  const w = window as TidioWindow;
  document.documentElement.classList.toggle("overlay-open", hiddenNow);
  if (hiddenNow) w.tidioChatApi?.hide();
  else if (!location.pathname.startsWith("/admin")) w.tidioChatApi?.show();
}
