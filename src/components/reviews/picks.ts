import { REVIEWS, type Review } from "@/components/reviews/data";

// Three real Google reviews (word for word, from REVIEWS) that match what a page is about.
// Picked by author; every pick is checked in src/test/content.test.ts.
export const REVIEW_PICKS = {
  repair: ["Kevin G.", "Anabelkis C.", "Nickali1785"],
  phones: ["Jonathan M.", "Zariahia H.", "Keisha A."],
  leasing: ["Brenda T.", "Amner S.", "Jackie A."],
  consoles: ["Jasmin H.", "Desiree B.", "Zaque S."],
  laptops: ["Kalsum A.", "Jojo L.", "Eric R."],
  accessories: ["Michael R.", "Greyci M.", "Vance V."],
  plans: ["Guadalupe M.", "Nigel G.", "JD C."],
  bills: ["Celia L.", "Luis V.", "Gus R."],
  trade: ["Ronal L.", "Abel B.", "Griselda F."],
  general: ["Griselda F.", "Kevin G.", "Gus R."],
} as const satisfies Record<string, readonly string[]>;

export type ReviewPick = keyof typeof REVIEW_PICKS;

export const pickedReviews = (pick: ReviewPick): Review[] =>
  REVIEW_PICKS[pick]
    .map((name) => REVIEWS.find((r) => r.author === name))
    .filter((r): r is Review => Boolean(r));
