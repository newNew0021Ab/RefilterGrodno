import { Button } from "@/components/ui/button";
import { Phone, Calendar } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function StickyButtons() {
  const scrollToBooking = () => {
    const element = document.getElementById("booking");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed bottom-6 left-0 right-0 z-50 pointer-events-none">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end">
            {/* Call Button - Bottom Left */}
            <motion.div
              initial={{ opacity: 0, y: 50, x: -50 }}
              animate={{ opacity: 1, y: 0, x: 0 }}
              exit={{ opacity: 0, y: 50, x: -50 }}
              className="pointer-events-auto"
            >
              <a href="tel:+375298369655" data-testid="sticky-button-call">
                <Button
                  size="lg"
                  className="bg-chart-2/95 backdrop-blur-md text-white hover:bg-chart-2 border-0 shadow-2xl rounded-full h-16 px-6"
                >
                  <Phone className="w-5 h-5 mr-2" />
                  <span className="hidden sm:inline">Позвонить</span>
                </Button>
              </a>
            </motion.div>

            {/* Booking Button - Bottom Right */}
            <motion.div
              initial={{ opacity: 0, y: 50, x: 50 }}
              animate={{ opacity: 1, y: 0, x: 0 }}
              exit={{ opacity: 0, y: 50, x: 50 }}
              className="pointer-events-auto"
            >
              <Button
                size="lg"
                onClick={scrollToBooking}
                className="bg-chart-1/95 backdrop-blur-md text-white hover:bg-chart-1 border-0 shadow-2xl rounded-full h-16 px-6"
                data-testid="sticky-button-booking"
              >
                <Calendar className="w-5 h-5 mr-2" />
                <span className="hidden sm:inline">Записаться</span>
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    </AnimatePresence>
  );
}
