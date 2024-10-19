import { Router } from "express";
import {
  signupUser,
  loginUser,
  logoutUser,
} from "../controllers/user-controller";
import { verifyJwt } from "../middlewares/verify-jwt";

const router = Router();
router.route("/signup").post(signupUser as any);
router.route("/login").post(loginUser);
router.route("/logout").post(verifyJwt as any, logoutUser);

export default router;
