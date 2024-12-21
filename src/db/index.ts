import mongoose, { Mongoose } from "mongoose";
import logger from "@/logger/winston.logger";

export let dbInstance: Mongoose | undefined = undefined;

const connectDB = async (): Promise<void> => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URI}`
    );
    dbInstance = connectionInstance;
    logger.info(
      `\n☘️  MongoDB Connected! Db host: ${connectionInstance.connection.host}\n`
    );
  } catch (error) {
    logger.error("MongoDB connection error: ", error);
    process.exit(1); // Exit process with failure
  }
};

export default connectDB;
