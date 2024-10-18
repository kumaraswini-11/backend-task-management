import { _config } from "./config";

export const cookieOptions = {
  httpOnly: true,
  secure: _config.nodeEnv === "production", // secure in production only
  sameSite: _config.nodeEnv === "production" ? "None" : "Lax", // None for cross-site cookies, Lax for local
};
