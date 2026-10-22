import { adminHead } from "@/admin/heads";
import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { RefreshCw, ShoppingBag } from "lucide-react";
import { shopifyStatus } from "@/admin/shopify";
import { ShopifySyncPanel } from "@/admin/shopify-sync-panel";
import { Badge, Button, PageHeader } from "@/admin/ui";

export const Route = createFileRoute("/admin/shopify")({
  head: () => adminHead("Shopify connection"),
  component: Shopify,
});
function Shopify() {
  const statusFn = useServerFn(shopifyStatus);
  const [status, setStatus] = useState<Awaited<ReturnType<typeof shopifyStatus>> | null>(null);
  const [checking, setChecking] = useState(false);
  const check = async () => {
    setChecking(true);
    try { setStatus(await statusFn({ data: { adminKey: "" } })); }
    finally { setChecking(false); }
  };
  useEffect(() => { void check().catch(() => undefined); }, []);
  return <>
    <PageHeader title="Shopify sync" description="Manage Shopify prices, stock, SKU and barcodes from inventory." actions={<Button disabled={checking} onClick={() => void check().catch(() => undefined)}><RefreshCw className="h-4 w-4" />Check connection</Button>} />
    <div className="mb-6 flex flex-wrap items-center gap-3"><ShoppingBag className="h-5 w-5 text-primary" /><span className="font-medium">{status?.shopName ?? status?.domain ?? "Shopify"}</span><Badge tone={status?.connected ? "good" : "warning"}>{checking ? "Checking" : status?.connected ? "Connected" : "Authorization needed"}</Badge></div>
    {status?.error && <p className="mb-5 break-words text-sm text-destructive" role="alert">{status.error}</p>}
    <ShopifySyncPanel />
    <Link to="/admin/inventory" className="text-sm font-medium text-primary underline underline-offset-4">Open inventory editor</Link>
  </>;
}
