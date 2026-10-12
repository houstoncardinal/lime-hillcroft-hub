import { redirect } from "@tanstack/react-router";
import { createFileRoute } from "@tanstack/react-router";

import { SHOP_ENABLED } from "@/components/site/features";
import { shopHead } from "@/shop/heads";
import { ShopPage } from "@/shop/shop-page";
import { getCatalog } from "@/shop/storefront";

export const Route = createFileRoute("/es/tienda/")({
  // Shop is temporarily switched off (src/components/site/features.ts).
  beforeLoad: () => {
    if (!SHOP_ENABLED) throw redirect({ to: "/es", statusCode: 307 });
  },
  loader: () => getCatalog(),
  head: ({ loaderData }) => shopHead("es", loaderData),
  component: Shop,
});

function Shop() {
  return <ShopPage lang="es" catalog={Route.useLoaderData()} />;
}
