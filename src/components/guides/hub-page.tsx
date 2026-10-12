import { GUIDES } from "@/components/guides/data";
import { GuideCard } from "@/components/guides/guide-page";
import { GUIDES_HUB } from "@/components/guides/hub-copy";
import { MobileCallBar, SiteFooter, SiteHeader } from "@/components/site/chrome";
import { ALTERNATES, type Lang } from "@/components/site/seo";

export function GuidesHubPage({ lang }: { lang: Lang }) {
  const t = GUIDES_HUB[lang];
  return (
    <main className="overflow-x-hidden">
      <SiteHeader lang={lang} paths={ALTERNATES.guides} />
      <section className="relative isolate overflow-hidden bg-ink text-white">
        <div className="grain absolute inset-0 -z-10 opacity-60" />
        <div className="absolute -right-40 -top-10 -z-10 h-[32rem] w-[32rem] rounded-full bg-primary/20 blur-[150px]" />
        <div className="mx-auto max-w-7xl px-5 pb-16 pt-32 md:pb-20 md:pt-40">
          <h1>
            <span className="eyebrow flex items-center gap-3 text-primary">
              <span className="h-px w-8 bg-primary" /> {t.kicker}
            </span>
            <span className="mt-6 block max-w-4xl text-[clamp(2.75rem,6.5vw,5.5rem)] font-semibold leading-[0.95]">
              {t.h1[0]} <span className="text-primary">{t.h1[1]}</span>
            </span>
          </h1>
          <p className="mt-6 max-w-xl text-lg text-white/70">{t.body}</p>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-5 py-16 md:py-24">
        <h2 className="sr-only">{t.kicker}</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {GUIDES.map((g) => (
            <GuideCard key={g.slug} guide={g} lang={lang} />
          ))}
        </div>
      </section>
      <SiteFooter lang={lang} />
      <MobileCallBar lang={lang} />
    </main>
  );
}
