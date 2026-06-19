"use client";

import type { JSX } from "react";
import VerticalDataStrip from "@/modules/Layout/VerticalDataStrip";
import PageShell from "@/modules/Layout/PageShell";
import ExperienceTimeline from "@/modules/Experience/ExperienceTimeline";
import siteData from "@/content/siteData.json";

export default function ExperiencePageUsage(): JSX.Element {
  return (
    <>
      <VerticalDataStrip
        logs={[
          "> scanning work history...",
          "> compiling milestones...",
          "> experience logs synchronized...",
        ]}
      />

      <PageShell>
        <ExperienceTimeline header="Experience" entries={siteData.experience} />
      </PageShell>
    </>
  );
}
