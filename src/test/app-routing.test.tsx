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
    ["/es/financiamiento", "/es/financiamiento"],
    ["/es/tienda", "/es/tienda/"],
    ["/es/tienda/airpods-pro-2", "/es/tienda/$handle"],
  ])("matches the Spanish page %s", (path, routeId) => {
    const router = createRouter({ routeTree, context: { queryClient: new QueryClient() } });

    expect(router.matchRoutes(path).at(-1)?.routeId).toBe(routeId);
  });

  it.each([
    ["/shop", "/shop/"],
    ["/shop/airpods-pro-2", "/shop/$handle"],
  ])("matches the shop page %s", (path, routeId) => {
    const router = createRouter({ routeTree, context: { queryClient: new QueryClient() } });

    expect(router.matchRoutes(path).at(-1)?.routeId).toBe(routeId);
  });

  it("matches the financing landing page", () => {
    const router = createRouter({ routeTree, context: { queryClient: new QueryClient() } });

    const matches = router.matchRoutes("/financing");

    expect(matches.at(-1)?.routeId).toBe("/financing");
  });
});
