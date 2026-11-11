import { createFileRoute } from "@tanstack/react-router";

import { inHouseHead } from "@/components/pages/in-house-head";
import { InHousePage } from "@/components/pages/in-house-page";

export const Route = createFileRoute("/es/financiamiento-en-tienda")({
  head: () => inHouseHead("es"),
  component: () => <InHousePage lang="es" />,
});
