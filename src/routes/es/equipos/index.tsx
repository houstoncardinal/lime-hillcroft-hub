import { createFileRoute } from "@tanstack/react-router";

import { DevicesHubPage } from "@/components/products/devices-hub";
import { devicesHubHead } from "@/components/products/heads";

export const Route = createFileRoute("/es/equipos/")({
  head: () => devicesHubHead("es"),
  component: () => <DevicesHubPage lang="es" />,
});
