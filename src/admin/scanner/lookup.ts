import { createServerFn } from "@tanstack/react-start";

// Looks up an unknown UPC/EAN so new products can be created pre-filled.
// Uses UPCitemdb's free trial endpoint (about 100 lookups/day, no key). Runs on the server.

export type UpcInfo = { title: string; brand: string; category: string } | null;

export const lookupBarcode = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => {
    const code = String((d as { code?: unknown } | null)?.code ?? "").trim();
    if (!/^\d{8,14}$/.test(code)) throw new Error("Not a UPC/EAN barcode");
    return { code };
  })
  .handler(async ({ data }): Promise<UpcInfo> => {
    try {
      const res = await fetch(
        `https://api.upcitemdb.com/prod/trial/lookup?upc=${encodeURIComponent(data.code)}`,
        { headers: { Accept: "application/json" }, signal: AbortSignal.timeout(6000) },
      );
      if (!res.ok) return null;
      const json = (await res.json()) as {
        items?: { title?: string; brand?: string; category?: string }[];
      };
      const item = json.items?.[0];
      if (!item?.title) return null;
      return {
        title: item.title.replace(/\s+/g, " ").trim(),
        brand: item.brand?.trim() ?? "",
        category: item.category ?? "",
      };
    } catch {
      return null;
    }
  });
