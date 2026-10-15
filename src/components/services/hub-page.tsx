import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

import { SERVICES } from "@/components/services/data";
import { SERVICES_HUB } from "@/components/services/hub-copy";
import { ServiceCard } from "@/components/services/service-page";
import { MobileCallBar, SiteFooter, SiteHeader } from "@/components/site/chrome";
import { ALTERNATES, type Lang } from "@/components/site/seo";

export function ServicesHubPage({ lang }: { lang: Lang }) {
  const t = SERVICES_HUB[lang];
  return (
    <main className="overflow-x-hidden">
      <SiteHeader lang={lang} paths={ALTERNATES.services} />
      <section className="relative isolate overflow-hidden bg-ink text-white">
        <div className="grain absolute inset-0 -z-10 opacity-60" />
        <div className="absolute -right-40 -top-10 -z-10 h-[32rem] w-[32rem] rounded-full bg-primary/20 blur-[150px]" />
        <div className="mx-auto max-w-7xl px-5 pb-12 pt-28 md:pb-14 md:pt-32">
          <nav
            aria-label="Breadcrumb"
            className="mb-8 flex flex-wrap items-center gap-1.5 text-sm text-white/60"
          >
            <Link to={ALTERNATES.home[lang]} className="hover:text-white">
              {t.breadcrumb[0]}
            </Link>
            <span>/</span>
            <span aria-current="page" className="text-white/85">
              {t.breadcrumb[1]}
            </span>
          </nav>
          <p className="eyebrow flex items-center gap-3 text-primary">
            <span className="h-px w-8 bg-primary" /> {t.kicker}
          </p>
          <h1 className="mt-5 max-w-4xl text-[clamp(2.75rem,6.5vw,5.5rem)] font-semibold leading-[0.95]">
            {t.h1[0]} <span className="text-primary">{t.h1[1]}</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg text-white/70">{t.body}</p>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-5 py-12 md:py-16">
        <h2 className="sr-only">{t.kicker}</h2>
        <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3">
          {SERVICES.map((s) => (
            <ServiceCard key={s.slug} service={s} lang={lang} />
          ))}
          <Link
            to={ALTERNATES.leasing[lang]}
            className="group col-span-2 flex flex-col justify-between gap-4 rounded-3xl bg-ink p-4 text-white sm:gap-6 sm:p-6 lg:col-span-1 transition hover:-translate-y-1"
          >
            <span>
              <span className="block font-display text-lg font-semibold">{t.leasing}</span>
              <span className="mt-2 block text-sm leading-relaxed text-white/70">
                {t.leasingBody}
              </span>
            </span>
            <span className="flex items-center gap-1 text-sm font-semibold text-primary">
              {t.more} <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
            </span>
          </Link>
        </div>
      </section>
      <SiteFooter lang={lang} />
      <MobileCallBar lang={lang} />
    </main>
  );
}
