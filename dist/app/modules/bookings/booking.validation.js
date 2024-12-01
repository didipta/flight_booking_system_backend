"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingValidation = void 0;
const zod_1 = __importDefault(require("zod"));
exports.BookingValidation = zod_1.default.object({
    body: zod_1.default.object({
        flightId: zod_1.default.string().min(1, "Flight ID is required"),
        numberOfSeats: zod_1.default.number().min(1, "Number of seats must be at least 1"),
    }),
});
