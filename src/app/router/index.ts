import express from "express";
import { AuthRouter } from "../modules/auth/auth.router";
import { UserRouter } from "../modules/users/user.route";
import { FlightRouter } from "../modules/flights/flight.route";
import { BookingRouter } from "../modules/bookings/booking.router";
const router = express.Router();

const moduleRoutes = [
  {
    path: "/auth",
    route: AuthRouter,
  },
  {
    path: "/user",
    route: UserRouter,
  },
  {
    path: "/flight",
    route: FlightRouter,
  },
  {
    path: "/booking",
    route: BookingRouter,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));
export default router;
