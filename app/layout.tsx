import { Toaster } from "@/components/ui/toaster";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import { UserProvider } from "@/components/authentication/UserProvider";
import RazorpayScriptLoader from "./views/subscription/RazorpayScriptLoader";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PropValuer - Accurate Property Valuation Platform",
  description:
    "Get instant, accurate property valuations powered by advanced market analysis and comprehensive data insights. Know your property's true worth with PropValuer.",
  keywords:
    "property valuation, real estate, property price, market analysis, property worth",
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
        <UserProvider>
          <RazorpayScriptLoader />
          {children}
          <Toaster />
        </UserProvider>
      </body>
    </html>
  );
}
