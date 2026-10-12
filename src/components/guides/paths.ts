import { ALTERNATES, type Lang } from "@/components/site/seo";

export const guidePath = (lang: Lang, slug: string) => `${ALTERNATES.guides[lang]}/${slug}`;
export const guidePaths = (slug: string) => ({
  en: guidePath("en", slug),
  es: guidePath("es", slug),
});
