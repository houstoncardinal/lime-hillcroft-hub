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
- Shopify cart mutations are serialized and confirmed before local state changes; checkout is disabled after failed reconciliation.
- Public telemetry is validated server-side and dashboard reads are admin-only; sample visits are never mixed with live totals.
- Public telemetry must claim an atomic fixed-size Cloud quota before storing events, failing closed when the quota is exhausted or unavailable to bound automated write abuse.
- Admin initialization and save responses are generation-guarded so logout or newer loads cannot restore stale state.
- Payroll and weekly staff totals clip overlapping shifts at calendar boundaries; open overlapping shifts block payroll finalization.
- Purchase policy pages show configured Shopify text only when it is not an unfinished template; unconfigured terms remain explicitly unavailable.
- The public product sitemap reads published handles directly from Shopify without session-dependent data or nested server-function calls.
- Connection failures render a retryable bilingual recovery state, not a crash report; server RPC responses must never be rewritten into HTML error documents.
