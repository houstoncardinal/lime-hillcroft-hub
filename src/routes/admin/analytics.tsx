import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Eye, Info, MapPin, Phone, Users } from "lucide-react";

import { PAGE_NAMES, change, summarize } from "@/admin/analytics";
import { BarList, SERIES, TrendChart } from "@/admin/charts";
import { useNow } from "@/admin/hooks";
import { useAdminData, useAnalyticsEvents } from "@/admin/store";
import { compact } from "@/admin/format";
import { CardTitle, GlassCard, PageHeader, StatTile } from "@/admin/ui";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/admin/analytics")({
  component: Analytics,
});

const RANGES = [7, 30, 90] as const;

function Analytics() {
  const data = useAdminData();
  const events = useAnalyticsEvents();
  const now = useNow(60_000);
  const [days, setDays] = useState<(typeof RANGES)[number]>(30);
  const s = useMemo(() => summarize(events, days, now), [events, days, now]);
  const conversions = s.current.calls + s.current.directions;
  const rate = s.current.visitors ? ((conversions / s.current.visitors) * 100).toFixed(1) : "0.0";
  const pct = (rows: [string, number][]) => {
    const total = rows.reduce((t, r) => t + r[1], 0) || 1;
    return rows.map(([k, v]) => [k, Math.round((v / total) * 100)] as [string, number]);
  };
  const label = `vs previous ${days} days`;

  return (
    <>
      <PageHeader
        title="Website stats"
        description="Visitors, the pages they read, and how many tapped Call or Directions."
        actions={
          <div className="glass flex gap-1 rounded-xl p-1">
            {RANGES.map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => setDays(r)}
                className={cn(
                  "cursor-pointer rounded-lg px-3 py-1.5 text-sm font-medium transition",
                  days === r ? "bg-white/12" : "text-muted-foreground hover:text-foreground",
                )}
              >
                {r} days
              </button>
            ))}
          </div>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatTile
          label="Visitors"
          value={compact(s.current.visitors)}
          delta={change(s.current.visitors, s.previous.visitors)}
          deltaLabel={label}
          icon={Users}
        />
        <StatTile
          label="Page views"
          value={compact(s.current.views)}
          delta={change(s.current.views, s.previous.views)}
          deltaLabel={label}
          icon={Eye}
        />
        <StatTile
          label="Call taps"
          value={compact(s.current.calls)}
          delta={change(s.current.calls, s.previous.calls)}
          deltaLabel={label}
          icon={Phone}
        />
        <StatTile
          label="Directions taps"
          value={compact(s.current.directions)}
          delta={change(s.current.directions, s.previous.directions)}
          deltaLabel={label}
          icon={MapPin}
        />
      </div>

      <GlassCard className="mt-6">
        <CardTitle title="Traffic" description={`${rate}% of visitors tapped Call or Directions`} />
        <TrendChart
          data={s.series}
          xKey="label"
          height={300}
          series={[
            { key: "visitors", label: "Visitors" },
            { key: "views", label: "Page views" },
          ]}
          ariaLabel={`Visitors and page views per day for the last ${days} days`}
        />
      </GlassCard>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <GlassCard>
          <CardTitle title="Top pages" description="Page views" />
          <BarList rows={s.pages.map(([p, n]) => [PAGE_NAMES[p] ?? p, n])} />
        </GlassCard>
        <GlassCard>
          <CardTitle title="Where visitors come from" description="First page of each visit" />
          <BarList rows={s.referrers.slice(0, 8)} color={SERIES[2]} />
        </GlassCard>
        <GlassCard>
          <CardTitle title="Calls & directions by page" description="Which page drove the tap" />
          <BarList
            rows={s.conversionsByPage.map(([p, n]) => [PAGE_NAMES[p] ?? p, n])}
            color={SERIES[1]}
            empty="No taps yet"
          />
        </GlassCard>
        <GlassCard>
          <CardTitle title="Audience" description="Share of visitors" />
          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <p className="mb-3 text-xs font-medium text-muted-foreground">Device</p>
              <BarList
                rows={pct(s.devices).map(([k, v]) => [k === "mobile" ? "Mobile" : "Desktop", v])}
                format={(n) => `${n}%`}
              />
            </div>
            <div>
              <p className="mb-3 text-xs font-medium text-muted-foreground">Language</p>
              <BarList rows={pct(s.languages)} format={(n) => `${n}%`} />
            </div>
          </div>
        </GlassCard>
      </div>

      <p className="mt-6 flex items-start gap-2 text-xs text-muted-foreground">
        <Info className="mt-0.5 h-3.5 w-3.5 shrink-0" />
        {data.settings.demo ? "Includes sample traffic. " : ""}
        In local mode the tracker only records visits made in this browser. To see every visitor,
        connect the database and set VITE_ANALYTICS_ENDPOINT (docs/admin.md).
      </p>
    </>
  );
}
