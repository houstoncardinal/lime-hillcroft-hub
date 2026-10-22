import { useSession } from "@tanstack/react-start/server";

export function adminSession() {
  const password = process.env["ADMIN_SESSION_SECRET"];
  if (!password) throw new Error("Admin login is not configured");
  return useSession<{ email?: string }>({ password, name: "tic-admin", maxAge: 60 * 60 * 12, cookie: { httpOnly: true, secure: true, sameSite: "lax", path: "/" } });
}

export async function requireAdmin() {
  const session = await adminSession();
  const email = (session.data.email ?? "").trim().toLowerCase();
  const allowed = ["", "_2", "_3", "_4"]
    .map((s) => (process.env[`ADMIN_LOGIN_EMAIL${s}`] ?? "").trim().toLowerCase())
    .filter(Boolean);
  if (!email || !allowed.includes(email)) throw Object.assign(new Error("Unauthorized"), { statusCode: 401 });
  return email;
}