import { beforeEach, expect, it, vi } from "vitest";

const db = vi.hoisted(() => ({ rpc: vi.fn(), from: vi.fn(), upsert: vi.fn() }));
vi.mock("@/integrations/supabase/client.server", () => ({ supabaseAdmin: db }));
vi.mock("@tanstack/react-start", () => ({
  createServerFn: () => {
    let validate = (input: unknown): unknown => input;
    const builder = {
      validator: (fn: typeof validate) => { validate = fn; return builder; },
      handler: (fn: (input: { data: unknown }) => unknown) => (input: { data: unknown }) => fn({ data: validate(input.data) }),
    };
    return builder;
  },
}));
import { recordSiteEvent } from "@/admin/data.functions";

const event = { id: "bb1fdc0c-15b8-4b7c-99a2-1acf6c269657", type: "pageview" as const, path: "/shop", lang: "en" as const, referrer: "", device: "desktop" as const, sessionId: "test", at: "2026-10-22T22:00:00.000Z" };
beforeEach(() => {
  vi.resetAllMocks();
  db.from.mockReturnValue({ upsert: db.upsert });
  db.upsert.mockResolvedValue({ error: null });
});
it("does not store events when the atomic quota is exhausted", async () => {
  db.rpc.mockResolvedValue({ data: false, error: null });
  expect(await recordSiteEvent({ data: event })).toEqual({ ok: false });
  expect(db.rpc).toHaveBeenCalledWith("claim_telemetry_slot");
  expect(db.from).not.toHaveBeenCalled();
});
it("fails closed when the quota cannot be checked", async () => {
  db.rpc.mockResolvedValue({ data: null, error: { message: "Unavailable" } });
  expect(await recordSiteEvent({ data: event })).toEqual({ ok: false });
  expect(db.upsert).not.toHaveBeenCalled();
});
it("stores a validated event after the server confirms a quota slot", async () => {
  db.rpc.mockResolvedValue({ data: true, error: null });
  expect(await recordSiteEvent({ data: event })).toEqual({ ok: true });
  expect(db.from).toHaveBeenCalledWith("site_events");
  expect(db.upsert).toHaveBeenCalledTimes(1);
});