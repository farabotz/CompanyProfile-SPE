import { Section } from "@/components/ui/Section";
import { LocationCard } from "@/components/shared/LocationCard";
import type { LocationFact } from "@/lib/content/locations";

interface LocationsSectionProps {
  heading: string;
  headOfficeLabel: string;
  storageLabel: string;
  headOffice: LocationFact;
  storage: LocationFact;
}

export function LocationsSection({
  heading,
  headOfficeLabel,
  storageLabel,
  headOffice,
  storage,
}: LocationsSectionProps) {
  return (
    <Section className="bg-neutral-50">
      <div className="text-center">
        <h2 className="font-heading text-3xl font-bold text-brand-teal-dark sm:text-4xl">{heading}</h2>
      </div>
      <div className="mt-10 grid gap-6 sm:grid-cols-2">
        <LocationCard label={headOfficeLabel} location={headOffice} />
        <LocationCard label={storageLabel} location={storage} />
      </div>
    </Section>
  );
}
