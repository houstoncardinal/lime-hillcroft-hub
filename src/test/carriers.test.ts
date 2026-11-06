import fs from "node:fs";
import { describe, expect, it } from "vitest";

import { CARRIER_COUNT, PREPAID_CARRIERS } from "@/components/services/carriers";
import { CARRIERS } from "@/components/services/prepaid-plans";

describe("prepaid carriers", () => {
  it("are the nine the store activates, matching the plan cards", () => {
    expect(CARRIER_COUNT).toBe(9);
    expect(CARRIERS.map((c) => c.name.split(" ")[0])).toEqual(
      PREPAID_CARRIERS.map((c) => c.split(" ")[0]),
    );
  });

  // The store does not activate these (owner, 2026-11-06).
  it.each(["src", "public"])("%s never offers Boost, Metro or GoSmart", (dir) => {
    const files = fs.readdirSync(dir, { recursive: true, encoding: "utf8" });
    for (const f of files.filter((f) => /\.(tsx?|txt)$/.test(f) && !f.startsWith("test"))) {
      const text = fs.readFileSync(`${dir}/${f}`, "utf8").replace(/PartyBoost/g, "");
      expect(text, f).not.toMatch(/\b(Boost Mobile|Metro by T-Mobile|GoSmart|Metro, |Boost[,y ])/);
    }
  });
});
