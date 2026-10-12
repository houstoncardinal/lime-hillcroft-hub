import { createFileRoute } from "@tanstack/react-router";

import { LeasingPage } from "@/components/pages/leasing-page";
import { leasingHead } from "@/components/pages/heads";

export const Route = createFileRoute("/es/arrendamiento")({
  head: () => leasingHead("es"),
  component: () => <LeasingPage lang="es" />,
});
