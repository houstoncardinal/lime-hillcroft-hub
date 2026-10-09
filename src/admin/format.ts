// Display formatters shared by the dashboard screens.
export const money = (cents: number) =>
  (cents / 100).toLocaleString("en-US", { style: "currency", currency: "USD" });

export const compact = (n: number) =>
  n >= 10_000 ? `${(n / 1000).toFixed(1)}K` : n.toLocaleString("en-US");
