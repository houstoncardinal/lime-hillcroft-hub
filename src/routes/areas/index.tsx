import { createFileRoute } from "@tanstack/react-router";

import { areasHubHead } from "@/components/areas/heads";
import { AreasHubPage } from "@/components/areas/hub-page";

export const Route = createFileRoute("/areas/")({
  head: () => areasHubHead("en"),
  component: () => <AreasHubPage lang="en" />,
});
