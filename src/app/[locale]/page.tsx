import type { Metadata } from "next";
import { isLocale, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { notFound } from "next/navigation";
import { legalCredentials } from "@/lib/content/legal";
import { partners } from "@/lib/content/partners";
import { HeroSection } from "@/components/home/HeroSection";
import { AboutSnippet } from "@/components/home/AboutSnippet";
import { VisionMissionSection } from "@/components/home/VisionMissionSection";
import { ProductsOverview } from "@/components/home/ProductsOverview";
import { ProcessTeaser } from "@/components/home/ProcessTeaser";
import { TrustBadges } from "@/components/home/TrustBadges";
import { PartnersStrip } from "@/components/home/PartnersStrip";
import { CtaBanner } from "@/components/home/CtaBanner";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = await getDictionary(locale);
  return {
    title: `${dict.common.site.name} - ${dict.common.site.titleSuffix}`,
    description: dict.home.meta.description,
  };
}

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = await getDictionary(locale as Locale);
  const h = dict.home;

  return (
    <>
      <HeroSection
        locale={locale}
        headline={h.hero.headline}
        tagline={h.hero.tagline}
        ctaProducts={h.hero.ctaProducts}
        ctaContact={h.hero.ctaContact}
      />
      <AboutSnippet
        locale={locale}
        heading={h.aboutSnippet.heading}
        text={h.aboutSnippet.text}
        linkLabel={h.aboutSnippet.linkLabel}
      />
      <VisionMissionSection
        heading={h.visionMission.heading}
        visionTitle={h.visionMission.visionTitle}
        visionText={h.visionMission.visionText}
        missionTitle={h.visionMission.missionTitle}
        missionText={h.visionMission.missionText}
      />
      <ProductsOverview
        heading={h.productsOverview.heading}
        items={h.productsOverview.items}
      />
      <ProcessTeaser
        locale={locale}
        heading={h.processTeaser.heading}
        body={h.processTeaser.body}
        linkLabel={h.processTeaser.linkLabel}
      />
      <TrustBadges
        heading={h.trustBadges.heading}
        credentials={legalCredentials}
        labels={h.trustBadges.labels}
        validUntilLabel={h.trustBadges.validUntil}
      />
      <PartnersStrip
        heading={h.partners.heading}
        supplierLabel={h.partners.supplierLabel}
        buyerLabel={h.partners.buyerLabel}
        disclaimer={h.partners.disclaimer}
        partners={partners}
      />
      <CtaBanner
        locale={locale}
        heading={h.ctaBanner.heading}
        body={h.ctaBanner.body}
        button={h.ctaBanner.button}
      />
    </>
  );
}
