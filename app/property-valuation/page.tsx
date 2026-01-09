"use client";

import FeaturedProperties from "@/components/FeaturedProperties";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import SearchBar from "@/components/SearchBar";
import BenefitsValuationService from "@/components/BenefitsValuationService";
import ValuationTypes from "@/components/ValuationTypes";
import HowItWorks from "@/components/HowItWorks";

export default function PropertyValuationPage() {
  return (
    <div className="w-full">
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            name: "Property Valuation",
            provider: {
              "@type": "Organization",
              name: "Prop Valuer",
              url: "https://prop-valuer-v3b2.vercel.app",
            },
            areaServed: {
              "@type": "Country",
              name: "India",
            },
            serviceType: "Real Estate Property Valuation",
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "INR",
            },
          }),
        }}
      />
      <Header />
      <SearchBar />
      <FeaturedProperties />
      <BenefitsValuationService />
      <ValuationTypes />
      <HowItWorks />
      <Footer />
    </div>
  );
}
