import { beforeEach, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({ getUser: vi.fn(), signIn: vi.fn(), select: vi.fn(), eq: vi.fn(), maybeSingle: vi.fn() }));
vi.mock("@supabase/supabase-js", () => ({ createClient: () => ({
  auth: { getUser: mocks.getUser, signInWithPassword: mocks.signIn },
  from: () => ({ select: mocks.select }),
}) }));
import { cloudAdminIdentity, cloudAdminLogin } from "@/admin/cloud-access.server";

const user = { id: "e2c08723-2abd-4d2b-aa05-fdedd767a5e8", email: "hunainm.qureshi@gmail.com" };
beforeEach(() => {
  vi.resetAllMocks();
  vi.stubEnv("SUPABASE_URL", "https://example.invalid");
  vi.stubEnv("SUPABASE_PUBLISHABLE_KEY", "test-only-key");
  mocks.getUser.mockResolvedValue({ data: { user }, error: null });
  mocks.select.mockReturnValue({ eq: mocks.eq });
  mocks.eq.mockReturnValue({ eq: mocks.eq, maybeSingle: mocks.maybeSingle });
  mocks.maybeSingle.mockResolvedValue({ data: { role: "admin" }, error: null });
});
it("allows the requested account only with its verified full admin role", async () => {
  expect(await cloudAdminIdentity("test-only-token", user.id)).toEqual({ userId: user.id, email: "hunainm.qureshi@gmail.com" });
  expect(mocks.eq).toHaveBeenCalledWith("user_id", user.id);
  expect(mocks.eq).toHaveBeenCalledWith("role", "admin");
});
it("denies a valid customer without an admin role", async () => {
  mocks.maybeSingle.mockResolvedValue({ data: null, error: null });
  expect(await cloudAdminIdentity("test-only-token")).toBeNull();
});
it("denies revoked roles and unavailable role validation", async () => {
  mocks.maybeSingle.mockResolvedValue({ data: null, error: new Error("unavailable") });
  expect(await cloudAdminIdentity("test-only-token")).toBeNull();
});
it("denies expired identity or a different cookie user", async () => {
  expect(await cloudAdminIdentity("test-only-token", "another-user")).toBeNull();
  mocks.getUser.mockResolvedValue({ data: { user: null }, error: new Error("expired") });
  expect(await cloudAdminIdentity("test-only-token")).toBeNull();
  expect(mocks.select).not.toHaveBeenCalled();
});
it("accepts the existing account password without changing it or creating users", async () => {
  mocks.signIn.mockResolvedValue({ data: { user, session: { access_token: "test-only-token" } }, error: null });
  expect(await cloudAdminLogin(user.email, " test-only-password ")).toEqual({ userId: user.id, email: user.email, accessToken: "test-only-token" });
  expect(mocks.signIn).toHaveBeenCalledWith({ email: user.email, password: " test-only-password " });
});