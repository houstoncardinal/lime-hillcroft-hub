import iphone18 from "@/assets/photos/iphone-18-pro-max.webp";
import iphone18Sm from "@/assets/photos/iphone-18-pro-max-sm.webp";
import counter from "@/assets/photos/store-counter.webp";
import counterSm from "@/assets/photos/store-counter-sm.webp";
import jbl from "@/assets/photos/jbl-display.webp";
import jblSm from "@/assets/photos/jbl-display-sm.webp";
import protector from "@/assets/photos/screen-protector.webp";
import protectorSm from "@/assets/photos/screen-protector-sm.webp";
import otterbox from "@/assets/photos/iphone-otterbox.webp";
import otterboxSm from "@/assets/photos/iphone-otterbox-sm.webp";
import s24 from "@/assets/photos/galaxy-s24-ultra.webp";
import s24Sm from "@/assets/photos/galaxy-s24-ultra-sm.webp";
import storefront from "@/assets/photos/storefront-3640.webp";
import storefrontSm from "@/assets/photos/storefront-3640-sm.webp";
import s22 from "@/assets/photos/galaxy-s22-ultra.webp";
import s22Sm from "@/assets/photos/galaxy-s22-ultra-sm.webp";
import laptops from "@/assets/photos/laptops-tablets.webp";
import laptopsSm from "@/assets/photos/laptops-tablets-sm.webp";

import type { PhotoKey } from "@/components/services/data";

export const SERVICE_PHOTOS: Record<PhotoKey, { src: string; sm: string; w: number; h: number }> = {
  iphone18: { src: iphone18, sm: iphone18Sm, w: 1400, h: 1750 },
  counter: { src: counter, sm: counterSm, w: 2000, h: 1500 },
  jbl: { src: jbl, sm: jblSm, w: 2000, h: 1500 },
  protector: { src: protector, sm: protectorSm, w: 1500, h: 2000 },
  otterbox: { src: otterbox, sm: otterboxSm, w: 1500, h: 2000 },
  s24: { src: s24, sm: s24Sm, w: 1500, h: 2000 },
  storefront: { src: storefront, sm: storefrontSm, w: 2000, h: 1500 },
  s22: { src: s22, sm: s22Sm, w: 1500, h: 2000 },
  laptops: { src: laptops, sm: laptopsSm, w: 2000, h: 1400 },
};
