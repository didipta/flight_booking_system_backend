import { Secret } from "jsonwebtoken";
import config from "../../../config";
import ApiError from "../../../errors/ApiError";
import { httpStatus } from "../../healper/http.status";
import { jwtHelpers } from "../../healper/jwtHelpers";
import { User } from "../users/user.model";
import { ILoginUser, ILoginUserResponse } from "./auth.interface";
import { IUser } from "../users/user.interface";

const loginuser = async (payload: ILoginUser): Promise<ILoginUserResponse> => {
  const { email, password } = payload;

  const isuserExist = await User.isUserExist(email);

  if (!isuserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, "User does not exist");
  }

  if (
    isuserExist.password &&
    !(await User.isPasswordMatched(password, isuserExist.password))
  ) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Password is incorrect");
  }

  const { email: emails, role, _id:id } = isuserExist;
  const accessToken = jwtHelpers.createToken(
    { emails, role , id },
    config.jwt_secret as Secret,
    config.jwt_expire_time as string
  );

  return {
    accessToken,
  };
};
const getmyprofile = async (email: string): Promise<IUser | null> => {
  const result = await User.findOne({ email });
  return result;
};

export const authService = {
  loginuser,
  getmyprofile,
};
