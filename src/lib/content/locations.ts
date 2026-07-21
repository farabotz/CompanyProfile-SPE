/**
 * Language-neutral facts about SPE's two locations, sourced from
 * "Company Profile SPE 2026.pdf" pages 1 and 4.
 *
 * Map embeds use an address query (no lat/lng) rather than a pinned
 * coordinate: the storage facility's GPS coordinates in the source PDF's
 * legal appendix (page 13) were OCR-garbled ("-7.266353391:516667, ...")
 * and not safe to trust for a public map pin without manual verification
 * against the original document.
 */

export type LocationKey = "headOffice" | "storage";

export interface LocationFact {
  key: LocationKey;
  addressLines: string[];
  mapQuery: string;
}

export const locations: Record<LocationKey, LocationFact> = {
  headOffice: {
    key: "headOffice",
    addressLines: [
      "Gedung Soho Pancoran, Suite 1801",
      "Jl. Letjen M.T. Haryono Kav. 2-3",
      "Kel. Tebet Barat, Kec. Tebet",
      "Kota Jakarta Selatan, DKI Jakarta 12810",
    ],
    mapQuery: "Gedung Soho Pancoran, Jl. Letjen M.T. Haryono Kav. 2-3, Jakarta Selatan 12810",
  },
  storage: {
    key: "storage",
    addressLines: [
      "Jl. Terate, Desa Sumberarum",
      "Kec. Dander, Kabupaten Bojonegoro",
      "Jawa Timur",
    ],
    mapQuery: "Jl. Terate, Desa Sumberarum, Kec. Dander, Bojonegoro, Jawa Timur",
  },
};

export function mapEmbedSrc(query: string): string {
  return `https://www.google.com/maps?q=${encodeURIComponent(query)}&output=embed`;
}
