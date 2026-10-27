import { getRequest, useSession } from "@tanstack/react-start/server";
import { cloudAdminIdentity } from "./cloud-access.server";

export function adminSession() {
  const password = process.env["ADMIN_SESSION_SECRET"];
  if (!password) throw new Error("Admin login is not configured");
  return useSession<{ email?: string; userId?: string; accessToken?: string }>({ password, name: "tic-admin", maxAge: 60 * 60 * 12, cookie: { httpOnly: true, secure: true, sameSite: "lax", path: "/" } });
}

export async function requireAdmin() {
  const session = await adminSession();
  const email = (session.data.email ?? "").trim().toLowerCase();
  const allowed = ["", "_2", "_3", "_4"]
    .map((s) => (process.env[`ADMIN_LOGIN_EMAIL${s}`] ?? "").trim().toLowerCase())
    .filter(Boolean);
  if (!session.data.userId && email && allowed.includes(email)) return email;
  const bearer = getRequest().headers.get("authorization");
  const token = bearer?.startsWith("Bearer ") ? bearer.slice(7) : session.data.accessToken;
  if (token) {
    const identity = await cloudAdminIdentity(token, bearer ? undefined : session.data.userId);
    if (identity) return identity.email;
  }
  throw Object.assign(new Error("Unauthorized"), { statusCode: 401 });
}