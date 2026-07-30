# PT Sarana Piranti Energi

Bilingual company-profile website for PT Sarana Piranti Energi (SPE), an Indonesian oil and gas company.

## Stack

- Next.js 16 App Router
- React 19
- TypeScript
- Tailwind CSS v4
- Static export for GitHub Pages

## Requirements

- Node.js 20.9 or newer
- npm

## Setup

```bash
npm install
npm run dev
```

Open `http://localhost:3000`. Root path redirects to Indonesian locale:

- `http://localhost:3000/id/`
- `http://localhost:3000/en/`

Localized routes:

- `/`
- `/tentang-kami/` / `/about/`
- `/produk-layanan/` / `/products-services/`
- `/galeri/` / `/gallery/`
- `/kontak/` / `/contact/`

## Commands

```bash
npm run dev
npm run lint
npx tsc --noEmit
npm run build
npm run start
```

Run lint, typecheck, and build before merge.

## Static deployment

`next.config.ts` uses `output: "export"`, so `npm run build` writes static files to `out/`. The build includes `out/id/` and `out/en/` for Indonesian and English routes. `trailingSlash: true` keeps routes compatible with static hosting, and local images use `images.unoptimized: true`.

GitHub Pages workflow builds the project and publishes `out/` to the `gh-pages` branch. If deploying under a repository subpath instead of a custom domain or root Pages site, configure Next.js `basePath` and asset paths for that URL before deployment.

## Manual QA

Before release, check:

- Indonesian and English locale links
- Home, About, Products & Services, Gallery, and Contact pages
- Desktop and mobile layouts
- Navigation, buttons, images, and gallery controls
- Contact form validation and generated email draft

## Project notes

- Business facts live in `src/lib/content/`.
- Translated page content lives in `src/dictionaries/`.
- Image assets live in `public/images/`.
- Legal certificate scans must not be published; use verified text facts only.
