import { IRole } from "../users/user.interface";

export type ILoginUser = {
  email: string;
  password: string;
};
export type ILoginUserResponse = {
  accessToken: string;
  refreshToken?: string;
};
export type IVerifiedLoginUser = {
  userId: string;
  role: IRole;
};
