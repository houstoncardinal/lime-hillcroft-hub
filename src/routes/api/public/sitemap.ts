import { createFileRoute } from "@tanstack/react-router";
import { absoluteUrl } from "@/components/site/seo";

export const Route = createFileRoute("/api/public/sitemap")({
  server: { handlers: { GET: async () => {
    const domain = process.env["SHOPIFY_STORE_DOMAIN"]?.replace(/^https?:\/\//, "").replace(/\/$/, "");
    const token = process.env["SHOPIFY_STOREFRONT_ACCESS_TOKEN"];
    if (!domain || !token) return new Response("Catalog unavailable", { status: 503 });
    const products: { handle: string }[] = [];
    let after: string | null = null;
    do {
      const response = await fetch(`https://${domain}/api/2026-10/graphql.json`, { method: "POST", headers: { "Content-Type": "application/json", "X-Shopify-Storefront-Access-Token": token }, body: JSON.stringify({ query: "query($after:String){products(first:250,after:$after){nodes{handle}pageInfo{hasNextPage endCursor}}}", variables: { after } }) });
      if (!response.ok) return new Response("Catalog unavailable", { status: 503 });
      const result = await response.json() as { data?: { products: { nodes: { handle: string }[]; pageInfo: { hasNextPage: boolean; endCursor: string | null } } } };
      if (!result.data) return new Response("Catalog unavailable", { status: 503 });
      products.push(...result.data.products.nodes);
      after = result.data.products.pageInfo.hasNextPage ? result.data.products.pageInfo.endCursor : null;
    } while (after);
    const escape = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/"/g, "&quot;");
    const entries = products.flatMap((p) => {
      const en = absoluteUrl(`/shop/${encodeURIComponent(p.handle)}`);
      const es = absoluteUrl(`/es/tienda/${encodeURIComponent(p.handle)}`);
      return [en, es].map((url) => `<url><loc>${escape(url)}</loc><xhtml:link rel="alternate" hreflang="en-US" href="${escape(en)}"/><xhtml:link rel="alternate" hreflang="es-US" href="${escape(es)}"/></url>`);
    });
    return new Response(`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">${entries.join("")}</urlset>`, { headers: { "Content-Type": "application/xml; charset=utf-8", "Cache-Control": "public, max-age=300" } });
  } } },
});