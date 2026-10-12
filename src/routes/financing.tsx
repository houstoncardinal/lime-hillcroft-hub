import { createFileRoute, redirect } from "@tanstack/react-router";

// Old address: the page is now /leasing. Permanent redirect keeps shared links and rankings.
export const Route = createFileRoute("/financing")({
  beforeLoad: () => {
    throw redirect({ to: "/leasing", statusCode: 301 });
  },
});
