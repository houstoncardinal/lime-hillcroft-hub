import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { Mail, Pencil, Phone, Plus, UserPlus, Users } from "lucide-react";
import { toast } from "sonner";

import { useNow } from "@/admin/hooks";
import { entryMinutes, fmtDuration, weekStart } from "@/admin/payroll";
import { staff, useAdminData, type EmployeeInput } from "@/admin/store";
import { ROLES, type Employee } from "@/admin/types";
import { money } from "@/admin/format";
import {
  Avatar,
  Badge,
  Button,
  EmptyState,
  Field,
  GlassCard,
  Input,
  Modal,
  PageHeader,
  Select,
} from "@/admin/ui";

export const Route = createFileRoute("/admin/employees")({
  component: Employees,
});

const COLORS = ["#3987e5", "#d95926", "#199e70", "#9085e9", "#c98500", "#d55181", "#e66767"];

function Employees() {
  const data = useAdminData();
  const now = useNow(60_000);
  const [editing, setEditing] = useState<Employee | "new" | null>(null);
  const [showInactive, setShowInactive] = useState(false);
  const week = weekStart(new Date(now)).getTime();

  const list = data.employees.filter((e) => showInactive || e.active);

  return (
    <>
      <PageHeader
        title="Employees"
        description="Your team, their pay rates and time-clock PINs."
        actions={
          <>
            <Button onClick={() => setShowInactive((v) => !v)}>
              {showInactive ? "Hide inactive" : "Show inactive"}
            </Button>
            <Button tone="primary" onClick={() => setEditing("new")}>
              <UserPlus className="h-4 w-4" /> Add employee
            </Button>
          </>
        }
      />

      {list.length === 0 ? (
        <GlassCard>
          <EmptyState
            icon={Users}
            title="No employees yet"
            body="Add your team so they can clock in with a PIN and show up in payroll."
            action={
              <Button tone="primary" onClick={() => setEditing("new")}>
                <Plus className="h-4 w-4" /> Add employee
              </Button>
            }
          />
        </GlassCard>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {list.map((e) => {
            const open = data.timeEntries.find((t) => t.employeeId === e.id && !t.clockOut);
            const weekMinutes = data.timeEntries
              .filter((t) => t.employeeId === e.id && Date.parse(t.clockIn) >= week)
              .reduce((s, t) => s + entryMinutes(t, now), 0);
            const ot = Math.max(0, weekMinutes - data.settings.overtimeThreshold * 60);
            return (
              <GlassCard key={e.id} className={e.active ? "" : "opacity-60"}>
                <div className="flex items-start gap-4">
                  <Avatar employee={e} />
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-semibold">{e.name}</p>
                    <p className="text-sm text-muted-foreground">{e.role}</p>
                  </div>
                  <Button
                    tone="ghost"
                    size="sm"
                    aria-label={`Edit ${e.name}`}
                    onClick={() => setEditing(e)}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                </div>
                <div className="mt-5 flex flex-wrap gap-2">
                  {!e.active ? (
                    <Badge>Inactive</Badge>
                  ) : open ? (
                    <Badge tone="good">On the clock</Badge>
                  ) : (
                    <Badge>Off the clock</Badge>
                  )}
                  {ot > 0 && <Badge tone="warning">{fmtDuration(ot)} overtime</Badge>}
                  {!e.pinHash && <Badge tone="critical">No PIN</Badge>}
                </div>
                <dl className="mt-5 grid grid-cols-2 gap-3 text-sm">
                  <div className="rounded-xl bg-white/4 p-3">
                    <dt className="text-xs text-muted-foreground">Hourly rate</dt>
                    <dd className="tabular mt-0.5 font-semibold">{money(e.hourlyRate)}</dd>
                  </div>
                  <div className="rounded-xl bg-white/4 p-3">
                    <dt className="text-xs text-muted-foreground">This week</dt>
                    <dd className="tabular mt-0.5 font-semibold">{fmtDuration(weekMinutes)}</dd>
                  </div>
                </dl>
                {(e.phone || e.email) && (
                  <div className="mt-4 space-y-1 text-sm text-muted-foreground">
                    {e.phone && (
                      <a
                        href={`tel:${e.phone}`}
                        className="flex items-center gap-2 hover:text-foreground"
                      >
                        <Phone className="h-3.5 w-3.5" /> {e.phone}
                      </a>
                    )}
                    {e.email && (
                      <a
                        href={`mailto:${e.email}`}
                        className="flex items-center gap-2 hover:text-foreground"
                      >
                        <Mail className="h-3.5 w-3.5" /> {e.email}
                      </a>
                    )}
                  </div>
                )}
              </GlassCard>
            );
          })}
        </div>
      )}

      {editing && (
        <EmployeeEditor
          employee={editing === "new" ? null : editing}
          taken={data.employees.filter((e) => editing === "new" || e.id !== editing.id)}
          onClose={() => setEditing(null)}
        />
      )}
    </>
  );
}

function EmployeeEditor({
  employee,
  taken,
  onClose,
}: {
  employee: Employee | null;
  taken: Employee[];
  onClose: () => void;
}) {
  const [form, setForm] = useState<EmployeeInput>(() =>
    employee
      ? { ...employee, pin: "" }
      : {
          name: "",
          role: "Sales associate",
          email: "",
          phone: "",
          hourlyRate: 1500,
          color: COLORS[taken.length % COLORS.length] ?? "#3987e5",
          active: true,
          startDate: new Date().toISOString().slice(0, 10),
          pin: "",
        },
  );
  const [busy, setBusy] = useState(false);
  const set = <K extends keyof EmployeeInput>(k: K, v: EmployeeInput[K]) =>
    setForm((f) => ({ ...f, [k]: v }));

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (!form.name.trim()) return void toast.error("Add a name");
    if (form.pin && !/^\d{4}$/.test(form.pin))
      return void toast.error("PIN must be exactly 4 digits");
    if (!employee && !form.pin) return void toast.error("Set a 4-digit PIN for the time clock");
    if (form.pin) {
      const match = await staff.byPin(form.pin);
      if (match && match.id !== employee?.id)
        return void toast.error("Another employee already uses that PIN");
    }
    setBusy(true);
    await staff.save({ ...form, ...(employee ? { id: employee.id } : {}) });
    toast.success(employee ? "Employee updated" : "Employee added");
    onClose();
  };

  return (
    <Modal
      open
      onOpenChange={(o) => !o && onClose()}
      title={employee ? `Edit ${employee.name}` : "Add employee"}
      wide
    >
      <form onSubmit={(e) => void submit(e)} className="grid gap-4 sm:grid-cols-2">
        <Field label="Full name" className="sm:col-span-2">
          <Input autoFocus value={form.name} onChange={(e) => set("name", e.target.value)} />
        </Field>
        <Field label="Role">
          <Select
            value={form.role}
            onChange={(e) => set("role", e.target.value as EmployeeInput["role"])}
          >
            {ROLES.map((r) => (
              <option key={r}>{r}</option>
            ))}
          </Select>
        </Field>
        <Field label="Hourly rate">
          <Input
            inputMode="decimal"
            defaultValue={(form.hourlyRate / 100).toFixed(2)}
            onChange={(e) => set("hourlyRate", Math.round((Number(e.target.value) || 0) * 100))}
          />
        </Field>
        <Field label="Phone">
          <Input type="tel" value={form.phone} onChange={(e) => set("phone", e.target.value)} />
        </Field>
        <Field label="Email">
          <Input type="email" value={form.email} onChange={(e) => set("email", e.target.value)} />
        </Field>
        <Field label="Start date">
          <Input
            type="date"
            value={form.startDate}
            onChange={(e) => set("startDate", e.target.value)}
          />
        </Field>
        <Field
          label={employee ? "New time-clock PIN" : "Time-clock PIN"}
          hint={
            employee ? "Leave blank to keep the current PIN." : "4 digits, unique per employee."
          }
        >
          <Input
            inputMode="numeric"
            maxLength={4}
            autoComplete="off"
            value={form.pin ?? ""}
            onChange={(e) => set("pin", e.target.value.replace(/\D/g, ""))}
          />
        </Field>
        <Field label="Color" className="sm:col-span-2">
          <div className="flex gap-2">
            {COLORS.map((c) => (
              <button
                key={c}
                type="button"
                aria-label={`Color ${c}`}
                onClick={() => set("color", c)}
                className={`h-8 w-8 cursor-pointer rounded-full ring-2 ring-offset-2 ring-offset-transparent transition ${form.color === c ? "ring-white" : "ring-transparent"}`}
                style={{ background: c }}
              />
            ))}
          </div>
        </Field>
        <label className="flex cursor-pointer items-center gap-3 rounded-xl bg-white/5 px-4 py-3 text-sm sm:col-span-2">
          <input
            type="checkbox"
            className="h-4 w-4 accent-[var(--primary)]"
            checked={form.active}
            onChange={(e) => set("active", e.target.checked)}
          />
          Active (can clock in and appears in payroll)
        </label>
        <div className="flex justify-end gap-2 sm:col-span-2">
          <Button onClick={onClose}>Cancel</Button>
          <Button tone="primary" type="submit" disabled={busy}>
            {employee ? "Save changes" : "Add employee"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
