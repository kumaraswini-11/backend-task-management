import mongoose, { Schema, Document, CallbackError } from "mongoose";
import bcrypt from "bcrypt";

interface IUser extends Document {
  username: string;
  email: string;
  password: string;
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
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  const user = this as IUser;

  if (user.isModified("password")) {
    try {
      user.password = await bcrypt.hash(user.password, 10);
    } catch (err) {
      return next(err as CallbackError);
    }
  }

  next();
});

export default mongoose.model<IUser>("User", userSchema);
