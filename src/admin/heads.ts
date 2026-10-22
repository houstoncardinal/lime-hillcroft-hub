export function adminHead(section: string) {
  const title = `${section} | TIC Wireless Staff`;
  const description = `Private TIC Wireless ${section.toLowerCase()} dashboard for authorized staff.`;
  return { meta: [{ title }, { name: "description", content: description }, { property: "og:title", content: title }, { property: "og:description", content: description }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary" }, { name: "robots", content: "noindex, nofollow" }] };
}