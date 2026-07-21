import Image from "next/image";
import Link from "next/link";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/get-dictionary";
import { LanguageToggle } from "./LanguageToggle";
import { MobileNav } from "./MobileNav";

interface HeaderProps {
  locale: Locale;
  common: Dictionary["common"];
}

export function Header({ locale, common }: HeaderProps) {
  const navItems = [
    { href: `/${locale}`, label: common.nav.home },
    { href: `/${locale}/tentang-kami`, label: common.nav.about },
    { href: `/${locale}/produk-layanan`, label: common.nav.products },
    { href: `/${locale}/galeri`, label: common.nav.gallery },
    { href: `/${locale}/kontak`, label: common.nav.contact },
  ];
  const contactHref = `/${locale}/kontak`;

  return (
    <header className="sticky top-0 z-50 border-b border-black/5 bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href={`/${locale}`} className="flex items-center gap-2 shrink-0">
          <Image
            src="/images/logo/logo-icon.png"
            alt={common.site.legalName}
            width={36}
            height={36}
            priority
          />
          <span className="hidden font-heading text-sm font-bold leading-tight text-brand-teal-dark sm:block">
            SARANA PIRANTI
            <br />
            ENERGI
          </span>
        </Link>

        <nav className="hidden md:flex md:items-center md:gap-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-md px-3 py-2 text-sm font-medium text-neutral-700 hover:bg-brand-orange/5 hover:text-brand-orange-dark"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <LanguageToggle current={locale} label={common.languageToggle.label} className="hidden sm:flex" />
          <Link
            href={contactHref}
            className="hidden rounded-md bg-brand-orange px-4 py-2 text-sm font-semibold text-white hover:bg-brand-orange-dark md:inline-flex"
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
