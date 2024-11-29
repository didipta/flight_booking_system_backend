import express from "express";
import auth from "../../middleware/auth";
import { ENUM_USER_ROLE } from "../../../interfaces/roleenum";
import validateRequest from "../../middleware/validateRequest";
import { BookingValidation } from "./booking.validation";
import bookingController from "./booking.controller";
const router = express.Router();

router.post(
  "/",
  auth(ENUM_USER_ROLE.USER),
  validateRequest(BookingValidation),
  bookingController.creatBooking
);

router.get("/", auth(ENUM_USER_ROLE.ADMIN), bookingController.getAllBookings);
router.get("/:id", auth(), bookingController.getBookingById);
router.put("/:id", auth(ENUM_USER_ROLE.ADMIN), bookingController.updateBooking);
router.get("/user/:id", auth(ENUM_USER_ROLE.USER), bookingController.userIdwish);
router.delete(
  "/:id",
  auth(ENUM_USER_ROLE.ADMIN),
  bookingController.deleteBooking
);

export const BookingRouter = router;
