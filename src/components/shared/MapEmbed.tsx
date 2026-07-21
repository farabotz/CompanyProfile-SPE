import { mapEmbedSrc } from "@/lib/content/locations";

interface MapEmbedProps {
  query: string;
  title: string;
  className?: string;
}

export function MapEmbed({ query, title, className = "" }: MapEmbedProps) {
  return (
    <iframe
      src={mapEmbedSrc(query)}
      title={title}
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
      className={`h-64 w-full border-0 ${className}`}
    />
  );
}
