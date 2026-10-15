import { describe, expect, it, vi } from "vitest";

import { GA_MEASUREMENT_ID, syncAnalytics } from "@/components/site/analytics";

type W = Window & { dataLayer?: IArguments[] };

const events = () =>
  ((window as W).dataLayer ?? [])
    .map((args) => Array.from(args))
    .filter((args) => args[0] === "event");

const click = (html: string) => {
  document.body.innerHTML = html;
  document.querySelector("a")!.addEventListener("click", (e) => e.preventDefault());
  document.querySelector("a")!.click();
};

describe("Google Analytics", () => {
  it("loads GA4 with the store's ID and tracks key actions", () => {
    vi.useFakeTimers();
    syncAnalytics("/");
    vi.runAllTimers();
    vi.useRealTimers();

    expect(GA_MEASUREMENT_ID).toBe("G-14QM0N8626");
    expect(
      document.querySelector(`script[src*="googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}"]`),
    ).not.toBeNull();

    click('<a href="tel:+17133399300">Call</a>');
    click('<a href="https://approve.me/s/x" data-portal="approve-me">Apply</a>');
    click('<a href="https://www.google.com/maps/dir/?api=1&destination=TIC">Directions</a>');
    click('<a href="/leasing">Leasing</a>');

    expect(events().map((e) => e[1])).toEqual(["phone_call", "leasing_apply", "get_directions"]);
    expect(events()[1]?.[2]).toMatchObject({ provider: "approve-me" });
  });

  it("switches GA off on the private dashboard", () => {
    syncAnalytics("/admin/payroll");
    expect((window as unknown as Record<string, unknown>)[`ga-disable-${GA_MEASUREMENT_ID}`]).toBe(
      true,
    );
    syncAnalytics("/");
    expect((window as unknown as Record<string, unknown>)[`ga-disable-${GA_MEASUREMENT_ID}`]).toBe(
      false,
    );
  });
});
