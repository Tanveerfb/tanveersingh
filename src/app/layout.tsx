import type { Metadata } from "next";
import { Bangers, Barlow, Noto_Sans_JP, Share_Tech_Mono } from "next/font/google";
import "./globals.css";

const bangers = Bangers({
  variable: "--font-bangers",
  weight: "400",
  subsets: ["latin"],
});

const barlow = Barlow({
  variable: "--font-barlow",
  weight: ["400", "500", "600", "700", "800"],
  subsets: ["latin"],
});

// Only the heavy weight, for sound-effect lettering. Not preloaded: the Japanese
// glyph set is large and the lettering is decorative.
const notoJp = Noto_Sans_JP({
  variable: "--font-noto-jp",
  weight: "900",
  preload: false,
});

const shareTech = Share_Tech_Mono({
  variable: "--font-share-tech",
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Tanveer Singh",
  description: "Websites, platforms and practical AI.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${bangers.variable} ${barlow.variable} ${notoJp.variable} ${shareTech.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
