"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import type { GalleryImage } from "@/lib/content/gallery";

interface LightboxDictionary {
  close: string;
  prev: string;
  next: string;
  imageOf: string;
}

interface LightboxProps {
  images: GalleryImage[];
  captions: Record<string, string>;
  initialIndex: number;
  onClose: () => void;
  dict: LightboxDictionary;
}

export function Lightbox({ images, captions, initialIndex, onClose, dict }: LightboxProps) {
  const [current, setCurrent] = useState(initialIndex);

  const goPrev = useCallback(() => {
    setCurrent((i) => (i === 0 ? images.length - 1 : i - 1));
  }, [images.length]);

  const goNext = useCallback(() => {
    setCurrent((i) => (i === images.length - 1 ? 0 : i + 1));
  }, [images.length]);

  useEffect(() => {
    const savedOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = savedOverflow;
    };
  }, []);

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose, goPrev, goNext]);

  const img = images[current];
  const caption = captions[img.captionId] ?? "";

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={dict.imageOf}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/92 backdrop-blur-md p-4 animate-in fade-in duration-200"
      onClick={onClose}
    >
      {/* Inner container */}
      <div
        className="relative flex max-h-full max-w-5xl w-full flex-col items-center gap-4 animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          aria-label={dict.close}
          className="absolute -top-12 right-0 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 active:scale-95 transition-all"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>

        {/* Image Display */}
        <div className="relative w-full overflow-hidden rounded-2xl bg-black/40 border border-white/10 shadow-2xl flex items-center justify-center min-h-[50vh]" style={{ maxHeight: "75vh" }}>
          <Image
            key={img.src}
            src={img.src}
            alt={caption}
            width={1200}
            height={800}
            className="h-full w-full object-contain transition-all duration-300 animate-in fade-in"
            style={{ maxHeight: "75vh" }}
          />
        </div>

        {/* Caption + navigation */}
        <div className="flex w-full items-center justify-between gap-4 px-2">
          <button
            onClick={goPrev}
            aria-label={dict.prev}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 active:scale-95 transition-all"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          <div className="flex flex-col items-center gap-1 text-center">
            <p className="text-base font-medium text-white/95 leading-snug">{caption}</p>
            <span className="inline-flex items-center rounded-full bg-white/10 px-3 py-0.5 text-xs text-white/70">
              {current + 1} / {images.length}
            </span>
          </div>

          <button
            onClick={goNext}
            aria-label={dict.next}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 active:scale-95 transition-all"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
