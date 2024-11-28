const httpStatus = require("http-status");
import { RequestHandler, Request, Response, NextFunction } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { UserService } from "./user.service";
import { IUser } from "./user.interface";

const createUser: RequestHandler = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = req.body;
      const result = await UserService.createUser(user);
      return sendResponse<IUser>(res, {
        statusCode: httpStatus.OK || 200,
        success: true,
        message: "User created successfully!",
        data: result,
      });
    } catch (error) {
      next(error); // Pass error to global error handler
    }
  }
);

export const UserController = {
  createUser,
};
