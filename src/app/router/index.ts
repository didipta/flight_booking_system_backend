import express from "express";
import { AuthRouter } from "../modules/auth/auth.router";
import { UserRouter } from "../modules/users/user.route";
const router = express.Router();

const moduleRoutes = [
  {
    path: "/auth",
    route: AuthRouter,
  },
  {
    path: "/user",
    route: UserRouter,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));
export default router;
