import { describe, expect, it } from "vitest";
import fs from "node:fs";
import { installmentSchedule, payInFour, showsInstallments, showsLeasing } from "@/shop/installments";
import { categoryFor } from "@/shop/storefront";

describe("Shop Pay Installments message", () => {
  it("shows for phones", () => expect(showsInstallments("phones", 59900)).toBe(true));
  it("hides for cases", () => expect(showsInstallments("cases", 9900)).toBe(false));
  it("hides for headphones/earbuds", () => expect(showsInstallments("earbuds", 24900)).toBe(false));
  it("hides for speakers", () => expect(showsInstallments("speakers", 9900)).toBe(false));
  it("hides under $50", () => expect(showsInstallments("tablets", 4999)).toBe(false));
  it("shows for laptops", () => expect(showsInstallments("laptops", 34900)).toBe(true));
  it("shows for game consoles", () => expect(showsInstallments("gaming", 24900)).toBe(true));
  // Touchscreen laptops used to be filed as screen protection (an accessory), which hid pay-in-4.
  it.each([
    ["Laptop", ["touchscreen"], "HP Laptop 14 (14-dq6103ds / 14-dq6104ds) 14\" HD Touch", 34900],
    ["Laptop", ["touchscreen"], "Acer Aspire Go 15 (AG15-21PT-R5GQ) 15.6\" FHD Touch", 59900],
    ["Laptop", ["touchscreen"], "Dell 15 Laptop (DC15250) 15.6\" FHD Touch", 64900],
    ["", [], "Apple MacBook Air 13\" M4 16GB RAM / 256GB", 115000],
  ] as const)("offers pay-in-4 on %s %s %s", (type, tags, title, cents) =>
    expect(showsInstallments(categoryFor(type, [...tags], title), cents)).toBe(true));
});

describe("pay in 4", () => {
  it("preserves the full total with uneven cents", () => {
    expect(installmentSchedule(10001)).toEqual([2501, 2500, 2500, 2500]);
    expect(installmentSchedule(10001).reduce((a, b) => a + b, 0)).toBe(10001);
  });
  it("splits $599 into 4 payments of $149.75", () => expect(payInFour(59900)).toBe(14975));
  it("rounds up odd cents", () => expect(payInFour(10001)).toBe(2501));
});

describe("lease-to-own applications on product pages", () => {
  it("shows for devices from $100", () => {
    expect(showsLeasing("phones", 47500)).toBe(true);
    expect(showsLeasing("laptops", 34900)).toBe(true);
    expect(showsLeasing("gaming", 24900)).toBe(true);
  });
  it("hides for accessories and cheap items", () => {
    expect(showsLeasing("cases", 9900)).toBe(false);
    expect(showsLeasing("earbuds", 24900)).toBe(false);
    expect(showsLeasing("wearables", 4999)).toBe(false);
  });
  it("always shows when tagged Lease to own in Shopify", () =>
    expect(showsLeasing("more", 4999, true)).toBe(true));

  // Every product imported on 2026-10-27 (phones, foldables, iPad, laptops, PlayStation Portal).
  const imported = [
    "new-products-2026-10-27.csv",
    "new-laptops-2026-10-27.csv",
    "special-listings-2026-10-27.csv",
  ].flatMap((file) => {
    const [header = "", ...lines] = fs.readFileSync(`docs/shopify/${file}`, "utf8").split("\n");
    const cols = header.split(",");
    const col = (row: string[], name: string) => row[cols.indexOf(name)] ?? "";
    return lines
      .map((line) => line.match(/("([^"]|"")*"|[^,]*)(,|$)/g)?.map((c) => c.replace(/,$/, "").replace(/^"|"$/g, "").replace(/""/g, '"')) ?? [])
      .filter((row) => col(row, "Title"))
      .map((row) => ({
        title: col(row, "Title"),
        type: col(row, "Type"),
        tags: col(row, "Tags").split(",").map((t) => t.trim().toLowerCase()),
        cents: Math.round(Number(col(row, "Variant Price")) * 100),
      }));
  });

  it("covers today's imports", () => expect(imported.length).toBeGreaterThanOrEqual(12));
  it.each(imported.map((p) => [p.title, p] as const))("offers leasing on %s", (_, p) => {
    const category = categoryFor(p.type, p.tags, p.title);
    expect(showsLeasing(category, p.cents)).toBe(true);
    expect(showsLeasing(category, p.cents, p.tags.includes("lease to own"))).toBe(true);
  });
});
