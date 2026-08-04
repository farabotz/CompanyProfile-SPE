import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

interface AboutSnippetProps {
  locale: string;
  heading: string;
  text: string;
  linkLabel: string;
}

export function AboutSnippet({ locale, heading, text, linkLabel }: AboutSnippetProps) {
  return (
    <Section className="bg-white">
      <ScrollReveal>
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-xs font-bold uppercase tracking-widest text-brand-orange">
            {locale === "en" ? "Company Profile" : "Profil Perusahaan"}
          </span>
          <h2 className="mt-2 font-heading text-3xl font-bold text-brand-teal-dark sm:text-4xl">
            {heading}
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-neutral-600">
            {text}
          </p>
          <Link
            href={`/${locale}/tentang-kami`}
            className="mt-8 inline-flex items-center gap-2 font-semibold text-brand-orange hover:text-brand-orange-dark hover:gap-3 transition-all"
          >
            {linkLabel}
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>
      </ScrollReveal>
    </Section>
  );
}
