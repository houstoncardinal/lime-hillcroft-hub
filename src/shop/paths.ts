import { ALTERNATES, type Lang } from "@/components/site/seo";

export const productPath = (lang: Lang, handle: string) => `${ALTERNATES.shop[lang]}/${handle}`;

export const productPaths = (handle: string) => ({
  en: productPath("en", handle),
  es: productPath("es", handle),
});
