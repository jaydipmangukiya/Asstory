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
