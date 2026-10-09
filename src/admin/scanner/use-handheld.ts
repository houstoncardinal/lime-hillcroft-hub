import { useEffect, useRef } from "react";

/**
 * Handheld USB/Bluetooth scanners type the code very fast and press Enter. This catches those
 * bursts anywhere on the page (when no text field is focused) and calls `onScan`.
 */
export function useHandheldScanner(onScan: (code: string) => void, enabled = true) {
  const handler = useRef(onScan);
  handler.current = onScan;

  useEffect(() => {
    if (!enabled) return;
    let buffer = "";
    let last = 0;
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (target?.closest("input, textarea, select, [contenteditable=true], [role=dialog]")) return;
      const now = performance.now();
      if (now - last > 60) buffer = "";
      last = now;
      if (e.key === "Enter") {
        if (buffer.length >= 4) {
          e.preventDefault();
          handler.current(buffer);
        }
        buffer = "";
      } else if (e.key.length === 1) {
        buffer += e.key;
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [enabled]);
}
