import ContactPanel from "@/modules/Contact/ContactPanel";
import siteData from "@/content/siteData.json";

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
