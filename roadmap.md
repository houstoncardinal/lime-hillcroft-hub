# Launch corrections

- [x] Reliable Shopify cart, exact prices, honest installment estimates and no sample-product fallback
- [x] Shared protected staff storage, payroll boundaries, comparison-checked stock updates and scanner corrections
- [x] Public metadata, current product sitemap, bilingual error handling and purchase policy navigation
- [x] Verify checkout, remembered cart, signed-in shared saves, conflict rejection and signed-out data denial; 101 tests pass
- [ ] Shopify stock import/push — blocked by expired Shopify Admin access (401); storefront shopping remains working
- [ ] Merchant policies — blocked by missing approved privacy, returns, shipping, terms and warranty text; unfinished template is not shown
- [ ] Progressive Leasing online application — blocked by missing dealer URL; old link replaced with call-store action
- [ ] Shopify checkout branding — merchant must replace “My Store” in Shopify settings
- [ ] Final paid order, delivery/taxes/refunds/email/financing approval and cameras — require merchant-approved transaction and live camera sources
- [ ] Deep code-security review — unavailable through the current basic scan tool; basic checks report no issues

## Completed shop connection

- [x] Connect the store (xpufrj-ed.myshopify.com, 25 products) and store its settings
- [x] Serve the real catalog: Storefront API on API version 2026-10, real prices and stock
- [x] Real cart: every change mirrors into a Shopify cart; checkout opens Shopify's own URL
- [x] Switch the shop back on in the site (menu, cart button, home row, /shop and /es/tienda)
- [x] Tell search engines and the chat agent the shop is open again (llms.txt, llms-full.txt, Tidio)
- [x] Refresh the sitemap and check the whole flow end to end
