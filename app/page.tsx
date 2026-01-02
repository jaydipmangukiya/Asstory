"use client";

import { MarketInsights } from "@/components/MarketInsights";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Footer } from "@/components/Footer";
import FaqAccordion from "@/components/common/FaqAccordion";
import FeatureCards from "@/components/FeatureCards";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Header />
      <Hero />
      <FeatureCards />
      <MarketInsights />
      <FaqAccordion
        title="Frequently Asked Questions"
        subtitle="Quick answers to common questions about our services"
      />
      <Footer />
    </div>
  );
}
