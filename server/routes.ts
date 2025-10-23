import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertBookingSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Backend routes for development only (Netlify uses client-side submission)

  // POST /api/bookings - Create new booking (backend is not used on Netlify)
  app.post("/api/bookings", async (req, res) => {
    try {
      // Validate request body
      const validatedData = insertBookingSchema.parse(req.body);

      // Save locally for backup (only used in development)
      const booking = await storage.createBooking(validatedData);

      console.log("Booking saved locally:", {
        id: booking.id,
        name: booking.name,
        phone: booking.phone,
      });

      res.status(201).json({
        success: true,
        message: "Booking received",
        id: booking.id,
      });
    } catch (error) {
      console.error("Booking error:", error);
      if (error instanceof Error && error.name === "ZodError") {
        res
          .status(400)
          .json({
            success: false,
            error: "Invalid booking data",
            details: error,
          });
      } else {
        res
          .status(500)
          .json({ success: false, error: "Failed to create booking" });
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
