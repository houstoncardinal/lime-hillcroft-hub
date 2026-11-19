import { ACIMA_URL } from "@/components/site/leasing-offer";
import { cn } from "@/lib/utils";

// Owner's rules for the initial-payment disclosure:
// - Every advertised initial payment is followed by "with Acima, one of our leasing providers.
//   Terms and conditions apply." That statement is fine print: smaller, lighter and never bold,
//   so Acima doesn't look more important than the other leasing companies.
// - "Acima" links to its application only inside that statement (no underline until hover).
//   Where all partners are listed together, Acima is plain text like the others.
const STATEMENT = new RegExp(
  [
    "[Ww]ith Acima, one of our leasing providers",
    "[Cc]on Acima, uno de nuestros proveedores de arrendamiento",
    "Terms and conditions apply\\.?",
    "Aplican términos y condiciones\\.?",
    "\\((?:terms and conditions apply|aplican términos y condiciones)\\)",
    // Other-language pages (src/components/intl/languages.ts)
    "với Acima, một trong các nhà cung cấp thuê mua của chúng tôi \\(áp dụng các điều khoản và điều kiện\\)",
    "（通过我们的租赁服务商之一 Acima；适用条款和条件）",
    "مع Acima، أحد مزودي التأجير لدينا \\(تطبق الشروط والأحكام\\)",
    "Acima کے ساتھ جو ہمارے لیزنگ فراہم کنندگان میں سے ایک ہے \\(شرائط و ضوابط لاگو ہیں\\)",
    "Acima के साथ, जो हमारे लीज़िंग प्रदाताओं में से एक है \\(नियम और शर्तें लागू\\)",
    "avec Acima, l'un de nos fournisseurs de location \\(conditions générales applicables\\)",
    "com a Acima, um dos nossos fornecedores de leasing \\(termos e condições se aplicam\\)",
    "\\(저희 리스 제공업체 중 하나인 Acima 이용 시, 약관 적용\\)",
    "sa Acima, isa sa aming mga leasing provider \\(may mga tuntunin at kundisyon\\)",
  ].join("|"),
  "g",
);

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

function linkWord(s: string, key: string, link: boolean): React.ReactNode[] {
  if (!link || !s.includes("Acima")) return [s];
  const i = s.indexOf("Acima");
  return [s.slice(0, i), <AcimaLink key={`${key}a`}>Acima</AcimaLink>, s.slice(i + "Acima".length)];
}

/**
 * Renders text with the initial-payment statement as fine print (and "Acima" in it linked).
 * `link: false` inside other links or buttons; `fine: false` where the text is already fine print.
 */
export function linkAcima(
  text: string,
  keyPrefix: string | number = "",
  { link = true, fine = true }: { link?: boolean; fine?: boolean } = {},
): React.ReactNode[] {
  if (
    !/Acima|Terms and conditions apply|Aplican términos|terms and conditions apply|aplican términos/.test(
      text,
    )
  )
    return [text];
  const parts: React.ReactNode[] = [];
  let last = 0;
  for (const m of text.matchAll(STATEMENT)) {
    const i = m.index ?? 0;
    if (i > last) parts.push(text.slice(last, i));
    const key = `${keyPrefix}s${i}`;
    const inner = linkWord(m[0], key, link);
    parts.push(
      fine ? (
        <span key={key} className="text-[0.82em] font-normal opacity-75">
          {inner}
        </span>
      ) : (
        <span key={key}>{inner}</span>
      ),
    );
    last = i + m[0].length;
  }
  if (last < text.length) parts.push(text.slice(last));
  return parts;
}

/** Text with the initial-payment statement as fine print. */
export function AcimaText({ text }: { text: string }) {
  return <>{linkAcima(text)}</>;
}
