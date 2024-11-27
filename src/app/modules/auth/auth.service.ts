import { Secret } from "jsonwebtoken";
import config from "../../../config";
import ApiError from "../../../errors/ApiError";
import { httpStatus } from "../../healper/http.status";
import { jwtHelpers } from "../../healper/jwtHelpers";
import { User } from "../users/user.model";
import { ILoginUser, ILoginUserResponse } from "./auth.interface";

const loginuser = async (payload: ILoginUser): Promise<ILoginUserResponse> => {
  const { phoneNumber, password } = payload;

  const isuserExist = await User.isUserExist(phoneNumber);

  if (!isuserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, "User does not exist");
  }

  if (
    isuserExist.password &&
    !(await User.isPasswordMatched(password, isuserExist.password))
  ) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Password is incorrect");
  }

  const { email, role } = isuserExist;
  const accessToken = jwtHelpers.createToken(
    { email, role },
    config.jwt_secret as Secret,
    config.jwt_expire_time as string
  );

  return {
    accessToken,
  };
};

export const authService = {
  loginuser,
};
