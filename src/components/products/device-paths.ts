import type { Lang, Paths } from "@/components/site/seo";

// Each in-store device's own page (/devices/<id>, /es/equipos/<id>).
const BASE = { en: "/devices", es: "/es/equipos" } as const;

export const devicePath = (lang: Lang, id: string) => `${BASE[lang]}/${id}`;
export const devicePaths = (id: string): Paths => ({
  en: devicePath("en", id),
  es: devicePath("es", id),
});
