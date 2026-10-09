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

## Cameras

`/admin/cameras` is the store's camera wall: six slots (Front entrance, Sales floor, Accessory
wall, Display cases, Register, Parking lot) waiting to be connected. Unconnected slots show a
blurred store photo labelled **Not connected** — never fake live video.

**Connecting a camera:** open a slot → **Connect** → choose the connection type → paste the
address → **Test connection** → **Save**.

| Connection type | Use it for |
|---|---|
| HLS (`.m3u8`) | Most recorders (NVRs) and bridges such as go2rtc, MediaMTX, Frigate |
| WebRTC (WHEP) | Lowest delay, from go2rtc or MediaMTX |
| MJPEG | IP cameras' built-in image stream |
| Snapshot image | Any camera with a still-image URL (refreshes every few seconds) |
| Embed / share link | A cloud camera service's shareable live-view page |
| This device's camera | Testing the wall with a USB or built-in camera |

Browsers can't play `rtsp://` directly — publish RTSP cameras through the recorder or a bridge.
The dashboard runs on https, so camera addresses must be https too. For snapshots and HLS, the
camera server must allow cross-origin requests (CORS); otherwise video plays but snapshots are
refused. Addresses are stored on this device only; use a view-only camera account.

Also on the page: layout switcher (1/2/3 per row, remembered), filter by area, live/offline
status per tile, focus view with previous/next, full screen, PNG snapshots, and an
**Activity** panel reserved for motion/person events once the camera system is connected.

## Scanning

Inventory → **Scan** (or Overview → **Scan item**, or `/admin/inventory?scan=1`).

- **Camera:** phone, tablet or laptop camera. Uses the browser's barcode reader where available
  and a bundled decoder elsewhere (iPhone/Safari). Needs HTTPS (the live site is) and camera
  permission. Supports UPC/EAN, Code 128/39/93, ITF, QR and Data Matrix.
- **Handheld USB/Bluetooth scanners:** scan anywhere on the Inventory page — no setup. They
  work like a keyboard, so set the scanner to send **Enter** after each code (the default).
- **Modes:** *Look up* (stock, price, quick sell/receive/edit), *Receive +1*, *Sell −1* and
  *Count* (scan a whole shelf, review differences, then **Apply count**). Every scan is in
  the session list with **Undo**. The scanner reopens in *Look up* so stock never changes by
  accident.
- **New barcodes:** looked up on UPCitemdb (free tier, ~100 lookups/day) to pre-fill name and
  brand → **Create product**, or **Link to existing** to attach the barcode to a product you
  already have.
- Scans of Shopify-linked products mark them **Needs push**; push from the Shopify page.

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
