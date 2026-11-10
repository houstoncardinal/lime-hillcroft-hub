import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowRight, BadgeCheck } from "lucide-react";

import {
  LEASE_DEVICES,
  LEASE_FEATURED,
  LEASE_PATHS,
  leaseDevicePath,
  leaseFrom,
} from "@/components/lease/catalog";
import { LEASE_COPY } from "@/components/lease/copy";
import { LeaseMoney, leasePhoto } from "@/components/lease/lease-ui";
import type { Lang } from "@/components/site/seo";
import { cn } from "@/lib/utils";

// Slim orange band under the home hero: the lease-to-own offer, one featured device at a time
// (photo, name and weekly payment) and a link to the full /lease-to-own catalog. The device
// rotates every few seconds, pauses on hover or focus, and the dots pick one directly.

const FEATURED = LEASE_FEATURED.flatMap((id) => LEASE_DEVICES.filter((d) => d.id === id));
const ROTATE_MS = 3500;

export function LeaseBanner({ lang }: { lang: Lang }) {
  const t = LEASE_COPY[lang];
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(() => setIndex((i) => (i + 1) % FEATURED.length), ROTATE_MS);
    return () => window.clearInterval(timer);
  }, [paused]);

  const device = FEATURED[index]!;
  const from = leaseFrom(device);
  const photo = leasePhoto(device);

  return (
    <section
      aria-label={t.bannerTitle}
      className="border-y border-ink/10 bg-primary text-primary-foreground"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div className="mx-auto flex max-w-7xl items-center gap-3 px-5 py-2.5 sm:gap-5 sm:py-3">
        {/* Offer */}
        <Link to={LEASE_PATHS[lang]} className="group flex shrink-0 items-center gap-2.5">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-ink text-primary shadow-md transition group-hover:scale-105">
            <BadgeCheck className="h-5 w-5" />
          </span>
          <span className="hidden leading-tight md:block">
            <span className="block font-display text-[15px] font-bold uppercase tracking-wide">
              {t.bannerTitle}
            </span>
            <span className="block text-xs font-medium opacity-80">{t.bannerSub}</span>
          </span>
        </Link>

        <span className="hidden h-9 w-px bg-ink/15 md:block" aria-hidden="true" />

        {/* Featured device, rotating */}
        <div className="flex min-w-0 flex-1 items-center gap-3">
          <Link
            key={device.id}
            to={leaseDevicePath(lang, device.id)}
            className="flex min-w-0 animate-swap-in items-center gap-2.5 rounded-full py-1 pr-2 transition hover:bg-white/15"
          >
            {photo && (
              <img
                src={photo.image}
                alt=""
                width={40}
                height={40}
                loading="lazy"
                decoding="async"
                className="h-10 w-10 shrink-0 rounded-full bg-white object-cover ring-2 ring-white/70"
              />
            )}
            <span className="min-w-0 leading-tight">
              <span className="block text-[11px] font-semibold uppercase tracking-wider opacity-80 md:hidden">
                {t.bannerTitle}
              </span>
              <span className="block truncate font-display text-sm font-bold sm:text-base">
                {device.name}
              </span>
              <span className="block truncate text-xs font-semibold sm:text-sm">
                {t.fromWord} <LeaseMoney usd={from.weekly} /> {t.freqWord.weekly}
                <span className="font-normal opacity-75"> · {lang === "en" ? "est." : "aprox."}</span>
              </span>
            </span>
          </Link>

          {/* Pick a device */}
          <div className="ml-auto hidden items-center gap-1.5 lg:flex" role="group" aria-label={t.bannerPick}>
            {FEATURED.map((d, i) => (
              <button
                key={d.id}
                type="button"
                onClick={() => setIndex(i)}
                aria-label={d.name}
                aria-pressed={i === index}
                className={cn(
                  "h-2 cursor-pointer rounded-full transition-all",
                  i === index ? "w-6 bg-ink" : "w-2 bg-ink/30 hover:bg-ink/60",
                )}
              />
            ))}
          </div>
        </div>

        {/* All devices */}
        <Link
          to={LEASE_PATHS[lang]}
          className="group inline-flex min-h-10 shrink-0 items-center gap-2 rounded-full bg-ink px-3 text-sm font-bold text-white shadow-md transition hover:bg-ink/85 sm:px-5"
          aria-label={t.bannerCta(LEASE_DEVICES.length)}
        >
          <span className="hidden sm:inline">{t.bannerCta(LEASE_DEVICES.length)}</span>
          <span className="sm:hidden">{t.bannerCtaShort}</span>
          <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
        </Link>
      </div>
    </section>
  );
}
