import { type Booking, type InsertBooking } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // Booking methods
  createBooking(booking: InsertBooking): Promise<Booking>;
  getBooking(id: string): Promise<Booking | undefined>;
  getAllBookings(): Promise<Booking[]>;
}

export class MemStorage implements IStorage {
  private bookings: Map<string, Booking>;

  constructor() {
    this.bookings = new Map();
  }

  async createBooking(insertBooking: InsertBooking): Promise<Booking> {
    const id = randomUUID();
    const createdAt = new Date();
    const booking: Booking = { 
      id,
      name: insertBooking.name,
      phone: insertBooking.phone,
      vehicleType: insertBooking.vehicleType,
      preferredDate: insertBooking.preferredDate || null,
      isUrgent: insertBooking.isUrgent || "false",
      includeRemoval: insertBooking.includeRemoval || "false",
      message: insertBooking.message || null,
      createdAt,
    };
    this.bookings.set(id, booking);
    return booking;
  }

  async getBooking(id: string): Promise<Booking | undefined> {
    return this.bookings.get(id);
  }

  async getAllBookings(): Promise<Booking[]> {
    return Array.from(this.bookings.values()).sort(
      (a, b) => (b.createdAt?.getTime() || 0) - (a.createdAt?.getTime() || 0)
    );
  }
}

export const storage = new MemStorage();
