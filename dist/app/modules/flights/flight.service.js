"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FlightService = void 0;
const paginationHelper_1 = require("../../../shared/paginationHelper");
const flight_model_1 = require("./flight.model");
const creatFlight = async (payload) => {
    const result = await flight_model_1.Flight.create(payload);
    return result;
};
const getAllFlights = async (paginationOptions) => {
    const { limit, page, skip } = paginationHelper_1.paginationHelpers.calculatePagination(paginationOptions);
    const result = await flight_model_1.Flight.find({}).skip(skip).limit(limit);
    const total = await flight_model_1.Flight.countDocuments();
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
};
const searchFlights = async (origin, date, destination) => {
    const isValidDate = (dateString) => {
        const date = new Date(dateString);
        return !isNaN(date.getTime());
    };
    const query = [];
    const originSearch = origin.trim().replace(/^"|"$/g, "");
    const destinationSearch = destination.trim().replace(/^"|"$/g, "");
    const dateSearch = date.trim().replace(/^"|"$/g, "");
    if (originSearch && destinationSearch) {
        // Add regex conditions
        query.push({ origin: { $regex: originSearch, $options: "i" } }, { destination: { $regex: destinationSearch, $options: "i" } });
        // Add date condition if search is a valid date
        if (isValidDate(date)) {
            const startDate = new Date(dateSearch);
            const endDate = new Date(startDate);
            endDate.setDate(startDate.getDate() + 1);
            query.push({
                date: {
                    $gte: startDate,
                    $lt: endDate,
                },
            });
        }
    }
    const result = await flight_model_1.Flight.find({
        $and: query,
    });
    return result;
};
const getFlightById = async (id) => {
    const result = await flight_model_1.Flight.findById(id);
    return result;
};
const updateFlight = async (id, payload) => {
    const result = await flight_model_1.Flight.findByIdAndUpdate(id, payload, { new: true });
    return result;
};
const delectFlight = async (id) => {
    const result = await flight_model_1.Flight.findByIdAndDelete(id);
    return result;
};
exports.FlightService = {
    creatFlight,
    getAllFlights,
    searchFlights,
    getFlightById,
    updateFlight,
    delectFlight,
};
