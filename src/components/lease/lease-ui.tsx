import { Link } from "@tanstack/react-router";
import { useEffect, useId, useState } from "react";
import {
  ArrowRight,
  ChevronDown,
  Gamepad2,
  Laptop,
  Smartphone,
  Tablet,
  Tv,
  Watch,
} from "lucide-react";

import { Money } from "@/components/intl/money";
import {
  LEASE_DEVICES,
  LEASE_FEATURED,
  LEASE_PATHS,
  FREQUENCIES,
  leaseDevicePath,
  leaseFrom,
  payment,
  type Frequency,
  type LeaseCategory,
  type LeaseDevice,
  type LeaseOption,
} from "@/components/lease/catalog";
import { LEASE_COPY } from "@/components/lease/copy";
import { OFFICIAL_PHOTOS } from "@/components/lease/official-photos";
import { LEASE_GALLERY, LEASE_PHOTOS } from "@/components/lease/photos";
import type { ProductPhoto } from "@/components/products/devices";
import { LATEST_DEVICES } from "@/components/products/inventory";
import { photoSrcSet } from "@/components/products/photo-src";
import type { Lang } from "@/components/site/seo";
import { cn } from "@/lib/utils";

/** "$56" for whole dollars, "$379.99" when there are cents. */
const usdText = (usd: number) =>
  `$${usd.toLocaleString("en-US", {
    minimumFractionDigits: Number.isInteger(usd) ? 0 : 2,
    maximumFractionDigits: 2,
  })}`;

/** A lease price as text that converts like <Money> when the visitor picks another currency. */
export function LeaseMoney({ usd }: { usd: number }) {
  return <Money usd={usd} label={usdText(usd)} />;
}

const ICONS: Record<LeaseCategory, typeof Smartphone> = {
  iphone: Smartphone,
  samsung: Smartphone,
  "other-phones": Smartphone,
  watches: Watch,
  ipads: Tablet,
  macbooks: Laptop,
  consoles: Gamepad2,
  tv: Tv,
};

/** The device's photo: its own (lease/photos.ts), else its /devices page photo, else a brand tile. */
/** Every photo of a device for its page's gallery: the main one, then any extras. */
export function leasePhotos(device: LeaseDevice) {
  const official = OFFICIAL_PHOTOS[device.id];
  if (official?.length) return official.map(fromProductPhoto);
  const main = leasePhoto(device);
  return main ? [main, ...(LEASE_GALLERY[device.id] ?? []).map(fromProductPhoto)] : [];
}

const fromProductPhoto = (p: ProductPhoto) => ({
  image: p.src,
  w: p.w,
  h: p.h,
  alt: p.alt,
  fit: "contain" as const,
  credit: p.credit,
});

export function leasePhoto(device: LeaseDevice) {
  const official = OFFICIAL_PHOTOS[device.id]?.[0];
  if (official) return fromProductPhoto(official);
  const own = LEASE_PHOTOS[device.id];
  if (own) return fromProductPhoto(own);
  const d = device.deviceId ? LATEST_DEVICES.find((x) => x.id === device.deviceId) : undefined;
  return d
    ? { image: d.image, w: d.w, h: d.h, alt: d.alt, fit: d.fit, credit: undefined }
    : undefined;
}

export function LeasePhoto({
  device,
  lang,
  sizes,
  className,
  priority,
  photo: chosen,
}: {
  device: LeaseDevice;
  lang: Lang;
  sizes: string;
  className?: string;
  priority?: boolean;
  /** A specific gallery photo; defaults to the device's main photo. */
  photo?: ReturnType<typeof leasePhoto>;
}) {
  const photo = chosen ?? leasePhoto(device);
  const Icon = ICONS[device.category];
  return (
    <div className={cn("relative overflow-hidden bg-white", className)}>
      {photo ? (
        <img
          src={photo.image}
          srcSet={photoSrcSet(photo.image, photo.w)}
          sizes={sizes}
          alt={photo.alt[lang]}
          width={photo.w}
          height={photo.h}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          className={cn(
            "absolute inset-0 h-full w-full",
            photo.fit === "contain" ? "object-contain p-4" : "object-cover",
          )}
        />
      ) : (
        <div
          role="img"
          aria-label={device.name}
          className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-gradient-to-br from-secondary to-white px-4 text-center text-ink"
        >
          <Icon className="h-[22%] w-[22%] text-primary" strokeWidth={1.4} aria-hidden="true" />
          <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-ink/50">
            {device.brand}
          </span>
          <span className="max-w-[16rem] font-display text-lg font-semibold leading-tight text-ink/80">
            {device.name}
          </span>
        </div>
      )}
    </div>
  );
}

export function LeaseCard({
  device,
  lang,
  frequency = "weekly",
}: {
  device: LeaseDevice;
  lang: Lang;
  /** The page's payment schedule; the card's own dropdown can change it for this card. */
  frequency?: Frequency;
}) {
  const t = LEASE_COPY[lang];
  const from = leaseFrom(device);
  const selectId = useId();
  const [own, setOwn] = useState<Frequency>(frequency);
  // The page-wide selector resets every card to its choice.
  useEffect(() => setOwn(frequency), [frequency]);
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-3xl border bg-card transition hover:-translate-y-0.5 hover:shadow-lg hover:shadow-ink/5">
      <LeasePhoto
        device={device}
        lang={lang}
        sizes="(min-width: 1024px) 280px, (min-width: 640px) 45vw, 90vw"
        className="aspect-[4/3]"
      />
      <span className="absolute left-3 top-3 rounded-full bg-ink px-2.5 py-1 text-[11px] font-bold text-white">
        {t.crumb}
      </span>
      <div className="flex flex-1 flex-col p-4">
        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          {device.brand}
        </p>
        <h3 className="mt-0.5 font-display text-lg font-semibold leading-snug">
          {/* Stretched link: the whole card opens the device's lease page. */}
          <Link
            to={leaseDevicePath(lang, device.id)}
            className="after:absolute after:inset-0 after:content-[''] group-hover:text-primary"
          >
            {device.name}
          </Link>
        </h3>
        <p className="mt-0.5 text-xs text-muted-foreground">{t.options(device.options.length)}</p>
        {/* Payments first: the chosen schedule's price, spelled out. The native <select> sits invisibly
            over the box (z-10, above the card's stretched link), so it opens the phone's own picker
            while the visible text can wrap instead of being cut off. */}
        <div className="relative z-10 mt-3 rounded-2xl border border-primary/25 bg-primary/[0.07] px-3.5 py-2.5 transition focus-within:ring-2 focus-within:ring-primary hover:border-primary/60">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
            {t.paymentsFrom}
          </p>
          <p className="flex flex-wrap items-baseline gap-x-1.5 pr-6">
            <span className="font-display text-2xl font-bold tabular-nums text-primary">
              <LeaseMoney usd={payment(from.option, own)} />
            </span>
            <span className="text-sm font-semibold text-ink">{t.freqWord[own]}</span>
          </p>
          <ChevronDown
            className="pointer-events-none absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-primary"
            aria-hidden="true"
          />
          <label htmlFor={selectId} className="sr-only">
            {t.payQuestion}
          </label>
          <select
            id={selectId}
            value={own}
            onChange={(e) => setOwn(e.target.value as Frequency)}
            className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
          >
            {FREQUENCIES.map((f) => (
              <option key={f} value={f}>
                {t.fromWord} {usdText(payment(from.option, f))} {t.freqWord[f]}
              </option>
            ))}
          </select>
        </div>
        <p className="mt-2 text-sm text-muted-foreground">
          {t.from}{" "}
          <span className="font-semibold tabular-nums text-ink">
            <LeaseMoney usd={from.lease} />
          </span>
        </p>
        <p className="mt-auto flex items-center justify-end gap-1 pt-3 text-xs font-semibold text-ink">
          {t.details} <ArrowRight className="h-3.5 w-3.5 text-primary" />
        </p>
      </div>
    </article>
  );
}

/** Home page section: the featured lease-to-own devices and a link to the full catalog. */
export function LeaseSection({ lang, className }: { lang: Lang; className?: string }) {
  const t = LEASE_COPY[lang];
  const featured = LEASE_FEATURED.flatMap((id) => LEASE_DEVICES.filter((d) => d.id === id));
  return (
    <section
      id="lease-to-own"
      aria-labelledby="lease-to-own-title"
      className={cn("mx-auto max-w-7xl scroll-mt-24 px-5 py-16 md:py-20", className)}
    >
      <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
        <div className="max-w-2xl">
          <p className="eyebrow flex items-center gap-3 text-primary">
            <span className="h-px w-8 bg-primary" /> {t.kicker}
          </p>
          <h2 id="lease-to-own-title" className="mt-3 text-3xl font-semibold md:text-5xl">
            {t.homeTitle}
          </h2>
          <p className="mt-3 text-muted-foreground">{t.homeBody}</p>
        </div>
        <Link
          to={LEASE_PATHS[lang]}
          className="inline-flex min-h-12 shrink-0 items-center gap-2 self-start rounded-full bg-primary px-6 font-semibold text-primary-foreground transition hover:brightness-110 md:self-auto"
        >
          {t.viewAll(LEASE_DEVICES.length)} <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
      <ul className="mt-8 grid grid-cols-1 gap-3 min-[420px]:grid-cols-2 sm:gap-5 lg:grid-cols-4">
        {featured.map((d) => (
          <li key={d.id}>
            <LeaseCard device={d} lang={lang} />
          </li>
        ))}
      </ul>
    </section>
  );
}

/** Weekly / bi-weekly / monthly switch (a segmented control). */
export function FrequencyToggle({
  value,
  onChange,
  lang,
  label,
  className,
  tone = "light",
}: {
  value: Frequency;
  onChange: (f: Frequency) => void;
  lang: Lang;
  label: string;
  className?: string;
  tone?: "light" | "dark";
}) {
  const t = LEASE_COPY[lang];
  return (
    <div
      role="radiogroup"
      aria-label={label}
      className={cn(
        "grid grid-cols-3 gap-1 rounded-full p-1",
        tone === "dark" ? "bg-white/10" : "bg-secondary",
        className,
      )}
    >
      {FREQUENCIES.map((f) => (
        <button
          key={f}
          type="button"
          role="radio"
          aria-checked={f === value}
          onClick={() => onChange(f)}
          className={cn(
            "min-h-10 cursor-pointer rounded-full px-2 text-sm font-semibold transition",
            f === value
              ? tone === "dark"
                ? "bg-white text-ink shadow"
                : "bg-ink text-white shadow"
              : tone === "dark"
                ? "text-white/75 hover:text-white"
                : "text-muted-foreground hover:text-foreground",
          )}
        >
          {t.freq[f]}
        </button>
      ))}
    </div>
  );
}

/** One option's estimated payment for the chosen schedule, with its leasing price underneath. */
export function PaymentSummary({
  option,
  frequency,
  lang,
}: {
  option: LeaseOption;
  frequency: Frequency;
  lang: Lang;
}) {
  const t = LEASE_COPY[lang];
  return (
    <div className="rounded-3xl border bg-card p-4 sm:p-5">
      <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        {t.estimated}
      </p>
      <p className="mt-1 flex flex-wrap items-baseline gap-x-2">
        <span className="font-display text-4xl font-semibold tabular-nums text-primary md:text-5xl">
          <LeaseMoney usd={payment(option, frequency)} />
        </span>
        <span className="text-lg font-semibold text-muted-foreground">{t.perLong[frequency]}</span>
      </p>
      <p className="mt-3 flex items-baseline justify-between gap-3 border-t pt-3 text-sm">
        <span className="text-muted-foreground">{t.leasingPrice}</span>
        <span className="text-base font-semibold tabular-nums">
          <LeaseMoney usd={option.lease} />
        </span>
      </p>
    </div>
  );
}

/** A titled grid of lease-to-own cards (by category or a list of ids) with a link to the catalog. */
export function LeaseGrid({
  lang,
  title,
  category,
  ids,
  limit = 8,
  className,
}: {
  lang: Lang;
  title: string;
  category?: LeaseCategory | LeaseCategory[];
  ids?: string[];
  limit?: number;
  className?: string;
}) {
  const t = LEASE_COPY[lang];
  const cats = category ? ([] as LeaseCategory[]).concat(category) : [];
  const devices = (
    ids
      ? ids.flatMap((id) => LEASE_DEVICES.filter((d) => d.id === id))
      : LEASE_DEVICES.filter((d) => cats.includes(d.category))
  ).slice(0, limit);
  const href = cats.length === 1 ? `${LEASE_PATHS[lang]}#${cats[0]}` : LEASE_PATHS[lang];
  return (
    <section className={cn("mx-auto max-w-7xl px-5 py-12 md:py-16", className)}>
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <h2 className="max-w-2xl text-3xl font-semibold md:text-4xl">{title}</h2>
        <Link
          to={href}
          className="inline-flex min-h-11 shrink-0 items-center gap-2 self-start rounded-full bg-primary px-5 text-sm font-semibold text-primary-foreground transition hover:brightness-110 md:self-auto"
        >
          {t.viewAll(LEASE_DEVICES.length)} <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
      <ul className="mt-6 grid grid-cols-1 gap-3 min-[420px]:grid-cols-2 sm:gap-5 lg:grid-cols-4">
        {devices.map((d) => (
          <li key={d.id}>
            <LeaseCard device={d} lang={lang} />
          </li>
        ))}
      </ul>
    </section>
  );
}
