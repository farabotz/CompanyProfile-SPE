import type { Metadata } from "next";
import { isLocale, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { ComingSoon } from "@/components/ui/ComingSoon";
import { notFound } from "next/navigation";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = await getDictionary(locale);
  // The home page shares its route segment with `[locale]/layout.tsx`, so
  // `title.template` defined there does not apply here (Next.js only applies
  // a layout's title template to *child* segments) — build the full title
  // explicitly instead of relying on it.
  return {
    title: `${dict.common.site.name} — ${dict.common.site.titleSuffix}`,
    description: dict.home.meta.description,
  };
}

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = await getDictionary(locale as Locale);

  return (
    <ComingSoon
      badge={dict.common.comingSoon.badge}
      title={dict.home.pageTitle}
      body={dict.common.comingSoon.body}
    />
  );
}
