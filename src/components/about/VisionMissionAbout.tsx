import { Section } from "@/components/ui/Section";

interface VisionMissionAboutProps {
  heading: string;
  visionTitle: string;
  visionText: string;
  missionTitle: string;
  missionText: string;
}

export function VisionMissionAbout({
  heading,
  visionTitle,
  visionText,
  missionTitle,
  missionText,
}: VisionMissionAboutProps) {
  return (
    <Section className="bg-neutral-50">
      <div className="text-center">
        <h2 className="font-heading text-3xl font-bold text-brand-teal-dark sm:text-4xl">{heading}</h2>
      </div>
      <div className="mt-12 grid gap-8 sm:grid-cols-2">
        <div className="rounded-2xl border-l-4 border-brand-orange bg-white p-8 shadow-sm">
          <h3 className="font-heading text-xl font-bold text-brand-teal-dark">{visionTitle}</h3>
          <p className="mt-4 text-lg leading-relaxed text-neutral-700">{visionText}</p>
        </div>
        <div className="rounded-2xl border-l-4 border-brand-teal bg-white p-8 shadow-sm">
          <h3 className="font-heading text-xl font-bold text-brand-teal-dark">{missionTitle}</h3>
          <p className="mt-4 text-lg leading-relaxed text-neutral-700">{missionText}</p>
        </div>
      </div>
    </Section>
  );
}
