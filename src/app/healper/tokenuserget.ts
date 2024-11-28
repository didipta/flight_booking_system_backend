import { Secret } from "jsonwebtoken";
import config from "../../config";
import ApiError from "../../errors/ApiError";
import { httpStatus } from "./http.status";
import { jwtHelpers } from "./jwtHelpers";

export const tokenuserget = async (token: string) => {
  if (!token) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "You are not authorized");
  }
  let verifiedidUser = null;
  verifiedidUser = jwtHelpers.verifyToken(token, config.jwt_secret as Secret);
  return verifiedidUser;
};
