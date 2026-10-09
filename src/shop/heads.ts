import { pageSchema } from "@/components/site/schema";
import { ALTERNATES, absoluteUrl, pageHead, type Lang } from "@/components/site/seo";
import { SHOP_COPY } from "@/shop/copy";
import { productPath, productPaths } from "@/shop/paths";
import type { Catalog, ShopProduct } from "@/shop/types";

export function shopHead(lang: Lang, catalog: Catalog | undefined) {
  const t = SHOP_COPY[lang];
  const products = catalog?.products ?? [];
  const image = products[0]?.images[0]?.url ?? "/og/home.jpg";
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

export function productHead(
  lang: Lang,
  product: ShopProduct | undefined,
  source: Catalog["source"] | undefined,
) {
  const t = SHOP_COPY[lang];
  if (!product) return { meta: [{ title: t.meta.title }] };
  const paths = productPaths(product.handle);
  const url = absoluteUrl(paths[lang]);
  const image = product.images[0]?.url ?? "/og/home.jpg";
  const description = product.description.slice(0, 155);
  const title = `${product.title} — ${product.vendor} | TIC Wireless Houston`;
  return pageHead({
    paths,
    lang,
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
          description: product.description,
          brand: { "@type": "Brand", name: product.vendor },
          image: product.images.map((im) => absoluteUrl(im.url)),
          url,
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
                })),
              }
            : {}),
        },
      ],
    }),
  });
}
