import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

// Categorical slots validated (dataviz validate_palette.js, dark mode) on the glass surface #141e2b:
// lightness band, chroma, CVD ΔE ≥ 9.4 and contrast all pass.
export const SERIES = ["#3987e5", "#d95926", "#199e70"] as const;
const GRID = "rgba(255,255,255,0.07)";
const AXIS = "rgba(226,232,240,0.6)";

type SeriesDef = { key: string; label: string };

export function Legend({ items }: { items: { label: string; color: string }[] }) {
  return (
    <ul className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
      {items.map((i) => (
        <li key={i.label} className="flex items-center gap-1.5">
          <span className="h-2 w-3 rounded-full" style={{ background: i.color }} />
          {i.label}
        </li>
      ))}
    </ul>
  );
}

function GlassTooltip({
  active,
  payload,
  label,
  series,
}: {
  active?: boolean;
  payload?: { dataKey: string; value: number; color: string }[];
  label?: string;
  series: SeriesDef[];
}) {
  if (!active || !payload?.length) return null;
  return (
    <div className="glass-strong rounded-xl px-3 py-2 text-xs">
      <p className="mb-1 font-medium text-foreground">{label}</p>
      {series.map((s, i) => {
        const p = payload.find((x) => x.dataKey === s.key);
        return (
          <p key={s.key} className="tabular flex items-center gap-2 text-muted-foreground">
            <span className="h-2 w-2 rounded-full" style={{ background: SERIES[i] }} />
            {s.label}
            <span className="ml-auto pl-4 font-semibold text-foreground">
              {(p?.value ?? 0).toLocaleString("en-US")}
            </span>
          </p>
        );
      })}
    </div>
  );
}

/** Line + 10% area wash over time, with a crosshair tooltip. One axis only. */
export function TrendChart<T extends Record<string, string | number>>({
  data,
  xKey,
  series,
  height = 260,
  ariaLabel,
}: {
  data: T[];
  xKey: keyof T & string;
  series: SeriesDef[];
  height?: number;
  ariaLabel: string;
}) {
  return (
    <div role="img" aria-label={ariaLabel}>
      {series.length > 1 && (
        <div className="mb-3">
          <Legend
            items={series.map((s, i) => ({ label: s.label, color: SERIES[i] ?? SERIES[0] }))}
          />
        </div>
      )}
      <div style={{ height }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 8, right: 8, bottom: 0, left: -12 }}>
            <defs>
              {series.map((s, i) => (
                <linearGradient key={s.key} id={`fill-${s.key}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={SERIES[i]} stopOpacity={0.18} />
                  <stop offset="100%" stopColor={SERIES[i]} stopOpacity={0.02} />
                </linearGradient>
              ))}
            </defs>
            <CartesianGrid stroke={GRID} vertical={false} />
            <XAxis
              dataKey={xKey}
              tick={{ fill: AXIS, fontSize: 11 }}
              tickLine={false}
              axisLine={false}
              minTickGap={24}
            />
            <YAxis
              tick={{ fill: AXIS, fontSize: 11 }}
              tickLine={false}
              axisLine={false}
              allowDecimals={false}
              width={44}
            />
            <Tooltip
              cursor={{ stroke: "rgba(255,255,255,0.25)", strokeWidth: 1 }}
              content={<GlassTooltip series={series} />}
            />
            {series.map((s, i) => (
              <Area
                key={s.key}
                type="monotone"
                dataKey={s.key}
                stroke={SERIES[i]}
                strokeWidth={2}
                fill={`url(#fill-${s.key})`}
                dot={false}
                activeDot={{ r: 4.5, strokeWidth: 2, stroke: "var(--ink)" }}
              />
            ))}
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

/** Ranked horizontal bars in HTML: label, thin bar, value. */
export function BarList({
  rows,
  format = (n) => n.toLocaleString("en-US"),
  color = SERIES[0],
  empty = "No data yet",
}: {
  rows: [string, number][];
  format?: (n: number) => string;
  color?: string;
  empty?: string;
}) {
  const max = Math.max(1, ...rows.map((r) => r[1]));
  if (!rows.length) return <p className="py-6 text-sm text-muted-foreground">{empty}</p>;
  return (
    <ul className="space-y-3">
      {rows.map(([label, value]) => (
        <li key={label} title={`${label}: ${format(value)}`}>
          <div className="mb-1 flex items-baseline justify-between gap-3 text-sm">
            <span className="truncate">{label}</span>
            <span className="tabular font-medium text-muted-foreground">{format(value)}</span>
          </div>
          <div className="h-2 rounded-full bg-white/6">
            <div
              className="h-2 rounded-full"
              style={{ width: `${Math.max(2, (value / max) * 100)}%`, background: color }}
            />
          </div>
        </li>
      ))}
    </ul>
  );
}

/** Two-part stacked horizontal bars (e.g. regular vs overtime hours) with a 2px surface gap. */
export function StackedBars({
  rows,
  labels,
  format,
}: {
  rows: { label: string; a: number; b: number }[];
  labels: [string, string];
  format: (n: number) => string;
}) {
  const max = Math.max(1, ...rows.map((r) => r.a + r.b));
  return (
    <div>
      <div className="mb-4">
        <Legend
          items={[
            { label: labels[0], color: SERIES[0] },
            { label: labels[1], color: SERIES[1] },
          ]}
        />
      </div>
      <ul className="space-y-4">
        {rows.map((r) => (
          <li
            key={r.label}
            title={`${r.label}: ${labels[0]} ${format(r.a)} · ${labels[1]} ${format(r.b)}`}
          >
            <div className="mb-1.5 flex items-baseline justify-between gap-3 text-sm">
              <span className="truncate">{r.label}</span>
              <span className="tabular text-muted-foreground">
                {format(r.a + r.b)}
                {r.b > 0 && <span className="ml-1 text-xs">({format(r.b)} OT)</span>}
              </span>
            </div>
            <div className="flex h-3 gap-[2px]">
              <div
                className="h-3 rounded-l-full"
                style={{ width: `${(r.a / max) * 100}%`, background: SERIES[0] }}
              />
              {r.b > 0 && (
                <div
                  className="h-3 rounded-r-full"
                  style={{ width: `${(r.b / max) * 100}%`, background: SERIES[1] }}
                />
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
