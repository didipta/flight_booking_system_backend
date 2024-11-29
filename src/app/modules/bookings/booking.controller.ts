import { IPaginationOptions } from "./../../../shared/pagination copy";
import { NextFunction, Request, RequestHandler, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { IBooking } from "./booking.interface";
import { bookingService } from "./booking.service";
import { tokenuserget } from "../../healper/tokenuserget";

const creatBooking: RequestHandler = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { ...payload } = req.body;
      const { id } = await tokenuserget(req.headers.authorization as string);
      payload.userId = id;
      const result = await bookingService.createBooking(payload);
      sendResponse<IBooking>(res, {
        statusCode: 201,
        success: true,
        message: "Booking created successfully",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }
);

const getAllBookings: RequestHandler = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await bookingService.getAllBookings(
        (req.query as IPaginationOptions) || {}
      );
      sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "All Bookings fetched successfully",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }
);

const getBookingById: RequestHandler = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = await tokenuserget(req.headers.authorization as string);
      const result = await bookingService.getBookingById(id);
      sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Booking fetched successfully",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }
);

const userIdwish: RequestHandler = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const result = await bookingService.userIdwish(id);
      sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Booking fetched successfully",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }
);

const updateBooking: RequestHandler = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { bookingId } = req.params;
      const { ...payload } = req.body;
      const result = await bookingService.updateBooking(bookingId, payload);
      sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Booking updated successfully",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }
);

const deleteBooking: RequestHandler = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { bookingId } = req.params;
      const result = await bookingService.deleteBooking(bookingId);
      sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Booking deleted successfully",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }
);

export default {
  creatBooking,
  getAllBookings,
  getBookingById,
  updateBooking,
  deleteBooking,
  userIdwish,
};
