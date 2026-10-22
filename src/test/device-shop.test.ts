import fs from "node:fs";
import { describe, expect, it } from "vitest";

import { DEVICE_PAGES } from "@/components/products/devices";
import { shopHandle } from "@/shop/device-shop";
import { categoryFor } from "@/shop/storefront";

// Device pages find their Shopify product by handle. The import file in docs/shopify is what the
// store was loaded from, so every device page must point at a handle that file creates.
describe("device pages ↔ Shopify products", () => {
  const csv = fs.readFileSync("docs/shopify/tic-wireless-devices-shopify.csv", "utf8");
  const handles = new Set(
    csv
      .split("\n")
      .slice(1)
      .map((line) => line.split(",")[0])
      .filter(Boolean),
  );

  it("has a Shopify product for every device page", () => {
    const missing = DEVICE_PAGES.map((p) => shopHandle(p.device.id)).filter((h) => !handles.has(h));
    expect(missing).toEqual([]);
  });

  it("files phones and tablets under their own shop categories, not with accessories", () => {
    expect(categoryFor("Smartphone", ["apple", "iphone 16"])).toBe("phones");
    expect(categoryFor("Tablet", ["apple", "ipad"])).toBe("tablets");
    expect(categoryFor("Phone case", ["iphone 16"])).toBe("cases");
    expect(categoryFor("", ["galaxy buds"])).toBe("earbuds");
  });
});
