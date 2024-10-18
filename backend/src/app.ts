import express from "express";
import cors from "cors";
import { _config } from "./config/config";

const app = express();
app.use(
  cors({
    origin: _config.frontendDomain,
    credentials: true, // Allow credentials (cookies) to be sent
  })
);
app.use(express.static("public"));
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));

export { app };
