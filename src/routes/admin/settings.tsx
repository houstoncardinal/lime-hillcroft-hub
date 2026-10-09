import { createFileRoute } from "@tanstack/react-router";
import { useRef, useState, type FormEvent } from "react";
import {
  Database,
  Download,
  KeyRound,
  Lock,
  RotateCcw,
  Sparkles,
  Trash2,
  Upload,
} from "lucide-react";
import { toast } from "sonner";

import { download } from "@/admin/csv";
import { settings, useAdminData } from "@/admin/store";
import { clearTrackedEvents } from "@/admin/tracker";
import { Button, CardTitle, Field, GlassCard, Input, PageHeader, Select } from "@/admin/ui";
import { ThemeGrid } from "@/components/site/theme-switcher";
import { useTheme } from "@/components/site/use-theme";
import { ADMIN_THEME_KEY } from "@/components/site/themes";

export const Route = createFileRoute("/admin/settings")({
  component: Settings,
});

function Settings() {
  const data = useAdminData();
  const s = data.settings;
  const fileRef = useRef<HTMLInputElement>(null);
  const [current, setCurrent] = useState("");
  const [next, setNext] = useState("");
  const [theme, setTheme] = useTheme(ADMIN_THEME_KEY);

  const changePasscode = async (e: FormEvent) => {
    e.preventDefault();
    if (!(await settings.checkPasscode(current)))
      return void toast.error("Current passcode is incorrect");
    if (next.length < 6) return void toast.error("Use at least 6 characters");
    await settings.setPasscode(next);
    setCurrent("");
    setNext("");
    toast.success("Passcode changed");
  };

  return (
    <>
      <PageHeader title="Settings" description="Payroll rules, security and your data." />

      <GlassCard className="mb-6">
        <CardTitle
          title="Appearance"
          description="Dashboard theme for this device. The website has its own theme picker (palette icon in its header)."
        />
        <ThemeGrid value={theme} onChange={setTheme} large />
      </GlassCard>

      <div className="grid gap-6 xl:grid-cols-2">
        <GlassCard>
          <CardTitle title="Payroll rules" description="Used by Payroll and the overtime badges." />
          <div className="grid gap-4 sm:grid-cols-3">
            <Field label="Pay period">
              <Select
                value={s.payPeriod}
                onChange={(e) => settings.save({ payPeriod: e.target.value as typeof s.payPeriod })}
              >
                <option value="weekly">Weekly</option>
                <option value="biweekly">Every 2 weeks</option>
              </Select>
            </Field>
            <Field label="Overtime after (hours/week)" hint="Federal (FLSA) standard is 40.">
              <Input
                type="number"
                min={1}
                value={s.overtimeThreshold}
                onChange={(e) =>
                  settings.save({ overtimeThreshold: Math.max(1, Number(e.target.value) || 40) })
                }
              />
            </Field>
            <Field label="Overtime multiplier">
              <Input
                type="number"
                min={1}
                step={0.25}
                value={s.overtimeMultiplier}
                onChange={(e) =>
                  settings.save({ overtimeMultiplier: Math.max(1, Number(e.target.value) || 1.5) })
                }
              />
            </Field>
          </div>
        </GlassCard>

        <GlassCard>
          <CardTitle title="Dashboard passcode" description="Locks the dashboard on this device." />
          <form
            onSubmit={(e) => void changePasscode(e)}
            className="grid gap-4 sm:grid-cols-[1fr_1fr_auto] sm:items-end"
          >
            <Field label="Current passcode">
              <Input
                type="password"
                autoComplete="current-password"
                value={current}
                onChange={(e) => setCurrent(e.target.value)}
              />
            </Field>
            <Field label="New passcode">
              <Input
                type="password"
                autoComplete="new-password"
                value={next}
                onChange={(e) => setNext(e.target.value)}
              />
            </Field>
            <Button tone="primary" type="submit">
              <Lock className="h-4 w-4" /> Change
            </Button>
          </form>
        </GlassCard>

        <GlassCard>
          <CardTitle
            title="Backup"
            description="Local mode keeps everything in this browser. Download a backup regularly, or move to a database (docs/admin.md)."
          />
          <div className="flex flex-wrap gap-2">
            <Button
              onClick={() =>
                download(
                  `tic-dashboard-backup-${new Date().toISOString().slice(0, 10)}.json`,
                  settings.exportJson(),
                  "application/json",
                )
              }
            >
              <Download className="h-4 w-4" /> Download backup
            </Button>
            <Button onClick={() => fileRef.current?.click()}>
              <Upload className="h-4 w-4" /> Restore backup
            </Button>
            <input
              ref={fileRef}
              type="file"
              accept="application/json,.json"
              className="hidden"
              onChange={async (e) => {
                const f = e.target.files?.[0];
                e.target.value = "";
                if (!f) return;
                if (!confirm("Replace everything on this device with the backup?")) return;
                try {
                  settings.importJson(await f.text());
                  toast.success("Backup restored");
                } catch (err) {
                  toast.error((err as Error).message);
                }
              }}
            />
          </div>
          <p className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
            <Database className="h-3.5 w-3.5" />
            {data.products.length} products · {data.employees.length} employees ·{" "}
            {data.timeEntries.length} shifts · {data.payrollRuns.length} payroll runs
          </p>
        </GlassCard>

        <GlassCard>
          <CardTitle
            title="Sample data"
            description={
              s.demo
                ? "The dashboard currently shows sample data."
                : "You're running on your own data."
            }
          />
          <div className="flex flex-wrap gap-2">
            {s.demo ? (
              <Button
                tone="primary"
                onClick={() => {
                  if (
                    !confirm(
                      "Remove all sample products, staff, shifts, payroll and traffic? Your passcode and payroll rules stay.",
                    )
                  )
                    return;
                  settings.clearDemo();
                  toast.success("Sample data cleared — you're ready to go live");
                }}
              >
                <Sparkles className="h-4 w-4" /> Clear sample data & go live
              </Button>
            ) : (
              <Button
                onClick={() => {
                  if (
                    !confirm(
                      "Replace your data on this device with sample data? Download a backup first if you need it.",
                    )
                  )
                    return;
                  settings.loadDemo();
                  toast.success("Sample data loaded");
                }}
              >
                <RotateCcw className="h-4 w-4" /> Load sample data
              </Button>
            )}
            <Button
              tone="danger"
              onClick={() => {
                if (!confirm("Clear website visits recorded in this browser?")) return;
                clearTrackedEvents();
                toast.success("Tracked visits cleared");
              }}
            >
              <Trash2 className="h-4 w-4" /> Clear tracked visits
            </Button>
          </div>
          <p className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
            <KeyRound className="h-3.5 w-3.5" /> Sample time-clock PINs: 1234, 2468, 1357, 8080.
          </p>
        </GlassCard>
      </div>
    </>
  );
}
