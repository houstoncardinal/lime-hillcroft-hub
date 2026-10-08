import { createFileRoute } from "@tanstack/react-router";
import hero from "@/assets/hero.jpg";
import repair from "@/assets/repair.jpg";

const PHONE = "(713) 339-9300";
const TEL = "tel:+17133399300";
const ADDRESS = "3838 Hillcroft St STE 100, Houston, TX 77057";
const MAPS = "https://www.google.com/maps/search/?api=1&query=TIC+Wireless+3838+Hillcroft+St+Houston+TX";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "TIC Wireless — Phones, Plans & Same-Day Repair in Houston" },
      { name: "description", content: "Unlocked iPhones & Androids with no-credit financing, prepaid plans, Xfinity prepaid internet, same-day repairs and accessories. 3838 Hillcroft St, Houston." },
      { property: "og:title", content: "TIC Wireless — Houston's Go-To Phone Store" },
      { property: "og:description", content: "Phones, prepaid plans, same-day repair & unlocking. Rated 4.7 on Google." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const services = [
  { t: "Unlocked Phones", d: "iPhones and Android phones with no-credit financing and low down payments." },
  { t: "Prepaid Plans", d: "Affordable prepaid cell phone plans — no contracts, no surprises." },
  { t: "Xfinity Prepaid Internet", d: "Fast home internet on a prepaid plan. Sign up in store." },
  { t: "Same-Day Repair", d: "Cracked screens, batteries, charging ports — most fixed in about 30 minutes." },
  { t: "Phone Unlocking", d: "Free your device to use on the carrier you choose." },
  { t: "Accessories", d: "Cases, tempered glass, chargers, cables, AirPods, Galaxy Buds, JBL, memory cards." },
];

const hours = [
  ["Monday – Saturday", "9:00 AM – 8:00 PM"],
  ["Sunday", "9:00 AM – 5:00 PM"],
];

const reviews = [
  { q: "Karla and Jose were very kind and very helpful and quick and efficient to repair my broken screen. Was not in there for that long — 30 minutes maximum.", a: "Google review" },
  { q: "Jose and Karla are the best! They really helped me get a new phone. Very knowledgeable!", a: "Google review · April 2026" },
  { q: "Great service y'all, come and get yours today with Jay.", a: "Google review · February 2026" },
];

function Index() {
  return (
    <main className="overflow-x-hidden">
      <header className="fixed inset-x-0 top-0 z-50 border-b bg-background/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
          <a href="#" className="font-display text-xl">TIC<span className="text-primary">WIRELESS</span></a>
          <nav className="hidden gap-8 text-sm text-muted-foreground md:flex">
            <a href="#services" className="hover:text-primary">Services</a>
            <a href="#repair" className="hover:text-primary">Repair</a>
            <a href="#reviews" className="hover:text-primary">Reviews</a>
            <a href="#visit" className="hover:text-primary">Visit</a>
          </nav>
          <a href={TEL} className="rounded-full bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground shadow-glow">Call {PHONE}</a>
        </div>
      </header>

      <section className="relative flex min-h-screen items-end pb-20 pt-32">
        <img src={hero} alt="Inside TIC Wireless store" width={1600} height={912} className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/10" />
        <div className="relative mx-auto w-full max-w-6xl px-5">
          <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/40 px-4 py-1 text-sm text-primary">★ 4.7 on Google · Houston, TX</p>
          <h1 className="max-w-4xl text-5xl leading-[0.95] md:text-8xl">
            New phone. <span className="text-outline">Fixed</span> phone. <span className="text-primary">Same day.</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg text-muted-foreground">Unlocked phones with no-credit financing, prepaid plans, fast repairs and every accessory you need — right on Hillcroft.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href={MAPS} target="_blank" rel="noreferrer" className="rounded-full bg-primary px-7 py-3 font-semibold text-primary-foreground shadow-glow">Get directions</a>
            <a href={TEL} className="rounded-full border px-7 py-3 font-semibold hover:border-primary hover:text-primary">{PHONE}</a>
          </div>
        </div>
      </section>

      <section className="border-y bg-primary py-4 text-primary-foreground">
        <div className="flex animate-pulse justify-center gap-10 whitespace-nowrap font-display text-sm uppercase md:text-base">
          <span>No credit financing</span><span>•</span><span>Low down payment</span><span>•</span><span className="hidden md:inline">Same-day repair</span><span className="hidden md:inline">•</span><span>Unlocking</span>
        </div>
      </section>

      <section id="services" className="mx-auto max-w-6xl px-5 py-24">
        <h2 className="text-4xl md:text-6xl">Everything <span className="text-primary">mobile.</span></h2>
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <div key={s.t} className="group rounded-xl border bg-card p-7 transition hover:-translate-y-1 hover:border-primary hover:shadow-glow">
              <span className="font-display text-primary">0{i + 1}</span>
              <h3 className="mt-4 text-xl">{s.t}</h3>
              <p className="mt-2 text-muted-foreground">{s.d}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="repair" className="mx-auto grid max-w-6xl items-center gap-12 px-5 pb-24 md:grid-cols-2">
        <img src={repair} alt="Technician repairing a phone screen" loading="lazy" width={1200} height={912} className="rounded-2xl border shadow-glow" />
        <div>
          <h2 className="text-4xl md:text-5xl">Cracked screen? <span className="text-primary">30 minutes.</span></h2>
          <p className="mt-5 text-lg text-muted-foreground">Our techs handle screens, batteries, charging ports and more for iPhone, Samsung and other Android devices — most while you wait. Clear explanations, honest pricing.</p>
          <a href={TEL} className="mt-8 inline-block rounded-full bg-primary px-7 py-3 font-semibold text-primary-foreground">Call for a quote</a>
        </div>
      </section>

      <section id="reviews" className="bg-card py-24">
        <div className="mx-auto max-w-6xl px-5">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 className="text-4xl md:text-6xl">Loved by <span className="text-primary">Houston.</span></h2>
            <p className="font-display text-5xl text-primary">4.7★</p>
          </div>
          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {reviews.map((r) => (
              <figure key={r.q} className="rounded-xl border bg-background p-7">
                <p className="text-primary">★★★★★</p>
                <blockquote className="mt-4 text-lg">“{r.q}”</blockquote>
                <figcaption className="mt-4 text-sm text-muted-foreground">{r.a}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section id="visit" className="mx-auto grid max-w-6xl gap-10 px-5 py-24 md:grid-cols-2">
        <div>
          <h2 className="text-4xl md:text-6xl">Come <span className="text-primary">see us.</span></h2>
          <p className="mt-6 text-xl">{ADDRESS}</p>
          <a href={TEL} className="mt-2 block text-xl text-primary">{PHONE}</a>
          <div className="mt-8 space-y-3">
            {hours.map(([d, h]) => (
              <div key={d} className="flex justify-between border-b pb-3"><span className="text-muted-foreground">{d}</span><span className="font-semibold">{h}</span></div>
            ))}
          </div>
          <div className="mt-8 flex gap-3">
            <a href={MAPS} target="_blank" rel="noreferrer" className="rounded-full bg-primary px-7 py-3 font-semibold text-primary-foreground">Directions</a>
            <a href="https://www.facebook.com/ticwireless" target="_blank" rel="noreferrer" className="rounded-full border px-7 py-3 font-semibold hover:border-primary hover:text-primary">Facebook</a>
          </div>
        </div>
        <iframe title="TIC Wireless location" className="min-h-[380px] w-full rounded-2xl border" loading="lazy" src="https://maps.google.com/maps?q=3838%20Hillcroft%20St%20STE%20100%2C%20Houston%2C%20TX%2077057&z=15&output=embed" />
      </section>

      <footer className="border-t py-8 text-center text-sm text-muted-foreground">© {new Date().getFullYear()} TIC Wireless · Houston, TX</footer>
    </main>
  );
}
