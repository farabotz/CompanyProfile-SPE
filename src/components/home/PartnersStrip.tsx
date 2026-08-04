import Image from "next/image";
import { Section } from "@/components/ui/Section";
import type { Partner } from "@/lib/content/partners";

interface PartnersStripProps {
  heading: string;
  supplierLabel: string;
  buyerLabel: string;
  disclaimer: string;
  partners: Partner[];
}

export function PartnersStrip({ heading, supplierLabel, buyerLabel, disclaimer, partners }: PartnersStripProps) {
  const suppliers = partners.filter((p) => p.role === "supplier");
  const buyers = partners.filter((p) => p.role === "buyer");

  return (
    <Section className="bg-white">
      <div className="text-center">
        <h2 className="font-heading text-3xl font-bold text-brand-teal-dark sm:text-4xl">{heading}</h2>
      </div>

      <div className="mt-12 space-y-10">
        {/* Supplier */}
        <div>
          <p className="mb-5 text-center text-sm font-semibold uppercase tracking-widest text-neutral-muted">
            {supplierLabel}
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            {suppliers.map((partner) => (
              <div
                key={partner.id}
                className="flex h-52 w-80 items-center justify-center p-2"
              >
                <Image
                  src={partner.logoSrc}
                  alt={partner.name}
                  width={320}
                  height={208}
                  className="h-full w-full object-contain"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-dashed border-black/10" />

        {/* Buyers */}
        <div>
          <p className="mb-5 text-center text-sm font-semibold uppercase tracking-widest text-neutral-muted">
            {buyerLabel}
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            {buyers.map((partner) => (
              <div
                key={partner.id}
                className="flex h-36 w-60 items-center justify-center p-2"
              >
                <Image
                  src={partner.logoSrc}
                  alt={partner.name}
                  width={240}
                  height={144}
                  className="h-full w-full object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <p className="mt-8 text-center text-xs text-neutral-muted">{disclaimer}</p>
    </Section>
  );
}
