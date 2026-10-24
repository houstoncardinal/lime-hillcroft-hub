import { describe, expect, it } from "vitest";
import { payInFour } from "@/shop/installments";

// Shelf cards always quote the pay-in-4 split of the device's "from" price.
describe("shelf device card installment line", () => {
  it("splits the from price into 4 equal payments", () => {
    expect(payInFour(59900)).toBe(14975); // $599.00 -> $149.75 x 4
    expect(payInFour(82900)).toBe(20725); // $829.00 -> $207.25 x 4
  });

  it("rounds odd cents up so 4 payments never undercharge", () => {
    expect(payInFour(10001)).toBe(2501);
    expect(payInFour(4999)).toBe(1250);
  });
});
