import { createServerFn } from "@tanstack/react-start";
import { useSession } from "@tanstack/react-start/server";
import { createHash, timingSafeEqual } from "node:crypto";

type AdminSession = { email?: string };

function sessionConfig() {
  return {
    password: process.env["ADMIN_SESSION_SECRET"]!,
    name: "tic-admin",
    maxAge: 60 * 60 * 12, // 12 hours
    cookie: { httpOnly: true, secure: true, sameSite: "lax" as const, path: "/" },
  };
}

function same(a: string, b: string) {
  const x = createHash("sha256").update(a, "utf8").digest();
  const y = createHash("sha256").update(b, "utf8").digest();
  return timingSafeEqual(x, y);
}

export const adminLogin = createServerFn({ method: "POST" })
  .inputValidator((d: { email: string; password: string }) => ({
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
    const session = await useSession<AdminSession>(sessionConfig());
    await session.update({ email });
    return { ok: true as const };
  });

export const adminStatus = createServerFn({ method: "GET" }).handler(async () => {
  const session = await useSession<AdminSession>(sessionConfig());
  return { email: session.data.email ?? null };
});

export const adminLogout = createServerFn({ method: "POST" }).handler(async () => {
  const session = await useSession<AdminSession>(sessionConfig());
  await session.clear();
  return { ok: true as const };
});
