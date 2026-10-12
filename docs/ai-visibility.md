# Getting TIC Wireless mentioned by AI (Google AI Overviews, Gemini, ChatGPT, Perplexity, Copilot)

AI answers about local businesses are built from (1) Google/Bing's index of the website,
(2) the Google Business Profile and map data, and (3) what other trusted sites say. The website
part is done; the rest is a checklist only the owner can do.

## Done on the website

- `robots.txt` explicitly allows the AI search crawlers (Google, Bing, OpenAI, Perplexity,
  Anthropic, Apple, DuckDuckGo, Meta, Amazon) on public pages; `/admin` stays blocked.
- `/llms.txt` and `/llms-full.txt` — plain-text business facts for AI assistants
  (llmstxt.org convention). Keep them in sync with the site when facts change.
- "At a glance" section on the home page (English + Spanish): a one-sentence definition of the
  business and key facts — the format AI answers quote.
- FAQ sections answering real questions (location, hours, repairs, leasing, unlocking, bill
  pay, the move) in English and Spanish, rendered in the page HTML.
- schema.org structured data: MobilePhoneStore with address, map pin, hours, phone, services,
  areas served, languages, `knowsAbout` topics, `sameAs` profiles, FAQ, breadcrumbs, products,
  and `dateModified` (bump `SITE_UPDATED` in `src/components/site/schema.ts` when facts change).
- Sitemap with English/Spanish alternates; canonical URLs; Lighthouse SEO 100.

## Guides (the pages AI answers cite)

`/guides` (Spanish `/es/guias`): four question-answering guides — cracked screen repair vs.
replace, how lease-to-own works, how to unlock a phone and switch carriers, choosing a prepaid
plan in Houston. Each opens with a **Quick answer** block (what AI Overviews quote), has dated
Article + FAQ structured data authored by the store, and links to the matching service. Add a new
guide by adding an entry to `src/components/guides/data.ts` — answer a real customer question,
use only facts you can stand behind, and update the `updated` date when you edit it.

## Search-engine plumbing

- Every page allows full-length snippets (`max-snippet:-1`) so Google's AI features may quote it.
- Preview shop product pages are `noindex` until Shopify is live (placeholder prices never get
  indexed); they're re-included automatically when the Shopify catalog is connected.
- `npm run seo:sitemap` regenerates `public/sitemap.xml` from the site's pages (run after adding
  areas or guides; set `INCLUDE_PRODUCTS=1` once Shopify is live).
- `npm run seo:indexnow` pings IndexNow (Bing — which powers ChatGPT and Copilot search — plus
  Yandex and others) with every URL. Run it after each deploy to the **live** domain; the key file
  is `public/<key>.txt`. Set `SITE_URL=https://your-domain` when using a custom domain.

## Service-area pages

`/areas` (Spanish `/es/zonas`) has a ZIP-code finder and one page per nearby area: Mahatma Gandhi
District (Harwin), Gulfton, Sharpstown, Westchase, Galleria/Uptown, Bellaire, Alief and
Meyerland — each in English and Spanish (16 pages). Each page has real drive distance and time
(OpenStreetMap routing, no traffic), the route by road name, the area's ZIP codes, verified local
facts, area-specific reasons and FAQ, and Service + FAQ structured data. They are written to be
genuinely different from each other (about 58% average text overlap, mostly the shared store
facts) — Google penalizes near-identical "doorway" pages, so **don't clone a page to add an
area; add a real entry in `src/components/areas/data.ts` and `local.ts` with its own facts.**

Promote them: link each page from Google Business Profile posts aimed at that area, and mention
the neighborhood in replies to reviews from customers there.

## Owner checklist (highest impact first)

1. **Custom domain.** AI tools trust a real domain (e.g. ticwireless.com) far more than a
   `*.lovable.app` address. After switching, update `VITE_SITE_URL`, `public/sitemap.xml`,
   `public/robots.txt`, `public/llms*.txt` and the Tidio docs.
2. **Google Business Profile** (business.google.com) — this feeds AI Overviews and Gemini
   directly:
   - Website field → the site; confirm hours (including Sunday) and holiday hours.
   - Categories: Cell phone store (primary), Cell phone accessory store, Mobile phone repair
     shop, Screen repair service.
   - Add services and products (repairs, unlocking, leasing, prepaid plans, accessories).
   - Post weekly (new arrivals like iPhone 18 Pro Max, deals) and upload fresh photos.
   - Answer the Q&A section; reply to every review.
3. **Fix the old address everywhere.** Yelp, MapQuest, Waze, Apple Maps and directories still
   show 3838 Hillcroft St, Suite 100. Inconsistent name/address/phone is the #1 reason AI and
   maps give wrong answers. Use exactly: *TIC Wireless, 3640 Hillcroft St, Houston, TX 77057,
   (713) 339-9300*.
4. **Bing Webmaster Tools** (bing.com/webmasters) — ChatGPT and Copilot search use Bing.
   Verify the site and submit the sitemap. Also claim **Bing Places**.
5. **Google Search Console** — verify the site, submit the sitemap, request indexing for the
   home, leasing and shop pages.
6. **Apple Business Connect** (businessconnect.apple.com) — Siri and Apple Maps answers.
7. **Reviews.** Ask happy customers for Google reviews that mention what they came in for
   ("fixed my iPhone screen in an hour", "got a phone with no credit"). AI summaries quote
   review themes.
8. **Mentions on other sites.** Local news, Houston community pages, carrier dealer locators
   (Cricket, Boost, Metro, Simple Mobile store finders) and Facebook/TikTok posts that link to
   the website all add trust.
9. **Keep facts current.** When hours, prices policy or services change, update the site,
   `/llms.txt`, Google Business Profile and the Tidio data together.

## Checking progress

Every few weeks, ask Google (AI Mode), ChatGPT, Perplexity and Copilot questions like
"cell phone store with leasing near Hillcroft Houston", "iPhone screen repair Southwest
Houston", "tienda de celulares a pagos en Houston" and note whether TIC Wireless is named and
whether the details are correct. There is no switch that guarantees an AI mention — these steps
raise the odds and make sure what AI says is accurate.
