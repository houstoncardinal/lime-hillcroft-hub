import { createFileRoute, notFound } from "@tanstack/react-router";

import { DevicePage } from "@/components/products/device-page";
import { findDevice } from "@/components/products/devices";
import { deviceHead } from "@/components/products/heads";
import { SHOP_ENABLED } from "@/components/site/features";
import { shopHandle } from "@/shop/device-shop";
import { getShopDevice } from "@/shop/storefront";

export const Route = createFileRoute("/es/equipos/$slug")({
  loader: async ({ params }) => {
    const entry = findDevice(params.slug);
    if (!entry) throw notFound();
    // Live price, stock and cart from Shopify; null when the store isn't connected.
    const shop = SHOP_ENABLED ? await getShopDevice({ data: shopHandle(entry.device.id) }) : null;
    return { slug: entry.device.id, shop };
  },
  head: ({ loaderData }) => deviceHead("es", loaderData ? findDevice(loaderData.slug) : undefined),
  component: Device,
});

function Device() {
  const { slug, shop } = Route.useLoaderData();
  const entry = findDevice(slug);
  return entry ? (
    <DevicePage device={entry.device} detail={entry.detail} lang="es" shop={shop} />
  ) : null;
}
