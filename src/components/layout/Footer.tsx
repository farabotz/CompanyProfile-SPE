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
    <footer className="border-t border-white/10 bg-brand-teal-dark text-white relative">
      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-10 px-4 py-14 sm:px-6 lg:grid-cols-4 lg:px-8">
        <div className="lg:col-span-2 space-y-4">
          <Link href={`/${locale}`} className="flex items-center gap-3 group">
            <Image
              src="/images/logo/logo-icon.png"
              alt={common.site.legalName}
              width={40}
              height={40}
              className="transition-transform group-hover:scale-105"
            />
            <span className="font-heading text-base font-bold leading-tight tracking-wide text-white group-hover:text-brand-orange transition-colors">
              PT SARANA PIRANTI ENERGI
            </span>
          </Link>
          <p className="max-w-sm text-sm text-white/75 leading-relaxed">{common.footer.tagline}</p>
        </div>

        <div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-brand-orange-light">
            {common.footer.quickLinksHeading}
          </h3>
          <ul className="mt-4 space-y-2.5">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-sm text-white/75 hover:text-white hover:translate-x-1 inline-block transition-all"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-brand-orange-light">
            {common.footer.addressHeading}
          </h3>
          <div className="mt-4 space-y-4 text-sm text-white/75">
            <div>
              <p className="font-semibold text-white">{common.footer.headOfficeLabel}</p>
              <p className="mt-0.5 leading-relaxed">{locations.headOffice.addressLines.join(", ")}</p>
            </div>
            <div>
              <p className="font-semibold text-white">{common.footer.storageLabel}</p>
              <p className="mt-0.5 leading-relaxed">{locations.storage.addressLines.join(", ")}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 bg-black/20">
        <div className="mx-auto w-full max-w-6xl px-4 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/50 sm:px-6 lg:px-8">
          <div>
            &copy; {new Date().getFullYear()} {common.site.legalName}. {common.footer.rights}
          </div>
          <div className="flex items-center gap-4 text-white/40">
            <span>Izin Usaha Niaga Terbatas ESDM</span>
            <span>•</span>
            <span>BPH Migas</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
