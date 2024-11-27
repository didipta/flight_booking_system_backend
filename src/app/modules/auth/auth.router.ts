import express from "express";
import validateRequest from "../../middleware/validateRequest";
import { AuthValidation } from "./auth.validation";
import { authColtroller } from "./auth.controller";
import uservalidation from "../users/user.validation";
import { UserController } from "../users/user.controller";
const router = express.Router();

router.post(
  "/login",
  validateRequest(AuthValidation.loginZodSchema),
  authColtroller.loginuser
);

router.post(
  "/sign-up",
  validateRequest(uservalidation),
  UserController.createUser
);

export const AuthRouter = router;