"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FlightController = void 0;
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const flight_service_1 = require("./flight.service");
const creatFlight = (0, catchAsync_1.default)(async (req, res, next) => {
    try {
        const { ...flightData } = req.body;
        const result = await flight_service_1.FlightService.creatFlight(flightData);
        (0, sendResponse_1.default)(res, {
            statusCode: 201,
            success: true,
            message: "Flight created successfully",
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
});
const getAllFlights = (0, catchAsync_1.default)(async (req, res, next) => {
    try {
        const result = await flight_service_1.FlightService.getAllFlights(req.query || {});
        (0, sendResponse_1.default)(res, {
            statusCode: 200,
            success: true,
            message: "All Flights fetched successfully",
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
});
const searchFlights = (0, catchAsync_1.default)(async (req, res, next) => {
    try {
        const { origin, destination, date } = req.query;
        const result = await flight_service_1.FlightService.searchFlights(origin, date, destination);
        (0, sendResponse_1.default)(res, {
            statusCode: 200,
            success: true,
            message: "Flights fetched successfully",
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
});
const getFlightById = (0, catchAsync_1.default)(async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await flight_service_1.FlightService.getFlightById(id);
        (0, sendResponse_1.default)(res, {
            statusCode: 200,
            success: true,
            message: "Flight fetched successfully",
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
});
const updateFlight = (0, catchAsync_1.default)(async (req, res, next) => {
    try {
        const { id } = req.params;
        const { ...payload } = req.body;
        const result = await flight_service_1.FlightService.updateFlight(id, payload);
        (0, sendResponse_1.default)(res, {
            statusCode: 200,
            success: true,
            message: "Flight updated successfully",
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
});
const delectFlight = (0, catchAsync_1.default)(async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await flight_service_1.FlightService.delectFlight(id);
        (0, sendResponse_1.default)(res, {
            statusCode: 200,
            success: true,
            message: "Flight deleted successfully",
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.FlightController = {
    creatFlight,
    getAllFlights,
    searchFlights,
    getFlightById,
    updateFlight,
    delectFlight,
};
