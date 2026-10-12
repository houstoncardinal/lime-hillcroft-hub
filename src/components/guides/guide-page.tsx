import { Link } from "@tanstack/react-router";
import { MoneyText } from "@/components/intl/money";
import {
  ArrowRight,
  BookOpen,
  CalendarCheck,
  CircleCheck,
  KeyRound,
  MessageCircleQuestion,
  Phone,
  Smartphone,
  Wallet,
  Wrench,
} from "lucide-react";

import { GUIDES, type Guide } from "@/components/guides/data";
import { guidePath, guidePaths } from "@/components/guides/paths";
import { PHONE, TEL } from "@/components/site/business";
import { MobileCallBar, SiteFooter, SiteHeader } from "@/components/site/chrome";
import { FaqList } from "@/components/site/faq";
import { ALTERNATES, type Lang } from "@/components/site/seo";

const GUIDE_ICONS = { screen: Wrench, lease: Wallet, unlock: KeyRound, plans: Smartphone };

const UI = {
  en: {
    guides: "Guides",
    quick: "Quick answer",
    updated: "Updated",
    read: (n: number) => `${n} min read`,
    by: "By the TIC Wireless Electronic & Repair Center team · 3640 Hillcroft St, Suite C, Houston",
    faq: "Common questions",
    help: "Want help in person?",
    helpBody:
      "Walk in — no appointment needed. Mon–Sat 9 AM–8 PM, Sun 9 AM–5 PM. Se habla español.",
    more: "More guides",
    date: (iso: string) =>
      new Date(`${iso}T12:00:00`).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      }),
  },
  es: {
    guides: "Guías",
    quick: "Respuesta rápida",
    updated: "Actualizado",
    read: (n: number) => `${n} min de lectura`,
    by: "Por el equipo de TIC Wireless Electronic & Repair Center · 3640 Hillcroft St, Suite C, Houston",
    faq: "Preguntas frecuentes",
    help: "¿Quieres ayuda en persona?",
    helpBody: "Ven sin cita. Lun–Sáb 9 AM–8 PM, Dom 9 AM–5 PM. We speak English.",
    more: "Más guías",
    date: (iso: string) =>
      new Date(`${iso}T12:00:00`).toLocaleDateString("es-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      }),
  },
};

export function GuidePage({ guide, lang }: { guide: Guide; lang: Lang }) {
  const t = guide.text[lang];
  const ui = UI[lang];
  const Icon = GUIDE_ICONS[guide.icon];
  const others = GUIDES.filter((g) => g.slug !== guide.slug);

  return (
    <main className="overflow-x-hidden">
      <SiteHeader lang={lang} paths={guidePaths(guide.slug)} />

      <article>
        <header className="relative isolate overflow-hidden bg-ink text-white">
          <div className="grain absolute inset-0 -z-10 opacity-60" />
          <div className="absolute -right-40 -top-20 -z-10 h-[32rem] w-[32rem] rounded-full bg-primary/20 blur-[150px]" />
          <div className="mx-auto max-w-4xl px-5 pb-14 pt-32 md:pb-20 md:pt-40">
            <nav
              aria-label="Breadcrumb"
              className="mb-8 flex flex-wrap items-center gap-1.5 text-sm text-white/60"
            >
              <Link to={ALTERNATES.home[lang]} className="hover:text-white">
                TIC Wireless Electronic & Repair Center
              </Link>
              <span>/</span>
              <Link to={ALTERNATES.guides[lang]} className="hover:text-white">
                {<MoneyText text={ui.guides} />}
              </Link>
            </nav>
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
              <Icon className="h-5 w-5" />
            </span>
            <h1 className="mt-6 text-[clamp(2.25rem,5vw,4rem)] font-semibold leading-[1.02]">
              {<MoneyText text={t.title} />}
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/75">
              {<MoneyText text={t.description} />}
            </p>
            <p className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-1 text-sm text-white/60">
              <span className="flex items-center gap-1.5">
                <CalendarCheck className="h-4 w-4" /> {<MoneyText text={ui.updated} />}{" "}
                <time dateTime={guide.updated}>{ui.date(guide.updated)}</time>
              </span>
              <span className="flex items-center gap-1.5">
                <BookOpen className="h-4 w-4" /> {ui.read(guide.readMinutes)}
              </span>
              <span>{<MoneyText text={ui.by} />}</span>
            </p>
          </div>
        </header>

        <div className="mx-auto max-w-4xl px-5 py-14 md:py-20">
          {/* Quick answer: the summary search engines and AI assistants quote */}
          <section
            aria-labelledby="quick"
            className="rounded-3xl border-2 border-primary/40 bg-primary/5 p-7 md:p-9"
          >
            <h2 id="quick" className="eyebrow flex items-center gap-2 text-ink">
              <span className="h-2 w-2 rounded-full bg-primary" /> {<MoneyText text={ui.quick} />}
            </h2>
            <ul className="mt-5 space-y-4">
              {t.quick.map((q) => (
                <li key={q} className="flex gap-3 text-lg leading-relaxed">
                  <CircleCheck className="mt-1 h-5 w-5 shrink-0 text-primary" />{" "}
                  <span>{<MoneyText text={q} />}</span>
                </li>
              ))}
            </ul>
          </section>

          {t.sections.map((s) => (
            <section key={s.h} className="mt-14">
              <h2 className="text-2xl font-semibold leading-tight md:text-3xl">
                {<MoneyText text={s.h} />}
              </h2>
              {s.p.map((para) => (
                <p key={para} className="mt-4 text-lg leading-relaxed text-muted-foreground">
                  {<MoneyText text={para} />}
                </p>
              ))}
              {s.list && (
                <ul className="mt-5 space-y-3">
                  {s.list.map((li, i) => (
                    <li key={li} className="flex gap-4 text-lg leading-relaxed">
                      <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-secondary font-display text-sm font-semibold">
                        {i + 1}
                      </span>
                      <span className="text-muted-foreground">{<MoneyText text={li} />}</span>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          ))}

          <section className="mt-16">
            <h2 className="flex items-center gap-2 text-2xl font-semibold md:text-3xl">
              <MessageCircleQuestion className="h-6 w-6 text-primary" />{" "}
              {<MoneyText text={ui.faq} />}
            </h2>
            <div className="mt-6">
              <FaqList items={t.faq} />
            </div>
          </section>

          <aside className="mt-16 flex flex-col gap-6 rounded-3xl bg-ink p-8 text-white md:flex-row md:items-center md:justify-between">
            <div>
              <p className="font-display text-xl font-semibold">{<MoneyText text={ui.help} />}</p>
              <p className="mt-1 text-white/65">{<MoneyText text={ui.helpBody} />}</p>
            </div>
            <div className="flex shrink-0 flex-wrap gap-2">
              <a
                href={TEL}
                className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 font-semibold text-primary-foreground transition hover:brightness-110"
              >
                <Phone className="h-4 w-4" /> {PHONE}
              </a>
              <a
                href={guide.ctaHref[lang]}
                className="inline-flex items-center gap-2 rounded-full border border-white/20 px-5 py-3 font-semibold transition hover:border-white/60"
              >
                {<MoneyText text={t.cta} />} <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </aside>
        </div>
      </article>

      <section className="border-t bg-secondary/60">
        <div className="mx-auto max-w-7xl px-5 py-16">
          <h2 className="text-2xl font-semibold md:text-3xl">{<MoneyText text={ui.more} />}</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {others.map((g) => (
              <GuideCard key={g.slug} guide={g} lang={lang} />
            ))}
          </div>
        </div>
      </section>

      <SiteFooter lang={lang} />
      <MobileCallBar lang={lang} />
    </main>
  );
}

export function GuideCard({ guide, lang }: { guide: Guide; lang: Lang }) {
  const Icon = GUIDE_ICONS[guide.icon];
  return (
    <Link
      to={guidePath(lang, guide.slug)}
      className="group flex flex-col rounded-3xl border bg-card p-6 transition hover:-translate-y-1 hover:shadow-xl hover:shadow-ink/5"
    >
      <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-secondary text-ink transition group-hover:bg-primary">
        <Icon className="h-5 w-5" />
      </span>
      <span className="mt-5 font-display text-lg font-semibold leading-snug group-hover:text-primary">
        {guide.text[lang].title}
      </span>
      <span className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
        {guide.text[lang].description}
      </span>
      <span className="mt-auto flex items-center justify-between pt-5 text-sm text-muted-foreground">
        {UI[lang].read(guide.readMinutes)}
        <ArrowRight className="h-4 w-4 text-primary transition group-hover:translate-x-1" />
      </span>
    </Link>
  );
}
