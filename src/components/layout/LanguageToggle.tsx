"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { locales, type Locale } from "@/lib/i18n/config";

interface LanguageToggleProps {
  current: Locale;
  label: string;
  className?: string;
}

export function LanguageToggle({ current, label, className = "" }: LanguageToggleProps) {
  const pathname = usePathname() || `/${current}`;
  const segments = pathname.split("/");

  return (
    <div className={`flex items-center gap-1 ${className}`} aria-label={label}>
      {locales.map((locale) => {
        const targetSegments = [...segments];
        targetSegments[1] = locale;
        const href = targetSegments.join("/") || "/";
        const isActive = locale === current;

        return (
          <Link
            key={locale}
            href={href}
            aria-current={isActive ? "true" : undefined}
            className={`rounded-md px-2 py-1 text-xs font-semibold transition-colors ${
              isActive
                ? "bg-brand-orange text-white"
                : "text-neutral-muted hover:bg-brand-orange/10 hover:text-brand-orange-dark"
            }`}
          >
            {locale.toUpperCase()}
          </Link>
        );
      })}
    </div>
  );
}
