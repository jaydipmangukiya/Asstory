import type { Metadata } from "next";

const title = "Support Center | PropValuer - Get Help with Property Valuation";
const description =
  "Get expert support for property valuation services. Contact PropValuer team for technical help, billing queries, account issues, and general assistance.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "https://prop-valuer-v3b2.vercel.app/support",
  },
  keywords: [
    "PropValuer support",
    "property valuation help",
    "customer support",
    "technical support",
    "valuation service help",
    "PropValuer contact",
    "property valuation queries",
    "billing support",
    "account help",
  ],
  openGraph: {
    title,
    description,
    url: "https://prop-valuer-v3b2.vercel.app/support",
    type: "website",
    siteName: "PropValuer",
    images: [
      {
        url: "https://prop-valuer-v3b2.vercel.app/assets/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "PropValuer support center preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["https://prop-valuer-v3b2.vercel.app/assets/images/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};
