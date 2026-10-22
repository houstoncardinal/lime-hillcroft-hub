import "./lib/error-capture";

import { consumeLastCapturedError } from "./lib/error-capture";
import { renderErrorPage } from "./lib/error-page";

type ServerEntry = {
  fetch: (request: Request, env: unknown, ctx: unknown) => Promise<Response> | Response;
};

let serverEntryPromise: Promise<ServerEntry> | undefined;

async function getServerEntry(): Promise<ServerEntry> {
  if (!serverEntryPromise) {
    serverEntryPromise = import("@tanstack/react-start/server-entry").then(
      (m) => (m.default ?? m) as ServerEntry,
    );
  }
  return serverEntryPromise;
}

// h3 swallows in-handler throws into a normal 500 Response with body
// {"unhandled":true,"message":"HTTPError"} — try/catch alone never fires for those.
async function normalizeCatastrophicSsrResponse(response: Response, pathname: string): Promise<Response> {
  if (response.status < 500) return response;
  const contentType = response.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) return response;

  const body = await response.clone().text();
  if (!isH3SwallowedErrorBody(body)) return response;

  console.error(consumeLastCapturedError() ?? new Error(`h3 swallowed SSR error: ${body}`));
  return new Response(renderErrorPage(pathname), {
    status: 500,
    headers: { "content-type": "text/html; charset=utf-8" },
  });
}

function isH3SwallowedErrorBody(body: string): boolean {
  try {
    const payload = JSON.parse(body) as { unhandled?: unknown; message?: unknown };
    return payload.unhandled === true && payload.message === "HTTPError";
  } catch {
    return false;
  }
}

// The router normalizes "/location/" to "/location" with a 307 (temporary), which tells search
// engines to keep the slash URL. Answer first with a permanent 301 to the slash-less path, keeping
// the query string. "/" itself is never redirected.
function trailingSlashRedirect(request: Request): Response | undefined {
  if (request.method !== "GET" && request.method !== "HEAD") return undefined;
  const url = new URL(request.url);
  if (url.pathname === "/" || !url.pathname.endsWith("/")) return undefined;
  // Collapse leading slashes too, so "//evil.example/" can't become a protocol-relative redirect.
  const path = url.pathname.replace(/\/+$/, "").replace(/^\/+/, "/") || "/";
  return new Response(null, {
    status: 301,
    headers: { location: path + url.search, "cache-control": "public, max-age=3600" },
  });
}

// Public pages are the same for every visitor, so Netlify's edge may keep them for 5 minutes and
// serve a stale copy for up to a day while it refreshes in the background. Netlify clears this cache
// on every deploy. Browsers still revalidate (no change to Cache-Control). Netlify's [[headers]] rules
// only apply to static files, so the header is set here. /admin and non-HTML responses (server
// functions, errors, redirects) are never edge-cached.
const EDGE_CACHE = "public, durable, s-maxage=300, stale-while-revalidate=86400";

function withEdgeCache(request: Request, response: Response): Response {
  if (request.method !== "GET" && request.method !== "HEAD") return response;
  if (response.status !== 200) return response;
  if (!(response.headers.get("content-type") ?? "").includes("text/html")) return response;
  if (response.headers.has("set-cookie")) return response;
  const { pathname } = new URL(request.url);
  if (pathname === "/admin" || pathname.startsWith("/admin/")) return response;
  const headers = new Headers(response.headers);
  headers.set("netlify-cdn-cache-control", EDGE_CACHE);
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}

export default {
  async fetch(request: Request, env: unknown, ctx: unknown) {
    const redirect = trailingSlashRedirect(request);
    if (redirect) return redirect;
    try {
      const handler = await getServerEntry();
      const response = await handler.fetch(request, env, ctx);
      if (request.headers.get("x-tsr-serverfn") === "true" || new URL(request.url).pathname.startsWith("/_serverFn/")) return response;
      return withEdgeCache(request, await normalizeCatastrophicSsrResponse(response, new URL(request.url).pathname));
    } catch (error) {
      console.error(error);
      if (request.headers.get("x-tsr-serverfn") === "true" || new URL(request.url).pathname.startsWith("/_serverFn/")) throw error;
      return new Response(renderErrorPage(new URL(request.url).pathname), {
        status: 500,
        headers: { "content-type": "text/html; charset=utf-8" },
      });
    }
  },
};
