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
- Admin initialization and save responses are generation-guarded so logout or newer loads cannot restore stale state.
- Payroll and weekly staff totals clip overlapping shifts at calendar boundaries; open overlapping shifts block payroll finalization.
