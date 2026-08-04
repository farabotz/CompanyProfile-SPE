import Image from "next/image";
import { Button } from "@/components/ui/Button";

interface HeroSectionProps {
  locale: string;
  headline: string;
  tagline: string;
  ctaProducts: string;
  ctaContact: string;
}

export function HeroSection({
  locale,
  headline,
  tagline,
  ctaProducts,
  ctaContact,
}: HeroSectionProps) {
  return (
    <section className="relative flex min-h-[90vh] items-center justify-center overflow-hidden">
      {/* Background image */}
      <Image
        src="/images/hero/hero-storage-tanker.jpg"
        alt="Solusi Pasokan Energi Terintegrasi SPE"
        fill
        priority
        className="object-cover scale-105 transition-transform duration-10000 ease-out"
        sizes="100vw"
      />
      {/* Overlay: dark gradient to make text readable */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40" />

      {/* Content */}
      <div className="relative z-10 mx-auto w-full max-w-6xl px-4 py-24 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          {/* Eyebrow Pill */}
          <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 backdrop-blur-md mb-6">
            <span className="h-2 w-2 rounded-full bg-brand-orange animate-pulse" />
            <span className="text-xs font-semibold uppercase tracking-wider text-white/90">
              {locale === "en"
                ? "Licensed Industrial Fuel Supplier • ESDM & BPH Migas"
                : "Niaga Terbatas BBM Industri Resmi • ESDM & BPH Migas"}
            </span>
          </div>

          {/* Headline */}
          <h1 className="font-heading text-4xl font-extrabold leading-[1.15] text-white sm:text-5xl lg:text-6xl tracking-tight text-wrap-balance">
            {headline}
          </h1>

          {/* Tagline */}
          <p className="mt-6 text-lg leading-relaxed text-white/85 sm:text-xl font-normal max-w-xl">
            {tagline}
          </p>

          {/* CTA buttons */}
          <div className="mt-10 flex flex-wrap gap-4 items-center">
            <Button href={`/${locale}/produk-layanan`} variant="primary" className="text-base px-8 py-3.5 shadow-lg">
              {ctaProducts}
            </Button>
            <Button
              href={`/${locale}/kontak`}
              variant="secondary"
              className="border-white/40 text-white hover:bg-white/15 text-base px-8 py-3.5 backdrop-blur-xs"
            >
              {ctaContact}
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 hidden sm:flex flex-col items-center gap-2 text-white/60 hover:text-white transition-colors cursor-pointer">
        <span className="text-[11px] font-semibold tracking-widest uppercase">Scroll</span>
        <svg className="w-5 h-5 animate-bounce" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
        </svg>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}
