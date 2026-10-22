import { Link } from "@tanstack/react-router";
import { ArrowRight, Phone } from "lucide-react";

import { INVENTORY_UPDATED, LATEST_DEVICES, type Device } from "@/components/products/inventory";
import { TEL } from "@/components/site/business";
import { Scroller } from "@/components/site/scroller";
import { ALTERNATES, type Lang } from "@/components/site/seo";
import { cn } from "@/lib/utils";

const T = {
  en: {
    kicker: "In store now",
    title: "Phones and tablets on our shelves.",
    body: "In stock at 3640 Hillcroft St on the date shown and available with leasing — no credit needed, as low as $40 down, subject to approval. Stock changes quickly, so call to confirm, and ask us which carriers each phone works with.",
    updated: (d: string) => `Updated ${d}`,
    inStore: "In store now",
    details: "Details",
    call: "Call to check stock",
    lease: "Apply for leasing",
    prev: "Previous devices",
    next: "More devices",
    seeAll: (n: number) => `See all ${n} devices`,
    seeAllBody: "Every iPhone, Galaxy and iPad we have, by model.",
  },
  es: {
    kicker: "Recién llegados",
    title: "Celulares y tabletas en nuestras vitrinas.",
    body: "Disponibles en 3640 Hillcroft St en la fecha indicada y con arrendamiento: sin necesidad de crédito, desde $40 de enganche, sujeto a aprobación. El inventario cambia rápido, así que llama para confirmar y pregúntanos con qué compañías funciona cada celular.",
    updated: (d: string) => `Actualizado el ${d}`,
    inStore: "En tienda",
    details: "Ver más",
    call: "Llama para ver existencias",
    lease: "Solicita arrendamiento",
    prev: "Equipos anteriores",
    next: "Más equipos",
    seeAll: (n: number) => `Ver los ${n} equipos`,
    seeAllBody: "Todos los iPhone, Galaxy y iPad que tenemos, por modelo.",
  },
};

/** One device: photo, name and a link to its page. Used by the scrollers and /devices. */
export function DeviceCard({ device: d, lang }: { device: Device; lang: Lang }) {
  const t = T[lang];
  const href = d.page?.[lang];
  return (
    <article className="relative flex h-full flex-col overflow-hidden rounded-3xl border bg-card transition hover:-translate-y-0.5 hover:shadow-lg hover:shadow-ink/5">
      <div
        className={cn(
          "relative aspect-[4/3] overflow-hidden",
          d.fit === "contain" ? "bg-white" : "bg-secondary",
        )}
      >
        <img
          src={d.image}
          alt={d.alt[lang]}
          width={d.w}
          height={d.h}
          loading="lazy"
          decoding="async"
          className={cn(
            "absolute inset-0 h-full w-full",
            d.fit === "contain" ? "object-contain p-3" : "object-cover",
          )}
        />
        {d.fiveG && (
          <span className="absolute right-3 top-3 rounded-full bg-ink px-2.5 py-1 text-xs font-bold text-white">
            5G
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col p-4">
        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          {d.brand}
          {d.year ? ` · ${d.year}` : ""}
        </p>
        <h3 className="mt-0.5 font-display text-lg font-semibold leading-snug">
          {href ? (
            // Stretched link: the whole card opens the device's page.
            <Link
              to={href}
              className="after:absolute after:inset-0 after:content-[''] hover:text-primary"
            >
              {d.name}
            </Link>
          ) : (
            d.name
          )}
        </h3>
        {d.note && <p className="mt-0.5 text-sm text-muted-foreground">{d.note[lang]}</p>}
        <p className="mt-auto flex items-center gap-1.5 pt-3 text-xs font-semibold text-emerald-700">
          <span className="h-2 w-2 rounded-full bg-emerald-500" aria-hidden="true" />
          {t.inStore}
          {href && (
            <span className="ml-auto inline-flex items-center gap-1 text-ink">
              {t.details} <ArrowRight className="h-3.5 w-3.5 text-primary" />
            </span>
          )}
        </p>
      </div>
    </article>
  );
}

export function LatestDevices({
  devices,
  lang,
  title,
  className,
  limit,
}: {
  devices: Device[];
  lang: Lang;
  /** Override the section heading (e.g. "iPads in store"). */
  title?: string;
  className?: string;
  /** Show at most this many, then a "See all devices" card. */
  limit?: number;
}) {
  const t = T[lang];
  const date = new Date(`${INVENTORY_UPDATED}T12:00:00`).toLocaleDateString(
    lang === "en" ? "en-US" : "es-MX",
    { month: "short", day: "numeric", year: "numeric" },
  );
  const shown = limit ? devices.slice(0, limit) : devices;
  const more = shown.length < devices.length;
  return (
    <section
      id="latest"
      aria-labelledby="latest-title"
      className={cn("scroll-mt-24 py-10 md:py-14", className)}
    >
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-2 px-5">
          <div className="max-w-2xl">
            <p className="eyebrow text-primary">{t.kicker}</p>
            <h2 id="latest-title" className="mt-2 text-3xl font-semibold leading-tight sm:text-4xl">
              {title ?? t.title}
            </h2>
            <p className="mt-2 text-muted-foreground">{t.body}</p>
          </div>
          <div className="flex items-center gap-4">
            <p className="text-xs font-medium text-muted-foreground">{t.updated(date)}</p>
            {more && (
              <Link
                to={ALTERNATES.devices[lang]}
                className="tap inline-flex items-center gap-1.5 text-sm font-semibold text-ink underline decoration-primary decoration-2 underline-offset-4"
              >
                {t.seeAll(LATEST_DEVICES.length)} <ArrowRight className="h-4 w-4" />
              </Link>
            )}
          </div>
        </div>

        <Scroller label={title ?? t.title} prevLabel={t.prev} nextLabel={t.next} className="mt-4">
          {shown.map((d) => (
            <li key={d.id} className="w-[72%] shrink-0 snap-start sm:w-60 lg:w-64">
              <DeviceCard device={d} lang={lang} />
            </li>
          ))}
          {more && (
            <li className="w-[72%] shrink-0 snap-start sm:w-60 lg:w-64">
              <Link
                to={ALTERNATES.devices[lang]}
                className="group flex h-full min-h-64 flex-col justify-between rounded-3xl bg-ink p-6 text-white transition hover:-translate-y-0.5"
              >
                <span>
                  <span className="block font-display text-2xl font-semibold leading-tight">
                    {t.seeAll(LATEST_DEVICES.length)}
                  </span>
                  <span className="mt-2 block text-sm text-white/70">{t.seeAllBody}</span>
                </span>
                <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
                  {lang === "en" ? "All devices" : "Todos los equipos"}
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                </span>
              </Link>
            </li>
          )}
        </Scroller>

        <div className="mt-4 flex flex-col gap-2 px-5 sm:flex-row">
          <a
            href={TEL}
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-ink px-6 font-semibold text-white"
          >
            <Phone className="h-4 w-4" /> {t.call}
          </a>
          <Link
            to={ALTERNATES.leasing[lang]}
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border px-6 font-semibold hover:border-primary hover:text-primary"
          >
            {t.lease} <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
