import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CtaSection from "@/components/CtaSection";
import AboutHero from "@/components/about/AboutHero";
import OneVisionSection from "@/components/about/OneVisionSection";
import SimplePictureSection from "@/components/about/SimplePictureSection";
import VideoSection from "@/components/about/VideoSection";

export const metadata = {
  title: "About — My Story With Jesus",
  description: "Not everyone is called to preach from a stage—but everyone has a story.",
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white overflow-x-hidden">
      <Header />
      <AboutHero />
      <OneVisionSection />
      <SimplePictureSection />
      <VideoSection />
      <CtaSection />
      <Footer />
    </main>
  );
}
