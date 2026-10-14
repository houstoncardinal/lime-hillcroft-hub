import caseWall from "@/assets/photos/accessories-case-wall.webp";
import caseWallSm from "@/assets/photos/accessories-case-wall-sm.webp";
import airpodsWatches from "@/assets/photos/airpods-watches-case.webp";
import airpodsWatchesSm from "@/assets/photos/airpods-watches-case-sm.webp";
import chargers from "@/assets/photos/chargers-wall.webp";
import chargersSm from "@/assets/photos/chargers-wall-sm.webp";
import consoles from "@/assets/photos/consoles-table.webp";
import consolesSm from "@/assets/photos/consoles-table-sm.webp";
import iphoneCases from "@/assets/photos/iphone-cases-wall.webp";
import iphoneCasesSm from "@/assets/photos/iphone-cases-wall-sm.webp";
import jbl from "@/assets/photos/jbl-speakers-case.webp";
import jblSm from "@/assets/photos/jbl-speakers-case-sm.webp";
import appleDisplay from "@/assets/photos/apple-display.webp";
import appleDisplaySm from "@/assets/photos/apple-display-sm.webp";
import laptopsTablets from "@/assets/photos/laptops-tablets.webp";
import laptopsTabletsSm from "@/assets/photos/laptops-tablets-sm.webp";
import airpodsMax from "@/assets/photos/airpods-max-ipads.webp";
import airpodsMaxSm from "@/assets/photos/airpods-max-ipads-sm.webp";
import jblCase from "@/assets/photos/jbl-display-case.webp";
import jblCaseSm from "@/assets/photos/jbl-display-case-sm.webp";
import watchTab from "@/assets/photos/galaxy-watch-tab.webp";
import watchTabSm from "@/assets/photos/galaxy-watch-tab-sm.webp";
import protector from "@/assets/photos/screen-protector.webp";
import protectorSm from "@/assets/photos/screen-protector-sm.webp";
import samsungCases from "@/assets/photos/samsung-cases-wall.webp";
import samsungCasesSm from "@/assets/photos/samsung-cases-wall-sm.webp";

import type { ProductPhoto } from "@/components/products/data";

/** Bundled photo + its stable copy in public/photos (used in schema and share images). */
export const PRODUCT_PHOTOS: Record<
  ProductPhoto,
  { src: string; sm: string; w: number; h: number; file: string }
> = {
  caseWall: { src: caseWall, sm: caseWallSm, w: 1562, h: 1168, file: "accessories-case-wall" },
  iphoneCases: { src: iphoneCases, sm: iphoneCasesSm, w: 876, h: 1170, file: "iphone-cases-wall" },
  samsungCases: {
    src: samsungCases,
    sm: samsungCasesSm,
    w: 1560,
    h: 1168,
    file: "samsung-cases-wall",
  },
  chargers: { src: chargers, sm: chargersSm, w: 1560, h: 1170, file: "chargers-wall" },
  jbl: { src: jbl, sm: jblSm, w: 1564, h: 1180, file: "jbl-speakers-case" },
  airpodsWatches: {
    src: airpodsWatches,
    sm: airpodsWatchesSm,
    w: 1564,
    h: 1168,
    file: "airpods-watches-case",
  },
  consoles: { src: consoles, sm: consolesSm, w: 1564, h: 1182, file: "consoles-table" },
  protector: { src: protector, sm: protectorSm, w: 1500, h: 2000, file: "screen-protector" },
  jblCase: { src: jblCase, sm: jblCaseSm, w: 1600, h: 1200, file: "jbl-display-case" },
  watchTab: { src: watchTab, sm: watchTabSm, w: 1600, h: 1200, file: "galaxy-watch-tab" },
  laptopsTablets: {
    src: laptopsTablets,
    sm: laptopsTabletsSm,
    w: 2000,
    h: 1400,
    file: "laptops-tablets",
  },
  appleDisplay: { src: appleDisplay, sm: appleDisplaySm, w: 1500, h: 2000, file: "apple-display" },
  airpodsMax: { src: airpodsMax, sm: airpodsMaxSm, w: 1600, h: 1200, file: "airpods-max-ipads" },
};
