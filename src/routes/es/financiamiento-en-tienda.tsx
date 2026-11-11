import { createFileRoute, redirect } from "@tanstack/react-router";

// Old address: the page is now /es/arrendamiento-en-tienda. Permanent redirect keeps links working.
export const Route = createFileRoute("/es/financiamiento-en-tienda")({
  beforeLoad: () => {
    throw redirect({ to: "/es/arrendamiento-en-tienda", statusCode: 301 });
  },
});
