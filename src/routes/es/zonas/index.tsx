import { createFileRoute } from "@tanstack/react-router";

import { areasHubHead } from "@/components/areas/heads";
import { AreasHubPage } from "@/components/areas/hub-page";

export const Route = createFileRoute("/es/zonas/")({
  head: () => areasHubHead("es"),
  component: () => <AreasHubPage lang="es" />,
});
