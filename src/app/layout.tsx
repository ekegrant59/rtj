import type { Metadata } from "next";
import localFont from "next/font/local";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";

const playfairDisplay = localFont({
  src: "./fonts/playfair-display-latin.woff2",
  weight: "400 900",
  variable: "--font-serif",
  adjustFontFallback: "Times New Roman",
  display: "swap",
});

const plusJakartaSans = localFont({
  src: "./fonts/plus-jakarta-sans-latin.woff2",
  weight: "200 800",
  variable: "--font-sans",
  display: "swap",
});

const dmSerifDisplay = localFont({
  src: "./fonts/dm-serif-display-latin.ttf",
  weight: "400",
  variable: "--font-dm-serif",
  display: "swap",
  preload: false,
});

const fraunces = localFont({
  src: "./fonts/fraunces-latin.ttf",
  weight: "100 900",
  variable: "--font-fraunces",
  display: "swap",
  preload: false,
});

const newsreader = localFont({
  src: "./fonts/newsreader-latin.ttf",
  weight: "200 800",
  variable: "--font-newsreader",
  display: "swap",
  preload: false,
});

const inter = localFont({
  src: "./fonts/inter-latin.ttf",
  weight: "100 900",
  variable: "--font-inter",
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  title: "RTJ — Marketing, Design & Development",
  description: "Three skills. One team. Work you can't ignore. We plan the campaign, design the brand and build the website.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${playfairDisplay.variable} ${plusJakartaSans.variable} ${dmSerifDisplay.variable} ${fraunces.variable} ${newsreader.variable} ${inter.variable}`}>
      <body>
        <a href="#main-content" className="skip-link">Skip to content</a>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
