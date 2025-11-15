import type { Metadata } from "next";
import HologramNavbar from "@/modules/Navbar/HologramNavbar";
import PowerCoreFooter from "@/modules/Footer/PowerCoreFooter";
import "../styles/globals.scss";
import ThemeProvider from "@/theme/ThemeProvider";
import CustomCursor from "@/modules/Cursor/CustomCursor";
import MatrixConsole from "@/modules/Console/MatrixConsole";
import { Meltdown } from "@/modules/Chaos/Meltdown";

const siteTitle = "Tanveer Singh | ICT Support Engineer";
const siteDescription =
  "Portfolio of Tanveer Singh, an ICT Support Engineer in Sydney specializing in Microsoft 365, SharePoint, Next.js, and end-to-end digital solutions.";

export const metadata: Metadata = {
  title: {
    default: siteTitle,
    template: "%s | Tanveer Singh",
  },
  description: siteDescription,
  keywords: [
    "Tanveer Singh",
    "ICT Support Engineer",
    "Microsoft 365",
    "SharePoint developer",
    "Next.js portfolio",
    "Sydney IT support",
    "Power Automate",
    "Node.js",
    "Tech content creator",
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
  return (
    <html lang="en">
      <body>
        <ThemeProvider>
          <CustomCursor />
          <MatrixConsole />
          <Meltdown />
          <HologramNavbar />
          <main id="page-content" className="page-content">
            <div className="container">{children}</div>
          </main>
          <PowerCoreFooter />
        </ThemeProvider>
      </body>
    </html>
  );
}
