import { createFileRoute } from "@tanstack/react-router";

import { locationHead } from "@/components/location/heads";
import { LocationPage } from "@/components/location/location-page";

export const Route = createFileRoute("/location/")({
  head: () => locationHead("en"),
  component: () => <LocationPage lang="en" />,
});
