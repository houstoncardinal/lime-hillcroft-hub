import { describe, expect, it } from "vitest";

import { findByCode, normalizeCode } from "@/admin/scanner/detector";
import type { Product } from "@/admin/types";

const product = (sku: string, barcode: string) => ({ id: sku, sku, barcode }) as Product;
const products = [
  product("TIC-1001", "194253397168"),
  product("TIC-1002", ""),
  product("TIC-1003", "ABC-77"),
];

describe("scanner matching", () => {
  it("treats UPC-A and its EAN-13 form as the same code", () => {
    expect(normalizeCode("0194253397168")).toBe(normalizeCode("194253397168"));
    expect(findByCode(products, "0194253397168")?.sku).toBe("TIC-1001");
  });

  it("falls back to SKU, case-insensitively", () => {
    expect(findByCode(products, " tic-1002 ")?.sku).toBe("TIC-1002");
  });

  it("matches alphanumeric barcodes case-insensitively and ignores empty codes", () => {
    expect(findByCode(products, "abc-77")?.sku).toBe("TIC-1003");
    expect(findByCode(products, "   ")).toBeUndefined();
    expect(findByCode(products, "999")).toBeUndefined();
  });
});
