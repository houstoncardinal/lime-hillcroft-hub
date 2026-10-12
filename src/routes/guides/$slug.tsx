import { createFileRoute, notFound } from "@tanstack/react-router";

import { findGuide } from "@/components/guides/data";
import { GuidePage } from "@/components/guides/guide-page";
import { guideHead } from "@/components/guides/heads";

export const Route = createFileRoute("/guides/$slug")({
  loader: ({ params }) => {
    const guide = findGuide(params.slug);
    if (!guide) throw notFound();
    return { slug: guide.slug };
  },
  head: ({ loaderData }) => guideHead("en", loaderData ? findGuide(loaderData.slug) : undefined),
  component: Guide,
});

function Guide() {
  const { slug } = Route.useLoaderData();
  const guide = findGuide(slug);
  return guide ? <GuidePage guide={guide} lang="en" /> : null;
}
