import { Link } from "@tanstack/react-router";
import {
  ArrowUpRight,
  CircleCheck,
  Clock,
  Languages,
  MapPin,
  Navigation,
  Phone,
  Star,
} from "lucide-react";

import storefront from "@/assets/photos/storefront-3640.webp";
import storefrontSm from "@/assets/photos/storefront-3640-sm.webp";
import { MoneyText } from "@/components/intl/money";
import type { IntlLang } from "@/components/intl/languages";
import { ADDRESS, DIRECTIONS, PHONE, TEL } from "@/components/site/business";
import { SiteFooter, SiteHeader } from "@/components/site/chrome";
import { DotRing } from "@/components/site/logo";
import { Photo } from "@/components/site/photo";
import { ALTERNATES } from "@/components/site/seo";

/** One-page summary of the store in another language (layout mirrors for right-to-left scripts). */
export function IntlPage({ l }: { l: IntlLang }) {
  return (
    <main className="overflow-x-hidden">
      <SiteHeader lang="en" paths={ALTERNATES.home} current={l.code} />

      <div lang={l.tag} dir={l.dir}>
        <section className="relative isolate overflow-hidden bg-ink text-white">
          <div className="grain absolute inset-0 -z-10 opacity-60" />
          <div className="absolute -right-40 top-0 -z-10 h-[34rem] w-[34rem] rounded-full bg-primary/20 blur-[150px]" />
          <DotRing
            className="animate-spin-slow absolute -right-24 top-16 -z-10 hidden h-[24rem] w-[24rem] opacity-40 lg:block"
            rings={[
              { r: 92, count: 26, dot: 2.6, className: "fill-primary" },
              { r: 76, count: 22, dot: 2.2, className: "fill-slate" },
            ]}
          />
          <div className="mx-auto max-w-5xl px-5 pb-12 pt-28 md:pb-14 md:pt-32">
            <p className="eyebrow flex items-center gap-2 text-primary">
              <Languages className="h-4 w-4" /> {l.native}
            </p>
            <h1 className="mt-6 text-[clamp(2.25rem,5.5vw,4.5rem)] font-semibold leading-[1.05]">
              {l.h1}
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-relaxed text-white/75">{l.intro}</p>
            <div className="mt-9 flex flex-wrap gap-3">
              <a
                href={TEL}
                className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 font-semibold text-primary-foreground transition hover:brightness-110"
              >
                <Phone className="h-4 w-4" /> {l.call} <span dir="ltr">{PHONE}</span>
              </a>
              <a
                href={DIRECTIONS}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 px-7 py-3.5 font-semibold transition hover:border-white/60"
              >
                <Navigation className="h-4 w-4" /> {l.directions}
              </a>
            </div>
            <p className="mt-8 flex items-center gap-2 text-sm text-white/70">
              <Star className="h-4 w-4 fill-primary text-primary" /> {l.rating}
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-5xl px-5 py-12 md:py-16">
          <p className="mb-8 flex items-start gap-3 rounded-2xl border bg-card p-5 text-muted-foreground">
            <Languages className="mt-0.5 h-5 w-5 shrink-0 text-primary" /> {l.langNote}
          </p>
          <h2 className="text-3xl font-semibold md:text-4xl">{l.servicesTitle}</h2>
          <ul className="mt-8 grid gap-4 md:grid-cols-2">
            {l.services.map((s) => (
              <li
                key={s}
                className="flex gap-3 rounded-2xl border bg-card p-5 text-lg leading-relaxed"
              >
                <CircleCheck className="mt-1 h-5 w-5 shrink-0 text-primary" />
                <span>
                  <MoneyText text={s} />
                </span>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-sm text-muted-foreground">{l.leaseNote}</p>
        </section>

        <section className="bg-ink text-white">
          <div className="mx-auto grid max-w-5xl gap-8 px-5 py-12 md:grid-cols-2 md:py-16">
            <div className="space-y-8">
              <div>
                <h2 className="flex items-center gap-2 text-2xl font-semibold">
                  <MapPin className="h-5 w-5 text-primary" /> {l.address}
                </h2>
                <p className="mt-3 text-lg text-white/80" dir="ltr">
                  {ADDRESS}
                </p>
              </div>
              <div>
                <h2 className="flex items-center gap-2 text-2xl font-semibold">
                  <Phone className="h-5 w-5 text-primary" /> {l.phone}
                </h2>
                <a href={TEL} className="mt-3 block text-lg text-primary" dir="ltr">
                  {PHONE}
                </a>
              </div>
              <div>
                <h2 className="flex items-center gap-2 text-2xl font-semibold">
                  <Clock className="h-5 w-5 text-primary" /> {l.hoursTitle}
                </h2>
                <ul className="mt-3 space-y-1 text-lg text-white/80">
                  {l.hours.map((h) => (
                    <li key={h}>{h}</li>
                  ))}
                </ul>
              </div>
              <Link
                to={ALTERNATES.home.en}
                className="tap inline-flex items-center gap-2 font-semibold text-white underline decoration-primary decoration-2 underline-offset-4"
              >
                {l.fullSite} <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="overflow-hidden rounded-3xl">
              <Photo
                src={storefront}
                srcSm={storefrontSm}
                width={2000}
                height={1500}
                sizes="(min-width: 768px) 50vw, 100vw"
                alt="TIC Wireless Electronic & Repair Center, 3640 Hillcroft St, Suite C, Houston"
                className="aspect-[4/3]"
              />
            </div>
          </div>
        </section>
      </div>

      <SiteFooter lang="en" />
    </main>
  );
}
