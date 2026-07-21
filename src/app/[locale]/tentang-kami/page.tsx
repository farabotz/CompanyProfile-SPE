import type { Metadata } from "next";
import { isLocale, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { notFound } from "next/navigation";
import { legalCredentials, kbliCodes, storageFacilities, leadership } from "@/lib/content/legal";
import { locations } from "@/lib/content/locations";
import { NarrativeSection } from "@/components/about/NarrativeSection";
import { VisionMissionAbout } from "@/components/about/VisionMissionAbout";
import { MilestonesSection } from "@/components/about/MilestonesSection";
import { LegalitasSection } from "@/components/about/LegalitasSection";
import { LeadershipSection } from "@/components/about/LeadershipSection";
import { LocationsSection } from "@/components/about/LocationsSection";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = await getDictionary(locale);
  return { title: dict.about.meta.title, description: dict.about.meta.description };
}

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = await getDictionary(locale as Locale);
  const a = dict.about;

  return (
    <>
      <NarrativeSection heading={a.narrative.heading} body={a.narrative.body} />
      <VisionMissionAbout
        heading={a.visionMission.heading}
        visionTitle={a.visionMission.visionTitle}
        visionText={a.visionMission.visionText}
        missionTitle={a.visionMission.missionTitle}
        missionText={a.visionMission.missionText}
      />
      <MilestonesSection heading={a.milestones.heading} items={a.milestones.items} />
      <LegalitasSection
        dict={a.legalitas}
        credentials={legalCredentials}
        kbliCodes={kbliCodes}
        storageFacilities={storageFacilities}
      />
      <LeadershipSection
        heading={a.leadership.heading}
        roleLabels={a.leadership.roleLabels}
        members={leadership}
      />
      <LocationsSection
        heading={a.locations.heading}
        headOfficeLabel={a.locations.headOfficeLabel}
        storageLabel={a.locations.storageLabel}
        headOffice={locations.headOffice}
        storage={locations.storage}
      />
    </>
  );
}
