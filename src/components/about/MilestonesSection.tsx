import { Section } from "@/components/ui/Section";

interface MilestoneItem {
  year: string;
  month: string;
  title: string;
  body: string;
}

interface MilestonesSectionProps {
  heading: string;
  items: MilestoneItem[];
}

export function MilestonesSection({ heading, items }: MilestonesSectionProps) {
  return (
    <Section className="bg-white">
      <div className="text-center">
        <h2 className="font-heading text-3xl font-bold text-brand-teal-dark sm:text-4xl">{heading}</h2>
      </div>

      <div className="mt-12 relative">
        {/* Vertical line */}
        <div className="absolute left-4 top-0 bottom-0 w-px bg-brand-teal/20 sm:left-1/2" aria-hidden="true" />

        <div className="space-y-10">
          {items.map((item, idx) => (
            <div
              key={idx}
              className={`relative flex gap-6 sm:gap-0 ${
                idx % 2 === 0 ? "sm:flex-row" : "sm:flex-row-reverse"
              }`}
            >
              {/* Content */}
              <div className={`ml-12 flex-1 sm:ml-0 ${idx % 2 === 0 ? "sm:pr-12 sm:text-right" : "sm:pl-12"}`}>
                <div
                  className={`inline-block rounded-xl border border-black/5 bg-white p-6 shadow-sm w-full sm:max-w-sm ${
                    idx % 2 === 0 ? "sm:ml-auto" : ""
                  }`}
                >
                  {item.year && (
                    <span className="text-xs font-semibold uppercase tracking-wide text-brand-orange">
                      {item.month} {item.year}
                    </span>
                  )}
                  <h3 className="mt-1 font-heading text-lg font-bold text-brand-teal-dark">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-neutral-600">{item.body}</p>
                </div>
              </div>

              {/* Dot */}
              <div className="absolute left-4 top-6 flex h-3 w-3 items-center justify-center sm:left-1/2 sm:-translate-x-1.5">
                <span className="block h-3 w-3 rounded-full bg-brand-orange ring-4 ring-brand-orange/20" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
