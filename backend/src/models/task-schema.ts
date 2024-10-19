import mongoose, { Schema, Document } from "mongoose";
import { TaskStatus } from "../config/contants";

interface ITask extends Document {
  title: string;
  description?: string;
  status: TaskStatus;
  dueDate?: Date;
  categoryId?: mongoose.Schema.Types.ObjectId;
  userId: mongoose.Schema.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const taskSchema = new Schema<ITask>(
  {
    title: { type: String, required: [true, "Title is required"] },
    description: { type: String },
    status: {
      type: String,
      enum: Object.values(TaskStatus),
      default: TaskStatus.PENDING,
      index: true,
    },
    dueDate: { type: Date },
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      index: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model<ITask>("Task", taskSchema);
