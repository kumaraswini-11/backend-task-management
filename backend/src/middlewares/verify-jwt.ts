import { NextFunction, Request } from "express";
import createHttpError from "http-errors";
import jwt from "jsonwebtoken";
import { _config } from "../config/config";
import userSchema from "../models/user-schema";
import { ITokenPayload } from "../controllers/user-controller";

export const verifyJwt = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token =
    req.cookies?.accessToken ||
    req.header("Authorization")?.replace("Bearer ", "");
  if (!token) {
    return next(
      createHttpError(401, "Access token is missing. Unauthorized request.")
    );
  }

  try {
    const decodeToken: ITokenPayload = jwt.verify(
      token,
      _config.accessTokenSecret as string
    ) as ITokenPayload;

    const user = await userSchema
      .findOne({ _id: decodeToken?.userId })
      .select("-password -refreshToken");
    if (!user) {
      return next(createHttpError(403, "User not found."));
    }

    (req as any).user = user; // We can do @ts-ignor or (req as any).user = user
    next();
  } catch (error) {
    if (
      error instanceof jwt.JsonWebTokenError ||
      error instanceof jwt.TokenExpiredError
    ) {
      return next(createHttpError(401, "Invalid or expired token."));
    }
    return next(
      createHttpError(500, "Internal server error. Please try again later.")
    );
  }
};
