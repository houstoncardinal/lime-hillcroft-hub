import { Link } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { Phone, Search } from "lucide-react";

import { AreaCard } from "@/components/areas/area-page";
import { HUB_COPY } from "@/components/areas/copy";
import { AREAS, AREA_ZIPS, areaForZip, areaName, type Area } from "@/components/areas/data";
import { PHONE, TEL } from "@/components/site/business";
import { MobileCallBar, SiteFooter, SiteHeader } from "@/components/site/chrome";
import { DotRing } from "@/components/site/logo";
import { ALTERNATES, type Lang } from "@/components/site/seo";

type ZipResult = { kind: "found"; areas: Area[] } | { kind: "near" } | { kind: "invalid" } | null;

export function AreasHubPage({ lang }: { lang: Lang }) {
  const t = HUB_COPY[lang];
  const [zip, setZip] = useState("");
  const [result, setResult] = useState<ZipResult>(null);
  const sorted = [...AREAS].sort((a, b) => a.miles - b.miles);

  const lookup = (e: FormEvent) => {
    e.preventDefault();
    const z = zip.trim();
    if (!/^\d{5}$/.test(z)) return setResult({ kind: "invalid" });
    const areas = areaForZip(z);
    setResult(areas.length ? { kind: "found", areas } : { kind: "near" });
  };

  return (
    <main className="overflow-x-hidden">
      <SiteHeader lang={lang} paths={ALTERNATES.areas} />

      <section className="relative isolate overflow-hidden bg-ink text-white">
        <div className="grain absolute inset-0 -z-10 opacity-60" />
        <div className="absolute -left-40 top-10 -z-10 h-[36rem] w-[36rem] rounded-full bg-primary/20 blur-[150px]" />
        <DotRing
          className="animate-spin-slow absolute -right-24 top-16 -z-10 hidden h-[26rem] w-[26rem] opacity-40 lg:block"
          rings={[
            { r: 92, count: 26, dot: 2.6, className: "fill-primary" },
            { r: 76, count: 22, dot: 2.2, className: "fill-slate" },
          ]}
        />
        <div className="mx-auto max-w-7xl px-5 pb-16 pt-32 md:pb-24 md:pt-40">
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

          <form onSubmit={lookup} className="mt-10 max-w-xl">
            <label htmlFor="zip" className="mb-2 block text-sm font-medium text-white/80">
              {t.zipLabel}
            </label>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Search className="pointer-events-none absolute left-5 top-1/2 z-10 h-5 w-5 -translate-y-1/2 text-white/70" />
                <input
                  id="zip"
                  inputMode="numeric"
                  autoComplete="postal-code"
                  maxLength={5}
                  value={zip}
                  onChange={(e) => {
                    setZip(e.target.value.replace(/\D/g, ""));
                    setResult(null);
                  }}
                  placeholder={t.zipPlaceholder}
                  className="h-14 w-full rounded-full border border-white/15 bg-white/8 pl-13 pr-5 text-lg text-white placeholder:text-white/45 focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/20"
                />
              </div>
              <button
                type="submit"
                className="h-14 cursor-pointer rounded-full bg-primary px-7 font-semibold text-primary-foreground transition hover:brightness-110"
              >
                OK
              </button>
            </div>
            <div aria-live="polite" className="mt-4 min-h-6 text-white/85">
              {result?.kind === "invalid" && <p>{t.zipInvalid}</p>}
              {result?.kind === "near" && (
                <p className="flex flex-wrap items-center gap-2">
                  {t.zipNear}
                  <a
                    href={TEL}
                    className="inline-flex items-center gap-1 font-semibold text-primary"
                  >
                    <Phone className="h-4 w-4" /> {PHONE}
                  </a>
                </p>
              )}
              {result?.kind === "found" && (
                <p>{t.zipFound(result.areas.map((a) => areaName(a, lang)).join(" · "))}</p>
              )}
            </div>
          </form>
          {result?.kind === "found" && (
            <div className="mt-4 grid max-w-3xl gap-4 text-ink sm:grid-cols-2">
              {result.areas.map((a) => (
                <AreaCard key={a.slug} area={a} lang={lang} />
              ))}
            </div>
          )}
          <p className="mt-8 text-sm text-white/55">{AREA_ZIPS.join(" · ")}</p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20 md:py-28">
        <h2 className="sr-only">{t.kicker}</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {sorted.map((a) => (
            <AreaCard key={a.slug} area={a} lang={lang} />
          ))}
        </div>
      </section>

      <SiteFooter lang={lang} />
      <MobileCallBar lang={lang} />
    </main>
  );
}
