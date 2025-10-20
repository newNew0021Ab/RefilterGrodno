import { useEffect, useRef, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { MapPin, Phone, Clock, Navigation, ExternalLink } from "lucide-react";

export function ContactSection() {
  const mapRef = useRef<HTMLDivElement>(null);
  const [mapLoaded, setMapLoaded] = useState(false);

  useEffect(() => {
    // Initialize Yandex Map when component mounts
    if (typeof window !== "undefined" && (window as any).ymaps && mapRef.current) {
      (window as any).ymaps.ready(() => {
        try {
          const map = new (window as any).ymaps.Map(mapRef.current, {
            center: [53.736121, 23.744458], // Coordinates for Гродно, ул. Низинная, 5
            zoom: 16,
            controls: ["zoomControl", "fullscreenControl"],
          });

          const placemark = new (window as any).ymaps.Placemark(
            [53.736121, 23.744458],
            {
              hintContent: "Refilter - Чистка DPF/FAP фильтров",
              balloonContent: "г. Гродно, ул. Низинная, д. 5<br/>Пн–Пт 9:00–19:00, Сб 9:00–14:00",
            },
            {
              preset: "islands#redAutoIcon",
            }
          );

          map.geoObjects.add(placemark);
          setMapLoaded(true);
        } catch (error) {
          console.error("Failed to initialize Yandex Map:", error);
          setMapLoaded(false);
        }
      });
    }
  }, []);

  const contactInfo = [
    {
      icon: MapPin,
      title: "Адрес",
      content: "г. Гродно, ул. Низинная, д. 5",
      link: "https://yandex.by/maps/?text=53.6693,23.8131",
      linkText: "Открыть в картах",
    },
    {
      icon: Phone,
      title: "Телефон",
      content: "+375 29 836 96 55",
      link: "tel:+375298369655",
      linkText: "Позвонить",
    },
    {
      icon: Clock,
      title: "Часы работы",
      content: "Пн–Пт: 9:00–19:00\nСб: 9:00–14:00\nВс: Выходной",
    },
  ];

  return (
    <section id="contacts" className="py-16 sm:py-20 lg:py-24 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <Badge className="mb-4 bg-chart-1/10 text-chart-1 border-chart-1/20">
            <Navigation className="w-4 h-4 mr-2" />
            Как нас найти
          </Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold mb-4">
            Контакты и местоположение
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Приезжайте к нам или свяжитесь удобным способом
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            {contactInfo.map((info, index) => (
              <Card key={index} className="hover-elevate">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-chart-1/10 flex items-center justify-center flex-shrink-0">
                      <info.icon className="w-6 h-6 text-chart-1" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-heading font-bold text-lg mb-2">{info.title}</h3>
                      <p className="text-muted-foreground whitespace-pre-line mb-3">
                        {info.content}
                      </p>
                      {info.link && (
                        <a
                          href={info.link}
                          target={info.link.startsWith("http") ? "_blank" : undefined}
                          rel={info.link.startsWith("http") ? "noopener noreferrer" : undefined}
                          data-testid={`contact-link-${info.title.toLowerCase()}`}
                        >
                          <Button variant="outline" size="sm">
                            {info.linkText}
                          </Button>
                        </a>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

          </motion.div>

          {/* Map */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Card className="overflow-hidden h-full min-h-[500px] relative">
              <div
                ref={mapRef}
                className="w-full h-full"
                data-testid="map-container"
              />
              {/* Fallback if map doesn't load */}
              {!mapLoaded && (
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-chart-1/10 to-chart-2/10 p-8">
                  <div className="text-center max-w-md">
                    <MapPin className="w-16 h-16 text-chart-1 mx-auto mb-4" />
                    <h3 className="text-xl font-heading font-bold mb-3">
                      г. Гродно, ул. Низинная, д. 5
                    </h3>
                    <p className="text-muted-foreground mb-6">
                      Промышленная зона
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                      <a
                        href="https://yandex.by/maps/-/CLbIIGzP"
                        target="_blank"
                        rel="noopener noreferrer"
                        data-testid="link-yandex-maps"
                      >
                        <Button variant="default" className="bg-chart-1 text-white">
                          <ExternalLink className="w-4 h-4 mr-2" />
                          Открыть в Яндекс.Картах
                        </Button>
                      </a>
                      <a
                        href="https://www.google.com/maps?q=53.6693,23.8131"
                        target="_blank"
                        rel="noopener noreferrer"
                        data-testid="link-google-maps"
                      >
                        <Button variant="outline">
                          <ExternalLink className="w-4 h-4 mr-2" />
                          Открыть в Google Maps
                        </Button>
                      </a>
                    </div>
                    <p className="text-xs text-muted-foreground mt-4">
                      Координаты: 53.6693, 23.8131
                    </p>
                  </div>
                </div>
              )}
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
