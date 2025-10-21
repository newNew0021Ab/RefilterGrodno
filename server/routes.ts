import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertBookingSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Verify Web3Forms access key on startup
  const web3FormsKey = process.env.WEB3FORMS_ACCESS_KEY;
  if (web3FormsKey) {
    console.log("✓ Web3Forms access key is configured");
  } else {
    console.warn("✗ WEB3FORMS_ACCESS_KEY environment variable is NOT set!");
  }

  // POST /api/bookings - Create new booking and send to Web3Forms
  app.post("/api/bookings", async (req, res) => {
    try {
      // Validate request body
      const validatedData = insertBookingSchema.parse(req.body);

      // Check if Web3Forms access key is configured
      const accessKey = process.env.WEB3FORMS_ACCESS_KEY;
      
      if (!accessKey) {
        console.error("WEB3FORMS_ACCESS_KEY is not set in environment variables");
        throw new Error("Web3Forms is not configured. Please contact support.");
      }

      // Prepare data for Web3Forms
      const vehicleTypeText =
        validatedData.vehicleType === "car"
          ? "Легковой автомобиль"
          : validatedData.vehicleType === "crossover"
            ? "Кроссовер/Минивен"
            : "Грузовой автомобиль";

      const formData = {
        access_key: accessKey,
        name: validatedData.name,
        phone: validatedData.phone,
        "Тип автомобиля": vehicleTypeText,
        "Желаемая дата": validatedData.preferredDate || "Не указана",
        Сообщение: validatedData.message || "Не указано",
        subject: `Новая заявка на чистку DPF от ${validatedData.name}`,
      };

      // Send to Web3Forms
      const web3FormsResponse = await fetch(
        "https://api.web3forms.com/submit",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        },
      );

      const web3FormsResult = await web3FormsResponse.json();

      if (!web3FormsResponse.ok || !web3FormsResult.success) {
        const errorMessage = web3FormsResult.message || "Failed to send to Web3Forms";
        console.error("Web3Forms error:", errorMessage);
        
        // Still save locally even if Web3Forms fails
        const booking = await storage.createBooking(validatedData);
        console.log("Booking saved locally despite Web3Forms error:", {
          id: booking.id,
          name: booking.name,
          phone: booking.phone,
          error: errorMessage,
        });
        
        // Return success since we saved locally
        res.status(201).json({
          success: true,
          message: "Booking received and saved",
          id: booking.id,
          warning: "Email notification may be delayed",
        });
        return;
      }

      // Also save locally for backup
      const booking = await storage.createBooking(validatedData);

      console.log("Booking sent to Web3Forms and saved locally:", {
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
