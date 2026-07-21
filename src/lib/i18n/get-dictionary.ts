import "server-only";
import { defaultLocale, type Locale } from "./config";

const dictionaries = {
  id: async () => ({
    common: (await import("@/dictionaries/id/common.json")).default,
    home: (await import("@/dictionaries/id/home.json")).default,
    about: (await import("@/dictionaries/id/about.json")).default,
    products: (await import("@/dictionaries/id/products.json")).default,
    gallery: (await import("@/dictionaries/id/gallery.json")).default,
    contact: (await import("@/dictionaries/id/contact.json")).default,
  }),
  en: async () => ({
    common: (await import("@/dictionaries/en/common.json")).default,
    home: (await import("@/dictionaries/en/home.json")).default,
    about: (await import("@/dictionaries/en/about.json")).default,
    products: (await import("@/dictionaries/en/products.json")).default,
    gallery: (await import("@/dictionaries/en/gallery.json")).default,
    contact: (await import("@/dictionaries/en/contact.json")).default,
  }),
} satisfies Record<Locale, () => Promise<unknown>>;

export async function getDictionary(locale: Locale) {
  return (dictionaries[locale] ?? dictionaries[defaultLocale])();
}

export type Dictionary = Awaited<ReturnType<typeof getDictionary>>;
