import { Link, createFileRoute } from "@tanstack/react-router";
import { useMemo } from "react";
import {
  AlertTriangle,
  ArrowRight,
  Banknote,
  Clock,
  DollarSign,
  MousePointerClick,
  Package,
  ScanLine,
  Users,
} from "lucide-react";

import { change, summarize } from "@/admin/analytics";
import { TrendChart } from "@/admin/charts";
import { useNow } from "@/admin/hooks";
import { computePayroll, entryMinutes, fmtDuration, payPeriodFor } from "@/admin/payroll";
import { useAdminData, useAnalyticsEvents } from "@/admin/store";
import { compact, money } from "@/admin/format";
import { Badge, Button, CardTitle, GlassCard, PageHeader, StatTile } from "@/admin/ui";

export const Route = createFileRoute("/admin/")({
  component: Overview,
});

function greeting(h: number) {
  return h < 12 ? "Good morning" : h < 18 ? "Good afternoon" : "Good evening";
}

function Overview() {
  const data = useAdminData();
  const events = useAnalyticsEvents();
  const now = useNow(30_000);
  const web = useMemo(() => summarize(events, 14, now), [events, now]);

  const onClock = data.timeEntries.filter((t) => !t.clockOut);
  const employee = (id: string) => data.employees.find((e) => e.id === id);
  const lowStock = data.products
    .filter((p) => p.quantity <= p.reorderPoint)
    .sort((a, b) => a.quantity - b.quantity)
    .slice(0, 6);
  const retail = data.products.reduce((s, p) => s + p.price * p.quantity, 0);
  const units = data.products.reduce((s, p) => s + p.quantity, 0);

  const period = payPeriodFor(new Date(now), data.settings.payPeriod);
  const lines = computePayroll(
    data.employees,
    data.timeEntries,
    period.start,
    period.end,
    data.settings,
  );
  const payrollSoFar = lines.reduce((s, l) => s + l.gross, 0);

  const recent = data.movements.slice(0, 6);
  const productName = (id: string) =>
    data.products.find((p) => p.id === id)?.name ?? "Deleted product";

  return (
    <>
      <PageHeader
        title={`${greeting(new Date(now).getHours())}`}
        description={new Date(now).toLocaleDateString("en-US", {
          weekday: "long",
          month: "long",
          day: "numeric",
        })}
        actions={
          <>
            <a href="/admin/inventory?scan=1">
              <Button>
                <ScanLine className="h-4 w-4" /> Scan item
              </Button>
            </a>
            <Link to="/admin/time-clock">
              <Button>
                <Clock className="h-4 w-4" /> Time clock
              </Button>
            </Link>
            <Link to="/admin/inventory">
              <Button tone="primary">
                <Package className="h-4 w-4" /> Inventory
              </Button>
            </Link>
          </>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatTile
          label="Website visitors · 14 days"
          value={compact(web.current.visitors)}
          delta={change(web.current.visitors, web.previous.visitors)}
          deltaLabel="vs previous 14 days"
          icon={Users}
        />
        <StatTile
          label="Calls & directions · 14 days"
          value={compact(web.current.calls + web.current.directions)}
          delta={change(
            web.current.calls + web.current.directions,
            web.previous.calls + web.previous.directions,
          )}
          deltaLabel="vs previous 14 days"
          icon={MousePointerClick}
        />
        <StatTile
          label="Inventory at retail"
          value={money(retail)}
          icon={DollarSign}
          hint={`${units.toLocaleString()} units on hand`}
        />
        <StatTile
          label="Payroll this period"
          value={money(payrollSoFar)}
          icon={Banknote}
          hint={`${period.start.toLocaleDateString("en-US", { month: "short", day: "numeric" })} – ${new Date(period.end.getTime() - 1).toLocaleDateString("en-US", { month: "short", day: "numeric" })} · gross so far`}
        />
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-[1.7fr_1fr]">
        <GlassCard>
          <CardTitle
            title="Website traffic"
            description="Visitors and page views, last 14 days"
            actions={
              <Link to="/admin/analytics" className="text-sm text-primary hover:underline">
                Full report
              </Link>
            }
          />
          <TrendChart
            data={web.series}
            xKey="label"
            series={[
              { key: "visitors", label: "Visitors" },
              { key: "views", label: "Page views" },
            ]}
            ariaLabel="Website visitors and page views per day for the last 14 days"
          />
        </GlassCard>

        <GlassCard>
          <CardTitle
            title="On the clock"
            description={`${onClock.length} of ${data.employees.filter((e) => e.active).length} staff working now`}
          />
          {onClock.length === 0 ? (
            <p className="py-8 text-center text-sm text-muted-foreground">Nobody is clocked in.</p>
          ) : (
            <ul className="space-y-3">
              {onClock.map((t) => {
                const e = employee(t.employeeId);
                return (
                  <li key={t.id} className="flex items-center gap-3">
                    <span
                      className="flex h-9 w-9 items-center justify-center rounded-full text-xs font-semibold text-white"
                      style={{ background: e?.color ?? "#555" }}
                    >
                      {e?.name
                        .split(" ")
                        .map((w) => w[0])
                        .join("")
                        .slice(0, 2)}
                    </span>
                    <span className="flex-1">
                      <span className="block text-sm font-medium">{e?.name ?? "Unknown"}</span>
                      <span className="block text-xs text-muted-foreground">
                        In at{" "}
                        {new Date(t.clockIn).toLocaleTimeString("en-US", {
                          hour: "numeric",
                          minute: "2-digit",
                        })}
                      </span>
                    </span>
                    <span className="tabular text-sm font-medium">
                      {fmtDuration(entryMinutes(t, now))}
                    </span>
                  </li>
                );
              })}
            </ul>
          )}
          <Link
            to="/admin/time-clock"
            className="mt-5 flex items-center gap-1 text-sm text-primary hover:underline"
          >
            Open time clock <ArrowRight className="h-4 w-4" />
          </Link>
        </GlassCard>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <GlassCard>
          <CardTitle title="Needs restocking" description="At or below reorder point" />
          {lowStock.length === 0 ? (
            <p className="py-8 text-center text-sm text-muted-foreground">Everything is stocked.</p>
          ) : (
            <ul className="divide-y divide-white/6">
              {lowStock.map((p) => (
                <li key={p.id} className="flex items-center justify-between gap-3 py-3">
                  <span className="min-w-0">
                    <span className="block truncate text-sm font-medium">{p.name}</span>
                    <span className="block text-xs text-muted-foreground">
                      {p.sku} · reorder at {p.reorderPoint}
                    </span>
                  </span>
                  <Badge tone={p.quantity === 0 ? "critical" : "warning"}>
                    {p.quantity === 0 ? "Out" : `${p.quantity} left`}
                  </Badge>
                </li>
              ))}
            </ul>
          )}
          <Link
            to="/admin/inventory"
            className="mt-4 flex items-center gap-1 text-sm text-primary hover:underline"
          >
            <AlertTriangle className="h-4 w-4" /> Review inventory
          </Link>
        </GlassCard>

        <GlassCard>
          <CardTitle title="Recent stock activity" />
          {recent.length === 0 ? (
            <p className="py-8 text-center text-sm text-muted-foreground">No stock changes yet.</p>
          ) : (
            <ul className="divide-y divide-white/6">
              {recent.map((m) => (
                <li key={m.id} className="flex items-center justify-between gap-3 py-3">
                  <span className="min-w-0">
                    <span className="block truncate text-sm font-medium">
                      {productName(m.productId)}
                    </span>
                    <span className="block text-xs text-muted-foreground">
                      {m.reason} ·{" "}
                      {new Date(m.at).toLocaleString("en-US", {
                        month: "short",
                        day: "numeric",
                        hour: "numeric",
                        minute: "2-digit",
                      })}
                    </span>
                  </span>
                  <span
                    className={`tabular text-sm font-semibold ${m.delta > 0 ? "text-emerald-300" : "text-red-300"}`}
                  >
                    {m.delta > 0 ? "+" : ""}
                    {m.delta}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </GlassCard>
      </div>
    </>
  );
}
