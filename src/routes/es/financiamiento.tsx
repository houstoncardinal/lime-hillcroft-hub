import { createFileRoute, redirect } from "@tanstack/react-router";

// Dirección anterior: la página ahora es /es/arrendamiento (redirección permanente).
export const Route = createFileRoute("/es/financiamiento")({
  beforeLoad: () => {
    throw redirect({ to: "/es/arrendamiento", statusCode: 301 });
  },
});
