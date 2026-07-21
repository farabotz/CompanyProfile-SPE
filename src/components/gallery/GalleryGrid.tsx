"use client";

import { useState } from "react";
import Image from "next/image";
import type { GalleryImage, GalleryCategory } from "@/lib/content/gallery";
import { Lightbox } from "./Lightbox";

interface GalleryDictionary {
  intro: string;
  filter: {
    all: string;
    storage: string;
    fleet: string;
  };
  lightbox: {
    close: string;
    prev: string;
    next: string;
    imageOf: string;
  };
  captions: Record<string, string>;
}

interface GalleryGridProps {
  images: GalleryImage[];
  dict: GalleryDictionary;
}

type Filter = "all" | GalleryCategory;

export function GalleryGrid({ images, dict }: GalleryGridProps) {
  const [filter, setFilter] = useState<Filter>("all");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filtered = filter === "all" ? images : images.filter((img) => img.category === filter);

  const filterOptions: { key: Filter; label: string }[] = [
    { key: "all", label: dict.filter.all },
    { key: "storage", label: dict.filter.storage },
    { key: "fleet", label: dict.filter.fleet },
  ];

  return (
    <>
      {/* Filter bar */}
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {filterOptions.map((opt) => (
          <button
            key={opt.key}
            onClick={() => setFilter(opt.key)}
            className={`rounded-full px-5 py-2 text-sm font-medium transition-colors ${
              filter === opt.key
                ? "bg-brand-orange text-white shadow-sm"
                : "bg-white text-neutral-600 border border-black/10 hover:border-brand-orange/40 hover:text-brand-orange-dark"
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {filtered.map((img) => {
          const globalIdx = images.indexOf(img);
          const caption = dict.captions[img.captionId] ?? "";
          return (
            <button
              key={img.src}
              onClick={() => setLightboxIndex(globalIdx)}
              className="group relative aspect-square overflow-hidden rounded-xl bg-neutral-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-orange"
              aria-label={caption}
            >
              <Image
                src={img.src}
                alt={caption}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
              {/* Hover overlay with caption */}
              <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/60 via-black/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-3">
                <p className="text-left text-xs text-white line-clamp-2">{caption}</p>
              </div>
            </button>
          );
        })}
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <Lightbox
          images={images}
          captions={dict.captions}
          initialIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          dict={dict.lightbox}
        />
      )}
    </>
  );
}
