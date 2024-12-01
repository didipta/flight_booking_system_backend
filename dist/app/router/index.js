"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_router_1 = require("../modules/auth/auth.router");
const user_route_1 = require("../modules/users/user.route");
const flight_route_1 = require("../modules/flights/flight.route");
const booking_router_1 = require("../modules/bookings/booking.router");
const router = express_1.default.Router();
const moduleRoutes = [
    {
        path: "/auth",
        route: auth_router_1.AuthRouter,
    },
    {
        path: "/user",
        route: user_route_1.UserRouter,
    },
    {
        path: "/flight",
        route: flight_route_1.FlightRouter,
    },
    {
        path: "/booking",
        route: booking_router_1.BookingRouter,
    },
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));
exports.default = router;
