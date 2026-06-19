import type { Metadata } from "next";
import { Orbitron, Rajdhani, Share_Tech_Mono } from "next/font/google";
import HologramNavbar from "@/modules/Navbar/HologramNavbar";
import PowerCoreFooter from "@/modules/Footer/PowerCoreFooter";
import VideoBackground from "@/modules/Background/VideoBackground";
import "../styles/globals.scss";
import ThemeProvider from "@/theme/ThemeProvider";
import { AuthProvider } from "@/context/AuthContext";
import ScrollProgress from "@/modules/ScrollProgress/ScrollProgress";
import ToastProvider from "@/components/ToastProvider";

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

const siteTitle = "Tanveer Singh | Developer & Programmer";
const siteDescription =
  "Portfolio of Tanveer Singh, a Developer & Programmer in Sydney — Next.js, Firebase, AI integration, Microsoft 365, and end-to-end web solutions.";

export const metadata: Metadata = {
  title: {
    default: siteTitle,
    template: "%s | Tanveer Singh",
  },
  description: siteDescription,
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
  authors: [{ name: "Tanveer Singh" }],
  creator: "Tanveer Singh",
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    url: "/",
    type: "website",
    locale: "en_AU",
    siteName: "Tanveer Singh Portfolio",
  },
  twitter: {
    card: "summary",
    title: siteTitle,
    description: siteDescription,
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
            <PowerCoreFooter />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
