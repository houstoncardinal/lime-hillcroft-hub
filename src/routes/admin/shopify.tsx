import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  ArrowDownToLine,
  ArrowUpFromLine,
  CheckCircle2,
  Circle,
  KeyRound,
  Link2,
  Loader2,
  RefreshCw,
  ShoppingBag,
} from "lucide-react";
import { toast } from "sonner";

import { useAdminKey } from "@/admin/hooks";
import { shopifyPullProducts, shopifyPushQuantities, shopifyStatus } from "@/admin/shopify";
import { inventory, useAdminData } from "@/admin/store";
import {
  Badge,
  Button,
  CardTitle,
  Field,
  GlassCard,
  Input,
  PageHeader,
  StatTile,
} from "@/admin/ui";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/admin/shopify")({
  component: Shopify,
});

type Status = Awaited<ReturnType<typeof shopifyStatus>>;

function Shopify() {
  const data = useAdminData();
  const [adminKey, setAdminKey] = useAdminKey();
  const [keyDraft, setKeyDraft] = useState(adminKey);
  const [status, setStatus] = useState<Status | null>(null);
  const [checking, setChecking] = useState(false);
  const [busy, setBusy] = useState<"pull" | "push" | null>(null);

  const check = async () => {
    setChecking(true);
    try {
      setStatus(await shopifyStatus({ data: { adminKey } }));
    } catch (e) {
      setStatus({
        serverKeySet: false,
        configured: false,
        connected: false,
        domain: "",
        version: "",
        shopName: null,
        error: (e as Error).message,
      });
    } finally {
      setChecking(false);
    }
  };

  useEffect(() => {
    void check();
    // Re-check whenever the admin key changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [adminKey]);

  const linked = data.products.filter((p) => p.shopifyVariantId);
  const pending = linked.filter((p) => p.syncStatus === "pending" || p.syncStatus === "error");

  const pull = async () => {
    setBusy("pull");
    try {
      const rows = await shopifyPullProducts({ data: { adminKey } });
      const r = inventory.mergeShopify(rows);
      toast.success(
        `Imported ${rows.length} variants · ${r.linked} linked by SKU, ${r.created} new`,
      );
    } catch (e) {
      toast.error((e as Error).message);
    } finally {
      setBusy(null);
    }
  };

  const push = async () => {
    setBusy("push");
    const items = pending.filter((p) => p.shopifyInventoryItemId);
    try {
      await shopifyPushQuantities({
        data: {
          adminKey,
          items: items.map((p) => ({
            inventoryItemId: p.shopifyInventoryItemId ?? "",
            quantity: p.quantity,
          })),
        },
      });
      inventory.markSynced(
        items.map((p) => p.id),
        "synced",
      );
      toast.success(`Updated ${items.length} quantities on Shopify`);
    } catch (e) {
      inventory.markSynced(
        items.map((p) => p.id),
        "error",
      );
      toast.error((e as Error).message);
    } finally {
      setBusy(null);
    }
  };

  const steps = [
    {
      done: Boolean(status?.configured),
      title: "Create a Shopify custom app",
      body: "Shopify admin → Settings → Apps and sales channels → Develop apps. Give it read & write access to Products and Inventory, then install it and copy the Admin API access token.",
    },
    {
      done: Boolean(status?.configured),
      title: "Add the server environment variables",
      body: "SHOPIFY_STORE_DOMAIN (your-store.myshopify.com) and SHOPIFY_ADMIN_ACCESS_TOKEN. Add them as secrets in your hosting — never in the code.",
    },
    {
      done: Boolean(status?.serverKeySet),
      title: "Set ADMIN_API_KEY on the server",
      body: "Any long random string. It stops anyone else from calling the Shopify sync endpoints.",
    },
    {
      done: Boolean(status?.connected),
      title: "Enter the same admin key below",
      body: "It's kept for this browser tab only.",
    },
  ];

  return (
    <>
      <PageHeader
        title="Shopify"
        description="Link store inventory to your Shopify catalog. Products match by SKU; quantities you change here can be pushed to Shopify in one click."
        actions={
          <Button onClick={() => void check()} disabled={checking}>
            <RefreshCw className={cn("h-4 w-4", checking && "animate-spin")} /> Check connection
          </Button>
        }
      />

      <div className="grid gap-4 sm:grid-cols-3">
        <StatTile
          label="Connection"
          value={
            status?.connected ? "Connected" : status?.configured ? "Configured" : "Not connected"
          }
          icon={ShoppingBag}
          hint={status?.shopName ?? (status?.domain || "Waiting for credentials")}
        />
        <StatTile
          label="Linked products"
          value={`${linked.length} / ${data.products.length}`}
          icon={Link2}
          hint="Matched to a Shopify variant"
        />
        <StatTile
          label="Waiting to push"
          value={pending.length.toString()}
          icon={ArrowUpFromLine}
          hint="Changed here since the last sync"
        />
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-[1.2fr_1fr]">
        <GlassCard>
          <CardTitle
            title="Sync"
            description={
              status?.connected
                ? `Connected to ${status.shopName} (API ${status.version})`
                : "Finish setup to enable syncing."
            }
            actions={
              status?.connected ? (
                <Badge tone="good">Live</Badge>
              ) : (
                <Badge tone="warning">Setup needed</Badge>
              )
            }
          />
          {status?.error && status.configured && (
            <p className="mb-4 rounded-xl bg-red-500/10 px-4 py-3 text-sm text-red-200">
              {status.error}
            </p>
          )}
          <div className="grid gap-3 sm:grid-cols-2">
            <button
              type="button"
              disabled={!status?.connected || busy !== null}
              onClick={() => void pull()}
              className="glass cursor-pointer rounded-2xl p-5 text-left transition hover:bg-white/8 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {busy === "pull" ? (
                <Loader2 className="h-5 w-5 animate-spin text-primary" />
              ) : (
                <ArrowDownToLine className="h-5 w-5 text-primary" />
              )}
              <p className="mt-3 font-semibold">Import from Shopify</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Pull products and quantities. Matches by SKU and adds anything new.
              </p>
            </button>
            <button
              type="button"
              disabled={!status?.connected || busy !== null || pending.length === 0}
              onClick={() => void push()}
              className="glass cursor-pointer rounded-2xl p-5 text-left transition hover:bg-white/8 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {busy === "push" ? (
                <Loader2 className="h-5 w-5 animate-spin text-primary" />
              ) : (
                <ArrowUpFromLine className="h-5 w-5 text-primary" />
              )}
              <p className="mt-3 font-semibold">Push {pending.length || ""} quantities</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Send stock counts changed in the store to Shopify.
              </p>
            </button>
          </div>

          {pending.length > 0 && (
            <ul className="mt-6 divide-y divide-white/6">
              {pending.slice(0, 8).map((p) => (
                <li key={p.id} className="flex items-center justify-between py-2.5 text-sm">
                  <span className="truncate">{p.name}</span>
                  <span className="tabular text-muted-foreground">{p.quantity} on hand</span>
                </li>
              ))}
            </ul>
          )}
        </GlassCard>

        <GlassCard>
          <CardTitle title="Setup" description="One-time, about 10 minutes" />
          <ol className="space-y-4">
            {steps.map((s, i) => (
              <li key={s.title} className="flex gap-3">
                {s.done ? (
                  <CheckCircle2
                    className="mt-0.5 h-5 w-5 shrink-0 text-emerald-300"
                    aria-label="Done"
                  />
                ) : (
                  <Circle
                    className="mt-0.5 h-5 w-5 shrink-0 text-muted-foreground"
                    aria-label="To do"
                  />
                )}
                <div>
                  <p className="text-sm font-medium">
                    {i + 1}. {s.title}
                  </p>
                  <p className="mt-0.5 text-sm text-muted-foreground">{s.body}</p>
                </div>
              </li>
            ))}
          </ol>
          <form
            className="mt-6 flex items-end gap-2"
            onSubmit={(e) => {
              e.preventDefault();
              setAdminKey(keyDraft.trim());
              toast.success(keyDraft.trim() ? "Admin key saved for this tab" : "Admin key cleared");
            }}
          >
            <Field label="Admin API key" className="flex-1">
              <Input
                type="password"
                autoComplete="off"
                value={keyDraft}
                onChange={(e) => setKeyDraft(e.target.value)}
              />
            </Field>
            <Button tone="primary" type="submit">
              <KeyRound className="h-4 w-4" /> Save
            </Button>
          </form>
        </GlassCard>
      </div>
    </>
  );
}
