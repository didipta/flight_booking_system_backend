import express from "express";
import auth from "../../middleware/auth";
import { ENUM_USER_ROLE } from "../../../interfaces/roleenum";
import { FlightController } from "../flights/flight.controller";
import validateRequest from "../../middleware/validateRequest";
import { BookingValidation } from "./booking.validation";
const router= express.Router();

router.post("/",auth(ENUM_USER_ROLE.USER),
validateRequest(BookingValidation),
FlightController.creatFlight);

router.get("/",auth(ENUM_USER_ROLE.ADMIN),FlightController.getAllFlights);
router.get("/:id",auth(),FlightController.getFlightById);
router.put("/:id",auth(ENUM_USER_ROLE.ADMIN),FlightController.updateFlight);
router.delete("/:id",auth(ENUM_USER_ROLE.ADMIN),FlightController.delectFlight);

export const BookingRouter=router;