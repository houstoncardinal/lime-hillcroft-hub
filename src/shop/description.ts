// Shopify product descriptions (Body HTML) as structured blocks, so product pages can lay them out
// — summary, paragraphs, highlights, a specs table, notes and photo credits — instead of one run of
// plain text. Parsed on the server with plain string matching (no DOM); only text, bold, italics and
// http(s) links survive, so nothing from Shopify is ever injected as HTML.

export type Inline = { text: string; strong?: boolean; em?: boolean; href?: string };

export type DescriptionBlock =
  | { type: "lead"; text: Inline[] }
  | { type: "heading"; text: string }
  | { type: "paragraph"; text: Inline[] }
  | { type: "list"; items: Inline[][] }
  | { type: "specs"; rows: [string, string][] }
  | { type: "note"; text: Inline[] }
  | { type: "fine"; text: Inline[] };

const ENTITIES: Record<string, string> = {
  amp: "&",
  lt: "<",
  gt: ">",
  quot: '"',
  apos: "'",
  nbsp: " ",
  ndash: "–",
  mdash: "—",
  hellip: "…",
  rsquo: "’",
  lsquo: "‘",
  rdquo: "”",
  ldquo: "“",
  trade: "™",
  reg: "®",
  copy: "©",
  deg: "°",
  times: "×",
  middot: "·",
  bull: "•",
};

export const decodeEntities = (s: string) =>
  s.replace(/&(#x[0-9a-f]+|#\d+|[a-z]+);/gi, (m, code: string) => {
    if (code[0] === "#") {
      const n = code[1] === "x" || code[1] === "X" ? parseInt(code.slice(2), 16) : Number(code.slice(1));
      return Number.isFinite(n) && n > 0 && n < 0x110000 ? String.fromCodePoint(n) : m;
    }
    return ENTITIES[code.toLowerCase()] ?? m;
  });

const plain = (html: string) =>
  decodeEntities(html.replace(/<br\s*\/?>/gi, " ").replace(/<[^>]+>/g, " "))
    .replace(/\s+/g, " ")
    .trim();

const safeHref = (tag: string) => {
  const href = decodeEntities(/\bhref\s*=\s*("([^"]*)"|'([^']*)')/i.exec(tag)?.slice(2).find(Boolean) ?? "");
  return /^https?:\/\//i.test(href) ? href : undefined;
};

/** Inline HTML → text runs with bold / italic / link, whitespace collapsed. */
export function parseInline(html: string): Inline[] {
  const out: Inline[] = [];
  let strong = 0;
  let em = 0;
  let href: string | undefined;
  for (const [token] of html.replace(/<br\s*\/?>/gi, " ").matchAll(/<[^>]*>|[^<]+/g)) {
    const tag = /^<(\/?)([a-z0-9]+)/i.exec(token);
    if (tag) {
      const close = tag[1] === "/";
      const name = tag[2]!.toLowerCase();
      if (name === "strong" || name === "b") strong += close ? -1 : 1;
      else if (name === "em" || name === "i") em += close ? -1 : 1;
      else if (name === "a") href = close ? undefined : safeHref(token);
      continue;
    }
    const text = decodeEntities(token).replace(/\s+/g, " ");
    if (!text) continue;
    const run: Inline = { text };
    if (strong > 0) run.strong = true;
    if (em > 0) run.em = true;
    if (href) run.href = href;
    const last = out[out.length - 1];
    if (last && last.strong === run.strong && last.em === run.em && last.href === run.href)
      last.text += text;
    else out.push(run);
  }
  // Trim the outer edges and drop runs that end up empty.
  if (out[0]) out[0].text = out[0].text.trimStart();
  const end = out[out.length - 1];
  if (end) end.text = end.text.trimEnd();
  return out.filter((r) => r.text);
}

export const inlineText = (runs: Inline[]) => runs.map((r) => r.text).join("");

/** True when every visible character sits inside the given formatting (e.g. a bold-only line). */
const all = (runs: Inline[], key: "strong" | "em") =>
  runs.length > 0 && runs.every((r) => r[key] || !r.text.trim());

function table(html: string): [string, string][] {
  const rows: [string, string][] = [];
  for (const [, row = ""] of html.matchAll(/<tr\b[^>]*>([\s\S]*?)<\/tr>/gi)) {
    const cells = [...row.matchAll(/<t([hd])\b[^>]*>([\s\S]*?)<\/t[hd]>/gi)].map((c) => plain(c[2] ?? ""));
    if (cells.length >= 2) rows.push([cells[0]!, cells.slice(1).filter(Boolean).join(" · ")]);
    else if (cells[0]) rows.push(["", cells[0]]);
  }
  return rows.filter(([k, v]) => k || v);
}

const BLOCK = /<(p|h[1-6]|ul|ol|table|div|section|blockquote)\b[^>]*>([\s\S]*?)<\/\1\s*>/gi;

function blocks(html: string, out: DescriptionBlock[]) {
  let at = 0;
  const loose = (chunk: string) => {
    // Text between block tags (or a description typed without any): paragraphs split on <br><br>.
    for (const part of chunk.split(/(?:<br\s*\/?>\s*){2,}|\n\s*\n/i)) {
      const text = parseInline(part);
      if (inlineText(text)) out.push({ type: "paragraph", text });
    }
  };
  for (const m of html.matchAll(BLOCK)) {
    loose(html.slice(at, m.index));
    at = m.index! + m[0].length;
    const tag = m[1]!.toLowerCase();
    const inner = m[2] ?? "";
    if (tag[0] === "h") {
      const text = plain(inner);
      if (text) out.push({ type: "heading", text });
    } else if (tag === "ul" || tag === "ol") {
      const items = [...inner.matchAll(/<li\b[^>]*>([\s\S]*?)<\/li>/gi)]
        .map((li) => parseInline(li[1] ?? ""))
        .filter((t) => inlineText(t));
      if (items.length) out.push({ type: "list", items });
    } else if (tag === "table") {
      const rows = table(inner);
      if (rows.length) out.push({ type: "specs", rows });
    } else if (tag === "p") {
      const text = parseInline(inner);
      if (!inlineText(text)) continue;
      if (/^\s*<small\b/i.test(inner)) out.push({ type: "fine", text });
      // A bold-only line opens the description (its summary) or acts as a heading later on.
      else if (all(text, "strong"))
        out.push(out.length ? { type: "heading", text: inlineText(text) } : { type: "lead", text });
      else if (all(text, "em")) out.push({ type: "note", text: text.map(({ em: _, ...r }) => r) });
      else out.push({ type: "paragraph", text });
    } else blocks(inner, out); // div / section / blockquote: look inside
  }
  loose(html.slice(at));
}

/** Shopify Body HTML → ordered blocks. Empty input gives no blocks. */
export function parseDescription(html: string): DescriptionBlock[] {
  const out: DescriptionBlock[] = [];
  blocks(html.replace(/<!--[\s\S]*?-->/g, "").replace(/<(script|style)\b[\s\S]*?<\/\1>/gi, ""), out);
  // A bold-only first line is the summary; un-bold it so the page styles it as a lead.
  const first = out[0];
  if (first?.type !== "lead") return out;
  first.text = first.text.map(({ strong: _, ...r }) => r);
  // Many device descriptions repeat the summary sentence inside the overview; show it once.
  const lead = inlineText(first.text).trim();
  for (const b of out) {
    if (b.type !== "paragraph" || lead.length <= 20 || !inlineText(b.text).includes(lead)) continue;
    for (const r of b.text) r.text = r.text.replace(lead, "").replace(/\s{2,}/g, " ");
    b.text = b.text.filter((r) => r.text);
    if (b.text[0]) b.text[0].text = b.text[0].text.trimStart();
    const end = b.text[b.text.length - 1];
    if (end) end.text = end.text.trimEnd();
  }
  return out.filter((b) => b.type !== "paragraph" || inlineText(b.text).trim());
}

/** Short plain-text summary for meta tags and structured data: the lead and opening paragraph. */
export function descriptionSummary(details: DescriptionBlock[]) {
  const parts: string[] = [];
  for (const b of details) {
    if (b.type === "lead" || b.type === "paragraph") parts.push(inlineText(b.text));
    else if (b.type !== "heading" || parts.length) break;
    if (parts.length === 2) break;
  }
  return parts.join(" ").trim();
}

/** All spec-table rows, for Product structured data (additionalProperty). */
export const specRows = (details: DescriptionBlock[]) =>
  details.flatMap((b) => (b.type === "specs" ? b.rows.filter(([k, v]) => k && v) : []));
