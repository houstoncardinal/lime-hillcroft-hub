import { createFileRoute } from "@tanstack/react-router";

import { CategoryPage } from "@/components/products/category-page";
import { categoryHead } from "@/components/products/heads";

export const Route = createFileRoute("/game-consoles/")({
  head: () => categoryHead("consoles", "en"),
  component: () => <CategoryPage category="consoles" lang="en" />,
});
