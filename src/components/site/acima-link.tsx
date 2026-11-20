import { ACIMA_URL } from "@/components/site/leasing-offer";
import { cn } from "@/lib/utils";

// Owner's and client's rules for the advertised initial payment:
// - The copy says "as low as $49 initial payment*". Right under that text, as its own small
//   disclaimer line (not part of the sentence): "*With Acima, one of our leasing providers. Terms
//   and conditions apply." MoneyText adds it automatically to any text with an asterisked amount.
// - The disclaimer is fine print, so Acima doesn't look more important than the other partners.
//   "Acima" in it links to the application (underline on hover only); partner lists stay plain.

export const INITIAL_PAYMENT_DISCLAIMER = {
  en: "*With Acima, one of our leasing providers. Terms and conditions apply.",
  es: "*Con Acima, uno de nuestros proveedores de arrendamiento. Aplican términos y condiciones.",
} as const;

/** Which disclaimer a text needs: English or Spanish asterisked initial payment, else none. */
export function disclaimerLang(text: string): "en" | "es" | null {
  if (/initial payment\*/i.test(text)) return "en";
  if (/de pago inicial\*|desde \$\d+\*/i.test(text)) return "es";
  return null;
}

export function AcimaLink({
  children = "Acima",
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <a
      href={ACIMA_URL}
      target="_blank"
      rel="noopener"
      data-portal="acima"
      className={cn("relative z-10 hover:underline", className)}
    >
      {children}
    </a>
  );
}

/** Text with its first "Acima" linked (plain text when `link` is false, e.g. inside a link). */
export function linkAcima(
  text: string,
  keyPrefix: string | number = "",
  { link = true }: { link?: boolean } = {},
): React.ReactNode[] {
  const i = text.indexOf("Acima");
  if (!link || i < 0) return [text];
  return [
    text.slice(0, i),
    <AcimaLink key={`${keyPrefix}acima`}>Acima</AcimaLink>,
    text.slice(i + "Acima".length),
  ];
}

/** The separate disclaimer line shown under any text that advertises the initial payment. */
export function InitialPaymentDisclaimer({
  lang,
  link = true,
  block = true,
  className,
}: {
  lang: "en" | "es";
  link?: boolean;
  /** A line of its own under inline text; false when the caller already places it on its own. */
  block?: boolean;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "text-[0.78rem] font-normal leading-snug opacity-75",
        block && "mt-1.5 block",
        className,
      )}
    >
      {linkAcima(INITIAL_PAYMENT_DISCLAIMER[lang], "disclaimer", { link })}
    </span>
  );
}
