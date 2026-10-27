import fs from "node:fs";
import { describe, expect, it } from "vitest";

import { DEVICE_PAGES } from "@/components/products/devices";
import { LATEST_DEVICES } from "@/components/products/inventory";
import { photoSrcSet } from "@/components/products/photo-src";

// Cards and galleries ask for <name>-480.webp; every one they can ask for must exist.
describe("small copies of product photos", () => {
  it("exists for every large photo a card or gallery uses", () => {
    const photos = [
      ...LATEST_DEVICES.map((d) => [d.image, d.w] as const),
      ...DEVICE_PAGES.flatMap(({ detail }) =>
        [detail.photo, ...(detail.morePhotos ?? [])].flatMap((p) =>
          p ? [[p.src, p.w] as const] : [],
        ),
      ),
    ];
    const missing = photos
      .map(([src, w]) => photoSrcSet(src, w)?.split(" ")[0])
      .filter((small): small is string => Boolean(small) && !fs.existsSync(`public${small}`));
    expect(missing).toEqual([]);
  });
});
