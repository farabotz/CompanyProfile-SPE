import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import { notFound } from "next/navigation";
import { locales, isLocale, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppWidget } from "@/components/shared/WhatsAppWidget";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
});

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};

  const dict = await getDictionary(locale);
  const title = `${dict.common.site.name} - ${dict.common.site.titleSuffix}`;
  const description = dict.common.site.defaultDescription;

  return {
    title: {
      default: title,
      template: `%s | ${dict.common.site.titleSuffix}`,
    },
    description: description,
    keywords: [
      "Sarana Piranti Energi",
      "BBM Industri",
      "Solar Industri B35",
      "Solar Industri B40",
      "Distributor BBM Resmi",
      "Izin Usaha Niaga Terbatas",
      "ESDM",
      "BPH Migas",
    ],
    openGraph: {
      title: title,
      description: description,
      siteName: dict.common.site.name,
      locale: locale === "id" ? "id_ID" : "en_US",
      type: "website",
    },
    alternates: {
      languages: {
        id: "/id",
        en: "/en",
      },
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const dict = await getDictionary(locale as Locale);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "PT Sarana Piranti Energi",
    alternateName: "SPE",
    url: "https://saranapirantienergi.co.id",
    logo: "https://saranapirantienergi.co.id/images/logo/logo-icon.png",
    description: dict.common.site.defaultDescription,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Kebayoran Baru",
      addressLocality: "Jakarta Selatan",
      addressRegion: "DKI Jakarta",
      addressCountry: "ID",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+62-811-1979-8080",
      contactType: "customer service",
      areaServed: "ID",
      availableLanguage: ["Indonesian", "English"],
    },
  };

  return (
    <html lang={locale} className={`${inter.variable} ${jakarta.variable} h-full antialiased`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="flex min-h-full flex-col font-sans">
        <Header locale={locale as Locale} common={dict.common} />
        <main className="flex-1">{children}</main>
        <Footer locale={locale as Locale} common={dict.common} />
        <WhatsAppWidget locale={locale} />
      </body>
    </html>
  );
}
