import { Link } from "@tanstack/react-router";
import { CircleCheck, MapPin, Phone } from "lucide-react";

import { ADDRESS, DIRECTIONS, HOURS, PHONE, TEL } from "@/components/site/business";
import { SiteFooter, SiteHeader } from "@/components/site/chrome";
import { ogImage } from "@/components/site/og";
import { pageSchema } from "@/components/site/schema";
import { ALTERNATES, pageHead, type Lang } from "@/components/site/seo";
import { POLICIES, POLICY_UPDATED, type PolicyKey } from "@/shop/policy-content";
import { cn } from "@/lib/utils";

export type { PolicyKey };

export const POLICY_NAMES: Record<PolicyKey, Record<Lang, string>> = {
  returns: { en: "Returns & refunds", es: "Devoluciones y reembolsos" },
  warranty: { en: "Warranty", es: "Garantía" },
  shipping: { en: "Shipping & pickup", es: "Envíos y recogida" },
  privacy: { en: "Privacy policy", es: "Política de privacidad" },
  terms: { en: "Terms of service", es: "Términos de servicio" },
};

const POLICY_KEYS = Object.keys(POLICY_NAMES) as PolicyKey[];

export function policyKey(input: string): PolicyKey | null {
  return Object.prototype.hasOwnProperty.call(POLICY_NAMES, input) ? (input as PolicyKey) : null;
}

const policyPaths = (key: PolicyKey) => ({ en: `/policies/${key}`, es: `/es/politicas/${key}` });

const updatedOn = (lang: Lang) =>
  new Date(`${POLICY_UPDATED}T12:00:00`).toLocaleDateString(lang === "es" ? "es-MX" : "en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

const UI = {
  en: {
    home: "Home",
    policies: "Store policies",
    updated: (d: string) => `Last updated ${d}`,
    points: "The short version",
    contents: "On this page",
    questions: "Questions about this policy?",
    questionsBody: "Call or stop by. We're happy to explain anything here before you buy.",
    call: "Call",
    directions: "Directions",
    hours: HOURS,
  },
  es: {
    home: "Inicio",
    policies: "Políticas de la tienda",
    updated: (d: string) => `Última actualización: ${d}`,
    points: "En resumen",
    contents: "En esta página",
    questions: "¿Preguntas sobre esta política?",
    questionsBody:
      "Llámanos o visítanos. Con gusto te explicamos cualquier punto antes de comprar.",
    call: "Llamar",
    directions: "Cómo llegar",
    hours: [
      ["Lunes a sábado", "9:00 AM – 8:00 PM"],
      ["Domingo", "9:00 AM – 5:00 PM"],
    ],
  },
};

export function policyHead(lang: Lang, key: PolicyKey) {
  const doc = POLICIES[key][lang];
  const title = `${POLICY_NAMES[key][lang]} | TIC Wireless Houston`;
  // Same head as every other page: canonical URL, English/Spanish alternates and structured data.
  const paths = policyPaths(key);
  const image = ogImage("home", lang);
  return pageHead({
    paths,
    lang,
    title,
    description: doc.summary,
    image,
    imageAlt: title,
    jsonLd: pageSchema({
      paths,
      lang,
      name: POLICY_NAMES[key][lang],
      description: doc.summary,
      image,
      breadcrumb: [
        [UI[lang].home, ALTERNATES.home[lang]],
        [POLICY_NAMES[key][lang], paths[lang]],
      ],
      faqs: [],
      dateModified: POLICY_UPDATED,
    }),
  });
}

export function PolicyPage({ lang, policy }: { lang: Lang; policy: PolicyKey }) {
  const t = UI[lang];
  const doc = POLICIES[policy][lang];
  return (
    <main className="overflow-x-hidden">
      <SiteHeader lang={lang} paths={policyPaths(policy)} />

      <section className="relative isolate overflow-hidden bg-ink text-white">
        <div className="grain absolute inset-0 -z-10 opacity-60" />
        <div className="mx-auto max-w-5xl px-5 pb-10 pt-28 md:pb-14 md:pt-32">
          <nav
            aria-label="Breadcrumb"
            className="mb-6 flex flex-wrap items-center gap-1.5 text-sm text-white/60"
          >
            <Link to={ALTERNATES.home[lang]} className="hover:text-white">
              {t.home}
            </Link>
            <span>/</span>
            <span>{t.policies}</span>
            <span>/</span>
            <span className="text-white/85">{POLICY_NAMES[policy][lang]}</span>
          </nav>
          <h1 className="text-[clamp(2.25rem,5vw,3.5rem)] font-semibold leading-[1.05]">
            {POLICY_NAMES[policy][lang]}
          </h1>
          <p className="mt-4 max-w-3xl text-lg leading-relaxed text-white/75">{doc.summary}</p>
          <p className="mt-4 text-sm text-white/55">{t.updated(updatedOn(lang))}</p>
        </div>
      </section>

      {/* Policy switcher */}
      <nav
        aria-label={t.policies}
        className="sticky top-[84px] z-30 border-b bg-background/90 backdrop-blur"
      >
        <div className="mx-auto flex max-w-5xl gap-2 overflow-x-auto px-5 py-3">
          {POLICY_KEYS.map((key) => (
            <Link
              key={key}
              to={policyPaths(key)[lang]}
              aria-current={key === policy ? "page" : undefined}
              className={cn(
                "inline-flex min-h-10 shrink-0 items-center rounded-full border px-4 text-sm font-semibold transition",
                key === policy
                  ? "border-ink bg-ink text-white"
                  : "bg-card hover:border-primary hover:text-primary",
              )}
            >
              {POLICY_NAMES[key][lang]}
            </Link>
          ))}
        </div>
      </nav>

      <div className="mx-auto grid max-w-5xl gap-10 px-5 py-10 md:py-14 lg:grid-cols-[1fr_15rem]">
        <article className="min-w-0">
          <section aria-labelledby="key-points" className="rounded-3xl border bg-card p-6 sm:p-7">
            <h2 id="key-points" className="font-display text-xl font-semibold">
              {t.points}
            </h2>
            <ul className="mt-4 space-y-3">
              {doc.points.map((p) => (
                <li key={p} className="flex gap-3 leading-relaxed">
                  <CircleCheck className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </section>

          <div className="mt-10 space-y-10">
            {doc.sections.map((s) => (
              <section
                key={s.id}
                id={s.id}
                aria-labelledby={`${s.id}-title`}
                className="scroll-mt-40"
              >
                <h2 id={`${s.id}-title`} className="text-2xl font-semibold">
                  {s.title}
                </h2>
                <div className="mt-3 space-y-3 leading-relaxed text-muted-foreground">
                  {s.body.map((b, i) =>
                    typeof b === "string" ? (
                      <p key={i}>{b}</p>
                    ) : (
                      <ul key={i} className="list-disc space-y-2 pl-5 marker:text-primary">
                        {b.list.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    ),
                  )}
                </div>
              </section>
            ))}
          </div>
        </article>

        <aside className="space-y-6 lg:sticky lg:top-44 lg:self-start">
          <nav aria-label={t.contents} className="hidden lg:block">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              {t.contents}
            </p>
            <ul className="mt-3 space-y-2 text-sm">
              {doc.sections.map((s) => (
                <li key={s.id}>
                  <a href={`#${s.id}`} className="hover:text-primary">
                    {s.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="rounded-3xl bg-ink p-6 text-white">
            <p className="font-display text-lg font-semibold">{t.questions}</p>
            <p className="mt-2 text-sm leading-relaxed text-white/70">{t.questionsBody}</p>
            <p className="mt-4 text-sm text-white/70">{ADDRESS}</p>
            <ul className="mt-2 space-y-0.5 text-sm text-white/70">
              {t.hours.map(([days, hours]) => (
                <li key={days}>
                  {days}: {hours}
                </li>
              ))}
            </ul>
            <div className="mt-5 grid gap-2">
              <a
                href={TEL}
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-primary px-5 text-sm font-bold text-primary-foreground"
              >
                <Phone className="h-4 w-4" /> {t.call} {PHONE}
              </a>
              <a
                href={DIRECTIONS}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-white/20 px-5 text-sm font-bold hover:border-white/60"
              >
                <MapPin className="h-4 w-4" /> {t.directions}
              </a>
            </div>
          </div>
        </aside>
      </div>

      <SiteFooter lang={lang} />
    </main>
  );
}
