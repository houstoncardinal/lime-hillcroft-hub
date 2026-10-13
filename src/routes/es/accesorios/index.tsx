import { createFileRoute } from "@tanstack/react-router";

import { CategoryPage } from "@/components/products/category-page";
import { categoryHead } from "@/components/products/heads";

export const Route = createFileRoute("/es/accesorios/")({
  head: () => categoryHead("accessories", "es"),
  component: () => <CategoryPage category="accessories" lang="es" />,
});
