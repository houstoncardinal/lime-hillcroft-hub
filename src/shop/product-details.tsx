import { Check, Info } from "lucide-react";

import { MoneyText } from "@/components/intl/money";
import type { Lang } from "@/components/site/seo";
import { SHOP_COPY } from "@/shop/copy";
import type { DescriptionBlock, Inline } from "@/shop/description";
import type { ShopProduct } from "@/shop/types";
import { cn } from "@/lib/utils";

// Lays out a product's Shopify description: overview, highlights and store details on the left, the
// specs table and its notes on the right (stacked on phones). Headings come from Shopify; the common
// ones are shown in Spanish on /es pages.

const ES_HEADINGS: Record<string, string> = {
  highlights: "Características",
  features: "Características",
  "key features": "Características",
  specs: "Especificaciones",
  specifications: "Especificaciones",
  "tech specs": "Especificaciones",
  "what's in the box": "Contenido de la caja",
  "in the box": "Contenido de la caja",
  overview: "Descripción",
};

const heading = (text: string, lang: Lang) =>
  (lang === "es" && ES_HEADINGS[text.toLowerCase().replace(/[:\s]+$/, "")]) || text;

export function InlineText({ runs }: { runs: Inline[] }) {
  return (
    <>
      {runs.map((r, i) => {
        let node: React.ReactNode = <MoneyText text={r.text} />;
        if (r.strong) node = <strong className="font-semibold text-foreground">{node}</strong>;
        if (r.em) node = <em>{node}</em>;
        if (r.href)
          node = (
            <a
              href={r.href}
              target="_blank"
              rel="noopener noreferrer"
              className="underline decoration-border underline-offset-2 transition hover:text-primary hover:decoration-primary"
            >
              {node}
            </a>
          );
        return <span key={i}>{node}</span>;
      })}
    </>
  );
}

type Group = { title: string | null; blocks: DescriptionBlock[] };

/** Blocks under each heading. The lead is shown under the product title instead. */
function groups(details: DescriptionBlock[]) {
  const out: Group[] = [{ title: null, blocks: [] }];
  for (const b of details) {
    if (b.type === "lead") continue;
    if (b.type === "heading") out.push({ title: b.text, blocks: [] });
    else out[out.length - 1]!.blocks.push(b);
  }
  return out.filter((g) => g.blocks.length);
}

/** Older products and the preview catalog: plain description text plus a features list. */
export function productDetails(product: ShopProduct, lang: Lang): DescriptionBlock[] {
  if (product.details?.length) return product.details;
  const out: DescriptionBlock[] = product.description
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean)
    .map((p) => ({ type: "paragraph", text: [{ text: p }] }));
  if (product.features.length)
    out.push(
      { type: "heading", text: SHOP_COPY[lang].features },
      { type: "list", items: product.features.map((f) => [{ text: f }]) },
    );
  return out;
}

export const productLead = (product: ShopProduct) =>
  product.details?.[0]?.type === "lead" ? product.details[0].text : null;

function Body({ block }: { block: DescriptionBlock }) {
  switch (block.type) {
    case "paragraph":
      return (
        <p className="leading-relaxed text-muted-foreground">
          <InlineText runs={block.text} />
        </p>
      );
    case "list":
      return (
        <ul className="grid gap-2.5 sm:grid-cols-2">
          {block.items.map((item, i) => (
            <li
              key={i}
              className="flex items-start gap-3 rounded-2xl border bg-card p-4 text-sm font-medium leading-snug"
            >
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Check className="h-3.5 w-3.5" strokeWidth={3} />
              </span>
              <span className="min-w-0 pt-0.5">
                <InlineText runs={item} />
              </span>
            </li>
          ))}
        </ul>
      );
    case "specs":
      return (
        <dl className="overflow-hidden rounded-3xl border bg-card">
          {block.rows.map(([label, value], i) => (
            <div
              key={i}
              className={cn(
                "grid gap-1 border-b px-5 py-3.5 last:border-b-0 sm:px-6",
                label && "sm:grid-cols-[10.5rem_minmax(0,1fr)] sm:gap-4",
              )}
            >
              {label && (
                <dt className="text-xs font-semibold uppercase tracking-wider text-muted-foreground sm:pt-0.5">
                  {label}
                </dt>
              )}
              <dd className="break-words font-medium leading-snug">
                <MoneyText text={value} />
              </dd>
            </div>
          ))}
        </dl>
      );
    case "note":
      return (
        <p className="flex items-start gap-3 rounded-2xl bg-secondary p-4 text-sm leading-relaxed text-muted-foreground">
          <Info className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
          <span>
            <InlineText runs={block.text} />
          </span>
        </p>
      );
    case "fine":
      return (
        <p className="text-xs leading-relaxed text-muted-foreground/80">
          <InlineText runs={block.text} />
        </p>
      );
    default:
      return null;
  }
}

function GroupView({ group, lang, specs }: { group: Group; lang: Lang; specs?: boolean }) {
  return (
    <div>
      {group.title && (
        <h3 className={cn("font-display font-semibold", specs ? "text-2xl" : "text-xl")}>
          {heading(group.title, lang)}
        </h3>
      )}
      <div className={cn("space-y-4", group.title && "mt-4")}>
        {group.blocks.map((b, i) => (
          <Body key={i} block={b} />
        ))}
      </div>
    </div>
  );
}

export function ProductDetails({ product, lang }: { product: ShopProduct; lang: Lang }) {
  const t = SHOP_COPY[lang].details;
  const all = groups(productDetails(product, lang));
  if (!all.length) return null;

  // Specs tables and the notes that go with them on the right; everything else on the left.
  const left: Group[] = [];
  const right: Group[] = [];
  for (const g of all) {
    if (!g.blocks.some((b) => b.type === "specs")) {
      left.push(g);
      continue;
    }
    const side = g.blocks.filter((b) => b.type === "specs" || b.type === "note");
    const rest = g.blocks.filter((b) => b.type !== "specs" && b.type !== "note");
    right.push({ title: g.title ?? t.specs, blocks: side });
    if (rest.length) left.push({ title: null, blocks: rest });
  }
  // Photo credits and other fine print close the section.
  const fine = left.flatMap((g) => g.blocks.filter((b) => b.type === "fine"));
  const main = left
    .map((g) => ({ ...g, blocks: g.blocks.filter((b) => b.type !== "fine") }))
    .filter((g) => g.blocks.length);

  return (
    <section
      aria-labelledby="product-details"
      className="border-t bg-secondary/30"
    >
      <div className="mx-auto max-w-7xl px-5 py-12 md:py-16">
        <h2 id="product-details" className="text-3xl font-semibold md:text-4xl">
          {t.title}
        </h2>
        <div
          className={cn(
            "mt-8 grid gap-10",
            right.length && main.length ? "lg:grid-cols-[1fr_1.1fr] lg:gap-14" : "max-w-3xl",
          )}
        >
          {main.length > 0 && (
            <div className="min-w-0 space-y-10">
              {main.map((g, i) => (
                <GroupView key={i} group={g} lang={lang} />
              ))}
            </div>
          )}
          {right.length > 0 && (
            <div className="min-w-0 space-y-10">
              {right.map((g, i) => (
                <GroupView key={i} group={g} lang={lang} specs />
              ))}
            </div>
          )}
        </div>
        {fine.length > 0 && (
          <div className="mt-10 space-y-1 border-t pt-6">
            {fine.map((b, i) => (
              <Body key={i} block={b} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
