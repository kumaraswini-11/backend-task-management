import { Router } from "express";
import {
  getCategories,
  createCategory,
  deleteCategory,
} from "../controllers/category-controller";
import { verifyJwt } from "../middlewares/verify-jwt";

const router = Router();
router.route("/").post(verifyJwt as any, createCategory as any);
router.route("/").get(verifyJwt as any, getCategories as any);
router.route("/:id").delete(verifyJwt as any, deleteCategory as any);

export default router;
