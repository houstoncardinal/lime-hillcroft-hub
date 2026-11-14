import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BadgeDollarSign,
  BatteryCharging,
  CircleCheck,
  CloudUpload,
  HardDrive,
  KeyRound,
  LockOpen,
  Phone,
  Plug,
  Repeat,
  ScanSearch,
  Smartphone,
  Tablet,
  UserX,
} from "lucide-react";

import { LEASE_FEATURED, LEASE_PATHS } from "@/components/lease/catalog";
import { LeaseGrid } from "@/components/lease/lease-ui";
import { PHONE, TEL } from "@/components/site/business";
import type { Lang } from "@/components/site/seo";
import { cn } from "@/lib/utils";

// The trade-in / sell page's own sections (like RepairSection on the repair page): a jump bar,
// the two choices as cards, what the offer depends on, the steps as a timeline, a "before you
// come" checklist with a call-for-an-estimate card, and lease-to-own devices to upgrade to.
// No prices or payout amounts: the offer is made in store after checking the device.

type L = Record<Lang, string>;
const l = (en: string, es: string): L => ({ en, es });

const FACTORS: { icon: typeof Smartphone; title: L; body: L }[] = [
  {
    icon: HardDrive,
    title: l("Model & storage", "Modelo y almacenamiento"),
    body: l(
      "Newer models and bigger storage are worth more.",
      "Los modelos más nuevos y con más almacenamiento valen más.",
    ),
  },
  {
    icon: ScanSearch,
    title: l("Screen & body", "Pantalla y cuerpo"),
    body: l(
      "Cracks, dents and heavy scratches lower the offer.",
      "Grietas, golpes y rayones fuertes bajan la oferta.",
    ),
  },
  {
    icon: BatteryCharging,
    title: l("Everything works", "Que todo funcione"),
    body: l(
      "Battery, cameras, buttons, speakers and charging port.",
      "Batería, cámaras, botones, bocinas y puerto de carga.",
    ),
  },
  {
    icon: LockOpen,
    title: l("Unlocked & signed out", "Liberado y sin cuenta"),
    body: l(
      "Signed out of iCloud or Google, and not locked to an account.",
      "Sin sesión de iCloud o Google y sin bloqueo de cuenta.",
    ),
  },
];

const T = {
  en: {
    nav: [
      ["options", "Your options"],
      ["value", "Your offer"],
      ["how", "How it works"],
      ["before", "Before you come"],
      ["upgrade", "Upgrade"],
      ["faq", "FAQ"],
      ["visit", "Visit"],
    ],
    navLabel: "On this page",
    kicker: "Trade in or sell",
    title: "Two ways to get value from your old phone",
    sub: "Walk in with your device — we check it in front of you and make you an offer on the spot.",
    trade: {
      tag: "Most popular",
      title: "Trade it in",
      body: "Put your old phone toward a new iPhone, Samsung Galaxy or other device.",
      points: [
        "Upgrade for less",
        "Lease the new one — all credit welcome, subject to approval",
        "We move your number and data",
      ],
      cta: "Browse devices to upgrade to",
    },
    sell: {
      title: "Sell it",
      body: "Not upgrading? Sell us your phone instead.",
      points: ["Offer on the spot", "No appointment needed", "English & Spanish"],
      cta: "Call for an estimate",
    },
    takes: "What we take",
    devices: [
      [Smartphone, "iPhone"],
      [Smartphone, "Samsung Galaxy"],
      [Smartphone, "Other Android phones"],
      [Tablet, "iPad & tablets — call first"],
    ] as const,
    valueKicker: "Your offer",
    valueTitle: "What your offer depends on",
    howKicker: "How it works",
    beforeTitle: "Before you come",
    tips: [
      [CloudUpload, "Back it up", "Save your photos and contacts to iCloud or Google."],
      [UserX, "Sign out", "Turn off Find My / sign out of iCloud or your Google account."],
      [KeyRound, "Bring your passcode", "So we can check that everything works."],
      [Plug, "Charger & box", "Bring them if you have them."],
    ] as const,
    quoteTitle: "Want an idea first?",
    quoteBody:
      "Call with your phone's model, storage and condition — we'll give you an idea before you come in.",
    upgradeTitle: "Put it toward your next device.",
  },
  es: {
    nav: [
      ["options", "Tus opciones"],
      ["value", "Tu oferta"],
      ["how", "Cómo funciona"],
      ["before", "Antes de venir"],
      ["upgrade", "Estrena"],
      ["faq", "Preguntas"],
      ["visit", "Visítanos"],
    ],
    navLabel: "En esta página",
    kicker: "Cambia o vende",
    title: "Dos formas de sacarle valor a tu celular",
    sub: "Ven con tu equipo: lo revisamos frente a ti y te hacemos una oferta al momento.",
    trade: {
      tag: "El más elegido",
      title: "Cámbialo",
      body: "Usa tu celular viejo para un iPhone, Samsung Galaxy u otro equipo nuevo.",
      points: [
        "Estrena por menos",
        "Arrienda el nuevo: todo tipo de crédito, sujeto a aprobación",
        "Pasamos tu número y tus datos",
      ],
      cta: "Ver equipos para estrenar",
    },
    sell: {
      title: "Véndelo",
      body: "¿No vas a estrenar? Véndenos tu celular.",
      points: ["Oferta al momento", "Sin cita", "Español e inglés"],
      cta: "Llamar para una idea del precio",
    },
    takes: "Lo que recibimos",
    devices: [
      [Smartphone, "iPhone"],
      [Smartphone, "Samsung Galaxy"],
      [Smartphone, "Otros Android"],
      [Tablet, "iPad y tabletas: llama antes"],
    ] as const,
    valueKicker: "Tu oferta",
    valueTitle: "De qué depende tu oferta",
    howKicker: "Cómo funciona",
    beforeTitle: "Antes de venir",
    tips: [
      [CloudUpload, "Haz un respaldo", "Guarda tus fotos y contactos en iCloud o Google."],
      [UserX, "Cierra sesión", "Apaga Buscar / cierra sesión de iCloud o de tu cuenta de Google."],
      [KeyRound, "Trae tu código", "Para revisar que todo funcione."],
      [Plug, "Cargador y caja", "Tráelos si los tienes."],
    ] as const,
    quoteTitle: "¿Quieres una idea antes?",
    quoteBody:
      "Llama con el modelo, el almacenamiento y el estado de tu celular: te damos una idea antes de venir.",
    upgradeTitle: "Úsalo para tu próximo equipo.",
  },
};

const Eyebrow = ({ children }: { children: string }) => (
  <p className="eyebrow flex items-center gap-3 text-primary">
    <span className="h-px w-8 bg-primary" /> {children}
  </p>
);

export function TradeSection({
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
      {/* Jump links (ids match the sections below and the page's FAQ / visit) */}
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

      {/* The two choices */}
      <section id="options" aria-labelledby="options-title" className="scroll-mt-40">
        <div className="mx-auto max-w-7xl px-5 py-12 md:py-16">
          <Eyebrow>{t.kicker}</Eyebrow>
          <h2 id="options-title" className="mt-3 max-w-3xl text-3xl font-semibold md:text-5xl">
            {t.title}
          </h2>
          <p className="mt-3 max-w-2xl text-lg text-muted-foreground">{t.sub}</p>

          <div className="mt-8 grid gap-4 lg:grid-cols-2">
            <ChoiceCard
              dark
              icon={Repeat}
              tag={t.trade.tag}
              title={t.trade.title}
              body={t.trade.body}
              points={t.trade.points}
              action={
                <Link
                  to={LEASE_PATHS[lang]}
                  className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-primary px-6 font-bold text-primary-foreground transition hover:brightness-110 sm:w-auto"
                >
                  {t.trade.cta} <ArrowRight className="h-4 w-4" />
                </Link>
              }
            />
            <ChoiceCard
              icon={BadgeDollarSign}
              title={t.sell.title}
              body={t.sell.body}
              points={t.sell.points}
              action={
                <a
                  href={TEL}
                  className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-ink px-6 font-bold text-white transition hover:bg-ink/85 sm:w-auto"
                >
                  <Phone className="h-4 w-4" /> {t.sell.cta}
                </a>
              }
            />
          </div>

          <div className="mt-4 flex flex-col gap-3 rounded-3xl bg-secondary/70 p-4 sm:flex-row sm:items-center sm:p-5">
            <p className="shrink-0 text-xs font-semibold uppercase tracking-wider text-muted-foreground sm:w-32">
              {t.takes}
            </p>
            <ul className="grid flex-1 grid-cols-2 gap-2 lg:grid-cols-4">
              {t.devices.map(([Icon, name]) => (
                <li
                  key={name}
                  className="flex items-center gap-2 rounded-2xl bg-card px-3 py-2.5 text-sm font-semibold leading-snug"
                >
                  <Icon className="h-4 w-4 shrink-0 text-primary" /> {name}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* What the offer depends on */}
      <section
        id="value"
        aria-labelledby="value-title"
        className="scroll-mt-40 border-t bg-secondary/40"
      >
        <div className="mx-auto max-w-7xl px-5 py-12 md:py-16">
          <Eyebrow>{t.valueKicker}</Eyebrow>
          <h2 id="value-title" className="mt-3 text-3xl font-semibold md:text-5xl">
            {t.valueTitle}
          </h2>
          <ul className="mt-8 grid grid-cols-1 gap-3 min-[420px]:grid-cols-2 sm:gap-4 lg:grid-cols-4">
            {FACTORS.map(({ icon: Icon, title, body }) => (
              <li key={title.en} className="rounded-3xl border bg-card p-5 sm:p-6">
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <Icon className="h-5 w-5" />
                </span>
                <span className="mt-4 block font-display text-lg font-semibold leading-snug">
                  {title[lang]}
                </span>
                <span className="mt-1 block text-sm leading-relaxed text-muted-foreground">
                  {body[lang]}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* How it works: a timeline, across on desktop and down on phones */}
      <section id="how" aria-labelledby="how-title" className="scroll-mt-40 bg-ink text-white">
        <div className="mx-auto max-w-7xl px-5 py-12 md:py-16">
          <Eyebrow>{t.howKicker}</Eyebrow>
          <h2 id="how-title" className="mt-3 text-3xl font-semibold md:text-5xl">
            {stepsTitle}
          </h2>
          <ol className="relative mt-10 grid gap-8 md:grid-cols-4 md:gap-6">
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

      {/* Before you come + estimate */}
      <section id="before" aria-labelledby="before-title" className="scroll-mt-40">
        <div className="mx-auto grid max-w-7xl gap-4 px-5 py-12 md:py-16 lg:grid-cols-[1.5fr_1fr]">
          <div className="rounded-3xl border bg-card p-6 sm:p-8">
            <h2 id="before-title" className="text-2xl font-semibold md:text-3xl">
              {t.beforeTitle}
            </h2>
            <ul className="mt-6 grid gap-5 sm:grid-cols-2">
              {t.tips.map(([Icon, h, p]) => (
                <li key={h} className="flex gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                    <Icon className="h-5 w-5" />
                  </span>
                  <span>
                    <span className="block font-semibold">{h}</span>
                    <span className="mt-0.5 block text-sm leading-relaxed text-muted-foreground">
                      {p}
                    </span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div className="relative isolate flex flex-col justify-between overflow-hidden rounded-3xl bg-primary p-6 text-primary-foreground sm:p-8">
            <Repeat
              className="pointer-events-none absolute -bottom-8 -right-8 -z-10 h-32 w-32 rotate-12 opacity-10"
              aria-hidden="true"
            />
            <div>
              <h2 className="text-2xl font-semibold md:text-3xl">{t.quoteTitle}</h2>
              <p className="mt-2 leading-relaxed opacity-90">{t.quoteBody}</p>
            </div>
            <a
              href={TEL}
              className="mt-6 inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-ink px-6 font-bold text-white transition hover:bg-ink/85"
            >
              <Phone className="h-4 w-4" /> {PHONE}
            </a>
          </div>
        </div>
      </section>

      {/* Upgrade to */}
      <div id="upgrade" className="scroll-mt-40 border-y bg-secondary/40">
        <LeaseGrid lang={lang} ids={[...LEASE_FEATURED]} limit={4} title={t.upgradeTitle} />
      </div>
    </>
  );
}

function ChoiceCard({
  dark,
  icon: Icon,
  tag,
  title,
  body,
  points,
  action,
}: {
  dark?: boolean;
  icon: typeof Smartphone;
  tag?: string;
  title: string;
  body: string;
  points: readonly string[];
  action: React.ReactNode;
}) {
  return (
    <article
      className={cn(
        "relative isolate flex flex-col overflow-hidden rounded-3xl p-6 sm:p-8",
        dark ? "bg-ink text-white" : "border bg-card",
      )}
    >
      {dark && (
        <div className="absolute -right-24 -top-24 -z-10 h-64 w-64 rounded-full bg-primary/25 blur-[90px]" />
      )}
      <div className="flex items-start justify-between gap-3">
        <span
          className={cn(
            "flex h-12 w-12 items-center justify-center rounded-2xl",
            dark ? "bg-primary text-primary-foreground" : "bg-primary/10 text-primary",
          )}
        >
          <Icon className="h-6 w-6" />
        </span>
        {tag && (
          <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-bold text-primary">
            {tag}
          </span>
        )}
      </div>
      <h3 className="mt-5 font-display text-2xl font-semibold md:text-3xl">{title}</h3>
      <p className={cn("mt-2 leading-relaxed", dark ? "text-white/75" : "text-muted-foreground")}>
        {body}
      </p>
      <ul className="mb-6 mt-5 space-y-2.5">
        {points.map((p) => (
          <li key={p} className="flex gap-2.5 text-[15px] leading-snug">
            <CircleCheck className="mt-0.5 h-5 w-5 shrink-0 text-primary" /> {p}
          </li>
        ))}
      </ul>
      <div className="mt-auto">{action}</div>
    </article>
  );
}
