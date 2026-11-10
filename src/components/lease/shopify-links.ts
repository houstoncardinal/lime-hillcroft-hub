import type { LeaseDevice, LeaseOption } from "@/components/lease/catalog";

// Which Shopify product sells each lease-to-own option, for the "Pay in 4 with Affirm" button on
// the device's lease page. Matched by hand against the live store (2026-11-10): an option is listed
// only when its Shopify product sells that exact model and configuration (storage, size,
// connectivity, edition) and it is in stock. Options left out — other storage sizes, open-box or
// pre-owned units, sold-out variants, models not in the store — get no button.
//
// Keyed by lease device id, then the option's English label.
export const SHOPIFY_LISTINGS: Record<string, Record<string, string>> = {
  // iPhone
  "iphone-18-pro-max": { "256GB": "iphone-18-pro-max", "512GB": "iphone-18-pro-max" },
  "iphone-18-pro": { "256GB": "iphone-18-pro" },
  "iphone-17-pro-max": { "256GB · Sealed": "iphone-17-pro-max" },
  "iphone-17-pro": { "256GB": "iphone-17-pro" },
  "iphone-air": { "256GB": "apple-i-phone-air-black-color-256-gb" },
  "iphone-17": { "256GB": "iphone-17" },
  "iphone-16-pro-max": { "256GB": "iphone-16-pro-max" },
  "iphone-16-pro": { "256GB": "iphone-16-pro" },
  "iphone-16-plus": { "128GB": "iphone-16-plus", "256GB": "iphone-16-plus" },
  "iphone-16": { "128GB": "iphone-16", "Pre-owned": "iphone-16-128gb-ultramarine-pre-owned" },
  "iphone-15-pro-max": { "256GB": "iphone-15-pro-max" },
  "iphone-15-plus": { "128GB": "iphone-15-plus" },
  "iphone-15": { "128GB": "iphone-15" },
  "iphone-14-pro-max": { "128GB": "iphone-14-pro-max" },
  "iphone-14-pro": { "256GB": "iphone-14-pro" },
  "iphone-14-plus": { "128GB": "iphone-14-plus" },
  "iphone-14": { "128GB": "iphone-14" },
  "iphone-13-pro-max": { "128GB · Unlocked": "iphone-13-pro-max" },
  "iphone-13": {
    "128GB · Unlocked · Black": "iphone-13",
    "128GB · Unlocked · Red / Pink": "iphone-13",
  },
  "iphone-12-pro-max": { "128GB · 5G": "iphone-12-pro-max" },
  "iphone-12": { "64GB · 5G · A/B grade": "iphone-12", "64GB · 5G": "iphone-12" },
  "iphone-11": { "64GB · Unlocked · A/B grade": "iphone-11", "64GB · Unlocked": "iphone-11" },

  // Samsung Galaxy
  "galaxy-z-fold7": { "256GB · Unlocked": "galaxy-z-fold7" },
  "galaxy-s26-ultra": { "256GB · Unlocked": "galaxy-s26-ultra" },
  "galaxy-s25-ultra": { "256GB": "galaxy-s25-ultra" },
  "galaxy-s24-ultra": { "256GB": "galaxy-s24-ultra" },
  "galaxy-s24": { "128GB": "galaxy-s24" },
  "galaxy-s23-ultra": { "256GB": "galaxy-s23-ultra" },
  "galaxy-s23": { "128GB": "galaxy-s23" },
  "galaxy-s22-ultra": { "128GB": "galaxy-s22-ultra" },
  "galaxy-s22-plus": { "128GB": "galaxy-s22-plus" },
  "galaxy-s22": { "128GB · A grade": "galaxy-s22", "128GB": "galaxy-s22" },
  "galaxy-s21-ultra": { "128GB · Unlocked": "galaxy-s21-ultra" },
  "galaxy-s21-plus": { "128GB": "galaxy-s21-plus" },
  "galaxy-s21": { "128GB · 5G": "galaxy-s21" },
  "galaxy-note20-ultra": { "128GB": "galaxy-note20-ultra" },
  "galaxy-s20-ultra": { "5G": "galaxy-s20-ultra" },
  "galaxy-a13": { "64GB": "galaxy-a13" },
  "galaxy-a03s": { "32GB · Unlocked": "galaxy-a03s" },

  // Apple Watch
  "apple-watch-series-12": { "46mm · GPS + Cellular": "apple-watch-series-12-black-color-46mm" },

  // iPad
  "ipad-pro-11-m2": { "256GB": "ipad-pro-11-4th-gen-m2-256gb" },
  "ipad-11": {
    "128GB · Wi-Fi + Cellular": "apple-ipad-11th-gen-wifi-cellular-128gb",
    "128GB · Wi-Fi": "apple-ipad-11th-gen-wifi-128gb",
    "256GB · Wi-Fi + Cellular": "apple-ipad-11th-gen-wifi-cellular-256gb",
  },
  "ipad-mini-5": {
    "64GB · Wi-Fi + Cellular": "ipad-mini-5",
    "256GB · Wi-Fi + Cellular": "ipad-mini-5",
  },
  "ipad-9": { "64GB · Wi-Fi + Cellular": "apple-ipad-9th-gen-wifi-cellular-64gb" },

  // MacBook
  "macbook-air-13-m5": { "16GB RAM · 512GB": "apple-macbook-air-13-m5-16gb-512gb" },
  "macbook-air-15-m5": { "16GB RAM · 512GB": "apple-macbook-air-15-m5-16gb-512gb" },
  "macbook-air-13-m4": { "16GB RAM · 256GB": "apple-macbook-air-13-m4-16gb-256gb" },
  "macbook-neo-13": {
    "8GB RAM · 256GB": "apple-macbook-neo-13-8gb-256gb",
    "8GB RAM · 512GB": "apple-macbook-neo-13-8gb-512gb",
  },

  // Game consoles
  "playstation-5-pro": { "Digital Edition · 2TB": "playstation-5-pro-digital-2tb" },
  "playstation-5": {
    "Disc + Digital": "playstation-5-disc-digital",
    "Digital Edition": "playstation-5-digital",
  },
  "xbox-series-x": { "1TB": "xbox-series-x-1tb" },
  "nintendo-switch-2": { Console: "nintendo-switch-2" },
  "playstation-portal": { "Remote player": "playstation-portal-remote-player-midnight-black" },
};

/** The Shopify product handle that sells this option, if any. */
export const shopifyHandle = (device: LeaseDevice, option: LeaseOption) =>
  SHOPIFY_LISTINGS[device.id]?.[option.label.en];
