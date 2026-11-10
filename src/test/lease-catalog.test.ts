import { describe, expect, it } from "vitest";

import {
  LEASE_CATEGORIES,
  LEASE_DEVICES,
  LEASE_FEATURED,
  findLeaseDevice,
  leaseFrom,
} from "@/components/lease/catalog";
import { LATEST_DEVICES } from "@/components/products/inventory";

describe("lease-to-own catalog", () => {
  it("has unique ids, valid categories and featured devices", () => {
    const ids = LEASE_DEVICES.map((d) => d.id);
    expect(new Set(ids).size).toBe(ids.length);
    const cats = new Set(LEASE_CATEGORIES.map((c) => c.id));
    for (const d of LEASE_DEVICES) expect(cats.has(d.category), d.id).toBe(true);
    for (const id of LEASE_FEATURED) expect(findLeaseDevice(id), id).toBeDefined();
  });

  it.each(LEASE_DEVICES.map((d) => [d.id, d] as const))("%s has priced, distinct options", (_, d) => {
    expect(d.options.length).toBeGreaterThan(0);
    expect(new Set(d.options.map((o) => o.label.en)).size).toBe(d.options.length);
    for (const o of d.options) {
      expect(o.lease).toBeGreaterThan(0);
      if (o.cash !== undefined) expect(o.cash).toBeGreaterThan(0);
      for (const v of [o.weekly, o.biweekly, o.monthly]) if (v !== undefined) expect(v).toBeGreaterThan(0);
    }
    // Photos and spec links point at real /devices pages.
    if (d.deviceId) expect(LATEST_DEVICES.some((x) => x.id === d.deviceId), d.deviceId).toBe(true);
  });

  it("pairs the 'from' weekly estimate with the cheapest option only", () => {
    // Sealed $1,399 has no weekly estimate; the $70/wk belongs to the $1,429 open-box unit.
    expect(leaseFrom(findLeaseDevice("iphone-17-pro-max")!)).toEqual({ lease: 1399, weekly: undefined });
    expect(leaseFrom(findLeaseDevice("iphone-16")!)).toEqual({ lease: 650, weekly: undefined });
    expect(leaseFrom(findLeaseDevice("iphone-16-pro-max")!)).toEqual({ lease: 1149, weekly: 56 });
  });

  it("matches the owner's price sheet (spot checks)", () => {
    const opt = (id: string, label: string) =>
      findLeaseDevice(id)!.options.find((o) => o.label.en === label);
    expect(opt("iphone-18-pro-max", "256GB")).toMatchObject({ cash: 1699, lease: 1799, weekly: 101 });
    expect(opt("galaxy-s25-ultra", "512GB")).toMatchObject({ cash: 1050, lease: 1149, monthly: 218 });
    expect(opt("nintendo-switch-2", "Console")).toMatchObject({ cash: 650, lease: 750, biweekly: 74 });
    expect(opt("galaxy-s22-ultra", "256GB")).toEqual(
      expect.objectContaining({ lease: 649 }),
    );
    expect(opt("galaxy-s22-ultra", "256GB")?.cash).toBeUndefined();
  });
});
