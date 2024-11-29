import z from "zod";

export const BookingValidation = z.object({
  body: z.object({
    flightId: z.string().min(1, "Flight ID is required"),
    numberOfSeats: z.number().min(1, "Number of seats must be at least 1"),
  }),
});
