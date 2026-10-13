import { createFileRoute } from "@tanstack/react-router";

import { CategoryPage } from "@/components/products/category-page";
import { categoryHead } from "@/components/products/heads";

export const Route = createFileRoute("/laptops-tablets/")({
  head: () => categoryHead("laptops", "en"),
  component: () => <CategoryPage category="laptops" lang="en" />,
});
