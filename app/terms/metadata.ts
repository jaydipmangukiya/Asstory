import type { Metadata } from "next";

const title =
  "Terms & Conditions | Valuation & Auction Property Services | Asstory";
const description =
  "Read Asstory’s Terms & Conditions governing the use of our property valuation and auction property discovery services, including user responsibilities, limitations, and legal terms.";

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "terms and conditions",
    "terms of service",
    "auction property terms",
    "property valuation terms",
    "service terms",
    "user agreement",
    "legal terms",
    "conditions of use",
    "property services terms",
    "valuation service terms",
    "terms Asstory",
    "service agreement",
    "user terms",
  ],
  openGraph: {
    type: "website",
    url: "https://asstory.com/terms",
    title,
    description,
    siteName: "Asstory",
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
    canonical: "https://asstory.com/terms",
  },
};
