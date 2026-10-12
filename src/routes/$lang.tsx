import { createFileRoute, notFound } from "@tanstack/react-router";

import { intlHead } from "@/components/intl/heads";
import { findIntl } from "@/components/intl/languages";
import { IntlPage } from "@/components/intl/intl-page";

// Summary pages in additional languages: /vi, /zh, /ar, /ur, /hi, /fr, /pt, /ko, /tl.
export const Route = createFileRoute("/$lang")({
  loader: ({ params }) => {
    if (!findIntl(params.lang)) throw notFound();
    return { code: params.lang };
  },
  head: ({ loaderData }) => intlHead(loaderData ? findIntl(loaderData.code) : undefined),
  component: Intl,
});

function Intl() {
  const { code } = Route.useLoaderData();
  const l = findIntl(code);
  return l ? <IntlPage l={l} /> : null;
}
