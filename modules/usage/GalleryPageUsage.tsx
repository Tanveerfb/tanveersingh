"use client";

import type { JSX } from "react";
import VerticalDataStrip from "@/modules/Layout/VerticalDataStrip";
import PageShell from "@/modules/Layout/PageShell";
import GalleryGrid from "@/modules/Gallery/GalleryGrid";
import siteData from "@/content/siteData.json";

export default function GalleryPageUsage(): JSX.Element {
  const posters = siteData.creator.gamePosters;

  return (
    <>
      <VerticalDataStrip
        logs={[
          "> loading gallery assets...",
          "> applying neon filters...",
          "> gallery channel stable...",
        ]}
      />

      <PageShell>
        <GalleryGrid items={posters} />
      </PageShell>
    </>
  );
}
