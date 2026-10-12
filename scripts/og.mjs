// Renders a 1200×630 share image (Open Graph / Twitter / iMessage / WhatsApp preview) for every
// page into public/og, from the cards in src/components/site/og-cards.ts.
//
// Usage: npm run seo:og            (all cards)
//        npm run seo:og -- home    (only files whose name contains "home")
//
// Needs Playwright with Chromium, which is not a project dependency:
//   npm i -D playwright && npx playwright install chromium   (or set PLAYWRIGHT_PATH to an install)
import { readFile, mkdir } from "node:fs/promises";
import { createRequire } from "node:module";
import { loadModule, root } from "./lib/pages.mjs";

const filter = process.argv[2] ?? "";

async function loadPlaywright() {
  try {
    return await import("playwright");
  } catch {
    if (!process.env.PLAYWRIGHT_PATH) throw new Error("Install playwright or set PLAYWRIGHT_PATH");
    return createRequire(`${process.env.PLAYWRIGHT_PATH}/`)("playwright");
  }
}

const loadCards = async () => (await loadModule("/src/components/site/og-cards.ts")).ogCards();

const photoCache = new Map();
async function photo(name) {
  if (!photoCache.has(name)) {
    const data = await readFile(`${root}src/assets/photos/${name}.jpg`);
    photoCache.set(name, `data:image/jpeg;base64,${data.toString("base64")}`);
  }
  return photoCache.get(name);
}

const esc = (s) =>
  String(s).replace(
    /[&<>"]/g,
    (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c],
  );

// The logo's open "C" of dots (same geometry as src/components/site/logo.tsx).
function dotRing() {
  const ring = (r, count, dot, fill) =>
    Array.from({ length: count }, (_, i) => {
      const deg = 35 + (290 / (count - 1)) * i;
      const rad = (deg * Math.PI) / 180;
      return `<circle cx="${(100 + r * Math.cos(rad)).toFixed(2)}" cy="${(100 - r * Math.sin(rad)).toFixed(2)}" r="${dot}" fill="${fill}"/>`;
    }).join("");
  return `<svg viewBox="0 0 200 200" width="56" height="56">${ring(80, 12, 9, "var(--primary)")}${ring(52, 10, 6.5, "var(--slate)")}</svg>`;
}

const PIN = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>`;
const PHONE = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92Z"/></svg>`;

async function html(card) {
  return `<!doctype html><html lang="${esc(card.lang)}"><head><meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=Manrope:wght@500;600;700&family=Saira:wght@500;600;700&display=block" rel="stylesheet">
<style>
:root{--ink:oklch(0.19 0.03 245);--primary:oklch(0.72 0.17 55);--slate:oklch(0.62 0.035 235)}
*{margin:0;padding:0;box-sizing:border-box}
body{width:1200px;height:630px;overflow:hidden;background:var(--ink);color:#fff;font-family:Manrope,"Noto Sans","PingFang SC","Apple SD Gothic Neo","Geeza Pro","Kohinoor Devanagari",sans-serif;position:relative}
.photo{position:absolute;top:0;right:0;width:540px;height:630px}
.photo img{width:100%;height:100%;object-fit:cover;object-position:${card.focus ?? "50% 50%"}}
.photo:after{content:"";position:absolute;inset:0;background:linear-gradient(90deg,var(--ink) 0%,color-mix(in oklch,var(--ink) 70%,transparent) 22%,transparent 55%),linear-gradient(0deg,color-mix(in oklch,var(--ink) 60%,transparent),transparent 40%)}
.glow{position:absolute;left:-180px;top:-220px;width:620px;height:620px;border-radius:50%;background:color-mix(in oklch,var(--primary) 22%,transparent);filter:blur(120px)}
.bar{position:absolute;left:0;top:0;bottom:0;width:10px;background:var(--primary)}
.content{position:absolute;left:68px;top:52px;width:720px;bottom:44px;display:flex;flex-direction:column}
.brand{display:flex;align-items:center;gap:14px}
.brand b{display:block;font-family:Saira,sans-serif;font-weight:600;font-size:27px;letter-spacing:.04em;line-height:1}
.brand small{display:block;margin-top:7px;font-size:15px;letter-spacing:.14em;text-transform:uppercase;color:rgba(255,255,255,.9);font-weight:700}
.text{margin-top:auto;margin-bottom:auto;padding:18px 0}
.kicker{display:flex;align-items:center;gap:12px;color:var(--primary);font-weight:700;font-size:20px;letter-spacing:.14em;text-transform:uppercase}
.kicker:before{content:"";width:34px;height:2px;background:var(--primary)}
h1{margin-top:18px;font-family:Saira,"Noto Sans","PingFang SC","Apple SD Gothic Neo","Geeza Pro","Kohinoor Devanagari",sans-serif;font-weight:600;font-size:70px;line-height:1.03;letter-spacing:-.01em;max-height:calc(3 * 1.03em);max-width:660px;overflow:hidden}
.sub{margin-top:18px;font-size:23px;line-height:1.4;color:rgba(255,255,255,.74);max-width:640px;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}
.chips{display:flex;gap:10px;margin-bottom:18px}
.chips span{border:1.5px solid rgba(255,255,255,.22);background:rgba(255,255,255,.06);border-radius:999px;padding:7px 16px;font-size:17px;font-weight:600;color:rgba(255,255,255,.9)}
.foot{display:flex;align-items:center;gap:26px;font-size:20px;font-weight:600;color:rgba(255,255,255,.88)}
.foot span{display:flex;align-items:center;gap:8px}
.foot svg{color:var(--primary)}
.rating{position:absolute;right:36px;top:40px;background:rgba(10,14,22,.72);backdrop-filter:blur(6px);border:1px solid rgba(255,255,255,.18);border-radius:999px;padding:9px 18px;font-size:18px;font-weight:700}
.rating i{color:var(--primary);font-style:normal}
[dir=rtl] .kicker:before{order:2}
</style></head><body>
<div class="glow"></div>
<div class="photo"><img src="${await photo(card.photo)}" alt=""></div>
<div class="bar"></div>
<div class="rating"><i>★</i> 4.7 Google</div>
<div class="content">
  <div class="brand">${dotRing()}<div><b>TIC Wireless</b><small>Electronic &amp; Repair Center</small></div></div>
  <div class="text" dir="${card.dir}">
    <div class="kicker">${esc(card.kicker)}</div>
    <h1 id="h">${esc(card.headline)}</h1>
    <p class="sub">${esc(card.sub)}</p>
  </div>
  ${card.chips.length ? `<div class="chips">${card.chips.map((c) => `<span>${esc(c)}</span>`).join("")}</div>` : ""}
  <div class="foot" dir="ltr"><span>${PIN} 3640 Hillcroft St, Suite C · Houston, TX 77057</span><span>${PHONE} (713) 339-9300</span></div>
</div>
<script>
// Shrink long headlines until they fit in three lines. (Block scope: the page is reused.)
{
const h = document.getElementById("h");
let size = 70;
const fit = () => { while (h.scrollHeight > h.clientHeight + 2 && size > 38) { size -= 2; h.style.fontSize = size + "px"; } };
document.fonts.ready.then(() => { fit(); document.body.dataset.ready = "1"; });
}
</script>
</body></html>`;
}

const cards = (await loadCards()).filter((c) => c.file.includes(filter));
const { chromium } = await loadPlaywright();
// Falls back to the installed Google Chrome when Playwright's own Chromium isn't downloaded.
const browser = await chromium.launch().catch(() => chromium.launch({ channel: "chrome" }));
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
await mkdir(`${root}public/og`, { recursive: true });
for (const card of cards) {
  await page.setContent(await html(card), { waitUntil: "networkidle" });
  await page.waitForSelector("body[data-ready]");
  await page.screenshot({ path: `${root}public${card.file}`, type: "jpeg", quality: 86 });
  console.log(card.file);
}
await browser.close();
console.log(`${cards.length} share images written to public/og`);
