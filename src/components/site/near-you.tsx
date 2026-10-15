import { Link } from "@tanstack/react-router";
import { ArrowRight, Car, MapPin } from "lucide-react";

import { AREAS, areaName } from "@/components/areas/data";
import { areaPath } from "@/components/areas/paths";
import { ALTERNATES, type Lang } from "@/components/site/seo";
import { cn } from "@/lib/utils";

// "Near you": the neighborhoods around the store with drive times (src/components/areas/data.ts,
// OpenStreetMap routing without traffic), each linking to its area page.
const T = {
  en: {
    kicker: "Near you",
    title: "Serving Southwest Houston from Hillcroft.",
    body: "We're at 3640 Hillcroft St, Suite C, Houston, TX 77057 — near Hillcroft & Windswept, just north of the Westpark Tollway. Drive times without traffic:",
    min: (n: number) => `~${n} min`,
    all: "All areas we serve",
  },
  es: {
    kicker: "Cerca de ti",
    title: "Atendemos el suroeste de Houston desde Hillcroft.",
    body: "Estamos en 3640 Hillcroft St, Suite C, Houston, TX 77057, cerca de Hillcroft y Windswept, justo al norte del Westpark Tollway. Tiempo en carro sin tráfico:",
    min: (n: number) => `~${n} min`,
    all: "Todas las zonas que atendemos",
  },
};

const BY_DISTANCE = [...AREAS].sort((a, b) => a.minutes - b.minutes || a.miles - b.miles);

export function NearYou({ lang, className }: { lang: Lang; className?: string }) {
  const t = T[lang];
  return (
    <section aria-labelledby="near-you" className={cn("border-t bg-secondary/40", className)}>
      <div className="mx-auto max-w-7xl px-5 py-10 md:py-12">
        <p className="eyebrow flex items-center gap-2 text-slate">
          <MapPin className="h-4 w-4 text-primary" /> {t.kicker}
        </p>
        <h2
          id="near-you"
          className="mt-3 max-w-3xl text-2xl font-semibold leading-tight md:text-3xl"
        >
          {t.title}
        </h2>
        <p className="mt-3 max-w-3xl leading-relaxed text-muted-foreground">{t.body}</p>
        <ul className="mt-6 flex flex-wrap gap-2">
          {BY_DISTANCE.map((a) => (
            <li key={a.slug}>
              <Link
                to={areaPath(lang, a.slug)}
                className="inline-flex min-h-10 items-center gap-2 rounded-full border bg-card px-4 py-2 text-sm font-semibold text-ink transition hover:border-primary hover:text-primary"
              >
                {areaName(a, lang).replace(/ \(.*\)$/, "")}
                <span className="flex items-center gap-1 text-xs font-medium text-muted-foreground">
                  <Car className="h-3.5 w-3.5" aria-hidden="true" /> {t.min(a.minutes)}
                </span>
              </Link>
            </li>
          ))}
        </ul>
        <Link
          to={ALTERNATES.areas[lang]}
          className="tap mt-6 inline-flex items-center gap-1.5 font-semibold text-ink underline decoration-primary decoration-2 underline-offset-4"
        >
          {t.all} <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}
