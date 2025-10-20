import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertBookingSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // POST /api/bookings - Create new booking
  app.post("/api/bookings", async (req, res) => {
    try {
      // Validate request body
      const validatedData = insertBookingSchema.parse(req.body);
      
      // Create booking in storage
      const booking = await storage.createBooking(validatedData);
      
      // Log booking for monitoring (in production, send email/telegram notification)
      console.log("New booking received:", {
        id: booking.id,
        name: booking.name,
        phone: booking.phone,
        vehicleType: booking.vehicleType,
        preferredDate: booking.preferredDate,
      });

      res.status(201).json(booking);
    } catch (error) {
      console.error("Booking error:", error);
      if (error instanceof Error && error.name === "ZodError") {
        res.status(400).json({ error: "Invalid booking data", details: error });
      } else {
        res.status(500).json({ error: "Failed to create booking" });
      }
    }
  });

  // GET /api/bookings - Get all bookings (for admin purposes)
  app.get("/api/bookings", async (req, res) => {
    try {
      const bookings = await storage.getAllBookings();
      res.json(bookings);
    } catch (error) {
      console.error("Failed to fetch bookings:", error);
      res.status(500).json({ error: "Failed to fetch bookings" });
    }
  });

  // GET /api/bookings/:id - Get specific booking
  app.get("/api/bookings/:id", async (req, res) => {
    try {
      const booking = await storage.getBooking(req.params.id);
      if (!booking) {
        res.status(404).json({ error: "Booking not found" });
        return;
      }
      res.json(booking);
    } catch (error) {
      console.error("Failed to fetch booking:", error);
      res.status(500).json({ error: "Failed to fetch booking" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
