import { Section } from "@/components/ui/Section";
import { Badge } from "@/components/ui/Badge";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
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
      <ScrollReveal>
        <div className="text-center">
          <span className="text-xs font-bold uppercase tracking-widest text-brand-orange">
            Kepatuhan & Perizinan
          </span>
          <h2 className="mt-2 font-heading text-3xl font-bold text-brand-teal-dark sm:text-4xl">{dict.heading}</h2>
        </div>
      </ScrollReveal>

      {/* Credentials */}
      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        {credentials.map((cred, idx) => (
          <ScrollReveal key={cred.id} delay={idx * 100}>
            <div className="rounded-xl border border-neutral-200/80 bg-white p-6 shadow-xs hover:shadow-md transition-all duration-300 h-full">
              <h3 className="font-heading text-base font-bold text-brand-teal-dark">
                {dict.credentialLabels[cred.id] ?? cred.id}
              </h3>
              <dl className="mt-3 space-y-1.5 text-sm">
                <div className="flex flex-wrap gap-x-2">
                  <dt className="font-medium text-neutral-500">{dict.numberLabel}:</dt>
                  <dd className="text-neutral-700 font-mono text-xs bg-neutral-100 px-2 py-0.5 rounded-sm">{cred.number}</dd>
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
                  <div className="pt-2">
                    <Badge variant="teal">
                      {dict.validUntilLabel} {formatDate(cred.validUntil)}
                    </Badge>
                  </div>
                )}
              </dl>
            </div>
          </ScrollReveal>
        ))}
      </div>

      {/* KBLI codes */}
      <ScrollReveal delay={200}>
        <div className="mt-8 rounded-xl border border-neutral-200/80 bg-white p-6 shadow-xs hover:shadow-md transition-all duration-300">
          <h3 className="font-heading text-base font-bold text-brand-teal-dark">{dict.kbliLabel}</h3>
          <div className="mt-3 flex flex-wrap gap-2">
            {kbliCodes.map((code) => (
              <Badge key={code} variant="orange">{code}</Badge>
            ))}
          </div>
        </div>
      </ScrollReveal>

      {/* Storage facilities */}
      <ScrollReveal delay={300}>
        <div className="mt-4 rounded-xl border border-neutral-200/80 bg-white p-6 shadow-xs hover:shadow-md transition-all duration-300">
          <h3 className="font-heading text-base font-bold text-brand-teal-dark">{dict.storageLabel}</h3>
          <p className="mt-1 text-sm text-neutral-muted">
            {dict.storageLocation} · {dict.storageOwnership}
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            {storageFacilities.map((tank) => (
              <div key={tank.id} className="rounded-xl border border-brand-teal/20 bg-brand-teal/5 px-4 py-3 text-sm flex items-center gap-2">
                <span className="font-semibold text-brand-teal-dark">{dict.storageTankLabel} {tank.id}</span>
                <span className="text-neutral-600">({tank.capacityKl} {dict.storageCapacityUnit})</span>
              </div>
            ))}
          </div>
        </div>
      </ScrollReveal>
    </Section>
  );
}
