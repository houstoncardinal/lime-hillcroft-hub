import { Check, Globe } from "lucide-react";

import { CURRENCIES, setCurrency, useCurrency } from "@/components/intl/currency";
import { INTL_LANGS, intlPath } from "@/components/intl/languages";
import type { Lang, Paths } from "@/components/site/seo";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

const UI = {
  en: {
    label: "Language & currency",
    language: "Language",
    more: "More languages · summary pages",
    note: "Our team speaks English and Spanish.",
    currency: "Currency",
    currencyNote:
      "Prices are charged in US dollars. Other currencies are approximate, updated daily.",
  },
  es: {
    label: "Idioma y moneda",
    language: "Idioma",
    more: "Más idiomas · páginas de resumen",
    note: "Nuestro equipo habla español e inglés.",
    currency: "Moneda",
    currencyNote:
      "Los precios se cobran en dólares. Las otras monedas son aproximadas y se actualizan a diario.",
  },
};

/** Header menu: full site in English/Spanish, summary pages in other languages, and currency. */
export function LanguageMenu({
  lang,
  paths,
  current,
}: {
  lang: Lang;
  paths: Paths;
  current?: string;
}) {
  const t = UI[lang];
  const { code } = useCurrency();
  const active = current ?? lang;
  const item = (selected: boolean) =>
    cn(
      "flex items-center justify-between gap-3 rounded-lg px-3 py-2 text-sm transition hover:bg-foreground/5",
      selected && "bg-primary/10 font-semibold",
    );

  return (
    <Popover>
      <PopoverTrigger
        aria-label={t.label}
        className="inline-flex cursor-pointer items-center gap-1.5 rounded-full px-3 py-2 text-sm text-white/80 transition hover:bg-white/10 hover:text-white"
      >
        <Globe className="h-4 w-4" />
        <span className="uppercase">{active}</span>
        <span className="hidden text-white/50 sm:inline">· {code}</span>
      </PopoverTrigger>
      <PopoverContent
        align="end"
        sideOffset={10}
        className="max-h-[80svh] w-80 overflow-y-auto rounded-2xl p-3 shadow-2xl"
      >
        <p className="px-3 pb-1 pt-1 text-xs font-medium uppercase tracking-wider text-muted-foreground">
          {t.language}
        </p>
        <div className="grid">
          {(
            [
              ["en", "English", paths.en],
              ["es", "Español", paths.es],
            ] as const
          ).map(([c, name, href]) => (
            <a key={c} href={href} hrefLang={c} lang={c} className={item(active === c)}>
              {name}
              {active === c && <Check className="h-4 w-4 text-primary" />}
            </a>
          ))}
        </div>
        <p className="px-3 pb-1 pt-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">
          {t.more}
        </p>
        <div className="grid grid-cols-2">
          {INTL_LANGS.map((l) => (
            <a
              key={l.code}
              href={intlPath(l.code)}
              hrefLang={l.tag}
              lang={l.tag}
              dir={l.dir}
              className={item(active === l.code)}
              title={l.english}
            >
              {l.native}
            </a>
          ))}
        </div>
        <p className="px-3 pt-2 text-xs text-muted-foreground">{t.note}</p>

        <label className="mt-4 block border-t px-3 pt-4">
          <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            {t.currency}
          </span>
          <select
            value={code}
            onChange={(e) => setCurrency(e.target.value)}
            className="mt-2 h-10 w-full cursor-pointer rounded-lg border bg-card px-2 text-sm"
          >
            {CURRENCIES.map(([c, name]) => (
              <option key={c} value={c}>
                {c} — {name}
              </option>
            ))}
          </select>
          <span className="mt-2 block text-xs text-muted-foreground">{t.currencyNote}</span>
        </label>
      </PopoverContent>
    </Popover>
  );
}
