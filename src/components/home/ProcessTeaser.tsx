import Image from "next/image";
import Link from "next/link";
import { Section } from "@/components/ui/Section";

interface ProcessTeaserProps {
  locale: string;
  heading: string;
  body: string;
  linkLabel: string;
}

export function ProcessTeaser({ locale, heading, body, linkLabel }: ProcessTeaserProps) {
  return (
    <Section className="bg-white overflow-hidden">
      <div className="text-center">
        <h2 className="font-heading text-3xl font-bold text-brand-teal-dark sm:text-4xl">{heading}</h2>
        <p className="mt-4 text-lg text-neutral-600 max-w-2xl mx-auto">{body}</p>
      </div>

      <div className="mt-10 overflow-hidden rounded-2xl shadow-lg ring-1 ring-black/5">
        <Image
          src="/images/infographic/value-chain.png"
          alt={heading}
          width={1200}
          height={450}
          className="w-full h-auto object-contain"
        />
      </div>

      <div className="mt-8 text-center">
        <Link
          href={`/${locale}/produk-layanan`}
          className="inline-flex items-center gap-2 font-semibold text-brand-orange hover:text-brand-orange-dark transition-colors"
        >
          {linkLabel}
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>
      </div>
    </Section>
  );
}
