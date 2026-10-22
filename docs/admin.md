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
refused. Addresses are shared in the dashboard; use a view-only camera account.

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

## Shared Cloud storage

The dashboard retains the configured email/password admin login in a 12-hour HTTP-only cookie.
All shared data reads and writes validate that session server-side. The private `store_state`
table grants access only to the server role; browser roles have no read or write privileges.
Each save checks the previous revision. Conflicting edits are rejected and reloaded, rather
than silently replacing changes made on another device. Failed saves show an error.

New dashboards start empty, never with sample inventory, payroll or traffic. Old browser-local
records are not automatically uploaded: export the old backup or use the previous-record import
control in Settings. Review sample data before importing. Public events are stored separately in
`site_events`; the dashboard reads the most recent 90 days without mixing local/sample visits.

The earlier SQL file in `supabase/migrations` describes an unused alternative Auth-backed schema;
it is not the active storage model. The applied schema is managed under `drizzle/migrations`.
Camera configurations are shared; browser-specific camera device IDs still only work on the device
that supplied them. Use view-only camera addresses, never embedded private passwords.

## Shopify

The current admin session authorizes every sync call. No separate browser API key is needed.
The existing Shopify connection supplies `SHOPIFY_ACCESS_TOKEN` and `SHOPIFY_STORE_DOMAIN`.
API version is 2026-10. The configured `SHOPIFY_LOCATION_ID` is used, or the first location.
Imports read that location's **available** quantity, not the total across locations. Pending local
changes are retained. Pushes compare against the last confirmed Shopify quantity to reject stale
updates. Existing records without a comparison baseline must be imported before pushing.

Payroll remains gross pay only; tax withholding and filings belong to the payroll provider.
