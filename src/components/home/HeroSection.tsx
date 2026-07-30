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
        alt=""
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />
      {/* Overlay: dark gradient to make text readable */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />

      {/* Content */}
      <div className="relative z-10 mx-auto w-full max-w-6xl px-4 py-24 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          {/* Headline */}
          <h1 className="font-heading text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
            {headline}
          </h1>

          {/* Tagline */}
          <p className="mt-6 text-lg leading-relaxed text-white/85 sm:text-xl">
            {tagline}
          </p>

          {/* CTA buttons */}
          <div className="mt-10 flex flex-wrap gap-4">
            <Button href={`/${locale}/produk-layanan`} variant="primary" className="text-base px-7 py-3">
              {ctaProducts}
            </Button>
            <Button href={`/${locale}/kontak`} variant="secondary" className="border-white/60 text-white hover:bg-white/10 text-base px-7 py-3">
              {ctaContact}
            </Button>
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}
