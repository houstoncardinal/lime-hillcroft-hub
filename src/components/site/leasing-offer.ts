// In-store lease-to-own is separate from online Shop Pay Installments.
// The advertised initial payment is Acima's (owner's rule). The copy says "as low as $49 initial
// payment*", and a separate disclaimer line under it says it's with Acima, one of our leasing
// providers, and that terms and conditions apply (see site/acima-link.tsx); the footnote below
// adds the details where the partners are listed.
export const LEASING_INITIAL_PAYMENT_USD = 49;
export const LEASING_INITIAL_PAYMENT_PARTNER = "Acima";
/** TIC Wireless's Acima application; every "Acima" in the site's text links here. */
export const ACIMA_URL =
  "https://apply.acima.com/auth/v2/otp-start?app_id=lo&utm_source=web&utm_medium=merchant&location_guid=loca-620e6e7f-a8d0-4d60-8e39-4519408e72bb&lang=en";

/**
 * The footnote for "as low as $49 initial payment*": a bold lead naming Acima and the terms, then
 * the details; shown with Acima's own disclaimer wherever the amount is advertised.
 */
export const INITIAL_PAYMENT_NOTE = {
  en: {
    lead: `*As low as $${LEASING_INITIAL_PAYMENT_USD} initial payment is with ${LEASING_INITIAL_PAYMENT_PARTNER}, one of our leasing providers. Terms and conditions apply.`,
    rest: "Your actual initial payment and your weekly, biweekly or monthly payments depend on the item you choose, your approval and your lease agreement. Lease-to-own is a lease, not a loan or credit. Initial payments, payments and terms with our other leasing providers vary.",
  },
  es: {
    lead: `*Desde $${LEASING_INITIAL_PAYMENT_USD} de pago inicial con ${LEASING_INITIAL_PAYMENT_PARTNER}, uno de nuestros proveedores de arrendamiento. Aplican términos y condiciones.`,
    rest: "Tu pago inicial real y tus pagos semanales, quincenales o mensuales dependen del equipo que elijas, de tu aprobación y de tu contrato de arrendamiento. El arrendamiento con opción a compra no es un préstamo ni crédito. El pago inicial, los pagos y los términos con nuestros otros proveedores de arrendamiento varían.",
  },
};
