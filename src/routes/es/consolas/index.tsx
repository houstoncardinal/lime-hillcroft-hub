import { createFileRoute } from "@tanstack/react-router";

import { CategoryPage } from "@/components/products/category-page";
import { categoryHead } from "@/components/products/heads";

export const Route = createFileRoute("/es/consolas/")({
  head: () => categoryHead("consoles", "es"),
  component: () => <CategoryPage category="consoles" lang="es" />,
});
