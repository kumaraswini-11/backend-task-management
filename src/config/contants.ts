// import { _config } from "./config";

export const DEFAULT_PAGE = 1;
export const DEFAULT_LIMIT = 10;
export const MAX_LIMIT = 100;
export const SALT_ROUNDS = 10;

export const cookieOptions = {
  httpOnly: true,
  secure: true,
  sameSite: "None",
};

export enum TaskStatus {
  PENDING = "pending",
  IN_PROGRESS = "in-progress",
  COMPLETED = "completed",
}
