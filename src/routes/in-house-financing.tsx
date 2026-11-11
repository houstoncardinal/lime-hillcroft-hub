import { createFileRoute, redirect } from "@tanstack/react-router";

// Old address: the page is now /in-house-leasing. Permanent redirect keeps shared links working.
export const Route = createFileRoute("/in-house-financing")({
  beforeLoad: () => {
    throw redirect({ to: "/in-house-leasing", statusCode: 301 });
  },
});
