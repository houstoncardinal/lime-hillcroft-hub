# Launch corrections

## Two-way Shopify inventory
- [x] Implement complete paginated variant imports with field-level preservation of pending edits
- [x] Edit and review prices, stock, SKU and barcode; confirm live Shopify pushes and handle conflicts/partial failures
- [x] Verify signed-in inventory controls, mobile layout and 115 regression tests; sync API behavior covered with fixtures, not real imported products
- [ ] Restore Shopify Admin access and verify real import/push — reconnect and supplied SHOPIFY_ADMIN_ACCESS_TOKEN still return 401; requires a valid store Admin API token

- [x] Failed-request recovery screen and retry — blocked catalog request renders recovery instead of crash; restored connection and Retry reload the real product
- [x] Remove the sticky phone/tablet Call & Directions bar — nothing pinned to the bottom on any device; footer spacing and the chat-room helper cleaned up


- [x] Reliable Shopify cart, exact prices, honest installment estimates and no sample-product fallback
- [x] Shared protected staff storage, payroll boundaries, comparison-checked stock updates and scanner corrections
- [x] Public metadata, current product sitemap, bilingual error handling and purchase policy navigation
- [x] Verify checkout, remembered cart, signed-in shared saves, conflict rejection and signed-out data denial; 101 tests pass
- [ ] Shopify stock import/push — blocked by expired Shopify Admin access (401); storefront shopping remains working
- [ ] Merchant policies — blocked by missing approved privacy, returns, shipping, terms and warranty text; unfinished template is not shown
- [x] Progressive Leasing online application — use the merchant-approved dealer URL everywhere
- [ ] Shopify checkout branding — merchant must replace “My Store” in Shopify settings
- [ ] Final paid order, delivery/taxes/refunds/email/financing approval and cameras — require merchant-approved transaction and live camera sources
- [x] Focused security code review and basic scan — added an atomic telemetry ingestion quota; no other concrete issue found in reviewed shopping/admin/public handlers (not a penetration test)

## Completed shop connection

- [x] Connect the store (xpufrj-ed.myshopify.com, 25 products) and store its settings
- [x] Serve the real catalog: Storefront API on API version 2026-10, real prices and stock
- [x] Real cart: every change mirrors into a Shopify cart; checkout opens Shopify's own URL
- [x] Switch the shop back on in the site (menu, cart button, home row, /shop and /es/tienda)
- [x] Tell search engines and the chat agent the shop is open again (llms.txt, llms-full.txt, Tidio)
- [x] Refresh the sitemap and check the whole flow end to end

## New tasks
- [ ] Update leasing application buttons and simplify header/mobile navigation; verify full logo visibility
- [ ] Add second admin super user (ticwirelesstx@gmail.com) to /admin login
- [x] Add customer authentication (sign up / sign in) — email+password at /auth, cart saved to account across devices
