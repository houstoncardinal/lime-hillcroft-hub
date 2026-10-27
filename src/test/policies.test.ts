import { describe, expect, it } from "vitest";

import { POLICY_NAMES } from "@/shop/policies-page";
import { POLICIES, type PolicyKey } from "@/shop/policy-content";

// The policies are shown on the site and pasted into Shopify, so they must be complete in both
// languages and never contain placeholder text.
const KEYS = Object.keys(POLICY_NAMES) as PolicyKey[];
const text = (key: PolicyKey, lang: "en" | "es") => {
  const d = POLICIES[key][lang];
  return [
    d.summary,
    ...d.points,
    ...d.sections.flatMap((s) => [
      s.title,
      ...s.body.flatMap((b) => (typeof b === "string" ? [b] : b.list)),
    ]),
  ].join(" ");
};

describe("store policies", () => {
  it.each(KEYS)("%s matches in English and Spanish", (key) => {
    const { en, es } = POLICIES[key];
    expect(es.points.length).toBe(en.points.length);
    expect(es.sections.length).toBe(en.sections.length);
    es.sections.forEach((s, i) => {
      expect(s.body.length, `${key} section ${i}`).toBe(en.sections[i]!.body.length);
    });
    for (const d of [en, es]) {
      const ids = d.sections.map((s) => s.id);
      expect(new Set(ids).size).toBe(ids.length);
      expect(d.summary.length).toBeLessThanOrEqual(220);
    }
  });

  it.each(KEYS)("%s has no placeholder text", (key) => {
    for (const lang of ["en", "es"] as const) {
      expect(text(key, lang)).not.toMatch(/My Store|\[INSERT|\[enter|example\.com|lorem/i);
      expect(text(key, lang)).not.toMatch(/\bTODO\b|\bTBD\b/);
    }
  });

  it("states the terms the owner set", () => {
    expect(text("returns", "en")).toMatch(/14 days/);
    expect(text("returns", "en")).toMatch(/15% restocking fee/);
    expect(text("returns", "en")).toMatch(/Accessories are final sale/);
    expect(text("warranty", "en")).toMatch(/14-day warranty on the part/);
    expect(text("warranty", "en")).toMatch(/liquid-damaged devices carry no warranty/);
    expect(text("shipping", "en")).toMatch(/48 contiguous/);
  });
});
