import Image from "next/image";
import { Section } from "@/components/ui/Section";

interface CondensateSectionProps {
  heading: string;
  subheading: string;
  body: string;
  diagramCaption: string;
}

export function CondensateSection({ heading, subheading, body, diagramCaption }: CondensateSectionProps) {
  return (
    <Section className="bg-white">
      <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
        <div>
          <h2 className="font-heading text-3xl font-bold text-brand-teal-dark sm:text-4xl">{heading}</h2>
          <p className="mt-2 text-lg font-medium text-brand-orange">{subheading}</p>
          <p className="mt-6 text-lg leading-relaxed text-neutral-700">{body}</p>
        </div>
        <figure className="overflow-hidden rounded-2xl border border-black/5 bg-neutral-50 p-4 shadow-sm">
          <Image
            src="/images/condensate/process-diagram.png"
            alt={diagramCaption}
            width={640}
            height={400}
            className="h-full w-full object-contain"
          />
          <figcaption className="mt-3 text-center text-xs text-neutral-muted">{diagramCaption}</figcaption>
        </figure>
      </div>
    </Section>
  );
}
