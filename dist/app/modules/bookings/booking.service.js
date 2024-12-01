"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookingService = void 0;
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const paginationHelper_1 = require("../../../shared/paginationHelper");
const http_status_1 = require("../../healper/http.status");
const flight_model_1 = require("../flights/flight.model");
const booking_model_1 = require("./booking.model");
const createBooking = async (payload) => {
    //flight set ability to change the number change of the flight and flite site time date wish booking
    const flight = await flight_model_1.Flight.findById(payload.flightId);
    if (!flight) {
        throw new ApiError_1.default(http_status_1.httpStatus.NOT_FOUND || 404, "Flight not found");
    }
    if (flight.availableSeats < 1) {
        throw new ApiError_1.default(http_status_1.httpStatus.BAD_REQUEST || 400, "Flight is full");
    }
    if (flight.date < new Date() ||
        (flight.date === new Date() &&
            flight.time <
                new Date().toLocaleTimeString("en-US", {
                    hour: "2-digit",
                    minute: "2-digit",
                }))) {
        throw new ApiError_1.default(http_status_1.httpStatus.BAD_REQUEST || 400, "Flight has already departed");
    }
    if (flight.availableSeats < payload.numberOfSeats) {
        throw new ApiError_1.default(http_status_1.httpStatus.BAD_REQUEST || 400, "Not enough seats available");
    }
    const totalPrice = flight.price * payload.numberOfSeats;
    const updatedFlight = await flight_model_1.Flight.findByIdAndUpdate(payload.flightId, {
        availableSeats: flight.availableSeats - payload.numberOfSeats,
    }, { new: true });
    if (!updatedFlight) {
        throw new ApiError_1.default(http_status_1.httpStatus.INTERNAL_SERVER_ERROR || 500, "Failed to update flight");
    }
    payload.totalPrice = totalPrice;
    const result = await booking_model_1.Booking.create(payload);
    return result;
};
const getAllBookings = async (paginationOptions) => {
    const { limit, page, skip } = paginationHelper_1.paginationHelpers.calculatePagination(paginationOptions);
    //populate the user and flight id
    const result = await booking_model_1.Booking.find({}).populate("userId").populate("flightId").skip(skip).limit(limit);
    const total = await booking_model_1.Booking.countDocuments();
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
};
const userIdwish = async (userId) => {
    const result = (await booking_model_1.Booking.find({ userId }).populate("flightId"));
    return result;
};
const getBookingById = async (bookingId) => {
    const result = await booking_model_1.Booking.findById(bookingId);
    return result;
};
const updateBooking = async (bookingId, payload) => {
    const result = await booking_model_1.Booking.findByIdAndUpdate(bookingId, payload, {
        new: true,
    });
    return result;
};
const deleteBooking = async (bookingId) => {
    const result = await booking_model_1.Booking.findByIdAndDelete(bookingId);
    return result;
};
exports.bookingService = {
    createBooking,
    getAllBookings,
    getBookingById,
    updateBooking,
    deleteBooking,
    userIdwish,
};
