import { createFileRoute } from "@tanstack/react-router";

import { leaseHubHead } from "@/components/lease/heads";
import { LeaseHubPage } from "@/components/lease/lease-pages";

export const Route = createFileRoute("/es/arrendamiento-equipos/")({
  head: () => leaseHubHead("es"),
  component: () => <LeaseHubPage lang="es" />,
});
