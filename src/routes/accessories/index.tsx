import { createFileRoute } from "@tanstack/react-router";

import { CategoryPage } from "@/components/products/category-page";
import { categoryHead } from "@/components/products/heads";

export const Route = createFileRoute("/accessories/")({
  head: () => categoryHead("accessories", "en"),
  component: () => <CategoryPage category="accessories" lang="en" />,
});
