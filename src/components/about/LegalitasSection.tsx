import { Section } from "@/components/ui/Section";
import { Badge } from "@/components/ui/Badge";
import type { LegalCredential } from "@/lib/content/legal";

interface LegalitasDictionary {
  heading: string;
  credentialLabels: Record<string, string>;
  numberLabel: string;
  dateLabel: string;
  issuerLabel: string;
  validUntilLabel: string;
  kbliLabel: string;
  storageLabel: string;
  storageLocation: string;
  storageOwnership: string;
  storageTankLabel: string;
  storageCapacityUnit: string;
}

interface StorageFacility {
  id: string;
  capacityKl: number;
}

interface LegalitasSectionProps {
  dict: LegalitasDictionary;
  credentials: LegalCredential[];
  kbliCodes: string[];
  storageFacilities: StorageFacility[];
}

function formatDate(iso: string) {
  const [year, month, day] = iso.split("-");
  return `${day}/${month}/${year}`;
}

export function LegalitasSection({ dict, credentials, kbliCodes, storageFacilities }: LegalitasSectionProps) {
  return (
    <Section className="bg-neutral-50">
      <div className="text-center">
        <h2 className="font-heading text-3xl font-bold text-brand-teal-dark sm:text-4xl">{dict.heading}</h2>
      </div>

      {/* Credentials */}
      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        {credentials.map((cred) => (
          <div key={cred.id} className="rounded-xl border border-black/5 bg-white p-6 shadow-sm">
            <h3 className="font-heading text-base font-bold text-brand-teal-dark">
              {dict.credentialLabels[cred.id] ?? cred.id}
            </h3>
            <dl className="mt-3 space-y-1.5 text-sm">
              <div className="flex flex-wrap gap-x-2">
                <dt className="font-medium text-neutral-500">{dict.numberLabel}:</dt>
                <dd className="text-neutral-700 font-mono">{cred.number}</dd>
              </div>
              <div className="flex flex-wrap gap-x-2">
                <dt className="font-medium text-neutral-500">{dict.dateLabel}:</dt>
                <dd className="text-neutral-700">{formatDate(cred.date)}</dd>
              </div>
              <div className="flex flex-wrap gap-x-2">
                <dt className="font-medium text-neutral-500">{dict.issuerLabel}:</dt>
                <dd className="text-neutral-700">{cred.issuer}</dd>
              </div>
              {cred.validUntil && (
                <div className="pt-1">
                  <Badge variant="teal">
                    {dict.validUntilLabel} {formatDate(cred.validUntil)}
                  </Badge>
                </div>
              )}
            </dl>
          </div>
        ))}
      </div>

      {/* KBLI codes */}
      <div className="mt-8 rounded-xl border border-black/5 bg-white p-6 shadow-sm">
        <h3 className="font-heading text-base font-bold text-brand-teal-dark">{dict.kbliLabel}</h3>
        <div className="mt-3 flex flex-wrap gap-2">
          {kbliCodes.map((code) => (
            <Badge key={code} variant="orange">{code}</Badge>
          ))}
        </div>
      </div>

      {/* Storage facilities */}
      <div className="mt-4 rounded-xl border border-black/5 bg-white p-6 shadow-sm">
        <h3 className="font-heading text-base font-bold text-brand-teal-dark">{dict.storageLabel}</h3>
        <p className="mt-1 text-sm text-neutral-muted">
          {dict.storageLocation} · {dict.storageOwnership}
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          {storageFacilities.map((tank) => (
            <div key={tank.id} className="rounded-lg border border-brand-teal/20 px-4 py-3 text-sm">
              <span className="font-semibold text-brand-teal-dark">{dict.storageTankLabel} {tank.id}</span>
              <span className="ml-2 text-neutral-muted">{tank.capacityKl} {dict.storageCapacityUnit}</span>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
