import { createFileRoute } from "@tanstack/react-router";

import { CategoryPage } from "@/components/products/category-page";
import { categoryHead } from "@/components/products/heads";

export const Route = createFileRoute("/es/iphone-18/")({
  head: () => categoryHead("iphone18", "es"),
  component: () => <CategoryPage category="iphone18" lang="es" />,
});
