import { Link } from "@tanstack/react-router";
import { ArrowRight, Gamepad2, Laptop, Smartphone, Tablet, Tv, Watch } from "lucide-react";

import { Money } from "@/components/intl/money";
import {
  LEASE_DEVICES,
  LEASE_FEATURED,
  LEASE_PATHS,
  leaseDevicePath,
  leaseFrom,
  type LeaseCategory,
  type LeaseDevice,
  type LeaseOption,
} from "@/components/lease/catalog";
import { LEASE_COPY } from "@/components/lease/copy";
import { LATEST_DEVICES } from "@/components/products/inventory";
import { photoSrcSet } from "@/components/products/photo-src";
import type { Lang } from "@/components/site/seo";
import { cn } from "@/lib/utils";

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

/** The model's photo from its /devices page, or a uniform brand tile when the site has none. */
export function LeasePhoto({
  device,
  lang,
  sizes,
  className,
  priority,
}: {
  device: LeaseDevice;
  lang: Lang;
  sizes: string;
  className?: string;
  priority?: boolean;
}) {
  const photo = device.deviceId ? LATEST_DEVICES.find((d) => d.id === device.deviceId) : undefined;
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

export function LeaseCard({ device, lang }: { device: LeaseDevice; lang: Lang }) {
  const t = LEASE_COPY[lang];
  const from = leaseFrom(device);
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
        <div className="mt-3">
          <p className="text-xs text-muted-foreground">{t.from}</p>
          <p className="font-display text-2xl font-semibold tabular-nums">
            <Money usd={from.lease} />
          </p>
          {from.weekly && (
            <p className="text-xs font-semibold tabular-nums text-primary">
              <Money usd={from.weekly} />
              {t.perWeek}
            </p>
          )}
        </div>
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

/** Buy-in-full / leasing / estimated payments for one option. */
export function OptionPrices({ option, lang }: { option: LeaseOption; lang: Lang }) {
  const t = LEASE_COPY[lang];
  const est = (
    [
      [t.weekly, option.weekly],
      [t.biweekly, option.biweekly],
      [t.monthly, option.monthly],
    ] as const
  ).filter(([, v]) => v);
  return (
    <div className="rounded-2xl border bg-card p-4 sm:p-5">
      <dl className="grid grid-cols-2 gap-3">
        <div className="rounded-xl bg-primary/10 p-3">
          <dt className="text-xs font-semibold text-primary">{t.leasingPrice}</dt>
          <dd className="mt-1 font-display text-2xl font-semibold tabular-nums">
            <Money usd={option.lease} />
          </dd>
        </div>
        <div className="rounded-xl bg-secondary p-3">
          <dt className="text-xs font-semibold text-muted-foreground">{t.buyInFull}</dt>
          <dd className="mt-1 font-display text-2xl font-semibold tabular-nums">
            {option.cash ? <Money usd={option.cash} /> : t.callPrice}
          </dd>
        </div>
      </dl>
      <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        {t.estPayments}
      </p>
      {est.length ? (
        <dl className="mt-2 grid grid-cols-3 gap-2">
          {est.map(([label, v]) => (
            <div key={label} className="rounded-xl border p-2.5 text-center">
              <dt className="text-[11px] text-muted-foreground">{label}</dt>
              <dd className="mt-0.5 font-semibold tabular-nums">
                <Money usd={v!} />
              </dd>
            </div>
          ))}
        </dl>
      ) : (
        <p className="mt-2 text-sm text-muted-foreground">{t.noEstimate}</p>
      )}
    </div>
  );
}
