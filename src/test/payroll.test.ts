import { describe, expect, it } from "vitest";

import { parseCsv, toCsv } from "@/admin/csv";
import { computePayroll, entryMinutes, payPeriodFor, weekStart } from "@/admin/payroll";
import type { Employee, TimeEntry } from "@/admin/types";

const emp = (id: string, rate: number): Employee => ({
  id,
  name: id,
  role: "Sales associate",
  email: "",
  phone: "",
  hourlyRate: rate,
  pinHash: "",
  color: "#000",
  active: true,
  startDate: "2026-01-01",
});

// Local-time shift on a given day, `hours` long with a 30-minute unpaid break.
const shift = (employeeId: string, y: number, m: number, d: number, hours: number): TimeEntry => {
  const start = new Date(y, m - 1, d, 9, 0);
  return {
    id: `${employeeId}-${d}`,
    employeeId,
    clockIn: start.toISOString(),
    clockOut: new Date(start.getTime() + (hours * 60 + 30) * 60_000).toISOString(),
    breakMinutes: 30,
    note: "",
    editedBy: null,
  };
};

const RULES = { overtimeThreshold: 40, overtimeMultiplier: 1.5 };

describe("payroll", () => {
  it("subtracts unpaid breaks", () => {
    expect(entryMinutes(shift("a", 2026, 10, 5, 8))).toBe(480);
  });

  it("counts open shifts up to now", () => {
    const open = { ...shift("a", 2026, 10, 5, 8), clockOut: null, breakMinutes: 0 };
    expect(entryMinutes(open, Date.parse(open.clockIn) + 90 * 60_000)).toBe(90);
  });

  it("starts workweeks on Sunday", () => {
    const thu = new Date(2026, 9, 8, 15);
    expect(weekStart(thu)).toEqual(new Date(2026, 9, 4));
  });

  it("pays overtime per workweek, not per pay period", () => {
    // Week 1 (Oct 4–10): 5 × 9h = 45h → 40 regular + 5 OT. Week 2 (Oct 11–17): 4 × 8h = 32h.
    const entries = [
      ...[5, 6, 7, 8, 9].map((d) => shift("a", 2026, 10, d, 9)),
      ...[12, 13, 14, 15].map((d) => shift("a", 2026, 10, d, 8)),
    ];
    const [line] = computePayroll(
      [emp("a", 2000)],
      entries,
      new Date(2026, 9, 4),
      new Date(2026, 9, 18),
      RULES,
    );
    expect(line?.regularMinutes).toBe((40 + 32) * 60);
    expect(line?.overtimeMinutes).toBe(5 * 60);
    // 72h × $20 + 5h × $30 = $1,440 + $150
    expect(line?.gross).toBe(159_000);
  });

  it("ignores shifts outside the period and employees with no hours", () => {
    const entries = [shift("a", 2026, 9, 30, 8)];
    expect(
      computePayroll(
        [emp("a", 2000), emp("b", 1500)],
        entries,
        new Date(2026, 9, 4),
        new Date(2026, 9, 18),
        RULES,
      ),
    ).toEqual([]);
  });

  it("aligns biweekly periods to a fixed anchor", () => {
    const a = payPeriodFor(new Date(2026, 9, 8), "biweekly");
    const b = payPeriodFor(new Date(2026, 9, 14), "biweekly");
    expect(a.start).toEqual(b.start);
    expect(a.end.getTime() - a.start.getTime()).toBeGreaterThanOrEqual(14 * 86_400_000 - 3_600_000);
    expect(a.start.getDay()).toBe(0);
  });
});

describe("csv", () => {
  it("round-trips quotes, commas and newlines", () => {
    const csv = toCsv(["sku", "name"], [["TIC-1", 'Case, "rugged"\nblack']]);
    expect(parseCsv(csv)).toEqual([{ sku: "TIC-1", name: 'Case, "rugged"\nblack' }]);
  });
});
