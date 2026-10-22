import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import type { AdminData, AnalyticsEvent } from "@/admin/types";

const stateSchema = z.object({
  version: z.literal(1),
  products: z.array(z.object({ id: z.string(), quantity: z.number().int().nonnegative(), price: z.number().int().nonnegative(), cost: z.number().int().nonnegative() }).passthrough()),
  movements: z.array(z.object({ id: z.string(), productId: z.string(), delta: z.number().int() }).passthrough()),
  employees: z.array(z.object({ id: z.string(), active: z.boolean(), pinHash: z.string(), hourlyRate: z.number().int().nonnegative() }).passthrough()),
  timeEntries: z.array(z.object({ id: z.string(), employeeId: z.string(), clockIn: z.string().datetime(), clockOut: z.string().datetime().nullable(), breakMinutes: z.number().int().nonnegative() }).passthrough()),
  payrollRuns: z.array(z.object({ id: z.string(), status: z.enum(["draft", "approved", "paid"]) }).passthrough()),
  cameras: z.array(z.object({ id: z.string() }).passthrough()),
  events: z.array(z.unknown()),
  settings: z.object({ demo: z.boolean(), overtimeThreshold: z.number().positive(), overtimeMultiplier: z.number().min(1), payPeriod: z.enum(["weekly", "biweekly"]) }).passthrough(),
}).superRefine((s, ctx) => {
  const pins = s.employees.filter((e) => e.active && e.pinHash).map((e) => e.pinHash);
  if (new Set(pins).size !== pins.length) ctx.addIssue({ code: "custom", message: "Active staff must have different PINs" });
  const open = s.timeEntries.filter((e) => !e.clockOut).map((e) => e.employeeId);
  if (new Set(open).size !== open.length) ctx.addIssue({ code: "custom", message: "An employee already has an open shift" });
  if (s.timeEntries.some((e) => e.clockOut && Date.parse(e.clockOut) <= Date.parse(e.clockIn))) ctx.addIssue({ code: "custom", message: "Clock-out must follow clock-in" });
});

export const readAdminData = createServerFn({ method: "GET" }).handler(async () => {
  const { requireAdmin } = await import("@/admin/session.server");
  await requireAdmin();
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const { data, error } = await supabaseAdmin.from("store_state").select("data, revision").eq("id", "main").maybeSingle();
  if (error) throw new Error("Couldn't load shared store data");
  return data ? { data: data.data as unknown as AdminData, revision: data.revision } : null;
});

export const writeAdminData = createServerFn({ method: "POST" })
  .validator((input: unknown) => z.object({ revision: z.number().int().nonnegative(), data: stateSchema }).parse(input))
  .handler(async ({ data: input }) => {
    const { requireAdmin } = await import("@/admin/session.server");
    await requireAdmin();
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const payload = JSON.parse(JSON.stringify(input.data));
    if (input.revision === 0) {
      const { error } = await supabaseAdmin.from("store_state").insert({ id: "main", data: payload, revision: 1 });
      if (error?.code === "23505") return { conflict: true, revision: 0 };
      if (error) throw new Error("Couldn't save shared store data");
      return { conflict: false, revision: 1 };
    }
    const { data, error } = await supabaseAdmin.from("store_state").update({ data: payload, revision: input.revision + 1, updated_at: new Date().toISOString() }).eq("id", "main").eq("revision", input.revision).select("revision");
    if (error) throw new Error("Couldn't save shared store data");
    return { conflict: !data.length, revision: data[0]?.revision ?? input.revision };
  });

const eventSchema = z.object({ id: z.string().uuid(), type: z.enum(["pageview", "call", "directions", "language"]), path: z.string().max(200).startsWith("/"), lang: z.enum(["en", "es"]), referrer: z.string().max(200), device: z.enum(["mobile", "desktop"]), sessionId: z.string().max(64), at: z.string().datetime() });
export const recordSiteEvent = createServerFn({ method: "POST" }).validator((input: unknown) => eventSchema.parse(input)).handler(async ({ data }) => {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const { error } = await supabaseAdmin.from("site_events").upsert({ id: data.id, data: { ...data, path: data.path.split("?")[0] ?? "/" }, at: new Date().toISOString() }, { onConflict: "id", ignoreDuplicates: true });
  if (error) throw new Error("Could not record visit");
  return { ok: true };
});

export const readSiteEvents = createServerFn({ method: "GET" }).handler(async () => {
  const { requireAdmin } = await import("@/admin/session.server");
  await requireAdmin();
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const events: AnalyticsEvent[] = [];
  const since = new Date(Date.now() - 90 * 86400000).toISOString();
  for (let from = 0; ; from += 1000) {
    const { data, error } = await supabaseAdmin.from("site_events").select("data").gte("at", since).order("at", { ascending: false }).order("id").range(from, from + 999);
    if (error) throw new Error("Couldn't load website visits");
    events.push(...data.map((e) => e.data as unknown as AnalyticsEvent));
    if (data.length < 1000) return events;
  }
});