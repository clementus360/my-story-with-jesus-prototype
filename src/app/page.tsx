import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ShareCtaSection from "@/components/ShareCtaSection";
import WhatMakesUsDifferentSection from "@/components/WhatMakesUsDifferentSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import ImpactSection from "@/components/ImpactSection";
import PerksSection from "@/components/PerksSection";
import CtaSection from "@/components/CtaSection";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white overflow-x-hidden">
      <Header />
      <HeroSection />
      <ShareCtaSection />
      <WhatMakesUsDifferentSection />
      <HowItWorksSection />
      <ImpactSection />
      <PerksSection />
      <CtaSection />
      <Footer />
    </main>
  );
}
