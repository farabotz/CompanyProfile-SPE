import { Section } from "@/components/ui/Section";
import { Badge } from "@/components/ui/Badge";

interface FuturePlansCalloutProps {
  heading: string;
  badge: string;
  title: string;
  body: string;
  items: string[];
}

export function FuturePlansCallout({ heading, badge, title, body, items }: FuturePlansCalloutProps) {
  return (
    <Section className="bg-brand-teal-dark">
      <div className="text-center mb-10">
        <h2 className="font-heading text-3xl font-bold text-white sm:text-4xl">{heading}</h2>
      </div>
      <div className="mx-auto max-w-2xl rounded-2xl bg-white/10 ring-1 ring-white/20 p-8 sm:p-10">
        <div className="flex flex-col sm:flex-row sm:items-start sm:gap-6">
          <div className="mb-4 sm:mb-0 sm:flex-shrink-0">
            <Badge variant="orange">{badge}</Badge>
          </div>
          <div>
            <h3 className="font-heading text-2xl font-bold text-white">{title}</h3>
            <p className="mt-4 leading-relaxed text-white/80">{body}</p>
            <ul className="mt-6 space-y-2">
              {items.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3 text-white/80">
                  <svg className="mt-0.5 shrink-0 text-brand-orange" width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M9 12l2 2 4-4M21 12a9 9 0 11-18 0 9 9 0 0118 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span className="text-sm">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </Section>
  );
}
