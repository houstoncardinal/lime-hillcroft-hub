// Writes the "Devices in store now" sections of public/llms-full.txt, public/llms.txt and the
// Tidio knowledge base (docs/tidio/tic-wireless-knowledge-base.md) from the site's device data
// (src/components/products), so search engines, AI answers and the chat agent list exactly what
// the website shows. Run after changing the stock list:
//
//   npm run inventory
//
// Each file's section runs from its "## Devices in store now" heading to the next "## " heading;
// the knowledge base gets the section added before "## Accessories" the first time.
import fs from "node:fs";
import { loadModule, root } from "./lib/pages.mjs";

const SITE = "https://www.ticwirelesstx.com";
const { DEVICE_PAGES, deviceTitle, specValue } = await loadModule(
  "/src/components/products/devices.ts",
);
const { INVENTORY_UPDATED } = await loadModule("/src/components/products/inventory.ts");

const date = new Date(`${INVENTORY_UPDATED}T12:00:00`);
const long = date.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
const short = date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });

const groups = new Map();
for (const p of DEVICE_PAGES) {
  const key =
    p.device.kind === "ipad"
      ? "Tablets"
      : p.device.brand === "Apple"
        ? "iPhones"
        : "Samsung Galaxy phones";
  groups.set(key, [...(groups.get(key) ?? []), p]);
}
const spec = (detail, key) => {
  const s = detail.specs.find(([k]) => k === key);
  return s ? specValue(s[1], "en") : "";
};
const line = ({ device, detail }) => {
  const facts = [
    spec(detail, "display"),
    spec(detail, "chip"),
    spec(detail, "rear"),
    spec(detail, "battery"),
  ]
    .filter(Boolean)
    .join("; ");
  return `- ${deviceTitle(device, detail)} (${detail.year}${device.fiveG ? ", 5G" : ""}) — ${facts}. ${SITE}/devices/${device.id}`;
};
const leasing = (from) =>
  `Leasing (lease-to-own) on every device: no credit needed, as low as $${from} down (iPhone 18 Pro Max from $65 down), subject to approval.`;

const full = [
  `## Devices in store now (updated ${long})`,
  "",
  `${DEVICE_PAGES.length} models on the shelves at 3640 Hillcroft St, Suite C, sold unlocked. A phone may be new or`,
  "pre-owned depending on the unit — staff confirm condition, storage, color and price. Specs are the",
  "manufacturer's US launch specs. Stock changes quickly — call (713) 339-9300 to confirm a model before visiting.",
  leasing(40),
  `All devices, with photos and filters: ${SITE}/devices (Spanish: ${SITE}/es/equipos)`,
  "",
  ...[...groups].flatMap(([name, list]) => [`${name}:`, ...list.map(line), ""]),
].join("\n");

const names = (list) =>
  list
    .map(({ device, detail }) => deviceTitle(device, detail).replace(/^Samsung /, ""))
    .join(" · ");
const brief = [
  `## Devices in store now (${short})`,
  "",
  ...[...groups].map(([name, list]) => `- ${name}: ${names(list)}`),
  "",
  `${leasing(40)} Every model has its own page with specs and photos: [All devices](${SITE}/devices) · [Todos los equipos](${SITE}/es/equipos)`,
  "",
].join("\n");

function replaceSection(file, body, insertBefore) {
  const path = `${root}${file}`;
  let text = fs.readFileSync(path, "utf8");
  const start = text.indexOf("## Devices in store now");
  if (start === -1) {
    const at = text.indexOf(insertBefore);
    if (at === -1) throw new Error(`${file}: no place for the devices section`);
    text = `${text.slice(0, at)}${body}\n${text.slice(at)}`;
  } else {
    const next = text.indexOf("\n## ", start + 3);
    text = `${text.slice(0, start)}${body}${next === -1 ? "" : `\n${text.slice(next + 1)}`}`;
  }
  fs.writeFileSync(path, text);
  console.log(`${file}: ${DEVICE_PAGES.length} devices`);
}

replaceSection("public/llms-full.txt", full);
replaceSection("public/llms.txt", brief);
replaceSection("docs/tidio/tic-wireless-knowledge-base.md", full, "## Accessories");
