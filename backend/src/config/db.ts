import mongoose, { MongooseError } from "mongoose";
import { _config } from "./config";

export const connectDB = async (): Promise<void> => {
  try {
    const connectionInstance = await mongoose.connect(_config.databaseUrl);
    console.log(
      `\nMongoDB connected! DB Host: ${connectionInstance.connection.host}`
    );
  } catch (error) {
    console.error("MongoDB connection FAILED", error as MongooseError);
    process.exit(1);
  }
};
