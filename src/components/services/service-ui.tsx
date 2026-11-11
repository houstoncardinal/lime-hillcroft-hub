import { Link } from "@tanstack/react-router";
import { ArrowRight, CircleCheck, Clock, Phone, type LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

import { PHONE, TEL } from "@/components/site/business";
import type { Lang } from "@/components/site/seo";
import { cn } from "@/lib/utils";

// Shared building blocks for the service pages' own sections (unlocking, recharge, bill
// payments, Xfinity): a sticky jump bar, section headings, icon cards, a step timeline, a
// checklist and a call card. Each page passes its own copy; nothing here invents facts.

export type L = Record<Lang, string>;
export const l = (en: string, es: string): L => ({ en, es });

/** Sticky "on this page" links; ids match the page's sections plus #faq and #visit. */
export function JumpBar({ label, items }: { label: string; items: [string, string][] }) {
  return (
    <nav
      aria-label={label}
      className="sticky top-[76px] z-30 border-b bg-background/90 backdrop-blur md:top-[84px]"
    >
      <ul className="mx-auto flex max-w-7xl gap-2 overflow-x-auto px-5 py-3 [scrollbar-width:none]">
        {items.map(([id, text]) => (
          <li key={id} className="shrink-0">
            <a
              href={`#${id}`}
              className="inline-flex min-h-10 items-center rounded-full border bg-card px-4 text-sm font-semibold transition hover:border-primary hover:text-primary"
            >
              {text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export function Eyebrow({ children, light }: { children: ReactNode; light?: boolean | undefined }) {
  return (
    <p className={cn("eyebrow flex items-center gap-3", light ? "text-white/70" : "text-primary")}>
      <span className={cn("h-px w-8", light ? "bg-white/50" : "bg-primary")} /> {children}
    </p>
  );
}

/** Kicker, title and optional subtitle for a section. */
export function SectionHead({
  id,
  kicker,
  title,
  sub,
  light,
  aside,
}: {
  id: string;
  kicker?: string;
  title: string;
  sub?: string;
  light?: boolean;
  aside?: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
      <div>
        {kicker && <Eyebrow light={light}>{kicker}</Eyebrow>}
        <h2 id={id} className={cn("text-3xl font-semibold md:text-5xl", kicker && "mt-3")}>
          {title}
        </h2>
        {sub && (
          <p
            className={cn(
              "mt-3 max-w-2xl text-lg",
              light ? "text-white/70" : "text-muted-foreground",
            )}
          >
            {sub}
          </p>
        )}
      </div>
      {aside}
    </div>
  );
}

export type Feature = { icon: LucideIcon; title: string; body: string; href?: string };

/** A grid of icon cards. `cols` is the desktop column count. */
export function FeatureGrid({
  items,
  cols = 3,
  dark,
  className,
}: {
  items: Feature[];
  cols?: 2 | 3 | 4;
  dark?: boolean;
  className?: string;
}) {
  return (
    <ul
      className={cn(
        "grid grid-cols-1 gap-3 min-[420px]:grid-cols-2 sm:gap-4",
        cols === 2 && "lg:grid-cols-2",
        cols === 3 && "lg:grid-cols-3",
        cols === 4 && "lg:grid-cols-4",
        className,
      )}
    >
      {items.map(({ icon: Icon, title, body, href }) => {
        const inner = (
          <>
            <span
              className={cn(
                "flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl transition",
                dark
                  ? "bg-primary text-primary-foreground"
                  : "bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground",
              )}
            >
              <Icon className="h-5 w-5" />
            </span>
            <span className="mt-4 block font-display text-lg font-semibold leading-snug">
              {title}
            </span>
            <span
              className={cn(
                "mt-1 block text-sm leading-relaxed",
                dark ? "text-white/70" : "text-muted-foreground",
              )}
            >
              {body}
            </span>
            {href && (
              <span className="mt-auto flex pt-4">
                <ArrowRight className="h-4 w-4 text-primary transition group-hover:translate-x-1" />
              </span>
            )}
          </>
        );
        const box = cn(
          "group flex h-full flex-col rounded-3xl p-5 sm:p-6",
          dark ? "bg-white/[0.06] ring-1 ring-white/10" : "border bg-card",
          href &&
            "transition hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-lg hover:shadow-ink/5",
        );
        return (
          <li key={title}>
            {href ? (
              <Link to={href} className={box}>
                {inner}
              </Link>
            ) : (
              <div className={box}>{inner}</div>
            )}
          </li>
        );
      })}
    </ul>
  );
}

/** Numbered steps: across on desktop, down on phones. The last step gets a check. */
export function Timeline({ steps, dark }: { steps: [string, string][]; dark?: boolean }) {
  const cols =
    steps.length === 3
      ? "md:grid-cols-3"
      : steps.length === 5
        ? "md:grid-cols-5"
        : "md:grid-cols-4";
  return (
    <ol className={cn("relative mt-10 grid gap-8 md:gap-6", cols)}>
      <span
        aria-hidden="true"
        className={cn(
          "absolute left-5 top-5 h-[calc(100%-2.5rem)] w-px md:left-5 md:right-5 md:top-5 md:h-px md:w-auto",
          dark ? "bg-white/15" : "bg-border",
        )}
      />
      {steps.map(([h, p], i) => {
        const last = i === steps.length - 1;
        return (
          <li key={h} className="relative flex gap-4 md:block">
            <span
              className={cn(
                "relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full font-display font-bold",
                last
                  ? "bg-primary text-primary-foreground"
                  : dark
                    ? "bg-white text-ink"
                    : "bg-ink text-white",
              )}
            >
              {last ? <CircleCheck className="h-5 w-5" /> : i + 1}
            </span>
            <span className="block md:mt-5">
              <span className="block font-display text-lg font-semibold">{h}</span>
              <span
                className={cn(
                  "mt-1 block text-sm leading-relaxed",
                  dark ? "text-white/70" : "text-muted-foreground",
                )}
              >
                {p}
              </span>
            </span>
          </li>
        );
      })}
    </ol>
  );
}

/** A dark section with a timeline of steps. */
export function StepsSection({
  id,
  kicker,
  title,
  steps,
}: {
  id: string;
  kicker: string;
  title: string;
  steps: [string, string][];
}) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className="relative isolate scroll-mt-40 overflow-hidden bg-ink text-white"
    >
      <div className="absolute -right-40 -top-40 -z-10 h-[30rem] w-[30rem] rounded-full bg-primary/20 blur-[150px]" />
      <div className="mx-auto max-w-7xl px-5 py-12 md:py-16">
        <SectionHead id={`${id}-title`} kicker={kicker} title={title} light />
        <Timeline steps={steps} dark />
      </div>
    </section>
  );
}

/** A checklist card next to an orange call card. */
export function ChecklistAndCall({
  id,
  title,
  items,
  callTitle,
  callBody,
  callIcon: CallIcon = Phone,
  hours,
}: {
  id: string;
  title: string;
  items: Feature[];
  callTitle: string;
  callBody: string;
  callIcon?: LucideIcon;
  hours?: [string, string][];
}) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="scroll-mt-40">
      <div className="mx-auto grid max-w-7xl gap-4 px-5 py-12 md:py-16 lg:grid-cols-[1.5fr_1fr]">
        <div className="rounded-3xl border bg-card p-6 sm:p-8">
          <h2 id={`${id}-title`} className="text-2xl font-semibold md:text-3xl">
            {title}
          </h2>
          <ul className="mt-6 grid gap-5 sm:grid-cols-2">
            {items.map(({ icon: Icon, title: h, body }) => (
              <li key={h} className="flex gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <Icon className="h-5 w-5" />
                </span>
                <span>
                  <span className="block font-semibold">{h}</span>
                  <span className="mt-0.5 block text-sm leading-relaxed text-muted-foreground">
                    {body}
                  </span>
                </span>
              </li>
            ))}
          </ul>
        </div>
        <div className="relative isolate flex flex-col justify-between overflow-hidden rounded-3xl bg-primary p-6 text-primary-foreground sm:p-8">
          <CallIcon
            className="pointer-events-none absolute -bottom-8 -right-8 -z-10 h-32 w-32 rotate-12 opacity-10"
            aria-hidden="true"
          />
          <div>
            <h2 className="text-2xl font-semibold md:text-3xl">{callTitle}</h2>
            <p className="mt-2 leading-relaxed opacity-90">{callBody}</p>
            {hours && (
              <dl className="mt-4 space-y-1.5 text-sm">
                {hours.map(([d, h]) => (
                  <div key={d} className="flex items-center justify-between gap-4">
                    <dt className="flex items-center gap-1.5 opacity-90">
                      <Clock className="h-3.5 w-3.5" /> {d}
                    </dt>
                    <dd className="font-bold">{h}</dd>
                  </div>
                ))}
              </dl>
            )}
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
  );
}

/** A light band with a section head and arbitrary content. */
export function Band({
  id,
  tone = "plain",
  children,
}: {
  id: string;
  tone?: "plain" | "tint";
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className={cn("scroll-mt-40", tone === "tint" && "border-y bg-secondary/40")}
    >
      <div className="mx-auto max-w-7xl px-5 py-12 md:py-16">{children}</div>
    </section>
  );
}
