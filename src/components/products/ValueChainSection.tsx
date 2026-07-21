import Image from "next/image";
import { Section } from "@/components/ui/Section";

interface ValueChainStep {
  number: string;
  title: string;
  body: string;
}

interface ValueChainSectionProps {
  heading: string;
  subheading: string;
  imageAlt: string;
  stepsHeading: string;
  steps: ValueChainStep[];
}

export function ValueChainSection({ heading, subheading, imageAlt, stepsHeading, steps }: ValueChainSectionProps) {
  return (
    <Section className="bg-neutral-50">
      <div className="text-center">
        <h2 className="font-heading text-3xl font-bold text-brand-teal-dark sm:text-4xl">{heading}</h2>
        <p className="mt-3 text-lg text-neutral-600">{subheading}</p>
      </div>

      {/* Infographic image */}
      <div className="mt-10 overflow-hidden rounded-2xl shadow-lg ring-1 ring-black/5">
        <Image
          src="/images/infographic/value-chain.png"
          alt={imageAlt}
          width={1200}
          height={450}
          className="w-full h-auto object-contain"
        />
      </div>

      {/* Accessible step list */}
      <div className="mt-12">
        <h3 className="font-heading text-xl font-bold text-brand-teal-dark text-center mb-8">{stepsHeading}</h3>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {steps.map((step) => (
            <div key={step.number} className="rounded-xl border border-black/5 bg-white p-6 shadow-sm">
              <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-full bg-brand-orange text-sm font-bold text-white">
                {step.number}
              </div>
              <h4 className="font-heading font-bold text-brand-teal-dark">{step.title}</h4>
              <p className="mt-2 text-sm leading-relaxed text-neutral-600">{step.body}</p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
