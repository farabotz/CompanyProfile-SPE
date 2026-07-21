import type { Metadata } from "next";
import { isLocale, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { notFound } from "next/navigation";
import { locations } from "@/lib/content/locations";
import { Section } from "@/components/ui/Section";
import { LocationCard } from "@/components/shared/LocationCard";
import { ContactForm } from "@/components/contact/ContactForm";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = await getDictionary(locale);
  return { title: dict.contact.meta.title, description: dict.contact.meta.description };
}

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = await getDictionary(locale as Locale);
  const c = dict.contact;

  return (
    <>
      {/* Page header */}
      <Section className="bg-brand-teal-dark pb-8 pt-16">
        <div className="text-center">
          <h1 className="font-heading text-3xl font-bold text-white sm:text-4xl">{c.pageTitle}</h1>
          <p className="mt-3 text-lg text-white/80 max-w-xl mx-auto">{c.intro}</p>
        </div>
      </Section>

      {/* Locations */}
      <Section className="bg-neutral-50">
        <h2 className="font-heading text-2xl font-bold text-brand-teal-dark text-center mb-8">
          {c.locations.heading}
        </h2>
        <div className="grid gap-6 sm:grid-cols-2">
          <LocationCard label={c.locations.headOfficeLabel} location={locations.headOffice} />
          <LocationCard label={c.locations.storageLabel} location={locations.storage} />
        </div>
      </Section>

      {/* Contact form */}
      <Section className="bg-white">
        <div className="mx-auto max-w-2xl">
          <ContactForm dict={c.form} />
        </div>
      </Section>
    </>
  );
}
