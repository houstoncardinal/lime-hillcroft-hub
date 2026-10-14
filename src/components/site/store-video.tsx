import { useEffect, useRef, useState } from "react";

import { CLIPS, type ClipKey } from "@/components/site/store-clips";
import { cn } from "@/lib/utils";

// Plays a store clip (see store-clips.ts) muted and looped like a moving photo. It starts only
// when on screen and falls back to the poster image for people who ask for reduced motion or
// data saving.

function prefersStill() {
  if (typeof window === "undefined") return true;
  const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection
    ?.saveData;
  return Boolean(saveData) || window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function StoreVideo({
  clip,
  className,
  label,
  background,
}: {
  clip: ClipKey;
  className?: string;
  /** Accessible description; leave out for purely decorative backgrounds. */
  label?: string;
  /** Decorative background: play only on tablets and larger (phones show the poster). */
  background?: boolean;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const [play, setPlay] = useState(false);
  const c = CLIPS[clip];

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersStill()) return;
    if (background && window.matchMedia("(max-width: 767px)").matches) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setPlay(true);
          void el.play().catch(() => {});
        } else {
          el.pause();
        }
      },
      { rootMargin: "200px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [background]);

  return (
    <video
      ref={ref}
      className={cn("h-full w-full object-cover", className)}
      poster={c.poster}
      muted
      loop
      playsInline
      // Nothing downloads until the clip is near the screen.
      preload="none"
      {...(play ? { src: c.src, autoPlay: true } : {})}
      {...(label ? { "aria-label": label, role: "img" } : { "aria-hidden": true })}
    />
  );
}
