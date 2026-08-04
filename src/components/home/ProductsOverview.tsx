import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

interface ProductItem {
  key: string;
  title: string;
  description: string;
}

interface ProductsOverviewProps {
  heading: string;
  items: ProductItem[];
}

export function ProductsOverview({ heading, items }: ProductsOverviewProps) {
  return (
    <Section className="bg-background">
      <ScrollReveal>
        <div className="text-center">
          <span className="text-xs font-bold uppercase tracking-widest text-brand-orange">
            Solusi Pasokan Energi
          </span>
          <h2 className="mt-2 font-heading text-3xl font-bold text-brand-teal-dark sm:text-4xl">{heading}</h2>
        </div>
      </ScrollReveal>
      <div className="mt-12 grid gap-6 sm:grid-cols-3">
        {items.map((item, idx) => {
          return (
            <ScrollReveal key={item.key} delay={idx * 150}>
              <Card className="group h-full rounded-2xl border border-neutral-200/80 bg-white p-7 sm:p-8 shadow-xs transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lg hover:border-brand-orange/40">
                <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-brand-orange/10 text-brand-orange font-bold text-sm">
                  0{idx + 1}
                </div>
                <h3 className="font-heading text-xl font-bold text-brand-teal-dark group-hover:text-brand-orange transition-colors">
                  {item.title}
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-neutral-600">{item.description}</p>
              </Card>
            </ScrollReveal>
          );
        })}
      </div>
    </Section>
  );
}
