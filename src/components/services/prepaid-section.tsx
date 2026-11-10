import { CircleCheck, Info, Phone, Wifi } from "lucide-react";
import { useEffect, useState } from "react";
import { Money, MoneyText } from "@/components/intl/money";
import { CARRIERS, PLANS_CHECKED } from "@/components/services/prepaid-plans";
import { CarrierLogo } from "@/components/services/carrier-logo";
import { Button } from "@/components/ui/button";
import { PHONE, TEL } from "@/components/site/business";
import type { Lang } from "@/components/site/seo";
import { cn } from "@/lib/utils";

const UI = {
  en: { kicker: "Plans & prices", title: "Prepaid plans. Your carrier, your choice.", tabs: "Carriers", includes: "Included with your plan", notes: "Plan details & conditions", source: "Source", call: "Call about this plan", checked: "Prices checked", disclaimer: "Carrier-advertised prices, plus applicable taxes and fees. We confirm today's price, activation charges and availability before you pay.", count: "plans", more: "Other carriers" },
  es: { kicker: "Planes y precios", title: "Planes prepagados. Tu compañía, tu elección.", tabs: "Compañías", includes: "Incluido con tu plan", notes: "Detalles y condiciones", source: "Fuente", call: "Llamar sobre este plan", checked: "Precios revisados", disclaimer: "Precios anunciados por cada compañía, más impuestos y cargos aplicables. Confirmamos el precio, cargos de activación y disponibilidad antes de que pagues.", count: "planes", more: "Otras compañías" },
};

export function PrepaidPlans({ lang }: { lang: Lang }) {
  const t = UI[lang];
  const [active, setActive] = useState(CARRIERS[0]?.id ?? "t-mobile");
  useEffect(() => {
    const fromHash = () => {
      const id = window.location.hash.replace(/^#plans-/, "");
      if (CARRIERS.some((c) => c.id === id)) setActive(id);
    };
    fromHash();
    window.addEventListener("hashchange", fromHash);
    return () => window.removeEventListener("hashchange", fromHash);
  }, []);
  function open(id: string) {
    setActive(id);
    history.replaceState(null, "", `#plans-${id}`);
  }
  function keyTab(event: React.KeyboardEvent<HTMLButtonElement>, index: number) {
    const next = event.key === "ArrowRight" ? (index + 1) % CARRIERS.length : event.key === "ArrowLeft" ? (index + CARRIERS.length - 1) % CARRIERS.length : event.key === "Home" ? 0 : event.key === "End" ? CARRIERS.length - 1 : undefined;
    if (next === undefined) return;
    event.preventDefault();
    const carrier = CARRIERS[next];
    if (!carrier) return;
    open(carrier.id);
    document.getElementById(`tab-${carrier.id}`)?.focus();
  }
  const checked = new Date(`${PLANS_CHECKED}T12:00:00`).toLocaleDateString(lang === "en" ? "en-US" : "es-MX", { month: "short", day: "numeric", year: "numeric" });
  return (
    <section id="plans" aria-labelledby="plans-title" className="scroll-mt-24 border-y bg-secondary/40">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-5 md:py-12">
        <p className="eyebrow text-muted-foreground">{t.kicker}</p>
        <div className="mt-2 flex flex-wrap items-end justify-between gap-3"><h2 id="plans-title" className="text-2xl font-semibold sm:text-3xl">{t.title}</h2><p className="text-xs text-muted-foreground">{t.checked} {checked}</p></div>
        <div role="tablist" aria-label={t.tabs} className="mt-6 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-5">
          {CARRIERS.map((c, i) => <Button key={c.id} id={`tab-${c.id}`} role="tab" variant="outline" aria-selected={active === c.id} aria-controls={`plans-${c.id}`} tabIndex={active === c.id ? 0 : -1} onKeyDown={(e) => keyTab(e, i)} onClick={() => open(c.id)} className={cn("h-auto min-h-20 flex-col gap-1 whitespace-normal px-2 py-2 text-xs", active === c.id ? "border-primary bg-primary/10 ring-1 ring-primary" : "bg-card hover:bg-secondary")}><CarrierLogo id={c.id} name={c.name} /><span>{c.name}</span></Button>)}
        </div>
        {CARRIERS.map((c) => <article key={c.id} id={`plans-${c.id}`} role="tabpanel" aria-labelledby={`tab-${c.id}`} hidden={active !== c.id} tabIndex={0} className="mt-8">
          <header className="flex flex-wrap items-center gap-3 border-b pb-5"><CarrierLogo id={c.id} name={c.name} className="h-14 w-28" /><div><h3 className="text-xl font-semibold sm:text-2xl">{c.name}</h3><p className="mt-1 text-xs text-muted-foreground">{c.plans.length} {t.count}</p></div>{c.network && <p className="flex items-center gap-2 text-xs text-muted-foreground"><Wifi className="h-4 w-4 text-primary" />{c.network[lang]}</p>}</header>
          <ul className="mt-5 space-y-3">
            {c.plans.map((p) => <li key={p.price} className={cn("rounded-lg border bg-card p-4 sm:p-6", p.badge && "border-primary/50")}>
              <div className="grid gap-4 sm:grid-cols-[minmax(0,1fr)_auto]">
                <div>{p.badge && <p className="mb-2 text-xs font-bold text-primary">{p.badge[lang]}</p>}<h4 className="text-lg font-semibold">{p.name?.[lang] ?? p.data[lang]}</h4>{p.name && <p className="mt-1 text-sm text-muted-foreground">{p.data[lang]}</p>}{p.hotspot && <p className="mt-2 flex items-start gap-2 text-sm"><Wifi className="mt-0.5 h-4 w-4 shrink-0 text-primary" />{p.hotspot[lang]}</p>}</div>
                <div className="flex items-baseline gap-2 sm:flex-col sm:items-end sm:gap-1"><p className="font-display text-3xl font-semibold"><Money usd={p.price} /></p><p className="text-xs text-muted-foreground">{c.per?.[lang] ?? (lang === "en" ? "/mo" : "/mes")}</p></div>
              </div>
              {p.perks.length > 0 && <ul className="mt-4 grid gap-2 border-t pt-4 text-sm text-muted-foreground sm:grid-cols-2">{p.perks.map((perk) => <li key={perk.en} className="flex items-start gap-2"><CircleCheck className="mt-0.5 h-4 w-4 shrink-0 text-primary" /><span><MoneyText text={perk[lang]} /></span></li>)}</ul>}
            </li>)}
          </ul>
          <div className="mt-6 border-y py-5"><h4 className="font-semibold">{t.includes}</h4><ul className="mt-3 grid gap-2 text-sm text-muted-foreground sm:grid-cols-2">{c.includes.map((x) => <li key={x.en} className="flex gap-2"><CircleCheck className="mt-0.5 h-4 w-4 shrink-0 text-primary" /><span><MoneyText text={x[lang]} /></span></li>)}</ul></div>
          <div className="py-5"><h4 className="font-semibold">{t.notes}</h4><ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed text-muted-foreground">{c.notes.map((n) => <li key={n.en}><MoneyText text={n[lang]} /></li>)}</ul><p className="mt-3 text-xs text-muted-foreground">{t.source}: {c.source[lang]}</p></div>
          <Button asChild className="min-h-11 whitespace-normal"><a href={TEL}><Phone />{t.call} · {PHONE}</a></Button>
        </article>)}
        <p className="mt-6 flex items-start gap-2 border-t pt-5 text-xs leading-relaxed text-muted-foreground"><Info className="h-4 w-4 shrink-0 text-primary" />{t.disclaimer}</p>
      </div>
    </section>
  );
}
