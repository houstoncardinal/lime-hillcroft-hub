import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState, type FormEvent } from "react";
import {
  AlertTriangle,
  Boxes,
  DollarSign,
  Download,
  History,
  Minus,
  Package,
  PackageX,
  Pencil,
  Plus,
  ScanLine,
  Search,
  ShoppingBag,
  Trash2,
  Upload,
} from "lucide-react";
import { toast } from "sonner";

import { download, parseCsv, toCsv } from "@/admin/csv";
import { ScannerModal, type NewProductDraft } from "@/admin/scanner/scanner";
import { useHandheldScanner } from "@/admin/scanner/use-handheld";
import { inventory, useAdminData, type ProductInput } from "@/admin/store";
import {
  CATEGORIES,
  CONDITIONS,
  LOCATIONS,
  MOVEMENT_REASONS,
  type Category,
  type MovementReason,
  type Product,
} from "@/admin/types";
import { money } from "@/admin/format";
import {
  Badge,
  Button,
  EmptyState,
  Field,
  GlassCard,
  Input,
  Modal,
  PageHeader,
  Select,
  StatTile,
  Table,
  Textarea,
  type Tone,
} from "@/admin/ui";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/admin/inventory")({
  component: Inventory,
});

const BY = "Manager";

type StockFilter = "all" | "low" | "out" | "shopify" | "financeable";

function stockState(p: Product): { tone: Tone; label: string } {
  if (p.quantity === 0) return { tone: "critical", label: "Out of stock" };
  if (p.quantity <= p.reorderPoint) return { tone: "warning", label: "Low stock" };
  return { tone: "good", label: "In stock" };
}

const SYNC: Record<Product["syncStatus"], { tone: Tone; label: string }> = {
  unlinked: { tone: "neutral", label: "Not linked" },
  synced: { tone: "good", label: "Synced" },
  pending: { tone: "info", label: "Needs push" },
  error: { tone: "critical", label: "Sync error" },
};

function Inventory() {
  const data = useAdminData();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<Category | "All">("All");
  const [filter, setFilter] = useState<StockFilter>("all");
  const [editing, setEditing] = useState<Product | "new" | null>(null);
  const [adjusting, setAdjusting] = useState<Product | null>(null);
  const [scanOpen, setScanOpen] = useState(false);
  const [scanCode, setScanCode] = useState<string | null>(null);
  const [draft, setDraft] = useState<NewProductDraft | null>(null);

  const openScanner = (code: string | null = null) => {
    setScanCode(code);
    setScanOpen(true);
  };
  // Handheld scanners work anywhere on this page; /admin/inventory?scan=1 opens the camera.
  useHandheldScanner((code) => openScanner(code), !scanOpen && !editing && !adjusting);
  useEffect(() => {
    if (new URLSearchParams(location.search).get("scan") === "1") openScanner();
  }, []);
  const [history, setHistory] = useState<Product | null>(null);
  const [selected, setSelected] = useState<string[]>([]);
  const fileRef = useRef<HTMLInputElement>(null);

  const products = data.products;
  const stats = useMemo(() => {
    const units = products.reduce((s, p) => s + p.quantity, 0);
    const retail = products.reduce((s, p) => s + p.price * p.quantity, 0);
    const cost = products.reduce((s, p) => s + p.cost * p.quantity, 0);
    const low = products.filter((p) => p.quantity <= p.reorderPoint).length;
    return { units, retail, cost, low };
  }, [products]);

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return products.filter((p) => {
      if (category !== "All" && p.category !== category) return false;
      if (filter === "low" && !(p.quantity > 0 && p.quantity <= p.reorderPoint)) return false;
      if (filter === "out" && p.quantity !== 0) return false;
      if (filter === "shopify" && !p.shopifyVariantId) return false;
      if (filter === "financeable" && !p.financeable) return false;
      if (!q) return true;
      return [p.name, p.sku, p.brand, p.barcode].some((v) => v.toLowerCase().includes(q));
    });
  }, [products, query, category, filter]);

  const allSelected = visible.length > 0 && visible.every((p) => selected.includes(p.id));

  const exportCsv = () => {
    download(
      `tic-inventory-${new Date().toISOString().slice(0, 10)}.csv`,
      toCsv(
        [
          "sku",
          "name",
          "brand",
          "category",
          "condition",
          "location",
          "cost",
          "price",
          "quantity",
          "reorderPoint",
          "barcode",
          "financeable",
        ],
        products.map((p) => [
          p.sku,
          p.name,
          p.brand,
          p.category,
          p.condition,
          p.location,
          (p.cost / 100).toFixed(2),
          (p.price / 100).toFixed(2),
          p.quantity,
          p.reorderPoint,
          p.barcode,
          p.financeable ? "yes" : "no",
        ]),
      ),
    );
  };

  const importCsv = async (file: File) => {
    const rows = parseCsv(await file.text());
    let created = 0;
    let updated = 0;
    for (const r of rows) {
      if (!r["name"] && !r["sku"]) continue;
      const existing = r["sku"] ? products.find((p) => p.sku === r["sku"]) : undefined;
      const cents = (v: string | undefined, fallback: number) =>
        v ? Math.round(Number(v.replace(/[$,]/g, "")) * 100) || 0 : fallback;
      const pick = <T extends string>(list: readonly T[], v: string | undefined, fallback: T) =>
        list.find((x) => x.toLowerCase() === (v ?? "").toLowerCase()) ?? fallback;
      inventory.save(
        {
          ...(existing ?? emptyProduct()),
          ...(existing ? { id: existing.id } : {}),
          sku: r["sku"] || existing?.sku || nextSku(products),
          name: r["name"] || existing?.name || "Untitled",
          brand: r["brand"] ?? existing?.brand ?? "",
          category: pick(CATEGORIES, r["category"], existing?.category ?? "Accessories"),
          condition: pick(CONDITIONS, r["condition"], existing?.condition ?? "New"),
          location: pick(LOCATIONS, r["location"], existing?.location ?? "Back stock"),
          cost: cents(r["cost"], existing?.cost ?? 0),
          price: cents(r["price"], existing?.price ?? 0),
          quantity: r["quantity"]
            ? Math.max(0, Number(r["quantity"]) || 0)
            : (existing?.quantity ?? 0),
          reorderPoint: r["reorderpoint"]
            ? Number(r["reorderpoint"]) || 0
            : (existing?.reorderPoint ?? 2),
          barcode: r["barcode"] ?? existing?.barcode ?? "",
          financeable: r["financeable"]
            ? /^(y|yes|true|1)$/i.test(r["financeable"])
            : (existing?.financeable ?? false),
        },
        BY,
      );
      if (existing) updated++;
      else created++;
    }
    toast.success(`Imported ${created} new and updated ${updated} products`);
  };

  return (
    <>
      <PageHeader
        title="Inventory"
        description="Every phone, console, laptop and accessory in the store. Adjust stock in one click, scan to find items, and keep Shopify in sync."
        actions={
          <>
            <Button tone="primary" onClick={() => openScanner()}>
              <ScanLine className="h-4 w-4" /> Scan
            </Button>
            <Button onClick={exportCsv}>
              <Download className="h-4 w-4" /> Export
            </Button>
            <Button onClick={() => fileRef.current?.click()}>
              <Upload className="h-4 w-4" /> Import CSV
            </Button>
            <input
              ref={fileRef}
              type="file"
              accept=".csv,text/csv"
              className="hidden"
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (f) void importCsv(f);
                e.target.value = "";
              }}
            />
            <Button onClick={() => setEditing("new")}>
              <Plus className="h-4 w-4" /> Add product
            </Button>
          </>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatTile
          label="Products"
          value={products.length.toLocaleString()}
          icon={Package}
          hint={`${stats.units.toLocaleString()} units on hand`}
        />
        <StatTile
          label="Retail value"
          value={money(stats.retail)}
          icon={DollarSign}
          hint="Price × quantity on hand"
        />
        <StatTile
          label="Potential margin"
          value={money(stats.retail - stats.cost)}
          icon={Boxes}
          hint={
            stats.retail
              ? `${Math.round(((stats.retail - stats.cost) / stats.retail) * 100)}% of retail value`
              : "Add prices to see margin"
          }
        />
        <StatTile
          label="Low or out of stock"
          value={stats.low.toString()}
          icon={AlertTriangle}
          hint="At or below reorder point"
        />
      </div>

      <GlassCard className="mt-6">
        <div className="mb-5 flex flex-wrap items-center gap-3">
          <div className="relative min-w-[220px] flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search name, SKU, brand or barcode"
              className="pl-9"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          <Select
            aria-label="Category"
            className="w-auto"
            value={category}
            onChange={(e) => setCategory(e.target.value as Category | "All")}
          >
            <option value="All">All categories</option>
            {CATEGORIES.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </Select>
          <div className="flex flex-wrap gap-1 rounded-xl bg-white/5 p-1">
            {(
              [
                ["all", "All"],
                ["low", "Low"],
                ["out", "Out"],
                ["financeable", "Financeable"],
                ["shopify", "On Shopify"],
              ] as [StockFilter, string][]
            ).map(([key, label]) => (
              <button
                key={key}
                type="button"
                onClick={() => setFilter(key)}
                className={cn(
                  "cursor-pointer rounded-lg px-3 py-1.5 text-xs font-medium transition",
                  filter === key
                    ? "bg-white/12 text-foreground"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {selected.length > 0 && (
          <div className="mb-4 flex items-center justify-between rounded-xl bg-white/6 px-4 py-2 text-sm">
            <span>{selected.length} selected</span>
            <Button
              tone="danger"
              size="sm"
              onClick={() => {
                if (!confirm(`Delete ${selected.length} products? This can't be undone.`)) return;
                inventory.remove(selected);
                setSelected([]);
                toast.success("Products deleted");
              }}
            >
              <Trash2 className="h-3.5 w-3.5" /> Delete
            </Button>
          </div>
        )}

        {visible.length === 0 ? (
          <EmptyState
            icon={PackageX}
            title={products.length ? "No products match" : "No products yet"}
            body={
              products.length
                ? "Try a different search or filter."
                : "Add your first product or import a CSV from your current system."
            }
            action={
              !products.length && (
                <Button tone="primary" onClick={() => setEditing("new")}>
                  <Plus className="h-4 w-4" /> Add product
                </Button>
              )
            }
          />
        ) : (
          <Table>
            <thead>
              <tr>
                <th className="w-10">
                  <input
                    type="checkbox"
                    aria-label="Select all"
                    className="accent-[var(--primary)]"
                    checked={allSelected}
                    onChange={() => setSelected(allSelected ? [] : visible.map((p) => p.id))}
                  />
                </th>
                <th>Product</th>
                <th>Category</th>
                <th className="text-right!">Price</th>
                <th className="text-right!">Margin</th>
                <th className="text-center!">Quantity</th>
                <th>Status</th>
                <th>Shopify</th>
                <th className="sr-only">Actions</th>
              </tr>
            </thead>
            <tbody>
              {visible.map((p) => {
                const s = stockState(p);
                const margin = p.price ? Math.round(((p.price - p.cost) / p.price) * 100) : null;
                return (
                  <tr key={p.id} className="transition hover:bg-white/3">
                    <td>
                      <input
                        type="checkbox"
                        aria-label={`Select ${p.name}`}
                        className="accent-[var(--primary)]"
                        checked={selected.includes(p.id)}
                        onChange={() =>
                          setSelected((sel) =>
                            sel.includes(p.id) ? sel.filter((x) => x !== p.id) : [...sel, p.id],
                          )
                        }
                      />
                    </td>
                    <td className="min-w-72">
                      <button
                        type="button"
                        className="cursor-pointer text-left"
                        onClick={() => setEditing(p)}
                      >
                        <span className="block font-medium hover:text-primary">{p.name}</span>
                        <span className="block text-xs text-muted-foreground">
                          {p.sku} · {p.brand || "—"} · {p.condition}
                          {p.financeable && " · Financeable"}
                        </span>
                      </button>
                    </td>
                    <td className="text-muted-foreground">{p.category}</td>
                    <td className="tabular text-right">{p.price ? money(p.price) : "—"}</td>
                    <td className="tabular text-right text-muted-foreground">
                      {margin == null ? "—" : `${margin}%`}
                    </td>
                    <td>
                      <div className="flex items-center justify-center gap-1">
                        <button
                          type="button"
                          aria-label={`Remove one ${p.name}`}
                          disabled={p.quantity === 0}
                          onClick={() => inventory.adjust(p.id, -1, "Sold", "", BY)}
                          className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-lg bg-white/6 transition hover:bg-white/12 disabled:opacity-30"
                        >
                          <Minus className="h-3.5 w-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => setAdjusting(p)}
                          className="tabular min-w-10 cursor-pointer rounded-lg px-2 py-1 text-center font-semibold hover:bg-white/8"
                          title="Adjust stock"
                        >
                          {p.quantity}
                        </button>
                        <button
                          type="button"
                          aria-label={`Add one ${p.name}`}
                          onClick={() => inventory.adjust(p.id, 1, "Received", "", BY)}
                          className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-lg bg-white/6 transition hover:bg-white/12"
                        >
                          <Plus className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </td>
                    <td>
                      <Badge tone={s.tone}>{s.label}</Badge>
                    </td>
                    <td>
                      <Badge tone={SYNC[p.syncStatus].tone}>{SYNC[p.syncStatus].label}</Badge>
                    </td>
                    <td>
                      <div className="flex justify-end gap-1">
                        <Button
                          tone="ghost"
                          size="sm"
                          aria-label="Stock history"
                          onClick={() => setHistory(p)}
                        >
                          <History className="h-4 w-4" />
                        </Button>
                        <Button
                          tone="ghost"
                          size="sm"
                          aria-label="Edit product"
                          onClick={() => setEditing(p)}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        )}
      </GlassCard>

      {editing && (
        <ProductEditor
          product={editing === "new" ? null : editing}
          sku={nextSku(products)}
          draft={editing === "new" ? draft : null}
          onClose={() => {
            setEditing(null);
            setDraft(null);
          }}
        />
      )}
      {adjusting && <AdjustModal product={adjusting} onClose={() => setAdjusting(null)} />}
      <ScannerModal
        open={scanOpen}
        initialCode={scanCode}
        onClose={() => setScanOpen(false)}
        onCreate={(d) => {
          setScanOpen(false);
          setDraft(d);
          setEditing("new");
        }}
        onEdit={(p) => {
          setScanOpen(false);
          setEditing(p);
        }}
        onAdjust={(p) => {
          setScanOpen(false);
          setAdjusting(p);
        }}
      />
      {history && <HistoryModal product={history} onClose={() => setHistory(null)} />}
    </>
  );
}

function emptyProduct(): ProductInput {
  return {
    sku: "",
    name: "",
    brand: "",
    category: "Phones",
    condition: "New",
    location: "Display case",
    cost: 0,
    price: 0,
    quantity: 0,
    reorderPoint: 2,
    barcode: "",
    notes: "",
    financeable: false,
    shopifyProductId: null,
    shopifyVariantId: null,
    shopifyInventoryItemId: null,
  };
}

function nextSku(products: Product[]) {
  const max = products.reduce((m, p) => {
    const n = Number(/^TIC-(\d+)$/.exec(p.sku)?.[1] ?? 0);
    return Math.max(m, n);
  }, 1000);
  return `TIC-${max + 1}`;
}

function ProductEditor({
  product,
  sku,
  draft,
  onClose,
}: {
  product: Product | null;
  sku: string;
  draft: NewProductDraft | null;
  onClose: () => void;
}) {
  const [form, setForm] = useState<ProductInput>(() =>
    product ? { ...product } : { ...emptyProduct(), sku, ...(draft ?? {}) },
  );
  const set = <K extends keyof ProductInput>(k: K, v: ProductInput[K]) =>
    setForm((f) => ({ ...f, [k]: v }));
  const dollars = (cents: number) => (cents ? (cents / 100).toFixed(2) : "");
  const toCents = (v: string) => Math.round((Number(v) || 0) * 100);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!form.name.trim()) return void toast.error("Give the product a name");
    inventory.save({ ...form, ...(product ? { id: product.id } : {}) }, BY);
    toast.success(product ? "Product updated" : "Product added");
    onClose();
  };

  return (
    <Modal
      open
      onOpenChange={(o) => !o && onClose()}
      title={product ? "Edit product" : "Add product"}
      description={
        product
          ? `${product.sku} · last updated ${new Date(product.updatedAt).toLocaleString()}`
          : "New items get the next TIC SKU automatically."
      }
      wide
    >
      <form onSubmit={submit} className="grid gap-4 sm:grid-cols-2">
        <Field label="Product name" className="sm:col-span-2">
          <Input
            autoFocus
            value={form.name}
            onChange={(e) => set("name", e.target.value)}
            placeholder="iPhone 17 Pro 256GB Cosmic Orange"
          />
        </Field>
        <Field label="Brand">
          <Input
            value={form.brand}
            onChange={(e) => set("brand", e.target.value)}
            placeholder="Apple"
          />
        </Field>
        <Field label="SKU">
          <Input value={form.sku} onChange={(e) => set("sku", e.target.value)} />
        </Field>
        <Field label="Category">
          <Select
            value={form.category}
            onChange={(e) => set("category", e.target.value as ProductInput["category"])}
          >
            {CATEGORIES.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </Select>
        </Field>
        <Field label="Condition">
          <Select
            value={form.condition}
            onChange={(e) => set("condition", e.target.value as ProductInput["condition"])}
          >
            {CONDITIONS.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </Select>
        </Field>
        <Field label="Cost (what you paid)">
          <Input
            inputMode="decimal"
            defaultValue={dollars(form.cost)}
            onChange={(e) => set("cost", toCents(e.target.value))}
            placeholder="0.00"
          />
        </Field>
        <Field label="Retail price">
          <Input
            inputMode="decimal"
            defaultValue={dollars(form.price)}
            onChange={(e) => set("price", toCents(e.target.value))}
            placeholder="0.00"
          />
        </Field>
        <Field
          label="Quantity on hand"
          hint={product ? "Changes are logged as an adjustment." : undefined}
        >
          <Input
            type="number"
            min={0}
            value={form.quantity}
            onChange={(e) => set("quantity", Math.max(0, Number(e.target.value) || 0))}
          />
        </Field>
        <Field label="Reorder point" hint="Flag as low stock at or below this.">
          <Input
            type="number"
            min={0}
            value={form.reorderPoint}
            onChange={(e) => set("reorderPoint", Math.max(0, Number(e.target.value) || 0))}
          />
        </Field>
        <Field label="Location">
          <Select
            value={form.location}
            onChange={(e) => set("location", e.target.value as ProductInput["location"])}
          >
            {LOCATIONS.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </Select>
        </Field>
        <Field label="Barcode / UPC">
          <Input
            value={form.barcode}
            onChange={(e) => set("barcode", e.target.value)}
            placeholder="Scan or type"
          />
        </Field>
        <Field label="Notes" className="sm:col-span-2">
          <Textarea
            value={form.notes}
            onChange={(e) => set("notes", e.target.value)}
            placeholder="IMEI, color, storage, supplier…"
          />
        </Field>
        <label className="flex cursor-pointer items-center gap-3 rounded-xl bg-white/5 px-4 py-3 text-sm sm:col-span-2">
          <input
            type="checkbox"
            className="h-4 w-4 accent-[var(--primary)]"
            checked={form.financeable}
            onChange={(e) => set("financeable", e.target.checked)}
          />
          Eligible for financing / lease-to-own
        </label>
        <div className="flex justify-end gap-2 sm:col-span-2">
          <Button onClick={onClose}>Cancel</Button>
          <Button tone="primary" type="submit">
            {product ? "Save changes" : "Add product"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}

function AdjustModal({ product, onClose }: { product: Product; onClose: () => void }) {
  const [mode, setMode] = useState<"add" | "remove" | "set">("remove");
  const [amount, setAmount] = useState(1);
  const [reason, setReason] = useState<MovementReason>("Sold");
  const [note, setNote] = useState("");

  const delta = mode === "set" ? amount - product.quantity : mode === "add" ? amount : -amount;
  const result = Math.max(0, product.quantity + delta);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    inventory.adjust(product.id, delta, mode === "set" ? "Adjusted" : reason, note, BY);
    toast.success(`${product.name}: ${product.quantity} → ${result}`);
    onClose();
  };

  return (
    <Modal
      open
      onOpenChange={(o) => !o && onClose()}
      title="Adjust stock"
      description={`${product.name} · ${product.quantity} on hand`}
    >
      <form onSubmit={submit} className="space-y-4">
        <div className="grid grid-cols-3 gap-1 rounded-xl bg-white/5 p-1">
          {(
            [
              ["remove", "Remove", "Sold"],
              ["add", "Add", "Received"],
              ["set", "Set count", "Adjusted"],
            ] as const
          ).map(([m, label, r]) => (
            <button
              key={m}
              type="button"
              onClick={() => {
                setMode(m);
                setReason(r);
                setAmount(m === "set" ? product.quantity : 1);
              }}
              className={cn(
                "cursor-pointer rounded-lg py-2 text-sm font-medium transition",
                mode === m ? "bg-white/12" : "text-muted-foreground hover:text-foreground",
              )}
            >
              {label}
            </button>
          ))}
        </div>
        <div className="flex items-center justify-center gap-3">
          <Button
            size="lg"
            onClick={() => setAmount((a) => Math.max(0, a - 1))}
            aria-label="Decrease"
          >
            <Minus className="h-5 w-5" />
          </Button>
          <Input
            type="number"
            min={0}
            className="tabular h-14 w-28 text-center text-2xl font-semibold"
            value={amount}
            onChange={(e) => setAmount(Math.max(0, Number(e.target.value) || 0))}
          />
          <Button size="lg" onClick={() => setAmount((a) => a + 1)} aria-label="Increase">
            <Plus className="h-5 w-5" />
          </Button>
        </div>
        <p className="text-center text-sm text-muted-foreground">
          New quantity: <span className="tabular font-semibold text-foreground">{result}</span>
        </p>
        {mode !== "set" && (
          <Field label="Reason">
            <Select value={reason} onChange={(e) => setReason(e.target.value as MovementReason)}>
              {MOVEMENT_REASONS.filter((r) => r !== "Shopify sync").map((r) => (
                <option key={r}>{r}</option>
              ))}
            </Select>
          </Field>
        )}
        <Field label="Note (optional)">
          <Input
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Invoice #, customer, IMEI…"
          />
        </Field>
        <div className="flex justify-end gap-2">
          <Button onClick={onClose}>Cancel</Button>
          <Button tone="primary" type="submit" disabled={delta === 0}>
            Save
          </Button>
        </div>
      </form>
    </Modal>
  );
}

function HistoryModal({ product, onClose }: { product: Product; onClose: () => void }) {
  const data = useAdminData();
  const moves = data.movements.filter((m) => m.productId === product.id).slice(0, 50);
  return (
    <Modal
      open
      onOpenChange={(o) => !o && onClose()}
      title="Stock history"
      description={product.name}
    >
      {moves.length === 0 ? (
        <p className="py-6 text-center text-sm text-muted-foreground">
          No stock changes recorded yet.
        </p>
      ) : (
        <ul className="divide-y divide-white/6">
          {moves.map((m) => (
            <li key={m.id} className="flex items-center justify-between gap-4 py-3 text-sm">
              <span>
                <span className="font-medium">{m.reason}</span>
                {m.note && <span className="text-muted-foreground"> · {m.note}</span>}
                <span className="block text-xs text-muted-foreground">
                  {new Date(m.at).toLocaleString()} · {m.by}
                </span>
              </span>
              <span
                className={cn(
                  "tabular font-semibold",
                  m.delta > 0 ? "text-emerald-300" : "text-red-300",
                )}
              >
                {m.delta > 0 ? "+" : ""}
                {m.delta}
              </span>
            </li>
          ))}
        </ul>
      )}
      {product.shopifyVariantId && (
        <p className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
          <ShoppingBag className="h-3.5 w-3.5" /> Linked to Shopify variant{" "}
          {product.shopifyVariantId.split("/").pop()}
        </p>
      )}
    </Modal>
  );
}
