// Prints every page's title and meta description with their lengths, and flags duplicates,
// missing share images and lengths outside what Google shows. Usage: npm run seo:audit
import fs from "node:fs";

import { loadPages, root } from "./lib/pages.mjs";

// CJK characters are about twice as wide, so shorter counts are fine there.
const isCjk = (s) => /[぀-鿿가-힯]/.test(s);

const pages = await loadPages();
const seen = new Map();
let problems = 0;
for (const p of pages) {
  const flags = [];
  if (p.title.length > 65) flags.push(`title ${p.title.length}`);
  if (p.title.length < (isCjk(p.title) ? 15 : 30)) flags.push(`short title ${p.title.length}`);
  if (p.description.length > 160) flags.push(`desc ${p.description.length}`);
  if (p.description.length < (isCjk(p.description) ? 50 : 110))
    flags.push(`short desc ${p.description.length}`);
  const image = new URL(p.image).pathname;
  if (!fs.existsSync(`${root}public${image}`)) flags.push(`missing ${image}`);
  for (const k of [p.title, p.description, image]) {
    if (seen.has(k)) flags.push(`duplicate of ${seen.get(k)}`);
    seen.set(k, p.path);
  }
  if (flags.length) problems++;
  console.log(
    `${flags.length ? "✗" : "✓"} ${p.path}\n   ${p.title} (${p.title.length})\n   ${p.description} (${p.description.length})\n   ${image}${flags.length ? `\n   → ${flags.join(", ")}` : ""}`,
  );
}
console.log(`\n${pages.length} pages, ${problems} with issues`);
if (problems) process.exitCode = 1;
