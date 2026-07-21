export interface Partner {
  id: string;
  name: string;
  logoSrc: string;
  role: "supplier" | "buyer";
}

export const partners: Partner[] = [
  {
    id: "petronas",
    name: "Petronas",
    logoSrc: "/images/partners/petronas-facility.jpg",
    role: "supplier",
  },
  {
    id: "pcm",
    name: "PCM",
    logoSrc: "/images/partners/pcm-logo.png",
    role: "buyer",
  },
  {
    id: "wtc",
    name: "Wira Tama Cemerlang",
    logoSrc: "/images/partners/wtc-logo.png",
    role: "buyer",
  },
  {
    id: "puma",
    name: "PT Puma Pantura Persada",
    logoSrc: "/images/partners/puma-logo.png",
    role: "buyer",
  },
];
