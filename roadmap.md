# Launch corrections

- [ ] Reliable Shopify cart, exact prices, honest installment estimates and no sample-product fallback
- [ ] Shared protected staff storage, payroll boundaries, stock synchronization and scanner corrections
- [ ] Public metadata, sitemap, language handling and purchase policy navigation
- [ ] Verify shopping and signed-in staff flows and run regression tests
- [ ] Merchant confirmation: purchase policies, Progressive Leasing application URL and Shopify checkout branding

## Completed shop connection

- [x] Connect the store (xpufrj-ed.myshopify.com, 25 products) and store its settings
- [x] Serve the real catalog: Storefront API on API version 2026-10, real prices and stock
- [x] Real cart: every change mirrors into a Shopify cart; checkout opens Shopify's own URL
- [x] Switch the shop back on in the site (menu, cart button, home row, /shop and /es/tienda)
- [x] Tell search engines and the chat agent the shop is open again (llms.txt, llms-full.txt, Tidio)
- [x] Refresh the sitemap and check the whole flow end to end
