import { cn } from "@/lib/utils";

// Store photos ship in two widths (see src/assets/photos): 900px "-sm" and 2000px.
export function Photo({
  src,
  srcSm,
  alt,
  width,
  height,
  sizes = "100vw",
  priority,
  className,
}: {
  src: string;
  srcSm: string;
  alt: string;
  width: number;
  height: number;
  sizes?: string;
  priority?: boolean;
  className?: string;
}) {
  return (
    <img
      src={src}
      srcSet={`${srcSm} 900w, ${src} 2000w`}
      sizes={sizes}
      alt={alt}
      width={width}
      height={height}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : undefined}
      decoding="async"
      className={cn("h-full w-full object-cover", className)}
    />
  );
}
