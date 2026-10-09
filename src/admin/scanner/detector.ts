import type { Product } from "@/admin/types";

// Barcode reading for the inventory scanner. Uses the browser's built-in BarcodeDetector
// (Chrome on Android/macOS) and falls back to a bundled ZXing WebAssembly build elsewhere
// (iPhone/Safari, Firefox). The fallback is loaded only when the scanner opens, from our own
// site rather than a CDN.

export const SCAN_FORMATS = [
  "ean_13",
  "ean_8",
  "upc_a",
  "upc_e",
  "code_128",
  "code_39",
  "code_93",
  "itf",
  "qr_code",
  "data_matrix",
] as const;

export type Detector = {
  detect: (source: HTMLVideoElement) => Promise<{ rawValue: string; format: string }[]>;
};

type NativeDetectorCtor = {
  new (opts: { formats: string[] }): Detector;
  getSupportedFormats(): Promise<string[]>;
};

export async function createDetector(): Promise<Detector> {
  const Native = (globalThis as { BarcodeDetector?: NativeDetectorCtor }).BarcodeDetector;
  if (Native) {
    try {
      const supported = await Native.getSupportedFormats();
      const formats = SCAN_FORMATS.filter((f) => supported.includes(f));
      if (formats.includes("ean_13") && formats.includes("upc_a"))
        return new Native({ formats: [...formats] });
    } catch {
      // Fall through to the WebAssembly reader.
    }
  }
  const [{ BarcodeDetector, setZXingModuleOverrides }, { default: wasmUrl }] = await Promise.all([
    import("barcode-detector/ponyfill"),
    import("zxing-wasm/reader/zxing_reader.wasm?url"),
  ]);
  setZXingModuleOverrides({
    locateFile: (path: string, prefix: string) =>
      path.endsWith(".wasm") ? wasmUrl : prefix + path,
  });
  return new BarcodeDetector({ formats: [...SCAN_FORMATS] });
}

/** Numeric codes compare without leading zeros, so UPC-A and its EAN-13 form match. */
export function normalizeCode(code: string) {
  const c = code.trim();
  return /^\d+$/.test(c) ? c.replace(/^0+/, "") : c.toLowerCase();
}

export function findByCode(products: Product[], code: string) {
  const n = normalizeCode(code);
  if (!n) return undefined;
  return (
    products.find((p) => p.barcode && normalizeCode(p.barcode) === n) ??
    products.find((p) => p.sku.toLowerCase() === code.trim().toLowerCase())
  );
}

/** Short confirmation tone (ok) or a low double tone (problem), plus a vibration on phones. */
export function feedback(kind: "ok" | "warn") {
  try {
    navigator.vibrate?.(kind === "ok" ? 40 : [60, 60, 60]);
    const Ctx =
      window.AudioContext ??
      (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!Ctx) return;
    const ctx = new Ctx();
    const tones =
      kind === "ok"
        ? [[1760, 0]]
        : [
            [330, 0],
            [330, 0.14],
          ];
    for (const [freq = 0, at = 0] of tones) {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.frequency.value = freq;
      osc.type = "sine";
      gain.gain.setValueAtTime(0.0001, ctx.currentTime + at);
      gain.gain.exponentialRampToValueAtTime(0.25, ctx.currentTime + at + 0.01);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + at + 0.1);
      osc.connect(gain).connect(ctx.destination);
      osc.start(ctx.currentTime + at);
      osc.stop(ctx.currentTime + at + 0.12);
    }
    setTimeout(() => void ctx.close(), 600);
  } catch {
    // Sound is a nicety; ignore failures.
  }
}
