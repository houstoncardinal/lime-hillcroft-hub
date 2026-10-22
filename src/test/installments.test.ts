import { describe, expect, it } from "vitest";
import { installmentSchedule, payInFour, showsInstallments } from "@/shop/installments";

describe("Shop Pay Installments message", () => {
  it("shows for phones", () => expect(showsInstallments("phones", 59900)).toBe(true));
  it("hides for cases", () => expect(showsInstallments("cases", 9900)).toBe(false));
  it("hides for headphones/earbuds", () => expect(showsInstallments("earbuds", 24900)).toBe(false));
  it("hides for speakers", () => expect(showsInstallments("speakers", 9900)).toBe(false));
  it("hides under $50", () => expect(showsInstallments("tablets", 4999)).toBe(false));
});

describe("pay in 4", () => {
  it("preserves the full total with uneven cents", () => {
    expect(installmentSchedule(10001)).toEqual([2501, 2500, 2500, 2500]);
    expect(installmentSchedule(10001).reduce((a, b) => a + b, 0)).toBe(10001);
  });
  it("splits $599 into 4 payments of $149.75", () => expect(payInFour(59900)).toBe(14975));
  it("rounds up odd cents", () => expect(payInFour(10001)).toBe(2501));
});
