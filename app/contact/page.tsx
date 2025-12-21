import type { Metadata } from "next";
import ContactFlow from "@/modules/Contact/ContactFlow";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Tanveer Singh for ICT support engagements, SharePoint projects, or collaborations across Microsoft 365 ecosystems.",
  openGraph: {
    title: "Contact Tanveer Singh",
    description:
      "Reach out to Tanveer Singh via email, GitHub, or LinkedIn to discuss IT support, automation, or web development.",
    url: "/contact",
  },
};

export default function ContactPage() {
  return <ContactFlow />;
}
