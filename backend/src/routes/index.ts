import { Router } from "express";
import userRoutes from "./user-routes";

const rootRouter = Router();
rootRouter.use("/users", userRoutes);

export default rootRouter;
