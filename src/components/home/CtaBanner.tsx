import { Button } from "@/components/ui/Button";

interface CtaBannerProps {
  locale: string;
  heading: string;
  body: string;
  button: string;
}

export function CtaBanner({ locale, heading, body, button }: CtaBannerProps) {
  return (
    <section className="bg-brand-orange py-20">
      <div className="mx-auto max-w-6xl px-4 text-center sm:px-6 lg:px-8">
        <h2 className="font-heading text-3xl font-bold text-white sm:text-4xl">{heading}</h2>
        <p className="mt-4 text-lg text-white/85 max-w-xl mx-auto">{body}</p>
        <div className="mt-8">
          <Button
            href={`/${locale}/kontak`}
            variant="secondary"
            className="border-white text-white hover:bg-white/10 px-8 py-3 text-base"
          >
            {button}
          </Button>
        </div>
      </div>
    </section>
  );
}
