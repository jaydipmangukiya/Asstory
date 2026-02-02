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
      {/* Structured Data for Organization */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "Asstory",
            url: "https://asstory.vercel.app",
            logo: "https://asstory.vercel.app/assets/logo.png",
            description:
              "Property valuation and real estate intelligence platform in India",
            contactPoint: {
              "@type": "ContactPoint",
              contactType: "Customer Support",
              availableLanguage: ["en", "hi"],
            },
            areaServed: {
              "@type": "Country",
              name: "India",
            },
            knowsAbout: [
              "Property Valuation",
              "Real Estate Analytics",
              "Market Price Estimation",
            ],
          }),
        }}
      />

      {/* Structured Data for Property Valuation Service */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            name: "Property Valuation Service",
            provider: {
              "@type": "Organization",
              name: "Asstory",
              url: "https://asstory.vercel.app",
            },
            description:
              "Online property valuation service providing data-driven market value estimates for residential and commercial properties in India",
            areaServed: {
              "@type": "Country",
              name: "India",
            },
            serviceType: "Real Estate Valuation",
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "INR",
              availability: "https://schema.org/InStock",
              url: "https://asstory.vercel.app/property-valuation",
            },
            aggregateRating: {
              "@type": "AggregateRating",
              ratingValue: "4.8",
              ratingCount: "2500",
              bestRating: "5",
              worstRating: "1",
            },
          }),
        }}
      />

      {/* Breadcrumb Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "Home",
                item: "https://asstory.vercel.app",
              },
              {
                "@type": "ListItem",
                position: 2,
                name: "Services",
                item: "https://asstory.vercel.app/services",
              },
              {
                "@type": "ListItem",
                position: 3,
                name: "Property Valuation",
                item: "https://asstory.vercel.app/property-valuation",
              },
            ],
          }),
        }}
      />

      <h1 className="sr-only">
        Property Valuation - Data-Driven Property Price Estimates in India
      </h1>
      <Header />
      <SearchBar />
      <section aria-label="featured properties">
        <FeaturedProperties />
      </section>
      <section aria-label="valuation service benefits">
        <BenefitsValuationService />
      </section>
      <section aria-label="property valuation types">
        <ValuationTypes />
      </section>
      <section aria-label="how valuation works">
        <HowItWorks />
      </section>
      <Footer />
    </div>
  );
}
