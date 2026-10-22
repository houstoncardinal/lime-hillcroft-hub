import { createServerFn } from "@tanstack/react-start";
import { createHash, timingSafeEqual } from "node:crypto";

function same(a: string, b: string) {
  const x = createHash("sha256").update(a, "utf8").digest();
  const y = createHash("sha256").update(b, "utf8").digest();
  return timingSafeEqual(x, y);
}

export const adminLogin = createServerFn({ method: "POST" })
  .validator((d: { email: string; password: string }) => ({
    email: String(d?.email ?? "").trim().toLowerCase(),
    password: String(d?.password ?? "").trim(),
  }))
  .handler(async ({ data }) => {
    const email = (process.env["ADMIN_LOGIN_EMAIL"] ?? "").trim().toLowerCase();
    const password = (process.env["ADMIN_LOGIN_PASSWORD"] ?? "").trim();
    if (!email || !password) throw new Error("Admin login is not configured");
    const emailOk = same(data.email, email);
    const passOk = same(data.password, password);
    const ok = emailOk && passOk;
    if (!ok) return { ok: false as const };
    const { adminSession } = await import("@/admin/session.server");
    const session = await adminSession();
    await session.update({ email });
    return { ok: true as const };
  });

export const adminStatus = createServerFn({ method: "GET" }).handler(async () => {
  const { adminSession } = await import("@/admin/session.server");
  const session = await adminSession();
  return { email: session.data.email ?? null };
});

export const adminLogout = createServerFn({ method: "POST" }).handler(async () => {
  const { adminSession } = await import("@/admin/session.server");
  const session = await adminSession();
  await session.clear();
  return { ok: true as const };
});
