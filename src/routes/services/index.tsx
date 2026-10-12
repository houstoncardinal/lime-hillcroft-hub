import { createFileRoute } from "@tanstack/react-router";

import { servicesHubHead } from "@/components/services/heads";
import { ServicesHubPage } from "@/components/services/hub-page";

export const Route = createFileRoute("/services/")({
  head: () => servicesHubHead("en"),
  component: () => <ServicesHubPage lang="en" />,
});
