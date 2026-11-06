import { describe, expect, it } from "vitest";
import { PORTALS } from "@/components/site/leasing-portals";

describe("Leasing application destinations", () => {
  it("lists Acima first, with the store's merchant application", () => {
    expect(PORTALS[0]?.id).toBe("acima");
    expect(PORTALS[0]?.href).toBe(
      "https://apply.acima.com/auth/v2/otp-start?app_id=lo&utm_source=web&utm_medium=merchant&location_guid=loca-620e6e7f-a8d0-4d60-8e39-4519408e72bb&lang=en",
    );
  });

  it("opens the approved Progressive Leasing dealer application", () => {
    expect(PORTALS.find((portal) => portal.id === "progressive-leasing")?.href).toBe(
      "https://approve.me/s/ticwireless/69977#/marketing",
    );
  });
});