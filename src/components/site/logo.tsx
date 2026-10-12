import { cn } from "@/lib/utils";

type Ring = { r: number; count: number; dot: number; className: string };

// Open "C" of dots with the gap facing right, as in the TIC Wireless logo.
const GAP = 70;

function ringDots({ r, count }: Ring) {
  const span = 360 - GAP;
  return Array.from({ length: count }, (_, i) => {
    const deg = GAP / 2 + (span / (count - 1)) * i;
    const rad = (deg * Math.PI) / 180;
    // Rounded so server and client render identical attributes.
    const round = (n: number) => Math.round(n * 100) / 100;
    return { x: round(100 + r * Math.cos(rad)), y: round(100 - r * Math.sin(rad)) };
  });
}

export function DotRing({ rings, className }: { rings: Ring[]; className?: string }) {
  return (
    <svg viewBox="0 0 200 200" className={className} aria-hidden="true">
      {rings.map((ring) =>
        ringDots(ring).map((p, i) => (
          <circle
            key={`${ring.r}-${i}`}
            cx={p.x}
            cy={p.y}
            r={ring.dot}
            className={ring.className}
          />
        )),
      )}
    </svg>
  );
}

const LOGO_RINGS: Ring[] = [
  { r: 80, count: 12, dot: 9, className: "fill-primary" },
  { r: 52, count: 10, dot: 6.5, className: "fill-slate" },
];

export function Logo({
  className,
  light,
  compact,
}: {
  className?: string;
  light?: boolean;
  /** Smaller lockup for the header bar. */
  compact?: boolean;
}) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <DotRing rings={LOGO_RINGS} className={compact ? "h-8 w-8 shrink-0" : "h-10 w-10 shrink-0"} />
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "whitespace-nowrap font-display font-medium tracking-[0.04em]",
            compact ? "text-base sm:text-lg" : "text-xl",
            light ? "text-white" : "text-ink",
          )}
        >
          TIC Wireless
        </span>
        <span
          className={cn(
            "mt-1 whitespace-nowrap font-display font-medium uppercase tracking-[0.14em]",
            compact ? "text-[9px] sm:text-[10px]" : "text-[11px]",
            light ? "text-white/70" : "text-muted-foreground",
          )}
        >
          Electronic &amp; Repair Center
        </span>
      </span>
    </span>
  );
}
