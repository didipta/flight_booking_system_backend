"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FlightValidation = void 0;
const zod_1 = require("zod");
exports.FlightValidation = zod_1.z.object({
    body: zod_1.z.object({
        flightNumber: zod_1.z.string().min(1, "Flight number is required"),
        airline: zod_1.z.string().min(1, "Airline name is required"),
        origin: zod_1.z.string().min(1, "Origin is required"),
        destination: zod_1.z.string().min(1, "Destination is required"),
        date: zod_1.z.string().refine((val) => !isNaN(Date.parse(val)), {
            message: "Invalid date format",
        }),
        time: zod_1.z.string().min(1, "Time is required"), // You can add custom validation for specific time formats if needed
        price: zod_1.z.number().positive("Price must be a positive number"),
        availableSeats: zod_1.z.number().min(0, "Available seats cannot be negative"),
    })
});
