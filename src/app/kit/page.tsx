import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { KitPreview } from "@/features/kit-preview/kit-preview";

export const metadata: Metadata = {
  title: "Kit preview",
  robots: { index: false, follow: false },
};

/** The hidden preview of the component kit. Local development only: production answers 404. */
export default function KitPage() {
  if (process.env.NODE_ENV === "production") notFound();
  return <KitPreview />;
}
