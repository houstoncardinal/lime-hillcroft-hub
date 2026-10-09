import { createFileRoute, notFound } from "@tanstack/react-router";

import { productHead } from "@/shop/heads";
import { ProductPage } from "@/shop/product-page";
import { getCatalog } from "@/shop/storefront";

export const Route = createFileRoute("/es/tienda/$handle")({
  loader: async ({ params }) => {
    const catalog = await getCatalog();
    const product = catalog.products.find((p) => p.handle === params.handle);
    if (!product) throw notFound();
    const related = catalog.products
      .filter((p) => p.handle !== product.handle && p.category === product.category)
      .concat(catalog.products.filter((p) => p.featured && p.handle !== product.handle))
      .filter((p, i, all) => all.findIndex((x) => x.id === p.id) === i)
      .slice(0, 4);
    return { product, related, source: catalog.source };
  },
  head: ({ loaderData }) => productHead("es", loaderData?.product, loaderData?.source),
  component: Product,
});

function Product() {
  const { product, related } = Route.useLoaderData();
  return <ProductPage lang="es" product={product} related={related} />;
}
