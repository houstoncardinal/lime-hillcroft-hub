import { describe, expect, it } from "vitest";
import { installmentSchedule, payInFour, showsInstallments } from "@/shop/installments";
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
