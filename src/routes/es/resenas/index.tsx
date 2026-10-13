import { createFileRoute } from "@tanstack/react-router";

import { reviewsHead } from "@/components/reviews/heads";
import { ReviewsPage } from "@/components/reviews/reviews-page";

export const Route = createFileRoute("/es/resenas/")({
  head: () => reviewsHead("es"),
  component: () => <ReviewsPage lang="es" />,
});
