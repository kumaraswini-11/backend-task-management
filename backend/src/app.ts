import express from "express";
import cors from "cors";
import { _config } from "./config/config";
import { globalErrorHandler } from "./middlewares/global-error-handler";
import { rootRoute } from "./routes";

const app = express();
app.use(
  cors({
    origin: _config.frontendDomain,
    credentials: true, // Allow credentials (cookies) to be sent
  })
);
app.use(express.static("public", { maxAge: "1d" }));
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));

// Routes
app.get("/", (_, res, next) => {
  res.json({ message: "Running fine..." });
});
app.use("/api", rootRoute);

app.use(globalErrorHandler as any);

export { app };
