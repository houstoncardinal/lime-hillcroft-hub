import { useNavigate } from "@tanstack/react-router";
import { Globe, X } from "lucide-react";
import { useEffect, useState } from "react";

import {
  deviceLang,
  dismissOffer,
  getLangPref,
  isBot,
  offerDismissed,
  setLangPref,
  type SiteLang,
} from "@/components/intl/lang-pref";
import { INTL_LANGS, intlPath } from "@/components/intl/languages";
import type { Lang, Paths } from "@/components/site/seo";

// "View the summary in <language>", in that language (have a native speaker review).
const SUMMARY_OFFER: Record<string, string> = {
  vi: "Xem tóm tắt bằng Tiếng Việt",
  zh: "查看简体中文简介",
  ar: "عرض الملخص بالعربية",
  ur: "اردو میں خلاصہ دیکھیں",
  hi: "हिन्दी में सारांश देखें",
  fr: "Voir le résumé en français",
  pt: "Ver o resumo em português",
  ko: "한국어 요약 보기",
  tl: "Tingnan ang buod sa Tagalog",
};

const SWITCHED_KEY = "tic-lang-auto-switched";

type Offer =
  | { kind: "switched" } // we just moved an es-device visitor to Spanish
  | { kind: "english" } // en device on a Spanish page
  | { kind: "summary"; code: string }; // device language with a summary page

/**
 * Shows each visitor the site in their device's language: switches Spanish devices to the
 * Spanish page on their first visit, offers English or a summary page otherwise, and always
 * respects a language the visitor picked. Rendered in the header on every public page.
 */
export function LanguageAuto({
  lang,
  paths,
  current,
}: {
  lang: Lang;
  paths: Paths;
  /** Summary-page language code (vi, zh…) when on one of those pages. */
  current?: string;
}) {
  const navigate = useNavigate();
  const [offer, setOffer] = useState<Offer | null>(null);
  const pageLang = current ?? lang;

  useEffect(() => {
    if (isBot()) return;
    const go = (to: string) => {
      const { search, hash } = window.location;
      void navigate({ to: `${to}${search}${hash}`, replace: true }).catch(() => undefined);
    };

    // 1. The visitor already chose: follow it on full-site pages.
    const pref = getLangPref();
    if (pref) {
      if (!current && (pref === "en" || pref === "es") && pref !== lang) go(paths[pref]);
      return;
    }

    // 2. First visit: use the device language.
    const device: SiteLang | null = deviceLang();
    if (!device || device === pageLang) {
      try {
        if (sessionStorage.getItem(SWITCHED_KEY) && lang === "es") setOffer({ kind: "switched" });
      } catch {
        /* storage blocked */
      }
      return;
    }
    if (device === "es" && lang === "en" && !current) {
      try {
        // Tell them once (on the Spanish page) that we switched, unless they've dismissed it.
        if (!offerDismissed()) sessionStorage.setItem(SWITCHED_KEY, "1");
      } catch {
        /* storage blocked */
      }
      go(paths.es);
      return;
    }
    if (offerDismissed()) return;
    if (device === "en" && lang === "es") setOffer({ kind: "english" });
    else if (SUMMARY_OFFER[device]) setOffer({ kind: "summary", code: device });
  }, [lang, paths, current, pageLang, navigate]);

  // The "we switched you to Spanish" note is just information: let it fade after a moment.
  useEffect(() => {
    if (offer?.kind !== "switched") return;
    const id = setTimeout(() => setOffer(null), 10_000);
    return () => clearTimeout(id);
  }, [offer]);

  if (!offer) return null;

  const close = () => {
    dismissOffer();
    try {
      sessionStorage.removeItem(SWITCHED_KEY);
    } catch {
      /* storage blocked */
    }
    setOffer(null);
  };

  let message: string;
  let action: { label: string; href: string; lang: string; dir?: "ltr" | "rtl" };
  if (offer.kind === "switched") {
    message = "Te mostramos el sitio en español.";
    action = { label: "View in English", href: paths.en, lang: "en" };
  } else if (offer.kind === "english") {
    message = "This page is in Spanish.";
    action = { label: "View in English", href: paths.en, lang: "en" };
  } else {
    const l = INTL_LANGS.find((x) => x.code === offer.code);
    message = "";
    action = {
      label: SUMMARY_OFFER[offer.code] ?? l?.native ?? offer.code,
      href: intlPath(offer.code),
      lang: l?.tag ?? offer.code,
      dir: l?.dir ?? "ltr",
    };
  }

  return (
    <div
      role="region"
      aria-label="Language"
      className="mx-3 mt-2 flex max-w-xl items-center gap-2 rounded-2xl border border-white/10 bg-ink/95 py-1.5 pl-3 pr-1.5 text-sm text-white shadow-xl backdrop-blur sm:mx-auto"
    >
      <Globe className="h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
      {message && <span className="min-w-0 flex-1 text-white/80">{message}</span>}
      <a
        href={action.href}
        hrefLang={action.lang}
        lang={action.lang}
        dir={action.dir}
        onClick={() => setLangPref(action.lang.split("-")[0] ?? action.lang)}
        className={`inline-flex min-h-10 items-center rounded-xl bg-primary px-3 font-semibold text-primary-foreground ${message ? "" : "flex-1 justify-center"}`}
      >
        {action.label}
      </a>
      <button
        type="button"
        onClick={close}
        aria-label={lang === "es" ? "Cerrar" : "Dismiss"}
        className="inline-flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-xl text-white/70 hover:bg-white/10"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}
