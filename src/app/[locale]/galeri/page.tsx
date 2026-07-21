import type { Metadata } from "next";
import { isLocale, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { notFound } from "next/navigation";
import { galleryImages } from "@/lib/content/gallery";
import { Section } from "@/components/ui/Section";
import { GalleryGrid } from "@/components/gallery/GalleryGrid";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = await getDictionary(locale);
  return { title: dict.gallery.meta.title, description: dict.gallery.meta.description };
}

export default async function GalleryPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = await getDictionary(locale as Locale);
  const g = dict.gallery;

  return (
    <Section>
      <div className="mb-8 text-center">
        <h1 className="font-heading text-3xl font-bold text-brand-teal-dark sm:text-4xl">{g.pageTitle}</h1>
        <p className="mt-3 text-lg text-neutral-600">{g.intro}</p>
      </div>
      <GalleryGrid images={galleryImages} dict={g} />
    </Section>
  );
}
