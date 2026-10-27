import { beforeEach, expect, it, vi } from "vitest";
const mocks = vi.hoisted(() => ({ useSession: vi.fn(), getRequest: vi.fn(), identity: vi.fn() }));
vi.mock("@tanstack/react-start/server", () => ({ useSession: mocks.useSession, getRequest: mocks.getRequest }));
vi.mock("@/admin/cloud-access.server", () => ({ cloudAdminIdentity: mocks.identity }));
import { requireAdmin } from "@/admin/session.server";
beforeEach(() => {
  vi.resetAllMocks();
  vi.stubEnv("ADMIN_SESSION_SECRET", "test-only-session-secret");
  vi.stubEnv("ADMIN_LOGIN_EMAIL", "legacy@example.invalid");
  mocks.useSession.mockResolvedValue({ data: {} });
  mocks.getRequest.mockReturnValue({ headers: new Headers() });
  mocks.identity.mockResolvedValue(null);
});
it("retains access for existing secret-backed administrators", async () => {
  mocks.useSession.mockResolvedValue({ data: { email: "legacy@example.invalid" } });
  expect(await requireAdmin()).toBe("legacy@example.invalid");
});
it("rejects a cookie email alone for the requested Cloud admin", async () => {
  mocks.useSession.mockResolvedValue({ data: { email: "hunainm.qureshi@gmail.com" } });
  await expect(requireAdmin()).rejects.toThrow("Unauthorized");
});
it("revalidates Cloud cookie identity and admin role on every request", async () => {
  mocks.useSession.mockResolvedValue({ data: { userId: "requested-user", accessToken: "test-only-token" } });
  mocks.identity.mockResolvedValueOnce({ email: "hunainm.qureshi@gmail.com" }).mockResolvedValueOnce(null);
  expect(await requireAdmin()).toBe("hunainm.qureshi@gmail.com");
  expect(mocks.identity).toHaveBeenCalledWith("test-only-token", "requested-user");
  await expect(requireAdmin()).rejects.toThrow("Unauthorized");
});
it("allows an authenticated full admin bearer without a dashboard cookie", async () => {
  mocks.getRequest.mockReturnValue({ headers: new Headers({ authorization: "Bearer test-only-token" }) });
  mocks.identity.mockResolvedValue({ email: "hunainm.qureshi@gmail.com" });
  expect(await requireAdmin()).toBe("hunainm.qureshi@gmail.com");
});
it("denies signed-out callers before any role lookup", async () => {
  await expect(requireAdmin()).rejects.toThrow("Unauthorized");
  expect(mocks.identity).not.toHaveBeenCalled();
});