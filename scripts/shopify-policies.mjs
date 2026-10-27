// Writes the store policies (src/shop/policy-content.ts) as HTML for Shopify admin → Settings →
// Policies, so the links at checkout say exactly what the website says. Run after changing a policy:
//
//   npm run shopify:policies
//
// Shopify has no warranty policy, so the Warranty policy is added to the end of the Refund policy.
import fs from "node:fs";
import { loadModule, root } from "./lib/pages.mjs";

const SITE = "https://www.ticwirelesstx.com";
const { POLICIES, POLICY_UPDATED } = await loadModule("/src/shop/policy-content.ts");
const { ADDRESS, PHONE } = await loadModule("/src/components/site/business.ts");

const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const updated = new Date(`${POLICY_UPDATED}T12:00:00`).toLocaleDateString("en-US", {
  month: "long",
  day: "numeric",
  year: "numeric",
});

function html(doc, { heading, page } = {}) {
  const out = [];
  if (heading) out.push(`<h2>${esc(heading)}</h2>`);
  out.push(`<p><strong>${esc(doc.summary)}</strong></p>`);
  out.push(`<ul>${doc.points.map((p) => `<li>${esc(p)}</li>`).join("")}</ul>`);
  for (const s of doc.sections) {
    if (s.id === "contact") continue; // one contact line at the end instead
    out.push(`<h3>${esc(s.title)}</h3>`);
    for (const b of s.body)
      out.push(
        typeof b === "string"
          ? `<p>${esc(b)}</p>`
          : `<ul>${b.list.map((i) => `<li>${esc(i)}</li>`).join("")}</ul>`,
      );
  }
  if (page) out.push(`<p>Also on our website: <a href="${SITE}${page}">${SITE}${page}</a></p>`);
  return out.join("\n");
}

const footer = `<h3>Contact us</h3>\n<p>TIC Wireless Electronic &amp; Repair Center, ${esc(ADDRESS)}. Call ${esc(PHONE)}, or visit us Monday to Saturday 9 AM – 8 PM and Sunday 9 AM – 5 PM.</p>\n<p><em>Last updated ${updated}.</em></p>`;

const files = {
  "refund-policy.html": [
    html(POLICIES.returns.en, { page: "/policies/returns" }),
    html(POLICIES.warranty.en, { heading: "Warranty", page: "/policies/warranty" }),
  ],
  "privacy-policy.html": [html(POLICIES.privacy.en, { page: "/policies/privacy" })],
  "terms-of-service.html": [html(POLICIES.terms.en, { page: "/policies/terms" })],
  "shipping-policy.html": [html(POLICIES.shipping.en, { page: "/policies/shipping" })],
};

const dir = `${root}docs/shopify/policies`;
fs.mkdirSync(dir, { recursive: true });
for (const [name, parts] of Object.entries(files)) {
  fs.writeFileSync(`${dir}/${name}`, `${parts.join("\n\n")}\n\n${footer}\n`);
  console.log(`docs/shopify/policies/${name}`);
}
fs.writeFileSync(
  `${dir}/contact-information.html`,
  `<p><strong>TIC Wireless Electronic &amp; Repair Center</strong></p>\n<p>${esc(ADDRESS)}</p>\n<p>Phone: ${esc(PHONE)}</p>\n<p>Hours: Monday – Saturday 9:00 AM – 8:00 PM, Sunday 9:00 AM – 5:00 PM</p>\n<p>Website: <a href="${SITE}">${SITE}</a></p>\n`,
);
console.log("docs/shopify/policies/contact-information.html");
