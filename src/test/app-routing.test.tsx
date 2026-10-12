import { QueryClient } from "@tanstack/react-query";
import { createRouter, rootRouteId } from "@tanstack/react-router";
import { describe, expect, it } from "vitest";

import { routeTree } from "@/routeTree.gen";

// Match routes without running loaders or rendering: loaders may need a server or
// network the test run lacks, and jsdom never loads the stylesheets React waits on.
describe("App routing", () => {
  it("matches a page for / instead of falling back to not found", () => {
    const router = createRouter({ routeTree, context: { queryClient: new QueryClient() } });

    const matches = router.matchRoutes("/");

    expect(matches.at(-1)?.routeId).not.toBe(rootRouteId);
  });

  it.each([
    ["/es", "/es/"],
    ["/es/arrendamiento", "/es/arrendamiento"],
    ["/es/tienda", "/es/tienda/"],
    ["/es/zonas", "/es/zonas/"],
    ["/es/zonas/gulfton", "/es/zonas/$slug"],
    ["/es/tienda/airpods-pro-2", "/es/tienda/$handle"],
  ])("matches the Spanish page %s", (path, routeId) => {
    const router = createRouter({ routeTree, context: { queryClient: new QueryClient() } });

    expect(router.matchRoutes(path).at(-1)?.routeId).toBe(routeId);
  });

  it.each([
    ["/shop", "/shop/"],
    ["/shop/airpods-pro-2", "/shop/$handle"],
    ["/areas", "/areas/"],
    ["/areas/sharpstown", "/areas/$slug"],
    ["/guides", "/guides/"],
    ["/guides/how-to-unlock-your-phone", "/guides/$slug"],
    ["/es/guias/how-lease-to-own-works", "/es/guias/$slug"],
  ])("matches the shop page %s", (path, routeId) => {
    const router = createRouter({ routeTree, context: { queryClient: new QueryClient() } });

    expect(router.matchRoutes(path).at(-1)?.routeId).toBe(routeId);
  });

  it.each(["/vi", "/zh", "/ar"])("matches the language page %s", (path) => {
    const router = createRouter({ routeTree, context: { queryClient: new QueryClient() } });

    expect(router.matchRoutes(path).at(-1)?.routeId).toBe("/$lang");
  });

  it("matches the leasing landing page", () => {
    const router = createRouter({ routeTree, context: { queryClient: new QueryClient() } });

    const matches = router.matchRoutes("/leasing");

    expect(matches.at(-1)?.routeId).toBe("/leasing");
  });
});
