<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Dashboard state is persisted through cookie-authorized server functions with revision-checked Cloud writes; browser roles cannot access private tables, preventing cross-device lost updates.
- Cloud dashboard admins are granted through protected user_roles rows; every dashboard request revalidates their identity and role with a user-scoped client, while existing secret-backed admin accounts retain access.
- Shopify cart mutations are serialized and confirmed before local state changes; checkout is disabled after failed reconciliation.
- Public telemetry is validated server-side and dashboard reads are admin-only; sample visits are never mixed with live totals.
- Public telemetry must claim an atomic fixed-size Cloud quota before storing events, failing closed when the quota is exhausted or unavailable to bound automated write abuse.
- Shopify inventory rows link by variant ID, with unique unlinked SKU matching only; import preserves dirty variant fields, and confirmed push readbacks advance baselines without marking newer edits synced.
- Shopify stock writes use the pinned API version’s changeFromQuantity comparison; price/SKU/barcode updates use best-effort preflight checks and post-write readback, not a claimed atomic price lock.
- Shopify inventory auto-refreshes while the inventory or sync screen is open; all outbound pushes require an explicit live-store confirmation and run in bounded sequential chunks.
- Admin initialization and save responses are generation-guarded so logout or newer loads cannot restore stale state.
- Payroll and weekly staff totals clip overlapping shifts at calendar boundaries; open overlapping shifts block payroll finalization.
- Purchase policy pages show configured Shopify text only when it is not an unfinished template; unconfigured terms remain explicitly unavailable.
- The public product sitemap reads published handles directly from Shopify without session-dependent data or nested server-function calls.
- Connection failures render a retryable bilingual recovery state, not a crash report; server RPC responses must never be rewritten into HTML error documents.
- Leasing destinations are centralized in PORTALS and shared by page, banner, and mobile menu links so updates remain consistent across languages.

- Shelf-device and shop product pages share the payment selector and confirmed cart action so installment intent remains consistent without requiring customer sign-in.
- Product selectors and cart share expandable installment checkout instructions; the cart never labels a calculated amount as actually due today because Shopify/Affirm determines the approved plan.
