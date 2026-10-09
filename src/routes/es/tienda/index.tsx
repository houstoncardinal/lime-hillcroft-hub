import { createFileRoute } from "@tanstack/react-router";

import { shopHead } from "@/shop/heads";
import { ShopPage } from "@/shop/shop-page";
import { getCatalog } from "@/shop/storefront";

export const Route = createFileRoute("/es/tienda/")({
  loader: () => getCatalog(),
  head: ({ loaderData }) => shopHead("es", loaderData),
  component: Shop,
});

function Shop() {
  return <ShopPage lang="es" catalog={Route.useLoaderData()} />;
}
