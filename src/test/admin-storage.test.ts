import { beforeEach, expect, it, vi } from "vitest";
const api = vi.hoisted(() => ({ readAdminData: vi.fn(), writeAdminData: vi.fn(), readSiteEvents: vi.fn() }));
vi.mock("@/admin/data.functions", () => api);
import { adminStorageStatus, initializeAdminData, resetAdminData, settings } from "@/admin/store";
beforeEach(() => { resetAdminData(); vi.resetAllMocks(); api.readSiteEvents.mockResolvedValue([]); });
it("does not restore private records when a load finishes after logout", async () => {
  let release: (value: null) => void = () => undefined;
  api.readAdminData.mockImplementation(() => new Promise((resolve) => { release = resolve; }));
  const loading = initializeAdminData(); resetAdminData(); release(null); await loading;
  expect(adminStorageStatus.snapshot().ready).toBe(false);
});
it("does not apply an old save revision to a newly loaded session", async () => {
  api.readAdminData.mockResolvedValue(null); await initializeAdminData();
  let release: (value: { conflict: boolean; revision: number }) => void = () => undefined;
  api.writeAdminData.mockImplementationOnce(() => new Promise((resolve) => { release = resolve; }));
  settings.save({ overtimeThreshold: 41 }); await vi.waitFor(() => expect(api.writeAdminData).toHaveBeenCalledTimes(1));
  resetAdminData(); await initializeAdminData(); release({ conflict: false, revision: 50 });
  await vi.waitFor(() => expect(adminStorageStatus.snapshot().saving).toBe(0));
  api.writeAdminData.mockResolvedValue({ conflict: false, revision: 1 }); settings.save({ overtimeThreshold: 42 });
  await vi.waitFor(() => expect(api.writeAdminData).toHaveBeenCalledTimes(2));
  expect(api.writeAdminData.mock.calls[1]?.[0].data.revision).toBe(0);
});