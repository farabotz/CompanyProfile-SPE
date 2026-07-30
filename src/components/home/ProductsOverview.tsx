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

const productAccent: Record<string, string> = {
  condensate: "from-sky-700 via-cyan-600 to-teal-500",
  lpg: "from-amber-600 via-orange-500 to-rose-500",
  cng: "from-emerald-700 via-green-600 to-lime-500",
};

export function ProductsOverview({ heading, items }: ProductsOverviewProps) {
  return (
    <Section className="bg-background">
      <div className="text-center">
        <h2 className="font-heading text-3xl font-bold text-brand-teal-dark sm:text-4xl">{heading}</h2>
      </div>
      <div className="mt-12 grid gap-6 sm:grid-cols-3">
        {items.map((item) => {
          const accent = productAccent[item.key] ?? "from-slate-700 via-slate-600 to-slate-500";

          return (
            <Card
              key={item.key}
              className="group rounded-[20px] border border-slate-200/80 bg-white p-7 sm:p-8 shadow-[0_20px_60px_-24px_rgba(15,23,42,0.25)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_28px_70px_-24px_rgba(15,23,42,0.32)]"
            >
              <h3 className="font-heading text-xl font-bold text-brand-teal-dark">{item.title}</h3>
              <p className="mt-4 text-sm leading-7 text-neutral-600">{item.description}</p>
            </Card>
          );
        })}
      </div>
    </Section>
  );
}
