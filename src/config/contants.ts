import { _config } from "./config";

export const DEFAULT_PAGE = 1;
export const DEFAULT_LIMIT = 10;
export const MAX_LIMIT = 100;
export const SALT_ROUNDS = 10;

export const cookieOptions = {
  httpOnly: true,
  secure: _config.nodeEnv === "production", // secure in production only
  sameSite: _config.nodeEnv === "production" ? "None" : "Lax", // None for cross-site cookies, Lax for local
};

export enum TaskStatus {
  PENDING = "pending",
  IN_PROGRESS = "in-progress",
  COMPLETED = "completed",
}
