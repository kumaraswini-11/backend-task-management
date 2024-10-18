import { Router } from "express";
import {
  signupUser,
  loginUser,
  logoutUser,
} from "../controllers/user-controller";

const router = Router();
router.route("/signup").post(signupUser);
router.route("/login").post(loginUser);
router.route("/logout").post(logoutUser);

export default router;
