import { ChevronDown } from "lucide-react";

import type { Faq } from "@/components/site/schema";

// Native <details> keeps every answer in the server-rendered HTML for search engines,
// and works without JavaScript.
export function FaqList({ items }: { items: Faq[] }) {
  return (
    <div className="border-t">
      {items.map((f) => (
        <details key={f.q} className="group border-b">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-6 text-left font-display text-lg font-semibold md:text-xl [&::-webkit-details-marker]:hidden">
            <h3>{f.q}</h3>
            <ChevronDown className="h-5 w-5 shrink-0 text-muted-foreground transition group-open:rotate-180" />
          </summary>
          <p className="pb-6 text-base leading-relaxed text-muted-foreground">{f.a}</p>
        </details>
      ))}
    </div>
  );
}
