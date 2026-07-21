import { Section } from "@/components/ui/Section";
import type { LeadershipMember } from "@/lib/content/legal";

interface LeadershipSectionProps {
  heading: string;
  roleLabels: Record<string, string>;
  members: LeadershipMember[];
}

const roleOrder: Record<string, number> = {
  direkturUtama: 1,
  direktur: 2,
  komisarisUtama: 3,
  komisaris: 4,
};

export function LeadershipSection({ heading, roleLabels, members }: LeadershipSectionProps) {
  const sorted = [...members].sort((a, b) => (roleOrder[a.roleId] ?? 99) - (roleOrder[b.roleId] ?? 99));

  return (
    <Section className="bg-white">
      <div className="text-center">
        <h2 className="font-heading text-3xl font-bold text-brand-teal-dark sm:text-4xl">{heading}</h2>
      </div>

      <div className="mt-10 flex flex-wrap justify-center gap-6">
        {sorted.map((member) => (
          <div
            key={member.name}
            className="flex flex-col items-center gap-3 rounded-2xl border border-black/5 bg-white p-8 shadow-sm min-w-44 max-w-52 text-center"
          >
            {/* Avatar placeholder */}
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-teal/10 text-brand-teal-dark">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="1.8" />
              </svg>
            </div>
            <div>
              <p className="font-heading font-bold text-brand-teal-dark leading-snug">{member.name}</p>
              <p className="mt-1 text-sm text-neutral-muted">{roleLabels[member.roleId] ?? member.roleId}</p>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
