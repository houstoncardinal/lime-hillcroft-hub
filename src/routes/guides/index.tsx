import { createFileRoute } from "@tanstack/react-router";

import { guidesHubHead } from "@/components/guides/heads";
import { GuidesHubPage } from "@/components/guides/hub-page";

export const Route = createFileRoute("/guides/")({
  head: () => guidesHubHead("en"),
  component: () => <GuidesHubPage lang="en" />,
});
