// Tidio live chat (with the Lyro AI agent) for the public website. Hidden on /admin.
const TIDIO_SRC = "https://code.tidio.co/tedhms7syyp7cizyn988nmc1uazxmxrs.js";

type TidioApi = { show: () => void; hide: () => void };
type TidioWindow = Window & { tidioChatApi?: TidioApi };
type TidioDocument = Document & { tidioChatLang?: string };

let watching = false;

// Adds "has-chat" to <html> while Tidio's launcher is on screen, so the mobile Call/Directions
// bar can leave room for it (and use the full width when the widget is hidden).
function watchLauncher() {
  if (watching) return;
  watching = true;
  setInterval(() => {
    const f = document.getElementById("tidio-chat-iframe");
    const r = f?.getBoundingClientRect();
    const visible = Boolean(
      r && r.width > 0 && r.height > 0 && getComputedStyle(f!).display !== "none",
    );
    document.documentElement.classList.toggle("has-chat", visible);
  }, 1000);
}

/** Load the chat once and show it on public pages; hide it inside the dashboard. */
export function syncTidio(pathname: string) {
  const w = window as TidioWindow;
  const onAdmin = pathname.startsWith("/admin");
  if (onAdmin) {
    w.tidioChatApi?.hide();
    return;
  }
  if (!document.querySelector(`script[src="${TIDIO_SRC}"]`)) {
    // Open the widget in Spanish on Spanish pages.
    (document as TidioDocument).tidioChatLang = /^\/es(\/|$)/.test(pathname) ? "es" : "en";
    const s = document.createElement("script");
    s.src = TIDIO_SRC;
    s.async = true;
    document.body.appendChild(s);
    watchLauncher();
    document.addEventListener("tidioChat-ready", () => {
      if (location.pathname.startsWith("/admin")) w.tidioChatApi?.hide();
    });
    return;
  }
  w.tidioChatApi?.show();
}
