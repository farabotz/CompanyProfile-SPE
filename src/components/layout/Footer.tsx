import Image from "next/image";
import Link from "next/link";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/get-dictionary";
import { locations } from "@/lib/content/locations";

interface FooterProps {
  locale: Locale;
  common: Dictionary["common"];
}

export function Footer({ locale, common }: FooterProps) {
  const navItems = [
    { href: `/${locale}`, label: common.nav.home },
    { href: `/${locale}/tentang-kami`, label: common.nav.about },
    { href: `/${locale}/produk-layanan`, label: common.nav.products },
    { href: `/${locale}/galeri`, label: common.nav.gallery },
    { href: `/${locale}/kontak`, label: common.nav.contact },
  ];

  return (
    <footer className="border-t border-white/10 bg-brand-teal-dark text-white">
      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-10 px-4 py-14 sm:px-6 lg:grid-cols-4 lg:px-8">
        <div className="lg:col-span-2">
          <Link href={`/${locale}`} className="flex items-center gap-2">
            <Image src="/images/logo/logo-icon.png" alt={common.site.legalName} width={40} height={40} />
            <span className="font-heading text-base font-bold leading-tight">
              SARANA PIRANTI ENERGI
            </span>
          </Link>
          <p className="mt-4 max-w-sm text-sm text-white/70">{common.footer.tagline}</p>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-white/50">
            {common.footer.quickLinksHeading}
          </h3>
          <ul className="mt-4 space-y-2">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-sm text-white/80 hover:text-white">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-white/50">
            {common.footer.addressHeading}
          </h3>
          <div className="mt-4 space-y-4 text-sm text-white/80">
            <div>
              <p className="font-medium text-white">{common.footer.headOfficeLabel}</p>
              <p>{locations.headOffice.addressLines.join(", ")}</p>
            </div>
            <div>
              <p className="font-medium text-white">{common.footer.storageLabel}</p>
              <p>{locations.storage.addressLines.join(", ")}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto w-full max-w-6xl px-4 py-5 text-xs text-white/50 sm:px-6 lg:px-8">
          &copy; {new Date().getFullYear()} {common.site.legalName}. {common.footer.rights}
        </div>
      </div>
    </footer>
  );
}
