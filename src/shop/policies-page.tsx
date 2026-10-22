import { Link } from "@tanstack/react-router";
import { SiteHeader, SiteFooter } from "@/components/site/chrome";
import { TEL, PHONE } from "@/components/site/business";
import type { Lang } from "@/components/site/seo";
import type { getStorePolicies } from "@/shop/policies.functions";

export const POLICY_NAMES = {
  privacy: { en: "Privacy policy", es: "Política de privacidad" },
  returns: { en: "Returns & refunds", es: "Devoluciones y reembolsos" },
  shipping: { en: "Shipping", es: "Envíos" },
  terms: { en: "Terms of service", es: "Términos de servicio" },
  warranty: { en: "Warranty", es: "Garantía" },
};
export type PolicyKey = keyof typeof POLICY_NAMES;
export function policyKey(input: string): PolicyKey | null {
  return Object.prototype.hasOwnProperty.call(POLICY_NAMES, input) ? input as PolicyKey : null;
}
export function policyHead(lang: Lang, key: PolicyKey) {
  const title = `${POLICY_NAMES[key][lang]} | TIC Wireless Houston`;
  const description = lang === "es" ? `Consulta ${POLICY_NAMES[key][lang].toLowerCase()} de TIC Wireless. Contacta nuestra tienda en Houston para preguntas sobre tu compra.` : `Read ${POLICY_NAMES[key][lang].toLowerCase()} information for TIC Wireless. Contact our Houston store with questions about your purchase.`;
  return { meta: [{ title }, { name: "description", content: description }, { property: "og:title", content: title }, { property: "og:description", content: description }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary" }] };
}
export function PolicyPage({ lang, policy, policies }: { lang: Lang; policy: PolicyKey; policies: Awaited<ReturnType<typeof getStorePolicies>> }) {
  const entry = policies?.[policy];
  const paths = { en: `/policies/${policy}`, es: `/es/politicas/${policy}` };
  return <main>
    <SiteHeader lang={lang} paths={paths} />
    <div className="h-24 bg-ink" />
    <section className="mx-auto max-w-4xl px-5 py-12">
      <h1 className="text-3xl font-semibold">{POLICY_NAMES[policy][lang]}</h1>
      <nav aria-label={lang === "es" ? "Políticas" : "Policies"} className="my-6 flex flex-wrap gap-4 text-sm">
        {(Object.keys(POLICY_NAMES) as PolicyKey[]).map((key) => <Link key={key} to={lang === "es" ? "/es/politicas/$policy" : "/policies/$policy"} params={{ policy: key }} className="text-primary underline">{POLICY_NAMES[key][lang]}</Link>)}
      </nav>
      {entry ? <div className="space-y-5 text-sm leading-relaxed text-muted-foreground">
        {lang === "es" && <p>La política publicada por la tienda está disponible en inglés.</p>}
        {entry.paragraphs.map((paragraph, i) => <p key={i}>{paragraph}</p>)}
        <a href={entry.url} target="_blank" rel="noreferrer" className="block text-primary underline">{lang === "es" ? "Ver política original de Shopify" : "View original Shopify policy"}</a>
      </div> : <p className="text-muted-foreground">{lang === "es" ? "La tienda aún no ha publicado estos términos. Llámanos para confirmar las condiciones aplicables a tu compra antes de ordenar." : "The store has not published these terms yet. Please call to confirm the conditions for your purchase before ordering."}</p>}
      <a href={TEL} className="mt-8 inline-block font-semibold text-primary">{PHONE}</a>
    </section>
  </main>;
}