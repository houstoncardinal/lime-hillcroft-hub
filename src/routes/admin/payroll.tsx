import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Banknote, CheckCircle2, Clock, Download, FileCheck2, Timer, Trash2 } from "lucide-react";
import { toast } from "sonner";

import { StackedBars } from "@/admin/charts";
import { download, toCsv } from "@/admin/csv";
import { useNow } from "@/admin/hooks";
import { computePayroll, fmtDuration, fmtHours, payPeriodFor } from "@/admin/payroll";
import { payroll, useAdminData } from "@/admin/store";
import type { PayrollLine, PayrollRun } from "@/admin/types";
import { money } from "@/admin/format";
import {
  Badge,
  Button,
  CardTitle,
  GlassCard,
  PageHeader,
  StatTile,
  Table,
  type Tone,
} from "@/admin/ui";

export const Route = createFileRoute("/admin/payroll")({
  component: Payroll,
});

const STATUS: Record<PayrollRun["status"], { tone: Tone; label: string }> = {
  draft: { tone: "neutral", label: "Draft" },
  approved: { tone: "info", label: "Approved" },
  paid: { tone: "good", label: "Paid" },
};

const day = (d: Date | string) =>
  new Date(d).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });

function exportLines(start: Date, lines: PayrollLine[]) {
  download(
    `tic-payroll-${start.toISOString().slice(0, 10)}.csv`,
    toCsv(
      ["employee", "rate", "regular_hours", "overtime_hours", "gross"],
      lines.map((l) => [
        l.name,
        (l.rate / 100).toFixed(2),
        fmtHours(l.regularMinutes),
        fmtHours(l.overtimeMinutes),
        (l.gross / 100).toFixed(2),
      ]),
    ),
  );
}

function Payroll() {
  const data = useAdminData();
  const now = useNow(60_000);
  const [offset, setOffset] = useState(-1);

  const period = useMemo(() => {
    const step = data.settings.payPeriod === "biweekly" ? 14 : 7;
    const ref = new Date(now);
    ref.setDate(ref.getDate() + offset * step);
    return payPeriodFor(ref, data.settings.payPeriod);
  }, [now, offset, data.settings.payPeriod]);

  const lines = computePayroll(
    data.employees,
    data.timeEntries,
    period.start,
    period.end,
    data.settings,
  );
  const totals = lines.reduce(
    (s, l) => ({
      regular: s.regular + l.regularMinutes,
      overtime: s.overtime + l.overtimeMinutes,
      gross: s.gross + l.gross,
    }),
    { regular: 0, overtime: 0, gross: 0 },
  );
  const lastDay = new Date(period.end.getTime() - 1);
  const isCurrent = period.end.getTime() > now;
  const openShifts = data.timeEntries.filter(
    (t) =>
      !t.clockOut &&
      Date.parse(t.clockIn) >= period.start.getTime() &&
      Date.parse(t.clockIn) < period.end.getTime(),
  ).length;
  const existing = data.payrollRuns.find((r) => r.periodStart === period.start.toISOString());

  return (
    <>
      <PageHeader
        title="Payroll"
        description={`Gross pay from the time clock, with overtime after ${data.settings.overtimeThreshold} hours per workweek at ${data.settings.overtimeMultiplier}×. Taxes and deductions are handled by your payroll provider.`}
      />

      <GlassCard className="mb-6 flex flex-wrap items-center justify-between gap-4 p-4">
        <div className="flex items-center gap-2">
          <Button size="sm" onClick={() => setOffset((o) => o - 1)}>
            ← Previous
          </Button>
          <div className="px-2 text-center">
            <p className="text-sm font-semibold">
              {day(period.start)} – {day(lastDay)}
            </p>
            <p className="text-xs text-muted-foreground">
              {data.settings.payPeriod === "biweekly" ? "Biweekly" : "Weekly"} pay period
              {isCurrent && " · in progress"}
            </p>
          </div>
          <Button size="sm" onClick={() => setOffset((o) => o + 1)} disabled={offset >= 0}>
            Next →
          </Button>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button onClick={() => exportLines(period.start, lines)} disabled={!lines.length}>
            <Download className="h-4 w-4" /> Export CSV
          </Button>
          <Button
            tone="primary"
            disabled={!lines.length || Boolean(existing) || isCurrent}
            title={
              isCurrent
                ? "Finish the period before running payroll"
                : existing
                  ? "Already created for this period"
                  : undefined
            }
            onClick={() => {
              payroll.create(period.start, period.end, lines);
              toast.success("Payroll run created as a draft");
            }}
          >
            <FileCheck2 className="h-4 w-4" /> {existing ? "Run created" : "Create payroll run"}
          </Button>
        </div>
      </GlassCard>

      {openShifts > 0 && (
        <p className="mb-6 rounded-2xl border border-amber-400/25 bg-amber-500/10 px-4 py-3 text-sm text-amber-100">
          {openShifts} shift{openShifts > 1 ? "s are" : " is"} still open in this period and not
          counted yet.
        </p>
      )}

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatTile
          label="Gross pay"
          value={money(totals.gross)}
          icon={Banknote}
          hint={`${lines.length} employees`}
        />
        <StatTile
          label="Regular hours"
          value={fmtHours(totals.regular)}
          icon={Clock}
          hint="Paid at base rate"
        />
        <StatTile
          label="Overtime hours"
          value={fmtHours(totals.overtime)}
          icon={Timer}
          hint={`Paid at ${data.settings.overtimeMultiplier}× rate`}
        />
        <StatTile
          label="Average hourly cost"
          value={
            totals.regular + totals.overtime
              ? money(Math.round(totals.gross / ((totals.regular + totals.overtime) / 60)))
              : "—"
          }
          icon={CheckCircle2}
          hint="Gross ÷ hours worked"
        />
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-[1.6fr_1fr]">
        <GlassCard>
          <CardTitle title="Pay summary" description="Completed shifts in this period" />
          {lines.length === 0 ? (
            <p className="py-10 text-center text-sm text-muted-foreground">
              No completed shifts in this period.
            </p>
          ) : (
            <Table>
              <thead>
                <tr>
                  <th>Employee</th>
                  <th className="text-right!">Rate</th>
                  <th className="text-right!">Regular</th>
                  <th className="text-right!">Overtime</th>
                  <th className="text-right!">Gross</th>
                </tr>
              </thead>
              <tbody>
                {lines.map((l) => (
                  <tr key={l.employeeId}>
                    <td className="font-medium">{l.name}</td>
                    <td className="tabular text-right text-muted-foreground">{money(l.rate)}</td>
                    <td className="tabular text-right">{fmtHours(l.regularMinutes)}</td>
                    <td className="tabular text-right">
                      {l.overtimeMinutes ? (
                        fmtHours(l.overtimeMinutes)
                      ) : (
                        <span className="text-muted-foreground">—</span>
                      )}
                    </td>
                    <td className="tabular text-right font-semibold">{money(l.gross)}</td>
                  </tr>
                ))}
                <tr>
                  <td className="font-semibold">Total</td>
                  <td />
                  <td className="tabular text-right font-semibold">{fmtHours(totals.regular)}</td>
                  <td className="tabular text-right font-semibold">{fmtHours(totals.overtime)}</td>
                  <td className="tabular text-right font-semibold text-primary">
                    {money(totals.gross)}
                  </td>
                </tr>
              </tbody>
            </Table>
          )}
        </GlassCard>

        <GlassCard>
          <CardTitle title="Hours by employee" />
          {lines.length === 0 ? (
            <p className="py-10 text-center text-sm text-muted-foreground">Nothing to chart yet.</p>
          ) : (
            <StackedBars
              rows={lines.map((l) => ({
                label: l.name,
                a: l.regularMinutes,
                b: l.overtimeMinutes,
              }))}
              labels={["Regular", "Overtime"]}
              format={fmtDuration}
            />
          )}
        </GlassCard>
      </div>

      <GlassCard className="mt-6">
        <CardTitle
          title="Payroll runs"
          description="Draft → approved → paid. Approved runs lock the numbers you send to your payroll provider."
        />
        {data.payrollRuns.length === 0 ? (
          <p className="py-10 text-center text-sm text-muted-foreground">
            No payroll runs yet. Pick a finished period above and create one.
          </p>
        ) : (
          <Table>
            <thead>
              <tr>
                <th>Period</th>
                <th>Status</th>
                <th className="text-right!">Employees</th>
                <th className="text-right!">Gross</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {data.payrollRuns.map((r) => (
                <tr key={r.id}>
                  <td>
                    {day(r.periodStart)} – {day(new Date(Date.parse(r.periodEnd) - 1))}
                  </td>
                  <td>
                    <Badge tone={STATUS[r.status].tone}>{STATUS[r.status].label}</Badge>
                  </td>
                  <td className="tabular text-right">{r.lines.length}</td>
                  <td className="tabular text-right font-semibold">
                    {money(r.lines.reduce((s, l) => s + l.gross, 0))}
                  </td>
                  <td>
                    <div className="flex justify-end gap-2">
                      <Button
                        size="sm"
                        onClick={() => exportLines(new Date(r.periodStart), r.lines)}
                      >
                        <Download className="h-3.5 w-3.5" /> CSV
                      </Button>
                      {r.status === "draft" && (
                        <>
                          <Button
                            size="sm"
                            tone="primary"
                            onClick={() => payroll.setStatus(r.id, "approved")}
                          >
                            Approve
                          </Button>
                          <Button
                            size="sm"
                            tone="ghost"
                            aria-label="Delete draft"
                            onClick={() => payroll.remove(r.id)}
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </Button>
                        </>
                      )}
                      {r.status === "approved" && (
                        <Button
                          size="sm"
                          tone="primary"
                          onClick={() => payroll.setStatus(r.id, "paid")}
                        >
                          Mark paid
                        </Button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </GlassCard>
    </>
  );
}
