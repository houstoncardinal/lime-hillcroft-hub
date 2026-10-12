import { ALTERNATES, type Lang } from "@/components/site/seo";

export const servicePath = (lang: Lang, slug: string) => `${ALTERNATES.services[lang]}/${slug}`;
export const servicePaths = (slug: string) => ({
  en: servicePath("en", slug),
  es: servicePath("es", slug),
});
