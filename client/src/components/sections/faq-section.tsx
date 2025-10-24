import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { motion } from "framer-motion";
import { HelpCircle } from "lucide-react";

const faqs = [
  {
    question: "Сколько времени занимает чистка DPF фильтра?",
    answer: "Стандартная чистка занимает от 3 до 5 часов в зависимости от степени загрязнения. Если вам нужна срочная промывка, мы можем выполнить работу в течение 1 рабочего дня (+ 30% к стоимости).",
  },
  {
    question: "Какая гарантия на услуги чистки?",
    answer: "Мы предоставляем официальную гарантию 6 месяцев или 50 000 км пробега на все услуги по чистке DPF/FAP фильтров. Гарантия распространяется на качество выполненной работы.",
  },
  {
    question: "Нужно ли мне снимать фильтр самостоятельно?",
    answer: "Нет, не обязательно. Вы можете привезти снятый фильтр (базовая стоимость чистки) или воспользоваться услугой снятия/установки фильтра на вашем автомобиле за дополнительные 60 BYN.",
  },
  {
    question: "Чем ваша чистка отличается от прожига?",
    answer: "Мы используем профессиональную ультразвуковую чистку с химической обработкой, которая полностью удаляет сажу и масляные отложения из всех каналов фильтра. Простой прожиг не всегда эффективен и может повредить керамические элементы фильтра.",
  },
  {
    question: "Как понять, что фильтр нуждается в чистке?",
    answer: "Основные признаки: потеря мощности двигателя, повышенный расход топлива, загорание индикатора неисправности двигателя, автомобиль переходит в аварийный режим. Если заметили эти симптомы — рекомендуем диагностику.",
  },
  {
    question: "Можно ли оплатить после проверки результата?",
    answer: "Да, мы работаем на доверии. Вы оплачиваете услуги только после того, как убедитесь в результате чистки. Мы предоставляем фото до и после для вашего спокойствия.",
  },
  {
    question: "Работаете ли вы с грузовыми автомобилями?",
    answer: "Да, мы обслуживаем легковые автомобили, кроссоверы, минивены и грузовые автомобили. Для грузовых используем специализированное оборудование. Стоимость чистки грузового DPF — 890 BYN.",
  },
  {
    question: "Как записаться на чистку фильтра?",
    answer: "Вы можете записаться онлайн через форму на сайте или позвонить нам по телефону +375 29 836 96 55. Мы работаем Пн–Пт 9:00–19:00, Сб 9:00–14:00. Адрес: г. Гродно, ул. Низинная, д. 5.",
  },
];

export function FaqSection() {
  return (
    <section id="faq" className="py-16 sm:py-20 lg:py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <Badge className="mb-4 bg-chart-1/10 text-chart-1 border-chart-1/20">
            <HelpCircle className="w-4 h-4 mr-2" />
            Часто задаваемые вопросы
          </Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold mb-4">
            Ответы на популярные вопросы
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Не нашли ответ? Позвоните нам — мы с радостью проконсультируем!
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto"
        >
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="border rounded-lg px-6 bg-card hover-elevate"
                data-testid={`faq-item-${index}`}
              >
                <AccordionTrigger className="text-left font-heading font-semibold hover:no-underline py-5">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-5 leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>

        {/* Additional Support */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <p className="text-lg text-muted-foreground mb-4">
            Остались вопросы? Мы всегда на связи!
          </p>
          <a
            href="tel:+375298369655"
            className="text-xl font-heading font-bold text-chart-2 hover:text-chart-2/80 transition-colors"
            data-testid="link-faq-phone"
            aria-label="Позвонить нам по телефону +375 29 836 96 55 для консультации"
          >
            +375 29 836 96 55
          </a>
        </motion.div>
      </div>
    </section>
  );
}
