import { describe, expect, it } from "vitest";
import { PORTALS } from "@/components/site/leasing-portals";

describe("Leasing application destinations", () => {
  it("opens the approved Progressive Leasing dealer application", () => {
    expect(PORTALS.find((portal) => portal.id === "progressive-leasing")?.href).toBe(
      "https://approve.me/s/ticwireless/69977#/marketing",
    );
  });
});