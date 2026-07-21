"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { defaultLocale } from "@/lib/i18n/config";

const target = `/${defaultLocale}`;

// A plain `redirect()` call here would work for a Node server, but under
// `output: 'export'` the prerendered "/" has no server to issue a real 307:
// Next bakes it as a client-hydration redirect and the static HTML fallback
// (visible before JS runs, or to crawlers/no-JS clients) is a 404-shaped
// error shell. Redirecting explicitly client-side plus a meta-refresh and a
// visible link avoids that flash and covers the no-JS case.
export default function RootPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace(target);
  }, [router]);

  return (
    <html lang="id">
      <head>
        <meta httpEquiv="refresh" content={`0;url=${target}`} />
      </head>
      <body>
        <p>
          <a href={target}>Sarana Piranti Energi</a>
        </p>
      </body>
    </html>
  );
}
