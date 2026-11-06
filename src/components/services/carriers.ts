// The prepaid carriers TIC Wireless activates in store — the same nine that have plan cards in
// prepaid-plans.ts (a test keeps the two in step). Every count and list on the site reads this.
export const PREPAID_CARRIERS = [
  "T-Mobile Prepaid",
  "Verizon Prepaid",
  "AT&T Prepaid",
  "Cricket",
  "Simple Mobile",
  "Tracfone",
  "H2O Wireless",
  "Lyca Mobile",
  "Gen Mobile",
] as const;

export const CARRIER_COUNT = PREPAID_CARRIERS.length;

/** "A, B and C" / "A, B y C". */
export const carrierList = (lang: "en" | "es" = "en") =>
  `${PREPAID_CARRIERS.slice(0, -1).join(", ")} ${lang === "es" ? "y" : "and"} ${PREPAID_CARRIERS.at(-1)}`;
