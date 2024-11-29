import ApiError from "../../../errors/ApiError";
import { IGenericResponse } from "../../../interfaces/error";
import { IPaginationOptions } from "../../../shared/pagination copy";
import { paginationHelpers } from "../../../shared/paginationHelper";
import { httpStatus } from "../../healper/http.status";
import { Flight } from "../flights/flight.model";
import { IBooking } from "./booking.interface";
import { Booking } from "./booking.model";

const createBooking = async (payload: IBooking): Promise<IBooking | null> => {
  //flight set ability to change the number change of the flight and flite site time date wish booking
  const flight = await Flight.findById(payload.flightId);
  if (!flight) {
    throw new ApiError(httpStatus.NOT_FOUND || 404, "Flight not found");
  }
  if (flight.availableSeats < 1) {
    throw new ApiError(httpStatus.BAD_REQUEST || 400, "Flight is full");
  }
  if (
    flight.date < new Date() ||
    (flight.date === new Date() &&
      flight.time <
        new Date().toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
        }))
  ) {
    throw new ApiError(
      httpStatus.BAD_REQUEST || 400,
      "Flight has already departed"
    );
  }
  if (flight.availableSeats < payload.numberOfSeats) {
    throw new ApiError(
      httpStatus.BAD_REQUEST || 400,
      "Not enough seats available"
    );
  }
  const totalPrice = flight.price * payload.numberOfSeats;
  const updatedFlight = await Flight.findByIdAndUpdate(
    payload.flightId,
    {
      availableSeats: flight.availableSeats - payload.numberOfSeats,
    },
    { new: true }
  );
  if (!updatedFlight) {
    throw new ApiError(
      httpStatus.INTERNAL_SERVER_ERROR || 500,
      "Failed to update flight"
    );
  }
  payload.totalPrice = totalPrice;
  const result = await Booking.create(payload);
  return result;
};

const getAllBookings = async (
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IBooking[]>> => {
  const { limit, page, skip } =
    paginationHelpers.calculatePagination(paginationOptions);

  const result = await Booking.find({}).skip(skip).limit(limit);

  const total = await Booking.countDocuments();

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const userIdwish = async (userId: string): Promise<IBooking[] | null> => {
  const result = (await Booking.find({ userId }).populate('flightId')) as IBooking[];
  return result;
};

const getBookingById = async (bookingId: string): Promise<IBooking | null> => {
  const result = await Booking.findById(bookingId);
  return result;
};

const updateBooking = async (
  bookingId: string,
  payload: Partial<IBooking>
): Promise<IBooking | null> => {
  const result = await Booking.findByIdAndUpdate(bookingId, payload, {
    new: true,
  });
  return result;
};

const deleteBooking = async (bookingId: string): Promise<IBooking | null> => {
  const result = await Booking.findByIdAndDelete(bookingId);
  return result;
};

export const bookingService = {
  createBooking,
  getAllBookings,
  getBookingById,
  updateBooking,
  deleteBooking,
  userIdwish,
};
