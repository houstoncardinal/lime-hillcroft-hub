import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BadgeCheck,
  ChevronRight,
  CircleCheck,
  Globe,
  IdCard,
  Info,
  Landmark,
  MapPin,
  Phone,
  ShieldCheck,
  Store,
} from "lucide-react";

import { findLeaseDevice } from "@/components/lease/catalog";
import { LeaseCard } from "@/components/lease/lease-ui";
import { ADDRESS, DIRECTIONS, HOURS, PHONE, TEL } from "@/components/site/business";
import { OpenBadge, SiteFooter, SiteHeader } from "@/components/site/chrome";
import { FaqList } from "@/components/site/faq";
import { PORTALS } from "@/components/site/leasing-portals";
import type { Faq } from "@/components/site/schema";
import { ALTERNATES, type Lang } from "@/components/site/seo";

// /in-house-leasing: leasing done directly with TIC Wireless at the Hillcroft store. The owner's
// facts only — visit the store, bring a photo ID and a bank account to get approved, subject to
// approval. No rates, terms or credit claims are stated; staff explain those in person.

export const IN_HOUSE_COPY = {
  en: {
    home: "Home",
    crumb: "In-House Leasing",
    kicker: "Special option · In store",
    title: "In-House Leasing at TIC Wireless",
    body: "Lease your phone, tablet, laptop or console directly with us — no online application. Visit our Hillcroft store with a photo ID and a bank account, and we'll walk you through approval in person.",
    chips: ["iPhone, Galaxy & cellular iPad", "Done at our store", "Photo ID + bank account", "Se habla español"],
    eligible:
      "In-House Leasing is available for iPhones, Samsung Galaxy phones and iPads with cellular. For MacBooks, watches, consoles and other devices, apply with Acima, Progressive Leasing or American First Finance.",
    devicesKicker: "Eligible devices",
    devicesHeading: "Devices you can lease in-house",
    seeAll: "See all lease-to-own devices",
    browse: [["iPhone", "iphone"], ["Samsung Galaxy", "samsung"], ["iPad", "ipads"]] as const,
    call: "Call",
    directions: "Directions",
    needKicker: "What you need",
    needTitle: "Two things to get approved",
    need: [
      [IdCard, "A valid photo ID", "Bring it with you to the store."],
      [Landmark, "A bank account", "We use it to get you approved."],
    ] as const,
    stepsTitle: "How In-House Leasing works",
    steps: [
      ["Visit the store", "Come to 3640 Hillcroft St, Suite C during store hours."],
      ["Bring your ID and bank account", "We review them with you at the counter."],
      ["Get approved in store", "Approval happens right here, with our team."],
      ["Take it home", "Pick your device and leave with it once you're approved."],
    ] as const,
    compareTitle: "In-House Leasing or online lease-to-own?",
    inHouseCol: "In-House Leasing",
    onlineCol: "Online lease-to-own partners",
    inHousePoints: [
      "Done directly with TIC Wireless",
      "At our store — no online application",
      "Photo ID and a bank account to get approved",
      "For iPhone, Samsung Galaxy & cellular iPad",
    ],
    onlinePoints: [
      `Apply online with ${PORTALS.map((p) => p.name).join(", ")}`,
      "Approval comes from the leasing company",
      "Pick up your device in store once approved",
    ],
    onlineCta: "See online leasing options",
    faqTitle: "Common questions",
    visit: "Visit the store",
    visitBody: "Walk in — no appointment needed.",
    fine: "In-House Leasing is subject to approval. Our team explains the details in store before you sign anything.",
    metaTitle: "In-House Leasing in Houston — Get Approved at Our Hillcroft Store",
    metaDescription:
      "Lease a phone, tablet, laptop or console directly with TIC Wireless on Hillcroft in Houston. Visit the store with a photo ID and a bank account to get approved. Subject to approval.",
    faqs: [
      {
        q: "Which devices can I get with In-House Leasing?",
        a: "iPhones, Samsung Galaxy phones and iPads with cellular. Other devices — like MacBooks, Apple Watch and game consoles — can be leased with Acima, Progressive Leasing or American First Finance.",
      },
      {
        q: "What do I need for In-House Leasing?",
        a: "A valid photo ID and a bank account. Bring them to our store at 3640 Hillcroft St, Suite C, Houston, TX 77057.",
      },
      {
        q: "Do I apply online?",
        a: "No. In-House Leasing is done in person at our Hillcroft store. If you'd rather apply online first, you can use one of our lease-to-own partners instead.",
      },
      {
        q: "Is approval guaranteed?",
        a: "No, In-House Leasing is subject to approval. Our team will go over everything with you in store.",
      },
      {
        q: "Do I need an appointment?",
        a: "No. Walk in during store hours: Monday–Saturday 9 AM–8 PM and Sunday 9 AM–5 PM.",
      },
    ] satisfies Faq[],
  },
  es: {
    home: "Inicio",
    crumb: "Arrendamiento en tienda",
    kicker: "Opción especial · En tienda",
    title: "Arrendamiento directo en TIC Wireless",
    body: "Arrienda tu celular, tableta, laptop o consola directamente con nosotros, sin solicitud en línea. Visita nuestra tienda de Hillcroft con una identificación con foto y una cuenta bancaria, y te guiamos en la aprobación en persona.",
    chips: ["iPhone, Galaxy e iPad celular", "En nuestra tienda", "ID con foto + cuenta bancaria", "We speak English"],
    eligible:
      "El arrendamiento en tienda es para iPhone, celulares Samsung Galaxy e iPad con datos celulares. Para MacBook, relojes, consolas y otros equipos, solicita con Acima, Progressive Leasing o American First Finance.",
    devicesKicker: "Equipos elegibles",
    devicesHeading: "Equipos que puedes arrendar en tienda",
    seeAll: "Ver todos los equipos en arrendamiento",
    browse: [["iPhone", "iphone"], ["Samsung Galaxy", "samsung"], ["iPad", "ipads"]] as const,
    call: "Llamar",
    directions: "Cómo llegar",
    needKicker: "Lo que necesitas",
    needTitle: "Dos cosas para aprobarte",
    need: [
      [IdCard, "Identificación con foto vigente", "Tráela contigo a la tienda."],
      [Landmark, "Una cuenta bancaria", "La usamos para aprobarte."],
    ] as const,
    stepsTitle: "Cómo funciona el arrendamiento en tienda",
    steps: [
      ["Visita la tienda", "Ven a 3640 Hillcroft St, Suite C en horario de tienda."],
      ["Trae tu ID y cuenta bancaria", "Los revisamos contigo en el mostrador."],
      ["Aprobación en la tienda", "La aprobación se hace aquí, con nuestro equipo."],
      ["Llévatelo", "Elige tu equipo y llévatelo una vez aprobado."],
    ] as const,
    compareTitle: "¿Arrendamiento en tienda o arrendamiento en línea?",
    inHouseCol: "Arrendamiento en tienda",
    onlineCol: "Socios de arrendamiento en línea",
    inHousePoints: [
      "Directamente con TIC Wireless",
      "En nuestra tienda, sin solicitud en línea",
      "Identificación con foto y cuenta bancaria para aprobarte",
      "Para iPhone, Samsung Galaxy e iPad celular",
    ],
    onlinePoints: [
      `Solicita en línea con ${PORTALS.map((p) => p.name).join(", ")}`,
      "La aprobación la da la compañía de arrendamiento",
      "Recoge tu equipo en la tienda ya aprobado",
    ],
    onlineCta: "Ver opciones de arrendamiento en línea",
    faqTitle: "Preguntas frecuentes",
    visit: "Visita la tienda",
    visitBody: "Ven sin cita.",
    fine: "El arrendamiento en tienda está sujeto a aprobación. Nuestro equipo te explica los detalles en la tienda antes de firmar.",
    metaTitle: "Arrendamiento en Tienda en Houston — Aprobación en Hillcroft",
    metaDescription:
      "Arrienda un celular, tableta, laptop o consola directamente con TIC Wireless sobre Hillcroft en Houston. Visita la tienda con identificación con foto y cuenta bancaria. Sujeto a aprobación.",
    faqs: [
      {
        q: "¿Qué equipos puedo obtener con arrendamiento en tienda?",
        a: "iPhone, celulares Samsung Galaxy e iPad con datos celulares. Otros equipos, como MacBook, Apple Watch y consolas, se pueden arrendar con Acima, Progressive Leasing o American First Finance.",
      },
      {
        q: "¿Qué necesito para el arrendamiento en tienda?",
        a: "Una identificación con foto vigente y una cuenta bancaria. Tráelas a nuestra tienda en 3640 Hillcroft St, Suite C, Houston, TX 77057.",
      },
      {
        q: "¿Solicito en línea?",
        a: "No. El arrendamiento en tienda se hace en persona en nuestra tienda de Hillcroft. Si prefieres solicitar en línea primero, puedes usar uno de nuestros socios de arrendamiento.",
      },
      {
        q: "¿La aprobación está garantizada?",
        a: "No, el arrendamiento en tienda está sujeto a aprobación. Nuestro equipo revisa todo contigo en la tienda.",
      },
      {
        q: "¿Necesito cita?",
        a: "No. Ven en horario de tienda: lunes a sábado de 9 AM a 8 PM y domingo de 9 AM a 5 PM.",
      },
    ] satisfies Faq[],
  },
};

/** Featured devices In-House Leasing covers (iPhone, Galaxy phones, cellular iPad). */
const IN_HOUSE_DEVICES = [
  "iphone-18-pro-max",
  "iphone-17-pro-max",
  "iphone-16-pro-max",
  "iphone-15",
  "galaxy-s26-ultra",
  "galaxy-z-fold7",
  "galaxy-s25-ultra",
  "ipad-11",
].flatMap((id) => findLeaseDevice(id) ?? []);

const HOURS_ES: [string, string][] = [
  ["Lunes – Sábado", "9:00 AM – 8:00 PM"],
  ["Domingo", "9:00 AM – 5:00 PM"],
];

export function InHousePage({ lang }: { lang: Lang }) {
  const t = IN_HOUSE_COPY[lang];
  const hours = lang === "en" ? HOURS : HOURS_ES;
  return (
    <main className="overflow-x-hidden">
      <SiteHeader lang={lang} paths={ALTERNATES.inHouse} />

      {/* Hero */}
      <section className="relative isolate overflow-hidden bg-ink text-white">
        <div className="grain absolute inset-0 -z-10 opacity-60" />
        <div className="absolute -right-32 -top-24 -z-10 h-[28rem] w-[28rem] rounded-full bg-primary/25 blur-[140px]" />
        <div className="mx-auto grid max-w-7xl gap-10 px-5 pb-12 pt-28 md:pb-16 md:pt-32 lg:grid-cols-[1.3fr_1fr] lg:items-center">
          <div>
            <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-1 text-sm text-white/60">
              <Link to={ALTERNATES.home[lang]} className="hover:text-white">
                {t.home}
              </Link>
              <ChevronRight className="h-3.5 w-3.5" />
              <span className="text-white/85">{t.crumb}</span>
            </nav>
            <p className="eyebrow mt-6 flex items-center gap-3 text-primary">
              <span className="h-px w-8 bg-primary" /> {t.kicker}
            </p>
            <h1 className="mt-3 text-[clamp(2.25rem,5.5vw,4.25rem)] font-semibold leading-[1.03]">
              {t.title}
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/75">{t.body}</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href={TEL}
                className="inline-flex min-h-12 items-center gap-2 rounded-full bg-primary px-6 font-semibold text-primary-foreground transition hover:brightness-110"
              >
                <Phone className="h-4 w-4" /> {t.call} · {PHONE}
              </a>
              <a
                href={DIRECTIONS}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-12 items-center gap-2 rounded-full border border-white/20 px-6 font-semibold transition hover:border-white/60"
              >
                <MapPin className="h-4 w-4" /> {t.directions}
              </a>
            </div>
            <ul className="mt-7 flex flex-wrap gap-2">
              {t.chips.map((c) => (
                <li
                  key={c}
                  className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-sm"
                >
                  <CircleCheck className="h-4 w-4 text-primary" /> {c}
                </li>
              ))}
            </ul>
            <p className="mt-5 flex max-w-2xl items-start gap-2.5 rounded-xl bg-white/10 px-4 py-3 text-sm leading-relaxed text-white">
              <Info className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
              <span>{t.eligible}</span>
            </p>
          </div>

          {/* What you need, up front */}
          <div className="rounded-3xl bg-white p-6 text-ink shadow-2xl sm:p-7">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              {t.needKicker}
            </p>
            <h2 className="mt-1 font-display text-2xl font-semibold">{t.needTitle}</h2>
            <ul className="mt-5 space-y-3">
              {t.need.map(([Icon, h, p]) => (
                <li key={h} className="flex items-start gap-4 rounded-2xl bg-secondary/70 p-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                    <Icon className="h-5 w-5" />
                  </span>
                  <span>
                    <span className="block font-semibold">{h}</span>
                    <span className="block text-sm text-muted-foreground">{p}</span>
                  </span>
                </li>
              ))}
            </ul>
            <p className="mt-4 flex items-center gap-2 text-sm">
              <OpenBadge lang={lang} />
            </p>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section aria-labelledby="steps-title" className="mx-auto max-w-7xl px-5 py-12 md:py-16">
        <h2 id="steps-title" className="text-3xl font-semibold md:text-4xl">
          {t.stepsTitle}
        </h2>
        <ol className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {t.steps.map(([h, p], i) => (
            <li key={h} className="relative rounded-3xl border bg-card p-6">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-ink font-display font-bold text-white">
                {i === t.steps.length - 1 ? <BadgeCheck className="h-5 w-5 text-primary" /> : i + 1}
              </span>
              <h3 className="mt-4 font-display text-lg font-semibold">{h}</h3>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{p}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* Compare */}
      <section aria-labelledby="compare-title" className="border-y bg-secondary/50">
        <div className="mx-auto max-w-7xl px-5 py-12 md:py-16">
          <h2 id="compare-title" className="max-w-3xl text-3xl font-semibold md:text-4xl">
            {t.compareTitle}
          </h2>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <div className="rounded-3xl border-2 border-primary bg-card p-6 sm:p-7">
              <p className="flex items-center gap-2 font-display text-xl font-semibold">
                <Store className="h-5 w-5 text-primary" /> {t.inHouseCol}
              </p>
              <ul className="mt-4 space-y-3">
                {t.inHousePoints.map((x) => (
                  <li key={x} className="flex gap-3">
                    <CircleCheck className="mt-0.5 h-5 w-5 shrink-0 text-primary" /> {x}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-3xl border bg-card p-6 sm:p-7">
              <p className="flex items-center gap-2 font-display text-xl font-semibold">
                <Globe className="h-5 w-5 text-muted-foreground" /> {t.onlineCol}
              </p>
              <ul className="mt-4 space-y-3">
                {t.onlinePoints.map((x) => (
                  <li key={x} className="flex gap-3 text-muted-foreground">
                    <CircleCheck className="mt-0.5 h-5 w-5 shrink-0 text-muted-foreground/60" /> {x}
                  </li>
                ))}
              </ul>
              <Link
                to={ALTERNATES.leasing[lang]}
                className="mt-5 inline-flex items-center gap-1.5 font-semibold text-ink hover:text-primary"
              >
                {t.onlineCta} <ArrowRight className="h-4 w-4 text-primary" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Devices you can lease in-house: iPhones, Galaxy phones and cellular iPads */}
      <section aria-labelledby="ih-devices" className="mx-auto max-w-7xl px-5 py-12 md:py-16">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="eyebrow flex items-center gap-3 text-primary">
              <span className="h-px w-8 bg-primary" /> {t.devicesKicker}
            </p>
            <h2 id="ih-devices" className="mt-3 text-3xl font-semibold md:text-4xl">
              {t.devicesHeading}
            </h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {t.browse.map(([label, cat]) => (
                <a
                  key={cat}
                  href={`${ALTERNATES.leaseCatalog[lang]}#${cat}`}
                  className="inline-flex min-h-10 items-center rounded-full border bg-card px-4 text-sm font-semibold transition hover:border-primary hover:text-primary"
                >
                  {label}
                </a>
              ))}
            </div>
          </div>
          <Link
            to={ALTERNATES.leaseCatalog[lang]}
            className="inline-flex min-h-12 shrink-0 items-center gap-2 self-start rounded-full bg-primary px-6 font-semibold text-primary-foreground transition hover:brightness-110 md:self-auto"
          >
            {t.seeAll} <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <ul className="mt-6 grid grid-cols-1 gap-3 min-[420px]:grid-cols-2 sm:gap-5 lg:grid-cols-4">
          {IN_HOUSE_DEVICES.map((d) => (
            <li key={d.id}>
              <LeaseCard device={d} lang={lang} />
            </li>
          ))}
        </ul>
      </section>

      {/* FAQ */}
      <section className="border-t bg-secondary/40">
        <div className="mx-auto max-w-4xl px-5 py-12 md:py-16">
          <h2 className="text-3xl font-semibold md:text-4xl">{t.faqTitle}</h2>
          <div className="mt-6">
            <FaqList items={t.faqs} />
          </div>
        </div>
      </section>

      {/* Visit */}
      <section className="mx-auto max-w-7xl px-5 py-12 md:py-16">
        <div className="grid gap-8 rounded-3xl bg-ink p-8 text-white md:grid-cols-[1.4fr_1fr] md:p-12">
          <div>
            <h2 className="text-3xl font-semibold">{t.visit}</h2>
            <p className="mt-2 text-white/70">{t.visitBody}</p>
            <address className="mt-6 not-italic text-lg">{ADDRESS}</address>
            <div className="mt-6 flex flex-wrap gap-2">
              <a
                href={TEL}
                className="inline-flex min-h-11 items-center gap-2 rounded-full bg-primary px-5 font-semibold text-primary-foreground transition hover:brightness-110"
              >
                <Phone className="h-4 w-4" /> {PHONE}
              </a>
              <a
                href={DIRECTIONS}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center gap-2 rounded-full border border-white/20 px-5 font-semibold transition hover:border-white/60"
              >
                <MapPin className="h-4 w-4" /> {t.directions}
              </a>
            </div>
          </div>
          <dl className="space-y-3 self-center">
            {hours.map(([d, h]) => (
              <div key={d} className="flex justify-between gap-6 border-b border-white/10 pb-3">
                <dt className="text-white/70">{d}</dt>
                <dd className="font-semibold">{h}</dd>
              </div>
            ))}
          </dl>
        </div>
        <p className="mt-4 flex items-start gap-2 text-xs leading-relaxed text-muted-foreground">
          <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-primary" /> {t.fine}
        </p>
      </section>

      <SiteFooter lang={lang} />
    </main>
  );
}
