import { createFileRoute } from "@tanstack/react-router";

import { DevicesHubPage } from "@/components/products/devices-hub";
import { devicesHubHead } from "@/components/products/heads";

export const Route = createFileRoute("/devices/")({
  head: () => devicesHubHead("en"),
  component: () => <DevicesHubPage lang="en" />,
});
