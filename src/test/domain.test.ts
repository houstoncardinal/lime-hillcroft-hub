import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

import { homeHead } from "@/components/pages/heads";
import { SITE_URL, absoluteUrl } from "@/components/site/seo";

// The site must only ever present its live domain to search engines and AI tools, never a
// hosting provider's temporary address.
const TEMP_HOST = /lovable\.app|netlify\.app/i;

describe("Live domain", () => {
  it("uses https://www.ticwireless.com for every absolute URL", () => {
    expect(SITE_URL).toBe("https://www.ticwireless.com");
    expect(absoluteUrl("/es")).toBe("https://www.ticwireless.com/es");
  });

  it("puts the live domain in canonical, share tags and schema", () => {
    const head = JSON.stringify(homeHead("en"));
    expect(head).toContain('"https://www.ticwireless.com/"');
    expect(head).toContain("https://www.ticwireless.com/#store");
    expect(head).not.toMatch(TEMP_HOST);
  });

  it.each(["public/sitemap.xml", "public/robots.txt", "public/llms.txt", "public/llms-full.txt"])(
    "%s only references the live domain",
    (file) => {
      const text = readFileSync(file, "utf8");
      expect(text).toContain("https://www.ticwireless.com");
      expect(text).not.toMatch(TEMP_HOST);
    },
  );
});
