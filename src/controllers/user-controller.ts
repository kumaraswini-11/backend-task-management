import { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import createHttpError from "http-errors";
import { _config } from "../config/config";
import userSchema from "../models/user-schema";
import { cookieOptions } from "../config/contants";

export interface ITokenPayload {
  userId: string;
  username: string;
  email: string;
}

interface ITokenConfig {
  tokenPayload: ITokenPayload;
  secret: string;
  expiry: string;
}

export interface IAuthenticatedRequest extends Request {
  user?: ITokenPayload;
}

function generateToken({ tokenPayload, secret, expiry }: ITokenConfig): string {
  return jwt.sign(tokenPayload, secret, {
    expiresIn: expiry,
    // algorithm: "HS256",
  });
}

const signupUser = async (req: Request, res: Response, next: NextFunction) => {
  const { username, email, password } = req.body;

  if ([username, email, password].some((field) => field == null)) {
    return next(createHttpError(400, "All fields are required!"));
  }

  try {
    const user = await userSchema.findOne({ $or: [{ email }, { username }] });
    if (user) {
      return next(
        createHttpError(400, "User already exists with this email or username.")
      );
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = await userSchema.create({
      username,
      email,
      password: hashedPassword,
    });

    return res.status(201).json({
      message: "User creation successful.",
    });
  } catch (error) {
    console.error("Error during user creation:", error);
    return next(
      createHttpError(500, "Internal server error while creating the user.")
    );
  }
};

const loginUser = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(createHttpError(400, "Credentials are required."));
  }

  try {
    const user = await userSchema.findOne({ email }).select("+password");
    if (!user) {
      return next(createHttpError(401, "Invalid credentials."));
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return next(createHttpError(401, "Invalid credentials."));
    }

    // Generate tokens
    const accessToken = generateToken({
      tokenPayload: {
        userId: user?._id as string,
        username: user?.username,
        email: user?.email,
      },
      secret: _config.accessTokenSecret as string,
      expiry: _config.accessTokenExpiry as string,
    });
    const refreshToken = generateToken({
      tokenPayload: {
        userId: user._id as string,
        username: user.username,
        email: user.email,
      },
      secret: _config.refreshTokenSecret as string,
      expiry: _config.refreshTokenExpiry as string,
    });

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false }); // Update only refreshToken

    res
      .status(200)
      .cookie("accessToken", accessToken, {
        ...(cookieOptions as object),
        // maxAge: 1000 * 60 * 60 * 24 * 7,
      })
      .cookie("refreshToken", refreshToken, {
        ...(cookieOptions as object),
        // maxAge: 1000 * 60 * 15,
      })
      .json({
        message: "Login successful.",
        data: { userId: user._id, username: user.username, email: user.email },
      });
  } catch (err) {
    console.error("Login error: ", err);
    return next(
      createHttpError(500, "Internal server error while logging in.")
    );
  }
};

const logoutUser = async (
  req: IAuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const userUpdateResult = await userSchema.updateOne(
      { _id: req.user?.userId }, // We can do @ts-ignor or (req as any).user?.userId or IAuthenticatedRequest
      { $unset: { refreshToken: 1 } } // Remove the refreshToken field
    );

    res
      .clearCookie("accessToken", cookieOptions as object)
      .clearCookie("refreshToken", cookieOptions as object)
      .status(200)
      .json({ message: "Logout successful." });
  } catch (err) {
    return next(
      createHttpError(500, "An unknown error occurred while logout.")
    );
  }
};

export { signupUser, loginUser, logoutUser };
