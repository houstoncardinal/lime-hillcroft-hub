import { createFileRoute, notFound } from "@tanstack/react-router";
import { getStorePolicies } from "@/shop/policies.functions";
import { PolicyPage, policyKey, policyHead } from "@/shop/policies-page";
export const Route = createFileRoute("/es/politicas/$policy")({
  loader: async ({ params }) => { const key = policyKey(params.policy); if (!key) throw notFound(); return { key, policies: await getStorePolicies() }; },
  head: ({ loaderData }) => policyHead("es", loaderData?.key ?? "privacy"),
  component: Policy,
});
function Policy() { const { key, policies } = Route.useLoaderData(); return <PolicyPage lang="es" policy={key} policies={policies} />; }