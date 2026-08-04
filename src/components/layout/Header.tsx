"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/get-dictionary";
import { LanguageToggle } from "./LanguageToggle";
import { MobileNav } from "./MobileNav";

interface HeaderProps {
  locale: Locale;
  common: Dictionary["common"];
}

export function Header({ locale, common }: HeaderProps) {
  const pathname = usePathname();

  const navItems = [
    { href: `/${locale}`, label: common.nav.home },
    { href: `/${locale}/tentang-kami`, label: common.nav.about },
    { href: `/${locale}/produk-layanan`, label: common.nav.products },
    { href: `/${locale}/galeri`, label: common.nav.gallery },
    { href: `/${locale}/kontak`, label: common.nav.contact },
  ];
  const contactHref = `/${locale}/kontak`;

  const isActive = (href: string) => {
    if (href === `/${locale}`) {
      return pathname === `/${locale}` || pathname === `/${locale}/`;
    }
    return pathname.startsWith(href);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-neutral-200/70 bg-white/85 backdrop-blur-md transition-all duration-200">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href={`/${locale}`} className="group flex items-center gap-2 shrink-0">
          <div className="relative overflow-hidden transition-transform duration-300 group-hover:scale-105">
            <Image
              src="/images/logo/logo-icon.png"
              alt={common.site.legalName}
              width={36}
              height={36}
              priority
            />
          </div>
          <span className="hidden font-heading text-xs sm:text-sm font-bold leading-tight text-brand-teal-dark transition-colors group-hover:text-brand-orange sm:block">
            SARANA PIRANTI
            <br />
            ENERGI
          </span>
        </Link>

        <nav className="hidden md:flex md:items-center md:gap-1.5">
          {navItems.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative rounded-lg px-3.5 py-2 text-sm font-medium transition-all duration-200 ${
                  active
                    ? "bg-brand-orange/10 text-brand-orange-dark font-semibold shadow-2xs"
                    : "text-neutral-700 hover:bg-neutral-100/80 hover:text-brand-orange-dark"
                }`}
              >
                {item.label}
                {active && (
                  <span className="absolute bottom-0 left-3 right-3 h-0.5 rounded-full bg-brand-orange" />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <LanguageToggle current={locale} label={common.languageToggle.label} className="hidden sm:flex" />
          <Link
            href={contactHref}
            className="hidden rounded-lg bg-brand-orange px-4 py-2 text-sm font-semibold text-white shadow-xs hover:bg-brand-orange-dark hover:shadow-md active:scale-[0.98] transition-all duration-200 md:inline-flex"
          >
            {common.cta.contactUs}
          </Link>
          <MobileNav
            navItems={navItems}
            ctaHref={contactHref}
            ctaLabel={common.cta.contactUs}
            openLabel={common.mobileNav.open}
            closeLabel={common.mobileNav.close}
          />
        </div>
      </div>
    </header>
  );
}
