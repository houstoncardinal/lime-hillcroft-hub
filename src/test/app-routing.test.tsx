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

  it.each([
    ["/services", "/services/"],
    ["/services/phone-repair", "/services/$slug"],
    ["/services/iphone-repair", "/services/$slug"],
    ["/services/samsung-repair", "/services/$slug"],
    ["/es/servicios/iphone-repair", "/es/servicios/$slug"],
    ["/es/servicios/samsung-repair", "/es/servicios/$slug"],
    ["/iphone-18", "/iphone-18/"],
    ["/es/iphone-18", "/es/iphone-18/"],
    ["/es/servicios", "/es/servicios/"],
    ["/es/servicios/prepaid-plans", "/es/servicios/$slug"],
    ["/location", "/location/"],
    ["/accessories", "/accessories/"],
    ["/game-consoles", "/game-consoles/"],
    ["/es/accesorios", "/es/accesorios/"],
    ["/es/consolas", "/es/consolas/"],
    ["/laptops-tablets", "/laptops-tablets/"],
    ["/reviews", "/reviews/"],
    ["/es/resenas", "/es/resenas/"],
    ["/es/laptops-y-tabletas", "/es/laptops-y-tabletas/"],
    ["/es/ubicacion", "/es/ubicacion/"],
    ["/devices/galaxy-s20-ultra", "/devices/$slug"],
    ["/devices/iphone-18", "/devices/$slug"],
    ["/es/equipos/ipad-mini-5", "/es/equipos/$slug"],
  ])("matches the services page %s", (path, routeId) => {
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
