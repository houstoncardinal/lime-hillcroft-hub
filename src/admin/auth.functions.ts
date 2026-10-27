import { createServerFn } from "@tanstack/react-start";
import { createHash, timingSafeEqual } from "node:crypto";

function same(a: string, b: string) {
  const x = createHash("sha256").update(a, "utf8").digest();
  const y = createHash("sha256").update(b, "utf8").digest();
  return timingSafeEqual(x, y);
}

// Admin accounts live in server-only secrets as email/password pairs:
// ADMIN_LOGIN_EMAIL + ADMIN_LOGIN_PASSWORD, ADMIN_LOGIN_EMAIL_2 + ADMIN_LOGIN_PASSWORD_2, …
function adminAccounts(): { email: string; password: string }[] {
  const accounts: { email: string; password: string }[] = [];
  for (const suffix of ["", "_2", "_3", "_4"]) {
    const email = (process.env[`ADMIN_LOGIN_EMAIL${suffix}`] ?? "").trim().toLowerCase();
    const password = (process.env[`ADMIN_LOGIN_PASSWORD${suffix}`] ?? "").trim();
    if (email && password) accounts.push({ email, password });
  }
  return accounts;
}

export const adminLogin = createServerFn({ method: "POST" })
  .validator((d: { email: string; password: string }) => ({
    email: String(d?.email ?? "").trim().toLowerCase(),
    password: String(d?.password ?? ""),
  }))
  .handler(async ({ data }) => {
    const accounts = adminAccounts();
    // Failed logins compare against every account, so timing doesn't reveal which emails exist.
    const match = accounts.find((a) => same(data.email, a.email) && same(data.password.trim(), a.password));
    const { cloudAdminLogin } = await import("@/admin/cloud-access.server");
    const cloud = match ? null : await cloudAdminLogin(data.email, data.password);
    if (!match && !cloud) return { ok: false as const };
    const { adminSession } = await import("@/admin/session.server");
    const session = await adminSession();
    await session.clear();
    await session.update({ email: match?.email ?? cloud?.email, userId: cloud?.userId, accessToken: cloud?.accessToken });
    return { ok: true as const };
  });

export const adminStatus = createServerFn({ method: "GET" }).handler(async () => {
  const { requireAdmin } = await import("@/admin/session.server");
  try {
    return { email: await requireAdmin() };
  } catch {
    return { email: null };
  }
});

export const adminLogout = createServerFn({ method: "POST" }).handler(async () => {
  const { adminSession } = await import("@/admin/session.server");
  const session = await adminSession();
  await session.clear();
  return { ok: true as const };
});
