import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";

interface ServiceItem {
  key: string;
  title: string;
  body: string;
}

interface ServicesSectionProps {
  heading: string;
  subheading: string;
  items: ServiceItem[];
}

const serviceIcons: Record<string, React.ReactNode> = {
  trading: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  ),
  investment: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  ),
  contracting: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="3" y="3" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="1.8" />
      <rect x="14" y="3" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="1.8" />
      <rect x="3" y="14" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="1.8" />
      <rect x="14" y="14" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  ),
  storage: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M22 9V7H2v2l10 5 10-5zM2 9v8a2 2 0 002 2h16a2 2 0 002-2V9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
};

export function ServicesSection({ heading, subheading, items }: ServicesSectionProps) {
  return (
    <Section className="bg-white">
      <div className="text-center">
        <h2 className="font-heading text-3xl font-bold text-brand-teal-dark sm:text-4xl">{heading}</h2>
        <p className="mt-3 text-lg text-neutral-600">{subheading}</p>
      </div>
      <div className="mt-12 grid gap-6 sm:grid-cols-2">
        {items.map((item) => (
          <Card key={item.key} className="p-7 hover:shadow-md transition-shadow">
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-brand-teal/10 text-brand-teal-dark">
              {serviceIcons[item.key]}
            </div>
            <h3 className="font-heading text-lg font-bold text-brand-teal-dark">{item.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-neutral-600">{item.body}</p>
          </Card>
        ))}
      </div>
    </Section>
  );
}
