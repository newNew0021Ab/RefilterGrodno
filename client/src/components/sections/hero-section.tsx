import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Phone, Calendar, Shield, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import heroAvif from "@/assets/hero.avif";
import heroWebp from "@/assets/hero.webp";
import heroPng from "@/assets/hero.png";

export function HeroSection() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia('(max-width: 1023px)');
    const onChange = () => {
      setIsMobile(mql.matches);
    };
    mql.addEventListener('change', onChange);
    setIsMobile(mql.matches);
    return () => mql.removeEventListener('change', onChange);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Background with gradient overlay */}
      <div className="absolute inset-0 z-0">
        <picture>
          <source srcSet={heroAvif} type="image/avif" />
          <source srcSet={heroWebp} type="image/webp" />
          <img
            src={heroPng}
            alt="Профессиональная чистка DPF фильтров в современном автосервисе Refilter в Гродно с гарантией качества"
            className="w-full h-full object-cover"
            width={1408}
            height={768}
            loading="eager"
            decoding="async"
          />
        </picture>        {/* Dark gradient wash for text readability */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/70 to-black/60" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl">
          {/* Trust Badge */}
          <motion.div
            initial={isMobile ? { opacity: 1 } : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={isMobile ? {} : { delay: 0.2 }}
            className="mb-6"
          >
            <Badge className="bg-chart-3/20 backdrop-blur-sm text-chart-3 border-chart-3/30 px-4 py-2 text-sm font-semibold">
              <Shield className="w-4 h-4 mr-2" />
              Гарантия 6 месяцев или 50 000 км
            </Badge>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={isMobile ? { opacity: 1 } : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={isMobile ? {} : { delay: 0.3 }}
            className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-heading font-extrabold leading-tight mb-6 text-white"
          >
            Профессиональная чистка{" "}
            <span className="text-chart-2">DPF/FAP</span> фильтров в Гродно
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={isMobile ? { opacity: 1 } : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={isMobile ? {} : { delay: 0.4 }}
            className="text-lg sm:text-xl lg:text-2xl text-white/90 mb-8 max-w-2xl leading-relaxed"
          >
            Восстановим мощность двигателя и снизим расход топлива. 
            Современное оборудование и проверенная технология.
          </motion.p>

          {/* Trust Indicators */}
          <motion.div
            initial={isMobile ? { opacity: 1 } : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={isMobile ? {} : { delay: 0.5 }}
            className="flex flex-wrap gap-6 mb-10"
          >
            {[
              { icon: CheckCircle2, text: "120+ авто в месяц" },
              { icon: CheckCircle2, text: "Работаем с 2018 года" },
              { icon: CheckCircle2, text: "Оригинальная технология" },
            ].map((item, index) => (
              <div key={index} className="flex items-center text-white/90">
                <item.icon className="w-5 h-5 mr-2 text-chart-3" />
                <span className="text-sm sm:text-base font-medium">{item.text}</span>
              </div>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={isMobile ? { opacity: 1 } : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={isMobile ? {} : { delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Button
              size="lg"
              onClick={() => scrollToSection("booking")}
              className="bg-chart-2 text-black hover:bg-chart-2/90 border-0 text-base sm:text-lg px-8 py-6 shadow-xl font-semibold"
              data-testid="button-hero-booking"
              aria-label="Перейти к форме онлайн-записи на чистку DPF фильтра"
            >
              <Calendar className="w-5 h-5 mr-2" aria-hidden="true" />
              Записаться онлайн
            </Button>
            <a href="tel:+375298369655" data-testid="button-hero-call" aria-label="Позвонить по телефону +375 29 836 96 55">
              <Button
                size="lg"
                variant="outline"
                className="bg-white/10 backdrop-blur-md text-white border-white/30 hover:bg-white/20 text-base sm:text-lg px-8 py-6"
              >
                <Phone className="w-5 h-5 mr-2" aria-hidden="true" />
                Позвонить сейчас
              </Button>
            </a>
          </motion.div>

          {/* Additional Info */}
          <motion.p
            initial={isMobile ? { opacity: 1 } : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={isMobile ? {} : { delay: 0.7 }}
            className="mt-8 text-sm text-white/70"
          >
            Пн–Пт 9:00–19:00, Сб 9:00–14:00 | г. Гродно, ул. Низинная, д. 5
          </motion.p>
        </div>
      </div>

      {/* Scroll Indicator - Hidden on mobile */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, repeat: Infinity, duration: 1.5, repeatType: "reverse" }}
        className="hidden lg:block absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
      >
        <div className="w-6 h-10 rounded-full border-2 border-white/30 flex items-start justify-center p-2">
          <div className="w-1 h-2 bg-white/60 rounded-full" />
        </div>
      </motion.div>
    </section>
  );
}
