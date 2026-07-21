import { Card } from "@/components/ui/Card";
import { MapEmbed } from "./MapEmbed";
import type { LocationFact } from "@/lib/content/locations";

interface LocationCardProps {
  label: string;
  location: LocationFact;
}

export function LocationCard({ label, location }: LocationCardProps) {
  return (
    <Card className="overflow-hidden">
      <MapEmbed query={location.mapQuery} title={label} />
      <div className="p-6">
        <h3 className="font-heading text-lg font-bold text-brand-teal-dark">{label}</h3>
        <address className="mt-2 space-y-0.5 text-sm not-italic text-neutral-muted">
          {location.addressLines.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </address>
      </div>
    </Card>
  );
}
