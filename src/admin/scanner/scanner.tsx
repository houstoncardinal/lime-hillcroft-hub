import { useEffect, useRef, useState, type FormEvent } from "react";
import {
  CameraOff,
  ClipboardCheck,
  Flashlight,
  Link2,
  Loader2,
  Minus,
  PackagePlus,
  Pencil,
  Plus,
  ScanLine,
  Search,
  SlidersHorizontal,
  Undo2,
  X,
} from "lucide-react";
import { toast } from "sonner";

import { money } from "@/admin/format";
import { createDetector, feedback, findByCode } from "@/admin/scanner/detector";
import { lookupBarcode, type UpcInfo } from "@/admin/scanner/lookup";
import { inventory, useAdminData } from "@/admin/store";
import type { Product } from "@/admin/types";
import { Badge, Button, Input } from "@/admin/ui";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

const BY = "Scanner";

export type ScanMode = "lookup" | "receive" | "sell" | "count";
type CameraState = "starting" | "on" | "denied" | "unavailable";

const MODES: { id: ScanMode; label: string; hint: string; icon: typeof Search }[] = [
  { id: "lookup", label: "Look up", hint: "Scan to see stock, price and actions.", icon: Search },
  { id: "receive", label: "Receive +1", hint: "Every scan adds one to stock.", icon: Plus },
  { id: "sell", label: "Sell −1", hint: "Every scan removes one from stock.", icon: Minus },
  {
    id: "count",
    label: "Count",
    hint: "Scan the whole shelf, then apply the count.",
    icon: ClipboardCheck,
  },
];

type Result =
  | { kind: "found"; code: string; productId: string; note: string | null; warn?: boolean }
  | { kind: "unknown"; code: string; info: UpcInfo | undefined };

type LogEntry = {
  id: string;
  productId: string;
  name: string;
  delta: number;
  mode: ScanMode;
  at: number;
  undone: boolean;
};

export type NewProductDraft = { barcode: string; name: string; brand: string };

export function ScannerModal({
  open,
  initialCode,
  onClose,
  onCreate,
  onEdit,
  onAdjust,
}: {
  open: boolean;
  initialCode?: string | null;
  onClose: () => void;
  onCreate: (draft: NewProductDraft) => void;
  onEdit: (p: Product) => void;
  onAdjust: (p: Product) => void;
}) {
  const data = useAdminData();
  const [mode, setMode] = useState<ScanMode>("lookup");
  const [camera, setCamera] = useState<CameraState>("starting");
  const [torch, setTorch] = useState<{ available: boolean; on: boolean }>({
    available: false,
    on: false,
  });
  const [result, setResult] = useState<Result | null>(null);
  const [log, setLog] = useState<LogEntry[]>([]);
  const [counts, setCounts] = useState<Record<string, number>>({});
  const [flash, setFlash] = useState<"ok" | "warn" | null>(null);
  const [manual, setManual] = useState("");
  const [linking, setLinking] = useState(false);
  const [linkQuery, setLinkQuery] = useState("");

  const videoRef = useRef<HTMLVideoElement>(null);
  const trackRef = useRef<MediaStreamTrack | null>(null);
  const lastRef = useRef({ code: "", at: 0 });
  const pausedRef = useRef(false);
  pausedRef.current = linking;

  const signal = (kind: "ok" | "warn") => {
    feedback(kind);
    setFlash(kind);
    setTimeout(() => setFlash(null), 350);
  };

  const handle = (raw: string, force = false) => {
    const code = raw.trim();
    if (!code) return;
    const now = Date.now();
    if (!force && lastRef.current.code === code && now - lastRef.current.at < 2500) return;
    lastRef.current = { code, at: now };

    const product = findByCode(data.products, code);
    if (!product) {
      signal("warn");
      setLinking(false);
      setResult({ kind: "unknown", code, info: undefined });
      if (/^\d{8,14}$/.test(code))
        void lookupBarcode({ data: { code } })
          .then((info) =>
            setResult((r) => (r?.kind === "unknown" && r.code === code ? { ...r, info } : r)),
          )
          .catch(() =>
            setResult((r) => (r?.kind === "unknown" && r.code === code ? { ...r, info: null } : r)),
          );
      else setResult({ kind: "unknown", code, info: null });
      return;
    }

    const addLog = (delta: number) =>
      setLog((l) =>
        [
          {
            id: crypto.randomUUID(),
            productId: product.id,
            name: product.name,
            delta,
            mode,
            at: now,
            undone: false,
          },
          ...l,
        ].slice(0, 100),
      );

    if (mode === "lookup") {
      signal("ok");
      setResult({ kind: "found", code, productId: product.id, note: null });
    } else if (mode === "receive") {
      inventory.adjust(product.id, 1, "Received", "Scanned in", BY);
      addLog(1);
      signal("ok");
      setResult({ kind: "found", code, productId: product.id, note: "+1 received" });
    } else if (mode === "sell") {
      if (product.quantity === 0) {
        signal("warn");
        setResult({
          kind: "found",
          code,
          productId: product.id,
          note: "Already out of stock — nothing removed",
          warn: true,
        });
        return;
      }
      inventory.adjust(product.id, -1, "Sold", "Scanned out", BY);
      addLog(-1);
      signal("ok");
      setResult({ kind: "found", code, productId: product.id, note: "−1 sold" });
    } else {
      setCounts((c) => ({ ...c, [product.id]: (c[product.id] ?? 0) + 1 }));
      addLog(1);
      signal("ok");
      setResult({ kind: "found", code, productId: product.id, note: "Counted" });
    }
  };
  const handleRef = useRef(handle);
  handleRef.current = handle;

  // Camera + detection loop.
  useEffect(() => {
    if (!open) return;
    let stopped = false;
    let stream: MediaStream | null = null;
    // Each opening is a fresh session in safe "Look up" mode.
    setMode("lookup");
    setResult(null);
    setLog([]);
    setLinking(false);
    lastRef.current = { code: "", at: 0 };
    setCamera("starting");
    (async () => {
      if (!navigator.mediaDevices?.getUserMedia) {
        setCamera("unavailable");
        return;
      }
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: { ideal: "environment" },
            width: { ideal: 1280 },
            height: { ideal: 720 },
          },
          audio: false,
        });
      } catch (e) {
        setCamera((e as DOMException).name === "NotAllowedError" ? "denied" : "unavailable");
        return;
      }
      if (stopped) return stream.getTracks().forEach((t) => t.stop());
      const video = videoRef.current;
      if (!video) return;
      video.srcObject = stream;
      await video.play().catch(() => undefined);
      const track = stream.getVideoTracks()[0] ?? null;
      trackRef.current = track;
      const caps = (track?.getCapabilities?.() ?? {}) as { torch?: boolean };
      setTorch({ available: Boolean(caps.torch), on: false });
      setCamera("on");

      const detector = await createDetector();
      const tick = async () => {
        if (stopped) return;
        if (!pausedRef.current && video.readyState >= 2) {
          try {
            const [hit] = await detector.detect(video);
            if (hit?.rawValue) handleRef.current(hit.rawValue);
          } catch {
            // Frame not ready; try again.
          }
        }
        setTimeout(() => requestAnimationFrame(() => void tick()), 120);
      };
      void tick();
    })();
    return () => {
      stopped = true;
      stream?.getTracks().forEach((t) => t.stop());
      trackRef.current = null;
    };
  }, [open]);

  // A code handed in from a handheld scanner when the scanner was opened.
  useEffect(() => {
    if (open && initialCode) handleRef.current(initialCode, true);
  }, [open, initialCode]);

  const toggleTorch = async () => {
    const on = !torch.on;
    try {
      await trackRef.current?.applyConstraints({
        advanced: [{ torch: on } as MediaTrackConstraintSet],
      });
      setTorch((t) => ({ ...t, on }));
    } catch {
      toast.error("Flashlight isn't available on this camera");
    }
  };

  const undo = (entry: LogEntry) => {
    if (entry.undone) return;
    if (entry.mode === "count")
      setCounts((c) => {
        const next = { ...c, [entry.productId]: (c[entry.productId] ?? 1) - 1 };
        if ((next[entry.productId] ?? 0) <= 0) delete next[entry.productId];
        return next;
      });
    else inventory.adjust(entry.productId, -entry.delta, "Adjusted", "Undo scan", BY);
    setLog((l) => l.map((x) => (x.id === entry.id ? { ...x, undone: true } : x)));
  };

  const submitManual = (e: FormEvent) => {
    e.preventDefault();
    handle(manual, true);
    setManual("");
  };

  const countedIds = Object.keys(counts);
  const product =
    result?.kind === "found" ? data.products.find((p) => p.id === result.productId) : undefined;
  const linkMatches = linkQuery.trim()
    ? data.products
        .filter((p) =>
          `${p.name} ${p.sku} ${p.brand}`.toLowerCase().includes(linkQuery.trim().toLowerCase()),
        )
        .slice(0, 6)
    : [];
  const desktop = typeof window !== "undefined" && !window.matchMedia("(pointer: coarse)").matches;

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="glass-strong max-h-[94svh] w-[calc(100%-1rem)] overflow-y-auto rounded-3xl border-white/10 p-0 text-foreground sm:max-w-5xl [&>button:last-child]:hidden">
        <div className="flex items-center justify-between border-b border-white/8 px-5 py-4">
          <div>
            <DialogTitle className="flex items-center gap-2 text-lg">
              <ScanLine className="h-5 w-5 text-primary" /> Scan inventory
            </DialogTitle>
            <DialogDescription className="text-xs">
              Camera, handheld scanner or type a code. Changes save instantly and queue for Shopify.
            </DialogDescription>
          </div>
          <Button tone="ghost" size="sm" aria-label="Close scanner" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="grid gap-5 p-5 md:grid-cols-[1.15fr_1fr]">
          {/* Left: camera + mode */}
          <div className="space-y-4">
            <div className="grid grid-cols-4 gap-1 rounded-2xl bg-white/5 p-1">
              {MODES.map((m) => (
                <button
                  key={m.id}
                  type="button"
                  aria-pressed={mode === m.id}
                  onClick={() => {
                    setMode(m.id);
                    lastRef.current = { code: "", at: 0 };
                  }}
                  className={cn(
                    "flex cursor-pointer flex-col items-center gap-1 rounded-xl px-1 py-2 text-[11px] font-medium transition sm:text-xs",
                    mode === m.id
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  <m.icon className="h-4 w-4" />
                  {m.label}
                </button>
              ))}
            </div>
            <p className="text-xs text-muted-foreground">
              {MODES.find((m) => m.id === mode)?.hint}
            </p>

            <div
              className={cn(
                "relative aspect-[4/3] overflow-hidden rounded-2xl bg-black ring-2 transition",
                flash === "ok"
                  ? "ring-emerald-400"
                  : flash === "warn"
                    ? "ring-amber-400"
                    : "ring-white/10",
              )}
            >
              <video ref={videoRef} muted playsInline className="h-full w-full object-cover" />
              {camera === "on" && (
                <>
                  <div className="pointer-events-none absolute inset-x-[10%] inset-y-[24%]">
                    {[
                      "left-0 top-0 border-l-2 border-t-2 rounded-tl-xl",
                      "right-0 top-0 border-r-2 border-t-2 rounded-tr-xl",
                      "bottom-0 left-0 border-b-2 border-l-2 rounded-bl-xl",
                      "bottom-0 right-0 border-b-2 border-r-2 rounded-br-xl",
                    ].map((c) => (
                      <span key={c} className={cn("absolute h-8 w-8 border-primary", c)} />
                    ))}
                    <span className="animate-scanline absolute inset-x-2 h-0.5 rounded-full bg-primary shadow-[0_0_12px_2px] shadow-primary/70" />
                  </div>
                  {torch.available && (
                    <button
                      type="button"
                      onClick={() => void toggleTorch()}
                      aria-pressed={torch.on}
                      aria-label="Flashlight"
                      className={cn(
                        "absolute right-3 top-3 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full backdrop-blur",
                        torch.on ? "bg-primary text-primary-foreground" : "bg-black/50 text-white",
                      )}
                    >
                      <Flashlight className="h-5 w-5" />
                    </button>
                  )}
                </>
              )}
              {camera !== "on" && (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-6 text-center">
                  {camera === "starting" ? (
                    <>
                      <Loader2 className="h-7 w-7 animate-spin text-primary" />
                      <p className="text-sm text-white/70">Starting camera…</p>
                    </>
                  ) : (
                    <>
                      <CameraOff className="h-7 w-7 text-white/60" />
                      <p className="max-w-xs text-sm text-white/75">
                        {camera === "denied"
                          ? "Camera access is blocked. Allow the camera for this site in your browser settings — or use a handheld scanner or type the code below."
                          : "No camera available here. Use a handheld scanner or type the code below."}
                      </p>
                    </>
                  )}
                </div>
              )}
            </div>

            <form onSubmit={submitManual} className="flex gap-2">
              <Input
                autoFocus={desktop}
                value={manual}
                onChange={(e) => setManual(e.target.value)}
                placeholder="Barcode or SKU — handheld scanners type here"
                aria-label="Barcode or SKU"
                inputMode="text"
                autoComplete="off"
              />
              <Button tone="primary" type="submit" disabled={!manual.trim()}>
                Go
              </Button>
            </form>
          </div>

          {/* Right: result + session */}
          <div className="flex min-h-0 flex-col gap-4">
            {!result && (
              <div className="flex flex-1 flex-col items-center justify-center rounded-2xl border border-dashed border-white/12 p-8 text-center">
                <ScanLine className="h-8 w-8 text-primary" />
                <p className="mt-3 font-medium">Ready to scan</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Point the camera at a barcode, pull the trigger on your handheld, or type a SKU.
                </p>
              </div>
            )}

            {result?.kind === "found" && product && (
              <div
                className={cn(
                  "rounded-2xl p-5 ring-1",
                  result.warn ? "bg-amber-500/10 ring-amber-400/30" : "bg-white/5 ring-white/10",
                )}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-xs text-muted-foreground">
                      {product.sku} · {product.brand || "—"} · {product.category}
                    </p>
                    <p className="mt-1 text-lg font-semibold leading-snug">{product.name}</p>
                  </div>
                  {result.note && (
                    <Badge tone={result.warn ? "warning" : "good"}>{result.note}</Badge>
                  )}
                </div>
                <dl className="mt-4 grid grid-cols-3 gap-2 text-sm">
                  <div className="rounded-xl bg-white/5 p-3">
                    <dt className="text-xs text-muted-foreground">On hand</dt>
                    <dd className="tabular mt-0.5 text-2xl font-semibold">{product.quantity}</dd>
                  </div>
                  <div className="rounded-xl bg-white/5 p-3">
                    <dt className="text-xs text-muted-foreground">Price</dt>
                    <dd className="tabular mt-0.5 font-semibold">
                      {product.price ? money(product.price) : "—"}
                    </dd>
                  </div>
                  <div className="rounded-xl bg-white/5 p-3">
                    <dt className="text-xs text-muted-foreground">
                      {mode === "count" ? "Counted" : "Location"}
                    </dt>
                    <dd className="mt-0.5 text-sm font-semibold">
                      {mode === "count" ? (
                        <span className="tabular text-2xl">{counts[product.id] ?? 0}</span>
                      ) : (
                        product.location
                      )}
                    </dd>
                  </div>
                </dl>
                {mode === "lookup" && (
                  <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
                    <Button
                      size="sm"
                      disabled={product.quantity === 0}
                      onClick={() => {
                        inventory.adjust(product.id, -1, "Sold", "Scanner", BY);
                        signal("ok");
                      }}
                    >
                      <Minus className="h-3.5 w-3.5" /> Sell 1
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => {
                        inventory.adjust(product.id, 1, "Received", "Scanner", BY);
                        signal("ok");
                      }}
                    >
                      <Plus className="h-3.5 w-3.5" /> Receive 1
                    </Button>
                    <Button size="sm" onClick={() => onAdjust(product)}>
                      <SlidersHorizontal className="h-3.5 w-3.5" /> Adjust
                    </Button>
                    <Button size="sm" onClick={() => onEdit(product)}>
                      <Pencil className="h-3.5 w-3.5" /> Edit
                    </Button>
                  </div>
                )}
                {product.shopifyVariantId && (
                  <p className="mt-3 text-xs text-muted-foreground">
                    Linked to Shopify ·{" "}
                    {product.syncStatus === "pending" ? "change queued to push" : "in sync"}
                  </p>
                )}
              </div>
            )}

            {result?.kind === "unknown" && (
              <div className="rounded-2xl bg-sky-500/8 p-5 ring-1 ring-sky-400/25">
                <Badge tone="info">New barcode</Badge>
                <p className="tabular mt-3 font-mono text-lg">{result.code}</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  {result.info === undefined ? (
                    <span className="inline-flex items-center gap-2">
                      <Loader2 className="h-3.5 w-3.5 animate-spin" /> Looking up product details…
                    </span>
                  ) : result.info ? (
                    <>
                      Looks like{" "}
                      <span className="font-medium text-foreground">{result.info.title}</span>
                    </>
                  ) : (
                    "Not in your inventory yet."
                  )}
                </p>
                {linking ? (
                  <div className="mt-4">
                    <Input
                      autoFocus
                      value={linkQuery}
                      onChange={(e) => setLinkQuery(e.target.value)}
                      placeholder="Search your products…"
                    />
                    <ul className="mt-2 space-y-1">
                      {linkMatches.map((p) => (
                        <li key={p.id}>
                          <button
                            type="button"
                            onClick={() => {
                              inventory.setBarcode(p.id, result.code);
                              toast.success(`Barcode linked to ${p.name}`);
                              setLinking(false);
                              setLinkQuery("");
                              setTimeout(() => handleRef.current(result.code, true), 0);
                            }}
                            className="flex w-full cursor-pointer items-center justify-between rounded-xl px-3 py-2 text-left text-sm hover:bg-white/8"
                          >
                            <span className="truncate">{p.name}</span>
                            <span className="text-xs text-muted-foreground">{p.sku}</span>
                          </button>
                        </li>
                      ))}
                    </ul>
                    <Button
                      tone="ghost"
                      size="sm"
                      className="mt-1"
                      onClick={() => setLinking(false)}
                    >
                      Cancel
                    </Button>
                  </div>
                ) : (
                  <div className="mt-4 grid grid-cols-2 gap-2">
                    <Button
                      tone="primary"
                      size="sm"
                      onClick={() =>
                        onCreate({
                          barcode: result.code,
                          name: result.info?.title ?? "",
                          brand: result.info?.brand ?? "",
                        })
                      }
                    >
                      <PackagePlus className="h-3.5 w-3.5" /> Create product
                    </Button>
                    <Button size="sm" onClick={() => setLinking(true)}>
                      <Link2 className="h-3.5 w-3.5" /> Link to existing
                    </Button>
                  </div>
                )}
              </div>
            )}

            {mode === "count" && countedIds.length > 0 && (
              <div className="rounded-2xl bg-white/5 p-4 ring-1 ring-white/10">
                <p className="text-sm font-medium">
                  Stock count · {countedIds.length} product{countedIds.length > 1 ? "s" : ""}
                </p>
                <ul className="mt-2 max-h-36 space-y-1 overflow-y-auto text-sm">
                  {countedIds.map((id) => {
                    const p = data.products.find((x) => x.id === id);
                    const counted = counts[id] ?? 0;
                    const diff = counted - (p?.quantity ?? 0);
                    return (
                      <li key={id} className="flex justify-between gap-3">
                        <span className="truncate">{p?.name}</span>
                        <span className="tabular shrink-0 text-muted-foreground">
                          {counted} counted ·{" "}
                          <span
                            className={
                              diff === 0 ? "" : diff > 0 ? "text-emerald-300" : "text-red-300"
                            }
                          >
                            {diff === 0 ? "matches" : `${diff > 0 ? "+" : ""}${diff}`}
                          </span>
                        </span>
                      </li>
                    );
                  })}
                </ul>
                <div className="mt-3 flex gap-2">
                  <Button
                    tone="primary"
                    size="sm"
                    onClick={() => {
                      inventory.applyCounts(counts, BY);
                      toast.success(`Stock count applied to ${countedIds.length} products`);
                      setCounts({});
                    }}
                  >
                    <ClipboardCheck className="h-3.5 w-3.5" /> Apply count
                  </Button>
                  <Button size="sm" tone="ghost" onClick={() => setCounts({})}>
                    Discard
                  </Button>
                </div>
              </div>
            )}

            {log.length > 0 && (
              <div className="min-h-0">
                <p className="mb-2 text-xs font-medium text-muted-foreground">This session</p>
                <ul className="max-h-48 divide-y divide-white/6 overflow-y-auto">
                  {log.map((l) => (
                    <li
                      key={l.id}
                      className={cn(
                        "flex items-center justify-between gap-3 py-2 text-sm",
                        l.undone && "opacity-40 line-through",
                      )}
                    >
                      <span className="min-w-0">
                        <span className="block truncate">{l.name}</span>
                        <span className="text-xs text-muted-foreground">
                          {l.mode === "count" ? "Counted" : l.delta > 0 ? "Received" : "Sold"} ·{" "}
                          {new Date(l.at).toLocaleTimeString("en-US", {
                            hour: "numeric",
                            minute: "2-digit",
                            second: "2-digit",
                          })}
                        </span>
                      </span>
                      <span className="flex items-center gap-2">
                        <span
                          className={cn(
                            "tabular font-semibold",
                            l.mode === "count"
                              ? ""
                              : l.delta > 0
                                ? "text-emerald-300"
                                : "text-red-300",
                          )}
                        >
                          {l.mode === "count" ? "+1" : `${l.delta > 0 ? "+" : ""}${l.delta}`}
                        </span>
                        {!l.undone && (
                          <Button
                            tone="ghost"
                            size="sm"
                            aria-label={`Undo ${l.name}`}
                            onClick={() => undo(l)}
                          >
                            <Undo2 className="h-3.5 w-3.5" />
                          </Button>
                        )}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
