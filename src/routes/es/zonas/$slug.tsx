import { createFileRoute, notFound } from "@tanstack/react-router";

import { AreaPage } from "@/components/areas/area-page";
import { findArea } from "@/components/areas/data";
import { areaHead } from "@/components/areas/heads";

export const Route = createFileRoute("/es/zonas/$slug")({
  loader: ({ params }) => {
    const area = findArea(params.slug);
    if (!area) throw notFound();
    return { slug: area.slug };
  },
  head: ({ loaderData }) => areaHead("es", loaderData ? findArea(loaderData.slug) : undefined),
  component: Area,
});

function Area() {
  const { slug } = Route.useLoaderData();
  const area = findArea(slug);
  return area ? <AreaPage area={area} lang="es" /> : null;
}
