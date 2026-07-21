import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";

interface ProductItem {
  key: string;
  title: string;
  description: string;
}

interface ProductsOverviewProps {
  heading: string;
  items: ProductItem[];
}

const productIcons: Record<string, React.ReactNode> = {
  condensate: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      <circle cx="12" cy="9" r="2.5" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  ),
  lpg: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 2v4M8 3.5l2 2M16 3.5l-2 2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <rect x="5" y="10" width="14" height="10" rx="3" stroke="currentColor" strokeWidth="1.8" />
      <path d="M9 14h6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  ),
  cng: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
    </svg>
  ),
};

export function ProductsOverview({ heading, items }: ProductsOverviewProps) {
  return (
    <Section className="bg-background">
      <div className="text-center">
        <h2 className="font-heading text-3xl font-bold text-brand-teal-dark sm:text-4xl">{heading}</h2>
      </div>
      <div className="mt-12 grid gap-6 sm:grid-cols-3">
        {items.map((item) => (
          <Card key={item.key} className="p-8 hover:shadow-md transition-shadow">
            <div className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-brand-orange/10 text-brand-orange">
              {productIcons[item.key]}
            </div>
            <h3 className="font-heading text-xl font-bold text-brand-teal-dark">{item.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-neutral-600">{item.description}</p>
          </Card>
        ))}
      </div>
    </Section>
  );
}
