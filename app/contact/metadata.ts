import type { Metadata } from "next";

const title = "Contact PropValuer | Talk to Property Valuation Experts";
const description =
  "Contact PropValuer for property valuation support, demos, partnerships, and sales inquiries. Call, email, or book a consultation with our team.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/contact",
  },
  keywords: [
    "contact PropValuer",
    "property valuation support",
    "real estate valuation help",
    "PropValuer customer service",
    "property valuation demo",
    "property valuation consultation",
    "contact property valuer",
  ],
  openGraph: {
    title,
    description,
    url: "https://prop-valuer-v3b2.vercel.app/contact",
    type: "website",
    siteName: "PropValuer",
    images: [
      {
        url: "/assets/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "PropValuer contact page preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["https://prop-valuer-v3b2.vercel.app/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};
