import type { Metadata } from "next";
import { Poppins, Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/toaster";
import { HydrationSuppressor } from "@/components/shared/hydration-suppressor";

const fontPoppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});

const fontInter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const fontJetBrains = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-jetbrains",
});

const fontSpaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-space-grotesk",
});

export const metadata: Metadata = {
  title: {
    default: "DreamFolio | Dreamcoder08 - Cybersecurity Engineer & Creative Technologist",
    template: "%s | DreamFolio"
  },
  description: "Professional portfolio of Dreamcoder08 - Expert Cybersecurity Engineer, FinTech Architect, and Creative Technologist. Specializing in Red Team Operations, Pentesting, SaaS Development, and AI-Powered Financial Solutions.",
  keywords: [
    "cybersecurity engineer",
    "fintech architect", 
    "creative technologist",
    "red team",
    "pentesting",
    "saas development",
    "ai solutions",
    "portfolio",
    "dreamcoder08"
  ],
  authors: [{ name: "Dreamcoder08" }],
  creator: "Dreamcoder08",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://dreamfolio.vercel.app",
    title: "DreamFolio | Cybersecurity Engineer & Creative Technologist",
    description: "Professional portfolio showcasing expertise in cybersecurity, fintech architecture, and creative technology solutions.",
    siteName: "DreamFolio",
    images: [
      {
        url: "https://dreamfolio.vercel.app/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "DreamFolio - Professional Portfolio of Dreamcoder08"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "DreamFolio | Cybersecurity Engineer & Creative Technologist",
    description: "Professional portfolio showcasing expertise in cybersecurity, fintech architecture, and creative technology solutions.",
    creator: "@dreamcoder08",
    images: ["https://dreamfolio.vercel.app/images/og-image.jpg"]
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
    yandex: "your-yandex-verification-code",
  },
  alternates: {
    canonical: "https://dreamfolio.vercel.app",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-body antialiased",
          fontPoppins.variable,
          fontInter.variable,
          fontJetBrains.variable,
          fontSpaceGrotesk.variable
        )}
        suppressHydrationWarning
      >
        <HydrationSuppressor>
          {children}
          <Toaster />
        </HydrationSuppressor>
      </body>
    </html>
  );
}
