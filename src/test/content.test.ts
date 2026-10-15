import { describe, expect, it } from "vitest";

import { REVIEW_PICKS, pickedReviews, type ReviewPick } from "@/components/reviews/picks";

describe("Review quotes on topic pages", () => {
  it.each(Object.keys(REVIEW_PICKS) as ReviewPick[])(
    "%s shows three real reviews from REVIEWS",
    (pick) => {
      const reviews = pickedReviews(pick);
      expect(reviews).toHaveLength(3);
      expect(reviews.map((r) => r.author)).toEqual([...REVIEW_PICKS[pick]]);
    },
  );
});
