const httpStatus = require("http-status");
import { NextFunction, Request, Response } from "express";
import config from "../../config";
import ApiError from "../../errors/ApiError";
import { Secret } from "jsonwebtoken";
import { jwtHelpers } from "../healper/jwtHelpers";
import { User } from "../modules/users/user.model";

const auth =
  (...requiredRoles: string[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Get authorization token
      const token = req.headers.authorization;
      if (!token) {
        throw new ApiError(httpStatus.UNAUTHORIZED, "You are not authorized");
      }

      // Verify token
      const verifiedUser = jwtHelpers.verifyToken(
        token,
        config.jwt_secret as Secret
      );

      // Role-based access control
      if (requiredRoles.length && !requiredRoles.includes(verifiedUser.role)) {
        throw new ApiError(httpStatus.FORBIDDEN, "Forbidden");
      }

      // Check if the user exists using the phone number
      const { email } = verifiedUser;
      const isUserExist = await User.isUserExist(email);
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
