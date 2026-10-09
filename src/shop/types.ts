// Online store data model. Shaped after the Shopify Storefront API so the preview catalog and
// the live Shopify catalog render through the same components.

export const SHOP_CATEGORIES = [
  "cases",
  "screen-protection",
  "earbuds",
  "speakers",
  "wearables",
  "power",
  "gaming",
  "more",
] as const;
export type ShopCategory = (typeof SHOP_CATEGORIES)[number];

export type ShopImage = { url: string; alt: string };

export type ShopVariant = {
  id: string;
  title: string;
  /** Price in cents. */
  price: number;
  compareAtPrice: number | null;
  available: boolean;
  image: ShopImage | null;
};

export type ShopProduct = {
  id: string;
  handle: string;
  title: string;
  vendor: string;
  category: ShopCategory;
  description: string;
  features: string[];
  images: ShopImage[];
  optionName: string | null;
  variants: ShopVariant[];
  badge: "best-seller" | "new" | "sale" | null;
  featured: boolean;
};

export type Catalog = {
  /** "preview" until Shopify Storefront credentials are set on the server. */
  source: "shopify" | "preview";
  products: ShopProduct[];
};

export type CartLine = {
  variantId: string;
  handle: string;
  title: string;
  variantTitle: string | null;
  price: number;
  image: ShopImage | null;
  quantity: number;
};
