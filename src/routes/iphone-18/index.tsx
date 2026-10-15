import { createFileRoute } from "@tanstack/react-router";

import { CategoryPage } from "@/components/products/category-page";
import { categoryHead } from "@/components/products/heads";

export const Route = createFileRoute("/iphone-18/")({
  head: () => categoryHead("iphone18", "en"),
  component: () => <CategoryPage category="iphone18" lang="en" />,
});
