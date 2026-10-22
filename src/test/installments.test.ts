import { describe, expect, it } from "vitest";
import { showsInstallments } from "@/shop/installments";

describe("Shop Pay Installments message", () => {
  it("shows for phones", () => expect(showsInstallments("phones", 59900)).toBe(true));
  it("hides for cases", () => expect(showsInstallments("cases", 9900)).toBe(false));
  it("hides for headphones/earbuds", () => expect(showsInstallments("earbuds", 24900)).toBe(false));
  it("hides for speakers", () => expect(showsInstallments("speakers", 9900)).toBe(false));
  it("hides under $50", () => expect(showsInstallments("tablets", 4999)).toBe(false));
});
