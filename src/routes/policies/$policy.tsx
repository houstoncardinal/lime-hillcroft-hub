import { createFileRoute, notFound } from "@tanstack/react-router";

import { PolicyPage, policyHead, policyKey } from "@/shop/policies-page";

export const Route = createFileRoute("/policies/$policy")({
  loader: ({ params }) => {
    const key = policyKey(params.policy);
    if (!key) throw notFound();
    return { key };
  },
  head: ({ loaderData }) => policyHead("en", loaderData?.key ?? "privacy"),
  component: Policy,
});

function Policy() {
  const { key } = Route.useLoaderData();
  return <PolicyPage lang="en" policy={key} />;
}
