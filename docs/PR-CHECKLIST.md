Phase 3 — PR Checklist

Before merging to `main`:

- [ ] Run `npm run lint` locally — no lint errors.
- [ ] Run `npx tsc --noEmit` — no type errors.
- [ ] Run `npm run build` — static export succeeds and `out/` is generated.
- [ ] Manual QA: browse `/id` and `/en` for Home, About, Products, Gallery, Contact.
- [ ] Verify `Lightbox` navigation and keyboard controls work.
- [ ] Verify `ContactForm` opens the mail client with correct recipient and fields.
- [ ] Confirm leadership/legal spellings in `src/lib/content/legal.ts` (see `docs/LEGAL-VERIFY.md`).
- [ ] Decide fate of files in `docs/UNUSED_IMAGES.md` (remove or re-use).
- [ ] CI passes on PR (lint, tsc, build).
- [ ] Add release notes / changelog entry if content changed.
