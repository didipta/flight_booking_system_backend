const httpStatus = require("http-status");
import { RequestHandler, Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { UserService } from "./user.service";
import { IUser } from "./user.interface";

const createUser: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const user = req.body;
    const result = await UserService.createUser(user);
    sendResponse<IUser>(res, {
      statusCode: httpStatus.OK || 200,
      success: true,
      message: "user created successfully!",
      data: result,
    });
  }
);

export const UserController = {
  createUser,
};
