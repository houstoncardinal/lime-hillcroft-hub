import { createFileRoute, redirect } from "@tanstack/react-router";

import { leaseIdForDevice } from "@/components/lease/catalog";

// Retired: each device's page is now its lease-to-own page (or the catalog when it isn't leased).
export const Route = createFileRoute("/devices/$slug")({
  beforeLoad: ({ params }) => {
    const id = leaseIdForDevice(params.slug);
    throw redirect({ href: id ? `/lease-to-own/${id}` : "/lease-to-own", statusCode: 301 });
  },
});
