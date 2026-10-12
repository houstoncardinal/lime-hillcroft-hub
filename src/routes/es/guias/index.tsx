import { createFileRoute } from "@tanstack/react-router";

import { guidesHubHead } from "@/components/guides/heads";
import { GuidesHubPage } from "@/components/guides/hub-page";

export const Route = createFileRoute("/es/guias/")({
  head: () => guidesHubHead("es"),
  component: () => <GuidesHubPage lang="es" />,
});
