import caseWall from "@/assets/photos/accessories-case-wall.jpg";
import caseWallSm from "@/assets/photos/accessories-case-wall-sm.jpg";
import airpodsWatches from "@/assets/photos/airpods-watches-case.jpg";
import airpodsWatchesSm from "@/assets/photos/airpods-watches-case-sm.jpg";
import chargers from "@/assets/photos/chargers-wall.jpg";
import chargersSm from "@/assets/photos/chargers-wall-sm.jpg";
import consoles from "@/assets/photos/consoles-table.jpg";
import consolesSm from "@/assets/photos/consoles-table-sm.jpg";
import iphoneCases from "@/assets/photos/iphone-cases-wall.jpg";
import iphoneCasesSm from "@/assets/photos/iphone-cases-wall-sm.jpg";
import jbl from "@/assets/photos/jbl-speakers-case.jpg";
import jblSm from "@/assets/photos/jbl-speakers-case-sm.jpg";
import appleDisplay from "@/assets/photos/apple-display.jpg";
import appleDisplaySm from "@/assets/photos/apple-display-sm.jpg";
import laptopsTablets from "@/assets/photos/laptops-tablets.jpg";
import laptopsTabletsSm from "@/assets/photos/laptops-tablets-sm.jpg";
import airpodsMax from "@/assets/photos/airpods-max-ipads.jpg";
import airpodsMaxSm from "@/assets/photos/airpods-max-ipads-sm.jpg";
import jblCase from "@/assets/photos/jbl-display-case.jpg";
import jblCaseSm from "@/assets/photos/jbl-display-case-sm.jpg";
import watchTab from "@/assets/photos/galaxy-watch-tab.jpg";
import watchTabSm from "@/assets/photos/galaxy-watch-tab-sm.jpg";
import protector from "@/assets/photos/screen-protector.jpg";
import protectorSm from "@/assets/photos/screen-protector-sm.jpg";
import samsungCases from "@/assets/photos/samsung-cases-wall.jpg";
import samsungCasesSm from "@/assets/photos/samsung-cases-wall-sm.jpg";

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
