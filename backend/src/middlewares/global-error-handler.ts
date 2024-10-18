import { Request, Response, NextFunction } from "express";
import { HttpError } from "http-errors";
import { _config } from "../config/config";

export const globalErrorHandler = (
  err: HttpError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Something went wrong!";

  return res.status(statusCode).json({
    message,
    ...(_config.nodeEnv === "development" && {
      // Error meta data
      headers: {
        "User-Agent": req.get("User-Agent"),
        Host: req.get("Host"),
      },
      ipAddress: req.ip || req.socket.remoteAddress,
      timestamp: new Date().toISOString(),

      // Devlopment details
      path: req.path,
      method: req.method,
      details: err.details,
      errorStack: err.stack,
    }),
  });
};
