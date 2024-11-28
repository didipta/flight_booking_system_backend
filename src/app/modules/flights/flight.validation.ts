import { z } from "zod";

export const FlightValidation = z.object({
  flightNumber: z.string().min(1, "Flight number is required"),
  airline: z.string().min(1, "Airline name is required"),
  origin: z.string().min(1, "Origin is required"),
  destination: z.string().min(1, "Destination is required"),
  date: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Invalid date format",
  }),
  time: z.string().min(1, "Time is required"), // You can add custom validation for specific time formats if needed
  price: z.number().positive("Price must be a positive number"),
  availableSeats: z.number().min(0, "Available seats cannot be negative"),
});
