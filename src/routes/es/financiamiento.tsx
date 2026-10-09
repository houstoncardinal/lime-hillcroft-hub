import { createFileRoute } from "@tanstack/react-router";

import { FinancingPage } from "@/components/pages/financing-page";
import { financingHead } from "@/components/pages/heads";

export const Route = createFileRoute("/es/financiamiento")({
  head: () => financingHead("es"),
  component: () => <FinancingPage lang="es" />,
});
