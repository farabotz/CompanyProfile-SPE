import { Section } from "@/components/ui/Section";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

interface VisionMissionSectionProps {
  heading: string;
  visionTitle: string;
  visionText: string;
  missionTitle: string;
  missionText: string;
}

export function VisionMissionSection({
  heading,
  visionTitle,
  visionText,
  missionTitle,
  missionText,
}: VisionMissionSectionProps) {
  return (
    <Section className="bg-brand-teal-dark relative overflow-hidden">
      <ScrollReveal>
        <div className="text-center">
          <h2 className="font-heading text-3xl font-bold text-white sm:text-4xl">{heading}</h2>
        </div>
      </ScrollReveal>

      <div className="mt-12 grid gap-6 sm:grid-cols-2">
        {/* Vision */}
        <ScrollReveal delay={100} direction="left">
          <div className="rounded-2xl bg-white/10 p-8 ring-1 ring-white/20 hover:bg-white/15 transition-all duration-300 hover:-translate-y-1 h-full">
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-brand-orange shadow-md">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <circle cx="12" cy="12" r="3" stroke="white" strokeWidth="2" />
                <path d="M12 2C7.02944 2 3 6.47715 3 12s4.02944 10 9 10 9-4.47715 9-10S16.9706 2 12 2z" stroke="white" strokeWidth="2" />
              </svg>
            </div>
            <h3 className="font-heading text-xl font-bold text-white">{visionTitle}</h3>
            <p className="mt-3 text-white/80 leading-relaxed">{visionText}</p>
          </div>
        </ScrollReveal>

        {/* Mission */}
        <ScrollReveal delay={200} direction="right">
          <div className="rounded-2xl bg-white/10 p-8 ring-1 ring-white/20 hover:bg-white/15 transition-all duration-300 hover:-translate-y-1 h-full">
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-brand-orange shadow-md">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M9 12l2 2 4-4M21 12a9 9 0 11-18 0 9 9 0 0118 0z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <h3 className="font-heading text-xl font-bold text-white">{missionTitle}</h3>
            <p className="mt-3 text-white/80 leading-relaxed">{missionText}</p>
          </div>
        </ScrollReveal>
      </div>
    </Section>
  );
}
