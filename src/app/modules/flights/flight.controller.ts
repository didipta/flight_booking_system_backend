import { NextFunction, Request, RequestHandler, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { IFlight } from "./flight.interface";
import { FlightService } from "./flight.service";
import { IPaginationOptions } from "../../../shared/pagination copy";

const creatFlight: RequestHandler = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { ...flightData } = req.body;
      const result = await FlightService.creatFlight(flightData);
      sendResponse<IFlight>(res, {
        statusCode: 201,
        success: true,
        message: "Flight created successfully",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }
);

const getAllFlights: RequestHandler = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await FlightService.getAllFlights(
        (req.query as IPaginationOptions) || {}
      );
      sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "All Flights fetched successfully",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }
);
const searchFlights: RequestHandler = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { search } = req.query;
      const result = await FlightService.searchFlights(search as string);
      sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Flights fetched successfully",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }
);
const getFlightById: RequestHandler = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const result = await FlightService.getFlightById(id);
      sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Flight fetched successfully",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }
);
const updateFlight: RequestHandler = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const { ...payload } = req.body;
      const result = await FlightService.updateFlight(id, payload);
      sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Flight updated successfully",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }
);
const delectFlight: RequestHandler = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const result = await FlightService.delectFlight(id);
      sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Flight deleted successfully",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }
);

export const FlightController = {
  creatFlight,
  getAllFlights,
  searchFlights,
  getFlightById,
  updateFlight,
  delectFlight,
};
