import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { Calculator, Car, Truck, Zap, Wrench, ArrowRight } from "lucide-react";

type VehicleType = "car" | "crossover" | "truck" | null;

const prices = {
  car: 390,
  crossover: 440,
  truck: 890,
};

export function PriceCalculator() {
  const [vehicleType, setVehicleType] = useState<VehicleType>(null);
  const [isUrgent, setIsUrgent] = useState(false);
  const [includeRemoval, setIncludeRemoval] = useState(false);

  const calculateTotal = () => {
    if (!vehicleType) return 0;
    let total = prices[vehicleType];
    if (isUrgent) total *= 1.3; // +30%
    if (includeRemoval) total += 60;
    return Math.round(total);
  };

  const scrollToBooking = () => {
    const element = document.getElementById("booking");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="calculator" className="py-16 sm:py-20 lg:py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <Badge className="mb-4 bg-chart-2/10 text-chart-2 border-chart-2/20">
            <Calculator className="w-4 h-4 mr-2" />
            Калькулятор стоимости
          </Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold mb-4">
            Рассчитайте стоимость прямо сейчас
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Выберите параметры и получите точную цену за несколько секунд
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <Card className="shadow-lg border-2">
            <CardHeader className="text-center pb-6">
              <CardTitle className="text-2xl font-heading">Шаг 1: Выберите тип автомобиля</CardTitle>
              <CardDescription>Кликните на подходящий вариант</CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              {/* Vehicle Type Selection */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  { type: "car" as VehicleType, icon: Car, label: "Легковой", price: 390 },
                  { type: "crossover" as VehicleType, icon: Car, label: "Кроссовер", price: 440, popular: true },
                  { type: "truck" as VehicleType, icon: Truck, label: "Грузовой", price: 890 },
                ].map((vehicle) => (
                  <motion.button
                    key={vehicle.type}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setVehicleType(vehicle.type)}
                    className={`relative p-6 rounded-lg border-2 transition-all ${
                      vehicleType === vehicle.type
                        ? "border-chart-1 bg-chart-1/5"
                        : "border-border hover-elevate"
                    }`}
                    data-testid={`calc-vehicle-${vehicle.type}`}
                  >
                    {vehicle.popular && (
                      <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-chart-2 text-white">
                        Популярно
                      </Badge>
                    )}
                    <vehicle.icon className={`w-12 h-12 mx-auto mb-3 ${
                      vehicleType === vehicle.type ? "text-chart-1" : "text-muted-foreground"
                    }`} />
                    <div className="text-lg font-semibold mb-1">{vehicle.label}</div>
                    <div className="text-2xl font-bold text-chart-1">{vehicle.price} BYN</div>
                  </motion.button>
                ))}
              </div>

              {/* Options */}
              {vehicleType && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="space-y-4"
                >
                  <h3 className="text-xl font-heading font-semibold">Шаг 2: Дополнительные опции</h3>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Urgent Service */}
                    <button
                      onClick={() => setIsUrgent(!isUrgent)}
                      className={`p-4 rounded-lg border-2 text-left transition-all ${
                        isUrgent ? "border-chart-2 bg-chart-2/5" : "border-border hover-elevate"
                      }`}
                      data-testid="calc-option-urgent"
                    >
                      <div className="flex items-start gap-3">
                        <Zap className={`w-6 h-6 mt-1 flex-shrink-0 ${isUrgent ? "text-chart-2" : "text-muted-foreground"}`} />
                        <div className="flex-1">
                          <div className="font-semibold mb-1">Срочная промывка</div>
                          <div className="text-sm text-muted-foreground">В течение 1 дня (+30%)</div>
                        </div>
                        <div className={`font-bold ${isUrgent ? "text-chart-2" : "text-foreground"}`}>
                          +30%
                        </div>
                      </div>
                    </button>

                    {/* Removal Service */}
                    <button
                      onClick={() => setIncludeRemoval(!includeRemoval)}
                      className={`p-4 rounded-lg border-2 text-left transition-all ${
                        includeRemoval ? "border-chart-1 bg-chart-1/5" : "border-border hover-elevate"
                      }`}
                      data-testid="calc-option-removal"
                    >
                      <div className="flex items-start gap-3">
                        <Wrench className={`w-6 h-6 mt-1 flex-shrink-0 ${includeRemoval ? "text-chart-1" : "text-muted-foreground"}`} />
                        <div className="flex-1">
                          <div className="font-semibold mb-1">Снятие/установка</div>
                          <div className="text-sm text-muted-foreground">Фильтра на автомобиле</div>
                        </div>
                        <div className={`font-bold ${includeRemoval ? "text-chart-1" : "text-foreground"}`}>
                          +60 BYN
                        </div>
                      </div>
                    </button>
                  </div>
                </motion.div>
              )}

              {/* Total Price */}
              {vehicleType && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-gradient-to-r from-chart-1/10 to-chart-2/10 rounded-lg p-6 border-2 border-chart-1/20"
                >
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div>
                      <div className="text-sm text-muted-foreground mb-1">Итоговая стоимость</div>
                      <div className="text-4xl sm:text-5xl font-heading font-extrabold text-chart-1" data-testid="calc-total">
                        {calculateTotal()} BYN
                      </div>
                      <div className="text-sm text-muted-foreground mt-1">
                        {isUrgent && "Срочная чистка · "}
                        {includeRemoval && "Со снятием/установкой"}
                      </div>
                    </div>
                    <Button
                      size="lg"
                      onClick={scrollToBooking}
                      className="bg-chart-2 text-white hover:bg-chart-2/90 border-0 whitespace-nowrap"
                      data-testid="calc-button-book"
                    >
                      Записаться по этой цене
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                  </div>
                </motion.div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
