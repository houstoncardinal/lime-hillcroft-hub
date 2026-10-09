import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Languages, MapPin, Phone, Star } from "lucide-react";

import { ADDRESS, DIRECTIONS, PHONE, TEL, hoursOn } from "@/components/site/business";
import { Logo } from "@/components/site/logo";
import { Toaster } from "@/components/ui/sonner";
import { CartButton, CartDrawer } from "@/shop/components";
import { ALTERNATES, type Lang, type Paths } from "@/components/site/seo";
import { ThemeSwitcher } from "@/components/site/theme-switcher";
import { SITE_THEME_KEY } from "@/components/site/themes";

// Plain anchors with a leading "/" so the section links work from every page.
const NAV: Record<Lang, [string, string][]> = {
  en: [
    ["Services", "/#services"],
    ["Shop", "/shop"],
    ["Financing", "/financing"],
    ["Repair", "/#repair"],
    ["Visit", "/#visit"],
  ],
  es: [
    ["Servicios", "/es#services"],
    ["Tienda", "/es/tienda"],
    ["Financiamiento", "/es/financiamiento"],
    ["Reparación", "/es#repair"],
    ["Visítanos", "/es#visit"],
  ],
};

const T = {
  en: {
    call: "Call",
    directions: "Directions",
    home: "TIC Wireless home",
    switchTo: "Español",
    tagline: "Buy · Sell · Repair · Unlock. Your one-stop phone shop in Houston. Se habla español.",
    trademarks:
      "PlayStation, Xbox, Nintendo Switch, iPhone, MacBook, Galaxy, JBL, Xfinity and carrier names are trademarks of their respective owners.",
    open: (t: string) => `Open now · until ${t}`,
    opensToday: (t: string) => `Closed · opens ${t} today`,
    opensTomorrow: (t: string) => `Closed · opens ${t} tomorrow`,
    fallback: "Mon–Sat 9–8 · Sun 9–5",
  },
  es: {
    call: "Llamar",
    directions: "Cómo llegar",
    home: "Inicio de TIC Wireless",
    switchTo: "English",
    tagline:
      "Compra · Venta · Reparación · Liberación. Tu tienda de celulares en Houston. We speak English.",
    trademarks:
      "PlayStation, Xbox, Nintendo Switch, iPhone, MacBook, Galaxy, JBL, Xfinity y los nombres de las compañías son marcas de sus respectivos dueños.",
    open: (t: string) => `Abierto ahora · hasta las ${t}`,
    opensToday: (t: string) => `Cerrado · abre hoy a las ${t}`,
    opensTomorrow: (t: string) => `Cerrado · abre mañana a las ${t}`,
    fallback: "Lun–Sáb 9–8 · Dom 9–5",
  },
};

function useOpenStatus(lang: Lang) {
  const [status, setStatus] = useState<{ open: boolean; label: string } | null>(null);
  useEffect(() => {
    const t = T[lang];
    const compute = () => {
      const parts = new Intl.DateTimeFormat("en-US", {
        timeZone: "America/Chicago",
        weekday: "short",
        hour: "numeric",
        minute: "numeric",
        hourCycle: "h23",
      }).formatToParts(new Date());
      const get = (p: string) => parts.find((x) => x.type === p)?.value ?? "";
      const day = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(get("weekday"));
      const now = Number(get("hour")) + Number(get("minute")) / 60;
      const [open, close] = hoursOn(day);
      const fmt = (h: number) => `${h > 12 ? h - 12 : h} ${h >= 12 ? "PM" : "AM"}`;
      if (now >= open && now < close) setStatus({ open: true, label: t.open(fmt(close)) });
      else if (now < open) setStatus({ open: false, label: t.opensToday(fmt(open)) });
      else setStatus({ open: false, label: t.opensTomorrow(fmt(hoursOn((day + 1) % 7)[0])) });
    };
    compute();
    const id = setInterval(compute, 60_000);
    return () => clearInterval(id);
  }, [lang]);
  return status;
}

export function OpenBadge({ lang, className = "" }: { lang: Lang; className?: string }) {
  const status = useOpenStatus(lang);
  return (
    <span className={`inline-flex items-center gap-2 text-sm ${className}`}>
      <span className="relative flex h-2.5 w-2.5">
        {status?.open && (
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
        )}
        <span
          className={`relative inline-flex h-2.5 w-2.5 rounded-full ${status?.open ? "bg-emerald-400" : "bg-white/40"}`}
        />
      </span>
      {status?.label ?? T[lang].fallback}
    </span>
  );
}

export function Stars({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <span className="flex" aria-hidden="true">
      {Array.from({ length: 5 }, (_, i) => (
        <Star key={i} className={`${className} fill-current`} />
      ))}
    </span>
  );
}

function LanguageSwitch({ lang, paths }: { lang: Lang; paths: Paths }) {
  const other: Lang = lang === "en" ? "es" : "en";
  return (
    <a
      href={paths[other]}
      hrefLang={other}
      lang={other}
      className="inline-flex items-center gap-1.5 rounded-full px-3 py-2 text-sm text-white/80 transition hover:bg-white/10 hover:text-white"
    >
      <Languages className="h-4 w-4" />
      <span className="hidden sm:inline">{T[lang].switchTo}</span>
      <span className="sm:hidden">{other.toUpperCase()}</span>
    </a>
  );
}

export function SiteHeader({ lang, paths }: { lang: Lang; paths: Paths }) {
  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="mx-3 mt-3 flex max-w-7xl items-center justify-between gap-3 rounded-full border border-white/10 bg-ink/90 px-4 py-2.5 shadow-2xl shadow-black/20 backdrop-blur-xl sm:mx-4 sm:px-5 xl:mx-auto">
        <Link to={ALTERNATES.home[lang]} aria-label={T[lang].home}>
          <Logo light className="[&_span]:text-base sm:[&_span]:text-lg" />
        </Link>
        <nav aria-label="Main" className="hidden items-center gap-7 text-sm text-white/70 lg:flex">
          {NAV[lang].map(([label, href]) => (
            <a key={href} href={href} className="transition hover:text-white">
              {label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-1">
          <ThemeSwitcher
            storageKey={SITE_THEME_KEY}
            lang={lang}
            className="text-white/80 hover:bg-white/10 hover:text-white"
          />
          <LanguageSwitch lang={lang} paths={paths} />
          <CartButton lang={lang} />
          <a
            href={TEL}
            className="hidden items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition hover:brightness-110 md:inline-flex"
          >
            <Phone className="h-4 w-4" />
            {PHONE}
          </a>
        </div>
      </div>
      <CartDrawer lang={lang} />
      <Toaster position="bottom-center" />
    </header>
  );
}

export function SiteFooter({ lang }: { lang: Lang }) {
  return (
    <footer className="border-t border-white/10 bg-ink text-white">
      <div className="mx-auto max-w-7xl px-5 pb-28 pt-16 md:pb-16">
        <div className="flex flex-wrap items-start justify-between gap-10">
          <div>
            <Logo light />
            <p className="mt-4 max-w-xs text-sm text-white/60">{T[lang].tagline}</p>
          </div>
          <nav
            aria-label="Footer"
            className="grid grid-cols-2 gap-x-16 gap-y-2 text-sm text-white/70"
          >
            {NAV[lang].map(([label, href]) => (
              <a key={href} href={href} className="hover:text-white">
                {label}
              </a>
            ))}
          </nav>
          <address className="text-sm not-italic text-white/70">
            <p>{ADDRESS}</p>
            <a href={TEL} className="mt-1 block hover:text-white">
              {PHONE}
            </a>
          </address>
        </div>
        <div className="mt-14 flex flex-wrap justify-between gap-4 border-t border-white/10 pt-6 text-xs text-white/60">
          <p>© {new Date().getFullYear()} TIC Wireless · Houston, TX</p>
          <p>{T[lang].trademarks}</p>
        </div>
      </div>
    </footer>
  );
}

export function MobileCallBar({ lang }: { lang: Lang }) {
  return (
    <div className="fixed inset-x-3 bottom-3 z-50 flex gap-2 transition-[right] md:hidden in-[.has-chat]:right-[92px]">
      <a
        href={TEL}
        className="flex flex-1 items-center justify-center gap-2 rounded-full bg-primary py-3.5 font-semibold text-primary-foreground shadow-2xl"
      >
        <Phone className="h-4 w-4" /> {T[lang].call}
      </a>
      <a
        href={DIRECTIONS}
        target="_blank"
        rel="noreferrer"
        className="flex flex-1 items-center justify-center gap-2 rounded-full bg-ink py-3.5 font-semibold text-white shadow-2xl ring-1 ring-white/15"
      >
        <MapPin className="h-4 w-4" /> {T[lang].directions}
      </a>
    </div>
  );
}
