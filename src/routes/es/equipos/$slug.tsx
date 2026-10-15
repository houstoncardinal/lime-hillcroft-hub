import { createFileRoute, notFound } from "@tanstack/react-router";

import { DevicePage } from "@/components/products/device-page";
import { findDevice } from "@/components/products/devices";
import { deviceHead } from "@/components/products/heads";

export const Route = createFileRoute("/es/equipos/$slug")({
  loader: ({ params }) => {
    const entry = findDevice(params.slug);
    if (!entry) throw notFound();
    return { slug: entry.device.id };
  },
  head: ({ loaderData }) => deviceHead("es", loaderData ? findDevice(loaderData.slug) : undefined),
  component: Device,
});

function Device() {
  const { slug } = Route.useLoaderData();
  const entry = findDevice(slug);
  return entry ? <DevicePage device={entry.device} detail={entry.detail} lang="es" /> : null;
}
