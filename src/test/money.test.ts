import { expect, it } from "vitest";
import { formatMoney } from "@/components/intl/currency";
it("preserves the $207.25 installment and $829 full price", () => {
  expect(formatMoney(207.25, "USD")).toBe("$207.25");
  expect(formatMoney(829, "USD")).toBe("$829.00");
});