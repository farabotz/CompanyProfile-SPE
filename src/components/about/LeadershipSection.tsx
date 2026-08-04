import { Section } from "@/components/ui/Section";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
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
      <ScrollReveal>
        <div className="text-center">
          <span className="text-xs font-bold uppercase tracking-widest text-brand-orange">
            Struktur Kepemimpinan
          </span>
          <h2 className="mt-2 font-heading text-3xl font-bold text-brand-teal-dark sm:text-4xl">{heading}</h2>
        </div>
      </ScrollReveal>

      <div className="mt-10 flex flex-wrap justify-center gap-6">
        {sorted.map((member, idx) => (
          <ScrollReveal key={member.name} delay={idx * 100}>
            <div className="flex flex-col items-center gap-3 rounded-2xl border border-neutral-200/80 bg-white p-7 shadow-xs hover:shadow-md hover:-translate-y-1 transition-all duration-300 min-w-44 max-w-56 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-orange/10 text-brand-orange">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  <circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="1.8" />
                </svg>
              </div>
              <div>
                <p className="font-heading font-bold text-brand-teal-dark leading-snug">{member.name}</p>
                <p className="mt-1 text-xs font-medium text-brand-orange-dark bg-brand-orange/5 px-2.5 py-1 rounded-full">{roleLabels[member.roleId] ?? member.roleId}</p>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </Section>
  );
}
