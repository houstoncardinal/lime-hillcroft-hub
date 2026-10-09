# Store dashboard (`/admin`)

The dashboard manages inventory, the employee time clock, payroll, website statistics and the
Shopify connection. It is excluded from search engines (`noindex` + `robots.txt`).

## Pages

| Page | What it does |
|---|---|
| Overview | Today at a glance: traffic, calls/directions, inventory value, payroll so far, who's on the clock, low stock, recent stock activity |
| Inventory | Search/filter, one-tap +/− stock, quick adjust by barcode/SKU scan, full product editor, per-item stock history, CSV import/export, bulk delete |
| Time clock | 4-digit PIN kiosk for the store tablet, live "who's working", weekly timesheets with manager edits (marked "edited") |
| Employees | Staff cards with rate, weekly hours and overtime warnings; add/edit, PIN reset, deactivate |
| Payroll | Weekly or biweekly periods, FLSA overtime per workweek, gross pay summary, payroll runs (draft → approved → paid), CSV for your payroll provider |
| Website stats | Visitors, page views, Call/Directions taps, top pages, sources, device and language split |
| Shopify | Connection status, setup checklist, import products (match by SKU), push changed quantities |
| Settings | Payroll rules, passcode, backup/restore, clear or load sample data |

Payroll shows **gross pay only**. Taxes, withholdings and filings stay with your payroll provider.

## Local mode (today)

All dashboard data is saved in the browser of the device you use (`localStorage`), protected by
a passcode on that device. This means:

- Use **one device** (e.g. the store tablet or office computer) as the dashboard.
- Download a **backup** regularly from Settings.
- Website stats only include visits made in that browser, plus sample traffic.
- The passcode is a convenience lock, not server-side security — anyone with that device and
  browser profile could read the stored data. Don't store anything more sensitive than
  names, rates and hours until you move to the database.

The first visit loads sample data (marked with a banner). Sample time-clock PINs are
1234, 2468, 1357 and 8080. Clear it in Settings → "Clear sample data & go live".

## Moving to a database (recommended before real payroll)

1. In Lovable, enable **Cloud** (Supabase) for the project.
2. Apply `supabase/migrations/20261009000000_admin.sql`. It creates every table with
   row-level security: only users listed in `admin_users` can read or change data, and the
   public site can only *insert* analytics events.
3. Add yourself: sign up once, then `insert into admin_users (user_id) values ('<your auth user id>');`
4. Replace the internals of `src/admin/store.ts` with Supabase queries (the screens only use
   its hook and action functions), swap the passcode gate in `src/routes/admin.tsx` for
   Supabase email login, and set `VITE_ANALYTICS_ENDPOINT` (or insert from the tracker in
   `src/admin/tracker.ts`) so every visitor is counted.

## Shopify

Runs server-side in `src/admin/shopify.ts`; the access token never reaches the browser.

1. Shopify admin → Settings → Apps and sales channels → **Develop apps** → create an app.
2. Admin API scopes: `read_products`, `write_products`, `read_inventory`, `write_inventory`,
   `read_locations`. Install it and copy the **Admin API access token**.
3. Add these server environment variables (secrets) in your hosting:

   | Variable | Value |
   |---|---|
   | `SHOPIFY_STORE_DOMAIN` | `your-store.myshopify.com` |
   | `SHOPIFY_ADMIN_ACCESS_TOKEN` | the token from step 2 |
   | `ADMIN_API_KEY` | a long random string you make up |
   | `SHOPIFY_API_VERSION` | optional, defaults to `2026-07` |
   | `SHOPIFY_LOCATION_ID` | optional, defaults to the first location |

4. Open `/admin/shopify`, enter the same `ADMIN_API_KEY`, and press **Import from Shopify**.
   Products link by **SKU** — give in-store items the same SKU as on Shopify.
5. After you sell or receive stock in the dashboard, linked products show **Needs push**;
   press **Push quantities** to update Shopify.

Test the first import and push on a couple of products before relying on it.
