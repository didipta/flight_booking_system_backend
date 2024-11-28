const httpStatus = require("http-status");
import { NextFunction, Request, Response } from "express";
import config from "../../config";
import ApiError from "../../errors/ApiError";
import { Secret } from "jsonwebtoken";
import { jwtHelpers } from "../healper/jwtHelpers";
import { User } from "../modules/users/user.model";
import { tokenuserget } from "../healper/tokenuserget";

const auth =
  (...requiredRoles: string[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Get authorization token
      const token = req.headers.authorization;

      // Verify token
      const verifiedUser = await tokenuserget(token as string);

      // Role-based access control
      if (requiredRoles.length && !requiredRoles.includes(verifiedUser?.role)) {
        throw new ApiError(httpStatus.FORBIDDEN || 403, "Forbidden");
      }

      // Check if the user exists using the phone number
      const { emails } = verifiedUser;
      const isUserExist = await User.isUserExist(emails);
      if (!isUserExist) {
        throw new ApiError(httpStatus.UNAUTHORIZED, "You are not authorized");
      }

      // Proceed to the next middleware
      next();
    } catch (error) {
      next(error);
    }
  };

export default auth;
