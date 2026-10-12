import { createFileRoute, notFound } from "@tanstack/react-router";

import { findService } from "@/components/services/data";
import { serviceHead } from "@/components/services/heads";
import { ServicePage } from "@/components/services/service-page";

export const Route = createFileRoute("/services/$slug")({
  loader: ({ params }) => {
    const service = findService(params.slug);
    if (!service) throw notFound();
    return { slug: service.slug };
  },
  head: ({ loaderData }) =>
    serviceHead("en", loaderData ? findService(loaderData.slug) : undefined),
  component: Service,
});

function Service() {
  const { slug } = Route.useLoaderData();
  const service = findService(slug);
  return service ? <ServicePage service={service} lang="en" /> : null;
}
