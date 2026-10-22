import { createFileRoute } from "@tanstack/react-router";
import { getCatalog } from "@/shop/storefront";
import { absoluteUrl } from "@/components/site/seo";

export const Route = createFileRoute("/api/public/sitemap")({
  server: { handlers: { GET: async () => {
    const catalog = await getCatalog();
    if (catalog.source !== "shopify") return new Response("Catalog unavailable", { status: 503 });
    const escape = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/"/g, "&quot;");
    const entries = catalog.products.flatMap((p) => {
      const en = absoluteUrl(`/shop/${encodeURIComponent(p.handle)}`);
      const es = absoluteUrl(`/es/tienda/${encodeURIComponent(p.handle)}`);
      return [en, es].map((url) => `<url><loc>${escape(url)}</loc><xhtml:link rel="alternate" hreflang="en-US" href="${escape(en)}"/><xhtml:link rel="alternate" hreflang="es-US" href="${escape(es)}"/></url>`);
    });
    return new Response(`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">${entries.join("")}</urlset>`, { headers: { "Content-Type": "application/xml; charset=utf-8", "Cache-Control": "public, max-age=300" } });
  } } },
});