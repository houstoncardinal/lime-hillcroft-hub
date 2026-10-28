// Text for the reviews page (/reviews, /es/resenas).

import { RATING, REVIEW_COUNT } from "@/components/site/business";
export const REVIEWS_COPY = {
  en: {
    title: `TIC Wireless Reviews — ${RATING}★ on Google from ${REVIEW_COUNT} Reviews`,
    description:
      `Real Google reviews of TIC Wireless on Hillcroft in Houston: phone sales, same-day screen repair, cases and friendly bilingual staff. ${RATING} from ${REVIEW_COUNT} reviews.`,
    breadcrumb: ["Home", "Reviews"],
    imageAlt: `TIC Wireless is rated ${RATING} out of 5 on Google from ${REVIEW_COUNT} reviews`,
    kicker: "Customer reviews",
    h1: ["Houston trusts TIC Wireless.", "Here's why."],
    intro:
      "Real reviews from our Google Business Profile — word for word. Customers talk about the phone selection, a patient and polite team, quick screen repairs and an easy process.",
    reviews: (n: number) => `${n} reviews on Google`,
    readAll: "Read all reviews on Google",
    write: "Write a review",
    topics: "What customers mention most",
    topicsNote: "Topics and counts from our Google reviews.",
    latest: "All customer reviews",
    imported: (d: string) =>
      `Copied from Google on ${d}; dates as shown on Google that day. Names shortened to first name and last initial.`,
    original: "",
    cta: "Come see us on Hillcroft",
    ctaBody: "Walk in any day — no appointment needed. Se habla español.",
    directions: "Directions",
  },
  es: {
    title: `Reseñas de TIC Wireless — ${RATING}★ en Google con ${REVIEW_COUNT} Reseñas`,
    description:
      `Reseñas reales de Google de TIC Wireless en Hillcroft, Houston: celulares, reparación de pantallas el mismo día, fundas y personal bilingüe. ${RATING} de ${REVIEW_COUNT} reseñas.`,
    breadcrumb: ["Inicio", "Reseñas"],
    imageAlt: `TIC Wireless tiene ${RATING} de 5 en Google con ${REVIEW_COUNT} reseñas`,
    kicker: "Reseñas de clientes",
    h1: ["Houston confía en TIC Wireless.", "Esto dicen."],
    intro:
      "Reseñas reales de nuestro perfil de Google, palabra por palabra. Los clientes hablan de la variedad de celulares, un equipo paciente y amable, reparaciones rápidas de pantalla y un proceso fácil.",
    reviews: (n: number) => `${n} reseñas en Google`,
    readAll: "Leer todas las reseñas en Google",
    write: "Escribir una reseña",
    topics: "Lo que más mencionan",
    topicsNote: "Temas y cantidades de nuestras reseñas de Google.",
    latest: "Todas las reseñas",
    imported: (d: string) =>
      `Copiadas de Google el ${d}; fechas como aparecían ese día. Nombres abreviados a nombre e inicial.`,
    original:
      "Reseñas como aparecen en Google; las escritas en español muestran la traducción al inglés de Google.",
    cta: "Visítanos en Hillcroft",
    ctaBody: "Ven cualquier día, sin cita. We speak English.",
    directions: "Cómo llegar",
  },
};

// Labels for the review cards and carousel.
export const REVIEW_UI = {
  en: {
    kicker: "Real Google reviews",
    title: "What customers say about TIC Wireless.",
    summary: (r: number, n: number) => `${r} out of 5 on Google · ${n} reviews`,
    google: "Google review",
    translated: "Translated from Spanish by Google",
    all: "See all reviews",
    onGoogle: "Read them on Google",
    original: "",
    prev: "Previous reviews",
    next: "More reviews",
  },
  es: {
    kicker: "Reseñas reales de Google",
    title: "Lo que dicen nuestros clientes.",
    summary: (r: number, n: number) => `${r} de 5 en Google · ${n} reseñas`,
    google: "Reseña de Google",
    translated: "Escrita en español; traducción de Google",
    all: "Ver todas las reseñas",
    onGoogle: "Leerlas en Google",
    original: "Reseñas como aparecen en Google (en inglés).",
    prev: "Reseñas anteriores",
    next: "Más reseñas",
  },
};

// Filters and paging for the full list on the reviews page.
export const REVIEW_LIST = {
  en: {
    filter: "Filter reviews",
    all: "All",
    phones: "Buying a phone",
    leasing: "Leasing & approval",
    repair: "Repairs",
    accessories: "Accessories",
    service: "Customer service",
    more: (n: number) => `Show ${n} more reviews`,
    of: (a: number, b: number) => `Showing ${a} of ${b}`,
  },
  es: {
    filter: "Filtrar reseñas",
    all: "Todas",
    phones: "Compra de celular",
    leasing: "Arrendamiento y aprobación",
    repair: "Reparaciones",
    accessories: "Accesorios",
    service: "Atención al cliente",
    more: (n: number) => `Ver ${n} reseñas más`,
    of: (a: number, b: number) => `Mostrando ${a} de ${b}`,
  },
};
