import {
  BatteryWarning,
  CircleCheck,
  Clock,
  Cpu,
  Laptop,
  KeyRound,
  Phone,
  PlugZap,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Tablet,
  Wrench,
} from "lucide-react";

import { PHONE, TEL } from "@/components/site/business";
import type { Lang } from "@/components/site/seo";
import { cn } from "@/lib/utils";

// The phone-repair page's own sections (the prepaid page has PrepaidPlans the same way): a jump
// bar, the repairs as cards, the devices we work on, the four steps as a timeline and a
// "before you come" panel. Facts only from the page's existing copy (services/data.ts): what we
// repair, that most screen / battery / charging-port repairs are same day, walk-ins, price first.

type L = Record<Lang, string>;
const l = (en: string, es: string): L => ({ en, es });

const REPAIRS: { icon: typeof Smartphone; title: L; body: L; sameDay?: true }[] = [
  {
    icon: Smartphone,
    title: l("Cracked screens", "Pantallas rotas"),
    body: l(
      "Broken or cracked screens on iPhone, Samsung and other Android phones.",
      "Pantallas rotas o estrelladas de iPhone, Samsung y otros Android.",
    ),
    sameDay: true,
  },
  {
    icon: BatteryWarning,
    title: l("Battery replacement", "Cambio de batería"),
    body: l(
      "For phones that drain fast or shut off on their own.",
      "Para celulares que se descargan rápido o se apagan solos.",
    ),
    sameDay: true,
  },
  {
    icon: PlugZap,
    title: l("Charging port repair", "Puerto de carga"),
    body: l(
      "When your phone won't charge or won't connect to a cable.",
      "Cuando tu celular no carga o no conecta con el cable.",
    ),
    sameDay: true,
  },
  {
    icon: Cpu,
    title: l("Software & setup", "Software y configuración"),
    body: l(
      "Software problems fixed, plus help setting up your phone.",
      "Arreglamos problemas de software y te ayudamos a configurar tu celular.",
    ),
  },
  {
    icon: Laptop,
    title: l("Tablets, laptops & computers", "Tabletas, laptops y computadoras"),
    body: l(
      "Repairs for tablets, laptops and computers too.",
      "También reparamos tabletas, laptops y computadoras.",
    ),
  },
  {
    icon: ShieldCheck,
    title: l("Glass & cases after", "Mica y funda al final"),
    body: l(
      "We fit tempered glass and a case so it doesn't happen again.",
      "Te ponemos mica de vidrio templado y funda para que no vuelva a pasar.",
    ),
  },
];

const DEVICES: { icon: typeof Smartphone; name: L }[] = [
  { icon: Smartphone, name: l("iPhone", "iPhone") },
  { icon: Smartphone, name: l("Samsung Galaxy", "Samsung Galaxy") },
  { icon: Smartphone, name: l("Other Android", "Otros Android") },
  { icon: Tablet, name: l("Tablets & iPad", "Tabletas e iPad") },
  { icon: Laptop, name: l("Laptops", "Laptops") },
  { icon: Cpu, name: l("Computers", "Computadoras") },
];

const T = {
  en: {
    nav: [
      ["repairs", "Repairs"],
      ["how", "How it works"],
      ["before", "Before you come"],
      ["faq", "FAQ"],
      ["visit", "Visit"],
    ],
    navLabel: "On this page",
    kicker: "Repairs",
    title: "What we fix",
    sub: "Walk in with any of these — we check it in front of you and quote the price before any work starts.",
    sameDay: "Usually same day",
    devices: "Devices we work on",
    howKicker: "How it works",
    beforeTitle: "Before you come",
    tips: [
      [KeyRound, "Bring your passcode", "So we can test the phone after the repair."],
      [
        Sparkles,
        "Back up if you can",
        "If the screen still works, back up to iCloud or Google first.",
      ],
      [Clock, "No appointment needed", "Monday–Saturday 9 AM–8 PM, Sunday 9 AM–5 PM."],
    ] as const,
    quoteTitle: "Want a price first?",
    quoteBody:
      "Call with your phone's model and what's wrong — we'll give you a quote before you come in.",
    quoteCta: "Call for a quote",
  },
  es: {
    nav: [
      ["repairs", "Reparaciones"],
      ["how", "Cómo funciona"],
      ["before", "Antes de venir"],
      ["faq", "Preguntas"],
      ["visit", "Visítanos"],
    ],
    navLabel: "En esta página",
    kicker: "Reparaciones",
    title: "Lo que reparamos",
    sub: "Ven con cualquiera de estos: lo revisamos frente a ti y te damos el precio antes de empezar.",
    sameDay: "Casi siempre el mismo día",
    devices: "Equipos que reparamos",
    howKicker: "Cómo funciona",
    beforeTitle: "Antes de venir",
    tips: [
      [KeyRound, "Trae tu código", "Para probar el celular después de la reparación."],
      [
        Sparkles,
        "Respalda si puedes",
        "Si la pantalla todavía funciona, respalda en iCloud o Google.",
      ],
      [Clock, "No necesitas cita", "Lunes a sábado 9 AM–8 PM, domingo 9 AM–5 PM."],
    ] as const,
    quoteTitle: "¿Quieres saber el precio antes?",
    quoteBody:
      "Llama con el modelo de tu celular y la falla: te damos una cotización antes de venir.",
    quoteCta: "Llamar para cotizar",
  },
};

/** Sticky jump links for the repair page; ids match the sections below and the page's FAQ/visit. */
export function RepairJumpBar({ lang }: { lang: Lang }) {
  const t = T[lang];
  return (
    <nav
      aria-label={t.navLabel}
      className="sticky top-[76px] z-30 border-b bg-background/90 backdrop-blur md:top-[84px]"
    >
      <ul className="mx-auto flex max-w-7xl gap-2 overflow-x-auto px-5 py-3 [scrollbar-width:none]">
        {t.nav.map(([id, label]) => (
          <li key={id} className="shrink-0">
            <a
              href={`#${id}`}
              className="inline-flex min-h-10 items-center rounded-full border bg-card px-4 text-sm font-semibold transition hover:border-primary hover:text-primary"
            >
              {label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export function RepairSection({
  lang,
  stepsTitle,
  steps,
}: {
  lang: Lang;
  stepsTitle: string;
  steps: [string, string][];
}) {
  const t = T[lang];
  return (
    <>
      <RepairJumpBar lang={lang} />

      {/* What we fix */}
      <section id="repairs" aria-labelledby="repairs-title" className="scroll-mt-40">
        <div className="mx-auto max-w-7xl px-5 py-12 md:py-16">
          <p className="eyebrow flex items-center gap-3 text-primary">
            <span className="h-px w-8 bg-primary" /> {t.kicker}
          </p>
          <h2 id="repairs-title" className="mt-3 text-3xl font-semibold md:text-5xl">
            {t.title}
          </h2>
          <p className="mt-3 max-w-2xl text-lg text-muted-foreground">{t.sub}</p>

          <ul className="mt-8 grid gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
            {REPAIRS.map(({ icon: Icon, title, body, sameDay }) => (
              <li
                key={title.en}
                className="group flex gap-4 rounded-3xl border bg-card p-5 transition hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-lg hover:shadow-ink/5 sm:p-6"
              >
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary transition group-hover:bg-primary group-hover:text-primary-foreground">
                  <Icon className="h-6 w-6" />
                </span>
                <span className="min-w-0">
                  <span className="flex flex-wrap items-center gap-2">
                    <span className="font-display text-lg font-semibold leading-snug">
                      {title[lang]}
                    </span>
                    {sameDay && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-success/15 px-2 py-0.5 text-[11px] font-bold text-success">
                        <Clock className="h-3 w-3" /> {t.sameDay}
                      </span>
                    )}
                  </span>
                  <span className="mt-1 block text-sm leading-relaxed text-muted-foreground">
                    {body[lang]}
                  </span>
                </span>
              </li>
            ))}
          </ul>

          {/* Devices */}
          <div className="mt-8 rounded-3xl bg-secondary/70 p-5 sm:p-6">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              {t.devices}
            </p>
            <ul className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-6">
              {DEVICES.map(({ icon: Icon, name }) => (
                <li
                  key={name.en}
                  className="flex items-center gap-2 rounded-2xl bg-card px-3 py-2.5 text-sm font-semibold"
                >
                  <Icon className="h-4 w-4 shrink-0 text-primary" /> {name[lang]}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* How it works: a timeline, across on desktop and down on phones */}
      <section
        id="how"
        aria-labelledby="how-title"
        className="scroll-mt-40 border-y bg-ink text-white"
      >
        <div className="mx-auto max-w-7xl px-5 py-12 md:py-16">
          <p className="eyebrow flex items-center gap-3 text-primary">
            <span className="h-px w-8 bg-primary" /> {t.howKicker}
          </p>
          <h2 id="how-title" className="mt-3 text-3xl font-semibold md:text-5xl">
            {stepsTitle}
          </h2>
          <ol className="relative mt-10 grid gap-8 md:grid-cols-4 md:gap-6">
            {/* connecting line */}
            <span
              aria-hidden="true"
              className="absolute left-5 top-5 h-[calc(100%-2.5rem)] w-px bg-white/15 md:left-5 md:right-5 md:top-5 md:h-px md:w-auto"
            />
            {steps.map(([h, p], i) => (
              <li key={h} className="relative flex gap-4 md:block">
                <span
                  className={cn(
                    "relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full font-display font-bold",
                    i === steps.length - 1
                      ? "bg-primary text-primary-foreground"
                      : "bg-white text-ink",
                  )}
                >
                  {i === steps.length - 1 ? <CircleCheck className="h-5 w-5" /> : i + 1}
                </span>
                <span className="block md:mt-5">
                  <span className="block font-display text-lg font-semibold">{h}</span>
                  <span className="mt-1 block text-sm leading-relaxed text-white/70">{p}</span>
                </span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Before you come + quote */}
      <section id="before" aria-labelledby="before-title" className="scroll-mt-40">
        <div className="mx-auto grid max-w-7xl gap-4 px-5 py-12 md:py-16 lg:grid-cols-[1.4fr_1fr]">
          <div className="rounded-3xl border bg-card p-6 sm:p-8">
            <h2 id="before-title" className="text-2xl font-semibold md:text-3xl">
              {t.beforeTitle}
            </h2>
            <ul className="mt-6 grid gap-5 sm:grid-cols-3">
              {t.tips.map(([Icon, h, p]) => (
                <li key={h}>
                  <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="mt-3 block font-semibold">{h}</span>
                  <span className="mt-1 block text-sm leading-relaxed text-muted-foreground">
                    {p}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div className="relative isolate flex flex-col justify-between overflow-hidden rounded-3xl bg-primary p-6 text-primary-foreground sm:p-8">
            <Wrench className="pointer-events-none absolute -bottom-8 -right-8 -z-10 h-32 w-32 rotate-12 opacity-10" aria-hidden="true" />
            <div>
              <h2 className="text-2xl font-semibold md:text-3xl">{t.quoteTitle}</h2>
              <p className="mt-2 leading-relaxed opacity-90">{t.quoteBody}</p>
            </div>
            <a
              href={TEL}
              className="mt-6 inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-ink px-6 font-bold text-white transition hover:bg-ink/85"
            >
              <Phone className="h-4 w-4" /> {t.quoteCta} · {PHONE}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
