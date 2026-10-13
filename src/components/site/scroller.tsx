import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";

import { cn } from "@/lib/utils";

/**
 * Horizontally scrolling row (reviews, devices): swipe with snap on phones, arrow buttons on
 * larger screens, and keyboard scrolling. Children are the cards; give each a width.
 */
export function Scroller({
  label,
  children,
  className,
  dark,
  prevLabel = "Previous",
  nextLabel = "Next",
}: {
  label: string;
  children: ReactNode;
  className?: string;
  /** Buttons styled for a dark section. */
  dark?: boolean;
  prevLabel?: string;
  nextLabel?: string;
}) {
  const ref = useRef<HTMLUListElement>(null);
  const [edges, setEdges] = useState({ start: true, end: false });

  const update = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    setEdges({
      start: el.scrollLeft <= 4,
      end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 4,
    });
  }, []);

  useEffect(() => {
    update();
    const el = ref.current;
    el?.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      el?.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [update]);

  const go = (dir: 1 | -1) => {
    const el = ref.current;
    if (!el) return;
    el.scrollBy({ left: dir * Math.max(el.clientWidth * 0.85, 280), behavior: "smooth" });
  };

  const button = cn(
    "hidden h-11 w-11 shrink-0 cursor-pointer items-center justify-center rounded-full transition disabled:cursor-default disabled:opacity-30 sm:inline-flex",
    dark
      ? "bg-white/10 text-white hover:bg-white/20"
      : "border bg-card text-ink shadow-sm hover:border-primary hover:text-primary",
  );

  return (
    <div
      className={cn("relative", className)}
      role="region"
      aria-roledescription="carousel"
      aria-label={label}
    >
      <div className="mb-4 flex justify-end gap-2 px-5">
        <button
          type="button"
          className={button}
          onClick={() => go(-1)}
          disabled={edges.start}
          aria-label={prevLabel}
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          type="button"
          className={button}
          onClick={() => go(1)}
          disabled={edges.end}
          aria-label={nextLabel}
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
      <ul
        ref={ref}
        tabIndex={0}
        className="flex snap-x snap-mandatory scroll-px-5 gap-3 overflow-x-auto px-5 pb-3 outline-none [scrollbar-width:none] focus-visible:ring-2 focus-visible:ring-primary sm:gap-4 [&::-webkit-scrollbar]:hidden"
      >
        {children}
      </ul>
    </div>
  );
}
