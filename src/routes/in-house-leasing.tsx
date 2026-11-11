import { createFileRoute } from "@tanstack/react-router";

import { inHouseHead } from "@/components/pages/in-house-head";
import { InHousePage } from "@/components/pages/in-house-page";

export const Route = createFileRoute("/in-house-leasing")({
  head: () => inHouseHead("en"),
  component: () => <InHousePage lang="en" />,
});
