import { expect, it } from "vitest";
import { isRequestConnectionError } from "@/lib/request-errors";
it("recognizes failed transport without treating application failures as connectivity problems", () => {
  expect(isRequestConnectionError(new TypeError("Failed to fetch"))).toBe(true);
  expect(isRequestConnectionError(new Error("Unauthorized"))).toBe(false);
  expect(isRequestConnectionError(new Error("Could not save stock"))).toBe(false);
});