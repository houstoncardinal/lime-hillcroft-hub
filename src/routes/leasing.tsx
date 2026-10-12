import { createFileRoute } from "@tanstack/react-router";

import { LeasingPage } from "@/components/pages/leasing-page";
import { leasingHead } from "@/components/pages/heads";

export const Route = createFileRoute("/leasing")({
  head: () => leasingHead("en"),
  component: () => <LeasingPage lang="en" />,
});
