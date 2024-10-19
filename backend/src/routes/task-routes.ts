import { Router } from "express";
import {
  createTask,
  deleteTask,
  getTasks,
  updateTask,
} from "../controllers/task-controller";
import { verifyJwt } from "../middlewares/verify-jwt";

const router = Router();
router.route("/").post(verifyJwt as any, createTask as any);
router.route("/").get(verifyJwt as any, getTasks as any);
router.route("/:id").put(verifyJwt as any, updateTask as any);
router.route("/:id").delete(verifyJwt as any, deleteTask as any);

export default router;
