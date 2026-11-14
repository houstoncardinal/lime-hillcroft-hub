// Leasing-partner advertising rules applied to text we don't write ourselves (Shopify product
// descriptions). American First Finance's review (Nov 13 2026) requires that the site never
// advertise a down/initial payment amount and never say "no credit needed" / "no credit check":
// say "all credit welcome" instead. Older Shopify descriptions end with a line such as
// "Lease-to-own available: no credit needed, as low as $40 down, subject to approval." — this
// rewrites it, and any similar wording, before the description is parsed or shown.

const RULES: [RegExp, string][] = [
  // The standard closing line of our device listings, whatever it says in between.
  [
    /Lease-to-own available:[^.<]*?subject to approval\./gi,
    "Lease-to-own available: all credit welcome, subject to approval.",
  ],
  // Any advertised starting / down / initial payment amount.
  [
    /,?\s*(?:as low as|starting at|from|only)?\s*\$\s?\d+(?:\.\d{2})?\s*(?:down|initial payment|to start)\b/gi,
    "",
  ],
  [/\b(?:no[- ]credit[- ]needed|no credit check|no credit required)\b/gi, "all credit welcome"],
  [/\bsin (?:necesidad de )?cr[eé]dito\b/gi, "se acepta todo tipo de crédito"],
  [/\b(?:same as cash|interest[- ]free|instant decisions?)\b/gi, ""],
];

/** Shopify text with non-compliant leasing claims rewritten. */
export function compliantText(s: string): string {
  let out = s;
  for (const [re, rep] of RULES) out = out.replace(re, rep);
  return out;
}
