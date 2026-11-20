import { formatMoney, useCurrency } from "@/components/intl/currency";
import { disclaimerLang, InitialPaymentDisclaimer } from "@/components/site/acima-link";

/** A US-dollar amount, with an approximate conversion when the visitor uses another currency. */
export function Money({ usd, label, stacked }: { usd: number; label?: string; stacked?: boolean }) {
  const { code, rate } = useCurrency();
  return (
    <span translate="no" className={stacked ? "" : "whitespace-nowrap"}>
      {label ?? formatMoney(usd, "USD")}
      {code !== "USD" && rate && (
        <span
          className={
            stacked
              ? "block font-sans text-sm font-normal opacity-75"
              : "ml-1 text-[0.8em] font-normal opacity-75"
          }
        >
          (≈ {formatMoney(usd * rate, code)})
        </span>
      )}
    </span>
  );
}

const AMOUNT = /\$(\d{1,3}(?:,\d{3})*(?:\.\d{2})?)/g;

/**
 * Renders text, turning every "$49"-style amount into <Money>. Text that advertises the initial
 * payment ("…$49 initial payment*") gets the separate Acima disclaimer line under it; pass
 * `note={false}` where the caller shows one disclaimer for a group (split sentences, chips).
 * Pass `plain` inside a link or button so the disclaimer's Acima link isn't nested.
 */
export function MoneyText({
  text,
  plain,
  note = true,
}: {
  text: string | number | undefined;
  plain?: boolean;
  note?: boolean;
}) {
  const s = text == null ? "" : String(text);
  const lang = note ? disclaimerLang(s) : null;
  const disclaimer = lang ? (
    <InitialPaymentDisclaimer key="disclaimer" lang={lang} link={!plain} />
  ) : null;
  if (!s.includes("$")) return <>{s}</>;
  const parts: React.ReactNode[] = [];
  let last = 0;
  for (const m of s.matchAll(AMOUNT)) {
    const i = m.index ?? 0;
    if (i > last) parts.push(s.slice(last, i));
    parts.push(<Money key={i} usd={Number((m[1] ?? "0").replace(/,/g, ""))} label={m[0]} />);
    last = i + m[0].length;
  }
  if (last < s.length) parts.push(s.slice(last));
  return (
    <>
      {parts}
      {disclaimer}
    </>
  );
}
