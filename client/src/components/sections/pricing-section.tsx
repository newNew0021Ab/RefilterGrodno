import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { CheckCircle2, Star, ArrowRight } from "lucide-react";

const services = [
  {
    title: "Диагностика DPF",
    description: "Осмотр снятого фильтра",
    price: 20,
    features: [
      "Визуальный осмотр",
      "Оценка степени загрязнения",
      "Рекомендации по очистке",
    ],
  },
  {
    title: "Чистка DPF - Легковой",
    description: "Снятый фильтр легкового авто",
    price: 390,
    popular: true,
    features: [
      "Профессиональная промывка",
      "Ультразвуковая очистка",
      "Проверка эффективности",
      "Гарантия 6 мес. / 50 000 км",
      "Фото до и после",
    ],
  },
  {
    title: "Чистка DPF - Кроссовер",
    description: "Кроссоверы и минивены",
    price: 440,
    features: [
      "Профессиональная промывка",
      "Ультразвуковая очистка",
      "Проверка эффективности",
      "Гарантия 6 мес. / 50 000 км",
      "Фото до и после",
    ],
  },
  {
    title: "Чистка DPF - Грузовой",
    description: "Грузовые автомобили",
    price: 890,
    features: [
      "Усиленная промывка",
      "Ультразвуковая очистка",
      "Проверка эффективности",
      "Гарантия 6 мес. / 50 000 км",
      "Фото до и после",
    ],
  },
];

const additionalServices = [
  {
    title: "Снятие/установка фильтра",
    price: 60,
    description: "На вашем автомобиле",
  },
  {
    title: "Срочная промывка",
    price: "+30%",
    description: "В течение 1 рабочего дня",
  },
];

export function PricingSection() {
  const scrollToBooking = () => {
    const element = document.getElementById("booking");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="pricing" className="py-16 sm:py-20 lg:py-24 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <Badge className="mb-4 bg-chart-1/10 text-chart-1 border-chart-1/20">
            Прозрачные цены
          </Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold mb-4">
            Наши услуги и цены
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Честные цены без скрытых платежей. Оплата после проверки результата.
          </p>
        </motion.div>

        {/* Main Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className={`h-full flex flex-col relative ${
                service.popular ? "border-chart-2 border-2 shadow-xl" : ""
              }`}>
                {service.popular && (
                  <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-chart-2 text-white">
                    <Star className="w-3 h-3 mr-1" />
                    Популярно
                  </Badge>
                )}
                <CardHeader className="pb-4">
                  <CardTitle className="text-xl font-heading">{service.title}</CardTitle>
                  <CardDescription>{service.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-1">
                  <div className="mb-6">
                    <div className="text-4xl font-heading font-extrabold text-chart-1">
                      {service.price}{" "}
                      <span className="text-base font-normal text-muted-foreground">BYN</span>
                    </div>
                  </div>
                  <ul className="space-y-3">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2 text-sm">
                        <CheckCircle2 className="w-4 h-4 text-chart-3 flex-shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button
                    onClick={scrollToBooking}
                    variant={service.popular ? "default" : "outline"}
                    className={`w-full ${
                      service.popular ? "bg-chart-2 text-white hover:bg-chart-2/90 border-0" : ""
                    }`}
                    data-testid={`pricing-book-${service.title.toLowerCase().replace(/\s+/g, '-')}`}
                  >
                    Записаться
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Additional Services */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto"
        >
          <h3 className="text-2xl font-heading font-bold mb-6 text-center">
            Дополнительные услуги
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {additionalServices.map((service) => (
              <Card key={service.title} className="hover-elevate">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg font-heading flex items-center justify-between">
                    {service.title}
                    <span className="text-2xl font-extrabold text-chart-2">
                      {service.price}
                    </span>
                  </CardTitle>
                  <CardDescription>{service.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </motion.div>

        {/* Discounts Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 bg-gradient-to-r from-chart-2/20 to-chart-1/20 rounded-xl p-8 border-2 border-chart-2/30"
        >
          <h3 className="text-2xl sm:text-3xl font-heading font-bold mb-6 text-chart-1 text-center">
            Специальные предложения и скидки
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <div className="bg-background/60 backdrop-blur-sm rounded-lg p-6 border border-chart-2/20">
              <h4 className="font-heading font-bold text-xl mb-3 text-chart-2">
                Скидка на первую чистку
              </h4>
              <p className="text-foreground/80">
                Первое обращение в наш сервис — со скидкой!{" "}
                <span className="font-bold text-chart-2">Выгодное начало сотрудничества.</span>
              </p>
            </div>
            <div className="bg-background/60 backdrop-blur-sm rounded-lg p-6 border border-chart-2/20">
              <h4 className="font-heading font-bold text-xl mb-3 text-chart-2">
                Для транспортных компаний
              </h4>
              <p className="text-foreground/80">
                Специальные условия и индивидуальные цены для автопарков.{" "}
                <span className="font-bold text-chart-2">Обслуживание нескольких авто — выгоднее!</span>
              </p>
            </div>
          </div>
        </motion.div>

        {/* Guarantee Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-8 bg-gradient-to-r from-chart-3/20 to-chart-1/20 rounded-xl p-8 border-2 border-chart-3/30 text-center"
        >
          <h3 className="text-2xl sm:text-3xl font-heading font-bold mb-3 text-chart-1">
            Гарантия на все услуги
          </h3>
          <p className="text-lg text-foreground/80 max-w-2xl mx-auto">
            Мы уверены в качестве нашей работы и предоставляем гарантию{" "}
            <span className="font-bold text-chart-3">6 месяцев или 50 000 км пробега</span> на все услуги по чистке DPF/FAP фильтров.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
