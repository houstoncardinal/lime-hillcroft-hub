import type React from "react";
import {
  BadgeCheck,
  CalendarX,
  CircleCheck,
  CreditCard,
  Gauge,
  Info,
  MapPin,
  PauseCircle,
  Phone,
  Receipt,
  Router,
  Smartphone,
  Timer,
  Wifi,
  Zap,
} from "lucide-react";

import { LEASE_PATHS } from "@/components/lease/catalog";
import { servicePath } from "@/components/services/paths";
import {
  ChecklistAndCall,
  FeatureGrid,
  JumpBar,
  SectionHead,
  StepsSection,
  type Feature,
} from "@/components/services/service-ui";
import { DIRECTIONS, TEL } from "@/components/site/business";
import type { Lang } from "@/components/site/seo";
import { cn } from "@/lib/utils";

// The Xfinity Prepaid internet page's own sections: the two plans as cards, what's included,
// wired vs 5G, setup as a timeline, what pairs with it and the fine print. Branded Xfinity (the
// store sells Xfinity Prepaid). Plans, prices and terms from Xfinity's prepaid internet page,
// checked 2026-11-10. Everything links inside TIC Wireless. Xfinity is a trademark of Comcast.

// Xfinity-style accent (deep violet), used for the plan cards
const ACCENT = "bg-[linear-gradient(110deg,#1F1147_0%,#3B1FA3_55%,#6138F5_100%)]";
const ACCENT_TEXT = "text-[#5A31E0]";

type L = Record<Lang, string>;
const l = (en: string, es: string): L => ({ en, es });

const PLANS: { speed: number; price: number; best: L; popular?: true }[] = [
  {
    speed: 100,
    price: 30,
    best: l(
      "Everyday use: browsing, music and social media.",
      "Uso diario: navegar, música y redes sociales.",
    ),
  },
  {
    speed: 200,
    price: 45,
    best: l(
      "Smoother streaming on more devices at once.",
      "Streaming más fluido en más equipos a la vez.",
    ),
    popular: true,
  },
];

export function XfinitySection({
  lang,
  stepsTitle,
  steps,
}: {
  lang: Lang;
  stepsTitle: string;
  steps: [string, string][];
}) {
  const en = lang === "en";
  const nav: [string, string][] = en
    ? [
        ["plans", "Plans"],
        ["included", "What's included"],
        ["network", "Why wired"],
        ["how", "Get connected"],
        ["pair", "Pair it with"],
        ["fine-print", "Good to know"],
        ["faq", "FAQ"],
        ["visit", "Visit"],
      ]
    : [
        ["plans", "Planes"],
        ["included", "Qué incluye"],
        ["network", "Por qué cable"],
        ["how", "Conéctate"],
        ["pair", "Combínalo"],
        ["fine-print", "Bueno saber"],
        ["faq", "Preguntas"],
        ["visit", "Visítanos"],
      ];
  const includes = en
    ? ["Unlimited data", "WiFi equipment included", "No annual contract", "Pause anytime"]
    : ["Datos ilimitados", "Equipo WiFi incluido", "Sin contrato anual", "Pausa cuando quieras"];
  const included: Feature[] = en
    ? [
        {
          icon: Receipt,
          title: "One monthly price",
          body: "Taxes and fees included — no surprises.",
        },
        {
          icon: CalendarX,
          title: "No annual contract",
          body: "Pay ahead each month — no long-term commitment.",
        },
        {
          icon: PauseCircle,
          title: "Pause anytime",
          body: "Turn autopay off to pause, back on to resume.",
        },
        {
          icon: Router,
          title: "WiFi equipment included",
          body: "A gateway you don't have to return.",
        },
      ]
    : [
        {
          icon: Receipt,
          title: "Un solo precio al mes",
          body: "Impuestos y cargos incluidos, sin sorpresas.",
        },
        {
          icon: CalendarX,
          title: "Sin contrato anual",
          body: "Pagas por adelantado cada mes, sin compromiso a largo plazo.",
        },
        {
          icon: PauseCircle,
          title: "Pausa cuando quieras",
          body: "Desactiva el pago automático para pausar.",
        },
        {
          icon: Router,
          title: "Equipo WiFi incluido",
          body: "Un módem que no tienes que devolver.",
        },
      ];
  const network: Feature[] = en
    ? [
        { icon: Gauge, title: "Consistent speed", body: "Fast and steady, even at peak hours." },
        { icon: Timer, title: "Low lag", body: "Smoother video calls and gaming." },
        {
          icon: Zap,
          title: "Wired & reliable",
          body: "Doesn't vary with capacity or time of day.",
        },
      ]
    : [
        {
          icon: Gauge,
          title: "Velocidad constante",
          body: "Rápida y estable, incluso en horas pico.",
        },
        { icon: Timer, title: "Poca latencia", body: "Videollamadas y juegos más fluidos." },
        {
          icon: Zap,
          title: "Por cable y confiable",
          body: "No cambia según la demanda ni la hora.",
        },
      ];
  const pair: Feature[] = en
    ? [
        {
          icon: Phone,
          title: "Prepaid phone plans",
          body: "Plans from 9 carriers, activated in store.",
          href: servicePath(lang, "prepaid-plans"),
        },
        {
          icon: Smartphone,
          title: "WiFi devices",
          body: "Phones, iPads, MacBooks and consoles — lease-to-own, all credit welcome.",
          href: LEASE_PATHS[lang],
        },
        {
          icon: CreditCard,
          title: "Phone bill payments",
          body: "Pay your prepaid phone bill in person at the counter.",
          href: servicePath(lang, "bill-payments"),
        },
      ]
    : [
        {
          icon: Phone,
          title: "Planes prepagados",
          body: "Planes de 9 compañías, activados en la tienda.",
          href: servicePath(lang, "prepaid-plans"),
        },
        {
          icon: Smartphone,
          title: "Equipos con WiFi",
          body: "Celulares, iPad, MacBook y consolas con arrendamiento; se acepta todo tipo de crédito.",
          href: LEASE_PATHS[lang],
        },
        {
          icon: CreditCard,
          title: "Pago de facturas",
          body: "Paga tu plan prepagado en persona en el mostrador.",
          href: servicePath(lang, "bill-payments"),
        },
      ];
  const fine: Feature[] = en
    ? [
        {
          icon: MapPin,
          title: "Check your address",
          body: "Not available in all areas — we'll help you check.",
        },
        {
          icon: Gauge,
          title: "Speeds",
          body: "Up to 100 or 200 Mbps download and up to 10 Mbps upload. Actual speeds vary and are not guaranteed.",
        },
        {
          icon: Router,
          title: "Self-install",
          body: "Requires self-installation and activation of a refurbished WiFi gateway.",
        },
        {
          icon: CreditCard,
          title: "Monthly payments",
          body: "Paid online by credit, debit or prepaid card, with autopay and paperless billing — we help you set it up.",
        },
      ]
    : [
        {
          icon: MapPin,
          title: "Verifica tu domicilio",
          body: "No está disponible en todas las zonas; te ayudamos a verificar.",
        },
        {
          icon: Gauge,
          title: "Velocidad",
          body: "Hasta 100 o 200 Mbps de descarga y hasta 10 Mbps de subida. La velocidad real varía y no está garantizada.",
        },
        {
          icon: Router,
          title: "Instalación",
          body: "Requiere instalar y activar tú mismo un módem WiFi reacondicionado.",
        },
        {
          icon: CreditCard,
          title: "Pagos mensuales",
          body: "En línea con tarjeta de crédito, débito o prepagada, con pago automático y factura sin papel; te ayudamos a configurarlo.",
        },
      ];

  return (
    // Xfinity violet replaces the store orange inside these sections (icons, kickers, cards).
    <div
      style={
        {
          "--primary": "#5A31E0",
          "--primary-foreground": "#ffffff",
          "--color-primary": "#5A31E0",
          "--color-primary-foreground": "#ffffff",
          // the site reads text-primary from --primary-text (a darker shade for contrast)
          "--primary-text": "#4B25C9",
        } as React.CSSProperties
      }
    >
      <JumpBar label={en ? "On this page" : "En esta página"} items={nav} />

      {/* Plans */}
      <section id="plans" aria-labelledby="plans-title" className="scroll-mt-40">
        <div className="mx-auto max-w-7xl px-5 py-12 md:py-16">
          <SectionHead
            id="plans-title"
            kicker={en ? "Prepaid home internet" : "Internet prepagado para tu casa"}
            title={en ? "Choose your speed" : "Elige tu velocidad"}
            sub={
              en
                ? "Two simple plans on the Xfinity network. One monthly price with taxes and fees included."
                : "Dos planes sencillos en la red de Xfinity. Un solo precio al mes con impuestos y cargos incluidos."
            }
            aside={
              <img
                src="/brands/xfinity.webp"
                alt="Xfinity"
                width={298}
                height={120}
                className="hidden h-12 w-auto md:block"
                loading="lazy"
                decoding="async"
              />
            }
          />

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {PLANS.map((p) => (
              <article
                key={p.speed}
                className={cn(
                  "relative isolate flex flex-col overflow-hidden rounded-3xl p-6 sm:p-8",
                  p.popular
                    ? cn(ACCENT, "text-white shadow-xl shadow-[#3B1FA3]/25")
                    : "border bg-card",
                )}
              >
                {p.popular && (
                  <div className="absolute -right-24 -top-24 -z-10 h-64 w-64 rounded-full bg-white/10 blur-[80px]" />
                )}
                <div className="flex items-start justify-between gap-3">
                  <p className="text-xs font-bold uppercase tracking-[0.18em] opacity-70">
                    Xfinity Prepaid
                  </p>
                  {p.popular && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-white px-3 py-1 text-xs font-bold text-[#3B1FA3]">
                      <BadgeCheck className="h-3.5 w-3.5" />
                      {en ? "Smoother streaming" : "Streaming más fluido"}
                    </span>
                  )}
                </div>
                <p className="mt-3 font-display text-5xl font-bold leading-none tracking-tight sm:text-6xl">
                  {p.speed}
                  <span
                    className={cn(
                      "ml-1.5 text-xl font-semibold sm:text-2xl",
                      p.popular ? "text-white/70" : "text-muted-foreground",
                    )}
                  >
                    Mbps
                  </span>
                </p>
                <p
                  className={cn(
                    "mt-1 text-sm",
                    p.popular ? "text-white/70" : "text-muted-foreground",
                  )}
                >
                  {en ? "download speed" : "velocidad de descarga"}
                </p>

                <div className="mt-6 flex items-end gap-1">
                  <span className="font-display text-4xl font-bold">${p.price}</span>
                  <span
                    className={cn(
                      "pb-1 text-lg font-semibold",
                      p.popular ? "text-white/70" : "text-muted-foreground",
                    )}
                  >
                    {en ? "/mo" : "/mes"}
                  </span>
                </div>
                <p
                  className={cn("text-sm font-semibold", p.popular ? "text-white/90" : ACCENT_TEXT)}
                >
                  {en ? "Taxes & fees included" : "Impuestos y cargos incluidos"}
                </p>
                <p
                  className={cn(
                    "mt-3 leading-relaxed",
                    p.popular ? "text-white/80" : "text-muted-foreground",
                  )}
                >
                  {p.best[lang]}
                </p>

                <ul className="mb-6 mt-5 grid gap-2.5 sm:grid-cols-2">
                  {includes.map((x) => (
                    <li key={x} className="flex items-center gap-2 text-[15px]">
                      <CircleCheck
                        className={cn("h-5 w-5 shrink-0", p.popular ? "text-white" : ACCENT_TEXT)}
                      />
                      {x}
                    </li>
                  ))}
                </ul>

                <div className="mt-auto grid gap-2 sm:grid-cols-2">
                  <a
                    href={TEL}
                    className={cn(
                      "inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-5 font-bold transition",
                      p.popular
                        ? "bg-white text-[#2A1580] hover:bg-white/90"
                        : cn(ACCENT, "text-white hover:brightness-125"),
                    )}
                  >
                    <Phone className="h-4 w-4" />{" "}
                    {en ? "Get it in store" : "Consíguelo en la tienda"}
                  </a>
                  <a
                    href={DIRECTIONS}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      "inline-flex min-h-12 items-center justify-center gap-1.5 rounded-full border px-5 text-sm font-bold transition",
                      p.popular
                        ? "border-white/30 hover:border-white"
                        : "hover:border-[#5A31E0] hover:text-[#5A31E0]",
                    )}
                  >
                    <MapPin className="h-4 w-4" /> {en ? "Directions" : "Cómo llegar"}
                  </a>
                </div>
              </article>
            ))}
          </div>
          <p className="mt-4 flex items-start gap-2 text-xs leading-relaxed text-muted-foreground">
            <Info className="mt-0.5 h-4 w-4 shrink-0" />
            {en
              ? "Prices from Xfinity, checked November 10, 2026 — pricing subject to change. Upgrade from 100 to 200 Mbps anytime from your account."
              : "Precios de Xfinity, verificados el 10 de noviembre de 2026; pueden cambiar. Sube de 100 a 200 Mbps cuando quieras desde tu cuenta."}
          </p>
        </div>
      </section>

      {/* What's included */}
      <section
        id="included"
        aria-labelledby="included-title"
        className="scroll-mt-40 border-y bg-secondary/40"
      >
        <div className="mx-auto max-w-7xl px-5 py-12 md:py-14">
          <SectionHead
            id="included-title"
            kicker={en ? "What's included" : "Qué incluye"}
            title={en ? "You're in control" : "Tú tienes el control"}
          />
          <FeatureGrid items={included} cols={4} className="mt-8" />
        </div>
      </section>

      {/* Wired vs 5G */}
      <section
        id="network"
        aria-labelledby="network-title"
        className={cn("relative isolate scroll-mt-40 overflow-hidden text-white", ACCENT)}
      >
        <Wifi
          className="pointer-events-none absolute -right-16 -top-10 -z-10 h-80 w-80 opacity-[0.06]"
          aria-hidden="true"
        />
        <div className="mx-auto grid max-w-7xl gap-8 px-5 py-12 md:py-16 lg:grid-cols-[1fr_1.4fr] lg:items-center">
          <SectionHead
            id="network-title"
            kicker={en ? "A network that works" : "Una red que funciona"}
            title={en ? "Better tech than 5G home internet" : "Mejor tecnología que el internet 5G"}
            sub={
              en
                ? "Xfinity Prepaid comes into your home on a wired connection, backed by the Xfinity network."
                : "Xfinity Prepaid llega a tu casa por cable, con el respaldo de la red de Xfinity."
            }
            light
          />
          <FeatureGrid items={network} cols={3} dark className="lg:grid-cols-3" />
        </div>
      </section>

      <StepsSection
        id="how"
        kicker={en ? "Get connected" : "Conéctate"}
        title={stepsTitle}
        steps={steps}
      />

      {/* Pair it with (all internal) */}
      <section
        id="pair"
        aria-labelledby="pair-title"
        className="scroll-mt-40 border-b bg-secondary/40"
      >
        <div className="mx-auto max-w-7xl px-5 py-12 md:py-14">
          <SectionHead
            id="pair-title"
            kicker={en ? "Pair it with" : "Combínalo con"}
            title={en ? "Everything else, in the same store" : "Todo lo demás, en la misma tienda"}
          />
          <FeatureGrid items={pair} cols={3} className="mt-8" />
        </div>
      </section>

      <ChecklistAndCall
        id="fine-print"
        title={en ? "Good to know" : "Bueno saber"}
        items={fine}
        callTitle={en ? "Questions before you come?" : "¿Preguntas antes de venir?"}
        callBody={
          en
            ? "Call with your address — we'll tell you if Xfinity Prepaid is available and what to bring. Service limited to a single outlet; Xfinity's 30-day money-back guarantee doesn't apply. Xfinity is a trademark of Comcast."
            : "Llama con tu dirección: te decimos si Xfinity Prepaid está disponible y qué traer. Servicio para una sola toma; la garantía de devolución de 30 días de Xfinity no aplica. Xfinity es una marca de Comcast."
        }
        callIcon={Wifi}
      />
    </div>
  );
}
