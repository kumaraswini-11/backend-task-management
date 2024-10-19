import { Router } from "express";
import userRoutes from "./user-routes";
import taskRoutes from "./task-routes";
import categoryRoutes from "./category-routes";

const rootRouter = Router();
rootRouter.use("/users", userRoutes);
rootRouter.use("/tasks", taskRoutes);
rootRouter.use("/categories", categoryRoutes);

export default rootRouter;
