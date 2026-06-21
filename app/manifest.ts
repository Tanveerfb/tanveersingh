import type { MetadataRoute } from "next";
import { SITE_NAME, PERSON_NAME, SITE_DESCRIPTION } from "@/lib/siteConfig";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE_NAME,
    short_name: PERSON_NAME,
    description: SITE_DESCRIPTION,
    start_url: "/",
    display: "standalone",
    background_color: "#0b0c14",
    theme_color: "#00e5ff",
    icons: [
      {
        src: "/icon",
        sizes: "256x256",
        type: "image/png",
      },
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
