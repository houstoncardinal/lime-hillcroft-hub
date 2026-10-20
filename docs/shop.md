# Online shop (`/shop`, `/es/tienda`)

The shop is **on** and sells the store's real Shopify catalog:
[xpufrj-ed.myshopify.com](https://xpufrj-ed.myshopify.com) (connected from chat with the Lovable
Shopify integration — the token is not in this repository).

- Server environment variables: `SHOPIFY_STORE_DOMAIN`, `SHOPIFY_STOREFRONT_ACCESS_TOKEN`,
  optional `SHOPIFY_API_VERSION` (currently defaults to `2026-10`).
- `SHOP_ENABLED` in `src/components/site/features.ts` switches the whole shop on or off (menu link,
  cart, home-page product row, `/shop` and `/es/tienda`). If it is ever set to `false`, run
  `npm run seo:sitemap` again and swap the shop lines in `public/llms.txt`, `public/llms-full.txt`
  and the Tidio files (`docs/tidio`) back to "temporarily unavailable".

## How it works

- `src/shop/storefront.ts` is the only place that talks to Shopify. It runs on the server, so the
  Storefront token never reaches the browser. Products are read once a minute.
- `src/shop/cart.ts` keeps the cart in the browser **and** mirrors every change into a real Shopify
  cart (`cartCreate` / `cartLinesAdd` / `cartLinesUpdate` / `cartLinesRemove`), so checkout uses
  Shopify's own checkout URL — no hand-built links. When Shopify no longer knows the cart (order
  paid, or the cart expired), the local cart is cleared.
- `src/shop/preview-catalog.ts` is only used when the store can't be reached, so the shop never
  shows an empty page. Checkout then falls back to a "call to order" message and product structured
  data omits prices.

## Getting products to show up nicely

- **Categories** come from each product's *Product type* or tags: words like case, glass,
  AirPods/buds/headphones, speaker, watch, charger/cable, controller/gaming.
- Tag a product `featured` to show it on the home page, `new` for a "New" badge. A compare-at
  price shows a "Sale" badge.
- The first option (Color, Model…) becomes the picker on the product page.
- Product URLs use the Shopify handle: `/shop/<handle>` and `/es/tienda/<handle>`.
- Product descriptions should be plain sentences — the site shows the text, not HTML formatting.

The online cart is separate from in-store inventory in `/admin`; link them by giving products
the same SKU and using the dashboard's Shopify sync.
