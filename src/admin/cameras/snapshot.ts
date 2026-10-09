/** Save the current frame as a PNG; fails for streams that don't allow cross-origin capture. */
export async function saveSnapshot(el: HTMLVideoElement | HTMLImageElement, name: string) {
  const w = el instanceof HTMLVideoElement ? el.videoWidth : el.naturalWidth;
  const h = el instanceof HTMLVideoElement ? el.videoHeight : el.naturalHeight;
  if (!w || !h) throw new Error("No picture yet");
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  canvas.getContext("2d")?.drawImage(el, 0, 0, w, h);
  const blob = await new Promise<Blob | null>((r) => canvas.toBlob(r, "image/png"));
  if (!blob) throw new Error("Snapshot blocked");
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = `${name.replace(/\W+/g, "-").toLowerCase()}-${new Date().toISOString().slice(0, 19).replace(/[:T]/g, "-")}.png`;
  a.click();
  // Revoking right away can cancel the download in some browsers.
  setTimeout(() => URL.revokeObjectURL(a.href), 10_000);
}
