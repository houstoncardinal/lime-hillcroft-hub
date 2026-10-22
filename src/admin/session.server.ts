import { useSession } from "@tanstack/react-start/server";

export function adminSession() {
  const password = process.env["ADMIN_SESSION_SECRET"];
  if (!password) throw new Error("Admin login is not configured");
  return useSession<{ email?: string }>({ password, name: "tic-admin", maxAge: 60 * 60 * 12, cookie: { httpOnly: true, secure: true, sameSite: "lax", path: "/" } });
}

export async function requireAdmin() {
  const session = await adminSession();
  const expected = (process.env["ADMIN_LOGIN_EMAIL"] ?? "").trim().toLowerCase();
  if (!expected || session.data.email !== expected) throw new Error("Unauthorized");
  return expected;
}