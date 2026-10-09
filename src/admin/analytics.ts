import type { AnalyticsEvent } from "@/admin/types";

const DAY = 86_400_000;

export type DayPoint = { date: string; label: string; views: number; visitors: number };

function startOfDay(t: number) {
  const d = new Date(t);
  d.setHours(0, 0, 0, 0);
  return d.getTime();
}

function count<T extends string>(items: T[]) {
  const m = new Map<T, number>();
  for (const i of items) m.set(i, (m.get(i) ?? 0) + 1);
  return [...m.entries()].sort((a, b) => b[1] - a[1]);
}

function totals(events: AnalyticsEvent[]) {
  const views = events.filter((e) => e.type === "pageview");
  return {
    views: views.length,
    visitors: new Set(views.map((e) => e.sessionId)).size,
    calls: events.filter((e) => e.type === "call").length,
    directions: events.filter((e) => e.type === "directions").length,
  };
}

/** Stats for the last `days` days, compared with the `days` before that. */
export function summarize(events: AnalyticsEvent[], days: number, now = Date.now()) {
  const end = startOfDay(now) + DAY;
  const start = end - days * DAY;
  const prevStart = start - days * DAY;
  const inRange = (e: AnalyticsEvent, a: number, b: number) => {
    const t = Date.parse(e.at);
    return t >= a && t < b;
  };
  const current = events.filter((e) => inRange(e, start, end));
  const previous = events.filter((e) => inRange(e, prevStart, start));

  const series: DayPoint[] = [];
  for (let t = start; t < end; t += DAY) {
    const dayEvents = current.filter((e) => inRange(e, t, t + DAY) && e.type === "pageview");
    const d = new Date(t);
    series.push({
      date: d.toISOString().slice(0, 10),
      label: d.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
      views: dayEvents.length,
      visitors: new Set(dayEvents.map((e) => e.sessionId)).size,
    });
  }

  const views = current.filter((e) => e.type === "pageview");
  const sessions = new Map<string, AnalyticsEvent>();
  for (const e of views) if (!sessions.has(e.sessionId)) sessions.set(e.sessionId, e);
  const firstHits = [...sessions.values()];

  return {
    series,
    current: totals(current),
    previous: totals(previous),
    pages: count(views.map((e) => e.path)),
    referrers: count(firstHits.map((e) => e.referrer || "Direct")),
    devices: count(firstHits.map((e) => e.device)),
    languages: count(firstHits.map((e) => (e.lang === "es" ? "Spanish" : "English"))),
    conversionsByPage: count(
      current.filter((e) => e.type === "call" || e.type === "directions").map((e) => e.path),
    ),
  };
}

/** Percent change, or null when there is no previous value to compare with. */
export const change = (cur: number, prev: number) =>
  prev === 0 ? null : Math.round(((cur - prev) / prev) * 100);

export const PAGE_NAMES: Record<string, string> = {
  "/": "Home",
  "/financing": "Financing",
  "/es": "Inicio (ES)",
  "/es/financiamiento": "Financiamiento (ES)",
};
