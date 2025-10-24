import { HeroSection } from "@/components/sections/hero-section";
import { Header } from "@/components/layout/header";
import { useEffect, useState, lazy, Suspense } from "react";

const PriceCalculator = lazy(() => import("@/components/sections/price-calculator").then(m => ({ default: m.PriceCalculator })));
const PricingSection = lazy(() => import("@/components/sections/pricing-section").then(m => ({ default: m.PricingSection })));
const ProcessSection = lazy(() => import("@/components/sections/process-section").then(m => ({ default: m.ProcessSection })));
const BookingSection = lazy(() => import("@/components/sections/booking-section").then(m => ({ default: m.BookingSection })));
const FaqSection = lazy(() => import("@/components/sections/faq-section").then(m => ({ default: m.FaqSection })));
const ContactSection = lazy(() => import("@/components/sections/contact-section").then(m => ({ default: m.ContactSection })));
const Footer = lazy(() => import("@/components/layout/footer").then(m => ({ default: m.Footer })));
const StickyButtons = lazy(() => import("@/components/ui/sticky-buttons").then(m => ({ default: m.StickyButtons })));

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
        <Suspense fallback={<div className="h-24" />}>
          <PriceCalculator />
        </Suspense>
        <Suspense fallback={<div className="h-24" />}>
          <PricingSection />
        </Suspense>
        <Suspense fallback={<div className="h-24" />}>
          <ProcessSection />
        </Suspense>
        <Suspense fallback={<div className="h-24" />}>
          <BookingSection />
        </Suspense>
        <Suspense fallback={<div className="h-24" />}>
          <FaqSection />
        </Suspense>
        <Suspense fallback={<div className="h-24" />}>
          <ContactSection />
        </Suspense>
      </main>
      <Suspense fallback={null}>
        <Footer />
      </Suspense>
      {showStickyButtons && (
        <Suspense fallback={null}>
          <StickyButtons />
        </Suspense>
      )}
    </div>
  );
}
