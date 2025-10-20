import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Booking/Lead schema for DPF cleaning service
export const bookings = pgTable("bookings", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  phone: text("phone").notNull(),
  vehicleType: text("vehicle_type").notNull(), // 'car', 'crossover', 'truck'
  preferredDate: text("preferred_date").default(null),
  isUrgent: text("is_urgent").default("false"), // 'true' or 'false'
  includeRemoval: text("include_removal").default("false"), // 'true' or 'false'
  message: text("message").default(null),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertBookingSchema = createInsertSchema(bookings, {
  name: z.string().min(2, "Имя должно содержать минимум 2 символа"),
  phone: z.string().regex(/^\+375\d{9}$/, "Введите корректный номер телефона (+375XXXXXXXXX)"),
  vehicleType: z.enum(["car", "crossover", "truck"], {
    errorMap: () => ({ message: "Выберите тип автомобиля" })
  }),
  preferredDate: z.string().optional(),
  isUrgent: z.string().optional(),
  includeRemoval: z.string().optional(),
  message: z.string().optional(),
}).omit({
  id: true,
  createdAt: true,
});

export type InsertBooking = z.infer<typeof insertBookingSchema>;
export type Booking = typeof bookings.$inferSelect;
