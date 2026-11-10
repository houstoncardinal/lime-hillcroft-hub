import fs from "node:fs";
import { describe, expect, it } from "vitest";

import {
  LEASE_CATEGORIES,
  LEASE_DEVICES,
  LEASE_FEATURED,
  PAYMENT_RATE,
  findLeaseDevice,
  leaseFrom,
  payment,
} from "@/components/lease/catalog";
import { LATEST_DEVICES } from "@/components/products/inventory";
import { leasePhoto } from "@/components/lease/lease-ui";
import { LEASE_PHOTOS } from "@/components/lease/photos";

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

  it("uses the sheet's payment estimates where it has them", () => {
    const o = findLeaseDevice("iphone-16")!.options[0]!; // 128GB, leasing $799
    expect([payment(o, "weekly"), payment(o, "biweekly"), payment(o, "monthly")]).toEqual([39, 78, 152]);
    // Higher-than-rate sheet figures are kept, never lowered.
    const air = findLeaseDevice("iphone-air")!.options[0]!;
    expect([payment(air, "weekly"), payment(air, "biweekly"), payment(air, "monthly")]).toEqual([88, 177, 342]);
  });

  it("fills blank periods from the leasing price at the sheet's own rate", () => {
    // iPhone 17 Pro 256GB: sheet gives only $64/wk on a $1,299 lease.
    const o = findLeaseDevice("iphone-17-pro")!.options[0]!;
    expect(payment(o, "weekly")).toBe(64);
    expect(payment(o, "biweekly")).toBe(Math.round(1299 * 0.098));
    expect(payment(o, "monthly")).toBe(Math.round(1299 * 0.19));
    // Cash-price-based sheet figures were dropped: Watch Series 11 46mm uses its $599 lease.
    const w = findLeaseDevice("apple-watch-series-11")!.options[1]!;
    expect(payment(w, "monthly")).toBe(114);
  });

  it("gives every option all three payments, and they rise with the period", () => {
    for (const d of LEASE_DEVICES)
      for (const o of d.options) {
        const [w, b, m] = (["weekly", "biweekly", "monthly"] as const).map((f) => payment(o, f));
        expect(w, `${d.id} ${o.label.en}`).toBeGreaterThan(0);
        expect(b).toBeGreaterThan(w!);
        expect(m).toBeGreaterThan(b!);
      }
  });

  it("matches the sheet's own estimates to within $1 almost everywhere", () => {
    let n = 0;
    let close = 0;
    for (const d of LEASE_DEVICES)
      for (const o of d.options)
        for (const f of ["weekly", "biweekly", "monthly"] as const) {
          if (!o[f]) continue;
          n++;
          if (Math.abs(Math.round(o.lease * PAYMENT_RATE[f]) - o[f]!) <= 1) close++;
        }
    expect(close / n).toBeGreaterThan(0.9);
  });

  it("'from' prices use the cheapest option and its own payment", () => {
    expect(leaseFrom(findLeaseDevice("iphone-17-pro-max")!)).toMatchObject({ lease: 1399, weekly: 69 });
    expect(leaseFrom(findLeaseDevice("iphone-16-pro-max")!)).toMatchObject({ lease: 1149, weekly: 56 });
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

  // Lease pages are for leasing only: the sheet's cash prices are kept in the data, never shown.
  it.each([
    "src/components/lease/lease-ui.tsx",
    "src/components/lease/lease-pages.tsx",
    "src/components/lease/heads.ts",
    "src/components/lease/copy.ts",
  ])("%s never shows a buy-in-full price", (file) => {
    const text = fs.readFileSync(file, "utf8");
    expect(text).not.toMatch(/\.cash\b|buy.in.full|buyInFull|precio de contado|cash price/i);
  });

  // Wikimedia Commons has no photo of these two; they show the brand tile until the store adds one.
  const NO_PHOTO_YET = ["moto-g-ace-5g", "alcatel-3v"];

  it("gives every other device a photo, with its files on disk and a credit", () => {
    for (const d of LEASE_DEVICES) {
      if (NO_PHOTO_YET.includes(d.id)) continue;
      expect(leasePhoto(d), d.id).toBeDefined();
    }
    for (const [id, p] of Object.entries(LEASE_PHOTOS)) {
      expect(findLeaseDevice(id), id).toBeDefined();
      for (const f of [p.src, p.jpg]) expect(fs.existsSync(`public${f}`), f).toBe(true);
      if (p.w > 600) expect(fs.existsSync(`public${p.src.replace(".webp", "-480.webp")}`), id).toBe(true);
      expect(p.credit?.href).toMatch(/^https:\/\/commons\.wikimedia\.org\//);
    }
  });
});
