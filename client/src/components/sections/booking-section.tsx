import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { motion } from "framer-motion";
import { Calendar, CheckCircle2, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const bookingFormSchema = z.object({
  name: z.string().min(2, "Имя должно содержать минимум 2 символа"),
  phone: z.string().regex(/^\+375\d{9}$/, "Введите корректный номер телефона (+375XXXXXXXXX)"),
  vehicleType: z.enum(["car", "crossover", "truck"], {
    errorMap: () => ({ message: "Выберите тип автомобиля" })
  }),
  preferredDate: z.string().optional(),
  message: z.string().optional(),
});

type BookingFormValues = z.infer<typeof bookingFormSchema>;

export function BookingSection() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const form = useForm<BookingFormValues>({
    resolver: zodResolver(bookingFormSchema),
    defaultValues: {
      name: "",
      phone: "+375",
      vehicleType: undefined,
      preferredDate: "",
      message: "",
    },
  });

  const onSubmit = async (data: BookingFormValues) => {
    try {
      // Web3Forms access key (public key, safe to use in frontend)
      // To use environment variable in Netlify: Set VITE_WEB3FORMS_ACCESS_KEY in Site Settings > Environment Variables
      const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY || "";
      
      // Prepare vehicle type in Russian
      const vehicleTypeText =
        data.vehicleType === "car"
          ? "Легковой автомобиль"
          : data.vehicleType === "crossover"
            ? "Кроссовер/Минивен"
            : "Грузовой автомобиль";

      // Prepare data for Web3Forms
      const formData = {
        access_key: accessKey,
        name: data.name,
        phone: data.phone,
        "Тип автомобиля": vehicleTypeText,
        "Желаемая дата": data.preferredDate || "Не указана",
        Сообщение: data.message || "Не указано",
        subject: `Новая заявка на чистку DPF от ${data.name}`,
      };

      // Send directly to Web3Forms API
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Failed to submit booking");
      }

      setIsSubmitted(true);
      form.reset({
        name: "",
        phone: "+375",
        vehicleType: undefined,
        preferredDate: "",
        message: "",
      });

      toast({
        title: "Заявка отправлена!",
        description: "Мы свяжемся с вами в течение 5 минут.",
      });
    } catch (error) {
      console.error("Booking submission error:", error);
      toast({
        variant: "destructive",
        title: "Ошибка отправки",
        description: "Произошла ошибка. Позвоните нам: +375 29 836 96 55",
      });
    }
  };

  return (
    <section id="booking" className="py-16 sm:py-20 lg:py-24 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <Badge className="mb-4 bg-chart-2/10 text-chart-2 border-chart-2/20">
            <Calendar className="w-4 h-4 mr-2" />
            Онлайн-запись
          </Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold mb-4">
            Запишитесь на чистку прямо сейчас
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Заполните форму и мы перезвоним в течение 5 минут для подтверждения
          </p>
        </motion.div>

        <div className="max-w-2xl mx-auto">
          {!isSubmitted ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Card className="shadow-xl">
                <CardHeader>
                  <CardTitle className="text-2xl font-heading">Форма записи</CardTitle>
                  <CardDescription>
                    Все поля обязательны для заполнения
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      {/* Name */}
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Ваше имя</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Иван Иванов"
                                {...field}
                                data-testid="input-name"
                                className="h-12 text-base"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* Phone */}
                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Номер телефона</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="+375291234567"
                                {...field}
                                data-testid="input-phone"
                                className="h-12 text-base"
                              />
                            </FormControl>
                            <FormDescription>
                              Формат: +375XXXXXXXXX
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* Vehicle Type */}
                      <FormField
                        control={form.control}
                        name="vehicleType"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Тип автомобиля</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger data-testid="select-vehicle-type" className="h-12 text-base">
                                  <SelectValue placeholder="Выберите тип автомобиля" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="car">Легковой автомобиль (390 BYN)</SelectItem>
                                <SelectItem value="crossover">Кроссовер / Минивен (440 BYN)</SelectItem>
                                <SelectItem value="truck">Грузовой автомобиль (890 BYN)</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* Preferred Date */}
                      <FormField
                        control={form.control}
                        name="preferredDate"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Желаемая дата (необязательно)</FormLabel>
                            <FormControl>
                              <Input
                                type="date"
                                {...field}
                                data-testid="input-date"
                                className="h-12 text-base"
                              />
                            </FormControl>
                            <FormDescription>
                              Мы постараемся учесть ваши пожелания
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* Message */}
                      <FormField
                        control={form.control}
                        name="message"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Дополнительная информация (необязательно)</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Укажите особые пожелания или вопросы..."
                                {...field}
                                data-testid="input-message"
                                rows={4}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* Submit Button */}
                      <Button
                        type="submit"
                        size="lg"
                        className="w-full bg-chart-2 text-white hover:bg-chart-2/90 border-0 text-lg h-14"
                        disabled={form.formState.isSubmitting}
                        data-testid="button-submit-booking"
                      >
                        {form.formState.isSubmitting ? (
                          <>
                            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                            Отправка...
                          </>
                        ) : (
                          <>
                            <Calendar className="w-5 h-5 mr-2" />
                            Записаться сейчас
                          </>
                        )}
                      </Button>

                      <p className="text-sm text-center text-muted-foreground">
                        Нажимая кнопку, вы соглашаетесь с обработкой персональных данных
                      </p>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <Card className="shadow-xl bg-gradient-to-br from-chart-3/20 to-chart-1/10 border-2 border-chart-3">
                <CardContent className="p-12 text-center">
                  <CheckCircle2 className="w-20 h-20 text-chart-3 mx-auto mb-6" />
                  <h3 className="text-3xl font-heading font-bold mb-4">
                    Заявка принята!
                  </h3>
                  <p className="text-lg text-muted-foreground mb-6">
                    Мы свяжемся с вами в течение дня для подтверждения записи.
                  </p>
                  <Button
                    variant="outline"
                    onClick={() => setIsSubmitted(false)}
                    data-testid="button-new-booking"
                  >
                    Отправить еще одну заявку
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
