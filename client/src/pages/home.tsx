import { HeroSection } from "@/components/sections/hero-section";
import { PriceCalculator } from "@/components/sections/price-calculator";
import { PricingSection } from "@/components/sections/pricing-section";
import { ProcessSection } from "@/components/sections/process-section";
import { BookingSection } from "@/components/sections/booking-section";
import { FaqSection } from "@/components/sections/faq-section";
import { ContactSection } from "@/components/sections/contact-section";
import { StickyButtons } from "@/components/ui/sticky-buttons";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { useEffect, useState } from "react";

export default function HomePage() {
  const [showStickyButtons, setShowStickyButtons] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowStickyButtons(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <PriceCalculator />
        <PricingSection />
        <ProcessSection />
        <BookingSection />
        <FaqSection />
        <ContactSection />
      </main>
      <Footer />
      {showStickyButtons && <StickyButtons />}
    </div>
  );
}
