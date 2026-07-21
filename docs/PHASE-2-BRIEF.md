# Phase 2A/2B Brief — Page Content for the SPE Website

This is a standalone brief for whoever picks up Phase 2 of this project (no
access to the original planning conversation is assumed — everything needed
should be here or discoverable in the repo).

## Project in one paragraph

This repo is a bilingual (Indonesian/English) company-profile website for
**PT Sarana Piranti Energi (SPE)**, an Indonesian Oil & Gas company (LPG,
Condensate, CNG trading/storage), founded 2023. Built with Next.js 16 (App
Router) + TypeScript + Tailwind v4, static export (`output: 'export'`, no
backend). Source content comes from the company's own
`Company Profile SPE 2026.pdf` — the full text/facts needed to write this
phase are transcribed below, you don't need the original PDF.

## What Phase 1 already built (don't redo this)

- Scaffold, static export config, Tailwind v4 brand tokens, fonts.
- i18n plumbing: `src/lib/i18n/config.ts`, `get-dictionary.ts`. Each locale's
  dictionary is assembled from **per-page JSON files** in
  `src/dictionaries/{id,en}/{common,home,about,products,gallery,contact}.json`
  — this split exists so two people can edit different pages' JSON without
  merge conflicts. `common.json` (nav, footer, CTA labels) is already
  complete for both locales — don't touch it unless something is missing.
  The other five files currently only have a `meta` object and `pageTitle`
  stub — **extend them** with whatever keys your components need (see task
  list below), keep `id` and `en` structurally parallel.
- Shared layout: `src/components/layout/{Header,Footer,LanguageToggle,MobileNav}.tsx`
  — done, don't need changes.
- UI primitives in `src/components/ui/`: `Container`, `Section`, `Card`,
  `Badge`, `Button` (variants `primary`/`secondary`/`ghost`), `ComingSoon`
  (the current placeholder every page renders — **replace it** with real
  content per page, but keep the `generateMetadata` pattern each page file
  already has).
- Shared cross-page components in `src/components/shared/`: `LocationCard`
  + `MapEmbed` (Google Maps iframe, no API key) — both About and Contact
  pages need these, already built and wired to real address data.
- Language-neutral fact data in `src/lib/content/`:
  - `legal.ts` — legal credentials (numbers/dates/issuers), leadership
    names, KBLI codes, storage facility list. **Read the file header
    comment**: leadership names were OCR'd from a scanned document and one
    name had an OCR error already caught and fixed — still worth a sanity
    read, but don't re-derive from scratch.
  - `locations.ts` — head office + storage addresses and map query strings.
  - `partners.ts` — supplier/buyer partner list with logo paths.
  - `gallery.ts` — the 14 gallery image entries (src, category, captionId)
    — you'll need to add matching caption strings to the dictionaries.
- 30 real photo/logo/diagram assets already extracted into `public/images/`
  (see tree below) — brand colors were sampled directly from these assets,
  don't invent new hex values.
- Policy (already enforced in `legal.ts`'s comments, keep following it):
  **never** embed scanned legal-certificate images publicly — the source
  PDF's legal pages show NPWP numbers and signatures. Only the plain facts
  in `legal.ts` (as badges/text) are shown.

### Available image assets (`public/images/`)

```
logo/          logo-mark.png (transparent, full lockup), logo-icon.png (icon only)
hero/          hero-storage-tanker.jpg
about/         jakarta-tower-portrait.jpg, jakarta-tower-wide.jpg, refinery-sunset.jpg
locations/     office-tower-square.jpg, storage-yard-overview.jpg, storage-yard-alt.jpg
fleet/         fleet-tanker-road.jpg, fleet-yard-collage.jpg, fleet-parked-pair.jpg,
               fleet-hino-worker.jpg, fleet-hino-night.jpg, fleet-worker-dusk.jpg
storage-activity/  control-room-collage.jpg, iso-tank-loading.jpg, iso-tank-inspection.jpg,
               tank-top-inspection.jpg, worker-hose-filling.jpg, storage-yard-trucks.jpg,
               storage-yard-empty.jpg, storage-yard-wide.jpg
condensate/    process-diagram.png (generic gas/condensate separator flow diagram, English labels)
partners/      petronas-facility.jpg, pcm-logo.png, wtc-logo.png, puma-logo.png
infographic/   value-chain.png (branded 6-step value-chain graphic, Indonesian text baked in)
decorative/    worker-valve-icon.png, facility-isometric.png (optional accents)
```

## Technical patterns to follow

- Every page file (`src/app/[locale]/*/page.tsx`) already has the right
  shape: `generateMetadata` reading `dict.<page>.meta.{title,description}`,
  and a default export reading `dict.<page>` + `dict.common` for content.
  Keep that shape; just replace the `<ComingSoon .../>` body with real
  composed sections.
- `params` is `Promise<{ locale: string }>` — always `await params` (Next
  16 requirement, already done correctly in existing files — copy the
  pattern).
- Tailwind v4 brand tokens (defined in `src/app/globals.css` `@theme`
  block): `bg-brand-orange`, `bg-brand-orange-light`, `bg-brand-orange-dark`,
  `text-brand-orange` / `text-brand-orange-dark`, `bg-brand-teal`,
  `bg-brand-teal-dark`, `text-brand-teal-dark`, `text-brand-green`,
  `text-neutral-muted`. Headings should use `font-heading` (Plus Jakarta
  Sans); body text uses the default `font-sans` (Inter).
- Images: use `next/image` where practical; `images.unoptimized: true` is
  already set (static export requirement) so no remote loader config is
  needed — local `/images/...` paths just work.
- Don't add new npm dependencies without a good reason — no lightbox
  library, no form library, no icon library beyond the already-installed
  `lucide-react`. Build the gallery lightbox and contact form with plain
  React state (see Track B tasks).

## Verification before you push

```
npm run lint
npx tsc --noEmit
npm run build   # static export — must succeed and produce out/id/... + out/en/...
npm run dev     # manually click through both locales, all 5 pages, mobile width
```

## Git workflow

Work on a branch, e.g. `phase-2-content`, commit there, and push/open a PR.
Final integration (merge, `CLAUDE.md`, last-mile QA) is being handled
separately by the repo owner — you don't need to touch `CLAUDE.md`.

---

## Track A — Beranda (Home) + Tentang Kami (About)

Files: `src/dictionaries/{id,en}/home.json`, `src/dictionaries/{id,en}/about.json`,
new components under `src/components/home/` and `src/components/about/`,
`src/app/[locale]/page.tsx`, `src/app/[locale]/tentang-kami/page.tsx`.

### Beranda (Home) — sections to build

1. **Hero** — logo, headline/tagline, `public/images/hero/hero-storage-tanker.jpg`
   as background (it already has an orange tint baked in, matches brand —
   don't re-tint it further), CTA buttons to "Produk & Layanan" and "Kontak".
2. **About snippet** — 2-3 sentence condensed version of the About narrative
   below, with a "Selengkapnya"/"Learn More" link to `/tentang-kami`.
3. **Vision & Mission cards** — short version, full text below.
4. **Product overview cards** — three cards: Kondensat, LPG, CNG (one
   sentence each — CNG/LPG production is described in the "future plans"
   text below since SPE is currently condensate-focused with LPG/CNG
   processing planned).
5. **Process teaser** — compact preview of the 6-step value chain (could
   just be the `infographic/value-chain.png` image scaled down, or a short
   icon+label row), linking to the full version on Produk & Layanan.
6. **Legal/trust badge strip** — render `legalCredentials` from
   `src/lib/content/legal.ts` as small badges (e.g. "Akta Notaris 2023",
   "NIB Terdaftar", "Izin Niaga Migas — berlaku s.d. 10 Sep 2027").
7. **Partners strip** — render `partners` from `src/lib/content/partners.ts`.
   Label Petronas clearly as supplier ("Pemasok"/"Supplier") and the other
   three as buyer partners ("Mitra Pembeli"/"Buyer Partners") — don't imply
   a joint venture or formal endorsement, it's a trading relationship.
8. **CTA banner** to Kontak.

### Tentang Kami (About) — sections to build

1. **Full narrative** (Indonesian source, translate faithfully for `en`):

   > Berawal dari PT. Step point Indonesia dan yang berpengalaman dalam
   > bidang Kontraktor, Tehnologi Informasi, Jaringan dan ME bekerja sama
   > dengan praktisi yang berpengalaman dibidang Gas baik tehnik, sales dan
   > investasi, pada awal Tahun 2023 membuat perusahaan yang bergerak di
   > bidang Gas dan yang berhubungan dengannya. Dengan nama PT. Sarana
   > Piranti Energi. Selama ini kami hanya mendukung perusahaan perusahaan
   > yang bergerak dibidang minyak dan Gas sebagai Investor dan kontraktor
   > dalam penjualan/pembelian produk, perawatan dan pembangunan fasilitas.
   > Dan saat ini kami terjun langsung di bisnis ini, baik dibidang
   > penjualan, produksi dan pengembangan seperti sudah direncana kedepan
   > akan memulai Pembuatan Pengolahan LPG dan CNG.

2. **Visi**: "Menjadi perusahaan yang terbaik dalam Bidang Migas dan
   Pengelolaannya" ("To become the best company in the Oil & Gas field and
   its management").
   **Misi**: "Selalu meningkatkan Pelayanan dan produktivitas yang tinggi
   didalam semua kegiatan" ("To continuously improve service and high
   productivity in all activities").
3. **Milestones** — founded early 2023, background from PT Step Point
   Indonesia (Contractor / IT / Networking / ME experience) combined with
   gas-industry practitioners (technical, sales, investment).
4. **Legalitas section** — render every entry in `legalCredentials`
   (`src/lib/content/legal.ts`) as a clean badge/row: id, number, date,
   issuer, and `validUntil` where present. Also show `kbliCodes` (KBLI
   business classification codes) and `storageFacilities` (3× 25 kL tanks,
   Bojonegoro, self-owned — "Milik Sendiri"). **No scanned document
   images.**
5. **Leadership list** — render `leadership` from `legal.ts` with each
   member's name + role label (translate role IDs:
   `direkturUtama` = "Direktur Utama"/"President Director",
   `direktur` = "Direktur"/"Director",
   `komisarisUtama` = "Komisaris Utama"/"President Commissioner",
   `komisaris` = "Komisaris"/"Commissioner").
6. **Two `LocationCard`s** — `<LocationCard label={...} location={locations.headOffice} />`
   and same for `locations.storage`, side by side.

---

## Track B — Produk & Layanan + Galeri + Kontak

Files: `src/dictionaries/{id,en}/products.json`,
`src/dictionaries/{id,en}/gallery.json`, `src/dictionaries/{id,en}/contact.json`,
new components under `src/components/products/`, `src/components/gallery/`,
`src/components/contact/`, `src/app/[locale]/produk-layanan/page.tsx`,
`src/app/[locale]/galeri/page.tsx`, `src/app/[locale]/kontak/page.tsx`.

### Produk & Layanan — sections to build

1. **Kondensat explainer** (Indonesian source, translate for `en`):

   > Kondensat adalah cairan hidrokarbon yang terbentuk dari gas alam,
   > terutama pada proses produksi minyak dan gas bumi. Kondensat memiliki
   > sifat mirip bensin, yaitu mudah terbakar dan berbentuk cairan pada
   > kondisi suhu dan tekanan normal. Kondensat memiliki berbagai kegunaan,
   > antara lain sebagai pelarut dalam industri cat, farmasi, dan lem;
   > bahan bakar; serta bahan baku dalam industri petrokimia.

2. **Value chain infographic** — display `public/images/infographic/value-chain.png`
   directly (it's already a sharp, branded, high-res asset — no need to
   rebuild it). Because the text is baked into the image (Indonesian only),
   **also render the 6 steps as real, translatable text** underneath or
   beside it (for accessibility and the English version):
   1. **Eksplorasi Gas** / *Gas Exploration* — Pertamina atau perusahaan
      swasta nasional/internasional yang mengekstraksi kandungan gas alam
      dari sumur minyak atau sumur gas.
   2. **Pengolahan Gas** / *Gas Processing* — mengolah gas bumi dari
      Lapangan Migas menjadi produk-produk berupa LPG, Kondensat, dan CNG
      (Lean Gas).
   3. **Transportasi** / *Transportation*.
   4. **Splitter LPG** / *LPG Splitter* — distilasi: memisahkan fraksi
      campuran LPG yang belum stabil menjadi komponen lebih ringan,
      menghasilkan Butane & Propane.
   5. **Stasiun Pengisian LPG (SPBE)** / *LPG Filling Station* — Stasiun
      Pengisian Bulk Elpiji, sarana khusus perpanjangan dari Pertamina
      (Persero) untuk menyalurkan LPG ke masyarakat.
   6. **Konsumen** / *Consumer*.
3. **Condensate process diagram** — just use
   `public/images/condensate/process-diagram.png` directly (it's a generic,
   non-branded engineering diagram already labeled in English — Gas Wells →
   Cooler → High/Low Pressure Separator → Compressors → pipeline/refinery.
   No need to rebuild as HTML/SVG unless you want to.
4. **Investment/contracting services** — from the About narrative: SPE has
   supported oil & gas companies as investor/contractor for product
   trading, facility maintenance, and facility construction.
5. **Future LPG & CNG plans callout** — SPE plans to begin LPG and CNG
   processing plant construction going forward.

### Galeri — sections to build

- `GalleryGrid` component driven by `galleryImages` from
  `src/lib/content/gallery.ts` — responsive grid (2 cols mobile, 3-4
  desktop), grouped or filterable by `category` (`storage` | `fleet`) if
  you like, not required.
- Add a caption string per `captionId` to `dictionaries/{id,en}/gallery.json`
  for every entry in `galleryImages` (14 total: `controlRoom`,
  `isoTankLoading`, `isoTankInspection`, `tankTopInspection`, `hoseFilling`,
  `storageYardTrucks`, `storageYardEmpty`, `storageYardWide`, `tankerRoad`,
  `yardCollage`, `parkedPair`, `hinoWorker`, `hinoNight`, `workerDusk`) —
  short descriptive captions (e.g. "Ruang kontrol SCADA storage
  Bojonegoro" / "SCADA control room, Bojonegoro storage facility").
- `Lightbox` client component: click a thumbnail to open full-size, prev/next
  navigation, close on `Escape`/click-outside/close button, lock body scroll
  while open. No external library — plain `useState`.

### Kontak — sections to build

- Two `LocationCard`s (head office + storage), same component as About.
- `ContactForm`: fields name / email / subject / message. Client-side
  validation (required fields, basic email regex) with inline bilingual
  error messages. On submit, since there's no backend, build a `mailto:`
  link (`mailto:info@saranapirantienergi.com?subject=...&body=...`, URL-
  encode the fields) and navigate to it. Show a small bilingual notice near
  the form explaining this opens the visitor's email client with a
  pre-filled draft rather than sending in-page — this is a known/documented
  limitation, not a bug, and doesn't need fixing in this phase.
