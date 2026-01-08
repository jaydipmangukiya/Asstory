import { Toaster } from "@/components/ui/toaster";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import { AuthProvider } from "@/components/authentication/AuthProvider";
import RazorpayScriptLoader from "./views/subscription/RazorpayScriptLoader";
import NavigationInitializer from "@/components/navigation/NavigationInitializer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://prop-valuer-v3b2.vercel.app"),
  title: {
    default: "PropValuer – Accurate Property Valuation Platform",
    template: "%s | PropValuer",
  },
  description:
    "Get instant, accurate property valuations powered by advanced market analysis and comprehensive data insights. Know your property's true worth with PropValuer.",
  keywords: [
    "property valuation",
    "property price check",
    "land valuation",
    "house valuation",
    "commercial property valuation",
    "real estate valuation India",
  ],
  alternates: {
    canonical: "https://prop-valuer-v3b2.vercel.app",
  },
  openGraph: {
    title: "PropValuer – Accurate Property Valuation",
    description:
      "Instant property valuation reports powered by real market data and analytics.",
    url: "https://prop-valuer-v3b2.vercel.app",
    siteName: "PropValuer",
    images: [
      {
        url: "/assets/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "PropValuer Property Valuation Platform",
      },
    ],
    type: "website",
  },
  icons: {
    icon: "/assets/images/logo.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* ✅ Load Google Maps JavaScript SDK */}
        <Script
          src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`}
          strategy="afterInteractive"
        />
      </head>
      <body className={inter.className}>
        <AuthProvider>
          <NavigationInitializer />
          <RazorpayScriptLoader />
          {children}
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}
