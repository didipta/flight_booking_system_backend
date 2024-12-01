"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const booking_service_1 = require("./booking.service");
const tokenuserget_1 = require("../../healper/tokenuserget");
const creatBooking = (0, catchAsync_1.default)(async (req, res, next) => {
    try {
        const { ...payload } = req.body;
        const { id } = await (0, tokenuserget_1.tokenuserget)(req.headers.authorization);
        payload.userId = id;
        const result = await booking_service_1.bookingService.createBooking(payload);
        (0, sendResponse_1.default)(res, {
            statusCode: 201,
            success: true,
            message: "Booking created successfully",
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
});
const getAllBookings = (0, catchAsync_1.default)(async (req, res, next) => {
    try {
        const result = await booking_service_1.bookingService.getAllBookings(req.query || {});
        (0, sendResponse_1.default)(res, {
            statusCode: 200,
            success: true,
            message: "All Bookings fetched successfully",
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
});
const getBookingById = (0, catchAsync_1.default)(async (req, res, next) => {
    try {
        const { id } = await (0, tokenuserget_1.tokenuserget)(req.headers.authorization);
        const result = await booking_service_1.bookingService.getBookingById(id);
        (0, sendResponse_1.default)(res, {
            statusCode: 200,
            success: true,
            message: "Booking fetched successfully",
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
});
const userIdwish = (0, catchAsync_1.default)(async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await booking_service_1.bookingService.userIdwish(id);
        (0, sendResponse_1.default)(res, {
            statusCode: 200,
            success: true,
            message: "Booking fetched successfully",
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
});
const updateBooking = (0, catchAsync_1.default)(async (req, res, next) => {
    try {
        const { bookingId } = req.params;
        const { ...payload } = req.body;
        const result = await booking_service_1.bookingService.updateBooking(bookingId, payload);
        (0, sendResponse_1.default)(res, {
            statusCode: 200,
            success: true,
            message: "Booking updated successfully",
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
});
const deleteBooking = (0, catchAsync_1.default)(async (req, res, next) => {
    try {
        const { bookingId } = req.params;
        const result = await booking_service_1.bookingService.deleteBooking(bookingId);
        (0, sendResponse_1.default)(res, {
            statusCode: 200,
            success: true,
            message: "Booking deleted successfully",
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.default = {
    creatBooking,
    getAllBookings,
    getBookingById,
    updateBooking,
    deleteBooking,
    userIdwish,
};
