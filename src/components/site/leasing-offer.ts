// Leasing advertising rules (American First Finance notice, Nov 13 2026, and its Marketing Review
// Guide): never advertise an initial/down payment amount; never say "no credit needed", "no credit
// check", "same as cash", "interest-free" or "instant decision" — say "All credit welcome"; when
// listing requirements, list all of them (LEASING_REQUIREMENTS); show AFF_DISCLAIMER wherever
// American First Finance is listed, and describe AFF only with its pre-approved text.

/** American First Finance's required disclaimer, verbatim from its Marketing Review Guide. */
export const AFF_DISCLAIMER =
  "American First Finance: Applications may be for payment solutions through American First Finance or loans originated by FinWise Bank, a Utah-chartered bank, Member FDIC. Products may vary by location. Terms and conditions subject to change at any time without prior disclosure or notice. See agreement for details.";

/** AFF's minimum requirements — if any are listed, all must be. */
export const LEASING_REQUIREMENTS = {
  en: "a photo ID, your SSN or ITIN, and an active bank account and debit card",
  es: "una identificación con foto, tu SSN o ITIN, y una cuenta bancaria activa con tarjeta de débito",
};
