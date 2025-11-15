import type { Metadata } from "next";
import ContactPanel from "@/modules/Contact/ContactPanel";
import siteData from "@/content/siteData.json";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Tanveer Singh for ICT support engagements, SharePoint projects, or collaborations across Microsoft 365 ecosystems.",
  openGraph: {
    title: "Contact Tanveer Singh",
    description:
      "Reach out to Tanveer Singh via email, phone, GitHub, or LinkedIn to discuss IT support, automation, or web development.",
    url: "/contact",
  },
};

export default function ContactPage() {
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
    <ContactPanel
      header="Contact"
      description={summary}
      email={profile.email}
      phone={profile.phone}
      links={links}
    />
  );
}
