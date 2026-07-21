import { Section } from "@/components/ui/Section";
import type { LegalCredential } from "@/lib/content/legal";

interface TrustBadgesProps {
  heading: string;
  credentials: LegalCredential[];
  labels: Record<string, string>;
  validUntilLabel: string;
}

function formatDate(iso: string) {
  const [year, month, day] = iso.split("-");
  return `${day}/${month}/${year}`;
}

export function TrustBadges({ heading, credentials, labels, validUntilLabel }: TrustBadgesProps) {
  return (
    <Section className="bg-neutral-50">
      <div className="text-center">
        <h2 className="font-heading text-3xl font-bold text-brand-teal-dark sm:text-4xl">{heading}</h2>
      </div>

      <div className="mt-10 flex flex-wrap justify-center gap-4">
        {credentials.map((cred) => (
          <div
            key={cred.id}
            className="flex flex-col gap-1 rounded-xl border border-brand-teal/20 bg-white px-6 py-4 shadow-sm min-w-48"
          >
            <span className="text-xs font-semibold uppercase tracking-wide text-brand-teal-dark">
              {labels[cred.id] ?? cred.id}
            </span>
            <span className="text-sm font-medium text-neutral-700">{cred.number}</span>
            <span className="text-xs text-neutral-muted">{cred.issuer}</span>
            {cred.validUntil && (
              <span className="mt-1 inline-flex w-fit items-center gap-1 rounded-full bg-brand-green/10 px-2.5 py-0.5 text-xs font-medium text-brand-green">
                {validUntilLabel} {formatDate(cred.validUntil)}
              </span>
            )}
          </div>
        ))}
      </div>
    </Section>
  );
}
