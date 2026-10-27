import { createClient } from "@supabase/supabase-js";

export function adminAuthClient(token?: string) {
  const url = process.env["SUPABASE_URL"];
  const key = process.env["SUPABASE_PUBLISHABLE_KEY"] ?? process.env["SUPABASE_ANON_KEY"];
  if (!url || !key) throw new Error("Account sign-in is unavailable");
  return createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false },
    global: {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
      fetch: (input, init) => {
        const headers = new Headers(input instanceof Request ? input.headers : undefined);
        new Headers(init?.headers).forEach((value, name) => headers.set(name, value));
        if (key.startsWith("sb_") && headers.get("Authorization") === `Bearer ${key}`) headers.delete("Authorization");
        headers.set("apikey", key);
        return fetch(input, { ...init, headers });
      },
    },
  });
}

export async function cloudAdminIdentity(token: string, expectedUserId?: string) {
  const client = adminAuthClient(token);
  const { data, error } = await client.auth.getUser(token);
  const user = data.user;
  if (error || !user?.email || (expectedUserId && user.id !== expectedUserId)) return null;
  const role = await client.from("user_roles").select("role").eq("user_id", user.id).eq("role", "admin").maybeSingle();
  if (role.error || !role.data) return null;
  return { userId: user.id, email: user.email };
}

export async function cloudAdminLogin(email: string, password: string) {
  const client = adminAuthClient();
  const { data, error } = await client.auth.signInWithPassword({ email, password });
  if (error || !data.session) return null;
  const identity = await cloudAdminIdentity(data.session.access_token, data.user.id);
  if (!identity) return null;
  return { ...identity, accessToken: data.session.access_token };
}