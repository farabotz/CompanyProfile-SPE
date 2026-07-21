import type { Metadata } from "next";
import { isLocale, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { notFound } from "next/navigation";
import { CondensateSection } from "@/components/products/CondensateSection";
import { ValueChainSection } from "@/components/products/ValueChainSection";
import { ServicesSection } from "@/components/products/ServicesSection";
import { FuturePlansCallout } from "@/components/products/FuturePlansCallout";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = await getDictionary(locale);
  return { title: dict.products.meta.title, description: dict.products.meta.description };
}

export default async function ProductsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = await getDictionary(locale as Locale);
  const p = dict.products;

  return (
    <>
      <CondensateSection
        heading={p.condensate.heading}
        subheading={p.condensate.subheading}
        body={p.condensate.body}
        diagramCaption={p.condensate.diagramCaption}
      />
      <ValueChainSection
        heading={p.valueChain.heading}
        subheading={p.valueChain.subheading}
        imageAlt={p.valueChain.imageAlt}
        stepsHeading={p.valueChain.stepsHeading}
        steps={p.valueChain.steps}
      />
      <ServicesSection
        heading={p.services.heading}
        subheading={p.services.subheading}
        items={p.services.items}
      />
      <FuturePlansCallout
        heading={p.futurePlans.heading}
        badge={p.futurePlans.badge}
        title={p.futurePlans.title}
        body={p.futurePlans.body}
        items={p.futurePlans.items}
      />
    </>
  );
}
