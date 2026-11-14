import { describe, expect, it } from "vitest";

import { compliantText } from "@/shop/compliance";

describe("compliantText (leasing ad rules on Shopify text)", () => {
  it("rewrites the old closing line of device listings", () => {
    expect(
      compliantText(
        "Sold at TIC Wireless. Lease-to-own available: no credit needed, as low as $40 down, subject to approval. Call us.",
      ),
    ).toBe(
      "Sold at TIC Wireless. Lease-to-own available: all credit welcome, subject to approval. Call us.",
    );
    expect(
      compliantText(
        "Lease-to-own available: no credit needed, as low as $65 down, subject to approval.",
      ),
    ).toBe("Lease-to-own available: all credit welcome, subject to approval.");
  });

  it("removes advertised down / initial payments and banned phrases anywhere", () => {
    expect(compliantText("Leasing with no credit check, from $40 initial payment.")).toBe(
      "Leasing with all credit welcome.",
    );
    expect(compliantText("Celulares sin necesidad de crédito")).toBe(
      "Celulares se acepta todo tipo de crédito",
    );
  });

  it("leaves ordinary product text alone", () => {
    const s = "Up to 45 hours of video playback. 256GB storage, $849.00.";
    expect(compliantText(s)).toBe(s);
  });
});
