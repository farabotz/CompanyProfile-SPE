import Image from "next/image";
import { Section } from "@/components/ui/Section";

interface NarrativeSectionProps {
  heading: string;
  body: string;
}

export function NarrativeSection({ heading, body }: NarrativeSectionProps) {
  return (
    <Section className="bg-white">
      <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
        <div>
          <h2 className="font-heading text-3xl font-bold text-brand-teal-dark sm:text-4xl">{heading}</h2>
          <p className="mt-6 text-lg leading-relaxed text-neutral-700">{body}</p>
        </div>
        <div className="relative overflow-hidden rounded-2xl shadow-xl">
          <Image
            src="/images/about/refinery-sunset.jpg"
            alt=""
            width={640}
            height={480}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-teal-dark/30 to-transparent" />
        </div>
      </div>
    </Section>
  );
}
