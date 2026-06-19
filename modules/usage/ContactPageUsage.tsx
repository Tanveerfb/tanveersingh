"use client";

import type { JSX } from "react";
import VerticalDataStrip from "@/modules/Layout/VerticalDataStrip";
import PageShell from "@/modules/Layout/PageShell";
import ContactPanel from "@/modules/Contact/ContactPanel";
import siteData from "@/content/siteData.json";

export default function ContactPageUsage(): JSX.Element {
  const { profile, summary } = siteData;

  const links = [
    {
      label: "GitHub",
      url: profile.github,
    },
    {
      label: "LinkedIn",
      url: profile.linkedin,
    },
  ];

  return (
    <>
      <VerticalDataStrip
        logs={[
          "> opening comms channel...",
          "> encrypting payload...",
          "> ready for transmission...",
        ]}
      />

      <PageShell>
        <ContactPanel
          header="Contact"
          description={summary}
          email={profile.email}
          phone={profile.phone}
          links={links}
        />
      </PageShell>
    </>
  );
}
