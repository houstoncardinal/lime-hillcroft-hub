import { createFileRoute } from "@tanstack/react-router";

import { shopHead } from "@/shop/heads";
import { ShopPage } from "@/shop/shop-page";
import { getCatalog } from "@/shop/storefront";

export const Route = createFileRoute("/shop/")({
  loader: () => getCatalog(),
  head: ({ loaderData }) => shopHead("en", loaderData),
  component: Shop,
});

function Shop() {
  return <ShopPage lang="en" catalog={Route.useLoaderData()} />;
}
