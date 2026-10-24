import type { Lang } from "@/components/site/seo";
import { SHOP_COPY } from "@/shop/copy";

/** Shared customer instructions; plan selection always remains with Shopify/Affirm. */
export function InstallmentSteps({ lang }: { lang: Lang }) {
  const t = SHOP_COPY[lang].lease;
  return (
    <details className="mt-3 border-t border-shoppay/20 pt-3 text-xs">
      <summary className="cursor-pointer font-semibold text-shoppay focus-visible:outline-ring">{t.processTitle}</summary>
      <ol className="mt-3 space-y-3">
        {t.process.map(([title, body], i) => (
          <li key={title} className="grid grid-cols-[1.5rem_minmax(0,1fr)] gap-2">
            <span className="flex size-6 items-center justify-center rounded-full bg-shoppay/10 font-semibold text-shoppay">{i + 1}</span>
            <div><p className="font-semibold">{title}</p><p className="mt-1 leading-relaxed text-muted-foreground">{body}</p></div>
          </li>
        ))}
      </ol>
      <p className="mt-3 leading-relaxed text-muted-foreground">{t.unavailable}</p>
    </details>
  );
}