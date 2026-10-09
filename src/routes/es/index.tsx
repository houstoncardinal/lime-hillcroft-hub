import { createFileRoute } from "@tanstack/react-router";

import { homeHead } from "@/components/pages/heads";
import { HomePage } from "@/components/pages/home-page";
import { getCatalog } from "@/shop/storefront";

export const Route = createFileRoute("/es/")({
  loader: () => getCatalog(),
  head: () => homeHead("es"),
  component: Home,
});

function Home() {
  return <HomePage lang="es" catalog={Route.useLoaderData()} />;
}
