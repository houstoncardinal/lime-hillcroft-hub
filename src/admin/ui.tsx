import type { ComponentProps, ReactNode } from "react";
import {
  AlertTriangle,
  ArrowDownRight,
  ArrowUpRight,
  CheckCircle2,
  Info,
  Minus,
  XCircle,
} from "lucide-react";

import type { Employee } from "@/admin/types";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export function GlassCard({
  className,
  children,
  ...props
}: ComponentProps<"section"> & { children: ReactNode }) {
  return (
    <section className={cn("glass rounded-3xl p-6", className)} {...props}>
      {children}
    </section>
  );
}

export function CardTitle({
  title,
  description,
  actions,
}: {
  title: string;
  description?: string | undefined;
  actions?: ReactNode;
}) {
  return (
    <div className="mb-5 flex flex-wrap items-start justify-between gap-3">
      <div>
        <h2 className="text-base font-semibold tracking-tight">{title}</h2>
        {description && <p className="mt-0.5 text-sm text-muted-foreground">{description}</p>}
      </div>
      {actions && <div className="flex flex-wrap items-center gap-2">{actions}</div>}
    </div>
  );
}

export function PageHeader({
  title,
  description,
  actions,
}: {
  title: string;
  description?: string | undefined;
  actions?: ReactNode;
}) {
  return (
    <header className="mb-8 flex flex-wrap items-end justify-between gap-4">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">{title}</h1>
        {description && <p className="mt-2 max-w-2xl text-muted-foreground">{description}</p>}
      </div>
      {actions && <div className="flex flex-wrap items-center gap-2">{actions}</div>}
    </header>
  );
}

type ButtonTone = "primary" | "glass" | "ghost" | "danger";

const BUTTON_TONES: Record<ButtonTone, string> = {
  primary:
    "bg-primary text-primary-foreground shadow-[0_8px_30px_-8px] shadow-primary/60 hover:brightness-110",
  glass: "glass text-foreground hover:bg-white/10",
  ghost: "text-muted-foreground hover:bg-white/8 hover:text-foreground",
  danger: "bg-red-500/15 text-red-300 ring-1 ring-red-400/30 hover:bg-red-500/25",
};

export function Button({
  tone = "glass",
  size = "md",
  className,
  ...props
}: ComponentProps<"button"> & { tone?: ButtonTone; size?: "sm" | "md" | "lg" }) {
  return (
    <button
      type="button"
      className={cn(
        "inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl font-medium transition disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        size === "sm" && "h-8 px-3 text-xs",
        size === "md" && "h-10 px-4 text-sm",
        size === "lg" && "h-12 px-6 text-base",
        BUTTON_TONES[tone],
        className,
      )}
      {...props}
    />
  );
}

const FIELD =
  "h-10 w-full rounded-xl border border-white/10 bg-white/5 px-3 text-sm text-foreground placeholder:text-muted-foreground/70 transition focus:border-primary/60 focus:bg-white/8 focus:outline-none focus:ring-2 focus:ring-primary/25";

export function Input({ className, ...props }: ComponentProps<"input">) {
  return <input className={cn(FIELD, className)} {...props} />;
}

export function Select({ className, children, ...props }: ComponentProps<"select">) {
  return (
    <select className={cn(FIELD, "cursor-pointer appearance-none pr-8", className)} {...props}>
      {children}
    </select>
  );
}

export function Textarea({ className, ...props }: ComponentProps<"textarea">) {
  return <textarea className={cn(FIELD, "h-auto min-h-20 py-2", className)} {...props} />;
}

export function Field({
  label,
  hint,
  className,
  children,
}: {
  label: string;
  hint?: string | undefined;
  className?: string;
  children: ReactNode;
}) {
  return (
    <label className={cn("block", className)}>
      <span className="mb-1.5 block text-xs font-medium text-muted-foreground">{label}</span>
      {children}
      {hint && <span className="mt-1 block text-xs text-muted-foreground/80">{hint}</span>}
    </label>
  );
}

export type Tone = "neutral" | "good" | "warning" | "critical" | "info";

const TONE_STYLES: Record<Tone, string> = {
  neutral: "bg-white/8 text-muted-foreground ring-white/10",
  good: "bg-emerald-500/12 text-emerald-300 ring-emerald-400/25",
  warning: "bg-amber-500/12 text-amber-300 ring-amber-400/25",
  critical: "bg-red-500/12 text-red-300 ring-red-400/25",
  info: "bg-sky-500/12 text-sky-300 ring-sky-400/25",
};
const TONE_ICONS = {
  neutral: Minus,
  good: CheckCircle2,
  warning: AlertTriangle,
  critical: XCircle,
  info: Info,
};

/** Status pill: color always ships with an icon and a label. */
export function Badge({ tone = "neutral", children }: { tone?: Tone; children: ReactNode }) {
  const Icon = TONE_ICONS[tone];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 whitespace-nowrap rounded-full px-2 py-0.5 text-xs font-medium ring-1",
        TONE_STYLES[tone],
      )}
    >
      <Icon className="h-3 w-3" aria-hidden="true" />
      {children}
    </span>
  );
}

export function StatTile({
  label,
  value,
  delta,
  deltaLabel = "vs previous period",
  upIsGood = true,
  icon: Icon,
  hint,
}: {
  label: string;
  value: string;
  delta?: number | null;
  deltaLabel?: string;
  upIsGood?: boolean;
  icon?: React.ComponentType<{ className?: string }>;
  hint?: string | undefined;
}) {
  const good = delta == null || delta === 0 ? null : delta > 0 === upIsGood;
  const DeltaIcon =
    delta == null ? null : delta === 0 ? Minus : delta > 0 ? ArrowUpRight : ArrowDownRight;
  return (
    <GlassCard className="relative overflow-hidden p-5">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">{label}</p>
        {Icon && (
          <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-white/6 text-primary">
            <Icon className="h-4 w-4" />
          </span>
        )}
      </div>
      <p className="tabular mt-3 text-3xl font-semibold tracking-tight">{value}</p>
      {delta !== undefined ? (
        <p className="mt-2 flex items-center gap-1 text-xs text-muted-foreground">
          <span
            className={cn(
              "inline-flex items-center gap-0.5 font-medium",
              good === true && "text-emerald-300",
              good === false && "text-red-300",
            )}
          >
            {DeltaIcon && <DeltaIcon className="h-3.5 w-3.5" aria-hidden="true" />}
            {delta == null ? "" : `${delta > 0 ? "+" : ""}${delta}%`}
          </span>
          {delta == null ? "No earlier data to compare" : deltaLabel}
        </p>
      ) : (
        hint && <p className="mt-2 text-xs text-muted-foreground">{hint}</p>
      )}
    </GlassCard>
  );
}

export function EmptyState({
  icon: Icon,
  title,
  body,
  action,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  body: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-center px-6 py-14 text-center">
      <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/6 text-primary">
        <Icon className="h-5 w-5" />
      </span>
      <p className="mt-4 font-semibold">{title}</p>
      <p className="mt-1 max-w-sm text-sm text-muted-foreground">{body}</p>
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}

export function Modal({
  open,
  onOpenChange,
  title,
  description,
  children,
  wide,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string | undefined;
  children: ReactNode;
  wide?: boolean;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className={cn(
          "glass-strong max-h-[90svh] overflow-y-auto rounded-3xl border-white/10 text-foreground",
          wide ? "sm:max-w-2xl" : "sm:max-w-lg",
        )}
      >
        <DialogHeader>
          <DialogTitle className="text-xl">{title}</DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
}

/** Glass table wrapper with horizontal scroll on small screens. */
export function Table({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn("-mx-6 overflow-x-auto", className)}>
      <table className="w-full min-w-[960px] border-separate border-spacing-0 text-sm [&_td]:border-t [&_td]:border-white/6 [&_td]:px-6 [&_td]:py-3 [&_th]:px-6 [&_th]:pb-3 [&_th]:text-left [&_th]:text-xs [&_th]:font-medium [&_th]:text-muted-foreground">
        {children}
      </table>
    </div>
  );
}

export function Avatar({ employee, small }: { employee: Employee; small?: boolean }) {
  return (
    <span
      className={cn(
        "flex shrink-0 items-center justify-center rounded-full font-semibold text-white",
        small ? "h-7 w-7 text-[10px]" : "h-10 w-10 text-xs",
      )}
      style={{ background: employee.color }}
      aria-hidden="true"
    >
      {employee.name
        .split(" ")
        .map((w) => w[0])
        .join("")
        .slice(0, 2)}
    </span>
  );
}
