import type { Employee, PayrollLine, Settings, TimeEntry } from "@/admin/types";

const DAY = 86_400_000;
// Biweekly pay periods are anchored to this Sunday so every period lines up with FLSA workweeks.
const BIWEEKLY_ANCHOR = new Date(2026, 0, 4).getTime();

/** Worked minutes for one entry, minus unpaid break. Open entries count up to `now`. */
export function entryMinutes(entry: TimeEntry, now = Date.now()) {
  const end = entry.clockOut ? Date.parse(entry.clockOut) : now;
  const raw = Math.max(0, (end - Date.parse(entry.clockIn)) / 60_000);
  return Math.max(0, Math.round(raw - entry.breakMinutes));
}

/** Midnight on the Sunday that starts the workweek containing `date` (local time). */
export function weekStart(date: Date) {
  const d = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  d.setDate(d.getDate() - d.getDay());
  return d;
}

/** [start, end) of the pay period containing `date`. */
export function payPeriodFor(date: Date, period: Settings["payPeriod"]) {
  const start = weekStart(date);
  if (period === "biweekly") {
    const weeks = Math.floor((start.getTime() - BIWEEKLY_ANCHOR) / (7 * DAY));
    if (((weeks % 2) + 2) % 2 === 1) start.setDate(start.getDate() - 7);
  }
  const end = new Date(start);
  end.setDate(end.getDate() + (period === "biweekly" ? 14 : 7));
  return { start, end };
}

/**
 * Regular and overtime minutes per employee for completed entries that clock in within
 * [start, end). Overtime is per workweek (Sunday–Saturday) above the threshold, per the FLSA.
 */
export function computePayroll(
  employees: Employee[],
  entries: TimeEntry[],
  start: Date,
  end: Date,
  settings: Pick<Settings, "overtimeThreshold" | "overtimeMultiplier">,
): PayrollLine[] {
  const threshold = settings.overtimeThreshold * 60;
  return employees
    .map((emp) => {
      const byWeek = new Map<number, number>();
      for (const e of entries) {
        if (e.employeeId !== emp.id || !e.clockOut) continue;
        const t = Date.parse(e.clockIn);
        if (t < start.getTime() || t >= end.getTime()) continue;
        const wk = weekStart(new Date(t)).getTime();
        byWeek.set(wk, (byWeek.get(wk) ?? 0) + entryMinutes(e));
      }
      let regularMinutes = 0;
      let overtimeMinutes = 0;
      for (const minutes of byWeek.values()) {
        regularMinutes += Math.min(minutes, threshold);
        overtimeMinutes += Math.max(0, minutes - threshold);
      }
      const gross = Math.round(
        (emp.hourlyRate * regularMinutes) / 60 +
          (emp.hourlyRate * settings.overtimeMultiplier * overtimeMinutes) / 60,
      );
      return {
        employeeId: emp.id,
        name: emp.name,
        rate: emp.hourlyRate,
        regularMinutes,
        overtimeMinutes,
        gross,
      };
    })
    .filter((l) => l.regularMinutes + l.overtimeMinutes > 0);
}

export const fmtHours = (minutes: number) => (minutes / 60).toFixed(2);

export const fmtMoney = (cents: number) =>
  (cents / 100).toLocaleString("en-US", { style: "currency", currency: "USD" });

export const fmtDuration = (minutes: number) => {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return `${h}h ${m.toString().padStart(2, "0")}m`;
};
