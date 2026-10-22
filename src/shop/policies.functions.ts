import { createServerFn } from "@tanstack/react-start";

export const getStorePolicies = createServerFn({ method: "GET" }).handler(async () => {
  const domain = process.env["SHOPIFY_STORE_DOMAIN"];
  const token = process.env["SHOPIFY_STOREFRONT_ACCESS_TOKEN"];
  if (!domain || !token) return null;
  const response = await fetch(`https://${domain.replace(/^https?:\/\//, "").replace(/\/$/, "")}/api/2026-10/graphql.json`, {
    method: "POST", headers: { "Content-Type": "application/json", "X-Shopify-Storefront-Access-Token": token },
    body: JSON.stringify({ query: "{ shop { privacyPolicy { body url } refundPolicy { body url } shippingPolicy { body url } termsOfService { body url } } }" }),
  });
  if (!response.ok) return null;
  type Policy = { body: string; url: string } | null;
  const result = await response.json() as { data?: { shop: { privacyPolicy: Policy; refundPolicy: Policy; shippingPolicy: Policy; termsOfService: Policy } } };
  const policies = result.data?.shop;
  if (!policies) return null;
  const text = (p: Policy) => p && !/My Store|\[INSERT|\[enter|example\.com/i.test(p.body) ? { url: p.url, paragraphs: p.body.replace(/<\/(p|div|li|h\d)>/gi, "\n").replace(/<[^>]*>/g, " ").replace(/&nbsp;/g, " ").replace(/&amp;/g, "&").replace(/&quot;/g, '"').split(/\n/).map((s) => s.trim()).filter(Boolean) } : null;
  return { privacy: text(policies.privacyPolicy), returns: text(policies.refundPolicy), shipping: text(policies.shippingPolicy), terms: text(policies.termsOfService), warranty: null };
});