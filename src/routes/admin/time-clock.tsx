import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState, type FormEvent } from "react";
import { Delete, LogIn, LogOut, Pencil, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";

import { useNow } from "@/admin/hooks";
import { entryMinutes, fmtDuration, weekStart } from "@/admin/payroll";
import { staff, useAdminData } from "@/admin/store";
import type { Employee, TimeEntry } from "@/admin/types";
import {
  Avatar,
  Badge,
  Button,
  CardTitle,
  Field,
  GlassCard,
  Input,
  Modal,
  PageHeader,
  Select,
  Table,
} from "@/admin/ui";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/admin/time-clock")({
  component: TimeClock,
});

const time = (iso: string) =>
  new Date(iso).toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });

function TimeClock() {
  const data = useAdminData();
  const now = useNow(1000);
  const [weekOffset, setWeekOffset] = useState(0);
  const [employeeFilter, setEmployeeFilter] = useState("all");
  const [editing, setEditing] = useState<TimeEntry | "new" | null>(null);

  const week = useMemo(() => {
    const start = weekStart(new Date(now));
    start.setDate(start.getDate() + weekOffset * 7);
    const end = new Date(start);
    end.setDate(end.getDate() + 7);
    return { start, end };
  }, [now, weekOffset]);

  const entries = data.timeEntries.filter((t) => {
    const ts = Date.parse(t.clockIn);
    if (ts < week.start.getTime() || ts >= week.end.getTime()) return false;
    return employeeFilter === "all" || t.employeeId === employeeFilter;
  });
  const total = entries.reduce((s, t) => s + entryMinutes(t, now), 0);
  const employee = (id: string) => data.employees.find((e) => e.id === id);

  return (
    <>
      <PageHeader
        title="Time clock"
        description="Staff clock in and out with their 4-digit PIN. Leave this page open on the store tablet."
      />

      <div className="grid gap-6 xl:grid-cols-[minmax(0,26rem)_1fr]">
        <Kiosk now={now} />

        <GlassCard>
          <CardTitle
            title="Who's working"
            description={new Date(now).toLocaleDateString("en-US", {
              weekday: "long",
              month: "long",
              day: "numeric",
            })}
          />
          <ul className="grid gap-3 sm:grid-cols-2">
            {data.employees
              .filter((e) => e.active)
              .map((e) => {
                const open = data.timeEntries.find((t) => t.employeeId === e.id && !t.clockOut);
                return (
                  <li key={e.id} className="flex items-center gap-3 rounded-2xl bg-white/4 p-3">
                    <Avatar employee={e} />
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm font-medium">{e.name}</span>
                      <span className="block text-xs text-muted-foreground">
                        {open ? `In since ${time(open.clockIn)}` : e.role}
                      </span>
                    </span>
                    {open ? (
                      <Badge tone="good">{fmtDuration(entryMinutes(open, now))}</Badge>
                    ) : (
                      <Badge>Off</Badge>
                    )}
                  </li>
                );
              })}
          </ul>
        </GlassCard>
      </div>

      <GlassCard className="mt-6">
        <CardTitle
          title="Timesheets"
          description={`Week of ${week.start.toLocaleDateString("en-US", { month: "short", day: "numeric" })} · ${fmtDuration(total)} total`}
          actions={
            <>
              <Select
                className="w-auto"
                value={employeeFilter}
                onChange={(e) => setEmployeeFilter(e.target.value)}
                aria-label="Employee"
              >
                <option value="all">All staff</option>
                {data.employees.map((e) => (
                  <option key={e.id} value={e.id}>
                    {e.name}
                  </option>
                ))}
              </Select>
              <Button size="sm" onClick={() => setWeekOffset((w) => w - 1)}>
                ← Prev
              </Button>
              <Button size="sm" onClick={() => setWeekOffset(0)} disabled={weekOffset === 0}>
                This week
              </Button>
              <Button
                size="sm"
                onClick={() => setWeekOffset((w) => w + 1)}
                disabled={weekOffset >= 0}
              >
                Next →
              </Button>
              <Button size="sm" tone="primary" onClick={() => setEditing("new")}>
                <Plus className="h-3.5 w-3.5" /> Add shift
              </Button>
            </>
          }
        />
        {entries.length === 0 ? (
          <p className="py-10 text-center text-sm text-muted-foreground">No shifts this week.</p>
        ) : (
          <Table>
            <thead>
              <tr>
                <th>Employee</th>
                <th>Date</th>
                <th>In</th>
                <th>Out</th>
                <th>Break</th>
                <th className="text-right!">Worked</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {entries.map((t) => {
                const e = employee(t.employeeId);
                return (
                  <tr key={t.id}>
                    <td>
                      <span className="flex items-center gap-2">
                        {e && <Avatar employee={e} small />}
                        {e?.name ?? "Former employee"}
                      </span>
                    </td>
                    <td className="text-muted-foreground">
                      {new Date(t.clockIn).toLocaleDateString("en-US", {
                        weekday: "short",
                        month: "short",
                        day: "numeric",
                      })}
                    </td>
                    <td className="tabular">{time(t.clockIn)}</td>
                    <td className="tabular">
                      {t.clockOut ? time(t.clockOut) : <Badge tone="good">On the clock</Badge>}
                    </td>
                    <td className="tabular text-muted-foreground">{t.breakMinutes}m</td>
                    <td className="tabular text-right font-medium">
                      {fmtDuration(entryMinutes(t, now))}
                      {t.editedBy && (
                        <span
                          className="ml-2 text-xs text-muted-foreground"
                          title={`Edited by ${t.editedBy}`}
                        >
                          edited
                        </span>
                      )}
                    </td>
                    <td>
                      <div className="flex justify-end">
                        <Button
                          tone="ghost"
                          size="sm"
                          aria-label="Edit shift"
                          onClick={() => setEditing(t)}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        )}
      </GlassCard>

      {editing && (
        <EntryEditor
          entry={editing === "new" ? null : editing}
          employees={data.employees}
          onClose={() => setEditing(null)}
        />
      )}
    </>
  );
}

function Kiosk({ now }: { now: number }) {
  const [pin, setPin] = useState("");
  const [who, setWho] = useState<Employee | null>(null);
  const [breakMinutes, setBreakMinutes] = useState(30);
  const data = useAdminData();
  const open = who ? data.timeEntries.find((t) => t.employeeId === who.id && !t.clockOut) : null;

  // Reset the kiosk after 20s of inactivity once someone is identified.
  useEffect(() => {
    if (!who) return;
    const id = setTimeout(() => setWho(null), 20_000);
    return () => clearTimeout(id);
  }, [who]);

  const press = async (d: string) => {
    if (who) return;
    const next = (pin + d).slice(0, 4);
    setPin(next);
    if (next.length === 4) {
      const emp = await staff.byPin(next);
      setPin("");
      if (emp) setWho(emp);
      else toast.error("PIN not recognized");
    }
  };

  const done = (msg: string) => {
    toast.success(msg);
    setWho(null);
  };

  return (
    <GlassCard className="flex flex-col items-center text-center">
      <p className="tabular text-5xl font-semibold tracking-tight">
        {new Date(now).toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" })}
      </p>
      <p className="mt-1 text-sm text-muted-foreground">
        {new Date(now).toLocaleDateString("en-US", {
          weekday: "long",
          month: "long",
          day: "numeric",
        })}
      </p>

      {who ? (
        <div className="mt-8 w-full">
          <div className="flex flex-col items-center">
            <Avatar employee={who} />
            <p className="mt-3 text-xl font-semibold">Hi, {who.name.split(" ")[0]}</p>
            <p className="text-sm text-muted-foreground">
              {open
                ? `On the clock since ${time(open.clockIn)} · ${fmtDuration(entryMinutes(open, now))}`
                : "You're currently clocked out."}
            </p>
          </div>
          {open ? (
            <div className="mt-6 space-y-3">
              <Field label="Unpaid break taken">
                <Select
                  value={breakMinutes}
                  onChange={(e) => setBreakMinutes(Number(e.target.value))}
                >
                  {[0, 15, 30, 45, 60].map((m) => (
                    <option key={m} value={m}>
                      {m ? `${m} minutes` : "No break"}
                    </option>
                  ))}
                </Select>
              </Field>
              <Button
                tone="primary"
                size="lg"
                className="w-full"
                onClick={() => {
                  staff.clockOut(who.id, breakMinutes);
                  done(`${who.name} clocked out`);
                }}
              >
                <LogOut className="h-5 w-5" /> Clock out
              </Button>
            </div>
          ) : (
            <Button
              tone="primary"
              size="lg"
              className="mt-6 w-full"
              onClick={() => {
                staff.clockIn(who.id);
                done(`${who.name} clocked in`);
              }}
            >
              <LogIn className="h-5 w-5" /> Clock in
            </Button>
          )}
          <Button tone="ghost" className="mt-2 w-full" onClick={() => setWho(null)}>
            Cancel
          </Button>
        </div>
      ) : (
        <>
          <div className="mt-8 flex gap-3" aria-label={`${pin.length} of 4 digits entered`}>
            {[0, 1, 2, 3].map((i) => (
              <span
                key={i}
                className={cn(
                  "h-3.5 w-3.5 rounded-full ring-1 ring-white/25 transition",
                  i < pin.length && "bg-primary ring-primary",
                )}
              />
            ))}
          </div>
          <div className="mt-6 grid w-full max-w-xs grid-cols-3 gap-3">
            {["1", "2", "3", "4", "5", "6", "7", "8", "9"].map((d) => (
              <KeyButton key={d} onClick={() => void press(d)}>
                {d}
              </KeyButton>
            ))}
            <span />
            <KeyButton onClick={() => void press("0")}>0</KeyButton>
            <KeyButton aria-label="Delete digit" onClick={() => setPin((p) => p.slice(0, -1))}>
              <Delete className="mx-auto h-5 w-5" />
            </KeyButton>
          </div>
          <p className="mt-5 text-xs text-muted-foreground">Enter your 4-digit PIN</p>
        </>
      )}
    </GlassCard>
  );
}

function KeyButton(props: React.ComponentProps<"button">) {
  return (
    <button
      type="button"
      className="glass tabular h-16 cursor-pointer rounded-2xl text-2xl font-semibold transition hover:bg-white/10 active:scale-95"
      {...props}
    />
  );
}

const toLocalInput = (iso: string) => {
  const d = new Date(iso);
  d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
  return d.toISOString().slice(0, 16);
};

function EntryEditor({
  entry,
  employees,
  onClose,
}: {
  entry: TimeEntry | null;
  employees: Employee[];
  onClose: () => void;
}) {
  const [employeeId, setEmployeeId] = useState(entry?.employeeId ?? employees[0]?.id ?? "");
  const [clockIn, setClockIn] = useState(toLocalInput(entry?.clockIn ?? new Date().toISOString()));
  const [clockOut, setClockOut] = useState(entry?.clockOut ? toLocalInput(entry.clockOut) : "");
  const [breakMinutes, setBreakMinutes] = useState(entry?.breakMinutes ?? 30);
  const [note, setNote] = useState(entry?.note ?? "");

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const inIso = new Date(clockIn).toISOString();
    const outIso = clockOut ? new Date(clockOut).toISOString() : null;
    if (outIso && outIso <= inIso) return void toast.error("Clock-out must be after clock-in");
    staff.saveEntry(
      {
        ...(entry ? { id: entry.id } : {}),
        employeeId,
        clockIn: inIso,
        clockOut: outIso,
        breakMinutes,
        note,
        editedBy: "Manager",
      },
      "Manager",
    );
    toast.success(entry ? "Shift updated" : "Shift added");
    onClose();
  };

  return (
    <Modal
      open
      onOpenChange={(o) => !o && onClose()}
      title={entry ? "Edit shift" : "Add shift"}
      description="Manager edits are marked on the timesheet."
    >
      <form onSubmit={submit} className="space-y-4">
        <Field label="Employee">
          <Select value={employeeId} onChange={(e) => setEmployeeId(e.target.value)}>
            {employees.map((e) => (
              <option key={e.id} value={e.id}>
                {e.name}
              </option>
            ))}
          </Select>
        </Field>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Clock in">
            <Input
              type="datetime-local"
              value={clockIn}
              onChange={(e) => setClockIn(e.target.value)}
              required
            />
          </Field>
          <Field label="Clock out" hint="Leave empty if still working.">
            <Input
              type="datetime-local"
              value={clockOut}
              onChange={(e) => setClockOut(e.target.value)}
            />
          </Field>
        </div>
        <Field label="Unpaid break (minutes)">
          <Input
            type="number"
            min={0}
            value={breakMinutes}
            onChange={(e) => setBreakMinutes(Math.max(0, Number(e.target.value) || 0))}
          />
        </Field>
        <Field label="Note">
          <Input
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Reason for the change"
          />
        </Field>
        <div className="flex justify-between gap-2">
          {entry ? (
            <Button
              tone="danger"
              onClick={() => {
                if (!confirm("Delete this shift?")) return;
                staff.removeEntry(entry.id);
                toast.success("Shift deleted");
                onClose();
              }}
            >
              <Trash2 className="h-4 w-4" /> Delete
            </Button>
          ) : (
            <span />
          )}
          <div className="flex gap-2">
            <Button onClick={onClose}>Cancel</Button>
            <Button tone="primary" type="submit">
              Save
            </Button>
          </div>
        </div>
      </form>
    </Modal>
  );
}
