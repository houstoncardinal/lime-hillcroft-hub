import { Check, Palette } from "lucide-react";

import type { Lang } from "@/components/site/seo";
import { THEMES, type Theme, type ThemeId } from "@/components/site/themes";
import { useTheme } from "@/components/site/use-theme";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

const LABEL = { en: "Theme", es: "Tema" };

export function ThemeSwatch({ theme, className }: { theme: Theme; className?: string }) {
  const [ink, primary, paper] = theme.swatch;
  return (
    <span
      aria-hidden="true"
      className={cn("relative block overflow-hidden rounded-full ring-1 ring-black/10", className)}
      style={{ background: `linear-gradient(135deg, ${ink} 0 50%, ${paper} 50% 100%)` }}
    >
      <span
        className="absolute left-1/2 top-1/2 h-1/2 w-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{ background: primary }}
      />
    </span>
  );
}

/** Theme cards; used inside the popover and on the dashboard Settings page. */
export function ThemeGrid({
  value,
  onChange,
  lang = "en",
  large,
}: {
  value: ThemeId;
  onChange: (id: ThemeId) => void;
  lang?: Lang;
  large?: boolean;
}) {
  return (
    <div
      role="radiogroup"
      aria-label={LABEL[lang]}
      className={cn(
        "grid gap-2",
        large ? "grid-cols-2 sm:grid-cols-3 xl:grid-cols-4" : "grid-cols-1",
      )}
    >
      {THEMES.map((t) => {
        const active = t.id === value;
        return (
          <button
            key={t.id}
            type="button"
            role="radio"
            aria-checked={active}
            onClick={() => onChange(t.id)}
            className={cn(
              "flex cursor-pointer items-center gap-3 rounded-xl border text-left transition",
              large ? "p-4" : "px-3 py-2.5",
              active
                ? "border-primary bg-primary/10"
                : "border-transparent hover:border-border hover:bg-foreground/5",
            )}
          >
            <ThemeSwatch theme={t} className={large ? "h-10 w-10" : "h-7 w-7"} />
            <span className="min-w-0 flex-1">
              <span className="block text-sm font-semibold">{t.name}</span>
              <span className="block truncate text-xs text-muted-foreground">
                {t.description[lang]}
              </span>
            </span>
            {active && <Check className="h-4 w-4 shrink-0 text-primary" />}
          </button>
        );
      })}
    </div>
  );
}

/** Palette button that opens the theme picker. */
export function ThemeSwitcher({
  storageKey,
  lang = "en",
  className,
  showLabel,
}: {
  storageKey: string;
  lang?: Lang;
  className?: string;
  showLabel?: boolean;
}) {
  const [theme, setTheme] = useTheme(storageKey);
  return (
    <Popover>
      <PopoverTrigger
        aria-label={LABEL[lang]}
        className={cn(
          "inline-flex cursor-pointer items-center gap-2 rounded-full px-3 py-2 text-sm transition",
          className,
        )}
      >
        <Palette className="h-4 w-4" />
        {showLabel && <span>{LABEL[lang]}</span>}
      </PopoverTrigger>
      <PopoverContent align="end" sideOffset={10} className="w-72 rounded-2xl p-2 shadow-2xl">
        <p className="px-3 pb-2 pt-1 text-xs font-medium uppercase tracking-wider text-muted-foreground">
          {LABEL[lang]}
        </p>
        <ThemeGrid value={theme} onChange={setTheme} lang={lang} />
      </PopoverContent>
    </Popover>
  );
}
