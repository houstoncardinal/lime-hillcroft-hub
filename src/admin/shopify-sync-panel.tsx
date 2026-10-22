import { useEffect, useRef, useState } from "react";
import { ArrowUpFromLine, Loader2, RefreshCw, ShoppingBag } from "lucide-react";
import { toast } from "sonner";
import { useServerFn } from "@tanstack/react-start";
import { adminGeneration, adminStorageStatus, inventory, useAdminData, waitForAdminWrites } from "@/admin/store";
import { shopifyPullProducts, shopifyPushProducts } from "@/admin/shopify";
import { buildPushItem, changedFields, productChanges, type ShopifyPushItem } from "@/admin/shopify-sync";
import { Badge, Button, Modal } from "@/admin/ui";
import { money } from "@/admin/format";

export function ShopifySyncPanel() {
  const data = useAdminData();
  const pullFn = useServerFn(shopifyPullProducts);
  const pushFn = useServerFn(shopifyPushProducts);
  const [busy, setBusy] = useState<"pull" | "push" | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [lastSync, setLastSync] = useState<string | null>(null);
  const [review, setReview] = useState<ShopifyPushItem[] | null>(null);
  const lock = useRef(false);
  const mounted = useRef(true);
  const reviewing = useRef(false);
  reviewing.current = review !== null;
  const importRef = useRef<(quiet?: boolean) => Promise<void>>(async () => undefined);
  const linked = data.products.filter(p => p.shopifyVariantId);
  const pending = linked.filter(p => productChanges(p).length || p.syncStatus === "pending" || p.syncStatus === "error");

  const pull = async (quiet = false) => {
    if (lock.current || reviewing.current || !adminStorageStatus.snapshot().ready || adminStorageStatus.snapshot().saving) return;
    lock.current = true;
    setBusy("pull");
    const generation = adminGeneration();
    try {
      const rows = await pullFn({ data: { adminKey: "" } });
      if (!mounted.current || generation !== adminGeneration()) return;
      const result = inventory.mergeShopify(rows);
      await waitForAdminWrites();
      if (!mounted.current || generation !== adminGeneration()) return;
      setLastSync(new Date().toLocaleTimeString()); setError(null);
      if (!quiet) toast.success(`Refreshed ${rows.length} Shopify variants · ${result.created} added · ${result.preserved} edits preserved`);
    } catch (e) {
      if (mounted.current && generation === adminGeneration()) {
        setError(e instanceof Error ? e.message : "Shopify refresh failed.");
        if (!quiet) toast.error("Could not refresh Shopify inventory.");
      }
    } finally { lock.current = false; if (mounted.current) setBusy(null); }
  };
  importRef.current = pull;
  useEffect(() => {
    mounted.current = true;
    void importRef.current(true);
    const timer = setInterval(() => { void importRef.current(true); }, 60000);
    return () => { mounted.current = false; clearInterval(timer); };
  }, []);

  const openReview = async () => {
    try {
      await waitForAdminWrites();
      setReview(pending.map(buildPushItem));
    } catch (e) { toast.error(e instanceof Error ? e.message : "Save changes before pushing."); }
  };
  const push = async () => {
    if (!review?.length || lock.current) return;
    const items = review;
    const generation = adminGeneration();
    lock.current = true; setBusy("push"); setError(null);
    let failures = 0;
    try {
      await waitForAdminWrites();
      for (let index = 0; index < items.length; index += 20) {
        if (!mounted.current || generation !== adminGeneration()) return;
        const chunk = items.slice(index, index + 20);
        const results = await pushFn({ data: { items: chunk, confirmed: true } });
        if (!mounted.current || generation !== adminGeneration()) return;
        for (const result of results) {
          const item = chunk.find(i => i.id === result.id);
          if (!item) continue;
          if (result.error) failures++;
          inventory.applyPushResult(item, result.row, result.error);
        }
        await waitForAdminWrites();
      }
      if (!mounted.current || generation !== adminGeneration()) return;
      setReview(null);
      if (failures) { setError(`${failures} variants need review. Successful fields are confirmed; only remaining changes will be retried.`); toast.error(`${failures} Shopify updates need review`); }
      else toast.success(`Confirmed ${items.length} variants with Shopify`);
    } catch (e) {
      if (mounted.current && generation === adminGeneration()) setError(e instanceof Error ? e.message : "Push failed. Refresh to verify Shopify before retrying.");
    } finally { lock.current = false; if (mounted.current) setBusy(null); }
  };

  return <section className="mb-6 border-y border-border py-5" aria-label="Shopify inventory sync">
    <div className="flex flex-wrap items-center justify-between gap-4">
      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-2"><ShoppingBag className="h-5 w-5 text-primary" /><h2 className="font-semibold">Shopify inventory</h2><Badge tone={error ? "warning" : "good"}>{error ? "Needs attention" : busy === "pull" ? "Refreshing" : `${linked.length} linked variants`}</Badge></div>
        <p className="mt-2 text-sm text-muted-foreground">{pending.length} awaiting review{lastSync ? ` · Refreshed ${lastSync}` : ""}{linked[0]?.shopifyLocationName ? ` · ${linked[0].shopifyLocationName}` : ""}</p>
      </div>
      <div className="flex flex-wrap gap-2">
        <Button disabled={busy !== null || review !== null} onClick={() => void pull()}><RefreshCw className="h-4 w-4" />Refresh Shopify</Button>
        <Button tone="primary" disabled={busy !== null || !pending.length} onClick={() => void openReview()}><ArrowUpFromLine className="h-4 w-4" />Review & push ({pending.length})</Button>
      </div>
    </div>
    {busy && <p className="mt-3 flex items-center gap-2 text-sm text-muted-foreground" role="status"><Loader2 className="h-4 w-4 animate-spin" />{busy === "pull" ? "Importing Shopify products…" : "Confirming updates with Shopify…"}</p>}
    {error && <p className="mt-3 break-words text-sm text-destructive" role="alert">{error}</p>}
    {review && <Modal open onOpenChange={open => { if (!open && !busy) setReview(null); }} title="Review live Shopify changes" description="Confirming updates your live Shopify store immediately. Prices, SKU and barcode are checked before writing; stock uses Shopify’s quantity comparison." wide>
      <div className="max-h-80 overflow-y-auto divide-y divide-border">
        {review.map(item => <div key={item.id} className="py-3"><p className="break-words font-medium">{data.products.find(p => p.id === item.id)?.name}</p><div className="mt-2 flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted-foreground">{changedFields(item.values, item.expected).map(key => <span key={key} className="break-all"><span className="capitalize">{key}</span>: {key === "price" ? money(item.expected.price) : String(item.expected[key] || "Empty")} → <strong className="text-foreground">{key === "price" ? money(item.values.price) : String(item.values[key] || "Empty")}</strong></span>)}</div></div>)}
      </div>
      <p className="text-sm text-muted-foreground">A Shopify sale or another edit may cause a conflict. No product deletion or publishing changes are included.</p>
      <div className="flex flex-wrap justify-end gap-2"><Button disabled={busy !== null} onClick={() => setReview(null)}>Cancel</Button><Button tone="primary" disabled={busy !== null} onClick={() => void push()}><ArrowUpFromLine className="h-4 w-4" />Confirm live updates</Button></div>
    </Modal>}
  </section>;
}