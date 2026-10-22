import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BadgeCheck,
  CircleCheck,
  IdCard,
  MapPin,
  Phone,
  ShieldCheck,
  Store,
} from "lucide-react";
import { useState } from "react";

import { MoneyText } from "@/components/intl/money";
import { devicePaths } from "@/components/products/device-paths";
import {
  deviceTitle,
  SPEC_LABELS,
  SPECS_NOTE,
  specValue,
  type DeviceDetail,
} from "@/components/products/devices";
import { deviceFaqs, inventoryDate } from "@/components/products/device-faqs";
import { LATEST_DEVICES, type Device } from "@/components/products/inventory";
import { LatestDevices } from "@/components/products/latest-devices";
import { servicePath } from "@/components/services/paths";
import { DIRECTIONS, TEL } from "@/components/site/business";
import { MobileCallBar, OpenBadge, SiteFooter, SiteHeader } from "@/components/site/chrome";
import { FaqList } from "@/components/site/faq";
import { LeasingPortals, PORTALS, PortalButton } from "@/components/site/leasing-portals";
import { ALTERNATES, type Lang } from "@/components/site/seo";
import { cn } from "@/lib/utils";

const UI = {
  en: {
    home: "Home",
    phones: "Unlocked phones",
    tablets: "Laptops & tablets",
    inStore: "In store now",
    updated: (d: string) => `On our shelves ${d}`,
    leaseTitle: "Lease-to-own · no credit needed",
    leaseBody: (usd: number) =>
      `As low as $${usd} down, subject to approval. Apply online in minutes, then pick it up in store.`,
    call: "Call to check stock",
    directions: "Directions",
    product: "Product photo",
    shelf: "On our shelf",
    caseView: "Our display case",
    photo: (n: number) => `Show photo ${n}`,
    credit: "Photo",
    highlightsTitle: "Highlights",
    overviewTitle: "About this device",
    specsTitle: "Specs",
    stepsTitle: "Take it home today",
    steps: [
      [
        BadgeCheck,
        "Apply online",
        "Pick a lease-to-own partner above. It takes a few minutes from your phone.",
      ],
      [IdCard, "Bring your ID", "Come to 3640 Hillcroft St, Suite C with a valid photo ID."],
      [Store, "Pick it up", "Choose your device at the counter and take it home the same day."],
    ] as const,
    faqTitle: "Questions about this device",
    more: "More devices in store",
    released: (y: number) => `Released ${y}`,
  },
  es: {
    home: "Inicio",
    phones: "Celulares desbloqueados",
    tablets: "Laptops y tabletas",
    inStore: "En tienda",
    updated: (d: string) => `En vitrina el ${d}`,
    leaseTitle: "Arrendamiento · sin necesidad de crédito",
    leaseBody: (usd: number) =>
      `Desde $${usd} de enganche, sujeto a aprobación. Solicita en línea en minutos y recoge en la tienda.`,
    call: "Llama para ver existencias",
    directions: "Cómo llegar",
    product: "Foto del producto",
    shelf: "En nuestra vitrina",
    caseView: "Nuestra vitrina",
    photo: (n: number) => `Ver foto ${n}`,
    credit: "Foto",
    highlightsTitle: "Lo más destacado",
    overviewTitle: "Sobre este equipo",
    specsTitle: "Especificaciones",
    stepsTitle: "Llévatelo hoy",
    steps: [
      [
        BadgeCheck,
        "Solicita en línea",
        "Elige uno de nuestros socios de arrendamiento. Toma unos minutos desde tu celular.",
      ],
      [
        IdCard,
        "Trae tu ID",
        "Ven a 3640 Hillcroft St, Suite C con una identificación con foto vigente.",
      ],
      [Store, "Recógelo", "Elige tu equipo en el mostrador y llévatelo el mismo día."],
    ] as const,
    faqTitle: "Preguntas sobre este equipo",
    more: "Más equipos en tienda",
    released: (y: number) => `Salió en ${y}`,
  },
};

type Slide = {
  src: string;
  w: number;
  h: number;
  alt: string;
  label: string;
  contain?: boolean;
  credit?: { author: string; license: string; href: string } | undefined;
};

function slides(device: Device, detail: DeviceDetail, lang: Lang): Slide[] {
  const t = UI[lang];
  const list: Slide[] = [detail.photo, ...(detail.morePhotos ?? [])].flatMap((p) =>
    p
      ? [
          {
            src: p.src,
            w: p.w,
            h: p.h,
            alt: p.alt[lang],
            label: p.credit ? t.product : t.shelf,
            contain: !p.cover,
            credit: p.credit,
          },
        ]
      : [],
  );
  // Catalog devices use their web photo as the card image; don't show it twice.
  if (!list.some((sl) => sl.src === device.image))
    list.push({
      src: device.image,
      w: device.w,
      h: device.h,
      alt: device.alt[lang],
      label: t.shelf,
      contain: true,
    });
  if (device.kind === "galaxy-a" && !device.image.includes("galaxy-a-row")) {
    list.push({
      src: "/photos/devices/galaxy-a-row.webp",
      w: 800,
      h: 200,
      alt:
        lang === "en"
          ? "Samsung Galaxy A-series boxes in our display case"
          : "Cajas de Samsung Galaxy serie A en nuestra vitrina",
      label: t.caseView,
      contain: true,
    });
  } else if (device.kind !== "galaxy-a") {
    list.push({
      src: "/photos/phones-display.jpg",
      w: 900,
      h: 675,
      alt:
        lang === "en"
          ? "Phones and iPads in the TIC Wireless display case"
          : "Celulares y iPads en la vitrina de TIC Wireless",
      label: t.caseView,
    });
  }
  return list;
}

function Gallery({ device, detail, lang }: { device: Device; detail: DeviceDetail; lang: Lang }) {
  const t = UI[lang];
  const items = slides(device, detail, lang);
  const [active, setActive] = useState(0);
  const current = items[active] ?? items[0];
  if (!current) return null;
  const credit = current.credit;
  return (
    <figure>
      <div className="relative aspect-square overflow-hidden rounded-[2rem] bg-white ring-1 ring-white/10">
        <img
          key={current.src}
          src={current.src}
          alt={current.alt}
          width={current.w}
          height={current.h}
          fetchPriority={active === 0 ? "high" : undefined}
          decoding="async"
          className={cn(
            "absolute inset-0 h-full w-full animate-rise",
            current.contain ? "object-contain p-4 sm:p-6" : "object-cover",
          )}
        />
        {device.fiveG && (
          <span className="absolute left-4 top-4 rounded-full bg-ink px-3 py-1 text-xs font-bold text-white">
            5G
          </span>
        )}
        <span className="absolute bottom-4 left-4 rounded-full bg-ink/75 px-3 py-1 text-xs font-semibold text-white backdrop-blur">
          {current.label}
        </span>
      </div>
      {items.length > 1 && (
        <div
          className="mt-3 flex gap-2"
          role="group"
          aria-label={lang === "en" ? "Photos" : "Fotos"}
        >
          {items.map((s, i) => (
            <button
              key={s.src}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`${t.photo(i + 1)}: ${s.label}`}
              aria-pressed={i === active}
              className={cn(
                "relative h-16 w-16 shrink-0 overflow-hidden rounded-2xl bg-white ring-2 transition sm:h-20 sm:w-20",
                i === active ? "ring-primary" : "ring-transparent opacity-70 hover:opacity-100",
              )}
            >
              <img
                src={s.src}
                alt=""
                width={s.w}
                height={s.h}
                loading="lazy"
                decoding="async"
                className={cn("h-full w-full", s.contain ? "object-contain p-1" : "object-cover")}
              />
            </button>
          ))}
        </div>
      )}
      {credit && (
        <figcaption className="mt-2 text-[11px] text-white/55">
          {t.credit}:{" "}
          <a
            href={credit.href}
            target="_blank"
            rel="noopener noreferrer"
            className="underline-offset-2 hover:underline"
          >
            {credit.author}, {credit.license}
          </a>{" "}
          · Wikimedia Commons
        </figcaption>
      )}
    </figure>
  );
}

export function DevicePage({
  device,
  detail,
  lang,
}: {
  device: Device;
  detail: DeviceDetail;
  lang: Lang;
}) {
  const t = UI[lang];
  const tablet = device.kind === "ipad";
  const parent: [string, string] = tablet
    ? [t.tablets, ALTERNATES.laptops[lang]]
    : [t.phones, servicePath(lang, "unlocked-phones")];
  const others = LATEST_DEVICES.filter((d) => d.id !== device.id);
  // Same model family first (other iPhone 16s on an iPhone 16 page), then the same kind.
  const rank = (d: Device) =>
    d.family && d.family === device.family ? 0 : d.kind === device.kind ? 1 : 2;
  // Same kind first, so a Galaxy A page suggests other Galaxy A phones.
  others.sort((a, b) => rank(a) - rank(b));
  const faqs = deviceFaqs(device, lang, deviceTitle(device, detail), detail.leaseFrom ?? 40);

  return (
    <main className="overflow-x-hidden">
      <SiteHeader lang={lang} paths={devicePaths(device.id)} />

      {/* Hero: gallery + buy box */}
      <section className="relative isolate overflow-hidden bg-ink text-white">
        <div className="grain absolute inset-0 -z-10 opacity-60" />
        <div className="absolute -right-40 top-10 -z-10 h-[34rem] w-[34rem] rounded-full bg-primary/20 blur-[150px]" />
        <div className="mx-auto grid max-w-7xl gap-8 px-5 pb-12 pt-28 md:pt-32 lg:grid-cols-[1fr_1.05fr] lg:gap-10 lg:pb-16">
          <div className="lg:col-start-2 lg:row-start-1">
            <nav
              aria-label="Breadcrumb"
              className="mb-6 flex flex-wrap items-center gap-1.5 text-sm text-white/60"
            >
              <Link to={ALTERNATES.home[lang]} className="hover:text-white">
                {t.home}
              </Link>
              <span>/</span>
              <Link to={parent[1]} className="hover:text-white">
                {parent[0]}
              </Link>
              <span>/</span>
              <span className="text-white/85">{device.name}</span>
            </nav>
            <p className="eyebrow flex flex-wrap items-center gap-3 text-primary">
              <span className="h-px w-8 bg-primary" /> {device.brand} · {t.released(detail.year)}
            </p>
            <h1 className="mt-4 text-[clamp(2.25rem,5.5vw,4rem)] font-semibold leading-[1.02]">
              {deviceTitle(device, detail)}
            </h1>
            <p className="mt-4 max-w-xl text-lg leading-relaxed text-white/75">
              {detail.tagline[lang]}
            </p>
            <p className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
              <span className="inline-flex items-center gap-2 font-semibold text-emerald-400">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-70" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                </span>
                {t.inStore}
              </span>
              <span className="text-white/60">{t.updated(inventoryDate(lang))}</span>
              <OpenBadge lang={lang} className="text-white/70" />
            </p>
          </div>

          <div className="lg:col-start-1 lg:row-span-2 lg:row-start-1">
            <Gallery device={device} detail={detail} lang={lang} />
          </div>

          {/* Buy box */}
          <div className="rounded-[2rem] bg-white/[0.06] p-5 ring-1 ring-white/10 sm:p-7 lg:col-start-2 lg:row-start-2 lg:self-start">
            <p className="font-display text-xl font-semibold">{t.leaseTitle}</p>
            <p className="mt-1 text-sm leading-relaxed text-white/70">
              <MoneyText text={t.leaseBody(detail.leaseFrom ?? 40)} />
            </p>
            <div className="mt-5 grid gap-2">
              {PORTALS.map((p) => (
                <PortalButton
                  key={p.id}
                  portal={p}
                  lang={lang}
                  className="w-full bg-primary px-4 text-primary-foreground hover:brightness-110"
                />
              ))}
            </div>
            <div className="mt-3 grid gap-2 sm:grid-cols-2">
              <a
                href={TEL}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-white px-5 text-sm font-bold text-ink transition hover:bg-white/90"
              >
                <Phone className="h-4 w-4" /> {t.call}
              </a>
              <a
                href={DIRECTIONS}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-white/20 px-5 text-sm font-bold transition hover:border-white/60"
              >
                <MapPin className="h-4 w-4" /> {t.directions}
              </a>
            </div>
            <p className="mt-4 flex items-start gap-2 text-xs leading-relaxed text-white/55">
              <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
              {lang === "en"
                ? "Each application opens on the provider's own secure site. Lease-to-own is not a loan."
                : "Cada solicitud se abre en el sitio seguro del proveedor. El arrendamiento no es un préstamo."}
            </p>
          </div>
        </div>
      </section>

      {/* Highlights */}
      <section className="mx-auto max-w-7xl px-5 pt-12 md:pt-16" aria-labelledby="highlights">
        <h2 id="highlights" className="text-3xl font-semibold md:text-4xl">
          {t.highlightsTitle}
        </h2>
        <ul className="mt-8 grid grid-cols-2 gap-3 lg:grid-cols-4">
          {detail.highlights.map((h) => (
            <li key={h.en} className="flex flex-col gap-3 rounded-3xl border bg-card p-5 sm:p-6">
              <CircleCheck className="h-5 w-5 text-primary" />
              <span className="font-display font-semibold leading-snug sm:text-lg">{h[lang]}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Overview + specs */}
      <section className="mx-auto grid max-w-7xl gap-8 px-5 py-12 md:py-16 lg:grid-cols-[1fr_1.2fr]">
        <div>
          <h2 className="text-3xl font-semibold md:text-4xl">{t.overviewTitle}</h2>
          <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
            {detail.summary[lang]}
          </p>
          <h3 className="mt-8 text-xl font-semibold">{t.stepsTitle}</h3>
          <ol className="mt-5 space-y-4">
            {t.steps.map(([Icon, title, body]) => (
              <li key={title} className="flex gap-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
                  <Icon className="h-5 w-5" />
                </span>
                <span>
                  <span className="block font-semibold">{title}</span>
                  <span className="block text-sm leading-relaxed text-muted-foreground">
                    {body}
                  </span>
                </span>
              </li>
            ))}
          </ol>
          <a
            href="#apply"
            className="mt-8 inline-flex min-h-12 items-center gap-2 rounded-full bg-ink px-6 font-semibold text-white transition hover:bg-ink-soft"
          >
            {lang === "en" ? "Apply for leasing" : "Solicita arrendamiento"}{" "}
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>

        <div>
          <h2 className="text-3xl font-semibold md:text-4xl">{t.specsTitle}</h2>
          <dl className="mt-6 overflow-hidden rounded-3xl border bg-card">
            {detail.specs.map(([key, value]) => (
              <div
                key={key}
                className="grid gap-1 border-b px-5 py-4 last:border-b-0 sm:grid-cols-[10rem_1fr] sm:gap-4 sm:px-6"
              >
                <dt className="text-xs font-semibold uppercase tracking-wider text-muted-foreground sm:pt-0.5">
                  {SPEC_LABELS[key][lang]}
                </dt>
                <dd className="font-medium leading-snug">{specValue(value, lang)}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-3 text-xs leading-relaxed text-muted-foreground">{SPECS_NOTE[lang]}</p>
        </div>
      </section>

      <LeasingPortals lang={lang} />

      {/* FAQ */}
      <section className="mx-auto max-w-7xl px-5 py-12 md:py-16">
        <div className="grid gap-8 lg:grid-cols-[1fr_1.6fr]">
          <h2 className="text-3xl font-semibold leading-tight md:text-4xl">{t.faqTitle}</h2>
          <FaqList items={faqs} />
        </div>
      </section>

      <LatestDevices
        devices={others}
        lang={lang}
        title={t.more}
        limit={12}
        className="border-t bg-secondary/40"
      />

      <SiteFooter lang={lang} portals={false} />
      <MobileCallBar lang={lang} />
    </main>
  );
}
