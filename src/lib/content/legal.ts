/**
 * Legal/credential facts for the "Legalitas" section, sourced from
 * "Company Profile SPE 2026.pdf" pages 12-16.
 *
 * Policy (user-confirmed): never embed the scanned certificate images on the
 * public site — they show NPWP numbers and signatures. Only these plain
 * facts (numbers, dates, issuing authority) are shown, as badges/text.
 *
 * NOTE — verify before publishing: the leadership names below were OCR'd
 * from a scanned government decree (page 15). "Dedy Setiawan" (Direktur
 * Utama) appeared there as "CEDI SETIAWAN", almost certainly an OCR error —
 * double-check spelling of all four names against the original document.
 */

export interface LegalCredential {
  id: string;
  number: string;
  date: string;
  issuer: string;
  validUntil?: string;
}

export const legalCredentials: LegalCredential[] = [
  {
    id: "aktaNotaris",
    number: "Akta No. 1",
    date: "2023-02-13",
    issuer: "Notaris & PPAT Anastasia Riyanti Nimpunoadi, S.H.",
  },
  {
    id: "menkumham",
    number: "AHU-0012773.AH.01.01 Tahun 2023",
    date: "2023-02-16",
    issuer: "Kementerian Hukum dan HAM RI",
  },
  {
    id: "nib",
    number: "0203230068835",
    date: "2023-03-02",
    issuer: "Kementerian Investasi/BKPM (OSS RBA)",
  },
  {
    id: "izinNiagaMigas",
    number: "100/A.9/MIGAS/2025",
    date: "2025-09-08",
    issuer: "Kementerian Investasi dan Hilirisasi / BKPM",
    validUntil: "2027-09-10",
  },
];

export const kbliCodes = ["47301", "47302", "47772"];

export interface LeadershipMember {
  name: string;
  roleId: "direkturUtama" | "direktur" | "komisarisUtama" | "komisaris";
}

export const leadership: LeadershipMember[] = [
  { name: "Dedy Setiawan", roleId: "direkturUtama" },
  { name: "Fredy Handoko Trisnawan", roleId: "direktur" },
  { name: "Dewantoro Wibisono H.", roleId: "komisarisUtama" },
  { name: "Ir. Fitra", roleId: "komisaris" },
];

export const storageFacilities = [
  { id: "T-001", capacityKl: 25 },
  { id: "T-002", capacityKl: 25 },
  { id: "T-003", capacityKl: 25 },
];
