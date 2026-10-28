import { ogImage } from "@/components/site/og";
import { pageSchema } from "@/components/site/schema";
import { ALTERNATES, absoluteUrl, pageHead, type Lang } from "@/components/site/seo";
import { SHOP_COPY } from "@/shop/copy";
import { descriptionSummary, specRows } from "@/shop/description";
import { productPath, productPaths } from "@/shop/paths";
import type { Catalog, ShopProduct } from "@/shop/types";

export function shopHead(lang: Lang, catalog: Catalog | undefined) {
  const t = SHOP_COPY[lang];
  const products = catalog?.products ?? [];
  const image = products[0]?.images[0]?.url ?? ogImage("home", lang);
  return pageHead({
    paths: ALTERNATES.shop,
    lang,
    title: t.meta.title,
    description: t.meta.description,
    image,
    imageAlt: t.meta.title,
    jsonLd: pageSchema({
      paths: ALTERNATES.shop,
      lang,
      name: t.meta.title,
      description: t.meta.description,
      image,
      breadcrumb: [
        [t.meta.breadcrumb[0] ?? "", ALTERNATES.home[lang]],
        [t.meta.breadcrumb[1] ?? "", ALTERNATES.shop[lang]],
      ],
      faqs: [],
      extra: [
        {
          "@type": "ItemList",
          "@id": `${absoluteUrl(ALTERNATES.shop[lang])}#products`,
          itemListElement: products.map((p, i) => ({
            "@type": "ListItem",
            position: i + 1,
            url: absoluteUrl(productPath(lang, p.handle)),
            name: p.title,
          })),
        },
      ],
    }),
  });
}

/**
 * The Returns policy (src/shop/policy-content.ts) in the form Google reads: 14 days on phones and
 * tablets, with a 15% restocking fee once opened; accessories are final sale.
 */
function returnPolicy(product: ShopProduct, lang: Lang) {
  const url = absoluteUrl(lang === "es" ? "/es/politicas/returns" : "/policies/returns");
  if (product.category !== "phones" && product.category !== "tablets")
    return {
      "@type": "MerchantReturnPolicy",
      applicableCountry: "US",
      returnPolicyCategory: "https://schema.org/MerchantReturnNotPermitted",
      merchantReturnLink: url,
    };
  return {
    "@type": "MerchantReturnPolicy",
    applicableCountry: "US",
    returnPolicyCategory: "https://schema.org/MerchantReturnFiniteReturnWindow",
    merchantReturnDays: 14,
    returnMethod: ["https://schema.org/ReturnInStore", "https://schema.org/ReturnByMail"],
    returnFees: "https://schema.org/RestockingFees",
    restockingFee: 15,
    merchantReturnLink: url,
  };
}

export function productHead(
  lang: Lang,
  product: ShopProduct | undefined,
  source: Catalog["source"] | undefined,
) {
  const t = SHOP_COPY[lang];
  if (!product)
    return {
      meta: [
        {
          title:
            lang === "es"
              ? "Producto no disponible | TIC Wireless"
              : "Product unavailable | TIC Wireless",
        },
        { name: "description", content: t.checkoutError },
        {
          property: "og:title",
          content:
            lang === "es"
              ? "Producto no disponible | TIC Wireless"
              : "Product unavailable | TIC Wireless",
        },
        { property: "og:description", content: t.checkoutError },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary" },
        { name: "robots", content: "noindex, follow" },
      ],
    };
  const paths = productPaths(product.handle);
  const url = absoluteUrl(paths[lang]);
  const image = product.images[0]?.url ?? ogImage("home", lang);
  // The description's summary, not the whole flattened text (specs, store address, photo credits).
  const summary = (product.details && descriptionSummary(product.details)) || product.description;
  const description = summary.length > 155 ? `${summary.slice(0, 154).trimEnd()}…` : summary;
  const specs = product.details ? specRows(product.details) : [];
  const title = `${product.title} | ${lang === "es" ? "Compra" : "Shop"} TIC Wireless`;
  return pageHead({
    paths,
    lang,
    noindex: source !== "shopify",
    title,
    description,
    image,
    imageAlt: product.images[0]?.alt ?? product.title,
    jsonLd: pageSchema({
      paths,
      lang,
      name: title,
      description,
      image,
      breadcrumb: [
        [t.meta.breadcrumb[0] ?? "", ALTERNATES.home[lang]],
        [t.meta.breadcrumb[1] ?? "", ALTERNATES.shop[lang]],
        [product.title, paths[lang]],
      ],
      faqs: [],
      extra: [
        {
          "@type": "Product",
          "@id": `${url}#product`,
          name: product.title,
          description: summary,
          brand: { "@type": "Brand", name: product.vendor },
          image: product.images.map((im) => absoluteUrl(im.url)),
          url,
          ...(specs.length
            ? {
                additionalProperty: specs.map(([name, value]) => ({
                  "@type": "PropertyValue",
                  name,
                  value,
                })),
              }
            : {}),
          // Offers only with real Shopify prices; preview prices are placeholders.
          ...(source === "shopify"
            ? {
                offers: product.variants.map((v) => ({
                  "@type": "Offer",
                  name: v.title,
                  price: (v.price / 100).toFixed(2),
                  priceCurrency: "USD",
                  availability: v.available
                    ? "https://schema.org/InStock"
                    : "https://schema.org/OutOfStock",
                  url,
                  seller: { "@id": absoluteUrl("/#store") },
                  hasMerchantReturnPolicy: returnPolicy(product, lang),
                })),
              }
            : {}),
        },
      ],
    }),
  });
}
