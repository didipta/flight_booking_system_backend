import z from "zod";

export const BookingValidation = z.object({
  userId: z.string().min(1, "User ID is required"),
  flightId: z.string().min(1, "Flight ID is required"),
  numberOfSeats: z.number().min(1, "Number of seats must be at least 1"),
});
