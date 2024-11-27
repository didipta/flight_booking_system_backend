import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { authService } from "./auth.service";
import { ILoginUserResponse } from "./auth.interface";
import sendResponse from "../../../shared/sendResponse";

const loginuser = catchAsync(async (req: Request, res: Response) => {
  const { ...loginData } = req.body;
  const result = await authService.loginuser(loginData);
  const { refreshToken, ...others } = result;

  sendResponse<ILoginUserResponse>(res, {
    statusCode: 200,
    success: true,
    message: "User lohggedin successfully !",
    data: others,
  });
});

export const authColtroller = {
  loginuser,
};
