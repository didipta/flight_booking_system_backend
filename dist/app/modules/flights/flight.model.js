"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Flight = void 0;
const mongoose_1 = require("mongoose");
const flightSchema = new mongoose_1.Schema({
    flightNumber: {
        type: String,
        required: true,
        unique: true,
    },
    airline: {
        type: String,
        required: true,
    },
    origin: {
        type: String,
        required: true,
    },
    destination: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    time: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    availableSeats: {
        type: Number,
        required: true,
        min: 0,
    },
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
});
exports.Flight = (0, mongoose_1.model)('Flight', flightSchema);
