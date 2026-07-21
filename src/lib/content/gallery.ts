export type GalleryCategory = "storage" | "fleet";

export interface GalleryImage {
  src: string;
  category: GalleryCategory;
  captionId: string;
}

export const galleryImages: GalleryImage[] = [
  { src: "/images/storage-activity/control-room-collage.jpg", category: "storage", captionId: "controlRoom" },
  { src: "/images/storage-activity/iso-tank-loading.jpg", category: "storage", captionId: "isoTankLoading" },
  { src: "/images/storage-activity/iso-tank-inspection.jpg", category: "storage", captionId: "isoTankInspection" },
  { src: "/images/storage-activity/tank-top-inspection.jpg", category: "storage", captionId: "tankTopInspection" },
  { src: "/images/storage-activity/worker-hose-filling.jpg", category: "storage", captionId: "hoseFilling" },
  { src: "/images/storage-activity/storage-yard-trucks.jpg", category: "storage", captionId: "storageYardTrucks" },
  { src: "/images/storage-activity/storage-yard-empty.jpg", category: "storage", captionId: "storageYardEmpty" },
  { src: "/images/storage-activity/storage-yard-wide.jpg", category: "storage", captionId: "storageYardWide" },
  { src: "/images/fleet/fleet-tanker-road.jpg", category: "fleet", captionId: "tankerRoad" },
  { src: "/images/fleet/fleet-yard-collage.jpg", category: "fleet", captionId: "yardCollage" },
  { src: "/images/fleet/fleet-parked-pair.jpg", category: "fleet", captionId: "parkedPair" },
  { src: "/images/fleet/fleet-hino-worker.jpg", category: "fleet", captionId: "hinoWorker" },
  { src: "/images/fleet/fleet-hino-night.jpg", category: "fleet", captionId: "hinoNight" },
  { src: "/images/fleet/fleet-worker-dusk.jpg", category: "fleet", captionId: "workerDusk" },
];
