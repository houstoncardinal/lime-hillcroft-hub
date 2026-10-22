import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  useRouterState,
  HeadContent,
  Scripts,
  type ErrorComponentProps,
} from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";

import appCss from "../styles.css?url";
import manropeLatin from "@fontsource-variable/manrope/files/manrope-latin-wght-normal.woff2?url";
import sairaLatin from "@fontsource-variable/saira/files/saira-latin-wght-normal.woff2?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { isRequestConnectionError } from "@/lib/request-errors";
import { Button } from "@/components/ui/button";
import { conversionFor, track } from "@/admin/tracker";
import { THEME_INIT_SCRIPT } from "@/components/site/themes";
import { findIntl } from "@/components/intl/languages";
import { syncAnalytics } from "@/components/site/analytics";
import { syncTidio } from "@/components/site/tidio";

function NotFoundComponent() {
  const es = useRouterState({ select: (s) => /^\/es(\/|$)/.test(s.location.pathname) });
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">{es ? "Página no encontrada" : "Page not found"}</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          {es ? "La página que buscas no existe o cambió de dirección." : "The page you’re looking for doesn’t exist or has been moved."}
        </p>
        <div className="mt-6">
          <Link
            to={es ? "/es" : "/"}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            {es ? "Ir al inicio" : "Go home"}
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: ErrorComponentProps) {
  const connectionError = isRequestConnectionError(error);
  const [retrying, setRetrying] = useState(false);
  const router = useRouter();
  const es = useRouterState({ select: (s) => /^\/es(\/|$)/.test(s.location.pathname) });
  useEffect(() => {
    if (!connectionError) reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error, connectionError]);

  const retry = async () => {
    setRetrying(true);
    try { await router.invalidate(); reset(); }
    catch { /* Keep the recovery screen visible while the connection is unavailable. */ }
    finally { setRetrying(false); }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
{connectionError ? (es ? "No pudimos conectar" : "We couldn’t connect") : es ? "Esta página no se pudo cargar" : "This page didn’t load"}
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
{connectionError ? (es ? "Comprueba tu conexión e intenta de nuevo. Tu carrito guardado no se ha borrado." : "Check your connection and try again. Your saved cart has not been cleared.") : es ? "Ocurrió un error. Intenta de nuevo o vuelve al inicio." : "Something went wrong. Try again or head back home."}
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <Button
            disabled={retrying}
            onClick={() => void retry()}
          >
            {es ? "Reintentar" : "Try again"}
          </Button>
          <a
            href={es ? "/es" : "/"}
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            {es ? "Ir al inicio" : "Go home"}
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { name: "theme-color", content: "#0f1a26" },
      { title: "TIC Wireless Electronic & Repair Center — Cell Phone Store & Repair in Houston" },
      { name: "format-detection", content: "telephone=yes" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      // Self-hosted fonts (@fontsource-variable, imported in styles.css). Preloading the two Latin
      // files lets headings and text paint without waiting on a third-party font server.
      {
        rel: "preload",
        href: manropeLatin,
        as: "font",
        type: "font/woff2",
        crossOrigin: "anonymous",
      },
      {
        rel: "preload",
        href: sairaLatin,
        as: "font",
        type: "font/woff2",
        crossOrigin: "anonymous",
      },
      { rel: "icon", href: "/favicon.ico", sizes: "any" },
      { rel: "icon", href: "/favicon.svg", type: "image/svg+xml" },
      { rel: "apple-touch-icon", href: "/apple-touch-icon.png" },
      { rel: "manifest", href: "/site.webmanifest" },
    ],
    // Applies the saved color theme before first paint (src/components/site/themes.ts).
    scripts: [{ children: THEME_INIT_SCRIPT }],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  const lang = useRouterState({
    select: (s) => {
      const seg = s.location.pathname.split("/")[1] ?? "";
      if (seg === "es") return "es";
      return findIntl(seg)?.tag ?? "en";
    },
  });
  return (
    <html lang={lang} suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  // Website statistics for /admin/analytics: page views plus call/directions/language clicks.
  useEffect(() => {
    track("pageview", pathname);
  }, [pathname]);
  useEffect(() => {
    syncTidio(pathname);
    syncAnalytics(pathname);
  }, [pathname]);
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const a = (e.target as Element | null)?.closest?.("a");
      const type = a && conversionFor(a);
      if (type) track(type);
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
      <Outlet />
    </QueryClientProvider>
  );
}
