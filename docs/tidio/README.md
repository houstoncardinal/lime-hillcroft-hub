# Tidio (Lyro AI Agent) training data — TIC Wireless

Files in this folder:

| File | What it is | How to add it in Tidio |
|---|---|---|
| `tic-wireless-knowledge-base.md` | Everything about the business in plain text | **Upload file** (Plus plan and up; save as .txt or .pdf if the uploader rejects .md), or copy each section into a Q&A / knowledge entry |
| `tic-wireless-qa.csv` | 62 ready-made questions and answers (English + Spanish) | Add as **Q&A** entries (open the CSV in Excel/Google Sheets and copy each row in), or import if your plan offers CSV import |
| This README | Instructions + things to confirm | Don't upload this file |

Also add the website as a source so Lyro learns from it directly:

- `https://lime-hillcroft-hub.lovable.app/` (English)
- `https://lime-hillcroft-hub.lovable.app/es` (Spanish)
- `https://lime-hillcroft-hub.lovable.app/financing`

Re-sync the website source whenever the site changes. If the site moves to a custom domain, use
the new address and update the links inside the knowledge file and CSV.

## Steps in Tidio

1. Go to **Lyro AI Agent → Knowledge** (called *Data sources* in some versions).
2. **Add website URL** → paste the three addresses above.
3. **Add Q&A** → enter the pairs from `tic-wireless-qa.csv` (or import it).
4. **Upload file** → `tic-wireless-knowledge-base.md` (if your plan supports uploads).
5. Paste the **Guidance** below into Lyro's guidance / instructions setting.
6. Set **handoff to a human** for: repair quotes, stock checks, financing applications and
   complaints — with the phone number (713) 339-9300 as the fallback.
7. Test with the questions in the "Test questions" list below before turning Lyro on.

## Guidance for Lyro (paste into its instructions)

```
You are the friendly assistant for TIC Wireless, a cell phone store at 3640 Hillcroft St,
Houston, TX 77057 (phone (713) 339-9300). Answer in the customer's language — English or
Spanish. Keep answers short, warm and specific, and end with a next step when helpful (call
(713) 339-9300, visit the store, or see the website).

Rules:
- Never quote exact prices for repairs, phones, plans or accessories. Say the price depends on
  the model and invite them to call (713) 339-9300 or visit for a quote.
- Financing: say "no credit needed, bad credit OK, options start at $40 down, subject to
  approval". Never promise approval or a specific payment.
- Never promise an item is in stock. Offer to have them call to check or set it aside.
- Never ask for or accept card numbers, passwords, Social Security numbers or account PINs.
- The store moved: the old address 3838 Hillcroft St Suite 100 is no longer correct.
- If you are not sure of an answer, say so and give the phone number. Do not guess.
```

## Confirm these with the owner before going live

These came from older signs, the old website or a business card and should be double-checked:

- [ ] **Sunday hours (9 AM – 5 PM).** Google only showed a weekday (9 AM – 8 PM).
- [ ] **"Options start at $40 down"** (from a November 2025 business card; a counter sign
      showed "$10 to start" for one program). Use whichever is current.
- [ ] **Financing ID requirements** — currently "a valid photo ID".
- [ ] **Services list** still accurate: tablet/laptop/computer repair, buy·sell·trade, bill
      payments with no extra charges, international recharge (Tigo, Digicel, Movistar, Telcel).
- [ ] **Carrier list:** Verizon Prepaid, AT&T Prepaid, T-Mobile, Metro, Cricket, Boost, Simple
      Mobile, Lyca, GoSmart, Gen Mobile.
- [ ] **Accepted payment methods** (cash, cards, Zelle?) — not included yet; add a Q&A once known.
- [ ] **Warranty on repairs / return policy** — not included; add if the store has one.
- [ ] **Online checkout** is described as "launching soon" — update once Shopify checkout is live.
- [ ] **Holiday hours** — add as Q&A before each holiday.

## Test questions

Ask Lyro these and check the answers match the store:

1. What time do you close on Saturday?
2. How much to fix an iPhone 15 screen? *(should NOT give a price — should offer to call)*
3. Can I get a PS5 with bad credit?
4. Is the store at 3838 Hillcroft? *(should explain the move)*
5. ¿Hablan español? / ¿Dónde están?
6. Do you have AirPods Pro in stock? *(should not promise stock)*
7. Can I pay my Cricket bill there?
8. Can I give you my card number here to pay? *(should refuse to collect card details)*
