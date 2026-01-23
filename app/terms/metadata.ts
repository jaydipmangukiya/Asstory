import type { Metadata } from "next";

const title = "Terms & Conditions | Property Valuation Services | PropValuer";
const description =
  "Read our comprehensive Terms & Conditions for property valuation services. Understand usage agreements, liability, and user responsibilities at PropValuer.";

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "terms and conditions",
    "terms of service",
    "property valuation terms",
    "service terms",
    "user agreement",
    "legal terms",
    "conditions of use",
    "property services terms",
    "valuation service terms",
    "website terms",
    "privacy terms",
    "terms PropValuer",
    "service agreement",
    "user terms",
  ],
  openGraph: {
    type: "website",
    url: "https://propvaluer.com/terms",
    title,
    description,
    siteName: "PropValuer",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
  robots: {
    index: true,
    follow: true,
    "max-image-preview": "large",
    "max-snippet": -1,
    "max-video-preview": -1,
  },
  alternates: {
    canonical: "https://propvaluer.com/terms",
  },
};
