import { NextFunction, Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { authService } from "./auth.service";
import { ILoginUserResponse } from "./auth.interface";
import sendResponse from "../../../shared/sendResponse";
import { httpStatus } from "../../healper/http.status";
import ApiError from "../../../errors/ApiError";
import { jwtHelpers } from "../../healper/jwtHelpers";
import config from "../../../config";
import { Secret } from "jsonwebtoken";
import { tokenuserget } from "../../healper/tokenuserget";

const loginuser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { ...loginData } = req.body;
      const result = await authService.loginuser(loginData);
      const { ...others } = result;

      sendResponse<ILoginUserResponse>(res, {
        statusCode: 200,
        success: true,
        message: "User lohggedin successfully !",
        data: others,
      });
    } catch (error) {
      next(error);
    }
  }
);

const getauthUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization;
      console.log(token);
      const { emails } = await tokenuserget(token as string);
      console.log(emails);
      const user = await authService.getmyprofile(emails);
      sendResponse(res, {
        statusCode: httpStatus.OK || 200,
        success: true,
        message: "User fetched successfully",
        data: user,
      });
    } catch (error) {
      next(error);
    }
  }
);

export const authColtroller = {
  loginuser,
  getauthUser,
};
