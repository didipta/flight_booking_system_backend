import express from "express";
import validateRequest from "../../middleware/validateRequest";
import { AuthValidation } from "./auth.validation";
import { authColtroller } from "./auth.controller";
import uservalidation from "../users/user.validation";
import { UserController } from "../users/user.controller";
const router = express.Router();

router.post(
  "/register",
  validateRequest(uservalidation),
  UserController.createUser
);

router.post(
  "/login",
  validateRequest(AuthValidation.loginZodSchema),
  authColtroller.loginuser
);

router.get('/me', authColtroller.getauthUser);

export const AuthRouter = router;
