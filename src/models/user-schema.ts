import mongoose, { Schema, Document, CallbackError } from "mongoose";
import bcrypt from "bcrypt";
import { SALT_ROUNDS } from "../config/contants";

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  refreshToken?: string;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<IUser>(
  {
    username: {
      type: String,
      required: [true, "Username is required"],
      unique: true,
      trim: true,
      index: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      unique: true,
      index: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      select: false,
    },
    refreshToken: {
      type: String,
      select: false,
    },
  },
  { timestamps: true }
);

userSchema.pre<IUser>(
  "save",
  async function (next: (err?: CallbackError) => void) {
    if (this.isModified("password")) {
      this.password = await bcrypt.hash(this.password, SALT_ROUNDS);
    }
    next();
  }
);

export default mongoose.model<IUser>("User", userSchema);
