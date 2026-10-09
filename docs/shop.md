# Online shop (`/shop`, `/es/tienda`)

The shop sells accessories (cases, glass, earbuds, speakers, smartwatches, chargers, gaming).
It runs in **preview mode** until Shopify is connected:

- Products come from `src/shop/preview-catalog.ts` — photos cropped from the store's own
  shelf photos, **placeholder prices**.
- Cart, product pages, search and filters all work. "Checkout" shows a "call to order" message.
- Product structured data omits prices, so placeholder prices never reach Google.

## Connecting Shopify (about 10 minutes)

1. In Shopify admin, install the **Headless** sales channel (or use a custom app with
   Storefront API access) and create a **Storefront API access token**. Give it access to
   products and checkouts.
2. Add these server environment variables (secrets) in your hosting:

   | Variable | Value |
   |---|---|
   | `SHOPIFY_STORE_DOMAIN` | `your-store.myshopify.com` (same one the dashboard uses) |
   | `SHOPIFY_STOREFRONT_ACCESS_TOKEN` | the Storefront token from step 1 |
   | `SHOPIFY_API_VERSION` | optional, defaults to `2026-07` |

3. Redeploy. The shop now loads your Shopify products (refreshed every minute), real prices
   and stock, and **Checkout** opens Shopify's secure checkout with the cart.

Nothing else changes: the preview catalog is only used when the token is missing or Shopify
can't be reached.

### Getting products to show up nicely

- **Categories** come from each product's *Product type* or tags: words like case, glass,
  AirPods/buds/headphones, speaker, watch, charger/cable, controller/gaming.
- Tag a product `featured` to show it on the home page, `new` for a "New" badge. A compare-at
  price shows a "Sale" badge.
- The first option (Color, Model…) becomes the picker on the product page.
- Product URLs use the Shopify handle: `/shop/<handle>` and `/es/tienda/<handle>`.

The online cart is separate from in-store inventory in `/admin`; link them by giving products
the same SKU and using the dashboard's Shopify sync.
