import airpodsPro2 from "@/assets/shop/airpods-pro-2.jpg";
import jblLiveFree from "@/assets/shop/jbl-live-free-nc.jpg";
import fitbitVersa4 from "@/assets/shop/fitbit-versa-4.jpg";
import charge5Black from "@/assets/shop/jbl-charge-5-black.jpg";
import charge5Red from "@/assets/shop/jbl-charge-5-red.jpg";
import flip6 from "@/assets/shop/jbl-flip-6.jpg";
import clip3 from "@/assets/shop/jbl-clip-3.jpg";
import jblGo from "@/assets/shop/jbl-go.jpg";
import soundcore from "@/assets/shop/soundcore-mini-3-pro.jpg";
import smartwatch from "@/assets/shop/smartwatch.jpg";
import powervault from "@/assets/shop/zizo-powervault.jpg";
import kishi from "@/assets/shop/razer-kishi.jpg";
import buds2 from "@/assets/shop/galaxy-buds-2.jpg";
import buds2Pro from "@/assets/shop/galaxy-buds-2-pro.jpg";
import buds3Pro from "@/assets/shop/galaxy-buds-3-pro.jpg";
import watchUltra from "@/assets/shop/galaxy-watch-ultra.jpg";
import pulseExplore from "@/assets/shop/pulse-explore.jpg";
import dropCase from "@/assets/shop/drop-magsafe-case.jpg";
import ringCase from "@/assets/shop/ring-stand-case.jpg";
import glass from "@/assets/shop/tempered-glass.jpg";
import zizoCase from "@/assets/shop/zizo-case.jpg";
import magsafeRed from "@/assets/shop/magsafe-case-red.jpg";
import caseWall from "@/assets/shop/case-wall.jpg";
import type { ShopProduct, ShopVariant } from "@/shop/types";

// Preview catalog shown until Shopify is connected. Photos are the store's own shelf photos;
// prices are placeholders and are replaced by Shopify's when the Storefront API is configured.

const img = (url: string, alt: string) => ({ url, alt });

function variants(
  handle: string,
  price: number,
  options: (string | [string, ReturnType<typeof img> | null])[] = [""],
  compareAtPrice: number | null = null,
): ShopVariant[] {
  return options.map((o) => {
    const [title, image] = Array.isArray(o) ? o : [o, null];
    return {
      id: `preview:${handle}:${title || "default"}`,
      title: title || "Default",
      price,
      compareAtPrice,
      available: true,
      image,
    };
  });
}

const IPHONE_MODELS = [
  "iPhone 17 Pro Max",
  "iPhone 17 Pro",
  "iPhone 17",
  "iPhone 16 Pro Max",
  "iPhone 16 Pro",
  "iPhone 15 Pro Max",
];
const GALAXY_MODELS = ["Galaxy S25 Ultra", "Galaxy S24 Ultra", "Galaxy S23 Ultra"];

export const PREVIEW_PRODUCTS: ShopProduct[] = [
  {
    id: "preview:airpods-pro-2",
    handle: "airpods-pro-2",
    title: "AirPods Pro (2nd generation)",
    vendor: "Apple",
    category: "earbuds",
    description:
      "Active noise cancellation, Adaptive Audio and a USB-C MagSafe charging case. Sealed, brand new.",
    features: [
      "Active noise cancellation & Transparency mode",
      "Personalized Spatial Audio",
      "MagSafe USB-C charging case",
      "Sweat and water resistant",
    ],
    images: [img(airpodsPro2, "Sealed AirPods Pro boxes on the TIC Wireless shelf")],
    optionName: null,
    variants: variants("airpods-pro-2", 24900),
    badge: "best-seller",
    featured: true,
  },
  {
    id: "preview:galaxy-buds-3-pro",
    handle: "galaxy-buds-3-pro",
    title: "Galaxy Buds3 Pro",
    vendor: "Samsung",
    category: "earbuds",
    description: "Samsung's flagship earbuds with intelligent ANC and 24-bit Hi-Fi sound.",
    features: [
      "Adaptive noise control",
      "24-bit Hi-Fi audio",
      "Blade lights design",
      "IP57 water resistance",
    ],
    images: [img(buds3Pro, "Galaxy Buds3 Pro boxes in a display case")],
    optionName: "Color",
    variants: variants("galaxy-buds-3-pro", 24999, ["Silver", "White"]),
    badge: "new",
    featured: true,
  },
  {
    id: "preview:galaxy-buds-2-pro",
    handle: "galaxy-buds-2-pro",
    title: "Galaxy Buds2 Pro",
    vendor: "Samsung",
    category: "earbuds",
    description: "Compact, comfortable earbuds with intelligent ANC and 360 Audio.",
    features: ["Intelligent active noise cancellation", "360 Audio", "IPX7 water resistance"],
    images: [img(buds2Pro, "Galaxy Buds2 Pro box in Bora Purple")],
    optionName: null,
    variants: variants("galaxy-buds-2-pro", 17999, [""], 22999),
    badge: "sale",
    featured: false,
  },
  {
    id: "preview:galaxy-buds-2",
    handle: "galaxy-buds-2",
    title: "Galaxy Buds2",
    vendor: "Samsung",
    category: "earbuds",
    description: "Lightweight everyday earbuds with active noise cancellation.",
    features: ["Active noise cancellation", "Up to 20 hours with case", "Wireless charging case"],
    images: [img(buds2, "Galaxy Buds2 box")],
    optionName: null,
    variants: variants("galaxy-buds-2", 9999),
    badge: null,
    featured: false,
  },
  {
    id: "preview:jbl-live-free-nc",
    handle: "jbl-live-free-nc",
    title: "JBL Live Free NC+",
    vendor: "JBL",
    category: "earbuds",
    description: "True wireless earbuds with active noise cancelling and JBL Signature Sound.",
    features: ["Active noise cancelling", "Wireless charging case", "JBL Signature Sound"],
    images: [img(jblLiveFree, "JBL Live Free NC+ earbuds box")],
    optionName: null,
    variants: variants("jbl-live-free-nc", 9999),
    badge: null,
    featured: false,
  },
  {
    id: "preview:pulse-explore",
    handle: "playstation-pulse-explore",
    title: "PULSE Explore Wireless Earbuds",
    vendor: "Sony PlayStation",
    category: "gaming",
    description:
      "Lossless PlayStation Link audio for PS5, PS Portal, PC and Mac, plus Bluetooth for your phone.",
    features: [
      "PlayStation Link lossless audio",
      "Bluetooth for phones",
      "Hidden noise-rejecting mics",
    ],
    images: [img(pulseExplore, "PlayStation PULSE Explore wireless earbuds box")],
    optionName: null,
    variants: variants("pulse-explore", 19999),
    badge: null,
    featured: false,
  },
  {
    id: "preview:razer-kishi",
    handle: "razer-kishi",
    title: "Razer Kishi Mobile Controller",
    vendor: "Razer",
    category: "gaming",
    description: "Turn your phone into a handheld console. Plugs straight in for zero-lag play.",
    features: [
      "Console-style analog sticks",
      "Low-latency USB-C connection",
      "Pass-through charging",
    ],
    images: [img(kishi, "Razer Kishi universal gaming controller box")],
    optionName: null,
    variants: variants("razer-kishi", 9999),
    badge: null,
    featured: false,
  },
  {
    id: "preview:jbl-charge-5",
    handle: "jbl-charge-5",
    title: "JBL Charge 5",
    vendor: "JBL",
    category: "speakers",
    description:
      "Bold JBL Pro Sound, 20 hours of play and a built-in power bank to charge your phone.",
    features: ["IP67 waterproof & dustproof", "Up to 20 hours of playtime", "Built-in power bank"],
    images: [
      img(charge5Black, "JBL Charge 5 speaker box in black"),
      img(charge5Red, "JBL Charge 5 speaker box in red"),
    ],
    optionName: "Color",
    variants: variants("jbl-charge-5", 17999, [
      ["Black", img(charge5Black, "JBL Charge 5 in black")],
      ["Red", img(charge5Red, "JBL Charge 5 in red")],
    ]),
    badge: "best-seller",
    featured: true,
  },
  {
    id: "preview:jbl-flip-6",
    handle: "jbl-flip-6",
    title: "JBL Flip 6",
    vendor: "JBL",
    category: "speakers",
    description:
      "Portable speaker with crisp highs and deep bass, built for the beach, the park and the pool.",
    features: ["IP67 waterproof & dustproof", "12 hours of playtime", "PartyBoost pairing"],
    images: [img(flip6, "JBL Flip 6 speakers in black and blue")],
    optionName: "Color",
    variants: variants("jbl-flip-6", 12999, ["Black", "Blue"]),
    badge: null,
    featured: false,
  },
  {
    id: "preview:jbl-clip-3",
    handle: "jbl-clip-3",
    title: "JBL Clip 3",
    vendor: "JBL",
    category: "speakers",
    description: "Ultra-portable speaker with a built-in carabiner. Clip it to your bag and go.",
    features: ["Integrated carabiner", "IPX7 waterproof", "10 hours of playtime"],
    images: [img(clip3, "JBL Clip 3 speaker box in red")],
    optionName: null,
    variants: variants("jbl-clip-3", 5999),
    badge: null,
    featured: false,
  },
  {
    id: "preview:jbl-go",
    handle: "jbl-go",
    title: "JBL Go Pocket Speaker",
    vendor: "JBL",
    category: "speakers",
    description: "Pocket-size Bluetooth speaker with big JBL sound and bright colors.",
    features: ["Waterproof", "Bluetooth streaming", "Fits in your pocket"],
    images: [img(jblGo, "JBL Go speakers in red, green and pink")],
    optionName: "Color",
    variants: variants("jbl-go", 3999, ["Red", "Green", "Pink"]),
    badge: null,
    featured: false,
  },
  {
    id: "preview:soundcore-mini-3-pro",
    handle: "soundcore-mini-3-pro",
    title: "Soundcore Mini 3 Pro",
    vendor: "Anker Soundcore",
    category: "speakers",
    description: "Size-defying pocket speaker with BassUp and a built-in power bank.",
    features: ["BassUp technology", "IPX7 waterproof", "Power bank function"],
    images: [img(soundcore, "Soundcore Mini 3 Pro speaker box")],
    optionName: null,
    variants: variants("soundcore-mini-3-pro", 5999),
    badge: null,
    featured: false,
  },
  {
    id: "preview:galaxy-watch-ultra",
    handle: "galaxy-watch-ultra",
    title: "Galaxy Watch Ultra",
    vendor: "Samsung",
    category: "wearables",
    description:
      "Titanium smartwatch built for adventure, with up to 100 hours of battery in power saving mode.",
    features: ["Titanium case, sapphire glass", "Dual-frequency GPS", "Advanced health tracking"],
    images: [img(watchUltra, "Galaxy Watch Ultra box")],
    optionName: null,
    variants: variants("galaxy-watch-ultra", 64999),
    badge: null,
    featured: true,
  },
  {
    id: "preview:fitbit-versa-4",
    handle: "fitbit-versa-4",
    title: "Fitbit Versa 4",
    vendor: "Fitbit by Google",
    category: "wearables",
    description: "Fitness smartwatch with built-in GPS, 40+ exercise modes and 6+ day battery.",
    features: ["Built-in GPS", "40+ exercise modes", "6+ day battery life"],
    images: [img(fitbitVersa4, "Fitbit Versa 4 box in pink sand")],
    optionName: null,
    variants: variants("fitbit-versa-4", 19999),
    badge: null,
    featured: false,
  },
  {
    id: "preview:smartwatch",
    handle: "bluetooth-smartwatch",
    title: "Bluetooth Smartwatch",
    vendor: "TIC Wireless",
    category: "wearables",
    description:
      "Everyday smartwatch with calls, notifications and fitness tracking. Interchangeable sport bands.",
    features: [
      "Call & notification alerts",
      "Heart rate and step tracking",
      "Interchangeable bands",
    ],
    images: [img(smartwatch, "Smartwatches with colorful sport bands")],
    optionName: "Band",
    variants: variants("smartwatch", 4999, ["Black", "Orange", "Olive", "Starlight", "Navy"]),
    badge: null,
    featured: false,
  },
  {
    id: "preview:zizo-powervault",
    handle: "zizo-powervault-station",
    title: "ZIZO PowerVault Station",
    vendor: "ZIZO",
    category: "power",
    description: "3-in-1 wireless charging station for your phone, Apple Watch and AirPods.",
    features: ["Charges 3 devices at once", "Fast wireless charging", "1-year warranty"],
    images: [img(powervault, "ZIZO PowerVault wireless charging station box")],
    optionName: null,
    variants: variants("zizo-powervault", 5999),
    badge: null,
    featured: false,
  },
  {
    id: "preview:drop-magsafe-case",
    handle: "drop-magsafe-case",
    title: "Drop+ MagSafe Case",
    vendor: "TIC Wireless",
    category: "cases",
    description: "Slim protective case, 4× drop tested, with built-in MagSafe magnets.",
    features: ["4× military drop tested", "MagSafe compatible", "Antimicrobial coating"],
    images: [img(dropCase, "Drop+ MagSafe phone case in its packaging")],
    optionName: "Model",
    variants: variants("drop-magsafe-case", 3999, IPHONE_MODELS),
    badge: "best-seller",
    featured: true,
  },
  {
    id: "preview:magsafe-case-red",
    handle: "magsafe-silicone-case",
    title: "MagSafe Silicone Case",
    vendor: "TIC Wireless",
    category: "cases",
    description: "Soft-touch silicone with a MagSafe ring for chargers, wallets and car mounts.",
    features: ["MagSafe ring", "Soft microfiber lining", "Raised camera edge"],
    images: [img(magsafeRed, "Red MagSafe silicone phone case")],
    optionName: "Model",
    variants: variants("magsafe-case-red", 2999, IPHONE_MODELS.slice(0, 5)),
    badge: null,
    featured: false,
  },
  {
    id: "preview:ring-stand-case",
    handle: "rugged-ring-stand-case",
    title: "Rugged Ring-Stand Case",
    vendor: "TIC Wireless",
    category: "cases",
    description: "Heavy-duty armor with a sliding camera cover and a 360° ring stand.",
    features: ["Dual-layer armor", "Sliding camera cover", "360° ring stand & magnetic mount"],
    images: [img(ringCase, "Rugged ring-stand case in its packaging")],
    optionName: "Model",
    variants: variants("ring-stand-case", 2499, [...GALAXY_MODELS, ...IPHONE_MODELS.slice(0, 3)]),
    badge: null,
    featured: false,
  },
  {
    id: "preview:zizo-case",
    handle: "zizo-premium-case",
    title: "ZIZO Premium Case",
    vendor: "ZIZO",
    category: "cases",
    description: "Slim, clear-back protection that shows off your phone's color.",
    features: [
      "Shock-absorbing bumper",
      "Clear scratch-resistant back",
      "Wireless charging compatible",
    ],
    images: [img(zizoCase, "ZIZO premium phone case box")],
    optionName: "Model",
    variants: variants("zizo-case", 2999, [...GALAXY_MODELS, ...IPHONE_MODELS.slice(0, 3)]),
    badge: null,
    featured: false,
  },
  {
    id: "preview:case-wall",
    handle: "case-wall-favorites",
    title: "Everyday Case — Store Favorites",
    vendor: "TIC Wireless",
    category: "cases",
    description:
      "Hundreds of styles on our case wall. Pick your model and we'll match a best-selling style.",
    features: [
      "Clear, color, glitter and rugged styles",
      "Most iPhone and Galaxy models",
      "Ask us to match a style",
    ],
    images: [img(caseWall, "TIC Wireless wall of phone cases")],
    optionName: "Model",
    variants: variants("case-wall", 1999, [...IPHONE_MODELS, ...GALAXY_MODELS]),
    badge: null,
    featured: false,
  },
  {
    id: "preview:tempered-glass",
    handle: "9h-tempered-glass",
    title: "9H Premium Tempered Glass",
    vendor: "TIC Wireless",
    category: "screen-protection",
    description: "Edge-to-edge 9H tempered glass. Bubble-free and fingerprint resistant.",
    features: ["9H hardness", "Bubble-free, wash-and-reuse adhesive", "Anti-fingerprint coating"],
    images: [img(glass, "Premium 9H tempered glass screen protector package")],
    optionName: "Model",
    variants: variants("tempered-glass", 1999, [...IPHONE_MODELS, ...GALAXY_MODELS]),
    badge: "best-seller",
    featured: true,
  },
];
