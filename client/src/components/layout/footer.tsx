import { MapPin, Phone, Clock } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-card border-t border-border py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <h3 className="text-2xl font-heading font-extrabold mb-4 text-gradient-primary">
              Refilter
            </h3>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              Профессиональная чистка DPF/FAP фильтров в Гродно. 
              Гарантия качества и честные цены.
            </p>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span className="w-2 h-2 rounded-full bg-chart-3" />
              Работаем с 2018 года
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading font-bold text-lg mb-4">Услуги</h4>
            <ul className="space-y-2">
              {[
                { name: "Калькулятор цен", id: "calculator" },
                { name: "Прайс-лист", id: "pricing" },
                { name: "Процесс чистки", id: "process" },
                { name: "Онлайн-запись", id: "booking" },
                { name: "Частые вопросы", id: "faq" },
              ].map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => scrollToSection(item.id)}
                    className="text-muted-foreground hover:text-chart-1 transition-colors"
                    data-testid={`footer-link-${item.id}`}
                  >
                    {item.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-heading font-bold text-lg mb-4">Контакты</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-chart-1 flex-shrink-0 mt-0.5" />
                <span className="text-muted-foreground text-sm">
                  г. Гродно, ул. Низинная, д. 5
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-chart-2 flex-shrink-0 mt-0.5" />
                <a
                  href="tel:+375298369655"
                  className="text-muted-foreground hover:text-chart-2 transition-colors text-sm"
                  data-testid="footer-phone"
                >
                  +375 29 836 96 55
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-chart-1 flex-shrink-0 mt-0.5" />
                <div className="text-muted-foreground text-sm">
                  <div>Пн–Пт: 9:00–19:00</div>
                  <div>Сб: 9:00–14:00</div>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              © {currentYear} Refilter. Все права защищены.
            </p>
            <div className="flex gap-6 text-sm text-muted-foreground">
              <button className="hover:text-foreground transition-colors">
                Политика конфиденциальности
              </button>
            </div>
          </div>
        </div>

        {/* Additional CTA */}
        <div className="mt-8 text-center p-6 bg-gradient-to-r from-chart-1/10 to-chart-2/10 rounded-lg border border-chart-1/20">
          <p className="text-lg font-heading font-semibold mb-2">
            Остались вопросы? Позвоните нам!
          </p>
          <a
            href="tel:+375298369655"
            className="text-2xl font-heading font-bold text-chart-2 hover:text-chart-2/80 transition-colors"
            data-testid="footer-cta-phone"
          >
            +375 29 836 96 55
          </a>
        </div>
      </div>
    </footer>
  );
}
