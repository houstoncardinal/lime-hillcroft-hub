// Manufacturer product images for lease-to-own devices (Apple Store & Apple Support, Samsung
// Mobile Press and samsung.com product galleries, PlayStation, Xbox and Nintendo), downloaded 2026-11-10, trimmed onto white and
// credited to the manufacturer on each page. Files: public/photos/devices/official/<id>-<n>.*
// Generated from the image plan; the first photo of each device is its main photo.
import type { ProductPhoto } from "@/components/products/devices";

const o = (file: string, w: number, h: number, en: string, es: string, brand: string, href: string): ProductPhoto => ({
  src: `/photos/devices/official/${file}.webp`,
  jpg: `/photos/devices/official/${file}.jpg`,
  w,
  h,
  alt: { en, es },
  credit: { author: brand, license: "manufacturer", href },
});

export const OFFICIAL_PHOTOS: Record<string, ProductPhoto[]> = {
  "iphone-18-pro-max": [
    o("iphone-18-pro-max-1", 1040, 1251, "iPhone 18 Pro Max, official Apple product image", "iPhone 18 Pro Max, imagen oficial de Apple", "Apple", "https://www.apple.com/shop/buy-iphone"),
    o("iphone-18-pro-max-2", 664, 589, "iPhone 18 Pro Max, official Apple product image", "iPhone 18 Pro Max, imagen oficial de Apple", "Apple", "https://www.apple.com/shop/buy-iphone"),
    o("iphone-18-pro-max-3", 1346, 618, "iPhone 18 Pro Max, official Apple product image", "iPhone 18 Pro Max, imagen oficial de Apple", "Apple", "https://www.apple.com/shop/buy-iphone"),
    o("iphone-18-pro-max-4", 978, 772, "iPhone 18 Pro Max in every color, official Apple image", "iPhone 18 Pro Max en todos los colores, imagen oficial de Apple", "Apple", "https://support.apple.com/en-us/108044"),
  ],
  "iphone-18-pro": [
    o("iphone-18-pro-1", 965, 1146, "iPhone 18 Pro, official Apple product image", "iPhone 18 Pro, imagen oficial de Apple", "Apple", "https://www.apple.com/shop/buy-iphone"),
    o("iphone-18-pro-2", 663, 590, "iPhone 18 Pro, official Apple product image", "iPhone 18 Pro, imagen oficial de Apple", "Apple", "https://www.apple.com/shop/buy-iphone"),
    o("iphone-18-pro-3", 1346, 618, "iPhone 18 Pro, official Apple product image", "iPhone 18 Pro, imagen oficial de Apple", "Apple", "https://www.apple.com/shop/buy-iphone"),
    o("iphone-18-pro-4", 972, 732, "iPhone 18 Pro in every color, official Apple image", "iPhone 18 Pro en todos los colores, imagen oficial de Apple", "Apple", "https://support.apple.com/en-us/108044"),
  ],
  "iphone-17-pro-max": [
    o("iphone-17-pro-max-1", 999, 1257, "iPhone 17 Pro Max, official Apple product image", "iPhone 17 Pro Max, imagen oficial de Apple", "Apple", "https://www.apple.com/shop/buy-iphone"),
    o("iphone-17-pro-max-2", 664, 590, "iPhone 17 Pro Max, official Apple product image", "iPhone 17 Pro Max, imagen oficial de Apple", "Apple", "https://www.apple.com/shop/buy-iphone"),
    o("iphone-17-pro-max-3", 1347, 619, "iPhone 17 Pro Max, official Apple product image", "iPhone 17 Pro Max, imagen oficial de Apple", "Apple", "https://www.apple.com/shop/buy-iphone"),
    o("iphone-17-pro-max-4", 1026, 776, "iPhone 17 Pro Max in every color, official Apple image", "iPhone 17 Pro Max en todos los colores, imagen oficial de Apple", "Apple", "https://support.apple.com/en-us/108044"),
  ],
  "iphone-17-pro": [
    o("iphone-17-pro-1", 948, 1154, "iPhone 17 Pro, official Apple product image", "iPhone 17 Pro, imagen oficial de Apple", "Apple", "https://www.apple.com/shop/buy-iphone"),
    o("iphone-17-pro-2", 660, 588, "iPhone 17 Pro, official Apple product image", "iPhone 17 Pro, imagen oficial de Apple", "Apple", "https://www.apple.com/shop/buy-iphone"),
    o("iphone-17-pro-3", 1346, 618, "iPhone 17 Pro, official Apple product image", "iPhone 17 Pro, imagen oficial de Apple", "Apple", "https://www.apple.com/shop/buy-iphone"),
    o("iphone-17-pro-4", 1015, 735, "iPhone 17 Pro in every color, official Apple image", "iPhone 17 Pro en todos los colores, imagen oficial de Apple", "Apple", "https://support.apple.com/en-us/108044"),
  ],
  "iphone-air": [
    o("iphone-air-1", 726, 1204, "iPhone Air, official Apple product image", "iPhone Air, imagen oficial de Apple", "Apple", "https://www.apple.com/shop/buy-iphone"),
    o("iphone-air-2", 647, 588, "iPhone Air, official Apple product image", "iPhone Air, imagen oficial de Apple", "Apple", "https://www.apple.com/shop/buy-iphone"),
    o("iphone-air-3", 1346, 618, "iPhone Air, official Apple product image", "iPhone Air, imagen oficial de Apple", "Apple", "https://www.apple.com/shop/buy-iphone"),
    o("iphone-air-4", 976, 732, "iPhone Air in every color, official Apple image", "iPhone Air en todos los colores, imagen oficial de Apple", "Apple", "https://support.apple.com/en-us/108044"),
  ],
  "iphone-17": [
    o("iphone-17-1", 692, 1150, "iPhone 17, official Apple product image", "iPhone 17, imagen oficial de Apple", "Apple", "https://www.apple.com/shop/buy-iphone"),
    o("iphone-17-2", 666, 590, "iPhone 17, official Apple product image", "iPhone 17, imagen oficial de Apple", "Apple", "https://www.apple.com/shop/buy-iphone"),
    o("iphone-17-3", 1060, 595, "iPhone 17, official Apple product image", "iPhone 17, imagen oficial de Apple", "Apple", "https://www.apple.com/shop/buy-iphone"),
    o("iphone-17-4", 1076, 730, "iPhone 17 in every color, official Apple image", "iPhone 17 en todos los colores, imagen oficial de Apple", "Apple", "https://support.apple.com/en-us/108044"),
  ],
  "iphone-16-pro-max": [
    o("iphone-16-pro-max-1", 412, 515, "iPhone 16 Pro Max, official Apple product image", "iPhone 16 Pro Max, imagen oficial de Apple", "Apple", "https://www.apple.com/shop/buy-iphone"),
    o("iphone-16-pro-max-2", 362, 515, "iPhone 16 Pro Max, official Apple product image", "iPhone 16 Pro Max, imagen oficial de Apple", "Apple", "https://www.apple.com/shop/buy-iphone"),
    o("iphone-16-pro-max-3", 594, 793, "iPhone 16 Pro Max, official Apple product image", "iPhone 16 Pro Max, imagen oficial de Apple", "Apple", "https://www.apple.com/shop/buy-iphone"),
    o("iphone-16-pro-max-4", 976, 772, "iPhone 16 Pro Max in every color, official Apple image", "iPhone 16 Pro Max en todos los colores, imagen oficial de Apple", "Apple", "https://support.apple.com/en-us/108044"),
  ],
  "iphone-16-pro": [
    o("iphone-16-pro-1", 385, 471, "iPhone 16 Pro, official Apple product image", "iPhone 16 Pro, imagen oficial de Apple", "Apple", "https://www.apple.com/shop/buy-iphone"),
    o("iphone-16-pro-2", 328, 471, "iPhone 16 Pro, official Apple product image", "iPhone 16 Pro, imagen oficial de Apple", "Apple", "https://www.apple.com/shop/buy-iphone"),
    o("iphone-16-pro-3", 559, 757, "iPhone 16 Pro, official Apple product image", "iPhone 16 Pro, imagen oficial de Apple", "Apple", "https://www.apple.com/shop/buy-iphone"),
    o("iphone-16-pro-4", 972, 731, "iPhone 16 Pro in every color, official Apple image", "iPhone 16 Pro en todos los colores, imagen oficial de Apple", "Apple", "https://support.apple.com/en-us/108044"),
  ],
  "iphone-16-plus": [
    o("iphone-16-plus-1", 1034, 1262, "iPhone 16 Plus, official Apple product image", "iPhone 16 Plus, imagen oficial de Apple", "Apple", "https://www.apple.com/shop/buy-iphone"),
    o("iphone-16-plus-2", 752, 561, "iPhone 16 Plus, official Apple product image", "iPhone 16 Plus, imagen oficial de Apple", "Apple", "https://www.apple.com/shop/buy-iphone"),
    o("iphone-16-plus-3", 1346, 618, "iPhone 16 Plus, official Apple product image", "iPhone 16 Plus, imagen oficial de Apple", "Apple", "https://www.apple.com/shop/buy-iphone"),
    o("iphone-16-plus-4", 1034, 776, "iPhone 16 Plus in every color, official Apple image", "iPhone 16 Plus en todos los colores, imagen oficial de Apple", "Apple", "https://support.apple.com/en-us/108044"),
  ],
  "iphone-16": [
    o("iphone-16-1", 960, 1159, "iPhone 16, official Apple product image", "iPhone 16, imagen oficial de Apple", "Apple", "https://www.apple.com/shop/buy-iphone"),
    o("iphone-16-2", 751, 561, "iPhone 16, official Apple product image", "iPhone 16, imagen oficial de Apple", "Apple", "https://www.apple.com/shop/buy-iphone"),
    o("iphone-16-3", 1346, 618, "iPhone 16, official Apple product image", "iPhone 16, imagen oficial de Apple", "Apple", "https://www.apple.com/shop/buy-iphone"),
    o("iphone-16-4", 1026, 732, "iPhone 16 in every color, official Apple image", "iPhone 16 en todos los colores, imagen oficial de Apple", "Apple", "https://support.apple.com/en-us/108044"),
  ],
  "iphone-15-pro-max": [
    o("iphone-15-pro-max-1", 416, 512, "iPhone 15 Pro Max, official Apple product image", "iPhone 15 Pro Max, imagen oficial de Apple", "Apple", "https://www.apple.com/shop/buy-iphone"),
    o("iphone-15-pro-max-2", 360, 515, "iPhone 15 Pro Max, official Apple product image", "iPhone 15 Pro Max, imagen oficial de Apple", "Apple", "https://www.apple.com/shop/buy-iphone"),
    o("iphone-15-pro-max-3", 976, 772, "iPhone 15 Pro Max in every color, official Apple image", "iPhone 15 Pro Max en todos los colores, imagen oficial de Apple", "Apple", "https://support.apple.com/en-us/108044"),
  ],
  "iphone-15-pro": [
    o("iphone-15-pro-1", 387, 470, "iPhone 15 Pro, official Apple product image", "iPhone 15 Pro, imagen oficial de Apple", "Apple", "https://www.apple.com/shop/buy-iphone"),
    o("iphone-15-pro-2", 330, 477, "iPhone 15 Pro, official Apple product image", "iPhone 15 Pro, imagen oficial de Apple", "Apple", "https://www.apple.com/shop/buy-iphone"),
    o("iphone-15-pro-3", 185, 757, "iPhone 15 Pro, official Apple product image", "iPhone 15 Pro, imagen oficial de Apple", "Apple", "https://www.apple.com/shop/buy-iphone"),
    o("iphone-15-pro-4", 972, 731, "iPhone 15 Pro in every color, official Apple image", "iPhone 15 Pro en todos los colores, imagen oficial de Apple", "Apple", "https://support.apple.com/en-us/108044"),
  ],
  "iphone-15-plus": [
    o("iphone-15-plus-1", 394, 516, "iPhone 15 Plus, official Apple product image", "iPhone 15 Plus, imagen oficial de Apple", "Apple", "https://www.apple.com/shop/buy-iphone"),
    o("iphone-15-plus-2", 356, 514, "iPhone 15 Plus, official Apple product image", "iPhone 15 Plus, imagen oficial de Apple", "Apple", "https://www.apple.com/shop/buy-iphone"),
    o("iphone-15-plus-3", 1034, 776, "iPhone 15 Plus in every color, official Apple image", "iPhone 15 Plus en todos los colores, imagen oficial de Apple", "Apple", "https://support.apple.com/en-us/108044"),
  ],
  "iphone-15": [
    o("iphone-15-1", 367, 474, "iPhone 15, official Apple product image", "iPhone 15, imagen oficial de Apple", "Apple", "https://www.apple.com/shop/buy-iphone"),
    o("iphone-15-2", 329, 471, "iPhone 15, official Apple product image", "iPhone 15, imagen oficial de Apple", "Apple", "https://www.apple.com/shop/buy-iphone"),
    o("iphone-15-3", 727, 757, "iPhone 15, official Apple product image", "iPhone 15, imagen oficial de Apple", "Apple", "https://www.apple.com/shop/buy-iphone"),
    o("iphone-15-4", 1026, 732, "iPhone 15 in every color, official Apple image", "iPhone 15 en todos los colores, imagen oficial de Apple", "Apple", "https://support.apple.com/en-us/108044"),
  ],
  "iphone-14-pro-max": [
    o("iphone-14-pro-max-1", 418, 516, "iPhone 14 Pro Max, official Apple product image", "iPhone 14 Pro Max, imagen oficial de Apple", "Apple", "https://www.apple.com/shop/buy-iphone"),
    o("iphone-14-pro-max-2", 357, 513, "iPhone 14 Pro Max, official Apple product image", "iPhone 14 Pro Max, imagen oficial de Apple", "Apple", "https://www.apple.com/shop/buy-iphone"),
    o("iphone-14-pro-max-3", 976, 772, "iPhone 14 Pro Max in every color, official Apple image", "iPhone 14 Pro Max en todos los colores, imagen oficial de Apple", "Apple", "https://support.apple.com/en-us/108044"),
  ],
  "iphone-14-pro": [
    o("iphone-14-pro-1", 390, 471, "iPhone 14 Pro, official Apple product image", "iPhone 14 Pro, imagen oficial de Apple", "Apple", "https://www.apple.com/shop/buy-iphone"),
    o("iphone-14-pro-2", 330, 470, "iPhone 14 Pro, official Apple product image", "iPhone 14 Pro, imagen oficial de Apple", "Apple", "https://www.apple.com/shop/buy-iphone"),
    o("iphone-14-pro-3", 726, 758, "iPhone 14 Pro, official Apple product image", "iPhone 14 Pro, imagen oficial de Apple", "Apple", "https://www.apple.com/shop/buy-iphone"),
    o("iphone-14-pro-4", 972, 728, "iPhone 14 Pro in every color, official Apple image", "iPhone 14 Pro en todos los colores, imagen oficial de Apple", "Apple", "https://support.apple.com/en-us/108044"),
  ],
  "iphone-14-plus": [
    o("iphone-14-plus-1", 387, 513, "iPhone 14 Plus, official Apple product image", "iPhone 14 Plus, imagen oficial de Apple", "Apple", "https://www.apple.com/shop/buy-iphone"),
    o("iphone-14-plus-2", 356, 513, "iPhone 14 Plus, official Apple product image", "iPhone 14 Plus, imagen oficial de Apple", "Apple", "https://www.apple.com/shop/buy-iphone"),
    o("iphone-14-plus-3", 1180, 788, "iPhone 14 Plus in every color, official Apple image", "iPhone 14 Plus en todos los colores, imagen oficial de Apple", "Apple", "https://support.apple.com/en-us/108044"),
  ],
  "iphone-14": [
    o("iphone-14-1", 362, 471, "iPhone 14, official Apple product image", "iPhone 14, imagen oficial de Apple", "Apple", "https://www.apple.com/shop/buy-iphone"),
    o("iphone-14-2", 328, 471, "iPhone 14, official Apple product image", "iPhone 14, imagen oficial de Apple", "Apple", "https://www.apple.com/shop/buy-iphone"),
    o("iphone-14-3", 731, 757, "iPhone 14, official Apple product image", "iPhone 14, imagen oficial de Apple", "Apple", "https://www.apple.com/shop/buy-iphone"),
    o("iphone-14-4", 1160, 742, "iPhone 14 in every color, official Apple image", "iPhone 14 en todos los colores, imagen oficial de Apple", "Apple", "https://support.apple.com/en-us/108044"),
  ],
  "iphone-13-pro-max": [
    o("iphone-13-pro-max-1", 447, 573, "iPhone 13 Pro Max, official Apple product image", "iPhone 13 Pro Max, imagen oficial de Apple", "Apple", "https://www.apple.com/shop/buy-iphone"),
    o("iphone-13-pro-max-2", 619, 785, "iPhone 13 Pro Max, official Apple product image", "iPhone 13 Pro Max, imagen oficial de Apple", "Apple", "https://www.apple.com/shop/buy-iphone"),
    o("iphone-13-pro-max-3", 1082, 782, "iPhone 13 Pro Max in every color, official Apple image", "iPhone 13 Pro Max en todos los colores, imagen oficial de Apple", "Apple", "https://support.apple.com/en-us/108044"),
  ],
  "iphone-13": [
    o("iphone-13-1", 391, 518, "iPhone 13, official Apple product image", "iPhone 13, imagen oficial de Apple", "Apple", "https://www.apple.com/shop/buy-iphone"),
    o("iphone-13-2", 394, 518, "iPhone 13, official Apple product image", "iPhone 13, imagen oficial de Apple", "Apple", "https://www.apple.com/shop/buy-iphone"),
    o("iphone-13-3", 350, 520, "iPhone 13, official Apple product image", "iPhone 13, imagen oficial de Apple", "Apple", "https://www.apple.com/shop/buy-iphone"),
    o("iphone-13-4", 1080, 704, "iPhone 13 in every color, official Apple image", "iPhone 13 en todos los colores, imagen oficial de Apple", "Apple", "https://support.apple.com/en-us/108044"),
  ],
  "iphone-12-pro-max": [
    o("iphone-12-pro-max-1", 717, 955, "iPhone 12 Pro Max, official Apple product image", "iPhone 12 Pro Max, imagen oficial de Apple", "Apple", "https://www.apple.com/shop/buy-iphone"),
    o("iphone-12-pro-max-2", 717, 955, "iPhone 12 Pro Max, official Apple product image", "iPhone 12 Pro Max, imagen oficial de Apple", "Apple", "https://www.apple.com/shop/buy-iphone"),
    o("iphone-12-pro-max-3", 819, 756, "iPhone 12 Pro Max in every color, official Apple image", "iPhone 12 Pro Max en todos los colores, imagen oficial de Apple", "Apple", "https://support.apple.com/en-us/108044"),
  ],
  "iphone-12": [
    o("iphone-12-1", 654, 868, "iPhone 12, official Apple product image", "iPhone 12, imagen oficial de Apple", "Apple", "https://www.apple.com/shop/buy-iphone"),
    o("iphone-12-2", 654, 869, "iPhone 12, official Apple product image", "iPhone 12, imagen oficial de Apple", "Apple", "https://www.apple.com/shop/buy-iphone"),
    o("iphone-12-3", 1034, 712, "iPhone 12 in every color, official Apple image", "iPhone 12 en todos los colores, imagen oficial de Apple", "Apple", "https://support.apple.com/en-us/108044"),
  ],
  "iphone-11-pro-max": [
    o("iphone-11-pro-max-1", 962, 1293, "iPhone 11 Pro Max, official Apple product image", "iPhone 11 Pro Max, imagen oficial de Apple", "Apple", "https://www.apple.com/shop/buy-iphone"),
    o("iphone-11-pro-max-2", 962, 1292, "iPhone 11 Pro Max, official Apple product image", "iPhone 11 Pro Max, imagen oficial de Apple", "Apple", "https://www.apple.com/shop/buy-iphone"),
    o("iphone-11-pro-max-3", 1032, 774, "iPhone 11 Pro Max in every color, official Apple image", "iPhone 11 Pro Max en todos los colores, imagen oficial de Apple", "Apple", "https://support.apple.com/en-us/108044"),
  ],
  "iphone-11": [
    o("iphone-11-1", 915, 1221, "iPhone 11, official Apple product image", "iPhone 11, imagen oficial de Apple", "Apple", "https://www.apple.com/shop/buy-iphone"),
    o("iphone-11-2", 915, 1221, "iPhone 11, official Apple product image", "iPhone 11, imagen oficial de Apple", "Apple", "https://www.apple.com/shop/buy-iphone"),
    o("iphone-11-3", 812, 601, "iPhone 11 in every color, official Apple image", "iPhone 11 en todos los colores, imagen oficial de Apple", "Apple", "https://support.apple.com/en-us/108044"),
  ],
  "iphone-xs-max": [
    o("iphone-xs-max-1", 626, 1030, "iPhone XS Max, official Apple product image", "iPhone XS Max, imagen oficial de Apple", "Apple", "https://www.apple.com/shop/buy-iphone"),
    o("iphone-xs-max-2", 626, 1030, "iPhone XS Max, official Apple product image", "iPhone XS Max, imagen oficial de Apple", "Apple", "https://www.apple.com/shop/buy-iphone"),
    o("iphone-xs-max-3", 811, 760, "iPhone XS Max in every color, official Apple image", "iPhone XS Max en todos los colores, imagen oficial de Apple", "Apple", "https://support.apple.com/en-us/108044"),
  ],
  "iphone-xr": [
    o("iphone-xr-1", 632, 988, "iPhone XR, official Apple product image", "iPhone XR, imagen oficial de Apple", "Apple", "https://www.apple.com/shop/buy-iphone"),
    o("iphone-xr-2", 632, 989, "iPhone XR, official Apple product image", "iPhone XR, imagen oficial de Apple", "Apple", "https://www.apple.com/shop/buy-iphone"),
    o("iphone-xr-3", 969, 754, "iPhone XR in every color, official Apple image", "iPhone XR en todos los colores, imagen oficial de Apple", "Apple", "https://support.apple.com/en-us/108044"),
  ],
  "iphone-se-2": [
    o("iphone-se-2-1", 847, 1015, "iPhone SE (2nd generation), official Apple product image", "iPhone SE (2nd generation), imagen oficial de Apple", "Apple", "https://www.apple.com/shop/buy-iphone"),
    o("iphone-se-2-2", 847, 1015, "iPhone SE (2nd generation), official Apple product image", "iPhone SE (2nd generation), imagen oficial de Apple", "Apple", "https://www.apple.com/shop/buy-iphone"),
    o("iphone-se-2-3", 852, 738, "iPhone SE (2nd generation) in every color, official Apple image", "iPhone SE (2nd generation) en todos los colores, imagen oficial de Apple", "Apple", "https://support.apple.com/en-us/108044"),
  ],
  "ipad-pro-11-m2": [
    o("ipad-pro-11-m2-1", 914, 1028, "iPad Pro 11\" (4th generation), official Apple product image", "iPad Pro 11\" (4th generation), imagen oficial de Apple", "Apple", "https://www.apple.com/shop/buy-ipad"),
    o("ipad-pro-11-m2-2", 924, 892, "iPad Pro 11\" (4th generation) colors, official Apple product image", "iPad Pro 11\" (4th generation) colors, imagen oficial de Apple", "Apple", "https://support.apple.com/en-us/108043"),
  ],
  "ipad-11": [
    o("ipad-11-1", 1130, 1267, "iPad (11th generation) in Blue, official Apple product image", "iPad (11th generation) in Blue, imagen oficial de Apple", "Apple", "https://www.apple.com/shop/buy-ipad/ipad"),
    o("ipad-11-2", 1130, 1267, "iPad (11th generation) in Yellow, official Apple product image", "iPad (11th generation) in Yellow, imagen oficial de Apple", "Apple", "https://www.apple.com/shop/buy-ipad/ipad"),
    o("ipad-11-3", 1078, 902, "iPad (11th generation) colors, official Apple product image", "iPad (11th generation) colors, imagen oficial de Apple", "Apple", "https://support.apple.com/en-us/108043"),
  ],
  "ipad-mini-6": [
    o("ipad-mini-6-1", 822, 738, "iPad mini (6th generation) colors, official Apple product image", "iPad mini (6th generation) colors, imagen oficial de Apple", "Apple", "https://support.apple.com/en-us/108043"),
  ],
  "ipad-mini-5": [
    o("ipad-mini-5-1", 714, 732, "iPad mini (5th generation) colors, official Apple product image", "iPad mini (5th generation) colors, imagen oficial de Apple", "Apple", "https://support.apple.com/en-us/108043"),
  ],
  "ipad-9": [
    o("ipad-9-1", 780, 840, "iPad (9th generation) colors, official Apple product image", "iPad (9th generation) colors, imagen oficial de Apple", "Apple", "https://support.apple.com/en-us/108043"),
  ],
  "ipad-8": [
    o("ipad-8-1", 886, 842, "iPad (8th generation) colors, official Apple product image", "iPad (8th generation) colors, imagen oficial de Apple", "Apple", "https://support.apple.com/en-us/108043"),
  ],
  "ipad-6": [
    o("ipad-6-1", 884, 842, "iPad (6th generation) colors, official Apple product image", "iPad (6th generation) colors, imagen oficial de Apple", "Apple", "https://support.apple.com/en-us/108043"),
  ],
  "apple-watch-series-12": [
    o("apple-watch-series-12-1", 1176, 647, "Apple Watch Series 12, official Apple product image", "Apple Watch Series 12, imagen oficial de Apple", "Apple", "https://www.apple.com/shop/buy-watch/apple-watch"),
    o("apple-watch-series-12-2", 1264, 744, "Apple Watch Series 12 (GPS + Cellular) aluminum cases, official Apple product image", "Apple Watch Series 12 (GPS + Cellular) aluminum cases, imagen oficial de Apple", "Apple", "https://support.apple.com/en-us/108056"),
    o("apple-watch-series-12-3", 1512, 1009, "Apple Watch Series 12 close-up, official Apple product image", "Apple Watch Series 12 close-up, imagen oficial de Apple", "Apple", "https://www.apple.com/shop/buy-watch/apple-watch"),
  ],
  "apple-watch-series-11": [
    o("apple-watch-series-11-1", 1264, 744, "Apple Watch Series 11 (GPS + Cellular) aluminum cases, official Apple product image", "Apple Watch Series 11 (GPS + Cellular) aluminum cases, imagen oficial de Apple", "Apple", "https://support.apple.com/en-us/108056"),
    o("apple-watch-series-11-2", 1264, 744, "Apple Watch Series 11 (GPS + Cellular) titanium cases, official Apple product image", "Apple Watch Series 11 (GPS + Cellular) titanium cases, imagen oficial de Apple", "Apple", "https://support.apple.com/en-us/108056"),
  ],
  "apple-watch-se": [
    o("apple-watch-se-1", 1600, 1192, "Apple Watch SE 3 in every color, official Apple image", "Apple Watch SE 3 en todos los colores, imagen oficial de Apple", "Apple", "https://www.apple.com/shop/buy-watch/apple-watch-se"),
    o("apple-watch-se-2", 539, 641, "Apple Watch SE 3, official Apple product image", "Apple Watch SE 3, imagen oficial de Apple", "Apple", "https://www.apple.com/apple-watch-se-3/"),
    o("apple-watch-se-3", 1346, 1247, "Apple Watch SE 3, official Apple product image", "Apple Watch SE 3, imagen oficial de Apple", "Apple", "https://www.apple.com/newsroom/2025/09/apple-introduces-apple-watch-se-3/"),
  ],
  "macbook-air-13-m5": [
    o("macbook-air-13-m5-1", 1556, 631, "MacBook Air 13\" (M5) colors, official Apple product image", "MacBook Air 13\" (M5) colors, imagen oficial de Apple", "Apple", "https://support.apple.com/en-us/102869"),
    o("macbook-air-13-m5-2", 915, 530, "MacBook Air 13-inch and 15-inch, official Apple product image", "MacBook Air 13-inch and 15-inch, imagen oficial de Apple", "Apple", "https://www.apple.com/shop/buy-mac/macbook-air"),
  ],
  "macbook-air-13-m4": [
    o("macbook-air-13-m4-1", 856, 544, "MacBook Air 13\" (M4) in Midnight, official Apple product image", "MacBook Air 13\" (M4) in Midnight, imagen oficial de Apple", "Apple", "https://www.apple.com/shop/buy-mac/macbook-air"),
    o("macbook-air-13-m4-2", 856, 544, "MacBook Air 13\" (M4) in Sky Blue, official Apple product image", "MacBook Air 13\" (M4) in Sky Blue, imagen oficial de Apple", "Apple", "https://www.apple.com/shop/buy-mac/macbook-air"),
    o("macbook-air-13-m4-3", 1556, 631, "MacBook Air 13\" (M4) colors, official Apple product image", "MacBook Air 13\" (M4) colors, imagen oficial de Apple", "Apple", "https://support.apple.com/en-us/102869"),
  ],
  "macbook-air-15-m5": [
    o("macbook-air-15-m5-1", 941, 600, "MacBook Air 15\", official Apple product image", "MacBook Air 15\", imagen oficial de Apple", "Apple", "https://www.apple.com/shop/buy-mac/macbook-air"),
    o("macbook-air-15-m5-2", 915, 530, "MacBook Air 13-inch and 15-inch, official Apple product image", "MacBook Air 13-inch and 15-inch, imagen oficial de Apple", "Apple", "https://www.apple.com/shop/buy-mac/macbook-air"),
    o("macbook-air-15-m5-3", 869, 469, "MacBook Air side profile, official Apple product image", "MacBook Air side profile, imagen oficial de Apple", "Apple", "https://www.apple.com/shop/buy-mac/macbook-air"),
  ],
  "macbook-neo-13": [
    o("macbook-neo-13-1", 894, 570, "MacBook Neo 13\" in Indigo, official Apple product image", "MacBook Neo 13\" in Indigo, imagen oficial de Apple", "Apple", "https://www.apple.com/shop/buy-mac/macbook-neo"),
    o("macbook-neo-13-2", 1025, 629, "MacBook Neo colors, official Apple product image", "MacBook Neo colors, imagen oficial de Apple", "Apple", "https://www.apple.com/shop/buy-mac/macbook-neo"),
  ],
  "playstation-5": [
    o("playstation-5-1", 1411, 1538, "PlayStation 5 console (disc edition) with DualSense controller", "Consola PlayStation 5 (edición con disco) con control DualSense", "Sony", "https://www.playstation.com/en-us/ps5/"),
    o("playstation-5-2", 1410, 1538, "PlayStation 5 Digital Edition with DualSense controller", "PlayStation 5 Edición Digital con control DualSense", "Sony", "https://www.playstation.com/en-us/ps5/"),
  ],
  "playstation-5-pro": [
    o("playstation-5-pro-1", 1357, 1518, "PlayStation 5 Pro with DualSense controller", "PlayStation 5 Pro con control DualSense", "Sony", "https://www.playstation.com/en-us/ps5/ps5-pro/"),
    o("playstation-5-pro-2", 1528, 1119, "PlayStation 5 Pro close-up", "PlayStation 5 Pro de cerca", "Sony", "https://www.playstation.com/en-us/ps5/ps5-pro/"),
  ],
  "playstation-portal": [
    o("playstation-portal-1", 1516, 642, "PlayStation Portal remote player", "Reproductor remoto PlayStation Portal", "Sony", "https://www.playstation.com/en-us/accessories/playstation-portal-remote-player/"),
    o("playstation-portal-2", 1528, 916, "PlayStation Portal in Midnight Black", "PlayStation Portal color Midnight Black", "Sony", "https://www.playstation.com/en-us/accessories/playstation-portal-remote-player/"),
    o("playstation-portal-3", 1518, 797, "PlayStation Portal at an angle", "PlayStation Portal en ángulo", "Sony", "https://www.playstation.com/en-us/accessories/playstation-portal-remote-player/"),
  ],
  "xbox-series-x": [
    o("xbox-series-x-1", 925, 744, "Xbox Series X with controller", "Xbox Series X con control", "Microsoft", "https://www.xbox.com/en-US/consoles/xbox-series-x"),
    o("xbox-series-x-2", 925, 744, "Xbox Series X, front", "Xbox Series X, frente", "Microsoft", "https://www.xbox.com/en-US/consoles/xbox-series-x"),
    o("xbox-series-x-3", 925, 744, "Xbox Series X, back", "Xbox Series X, parte trasera", "Microsoft", "https://www.xbox.com/en-US/consoles/xbox-series-x"),
    o("xbox-series-x-4", 925, 744, "Xbox Series X box", "Caja del Xbox Series X", "Microsoft", "https://www.xbox.com/en-US/consoles/xbox-series-x"),
  ],
  "nintendo-switch-2": [
    o("nintendo-switch-2-1", 666, 450, "Nintendo Switch 2 in its dock with Joy-Con 2 controllers", "Nintendo Switch 2 en su base con controles Joy-Con 2", "Nintendo", "https://www.nintendo.com/us/gaming-systems/switch-2/"),
    o("nintendo-switch-2-2", 1554, 868, "Nintendo Switch 2 box", "Caja de Nintendo Switch 2", "Nintendo", "https://www.nintendo.com/us/gaming-systems/switch-2/"),
  ],
  "galaxy-s26-ultra": [
    o("galaxy-s26-ultra-1", 264, 508, "Galaxy S26 Ultra, official Samsung product image", "Galaxy S26 Ultra, imagen oficial de Samsung", "Samsung", "https://www.samsungmobilepress.com/media-assets/galaxy-s26-ultra"),
    o("galaxy-s26-ultra-2", 264, 508, "Galaxy S26 Ultra, official Samsung product image", "Galaxy S26 Ultra, imagen oficial de Samsung", "Samsung", "https://www.samsungmobilepress.com/media-assets/galaxy-s26-ultra"),
    o("galaxy-s26-ultra-3", 243, 529, "Galaxy S26 Ultra, official Samsung product image", "Galaxy S26 Ultra, imagen oficial de Samsung", "Samsung", "https://www.samsungmobilepress.com/media-assets/galaxy-s26-ultra"),
  ],
  "galaxy-s25-ultra": [
    o("galaxy-s25-ultra-1", 264, 508, "Galaxy S25 Ultra, official Samsung product image", "Galaxy S25 Ultra, imagen oficial de Samsung", "Samsung", "https://www.samsungmobilepress.com/media-assets/galaxy-s25-ultra"),
    o("galaxy-s25-ultra-2", 264, 508, "Galaxy S25 Ultra, official Samsung product image", "Galaxy S25 Ultra, imagen oficial de Samsung", "Samsung", "https://www.samsungmobilepress.com/media-assets/galaxy-s25-ultra"),
    o("galaxy-s25-ultra-3", 242, 525, "Galaxy S25 Ultra, official Samsung product image", "Galaxy S25 Ultra, imagen oficial de Samsung", "Samsung", "https://www.samsungmobilepress.com/media-assets/galaxy-s25-ultra"),
  ],
  "galaxy-s23-ultra": [
    o("galaxy-s23-ultra-1", 493, 503, "Galaxy S23 Ultra, official Samsung product image", "Galaxy S23 Ultra, imagen oficial de Samsung", "Samsung", "https://www.samsungmobilepress.com/media-assets/galaxy-s23-ultra"),
    o("galaxy-s23-ultra-2", 261, 503, "Galaxy S23 Ultra, official Samsung product image", "Galaxy S23 Ultra, imagen oficial de Samsung", "Samsung", "https://www.samsungmobilepress.com/media-assets/galaxy-s23-ultra"),
  ],
  "galaxy-s23": [
    o("galaxy-s23-1", 379, 449, "Galaxy S23, official Samsung product image", "Galaxy S23, imagen oficial de Samsung", "Samsung", "https://www.samsungmobilepress.com/media-assets/galaxy-s23"),
    o("galaxy-s23-2", 238, 449, "Galaxy S23, official Samsung product image", "Galaxy S23, imagen oficial de Samsung", "Samsung", "https://www.samsungmobilepress.com/media-assets/galaxy-s23"),
    o("galaxy-s23-3", 218, 467, "Galaxy S23, official Samsung product image", "Galaxy S23, imagen oficial de Samsung", "Samsung", "https://www.samsungmobilepress.com/media-assets/galaxy-s23"),
  ],
  "galaxy-s22-ultra": [
    o("galaxy-s22-ultra-1", 494, 506, "Galaxy S22 Ultra, official Samsung product image", "Galaxy S22 Ultra, imagen oficial de Samsung", "Samsung", "https://www.samsungmobilepress.com/media-assets/galaxy-s22-ultra"),
    o("galaxy-s22-ultra-2", 262, 506, "Galaxy S22 Ultra, official Samsung product image", "Galaxy S22 Ultra, imagen oficial de Samsung", "Samsung", "https://www.samsungmobilepress.com/media-assets/galaxy-s22-ultra"),
    o("galaxy-s22-ultra-3", 226, 505, "Galaxy S22 Ultra, official Samsung product image", "Galaxy S22 Ultra, imagen oficial de Samsung", "Samsung", "https://www.samsungmobilepress.com/media-assets/galaxy-s22-ultra"),
  ],
  "galaxy-s22-plus": [
    o("galaxy-s22-plus-1", 409, 487, "Galaxy S22+, official Samsung product image", "Galaxy S22+, imagen oficial de Samsung", "Samsung", "https://www.samsungmobilepress.com/media-assets/galaxy-s22-plus"),
    o("galaxy-s22-plus-2", 254, 487, "Galaxy S22+, official Samsung product image", "Galaxy S22+, imagen oficial de Samsung", "Samsung", "https://www.samsungmobilepress.com/media-assets/galaxy-s22-plus"),
    o("galaxy-s22-plus-3", 224, 485, "Galaxy S22+, official Samsung product image", "Galaxy S22+, imagen oficial de Samsung", "Samsung", "https://www.samsungmobilepress.com/media-assets/galaxy-s22-plus"),
  ],
  "galaxy-s22": [
    o("galaxy-s22-1", 382, 453, "Galaxy S22, official Samsung product image", "Galaxy S22, imagen oficial de Samsung", "Samsung", "https://www.samsungmobilepress.com/media-assets/galaxy-s22"),
    o("galaxy-s22-2", 237, 452, "Galaxy S22, official Samsung product image", "Galaxy S22, imagen oficial de Samsung", "Samsung", "https://www.samsungmobilepress.com/media-assets/galaxy-s22"),
    o("galaxy-s22-3", 210, 452, "Galaxy S22, official Samsung product image", "Galaxy S22, imagen oficial de Samsung", "Samsung", "https://www.samsungmobilepress.com/media-assets/galaxy-s22"),
  ],
  "galaxy-s21-ultra": [
    o("galaxy-s21-ultra-1", 276, 549, "Galaxy S21 Ultra, official Samsung product image", "Galaxy S21 Ultra, imagen oficial de Samsung", "Samsung", "https://www.samsungmobilepress.com/media-assets/galaxy-s21-ultra"),
    o("galaxy-s21-ultra-2", 276, 549, "Galaxy S21 Ultra, official Samsung product image", "Galaxy S21 Ultra, imagen oficial de Samsung", "Samsung", "https://www.samsungmobilepress.com/media-assets/galaxy-s21-ultra"),
  ],
  "galaxy-z-fold7": [
    o("galaxy-z-fold7-1", 273, 532, "Galaxy Z Fold7, official Samsung product image", "Galaxy Z Fold7, imagen oficial de Samsung", "Samsung", "https://www.samsungmobilepress.com/media-assets/galaxy-z-fold7"),
    o("galaxy-z-fold7-2", 406, 533, "Galaxy Z Fold7, official Samsung product image", "Galaxy Z Fold7, imagen oficial de Samsung", "Samsung", "https://www.samsungmobilepress.com/media-assets/galaxy-z-fold7"),
    o("galaxy-z-fold7-3", 279, 533, "Galaxy Z Fold7, official Samsung product image", "Galaxy Z Fold7, imagen oficial de Samsung", "Samsung", "https://www.samsungmobilepress.com/media-assets/galaxy-z-fold7"),
  ],
  "galaxy-z-flip7": [
    o("galaxy-z-flip7-1", 245, 282, "Galaxy Z Flip7, official Samsung product image", "Galaxy Z Flip7, imagen oficial de Samsung", "Samsung", "https://www.samsungmobilepress.com/media-assets/galaxy-z-flip7"),
    o("galaxy-z-flip7-2", 408, 461, "Galaxy Z Flip7, official Samsung product image", "Galaxy Z Flip7, imagen oficial de Samsung", "Samsung", "https://www.samsungmobilepress.com/media-assets/galaxy-z-flip7"),
    o("galaxy-z-flip7-3", 451, 550, "Galaxy Z Flip7, official Samsung product image", "Galaxy Z Flip7, imagen oficial de Samsung", "Samsung", "https://www.samsungmobilepress.com/media-assets/galaxy-z-flip7"),
  ],
  "galaxy-z-fold6": [
    o("galaxy-z-fold6-1", 244, 498, "Galaxy Z Fold6, official Samsung product image", "Galaxy Z Fold6, imagen oficial de Samsung", "Samsung", "https://www.samsungmobilepress.com/media-assets/galaxy-z-fold6"),
    o("galaxy-z-fold6-2", 380, 510, "Galaxy Z Fold6, official Samsung product image", "Galaxy Z Fold6, imagen oficial de Samsung", "Samsung", "https://www.samsungmobilepress.com/media-assets/galaxy-z-fold6"),
    o("galaxy-z-fold6-3", 243, 497, "Galaxy Z Fold6, official Samsung product image", "Galaxy Z Fold6, imagen oficial de Samsung", "Samsung", "https://www.samsungmobilepress.com/media-assets/galaxy-z-fold6"),
  ],
  "galaxy-z-fold5": [
    o("galaxy-z-fold5-1", 256, 533, "Galaxy Z Fold5, official Samsung product image", "Galaxy Z Fold5, imagen oficial de Samsung", "Samsung", "https://www.samsungmobilepress.com/media-assets/galaxy-z-fold5"),
    o("galaxy-z-fold5-2", 390, 533, "Galaxy Z Fold5, official Samsung product image", "Galaxy Z Fold5, imagen oficial de Samsung", "Samsung", "https://www.samsungmobilepress.com/media-assets/galaxy-z-fold5"),
    o("galaxy-z-fold5-3", 257, 533, "Galaxy Z Fold5, official Samsung product image", "Galaxy Z Fold5, imagen oficial de Samsung", "Samsung", "https://www.samsungmobilepress.com/media-assets/galaxy-z-fold5"),
  ],
  "galaxy-z-flip4": [
    o("galaxy-z-flip4-2", 236, 272, "Galaxy Z Flip4, official Samsung product image", "Galaxy Z Flip4, imagen oficial de Samsung", "Samsung", "https://www.samsungmobilepress.com/media-assets/galaxy-z-flip4"),
    o("galaxy-z-flip4-4", 401, 458, "Galaxy Z Flip4, official Samsung product image", "Galaxy Z Flip4, imagen oficial de Samsung", "Samsung", "https://www.samsungmobilepress.com/media-assets/galaxy-z-flip4"),
    o("galaxy-z-flip4-3", 256, 530, "Galaxy Z Flip4, official Samsung product image", "Galaxy Z Flip4, imagen oficial de Samsung", "Samsung", "https://www.samsungmobilepress.com/media-assets/galaxy-z-flip4"),
    o("galaxy-z-flip4-1", 235, 272, "Galaxy Z Flip4, official Samsung product image", "Galaxy Z Flip4, imagen oficial de Samsung", "Samsung", "https://www.samsungmobilepress.com/media-assets/galaxy-z-flip4"),
  ],
  "galaxy-a54": [
    o("galaxy-a54-1", 432, 541, "Galaxy A54 5G, official Samsung product image", "Galaxy A54 5G, imagen oficial de Samsung", "Samsung", "https://www.samsungmobilepress.com/media-assets/galaxy-a54-5g"),
    o("galaxy-a54-2", 285, 541, "Galaxy A54 5G, official Samsung product image", "Galaxy A54 5G, imagen oficial de Samsung", "Samsung", "https://www.samsungmobilepress.com/media-assets/galaxy-a54-5g"),
    o("galaxy-a54-3", 254, 542, "Galaxy A54 5G, official Samsung product image", "Galaxy A54 5G, imagen oficial de Samsung", "Samsung", "https://www.samsungmobilepress.com/media-assets/galaxy-a54-5g"),
  ],
  "galaxy-s24-ultra": [
    o("galaxy-s24-ultra-1", 1554, 1087, "Galaxy S24 Ultra, in Titanium Black, official Samsung product image", "Galaxy S24 Ultra, color Titanium Black, imagen oficial de Samsung", "Samsung", "https://www.samsung.com/ph/smartphones/galaxy-s24-ultra/buy/"),
    o("galaxy-s24-ultra-2", 1554, 1087, "Galaxy S24 Ultra, in Titanium Gray, official Samsung product image", "Galaxy S24 Ultra, color Titanium Gray, imagen oficial de Samsung", "Samsung", "https://www.samsung.com/ph/smartphones/galaxy-s24-ultra/buy/"),
    o("galaxy-s24-ultra-3", 1554, 1087, "Galaxy S24 Ultra, in Titanium Violet, official Samsung product image", "Galaxy S24 Ultra, color Titanium Violet, imagen oficial de Samsung", "Samsung", "https://www.samsung.com/ph/smartphones/galaxy-s24-ultra/buy/"),
    o("galaxy-s24-ultra-4", 1554, 1087, "Galaxy S24 Ultra, in Titanium Yellow, official Samsung product image", "Galaxy S24 Ultra, color Titanium Yellow, imagen oficial de Samsung", "Samsung", "https://www.samsung.com/ph/smartphones/galaxy-s24-ultra/buy/"),
  ],
  "galaxy-s24": [
    o("galaxy-s24-1", 1554, 1087, "Galaxy S24, in Onyx Black, official Samsung product image", "Galaxy S24, color Onyx Black, imagen oficial de Samsung", "Samsung", "https://www.samsung.com/ph/smartphones/galaxy-s24/buy/"),
    o("galaxy-s24-2", 1554, 1087, "Galaxy S24, in Marble Gray, official Samsung product image", "Galaxy S24, color Marble Gray, imagen oficial de Samsung", "Samsung", "https://www.samsung.com/ph/smartphones/galaxy-s24/buy/"),
    o("galaxy-s24-3", 1554, 1087, "Galaxy S24, in Cobalt Violet, official Samsung product image", "Galaxy S24, color Cobalt Violet, imagen oficial de Samsung", "Samsung", "https://www.samsung.com/ph/smartphones/galaxy-s24/buy/"),
    o("galaxy-s24-4", 1554, 1087, "Galaxy S24, in Amber Yellow, official Samsung product image", "Galaxy S24, color Amber Yellow, imagen oficial de Samsung", "Samsung", "https://www.samsung.com/ph/smartphones/galaxy-s24/buy/"),
  ],
  "galaxy-s21": [
    o("galaxy-s21-1", 356, 356, "Galaxy S21 5G, in Phantom Gray, official Samsung product image", "Galaxy S21 5G, color Phantom Gray, imagen oficial de Samsung", "Samsung", "https://www.samsung.com/uk/smartphones/galaxy-s21-5g/buy/"),
    o("galaxy-s21-2", 356, 356, "Galaxy S21 5G, in Phantom Violet, official Samsung product image", "Galaxy S21 5G, color Phantom Violet, imagen oficial de Samsung", "Samsung", "https://www.samsung.com/uk/smartphones/galaxy-s21-5g/buy/"),
    o("galaxy-s21-3", 356, 356, "Galaxy S21 5G, in Phantom White, official Samsung product image", "Galaxy S21 5G, color Phantom White, imagen oficial de Samsung", "Samsung", "https://www.samsung.com/uk/smartphones/galaxy-s21-5g/buy/"),
    o("galaxy-s21-4", 356, 356, "Galaxy S21 5G, in Phantom Pink, official Samsung product image", "Galaxy S21 5G, color Phantom Pink, imagen oficial de Samsung", "Samsung", "https://www.samsung.com/uk/smartphones/galaxy-s21-5g/buy/"),
  ],
  "galaxy-s21-plus": [
    o("galaxy-s21-plus-1", 356, 356, "Galaxy S21+ 5G, in Phantom Black, official Samsung product image", "Galaxy S21+ 5G, color Phantom Black, imagen oficial de Samsung", "Samsung", "https://www.samsung.com/uk/smartphones/galaxy-s21-5g/buy/"),
  ],
  "galaxy-note20-ultra": [
    o("galaxy-note20-ultra-1", 1554, 1087, "Galaxy Note20 Ultra 5G, in Mystic Black with S Pen, official Samsung product image", "Galaxy Note20 Ultra 5G, color Mystic Black con S Pen, imagen oficial de Samsung", "Samsung", "https://www.samsung.com/uk/business/smartphones/galaxy-note/galaxy-note20-ultra-5g-256gb-sm-n986-sm-n986bzkgeua/buy"),
    o("galaxy-note20-ultra-2", 1554, 1087, "Galaxy Note20 Ultra 5G, in Mystic Black, back, official Samsung product image", "Galaxy Note20 Ultra 5G, color Mystic Black, parte trasera, imagen oficial de Samsung", "Samsung", "https://www.samsung.com/uk/business/smartphones/galaxy-note/galaxy-note20-ultra-5g-256gb-sm-n986-sm-n986bzkgeua/buy"),
    o("galaxy-note20-ultra-3", 1554, 1087, "Galaxy Note20 Ultra 5G, front, official Samsung product image", "Galaxy Note20 Ultra 5G, frente, imagen oficial de Samsung", "Samsung", "https://www.samsung.com/uk/business/smartphones/galaxy-note/galaxy-note20-ultra-5g-256gb-sm-n986-sm-n986bzkgeua/buy"),
    o("galaxy-note20-ultra-4", 1554, 1087, "Galaxy Note20 Ultra 5G, with S Pen, official Samsung product image", "Galaxy Note20 Ultra 5G, con S Pen, imagen oficial de Samsung", "Samsung", "https://www.samsung.com/uk/business/smartphones/galaxy-note/galaxy-note20-ultra-5g-256gb-sm-n986-sm-n986bzkgeua/buy"),
  ],
  "galaxy-s20-ultra": [
    o("galaxy-s20-ultra-1", 1554, 1087, "Galaxy S20 Ultra 5G, in Cosmic Black, front, official Samsung product image", "Galaxy S20 Ultra 5G, color Cosmic Black, frente, imagen oficial de Samsung", "Samsung", "https://www.samsung.com/kz_ru/smartphones/galaxy-s/galaxy-s20-ultra-5g-cosmic-black-512gb-sm-g988bzkgskz/buy"),
  ],
  "galaxy-s20-plus": [
    o("galaxy-s20-plus-1", 1554, 1087, "Galaxy S20+ 5G, in Cosmic Black, back, official Samsung product image", "Galaxy S20+ 5G, color Cosmic Black, parte trasera, imagen oficial de Samsung", "Samsung", "https://www.samsung.com/ie/business/smartphones/galaxy-s/galaxy-s20-plus-enterprise-edition-sm-g986bzkdeea"),
    o("galaxy-s20-plus-2", 1554, 1087, "Galaxy S20+ 5G, front, official Samsung product image", "Galaxy S20+ 5G, frente, imagen oficial de Samsung", "Samsung", "https://www.samsung.com/ie/business/smartphones/galaxy-s/galaxy-s20-plus-enterprise-edition-sm-g986bzkdeea"),
    o("galaxy-s20-plus-3", 1554, 1087, "Galaxy S20+ 5G, angled view, official Samsung product image", "Galaxy S20+ 5G, vista en ángulo, imagen oficial de Samsung", "Samsung", "https://www.samsung.com/ie/business/smartphones/galaxy-s/galaxy-s20-plus-enterprise-edition-sm-g986bzkdeea"),
  ],
  "galaxy-note10-plus": [
    o("galaxy-note10-plus-1", 1554, 1087, "Galaxy Note10+, in Aura Glow with S Pen, official Samsung product image", "Galaxy Note10+, color Aura Glow con S Pen, imagen oficial de Samsung", "Samsung", "https://www.samsung.com/lb/business/smartphones/galaxy-note/galaxy-note10-plus-n975-sm-n975fzsdmid"),
    o("galaxy-note10-plus-2", 1554, 1087, "Galaxy Note10+, in Aura Glow, back, official Samsung product image", "Galaxy Note10+, color Aura Glow, parte trasera, imagen oficial de Samsung", "Samsung", "https://www.samsung.com/lb/business/smartphones/galaxy-note/galaxy-note10-plus-n975-sm-n975fzsdmid"),
    o("galaxy-note10-plus-3", 1554, 1087, "Galaxy Note10+, front with S Pen, official Samsung product image", "Galaxy Note10+, frente con S Pen, imagen oficial de Samsung", "Samsung", "https://www.samsung.com/lb/business/smartphones/galaxy-note/galaxy-note10-plus-n975-sm-n975fzsdmid"),
    o("galaxy-note10-plus-4", 1554, 1087, "Galaxy Note10+, angled view, official Samsung product image", "Galaxy Note10+, vista en ángulo, imagen oficial de Samsung", "Samsung", "https://www.samsung.com/lb/business/smartphones/galaxy-note/galaxy-note10-plus-n975-sm-n975fzsdmid"),
  ],
  "galaxy-s9-plus": [
    o("galaxy-s9-plus-1", 1076, 1341, "Galaxy S9+, in Midnight Black, official Samsung product image", "Galaxy S9+, color Midnight Black, imagen oficial de Samsung", "Samsung", "https://www.samsung.com/uk/smartphones/galaxy-s/galaxy-s9-plus-single-sim-cpo-black-128gb-sm5g965fzkebtu/buy"),
    o("galaxy-s9-plus-2", 1554, 1087, "Galaxy S9+, back, official Samsung product image", "Galaxy S9+, parte trasera, imagen oficial de Samsung", "Samsung", "https://www.samsung.com/uk/smartphones/galaxy-s/galaxy-s9-plus-single-sim-cpo-black-128gb-sm5g965fzkebtu/buy"),
    o("galaxy-s9-plus-3", 1554, 1087, "Galaxy S9+, front, official Samsung product image", "Galaxy S9+, frente, imagen oficial de Samsung", "Samsung", "https://www.samsung.com/uk/smartphones/galaxy-s/galaxy-s9-plus-single-sim-cpo-black-128gb-sm5g965fzkebtu/buy"),
    o("galaxy-s9-plus-4", 1554, 1087, "Galaxy S9+, angled view, official Samsung product image", "Galaxy S9+, vista en ángulo, imagen oficial de Samsung", "Samsung", "https://www.samsung.com/uk/smartphones/galaxy-s/galaxy-s9-plus-single-sim-cpo-black-128gb-sm5g965fzkebtu/buy"),
  ],
  "galaxy-a15": [
    o("galaxy-a15-1", 1554, 1087, "Galaxy A15 5G, in Blue Black, official Samsung product image", "Galaxy A15 5G, color Blue Black, imagen oficial de Samsung", "Samsung", "https://www.samsung.com/ie/business/smartphones/galaxy-a/galaxy-a15-5g-blue-black-128gb-sm-a156bzkdeub"),
    o("galaxy-a15-2", 1554, 1087, "Galaxy A15 5G, back, official Samsung product image", "Galaxy A15 5G, parte trasera, imagen oficial de Samsung", "Samsung", "https://www.samsung.com/ie/business/smartphones/galaxy-a/galaxy-a15-5g-blue-black-128gb-sm-a156bzkdeub"),
    o("galaxy-a15-3", 1554, 1087, "Galaxy A15 5G, front, official Samsung product image", "Galaxy A15 5G, frente, imagen oficial de Samsung", "Samsung", "https://www.samsung.com/ie/business/smartphones/galaxy-a/galaxy-a15-5g-blue-black-128gb-sm-a156bzkdeub"),
    o("galaxy-a15-4", 1554, 1087, "Galaxy A15 5G, angled view, official Samsung product image", "Galaxy A15 5G, vista en ángulo, imagen oficial de Samsung", "Samsung", "https://www.samsung.com/ie/business/smartphones/galaxy-a/galaxy-a15-5g-blue-black-128gb-sm-a156bzkdeub"),
  ],
  "galaxy-a13": [
    o("galaxy-a13-1", 1554, 1087, "Galaxy A13 5G, in Awesome Black, official Samsung product image", "Galaxy A13 5G, color Awesome Black, imagen oficial de Samsung", "Samsung", "https://www.samsung.com/ie/business/smartphones/galaxy-a/galaxy-a13-5g-awesome-black-64gb-sm-a136bzkueub"),
    o("galaxy-a13-2", 1554, 1087, "Galaxy A13 5G, back, official Samsung product image", "Galaxy A13 5G, parte trasera, imagen oficial de Samsung", "Samsung", "https://www.samsung.com/ie/business/smartphones/galaxy-a/galaxy-a13-5g-awesome-black-64gb-sm-a136bzkueub"),
    o("galaxy-a13-3", 1554, 1087, "Galaxy A13 5G, front, official Samsung product image", "Galaxy A13 5G, frente, imagen oficial de Samsung", "Samsung", "https://www.samsung.com/ie/business/smartphones/galaxy-a/galaxy-a13-5g-awesome-black-64gb-sm-a136bzkueub"),
    o("galaxy-a13-4", 1554, 1087, "Galaxy A13 5G, angled view, official Samsung product image", "Galaxy A13 5G, vista en ángulo, imagen oficial de Samsung", "Samsung", "https://www.samsung.com/ie/business/smartphones/galaxy-a/galaxy-a13-5g-awesome-black-64gb-sm-a136bzkueub"),
  ],
  "galaxy-a03s": [
    o("galaxy-a03s-1", 1554, 1087, "Galaxy A03s, in Black, front, official Samsung product image", "Galaxy A03s, color Black, frente, imagen oficial de Samsung", "Samsung", "https://www.samsung.com/gr/smartphones/galaxy-a/galaxy-a03s-black-32gb-sm-a037gzkneue/buy"),
  ],
  "samsung-tv-65": [
    o("samsung-tv-65-1", 1554, 1087, "Samsung 65\" Crystal UHD U8000H 4K TV, angled view, official Samsung product image", "Samsung 65\" Crystal UHD U8000H TV 4K, vista en ángulo, imagen oficial de Samsung", "Samsung", "https://www.samsung.com/us/tvs/uhd-4k-tv/65-inch-crystal-uhd-4k-tv-u8000h-sku-un65u8000hfxza/"),
    o("samsung-tv-65-2", 1554, 1087, "Samsung 65\" Crystal UHD U8000H 4K TV, front, official Samsung product image", "Samsung 65\" Crystal UHD U8000H TV 4K, frente, imagen oficial de Samsung", "Samsung", "https://www.samsung.com/us/tvs/uhd-4k-tv/65-inch-crystal-uhd-4k-tv-u8000h-sku-un65u8000hfxza/"),
    o("samsung-tv-65-3", 1554, 1087, "Samsung 65\" Crystal UHD U8000H 4K TV, side profile, official Samsung product image", "Samsung 65\" Crystal UHD U8000H TV 4K, perfil lateral, imagen oficial de Samsung", "Samsung", "https://www.samsung.com/us/tvs/uhd-4k-tv/65-inch-crystal-uhd-4k-tv-u8000h-sku-un65u8000hfxza/"),
    o("samsung-tv-65-4", 1528, 1178, "Samsung 65\" Crystal UHD U8000H 4K TV, dimensions, official Samsung product image", "Samsung 65\" Crystal UHD U8000H TV 4K, medidas, imagen oficial de Samsung", "Samsung", "https://www.samsung.com/us/tvs/uhd-4k-tv/65-inch-crystal-uhd-4k-tv-u8000h-sku-un65u8000hfxza/"),
  ],
  "apple-watch-ultra-2": [
    o("apple-watch-ultra-2-1", 1038, 1150, "Apple Watch Ultra 2, official Apple product image", "Apple Watch Ultra 2, imagen oficial de Apple", "Apple", "https://www.apple.com/newsroom/2023/09/apple-unveils-apple-watch-ultra-2/"),
    o("apple-watch-ultra-2-2", 1016, 732, "Apple Watch Ultra 2 in every color, official Apple image", "Apple Watch Ultra 2 en todos los colores, imagen oficial de Apple", "Apple", "https://support.apple.com/en-us/111832"),
    o("apple-watch-ultra-2-3", 1007, 1169, "Apple Watch Ultra 2, official Apple product image", "Apple Watch Ultra 2, imagen oficial de Apple", "Apple", "https://www.apple.com/newsroom/2023/09/apple-unveils-apple-watch-ultra-2/"),
    o("apple-watch-ultra-2-4", 1003, 1172, "Apple Watch Ultra 2, official Apple product image", "Apple Watch Ultra 2, imagen oficial de Apple", "Apple", "https://www.apple.com/newsroom/2023/09/apple-unveils-apple-watch-ultra-2/"),
  ],
  "apple-watch-ultra-3": [
    o("apple-watch-ultra-3-1", 1012, 730, "Apple Watch Ultra 3 in every color, official Apple image", "Apple Watch Ultra 3 en todos los colores, imagen oficial de Apple", "Apple", "https://support.apple.com/en-us/125095"),
    o("apple-watch-ultra-3-2", 1472, 806, "Apple Watch Ultra 3, official Apple product image", "Apple Watch Ultra 3, imagen oficial de Apple", "Apple", "https://www.apple.com/newsroom/2025/09/introducing-apple-watch-ultra-3/"),
  ],
  "airpods-pro-3": [
    o("airpods-pro-3-1", 1383, 1600, "AirPods Pro 3, official Apple product image", "AirPods Pro 3, imagen oficial de Apple", "Apple", "https://www.apple.com/shop/buy-airpods/airpods-pro-3"),
    o("airpods-pro-3-2", 1600, 1195, "AirPods Pro 3, official Apple product image", "AirPods Pro 3, imagen oficial de Apple", "Apple", "https://www.apple.com/shop/buy-airpods/airpods-pro-3"),
    o("airpods-pro-3-3", 720, 787, "AirPods Pro 3, official Apple product image", "AirPods Pro 3, imagen oficial de Apple", "Apple", "https://www.apple.com/shop/buy-airpods/airpods-pro-3"),
  ],
  "airpods-4": [
    o("airpods-4-1", 711, 1016, "AirPods 4, official Apple product image", "AirPods 4, imagen oficial de Apple", "Apple", "https://support.apple.com/en-us/121204"),
    o("airpods-4-2", 961, 1015, "AirPods 4, official Apple product image", "AirPods 4, imagen oficial de Apple", "Apple", "https://support.apple.com/en-us/121203"),
  ],
  "airpods-max": [
    o("airpods-max-1", 926, 1017, "AirPods Max in every color, official Apple image", "AirPods Max en todos los colores, imagen oficial de Apple", "Apple", "https://support.apple.com/en-us/121205"),
    o("airpods-max-2", 713, 1600, "AirPods Max, official Apple product image", "AirPods Max, imagen oficial de Apple", "Apple", "https://www.apple.com/newsroom/2024/09/apple-introduces-airpods-4-and-a-hearing-health-experience-with-airpods-pro-2/"),
  ],
  "galaxy-watch8-classic": [
    o("galaxy-watch8-classic-1", 493, 573, "Samsung Galaxy Watch8 Classic, official Samsung product image", "Samsung Galaxy Watch8 Classic, imagen oficial de Samsung", "Samsung", "https://www.samsung.com/us/watches/galaxy-watch8-classic/buy/galaxy-watch8-classic-46mm-black-wi-fi-bluetooth-sku-sm-l500nzkaxaa/"),
    o("galaxy-watch8-classic-2", 493, 571, "Samsung Galaxy Watch8 Classic, official Samsung product image", "Samsung Galaxy Watch8 Classic, imagen oficial de Samsung", "Samsung", "https://www.samsung.com/us/watches/galaxy-watch8-classic/buy/galaxy-watch8-classic-46mm-black-wi-fi-bluetooth-sku-sm-l500nzkaxaa/"),
    o("galaxy-watch8-classic-3", 504, 569, "Samsung Galaxy Watch8 Classic (back), official Samsung product image", "Samsung Galaxy Watch8 Classic (reverso), imagen oficial de Samsung", "Samsung", "https://www.samsung.com/us/watches/galaxy-watch8-classic/buy/galaxy-watch8-classic-46mm-black-wi-fi-bluetooth-sku-sm-l500nzkaxaa/"),
    o("galaxy-watch8-classic-4", 505, 585, "Samsung Galaxy Watch8 Classic in White, official Samsung product image", "Samsung Galaxy Watch8 Classic en blanco, imagen oficial de Samsung", "Samsung", "https://www.samsung.com/us/watches/galaxy-watch8-classic/buy/galaxy-watch8-classic-46mm-black-wi-fi-bluetooth-sku-sm-l500nzkaxaa/"),
  ],
  "galaxy-watch4-classic": [
    o("galaxy-watch4-classic-1", 994, 1178, "Samsung Galaxy Watch4 Classic, official Samsung product image", "Samsung Galaxy Watch4 Classic, imagen oficial de Samsung", "Samsung", "https://www.samsung.com/us/support/mobile/wearables/?modelCode=SM-R880NZKAXAA"),
    o("galaxy-watch4-classic-2", 740, 1175, "Samsung Galaxy Watch4 Classic, official Samsung product image", "Samsung Galaxy Watch4 Classic, imagen oficial de Samsung", "Samsung", "https://www.samsung.com/us/support/mobile/wearables/?modelCode=SM-R880NZKAXAA"),
    o("galaxy-watch4-classic-3", 1073, 1176, "Samsung Galaxy Watch4 Classic (back), official Samsung product image", "Samsung Galaxy Watch4 Classic (reverso), imagen oficial de Samsung", "Samsung", "https://www.samsung.com/us/support/mobile/wearables/?modelCode=SM-R880NZKAXAA"),
    o("galaxy-watch4-classic-4", 994, 1178, "Samsung Galaxy Watch4 Classic in Silver, official Samsung product image", "Samsung Galaxy Watch4 Classic en plata, imagen oficial de Samsung", "Samsung", "https://www.samsung.com/us/support/mobile/wearables/?modelCode=SM-R880NZSAXAA"),
  ],
  "galaxy-buds-fe": [
    o("galaxy-buds-fe-1", 1490, 738, "Samsung Galaxy Buds FE, official Samsung product image", "Samsung Galaxy Buds FE, imagen oficial de Samsung", "Samsung", "https://www.samsung.com/us/support/mobile/audio/?modelCode=SM-R400NZAAXAR"),
    o("galaxy-buds-fe-2", 966, 1102, "Samsung Galaxy Buds FE, official Samsung product image", "Samsung Galaxy Buds FE, imagen oficial de Samsung", "Samsung", "https://www.samsung.com/us/support/mobile/audio/?modelCode=SM-R400NZAAXAR"),
    o("galaxy-buds-fe-3", 1493, 738, "Samsung Galaxy Buds FE in White, official Samsung product image", "Samsung Galaxy Buds FE en blanco, imagen oficial de Samsung", "Samsung", "https://www.samsung.com/us/support/mobile/audio/?modelCode=SM-R400NZWAXAR"),
    o("galaxy-buds-fe-4", 945, 1098, "Samsung Galaxy Buds FE in White, official Samsung product image", "Samsung Galaxy Buds FE en blanco, imagen oficial de Samsung", "Samsung", "https://www.samsung.com/us/support/mobile/audio/?modelCode=SM-R400NZWAXAR"),
  ],
  "galaxy-buds2-pro": [
    o("galaxy-buds2-pro-1", 1273, 504, "Samsung Galaxy Buds2 Pro, official Samsung product image", "Samsung Galaxy Buds2 Pro, imagen oficial de Samsung", "Samsung", "https://www.samsung.com/us/support/mobile/audio/?modelCode=SM-R510NZAAXAR"),
    o("galaxy-buds2-pro-2", 783, 1054, "Samsung Galaxy Buds2 Pro in the open case, official Samsung product image", "Samsung Galaxy Buds2 Pro en el estuche abierto, imagen oficial de Samsung", "Samsung", "https://www.samsung.com/us/support/mobile/audio/?modelCode=SM-R510NZAAXAR"),
    o("galaxy-buds2-pro-3", 1232, 504, "Samsung Galaxy Buds2 Pro, official Samsung product image", "Samsung Galaxy Buds2 Pro, imagen oficial de Samsung", "Samsung", "https://www.samsung.com/us/support/mobile/audio/?modelCode=SM-R510NZAAXAR"),
    o("galaxy-buds2-pro-4", 1272, 502, "Samsung Galaxy Buds2 Pro in White, official Samsung product image", "Samsung Galaxy Buds2 Pro en blanco, imagen oficial de Samsung", "Samsung", "https://www.samsung.com/us/support/mobile/audio/?modelCode=SM-R510NZWAXAR"),
  ],
  "galaxy-buds4-pro": [
    o("galaxy-buds4-pro-1", 575, 431, "Samsung Galaxy Buds4 Pro, official Samsung product image", "Samsung Galaxy Buds4 Pro, imagen oficial de Samsung", "Samsung", "https://www.samsung.com/us/audio-sound/galaxy-buds4-pro/buy/galaxy-buds4-pro-black-sku-sm-r640nzkaxar/"),
    o("galaxy-buds4-pro-2", 693, 417, "Samsung Galaxy Buds4 Pro, official Samsung product image", "Samsung Galaxy Buds4 Pro, imagen oficial de Samsung", "Samsung", "https://www.samsung.com/us/audio-sound/galaxy-buds4-pro/buy/galaxy-buds4-pro-black-sku-sm-r640nzkaxar/"),
    o("galaxy-buds4-pro-3", 316, 424, "Samsung Galaxy Buds4 Pro in the open case, official Samsung product image", "Samsung Galaxy Buds4 Pro en el estuche abierto, imagen oficial de Samsung", "Samsung", "https://www.samsung.com/us/audio-sound/galaxy-buds4-pro/buy/galaxy-buds4-pro-black-sku-sm-r640nzkaxar/"),
    o("galaxy-buds4-pro-4", 569, 427, "Samsung Galaxy Buds4 Pro in White, official Samsung product image", "Samsung Galaxy Buds4 Pro en blanco, imagen oficial de Samsung", "Samsung", "https://www.samsung.com/us/audio-sound/galaxy-buds4-pro/buy/galaxy-buds4-pro-black-sku-sm-r640nzkaxar/"),
  ],
  "jbl-boombox-3": [
    o("jbl-boombox-3-1", 1600, 960, "JBL Boombox 3, official JBL product image", "JBL Boombox 3, imagen oficial de JBL", "JBL", "https://news.jbl.com/en-GB/208268-new-jbl-pulse-5-and-boombox-3-bring-improved-sound-and-design-to-portable-speakers-line-up/"),
    o("jbl-boombox-3-2", 1600, 668, "JBL Boombox 3, official JBL product image", "JBL Boombox 3, imagen oficial de JBL", "JBL", "https://news.jbl.com/en-GB/208268-new-jbl-pulse-5-and-boombox-3-bring-improved-sound-and-design-to-portable-speakers-line-up/"),
    o("jbl-boombox-3-3", 1484, 874, "JBL Boombox 3 in Squad camo, official JBL product image", "JBL Boombox 3 en camuflaje Squad, imagen oficial de JBL", "JBL", "https://news.jbl.com/en-GB/208268-new-jbl-pulse-5-and-boombox-3-bring-improved-sound-and-design-to-portable-speakers-line-up/"),
  ],
  "jbl-flip-7": [
    o("jbl-flip-7-1", 1600, 839, "JBL Flip 7, official JBL product image", "JBL Flip 7, imagen oficial de JBL", "JBL", "https://news.jbl.com/en-GB/247735-jbl-unleashes-next-generation-flip-7-and-charge-6-with-bigger-sound-and-deeper-bass/"),
    o("jbl-flip-7-2", 1600, 826, "JBL Flip 7 in Blue, official JBL product image", "JBL Flip 7 en azul, imagen oficial de JBL", "JBL", "https://news.jbl.com/en-GB/247735-jbl-unleashes-next-generation-flip-7-and-charge-6-with-bigger-sound-and-deeper-bass/"),
    o("jbl-flip-7-3", 1600, 825, "JBL Flip 7 in White, official JBL product image", "JBL Flip 7 en blanco, imagen oficial de JBL", "JBL", "https://news.jbl.com/en-GB/247735-jbl-unleashes-next-generation-flip-7-and-charge-6-with-bigger-sound-and-deeper-bass/"),
    o("jbl-flip-7-4", 1600, 372, "JBL Flip 7 in every color, official JBL image", "JBL Flip 7 en todos los colores, imagen oficial de JBL", "JBL", "https://news.jbl.com/en-GB/247735-jbl-unleashes-next-generation-flip-7-and-charge-6-with-bigger-sound-and-deeper-bass/"),
  ],
  "jbl-charge-6": [
    o("jbl-charge-6-1", 1600, 1012, "JBL Charge 6, official JBL product image", "JBL Charge 6, imagen oficial de JBL", "JBL", "https://news.jbl.com/en-GB/247735-jbl-unleashes-next-generation-flip-7-and-charge-6-with-bigger-sound-and-deeper-bass/"),
    o("jbl-charge-6-2", 1600, 1386, "JBL Charge 6 with its strap, official JBL product image", "JBL Charge 6 con su correa, imagen oficial de JBL", "JBL", "https://news.jbl.com/en-GB/247735-jbl-unleashes-next-generation-flip-7-and-charge-6-with-bigger-sound-and-deeper-bass/"),
    o("jbl-charge-6-3", 1600, 999, "JBL Charge 6 in Blue, official JBL product image", "JBL Charge 6 en azul, imagen oficial de JBL", "JBL", "https://news.jbl.com/en-GB/247735-jbl-unleashes-next-generation-flip-7-and-charge-6-with-bigger-sound-and-deeper-bass/"),
    o("jbl-charge-6-4", 1600, 457, "JBL Charge 6 in every color, official JBL image", "JBL Charge 6 en todos los colores, imagen oficial de JBL", "JBL", "https://news.jbl.com/en-GB/247735-jbl-unleashes-next-generation-flip-7-and-charge-6-with-bigger-sound-and-deeper-bass/"),
  ],
  "moto-g-5g-2025": [
    o("moto-g-5g-2025-1", 660, 899, "moto g 5G (2025), official Motorola product image", "moto g 5G (2025), imagen oficial de Motorola", "Motorola", "https://www.motorola.com/us/en/p/phones/moto-g/moto-g-2025/pmipmhh39mq"),
    o("moto-g-5g-2025-2", 348, 931, "moto g 5G (2025), official Motorola product image", "moto g 5G (2025), imagen oficial de Motorola", "Motorola", "https://www.motorola.com/us/en/p/phones/moto-g/moto-g-2025/pmipmhh39mq"),
    o("moto-g-5g-2025-3", 440, 899, "moto g 5G (2025), official Motorola product image", "moto g 5G (2025), imagen oficial de Motorola", "Motorola", "https://www.motorola.com/us/en/p/phones/moto-g/moto-g-2025/pmipmhh39mq"),
  ],
  "moto-g-stylus-5g": [
    o("moto-g-stylus-5g-1", 702, 864, "moto g stylus 5G (2024), official Motorola product image", "moto g stylus 5G (2024), imagen oficial de Motorola", "Motorola", "https://www.motorola.com/us/en/p/phones/moto-g/g-stylus-5g-gen-4/pmipmgr37mo"),
    o("moto-g-stylus-5g-2", 429, 870, "moto g stylus 5G (2024), official Motorola product image", "moto g stylus 5G (2024), imagen oficial de Motorola", "Motorola", "https://www.motorola.com/us/en/p/phones/moto-g/g-stylus-5g-gen-4/pmipmgr37mo"),
    o("moto-g-stylus-5g-3", 702, 864, "moto g stylus 5G (2024), official Motorola product image", "moto g stylus 5G (2024), imagen oficial de Motorola", "Motorola", "https://www.motorola.com/us/en/p/phones/moto-g/g-stylus-5g-gen-4/pmipmgr37mo"),
    o("moto-g-stylus-5g-4", 429, 870, "moto g stylus 5G (2024), official Motorola product image", "moto g stylus 5G (2024), imagen oficial de Motorola", "Motorola", "https://www.motorola.com/us/en/p/phones/moto-g/g-stylus-5g-gen-4/pmipmgr37mo"),
  ],
  "dell-15-dc15250": [
    o("dell-15-dc15250-1", 1600, 1058, "Dell 15 laptop (DC15250), official Dell product image", "Laptop Dell 15 (DC15250), imagen oficial de Dell", "Dell", "https://www.dell.com/en-us/shop/dell-laptops/spd/dell15laptopdc15250"),
    o("dell-15-dc15250-2", 1600, 985, "Dell 15 laptop (DC15250), official Dell product image", "Laptop Dell 15 (DC15250), imagen oficial de Dell", "Dell", "https://www.dell.com/en-us/shop/dell-laptops/spd/dell15laptopdc15250"),
    o("dell-15-dc15250-3", 1600, 1120, "Dell 15 laptop (DC15250), official Dell product image", "Laptop Dell 15 (DC15250), imagen oficial de Dell", "Dell", "https://www.dell.com/en-us/shop/dell-laptops/spd/dell15laptopdc15250"),
    o("dell-15-dc15250-4", 1600, 1164, "Dell 15 laptop (DC15250), official Dell product image", "Laptop Dell 15 (DC15250), imagen oficial de Dell", "Dell", "https://www.dell.com/en-us/shop/dell-laptops/spd/dell15laptopdc15250"),
  ],
  "hp-laptop-14": [
    o("hp-laptop-14-1", 1600, 1388, "HP Laptop 14 (14-dq6000 series), official HP product image", "HP Laptop 14 (serie 14-dq6000), imagen oficial de HP", "HP", "https://www.hp.com/ca-en/shop/products/laptops/hp-stream-14-dq6004ca-laptop-with-1-year-microsoft-365-b6md9ua-abl"),
    o("hp-laptop-14-2", 1600, 1372, "HP Laptop 14 (14-dq6000 series), official HP product image", "HP Laptop 14 (serie 14-dq6000), imagen oficial de HP", "HP", "https://www.hp.com/ca-en/shop/products/laptops/hp-stream-14-dq6004ca-laptop-with-1-year-microsoft-365-b6md9ua-abl"),
    o("hp-laptop-14-3", 1600, 1372, "HP Laptop 14 (14-dq6000 series), official HP product image", "HP Laptop 14 (serie 14-dq6000), imagen oficial de HP", "HP", "https://www.hp.com/ca-en/shop/products/laptops/hp-stream-14-dq6004ca-laptop-with-1-year-microsoft-365-b6md9ua-abl"),
  ],
  "galaxy-z-fold8-ultra": [
    o("galaxy-z-fold8-ultra-1", 945, 1250, "Galaxy Z Fold8 Ultra, official Samsung product image", "Galaxy Z Fold8 Ultra, imagen oficial de Samsung", "Samsung", "https://www.samsung.com/us/smartphones/galaxy-z-fold8-ultra/buy/"),
    o("galaxy-z-fold8-ultra-2", 1141, 1250, "Galaxy Z Fold8 Ultra, official Samsung product image", "Galaxy Z Fold8 Ultra, imagen oficial de Samsung", "Samsung", "https://www.samsung.com/us/smartphones/galaxy-z-fold8-ultra/buy/"),
    o("galaxy-z-fold8-ultra-3", 616, 1250, "Galaxy Z Fold8 Ultra, official Samsung product image", "Galaxy Z Fold8 Ultra, imagen oficial de Samsung", "Samsung", "https://www.samsung.com/us/smartphones/galaxy-z-fold8-ultra/buy/"),
    o("galaxy-z-fold8-ultra-4", 616, 1250, "Galaxy Z Fold8 Ultra, official Samsung product image", "Galaxy Z Fold8 Ultra, imagen oficial de Samsung", "Samsung", "https://www.samsung.com/us/smartphones/galaxy-z-fold8-ultra/buy/"),
  ],
  "galaxy-a36": [
    o("galaxy-a36-1", 925, 1172, "Galaxy A36 5G, official Samsung product image", "Galaxy A36 5G, imagen oficial de Samsung", "Samsung", "https://www.samsung.com/us/smartphones/galaxy-a36/buy/"),
    o("galaxy-a36-2", 603, 1172, "Galaxy A36 5G, official Samsung product image", "Galaxy A36 5G, imagen oficial de Samsung", "Samsung", "https://www.samsung.com/us/smartphones/galaxy-a36/buy/"),
    o("galaxy-a36-3", 556, 1230, "Galaxy A36 5G, official Samsung product image", "Galaxy A36 5G, imagen oficial de Samsung", "Samsung", "https://www.samsung.com/us/smartphones/galaxy-a36/buy/"),
    o("galaxy-a36-4", 555, 1230, "Galaxy A36 5G, official Samsung product image", "Galaxy A36 5G, imagen oficial de Samsung", "Samsung", "https://www.samsung.com/us/smartphones/galaxy-a36/buy/"),
  ],
  "galaxy-a35": [
    o("galaxy-a35-1", 1008, 1264, "Galaxy A35 5G, official Samsung product image", "Galaxy A35 5G, imagen oficial de Samsung", "Samsung", "https://www.samsung.com/latin_en/smartphones/galaxy-a/galaxy-a35-5g-awesome-navy-128gb-sm-a356ezkbgto/"),
    o("galaxy-a35-2", 655, 1265, "Galaxy A35 5G, official Samsung product image", "Galaxy A35 5G, imagen oficial de Samsung", "Samsung", "https://www.samsung.com/latin_en/smartphones/galaxy-a/galaxy-a35-5g-awesome-navy-128gb-sm-a356ezkbgto/"),
    o("galaxy-a35-3", 585, 1281, "Galaxy A35 5G, official Samsung product image", "Galaxy A35 5G, imagen oficial de Samsung", "Samsung", "https://www.samsung.com/latin_en/smartphones/galaxy-a/galaxy-a35-5g-awesome-navy-128gb-sm-a356ezkbgto/"),
    o("galaxy-a35-4", 586, 1281, "Galaxy A35 5G, official Samsung product image", "Galaxy A35 5G, imagen oficial de Samsung", "Samsung", "https://www.samsung.com/latin_en/smartphones/galaxy-a/galaxy-a35-5g-awesome-navy-128gb-sm-a356ezkbgto/"),
  ],
  "galaxy-a26": [
    o("galaxy-a26-1", 920, 1180, "Galaxy A26 5G, official Samsung product image", "Galaxy A26 5G, imagen oficial de Samsung", "Samsung", "https://www.samsung.com/us/smartphones/galaxy-a26/buy/"),
    o("galaxy-a26-2", 601, 1180, "Galaxy A26 5G, official Samsung product image", "Galaxy A26 5G, imagen oficial de Samsung", "Samsung", "https://www.samsung.com/us/smartphones/galaxy-a26/buy/"),
    o("galaxy-a26-3", 554, 1240, "Galaxy A26 5G, official Samsung product image", "Galaxy A26 5G, imagen oficial de Samsung", "Samsung", "https://www.samsung.com/us/smartphones/galaxy-a26/buy/"),
    o("galaxy-a26-4", 554, 1240, "Galaxy A26 5G, official Samsung product image", "Galaxy A26 5G, imagen oficial de Samsung", "Samsung", "https://www.samsung.com/us/smartphones/galaxy-a26/buy/"),
  ],
  "galaxy-a53": [
    o("galaxy-a53-1", 1001, 1251, "Galaxy A53 5G, official Samsung product image", "Galaxy A53 5G, imagen oficial de Samsung", "Samsung", "https://www.samsung.com/ph/smartphones/galaxy-a/galaxy-a53-5g-awesome-black-128gb-sm-a536ezkgphl/"),
    o("galaxy-a53-2", 628, 1251, "Galaxy A53 5G, official Samsung product image", "Galaxy A53 5G, imagen oficial de Samsung", "Samsung", "https://www.samsung.com/ph/smartphones/galaxy-a/galaxy-a53-5g-awesome-black-128gb-sm-a536ezkgphl/"),
    o("galaxy-a53-3", 549, 1252, "Galaxy A53 5G, official Samsung product image", "Galaxy A53 5G, imagen oficial de Samsung", "Samsung", "https://www.samsung.com/ph/smartphones/galaxy-a/galaxy-a53-5g-awesome-black-128gb-sm-a536ezkgphl/"),
    o("galaxy-a53-4", 549, 1251, "Galaxy A53 5G, official Samsung product image", "Galaxy A53 5G, imagen oficial de Samsung", "Samsung", "https://www.samsung.com/ph/smartphones/galaxy-a/galaxy-a53-5g-awesome-black-128gb-sm-a536ezkgphl/"),
  ],
  "galaxy-a16": [
    o("galaxy-a16-1", 948, 1198, "Galaxy A16 5G, official Samsung product image", "Galaxy A16 5G, imagen oficial de Samsung", "Samsung", "https://www.samsung.com/ca/smartphones/galaxy-a/galaxy-a16-5g-blue-black-128gb-sm-a166wzkaxac/"),
    o("galaxy-a16-2", 612, 1198, "Galaxy A16 5G, official Samsung product image", "Galaxy A16 5G, imagen oficial de Samsung", "Samsung", "https://www.samsung.com/ca/smartphones/galaxy-a/galaxy-a16-5g-blue-black-128gb-sm-a166wzkaxac/"),
    o("galaxy-a16-3", 545, 1210, "Galaxy A16 5G, official Samsung product image", "Galaxy A16 5G, imagen oficial de Samsung", "Samsung", "https://www.samsung.com/ca/smartphones/galaxy-a/galaxy-a16-5g-blue-black-128gb-sm-a166wzkaxac/"),
    o("galaxy-a16-4", 546, 1210, "Galaxy A16 5G, official Samsung product image", "Galaxy A16 5G, imagen oficial de Samsung", "Samsung", "https://www.samsung.com/ca/smartphones/galaxy-a/galaxy-a16-5g-blue-black-128gb-sm-a166wzkaxac/"),
  ],
  "galaxy-a14": [
    o("galaxy-a14-1", 1008, 1273, "Galaxy A14 5G, official Samsung product image", "Galaxy A14 5G, imagen oficial de Samsung", "Samsung", "https://www.samsung.com/africa_en/smartphones/galaxy-a/galaxy-a14-5g-black-64gb-sm-a146pzkdafa/"),
    o("galaxy-a14-2", 634, 1273, "Galaxy A14 5G, official Samsung product image", "Galaxy A14 5G, imagen oficial de Samsung", "Samsung", "https://www.samsung.com/africa_en/smartphones/galaxy-a/galaxy-a14-5g-black-64gb-sm-a146pzkdafa/"),
    o("galaxy-a14-3", 558, 1272, "Galaxy A14 5G, official Samsung product image", "Galaxy A14 5G, imagen oficial de Samsung", "Samsung", "https://www.samsung.com/africa_en/smartphones/galaxy-a/galaxy-a14-5g-black-64gb-sm-a146pzkdafa/"),
    o("galaxy-a14-4", 559, 1273, "Galaxy A14 5G, official Samsung product image", "Galaxy A14 5G, imagen oficial de Samsung", "Samsung", "https://www.samsung.com/africa_en/smartphones/galaxy-a/galaxy-a14-5g-black-64gb-sm-a146pzkdafa/"),
  ],
  "galaxy-tab-a9-plus": [
    o("galaxy-tab-a9-plus-1", 1418, 1024, "Galaxy Tab A9+ 5G, official Samsung product image", "Galaxy Tab A9+ 5G, imagen oficial de Samsung", "Samsung", "https://www.samsung.com/ca/tablets/galaxy-tab-a/galaxy-tab-a9-plus-5g-graphite-64gb-sm-x218uzaaxac/"),
    o("galaxy-tab-a9-plus-2", 1301, 881, "Galaxy Tab A9+ 5G, official Samsung product image", "Galaxy Tab A9+ 5G, imagen oficial de Samsung", "Samsung", "https://www.samsung.com/ca/tablets/galaxy-tab-a/galaxy-tab-a9-plus-5g-graphite-64gb-sm-x218uzaaxac/"),
    o("galaxy-tab-a9-plus-3", 1301, 881, "Galaxy Tab A9+ 5G, official Samsung product image", "Galaxy Tab A9+ 5G, imagen oficial de Samsung", "Samsung", "https://www.samsung.com/ca/tablets/galaxy-tab-a/galaxy-tab-a9-plus-5g-graphite-64gb-sm-x218uzaaxac/"),
    o("galaxy-tab-a9-plus-4", 1064, 865, "Galaxy Tab A9+ 5G, official Samsung product image", "Galaxy Tab A9+ 5G, imagen oficial de Samsung", "Samsung", "https://www.samsung.com/ca/tablets/galaxy-tab-a/galaxy-tab-a9-plus-5g-graphite-64gb-sm-x218uzaaxac/"),
  ],
};
