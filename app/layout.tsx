import type { Metadata } from "next";
import { Orbitron, Rajdhani, Share_Tech_Mono } from "next/font/google";
import HologramNavbar from "@/modules/Navbar/HologramNavbar";
import SiteFooter from "@/modules/Footer/SiteFooter";
import VideoBackground from "@/modules/Background/VideoBackground";
import "../styles/globals.scss";
import ThemeProvider from "@/theme/ThemeProvider";
import { AuthProvider } from "@/context/AuthContext";
import ScrollProgress from "@/modules/ScrollProgress/ScrollProgress";
import ToastProvider from "@/components/ToastProvider";
import { SiteStructuredData } from "@/components/StructuredData";
import {
  SITE_URL,
  SITE_NAME,
  SITE_TITLE,
  SITE_DESCRIPTION,
  PERSON_NAME,
} from "@/lib/siteConfig";

const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const rajdhani = Rajdhani({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-body",
  display: "swap",
});

const shareTechMono = Share_Tech_Mono({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: `%s | ${PERSON_NAME}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  keywords: [
    "Tanveer Singh",
    "Developer",
    "Programmer",
    "Full-Stack Developer",
    "Next.js",
    "Firebase",
    "AI Integration",
    "Microsoft 365",
    "SharePoint developer",
    "Sydney developer",
    "Node.js",
  ],
  authors: [{ name: PERSON_NAME, url: SITE_URL }],
  creator: PERSON_NAME,
  publisher: PERSON_NAME,
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    url: "/",
    type: "website",
    locale: "en_AU",
    siteName: SITE_NAME,
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const fontClasses = [
    orbitron.variable,
    rajdhani.variable,
    shareTechMono.variable,
  ].join(" ");

  return (
    <html lang="en" className={fontClasses}>
      <body>
        <SiteStructuredData />
        <a href="#page-content" className="skip-link">
          Skip to main content
        </a>
        <ThemeProvider>
          <AuthProvider>
            <ScrollProgress />
            <VideoBackground />
            <HologramNavbar />
            <ToastProvider />
            <main id="page-content" className="page-content">
              <div className="container">{children}</div>
            </main>
            <SiteFooter />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
