import { createFileRoute } from "@tanstack/react-router";

import { CategoryPage } from "@/components/products/category-page";
import { categoryHead } from "@/components/products/heads";

export const Route = createFileRoute("/es/laptops-y-tabletas/")({
  head: () => categoryHead("laptops", "es"),
  component: () => <CategoryPage category="laptops" lang="es" />,
});
