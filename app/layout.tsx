import type { Metadata } from "next";
import { Inter, Noto_Sans_Devanagari, Playfair_Display } from "next/font/google";
import "./globals.css";
import { SITE_URL } from "@/lib/site";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair", display: "swap" });
const devanagari = Noto_Sans_Devanagari({ subsets: ["devanagari"], variable: "--font-devanagari", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: "Shree Anand Bharti Samaj | Thane", template: "%s | Shree Anand Bharti Samaj" },
  description: "Official website of Shree Anand Bharti Samaj, a 116-year-old community institution in Chendani Koliwada, Thane East.",
  keywords: ["Shree Anand Bharti Samaj", "Thane", "Chendani Koliwada", "sports in Thane", "cultural events in Thane"],
  verification: { google: "n0UJ_2dTgMKumeFE7E6PeEZEa0puUX41QNA5j8LCP2E" },
  alternates: { canonical: "/", languages: { "en-IN": "/", "mr-IN": "/mr" } },
  openGraph: {
    title: "Shree Anand Bharti Samaj",
    description: "116 years of legacy, service and community in Thane.",
    type: "website",
    locale: "en_IN",
    alternateLocale: ["mr_IN"],
    images: [{ url: "/images/abs-logo.png", width: 1024, height: 1024, alt: "Shree Anand Bharti Samaj official logo" }],
  },
  icons: { icon: "/icon.png", apple: "/icon.png" },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><head><meta name="google-site-verification" content="n0UJ_2dTgMKumeFE7E6PeEZEa0puUX41QNA5j8LCP2E" /></head><body className={`${inter.variable} ${playfair.variable} ${devanagari.variable}`}>{children}</body></html>;
}
