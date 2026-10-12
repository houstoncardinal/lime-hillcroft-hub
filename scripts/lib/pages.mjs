// Loads every indexable page's <head> (src/components/site/page-index.ts) through Vite, so the
// SEO scripts read exactly what the site renders.
import { fileURLToPath } from "node:url";
import { createServer } from "vite";

export const root = fileURLToPath(new URL("../..", import.meta.url));

export async function loadModule(path) {
  if (process.env.SITE_URL) process.env.VITE_SITE_URL = process.env.SITE_URL;
  const vite = await createServer({
    root,
    configFile: false,
    logLevel: "error",
    server: { middlewareMode: true, hmr: false },
    resolve: { alias: { "@": `${root}src` } },
  });
  try {
    return await vite.ssrLoadModule(path);
  } finally {
    await vite.close();
  }
}

export const loadPages = async () =>
  (await loadModule("/src/components/site/page-index.ts")).allPageHeads();
