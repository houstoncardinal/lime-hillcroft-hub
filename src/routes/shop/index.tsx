import { redirect } from "@tanstack/react-router";
import { createFileRoute } from "@tanstack/react-router";

import { SHOP_ENABLED } from "@/components/site/features";
import { shopHead } from "@/shop/heads";
import { ShopPage } from "@/shop/shop-page";
import { getCatalog } from "@/shop/storefront";

export const Route = createFileRoute("/shop/")({
  // Shop is temporarily switched off (src/components/site/features.ts).
  beforeLoad: () => {
    if (!SHOP_ENABLED) throw redirect({ to: "/", statusCode: 307 });
  },
  loader: () => getCatalog(),
  head: ({ loaderData }) => shopHead("en", loaderData),
  component: Shop,
});

function Shop() {
  return <ShopPage lang="en" catalog={Route.useLoaderData()} />;
}
