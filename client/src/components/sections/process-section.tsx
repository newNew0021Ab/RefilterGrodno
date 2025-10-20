import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { Search, Droplets, Wind, CheckCircle, FileText } from "lucide-react";

const processSteps = [
  {
    icon: Search,
    title: "Диагностика",
    description: "Визуальный осмотр и оценка степени загрязнения фильтра. Делаем фото «до» для отчета.",
  },
  {
    icon: Droplets,
    title: "Химическая обработка",
    description: "Специальный раствор растворяет сажу и масляные отложения внутри фильтра.",
  },
  {
    icon: Wind,
    title: "Ультразвуковая чистка",
    description: "Профессиональное оборудование удаляет все загрязнения из каналов фильтра.",
  },
  {
    icon: CheckCircle,
    title: "Проверка результата",
    description: "Контроль чистоты, продувка сжатым воздухом. Фото «после» для вашего отчета.",
  },
  {
    icon: FileText,
    title: "Гарантия",
    description: "Выдаем гарантийный талон на 6 месяцев или 50 000 км пробега.",
  },
];

export function ProcessSection() {
  return (
    <section id="process" className="py-16 sm:py-20 lg:py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <Badge className="mb-4 bg-chart-1/10 text-chart-1 border-chart-1/20">
            Как мы работаем
          </Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold mb-4">
            Процесс профессиональной чистки
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Современное оборудование и проверенная технология для восстановления фильтра
          </p>
        </motion.div>

        {/* Process Timeline */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="space-y-8">
            {processSteps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative"
              >
                <div className="flex items-start gap-6">
                  {/* Step Number & Icon */}
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 rounded-full bg-chart-1 text-white flex items-center justify-center font-heading font-bold text-xl shadow-lg">
                      {index + 1}
                    </div>
                  </div>

                  {/* Content */}
                  <Card className="flex-1 hover-elevate">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <step.icon className="w-8 h-8 text-chart-2 flex-shrink-0 mt-1" />
                        <div className="flex-1">
                          <h3 className="text-xl font-heading font-bold mb-2">{step.title}</h3>
                          <p className="text-muted-foreground">{step.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Connector Line */}
                {index < processSteps.length - 1 && (
                  <div className="absolute left-8 top-16 w-0.5 h-8 bg-border" />
                )}
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
