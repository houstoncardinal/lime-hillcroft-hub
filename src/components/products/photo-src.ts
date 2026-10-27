// Product photos wider than 600 px have a 480 px copy next to them (<name>-480.webp), so cards,
// thumbnails and phone screens don't download the full 1,200 px photo.
export function photoSrcSet(src: string, w: number) {
  if (!src.startsWith("/photos/devices/product/") || !src.endsWith(".webp") || w <= 600) return;
  return `${src.replace(/\.webp$/, "-480.webp")} 480w, ${src} ${w}w`;
}
