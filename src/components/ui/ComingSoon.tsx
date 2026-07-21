import { Section } from "./Section";
import { Badge } from "./Badge";

interface ComingSoonProps {
  badge: string;
  title: string;
  body: string;
}

export function ComingSoon({ badge, title, body }: ComingSoonProps) {
  return (
    <Section className="text-center">
      <Badge variant="orange" className="mx-auto">
        {badge}
      </Badge>
      <h1 className="mt-4 font-heading text-3xl font-bold text-brand-teal-dark sm:text-4xl">{title}</h1>
      <p className="mx-auto mt-3 max-w-xl text-neutral-muted">{body}</p>
    </Section>
  );
}
