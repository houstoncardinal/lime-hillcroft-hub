import fs from "node:fs";
import { describe, expect, it } from "vitest";

import { DEVICE_PAGES } from "@/components/products/devices";
import { shopHandle } from "@/shop/device-shop";
import { categoryFor, toText } from "@/shop/storefront";

// Device pages find their Shopify product by handle. The import file in docs/shopify is what the
// store was loaded from, so every device page must point at a handle that file creates.
describe("device pages ↔ Shopify products", () => {
  // Every import file in docs/shopify: the full product imports and the price updates that
  // reference products the store already had (such as its own iPad (A16) listing).
  const handles = new Set(
    fs
      .readdirSync("docs/shopify")
      .filter((f) => f.endsWith(".csv"))
      .flatMap((f) => fs.readFileSync(`docs/shopify/${f}`, "utf8").split("\n").slice(1))
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

  it("keeps a product description's headings, list items and spec rows on their own lines", () => {
    const text = toText(
      "<p><strong>Big screen.</strong></p><h3>Highlights</h3><ul><li>6.1&quot; OLED</li><li>48 MP</li></ul>" +
        "<h3>Specs</h3><table><tr><th>Display</th><td>6.1″ OLED</td></tr><tr><th>Chip</th><td>A18</td></tr></table>",
    );
    expect(text).toBe(
      'Big screen.\n\nHighlights\n• 6.1" OLED\n• 48 MP\n\nSpecs\nDisplay: 6.1″ OLED\nChip: A18',
    );
  });
});
