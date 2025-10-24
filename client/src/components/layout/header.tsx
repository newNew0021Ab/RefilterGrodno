import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Phone, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflowY = 'hidden';
    } else {
      document.body.style.overflowY = '';
    }
    return () => {
      document.body.style.overflowY = '';
    };
  }, [mobileMenuOpen]);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    setTimeout(() => {
      const element = document.getElementById(id);
      if (element) {
        const offset = 80;
        const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
        const offsetPosition = elementPosition - offset;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        });
      }
    }, 100);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/95 backdrop-blur-md border-b border-border shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex-shrink-0"
          >
            <button
              onClick={() => scrollToSection("hero")}
              className="text-2xl sm:text-3xl font-heading font-extrabold tracking-tight text-gradient-primary hover:opacity-80 transition-opacity"
              data-testid="link-home"
            >
              Refilter
            </button>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {[
              { name: "Главная", id: "hero" },
              { name: "Цены", id: "pricing" },
              { name: "Процесс", id: "process" },
              { name: "Контакты", id: "contacts" },
            ].map((item, index) => (
              <motion.button
                key={item.id}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => scrollToSection(item.id)}
                className="px-4 py-2 text-sm font-medium text-foreground/80 hover:text-foreground hover-elevate rounded-md transition-colors"
                data-testid={`link-${item.id}`}
              >
                {item.name}
              </motion.button>
            ))}
          </nav>

          {/* Contact Button - Desktop */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="hidden lg:flex items-center space-x-3"
          >
            <a href="tel:+375298369655" data-testid="button-call-header" aria-label="Позвонить по телефону +375 29 836 96 55">
              <Button variant="default" size="default" className="bg-chart-2 text-white hover:bg-chart-2/90 border-0">
                <Phone className="w-4 h-4 mr-2" />
                <span className="sr-only">Позвонить: </span>+375 29 836 96 55
              </Button>
            </a>
          </motion.div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center space-x-2">
            <a href="tel:+375298369655" data-testid="button-call-mobile" aria-label="Позвонить по телефону +375 29 836 96 55">
              <Button variant="default" size="icon" className="bg-chart-2 text-white hover:bg-chart-2/90 border-0">
                <Phone className="w-4 h-4" />
                <span className="sr-only">Позвонить</span>
              </Button>
            </a>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              data-testid="button-menu-toggle"
              aria-label={mobileMenuOpen ? "Закрыть меню" : "Открыть меню"}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-card/95 backdrop-blur-md border-t border-border shadow-lg"
            role="navigation"
            aria-label="Мобильное меню"
          >
            <nav className="container mx-auto px-4 py-4 space-y-2">
              {[
                { name: "Главная", id: "hero" },
                { name: "Калькулятор", id: "calculator" },
                { name: "Цены", id: "pricing" },
                { name: "Процесс", id: "process" },
                { name: "Запись", id: "booking" },
                { name: "FAQ", id: "faq" },
                { name: "Контакты", id: "contacts" },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="block w-full text-left px-4 py-3 text-base font-medium text-foreground hover-elevate rounded-md"
                  data-testid={`link-mobile-${item.id}`}
                >
                  {item.name}
                </button>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
