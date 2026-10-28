import fs from "node:fs";
import { describe, expect, it } from "vitest";

import {
  descriptionSummary,
  inlineText,
  parseDescription,
  specRows,
  type DescriptionBlock,
} from "@/shop/description";

const texts = (blocks: DescriptionBlock[]) =>
  blocks.flatMap((b) =>
    b.type === "heading"
      ? [b.text]
      : b.type === "list"
        ? b.items.map(inlineText)
        : b.type === "specs"
          ? b.rows.flat()
          : [inlineText(b.text)],
  );

// Minimal CSV reader for the Body (HTML) column (quoted fields with "" escapes and newlines).
function bodies(file: string) {
  const src = fs.readFileSync(`docs/shopify/${file}`, "utf8");
  const rows: string[][] = [];
  let row: string[] = [];
  let cell = "";
  let quoted = false;
  for (let i = 0; i < src.length; i++) {
    const c = src[i]!;
    if (quoted) {
      if (c === '"' && src[i + 1] === '"') (cell += '"'), i++;
      else if (c === '"') quoted = false;
      else cell += c;
    } else if (c === '"') quoted = true;
    else if (c === ",") row.push(cell), (cell = "");
    else if (c === "\n") row.push(cell), rows.push(row), (row = []), (cell = "");
    else if (c !== "\r") cell += c;
  }
  if (cell || row.length) row.push(cell), rows.push(row);
  const [header = [], ...data] = rows;
  const h = header.indexOf("Handle");
  const b = header.indexOf("Body (HTML)");
  return data.filter((r) => r[b]).map((r) => [r[h] ?? "", r[b] ?? ""] as const);
}

const imported = fs
  .readdirSync("docs/shopify")
  .filter((f) => f.endsWith(".csv"))
  .flatMap(bodies);

describe("Shopify descriptions on product pages", () => {
  it("finds the store's descriptions", () => expect(imported.length).toBeGreaterThan(50));

  it.each(imported)("%s is organized into summary, sections and specs", (_, html) => {
    const blocks = parseDescription(html);
    expect(blocks[0]?.type).toBe("lead");
    expect(specRows(blocks).length).toBeGreaterThan(2);
    expect(descriptionSummary(blocks).length).toBeGreaterThan(20);
    const lead = blocks[0]?.type === "lead" ? inlineText(blocks[0].text) : "";
    expect(texts(blocks.slice(1)).some((t) => t.includes(lead))).toBe(false); // summary shown once
    for (const text of texts(blocks)) {
      expect(text).not.toMatch(/<|&[a-z#0-9]+;/i); // no stray tags or entities
      expect(text).toBe(text.trim());
    }
  });

  it("keeps the Dell 15's specs, note and store details in order", () => {
    const [, html = ""] = imported.find(([h]) => h.startsWith("dell-15")) ?? [];
    const blocks = parseDescription(html);
    expect(blocks.map((b) => b.type)).toEqual(["lead", "heading", "specs", "note", "paragraph"]);
    expect(specRows(blocks)).toContainEqual(["Display", '15.6" Full HD (1920 × 1080) touchscreen with webcam']);
  });

  it("splits highlights into a list and photo credits into fine print with links", () => {
    const [, html = ""] = imported.find(([h]) => h === "galaxy-z-fold7") ?? [];
    const blocks = parseDescription(html);
    expect(blocks.find((b) => b.type === "list")).toMatchObject({ items: { length: 4 } });
    const fine = blocks.find((b) => b.type === "fine");
    expect(fine?.type === "fine" && fine.text.some((r) => r.href?.startsWith("https://commons."))).toBe(true);
  });

  it("handles descriptions typed straight into Shopify", () => {
    expect(parseDescription("Great phone.<br><br>Unlocked &amp; tested.")).toEqual([
      { type: "paragraph", text: [{ text: "Great phone." }] },
      { type: "paragraph", text: [{ text: "Unlocked & tested." }] },
    ]);
    expect(parseDescription('<div><p>Intro</p><ul><li>One</li><li><b>Two</b></li></ul></div>')).toEqual([
      { type: "paragraph", text: [{ text: "Intro" }] },
      { type: "list", items: [[{ text: "One" }], [{ text: "Two", strong: true }]] },
    ]);
    expect(parseDescription("")).toEqual([]);
  });

  it("drops scripts and unsafe links", () => {
    const blocks = parseDescription(
      '<p>Hi <a href="javascript:alert(1)">there</a></p><script>alert(1)</script>',
    );
    expect(blocks).toEqual([{ type: "paragraph", text: [{ text: "Hi there" }] }]);
  });
});
