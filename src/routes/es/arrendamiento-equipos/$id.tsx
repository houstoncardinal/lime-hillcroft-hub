import { createFileRoute, notFound } from "@tanstack/react-router";

import { findLeaseDevice } from "@/components/lease/catalog";
import { leaseDeviceHead } from "@/components/lease/heads";
import { LeaseDevicePage } from "@/components/lease/lease-pages";

// Lease-to-own device page: prices from the owner's sheet, no Shopify checkout.
export const Route = createFileRoute("/es/arrendamiento-equipos/$id")({
  loader: ({ params }) => {
    if (!findLeaseDevice(params.id)) throw notFound();
    return { id: params.id };
  },
  head: ({ loaderData }) =>
    leaseDeviceHead("es", loaderData ? findLeaseDevice(loaderData.id) : undefined),
  component: Device,
});

function Device() {
  const { id } = Route.useLoaderData();
  const device = findLeaseDevice(id);
  return device ? <LeaseDevicePage device={device} lang="es" /> : null;
}
