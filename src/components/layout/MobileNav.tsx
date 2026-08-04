"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavItem {
  href: string;
  label: string;
}

interface MobileNavProps {
  navItems: NavItem[];
  ctaHref: string;
  ctaLabel: string;
  openLabel: string;
  closeLabel: string;
}

export function MobileNav({ navItems, ctaHref, ctaLabel, openLabel, closeLabel }: MobileNavProps) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const [prevPathname, setPrevPathname] = useState(pathname);

  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    setIsOpen(false);
  }

  useEffect(() => {
    if (!isOpen) return;

    document.body.style.overflow = "hidden";
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const isActive = (href: string) => {
    if (href.endsWith("/id") || href.endsWith("/en")) {
      return pathname === href || pathname === `${href}/`;
    }
    return pathname.startsWith(href);
  };

  return (
    <div className="md:hidden">
      <button
        type="button"
        aria-expanded={isOpen}
        aria-label={isOpen ? closeLabel : openLabel}
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex h-10 w-10 items-center justify-center rounded-lg text-brand-teal-dark hover:bg-neutral-100 active:scale-95 transition-all"
      >
        <div className="relative h-5 w-5 flex items-center justify-center">
          <span
            className={`absolute h-0.5 w-5 bg-current transition-all duration-300 ${
              isOpen ? "rotate-45" : "-translate-y-1.5"
            }`}
          />
          <span
            className={`absolute h-0.5 w-5 bg-current transition-all duration-300 ${
              isOpen ? "opacity-0" : "opacity-100"
            }`}
          />
          <span
            className={`absolute h-0.5 w-5 bg-current transition-all duration-300 ${
              isOpen ? "-rotate-45" : "translate-y-1.5"
            }`}
          />
        </div>
      </button>

      {/* Backdrop overlay & Menu container */}
      <div
        className={`fixed inset-x-0 top-16 bottom-0 z-40 flex flex-col bg-white/95 backdrop-blur-lg transition-all duration-300 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <nav className="flex flex-col gap-2 px-6 py-6 overflow-y-auto">
          {navItems.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-xl px-4 py-3.5 text-base font-medium transition-all ${
                  active
                    ? "bg-brand-orange/10 text-brand-orange-dark font-semibold border-l-4 border-brand-orange"
                    : "text-neutral-800 hover:bg-neutral-100"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
          <Link
            href={ctaHref}
            className="mt-4 rounded-xl bg-brand-orange px-4 py-3.5 text-center text-base font-semibold text-white shadow-md active:scale-[0.98] transition-all"
          >
            {ctaLabel}
          </Link>
        </nav>
      </div>
    </div>
  );
}
