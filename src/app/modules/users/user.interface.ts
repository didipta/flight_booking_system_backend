import { Model } from "mongoose";

export type IRole = "USER" | "ADMIN";

export type IUser = {
  role: IRole;
  password: string;
  username: string;
  email: string;
};

export type UserModel = Model<IUser> & {
  isUserExist(
    email: string
  ): Promise<Pick<IUser, "email" | "password" | "role"> | null>;
  isPasswordMatched(
    givenPassword: string,
    savedPassword: string
  ): Promise<boolean>;
};
