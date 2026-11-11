import { createFileRoute, redirect } from "@tanstack/react-router";

// Retired: the device catalog is now the lease-to-own catalog. Permanent redirect keeps old links.
export const Route = createFileRoute("/devices/")({
  beforeLoad: () => {
    throw redirect({ href: "/lease-to-own", statusCode: 301 });
  },
});
