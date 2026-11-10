import fs from "node:fs";
import { describe, expect, it } from "vitest";

import {
  LEASE_CATEGORIES,
  LEASE_DEVICES,
  LEASE_FEATURED,
  findLeaseDevice,
  leaseFrom,
  payment,
} from "@/components/lease/catalog";
import { LATEST_DEVICES } from "@/components/products/inventory";
import { leasePhoto } from "@/components/lease/lease-ui";
import { LEASE_PHOTOS } from "@/components/lease/photos";
import { SHOPIFY_LISTINGS } from "@/components/lease/shopify-links";

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

  // Owner's rule (updated sheet): list a row only when it has a leasing price and all three
  // payments are above $0.
  it("lists only options with a leasing price and all three payments from the sheet", () => {
    for (const d of LEASE_DEVICES)
      for (const o of d.options) {
        const [w, b, m] = (["weekly", "biweekly", "monthly"] as const).map((f) => payment(o, f));
        expect(o.lease, `${d.id} ${o.label.en}`).toBeGreaterThan(0);
        for (const v of [w, b, m]) expect(v, `${d.id} ${o.label.en}`).toBeGreaterThan(0);
        expect(b).toBeGreaterThan(w!);
        expect(m).toBeGreaterThan(b!);
      }
  });

  it("leaves out devices the sheet doesn't fully price, and the Alcatel 3V", () => {
    expect(findLeaseDevice("iphone-18-pro")).toBeUndefined(); // bi-weekly $0
    expect(findLeaseDevice("alcatel-3v")).toBeUndefined(); // removed by the owner
  });

  it("'from' prices use the cheapest option and its own payment", () => {
    expect(leaseFrom(findLeaseDevice("iphone-17-pro-max")!)).toMatchObject({ lease: 1399, weekly: 69 });
    expect(leaseFrom(findLeaseDevice("iphone-16-pro-max")!)).toMatchObject({ lease: 1149, weekly: 56 });
  });

  it("matches the owner's price sheet (spot checks)", () => {
    const opt = (id: string, label: string) =>
      findLeaseDevice(id)!.options.find((o) => o.label.en === label);
    expect(opt("iphone-18-pro-max", "256GB")).toMatchObject({ cash: 1649, lease: 1699, weekly: 83, biweekly: 191, monthly: 323 });
    expect(opt("iphone-air", "256GB")).toMatchObject({ lease: 1150, weekly: 56, biweekly: 167, monthly: 218 });
    expect(opt("iphone-16-plus", "256GB")).toMatchObject({ lease: 949, weekly: 47, biweekly: 93, monthly: 180 });
    expect(opt("ipad-8", "128GB · Wi-Fi + Cellular")).toMatchObject({ lease: 279, weekly: 14, biweekly: 27, monthly: 53 });
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

  it("gives every device a photo, with its files on disk", () => {
    for (const d of LEASE_DEVICES) expect(leasePhoto(d), d.id).toBeDefined();
    for (const [id, p] of Object.entries(LEASE_PHOTOS)) {
      expect(findLeaseDevice(id), id).toBeDefined();
      for (const f of [p.src, p.jpg]) expect(fs.existsSync(`public${f}`), f).toBe(true);
      if (p.w > 600) expect(fs.existsSync(`public${p.src.replace(".webp", "-480.webp")}`), id).toBe(true);
      // Commons photos are credited; the store's own photos need none.
      if (p.credit) expect(p.credit.href).toMatch(/^https:\/\/commons\.wikimedia\.org\//);
    }
  });

  it("links pay-in-4 only for real lease options", () => {
    for (const [id, byLabel] of Object.entries(SHOPIFY_LISTINGS)) {
      const d = findLeaseDevice(id);
      expect(d, id).toBeDefined();
      for (const [label, handle] of Object.entries(byLabel)) {
        expect(d!.options.some((o) => o.label.en === label), `${id} ${label}`).toBe(true);
        expect(handle).toMatch(/^[a-z0-9-]+$/);
      }
    }
  });
});
