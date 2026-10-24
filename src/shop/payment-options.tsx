import { useId } from "react";
import { CreditCard, CalendarClock, ShieldCheck } from "lucide-react";
import { Money } from "@/components/intl/money";
import type { Lang } from "@/components/site/seo";
import { SHOP_COPY } from "@/shop/copy";
import { installmentSchedule, payInFour } from "@/shop/installments";
import { cn } from "@/lib/utils";

export type PaymentMode = "full" | "plan";

/** Shared payment selection: the cart carries intent; Shopify sets final financing terms. */
export function PaymentOptions({ cents, lang, value, onChange }: {
  cents: number; lang: Lang; value: PaymentMode; onChange: (value: PaymentMode) => void;
}) {
  const name = useId();
  const t = SHOP_COPY[lang].lease;
  return (
    <fieldset className="mt-5 min-w-0 text-card-foreground">
      <legend className="mb-3 text-sm font-semibold">{t.title}</legend>
      <div className="grid gap-2">
        {(["full", "plan"] as const).map((mode) => {
          const plan = mode === "plan";
          const selected = value === mode;
          const Icon = plan ? CalendarClock : CreditCard;
          return (
            <label key={mode} className={cn(
              "grid cursor-pointer grid-cols-[auto_minmax(0,1fr)] items-start gap-3 rounded-lg border bg-card p-4 transition focus-within:ring-2 focus-within:ring-ring",
              selected ? plan ? "border-shoppay ring-1 ring-shoppay" : "border-primary ring-1 ring-primary" : "border-border",
            )}>
              <input type="radio" name={name} value={mode} checked={selected} onChange={() => onChange(mode)} className="mt-1 size-4 shrink-0 accent-shoppay" />
              <span className="min-w-0">
                <span className="flex items-start gap-2 text-sm font-semibold">
                  <Icon className={cn("mt-0.5 size-4 shrink-0", plan ? "text-shoppay" : "text-muted-foreground")} />
                  {plan ? t.plan : t.full}
                </span>
                <span className={cn("mt-2 block text-xl font-semibold tabular-nums", plan && "text-shoppay")}>
                  <Money usd={(plan ? payInFour(cents) : cents) / 100} />
                  {plan && <span className="ml-2 text-xs font-normal text-muted-foreground">× 4 {t.perPay}</span>}
                </span>
                <span className="mt-1 block text-xs leading-relaxed text-muted-foreground">
                  {plan ? (lang === "en" ? "Illustrative payments · final offers at checkout" : "Pagos ilustrativos · ofertas finales al pagar") : t.fullNote}
                </span>
              </span>
            </label>
          );
        })}
      </div>
      {value === "plan" && (
        <div className="mt-3 rounded-lg bg-secondary p-3">
          <p className="text-xs font-semibold">{t.schedule}</p>
          <ol className="mt-3 grid grid-cols-4 gap-1">
            {t.steps.map((step, i) => (
              <li key={step} className="min-w-0 text-center">
                <span className="block text-xs font-semibold tabular-nums"><Money usd={(installmentSchedule(cents)[i] ?? 0) / 100} /></span>
                <span className="mt-1 block text-[10px] text-muted-foreground">{step}</span>
              </li>
            ))}
          </ol>
          <p className="mt-3 text-xs leading-relaxed text-muted-foreground">{t.howTo}</p>
        </div>
      )}
      <p className="mt-3 flex items-start gap-2 text-[11px] leading-relaxed text-muted-foreground">
        <ShieldCheck className="mt-0.5 size-4 shrink-0 text-success" />{t.fine}
      </p>
    </fieldset>
  );
}