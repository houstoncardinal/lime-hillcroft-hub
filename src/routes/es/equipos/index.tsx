import { createFileRoute, redirect } from "@tanstack/react-router";

// Retired: the device catalog is now the lease-to-own catalog. Permanent redirect keeps old links.
export const Route = createFileRoute("/es/equipos/")({
  beforeLoad: () => {
    throw redirect({ href: "/es/arrendamiento-equipos", statusCode: 301 });
  },
});
