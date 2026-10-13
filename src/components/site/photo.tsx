import { cn } from "@/lib/utils";

// Store photos ship in two widths (see src/assets/photos): 900px "-sm" and full size.
export function Photo({
  src,
  srcSm,
  alt,
  width,
  height,
  sizes = "100vw",
  priority,
  className,
  style,
}: {
  src: string;
  srcSm: string;
  alt: string;
  width: number;
  height: number;
  sizes?: string;
  priority?: boolean;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <img
      src={src}
      // The large file is the photo at full size, so its real width is the descriptor.
      srcSet={`${srcSm} 900w, ${src} ${width}w`}
      sizes={sizes}
      alt={alt}
      width={width}
      height={height}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : undefined}
      decoding="async"
      className={cn("h-full w-full object-cover", className)}
      style={style}
    />
  );
}
