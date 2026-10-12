// Share images (1200×630) for each page, generated into public/og by `npm run seo:og`.
// The id + language names the file, so every page and translation has its own image.
export const ogImage = (id: string, lang?: string) => `/og/${lang ? `${id}-${lang}` : id}.jpg`;
