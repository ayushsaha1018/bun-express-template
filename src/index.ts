import dotenv from "dotenv";
import { httpServer } from "@/app";
import connectDB from "./db/index";
import logger from "./logger/winston.logger";

dotenv.config({
  path: "./.env",
});

/**
 * Starting from Node.js v14, top-level await is available and it is only available in ES modules.
 * This means you cannot use it with common js modules or Node versions < 14.
 */

const startServer = (): void => {
  httpServer.listen(process.env.PORT || 8080, () => {
    logger.info(
      `📑 Visit the documentation at: http://localhost:${
        process.env.PORT || 8080
      }`
    );
    logger.info("⚙️  Server is running on port: " + (process.env.PORT || 8080));
  });
};

try {
  await connectDB();
  startServer();
} catch (err) {
  logger.error("Mongo db connect error: ", err);
}
