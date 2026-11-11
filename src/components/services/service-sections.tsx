import { Link } from "@tanstack/react-router";
import {
  Apple,
  ArrowRight,
  BadgeCheck,
  BadgeDollarSign,
  Clock,
  CloudUpload,
  FileCheck2,
  Globe2,
  Hash,
  KeyRound,
  Languages,
  LockOpen,
  MapPin,
  Phone,
  Receipt,
  RefreshCw,
  Repeat,
  ScanSearch,
  Send,
  ShieldCheck,
  Smartphone,
  Store,
  Wallet,
  Zap,
} from "lucide-react";

import { LEASE_PATHS } from "@/components/lease/catalog";
import { CarrierLogo } from "@/components/services/carrier-logo";
import { PREPAID_CARRIERS } from "@/components/services/carriers";
import { servicePath } from "@/components/services/paths";
import {
  Band,
  ChecklistAndCall,
  FeatureGrid,
  JumpBar,
  SectionHead,
  StepsSection,
  type Feature,
} from "@/components/services/service-ui";
import { DIRECTIONS, TEL } from "@/components/site/business";
import type { Lang } from "@/components/site/seo";

// The own sections of the phone-unlocking, international-recharge and bill-payments pages.
// Facts only from each page's copy in services/data.ts (what we do, the brands named there,
// store hours; bill payments may carry a small fee); nothing about prices we don't publish.

type Steps = { lang: Lang; stepsTitle: string; steps: [string, string][] };

const LOGO_IDS: Record<(typeof PREPAID_CARRIERS)[number], string> = {
  "T-Mobile Prepaid": "t-mobile",
  "Verizon Prepaid": "verizon",
  "AT&T Prepaid": "att",
  Cricket: "cricket",
  "Simple Mobile": "simple-mobile",
  Tracfone: "tracfone",
  "H2O Wireless": "h2o",
  "Lyca Mobile": "lyca",
  "Gen Mobile": "gen-mobile",
};

const HOURS: Record<Lang, [string, string][]> = {
  en: [
    ["Monday – Saturday", "9 AM – 8 PM"],
    ["Sunday", "9 AM – 5 PM"],
  ],
  es: [
    ["Lunes – Sábado", "9 AM – 8 PM"],
    ["Domingo", "9 AM – 5 PM"],
  ],
};

/** The prepaid carriers we work with, as logo tiles linking to their plans. */
function CarrierWall({ lang, note }: { lang: Lang; note?: string }) {
  return (
    <>
      <ul className="mt-8 grid grid-cols-3 gap-2 sm:grid-cols-5 sm:gap-3 lg:grid-cols-9">
        {PREPAID_CARRIERS.map((name) => (
          <li key={name}>
            <a
              href={`${servicePath(lang, "prepaid-plans")}#plans-${LOGO_IDS[name]}`}
              className="group flex h-full flex-col items-center justify-center gap-2 rounded-2xl border bg-card px-2 py-4 text-center transition hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md"
            >
              <CarrierLogo
                id={LOGO_IDS[name]}
                name={name}
                className="h-9 w-20 bg-transparent sm:h-10"
              />
              <span className="text-[11px] font-semibold leading-tight sm:text-xs">{name}</span>
            </a>
          </li>
        ))}
      </ul>
      {note && <p className="mt-3 text-sm text-muted-foreground">{note}</p>}
    </>
  );
}

/** Small "next step" links to related pages. */
function NextLinks({ items }: { items: [string, string][] }) {
  return (
    <ul className="mt-6 flex flex-wrap gap-2">
      {items.map(([label, href]) => (
        <li key={href}>
          <Link
            to={href}
            className="group inline-flex min-h-11 items-center gap-1.5 rounded-full border bg-card px-5 text-sm font-semibold transition hover:border-primary hover:text-primary"
          >
            {label}
            <ArrowRight className="h-4 w-4 text-primary transition group-hover:translate-x-0.5" />
          </Link>
        </li>
      ))}
    </ul>
  );
}

/* ------------------------------------------------------------------ */
/* Phone unlocking                                                     */
/* ------------------------------------------------------------------ */

export function UnlockSection({ lang, stepsTitle, steps }: Steps) {
  const en = lang === "en";
  const nav: [string, string][] = en
    ? [
        ["help", "How we help"],
        ["check", "Is it locked?"],
        ["how", "How it works"],
        ["switch", "Switch carriers"],
        ["before", "Before you come"],
        ["faq", "FAQ"],
        ["visit", "Visit"],
      ]
    : [
        ["help", "Cómo ayudamos"],
        ["check", "¿Está bloqueado?"],
        ["how", "Cómo funciona"],
        ["switch", "Cambia de compañía"],
        ["before", "Antes de venir"],
        ["faq", "Preguntas"],
        ["visit", "Visítanos"],
      ];
  const help: Feature[] = en
    ? [
        {
          icon: ScanSearch,
          title: "Lock status check",
          body: "A quick check at the counter so you know where your phone stands.",
        },
        {
          icon: LockOpen,
          title: "iPhone & Android",
          body: "Unlocking for iPhone and Android phones, so they work with other carriers.",
        },
        {
          icon: Repeat,
          title: "Switch carriers",
          body: "Once it's unlocked, pick a new prepaid carrier and we activate it in store.",
        },
        {
          icon: Hash,
          title: "Keep your number",
          body: "We help move your number when you change carriers.",
        },
        {
          icon: Smartphone,
          title: "Can't be unlocked?",
          body: "Get an unlocked phone instead — lease-to-own, no credit needed.",
          href: LEASE_PATHS[lang],
        },
        {
          icon: Languages,
          title: "English & Spanish",
          body: "Walk in, no appointment. Se habla español.",
        },
      ]
    : [
        {
          icon: ScanSearch,
          title: "Revisión del bloqueo",
          body: "Una revisión rápida en el mostrador para saber cómo está tu celular.",
        },
        {
          icon: LockOpen,
          title: "iPhone y Android",
          body: "Liberamos iPhone y Android para que funcionen con otras compañías.",
        },
        {
          icon: Repeat,
          title: "Cambia de compañía",
          body: "Ya liberado, elige una compañía prepagada y la activamos en la tienda.",
        },
        {
          icon: Hash,
          title: "Conserva tu número",
          body: "Te ayudamos a pasar tu número al cambiar de compañía.",
        },
        {
          icon: Smartphone,
          title: "¿No se puede liberar?",
          body: "Llévate un celular desbloqueado, con arrendamiento y sin crédito.",
          href: LEASE_PATHS[lang],
        },
        { icon: Languages, title: "Español e inglés", body: "Ven sin cita. We speak English." },
      ];
  const before: Feature[] = en
    ? [
        {
          icon: CloudUpload,
          title: "Back it up",
          body: "Save your photos and contacts before switching SIMs or carriers.",
        },
        {
          icon: KeyRound,
          title: "Bring your passcode",
          body: "So we can check the phone and its lock status.",
        },
        {
          icon: FileCheck2,
          title: "Paid off?",
          body: "Carriers usually require the phone to be paid off and not reported lost or stolen.",
        },
        {
          icon: Hash,
          title: "Keeping your number?",
          body: "Bring your current carrier's account number and transfer PIN.",
        },
      ]
    : [
        {
          icon: CloudUpload,
          title: "Haz un respaldo",
          body: "Guarda tus fotos y contactos antes de cambiar de SIM o compañía.",
        },
        {
          icon: KeyRound,
          title: "Trae tu código",
          body: "Para revisar el celular y su estado de bloqueo.",
        },
        {
          icon: FileCheck2,
          title: "¿Ya está pagado?",
          body: "Las compañías suelen pedir que esté pagado y sin reporte de robo o pérdida.",
        },
        {
          icon: Hash,
          title: "¿Conservas tu número?",
          body: "Trae el número de cuenta y el PIN de transferencia de tu compañía actual.",
        },
      ];
  return (
    <>
      <JumpBar label={en ? "On this page" : "En esta página"} items={nav} />

      <Band id="help">
        <SectionHead
          id="help-title"
          kicker={en ? "Phone unlocking" : "Liberación de celulares"}
          title={en ? "Use the carrier you choose" : "Usa la compañía que tú elijas"}
          sub={
            en
              ? "A carrier-locked phone only works with the carrier that sold it. We check your phone first, then help you unlock it and switch."
              : "Un celular bloqueado solo funciona con la compañía que lo vendió. Primero lo revisamos y luego te ayudamos a liberarlo y cambiarte."
          }
        />
        <FeatureGrid items={help} cols={3} className="mt-8" />
      </Band>

      {/* Is my phone locked? */}
      <Band id="check" tone="tint">
        <SectionHead
          id="check-title"
          kicker={en ? "Quick check" : "Revisión rápida"}
          title={en ? "Is my phone locked?" : "¿Mi celular está bloqueado?"}
        />
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <article className="rounded-3xl border bg-card p-6 sm:p-8">
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-ink text-white">
              <Apple className="h-5 w-5" />
            </span>
            <h3 className="mt-4 font-display text-xl font-semibold">iPhone</h3>
            <ol className="mt-3 flex flex-wrap items-center gap-1.5 text-sm font-semibold">
              {(en
                ? ["Settings", "General", "About", "Carrier Lock"]
                : ["Ajustes", "General", "Información", "Bloqueo del operador"]
              ).map((x, i, a) => (
                <li key={x} className="flex items-center gap-1.5">
                  <span className="rounded-lg bg-secondary px-2.5 py-1">{x}</span>
                  {i < a.length - 1 && <ArrowRight className="h-3.5 w-3.5 text-muted-foreground" />}
                </li>
              ))}
            </ol>
            <p className="mt-4 flex items-start gap-2 leading-relaxed text-muted-foreground">
              <BadgeCheck className="mt-0.5 h-5 w-5 shrink-0 text-success" />
              {en
                ? "“No SIM restrictions” means your iPhone is unlocked."
                : "“Sin restricciones de SIM” significa que tu iPhone está liberado."}
            </p>
          </article>
          <article className="rounded-3xl border bg-card p-6 sm:p-8">
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-ink text-white">
              <Smartphone className="h-5 w-5" />
            </span>
            <h3 className="mt-4 font-display text-xl font-semibold">Android</h3>
            <p className="mt-3 leading-relaxed text-muted-foreground">
              {en
                ? "The simplest test is a SIM from another carrier: if the phone connects, it's unlocked. Not sure? Bring it in and we'll check it at the counter."
                : "La prueba más sencilla es una SIM de otra compañía: si se conecta, está liberado. ¿No estás seguro? Tráelo y lo revisamos en el mostrador."}
            </p>
          </article>
        </div>
      </Band>

      <StepsSection
        id="how"
        kicker={en ? "How it works" : "Cómo funciona"}
        title={stepsTitle}
        steps={steps}
      />

      {/* Switch carriers */}
      <Band id="switch">
        <SectionHead
          id="switch-title"
          kicker={en ? "After unlocking" : "Después de liberar"}
          title={en ? "Switch to a prepaid carrier in store" : "Cámbiate a una compañía prepagada"}
          sub={
            en
              ? "Pick a carrier and we activate it at the counter — tap a logo to see its plans."
              : "Elige una compañía y la activamos en el mostrador; toca un logo para ver sus planes."
          }
        />
        <CarrierWall lang={lang} />
      </Band>

      <ChecklistAndCall
        id="before"
        title={en ? "Before you come" : "Antes de venir"}
        items={before}
        callTitle={en ? "Not sure it can be unlocked?" : "¿No sabes si se puede liberar?"}
        callBody={
          en
            ? "Call with your phone's model and carrier — we'll tell you what to bring."
            : "Llama con el modelo y la compañía de tu celular: te decimos qué traer."
        }
        callIcon={LockOpen}
      />
    </>
  );
}

/* ------------------------------------------------------------------ */
/* International recharge                                              */
/* ------------------------------------------------------------------ */

const BRANDS: { name: string; where: Record<Lang, string> }[] = [
  { name: "Telcel", where: { en: "Mexico", es: "México" } },
  { name: "Tigo", where: { en: "Central & South America", es: "Centro y Sudamérica" } },
  { name: "Movistar", where: { en: "Latin America", es: "Latinoamérica" } },
  { name: "Digicel", where: { en: "Caribbean & Central America", es: "Caribe y Centroamérica" } },
];

/** Boss Revolution (IDT) — international calling and mobile top-up, offered at the counter.
 *  Facts from bossrevolution.com (checked 2026-11-10): calling and texting through the Boss
 *  Revolution app; mobile top-up to 280+ carriers in 95 countries. Promotions are left out
 *  because they change. Logo: public/brands/boss-revolution.svg. */
function BossRevolutionBanner({ lang }: { lang: Lang }) {
  const en = lang === "en";
  const options = en
    ? [
        {
          icon: Phone,
          title: "International calling",
          body: "Low-cost calls to friends and family abroad — plus calls and texts in the Boss Revolution app.",
        },
        {
          icon: Send,
          title: "International mobile top-up",
          body: "Send airtime to 280+ carriers in 95 countries.",
        },
      ]
    : [
        {
          icon: Phone,
          title: "Llamadas internacionales",
          body: "Llamadas a bajo costo a tu familia y amigos en otro país, además de llamadas y mensajes en la app de Boss Revolution.",
        },
        {
          icon: Send,
          title: "Recargas internacionales",
          body: "Envía saldo a más de 280 compañías en 95 países.",
        },
      ];
  return (
    <section id="boss" aria-labelledby="boss-title" className="scroll-mt-40">
      <div className="mx-auto max-w-7xl px-5 pb-12 md:pb-16">
        <div className="relative isolate overflow-hidden rounded-3xl border bg-card shadow-sm">
          <span className="absolute inset-y-0 left-0 w-1.5 bg-[#E4002B]" aria-hidden="true" />
          <div className="absolute -right-24 -top-24 -z-10 h-64 w-64 rounded-full bg-[#E4002B]/[0.07] blur-3xl" />
          <div className="grid gap-6 p-6 sm:p-8 lg:grid-cols-[auto_1fr_auto] lg:items-center lg:gap-10">
            <div className="flex flex-col gap-3">
              <img
                src="/brands/boss-revolution.svg"
                alt="Boss Revolution"
                width={161}
                height={48}
                className="h-12 w-auto self-start sm:h-14"
                loading="lazy"
                decoding="async"
              />
              <span className="inline-flex self-start rounded-full bg-[#E4002B]/10 px-3 py-1 text-xs font-bold text-[#C10024]">
                {en ? "Also available in store" : "También en la tienda"}
              </span>
            </div>
            <div>
              <h2 id="boss-title" className="text-2xl font-semibold leading-tight md:text-3xl">
                {en
                  ? "International calling & mobile top-up with Boss Revolution"
                  : "Llamadas y recargas internacionales con Boss Revolution"}
              </h2>
              <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                {options.map(({ icon: Icon, title, body }) => (
                  <li key={title} className="flex gap-3 rounded-2xl bg-secondary/60 p-4">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#E4002B] text-white">
                      <Icon className="h-5 w-5" />
                    </span>
                    <span>
                      <span className="block font-semibold">{title}</span>
                      <span className="mt-0.5 block text-sm leading-relaxed text-muted-foreground">
                        {body}
                      </span>
                    </span>
                  </li>
                ))}
              </ul>
              <p className="mt-3 text-xs text-muted-foreground">
                {en
                  ? "Boss Revolution is part of IDT Corporation. Rates and promotions are set by Boss Revolution — ask us for today's options."
                  : "Boss Revolution es parte de IDT Corporation. Las tarifas y promociones las fija Boss Revolution; pregúntanos por las opciones de hoy."}
              </p>
            </div>
            <a
              href={TEL}
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-ink px-6 font-bold text-white transition hover:bg-ink/85"
            >
              <Phone className="h-4 w-4" /> {en ? "Ask at the counter" : "Pregunta en el mostrador"}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export function RechargeSection({ lang, stepsTitle, steps }: Steps) {
  const en = lang === "en";
  const nav: [string, string][] = en
    ? [
        ["brands", "Carriers"],
        ["boss", "Boss Revolution"],
        ["need", "What you need"],
        ["how", "How it works"],
        ["more", "While you're here"],
        ["faq", "FAQ"],
        ["visit", "Visit"],
      ]
    : [
        ["brands", "Compañías"],
        ["boss", "Boss Revolution"],
        ["need", "Qué necesitas"],
        ["how", "Cómo funciona"],
        ["more", "Aprovecha tu visita"],
        ["faq", "Preguntas"],
        ["visit", "Visítanos"],
      ];
  const perks: Feature[] = en
    ? [
        { icon: Zap, title: "Sent at the counter", body: "We send the recharge while you wait." },
        { icon: Languages, title: "English & Spanish", body: "Help in your language, every day." },
        { icon: Clock, title: "Open 7 days", body: "Mon–Sat 9 AM–8 PM, Sun 9 AM–5 PM." },
      ]
    : [
        { icon: Zap, title: "Al momento", body: "Enviamos la recarga mientras esperas." },
        { icon: Languages, title: "Español e inglés", body: "Ayuda en tu idioma, todos los días." },
        { icon: Clock, title: "Abiertos 7 días", body: "Lun–Sáb 9 AM–8 PM, Dom 9 AM–5 PM." },
      ];
  const need: Feature[] = en
    ? [
        { icon: Globe2, title: "The country", body: "Where the phone you're topping up is." },
        {
          icon: Hash,
          title: "The full number",
          body: "Their complete phone number, with the country code.",
        },
        {
          icon: Send,
          title: "Their carrier",
          body: "Telcel, Tigo, Movistar, Digicel or another — ask us.",
        },
        { icon: Wallet, title: "The amount", body: "Tell us how much you'd like to send." },
      ]
    : [
        { icon: Globe2, title: "El país", body: "Dónde está el celular que vas a recargar." },
        {
          icon: Hash,
          title: "El número completo",
          body: "Su número completo, con el código del país.",
        },
        {
          icon: Send,
          title: "Su compañía",
          body: "Telcel, Tigo, Movistar, Digicel u otra; pregúntanos.",
        },
        { icon: Wallet, title: "El monto", body: "Dinos cuánto quieres enviar." },
      ];
  const more: Feature[] = en
    ? [
        {
          icon: Phone,
          title: "Prepaid plans",
          body: "Plans for your own phone, with international calling options.",
          href: servicePath(lang, "prepaid-plans"),
        },
        {
          icon: Receipt,
          title: "Pay your phone bill",
          body: "Pay your prepaid phone bill in person at the counter.",
          href: servicePath(lang, "bill-payments"),
        },
        {
          icon: Smartphone,
          title: "A new phone",
          body: "Lease-to-own phones with no credit needed.",
          href: LEASE_PATHS[lang],
        },
      ]
    : [
        {
          icon: Phone,
          title: "Planes prepagados",
          body: "Planes para tu celular, con opciones de llamadas internacionales.",
          href: servicePath(lang, "prepaid-plans"),
        },
        {
          icon: Receipt,
          title: "Paga tu factura",
          body: "Paga tu plan prepagado en persona en el mostrador.",
          href: servicePath(lang, "bill-payments"),
        },
        {
          icon: Smartphone,
          title: "Un celular nuevo",
          body: "Celulares con arrendamiento, sin necesidad de crédito.",
          href: LEASE_PATHS[lang],
        },
      ];
  return (
    <>
      <JumpBar label={en ? "On this page" : "En esta página"} items={nav} />

      <Band id="brands">
        <SectionHead
          id="brands-title"
          kicker={en ? "International recharge" : "Recargas internacionales"}
          title={en ? "Top up family and friends abroad" : "Recarga a tu familia en otro país"}
          sub={
            en
              ? "Recharges including Telcel, Tigo, Movistar and Digicel — and more. Ask us about the carrier you need."
              : "Recargas de Telcel, Tigo, Movistar y Digicel, y más. Pregúntanos por la compañía que necesitas."
          }
        />
        <ul className="mt-8 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {BRANDS.map((b) => (
            <li
              key={b.name}
              className="relative flex flex-col justify-between overflow-hidden rounded-3xl border bg-card p-5 sm:p-6"
            >
              <Globe2
                className="pointer-events-none absolute -bottom-6 -right-6 h-24 w-24 text-primary/10"
                aria-hidden="true"
              />
              <span className="font-display text-2xl font-bold tracking-tight sm:text-3xl">
                {b.name}
              </span>
              <span className="mt-6 inline-flex items-center gap-1.5 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 text-primary" /> {b.where[lang]}
              </span>
            </li>
          ))}
        </ul>
        <p className="mt-3 text-sm text-muted-foreground">
          {en
            ? "Don't see the carrier you need? Call (713) 339-9300 — we recharge more carriers than shown here."
            : "¿No ves la compañía que necesitas? Llama al (713) 339-9300: recargamos más compañías de las que aparecen aquí."}
        </p>
        <FeatureGrid items={perks} cols={3} className="mt-8" />
      </Band>

      <BossRevolutionBanner lang={lang} />

      <ChecklistAndCall
        id="need"
        title={en ? "What you need to send a recharge" : "Qué necesitas para enviar una recarga"}
        items={need}
        callTitle={en ? "Ask before you come" : "Pregunta antes de venir"}
        callBody={
          en
            ? "Call with the country and carrier — we'll confirm we can send it."
            : "Llama con el país y la compañía: te confirmamos que podemos enviarla."
        }
        callIcon={Send}
        hours={HOURS[lang]}
      />

      <StepsSection
        id="how"
        kicker={en ? "How it works" : "Cómo funciona"}
        title={stepsTitle}
        steps={steps}
      />

      <Band id="more" tone="tint">
        <SectionHead
          id="more-title"
          kicker={en ? "While you're here" : "Aprovecha tu visita"}
          title={en ? "More we can help with" : "Más en lo que te ayudamos"}
        />
        <FeatureGrid items={more} cols={3} className="mt-8" />
      </Band>
    </>
  );
}

/* ------------------------------------------------------------------ */
/* Bill payments                                                       */
/* ------------------------------------------------------------------ */

export function BillsSection({ lang, stepsTitle, steps }: Steps) {
  const en = lang === "en";
  const nav: [string, string][] = en
    ? [
        ["why", "Why pay here"],
        ["carriers", "Carriers"],
        ["how", "How it works"],
        ["bring", "What to bring"],
        ["more", "While you're here"],
        ["faq", "FAQ"],
        ["visit", "Visit"],
      ]
    : [
        ["why", "Por qué aquí"],
        ["carriers", "Compañías"],
        ["how", "Cómo funciona"],
        ["bring", "Qué traer"],
        ["more", "Aprovecha tu visita"],
        ["faq", "Preguntas"],
        ["visit", "Visítanos"],
      ];
  const why: Feature[] = en
    ? [
        {
          icon: BadgeDollarSign,
          title: "Small payment fee",
          body: "A small fee may apply, depending on the carrier or service — ask us.",
        },
        {
          icon: Zap,
          title: "Done at the counter",
          body: "Your payment is applied and you're good to go.",
        },
        { icon: Clock, title: "Open 7 days", body: "Mon–Sat 9 AM–8 PM, Sun 9 AM–5 PM." },
        {
          icon: Languages,
          title: "English & Spanish",
          body: "Help in your language from our team.",
        },
      ]
    : [
        {
          icon: BadgeDollarSign,
          title: "Pequeño cargo por pago",
          body: "Puede aplicar un pequeño cargo según la compañía o el servicio; pregúntanos.",
        },
        { icon: Zap, title: "En el mostrador", body: "Tu pago se aplica y listo." },
        { icon: Clock, title: "Abiertos 7 días", body: "Lun–Sáb 9 AM–8 PM, Dom 9 AM–5 PM." },
        { icon: Languages, title: "Español e inglés", body: "Te atendemos en tu idioma." },
      ];
  const bring: Feature[] = en
    ? [
        { icon: Hash, title: "The phone number", body: "The number on the account you're paying." },
        {
          icon: Smartphone,
          title: "Your phone, if you can",
          body: "Handy if you also want to change or renew your plan.",
        },
        {
          icon: RefreshCw,
          title: "Changing plans?",
          body: "We can help you switch or renew your prepaid plan.",
        },
        {
          icon: ShieldCheck,
          title: "Account PIN",
          body: "If your carrier uses one — some ask for it to make plan changes.",
        },
      ]
    : [
        {
          icon: Hash,
          title: "El número de teléfono",
          body: "El número de la cuenta que vas a pagar.",
        },
        {
          icon: Smartphone,
          title: "Tu celular, si puedes",
          body: "Útil si también quieres cambiar o renovar tu plan.",
        },
        {
          icon: RefreshCw,
          title: "¿Cambias de plan?",
          body: "Te ayudamos a cambiar o renovar tu plan prepagado.",
        },
        {
          icon: ShieldCheck,
          title: "PIN de la cuenta",
          body: "Si tu compañía usa uno; algunas lo piden para cambiar el plan.",
        },
      ];
  const more: Feature[] = en
    ? [
        {
          icon: Phone,
          title: "Change your plan",
          body: "Compare prepaid plans from our carriers.",
          href: servicePath(lang, "prepaid-plans"),
        },
        {
          icon: Globe2,
          title: "International recharge",
          body: "Top up family abroad — Telcel, Tigo, Movistar, Digicel and more.",
          href: servicePath(lang, "international-recharge"),
        },
        {
          icon: Store,
          title: "Xfinity Prepaid internet",
          body: "Home internet with no credit check, set up in store.",
          href: servicePath(lang, "xfinity-prepaid-internet"),
        },
      ]
    : [
        {
          icon: Phone,
          title: "Cambia tu plan",
          body: "Compara planes prepagados de nuestras compañías.",
          href: servicePath(lang, "prepaid-plans"),
        },
        {
          icon: Globe2,
          title: "Recargas internacionales",
          body: "Recarga a tu familia: Telcel, Tigo, Movistar, Digicel y más.",
          href: servicePath(lang, "international-recharge"),
        },
        {
          icon: Store,
          title: "Internet prepagado Xfinity",
          body: "Internet en casa sin revisión de crédito, activado en la tienda.",
          href: servicePath(lang, "xfinity-prepaid-internet"),
        },
      ];
  return (
    <>
      <JumpBar label={en ? "On this page" : "En esta página"} items={nav} />

      <Band id="why">
        <SectionHead
          id="why-title"
          kicker={en ? "Bill payments" : "Pago de facturas"}
          title={en ? "Pay your phone bill in person" : "Paga tu factura en persona"}
          sub={
            en
              ? "Prefer to pay with a person? Bring your number to our Hillcroft store and pay at the counter."
              : "¿Prefieres pagar en persona? Trae tu número a nuestra tienda en Hillcroft y paga en el mostrador."
          }
          aside={
            <a
              href={DIRECTIONS}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center gap-2 self-start rounded-full bg-ink px-5 text-sm font-bold text-white transition hover:bg-primary hover:text-primary-foreground md:self-auto"
            >
              <MapPin className="h-4 w-4" /> {en ? "Get directions" : "Cómo llegar"}
            </a>
          }
        />
        <FeatureGrid items={why} cols={4} className="mt-8" />
      </Band>

      <Band id="carriers" tone="tint">
        <SectionHead
          id="carriers-title"
          kicker={en ? "Carriers" : "Compañías"}
          title={
            en ? "Prepaid carriers we work with" : "Compañías prepagadas con las que trabajamos"
          }
          sub={
            en
              ? "We take bill payments for the major prepaid carriers — tap a logo to see its plans."
              : "Recibimos pagos de las principales compañías prepagadas; toca un logo para ver sus planes."
          }
        />
        <CarrierWall
          lang={lang}
          note={
            en
              ? "Not sure about yours? Call (713) 339-9300 or ask at the counter."
              : "¿No sabes si aceptamos la tuya? Llama al (713) 339-9300 o pregunta en el mostrador."
          }
        />
      </Band>

      <StepsSection
        id="how"
        kicker={en ? "How it works" : "Cómo funciona"}
        title={stepsTitle}
        steps={steps}
      />

      <ChecklistAndCall
        id="bring"
        title={en ? "What to bring" : "Qué traer"}
        items={bring}
        callTitle={en ? "Store hours" : "Horario"}
        callBody={
          en
            ? "Walk in anytime we're open — no appointment needed."
            : "Ven cuando estemos abiertos, sin cita."
        }
        callIcon={Receipt}
        hours={HOURS[lang]}
      />

      <Band id="more" tone="tint">
        <SectionHead
          id="more-title"
          kicker={en ? "While you're here" : "Aprovecha tu visita"}
          title={en ? "More we can help with" : "Más en lo que te ayudamos"}
        />
        <FeatureGrid items={more} cols={3} className="mt-8" />
      </Band>
    </>
  );
}
