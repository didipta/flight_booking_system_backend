import express from "express";
import validateRequest from "../../middleware/validateRequest";
import { FlightValidation } from "./flight.validation";
import { FlightController } from "./flight.controller";
import auth from "../../middleware/auth";
import { ENUM_USER_ROLE } from "../../../interfaces/roleenum";
const router = express.Router();

router.post(
  "/",
  auth(ENUM_USER_ROLE.ADMIN),
  validateRequest(FlightValidation),
  FlightController.creatFlight
);

router.get("/", FlightController.getAllFlights);
router.get("/search", FlightController.searchFlights);
router.get("/:id", FlightController.getFlightById);
router.put("/:id", auth(ENUM_USER_ROLE.ADMIN), FlightController.updateFlight);
router.delete(
  "/:id",
  auth(ENUM_USER_ROLE.ADMIN),
  FlightController.delectFlight
);

export const FlightRouter = router;
