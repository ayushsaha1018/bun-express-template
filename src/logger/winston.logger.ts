import winston from "winston";

// Define your severity levels.
const levels: Record<string, number> = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4,
};

// This method sets the current severity level based on
// the current NODE_ENV: show all the log levels
// if the server was run in development mode; otherwise,
// show only warn and error messages in production.
const level = (): string => {
  const env = process.env.NODE_ENV || "development";
  const isDevelopment = env === "development";
  return isDevelopment ? "debug" : "warn";
};

// Define different colors for each level.
// Colors make the log message more visible,
// adding the ability to focus or ignore messages.
const colors: Record<string, string> = {
  error: "red",
  warn: "yellow",
  info: "blue",
  http: "magenta",
  debug: "white",
};

// Tell winston to link the colors defined above to the severity levels.
winston.addColors(colors);

// Customize the log format.
const format = winston.format.combine(
  // Add the message timestamp with the preferred format.
  winston.format.timestamp({ format: "DD MMM, YYYY - HH:mm:ss:ms" }),
  // Colorize the logs.
  winston.format.colorize({ all: true }),
  // Define the format of the message, showing the timestamp, level, and message.
  winston.format.printf(
    (info) => `[${info.timestamp}] ${info.level}: ${info.message}`
  )
);

// Define the transports for the logger.
const transports: winston.transport[] = [
  // Use the console to print messages.
  new winston.transports.Console(),
  // Write error messages to `error.log`.
  new winston.transports.File({ filename: "logs/error.log", level: "error" }),
  // Write info messages to `info.log`.
  new winston.transports.File({ filename: "logs/info.log", level: "info" }),
  // Write HTTP messages to `http.log`.
  new winston.transports.File({ filename: "logs/http.log", level: "http" }),
];

// Create and export the logger instance.
const logger = winston.createLogger({
  level: level(),
  levels,
  format,
  transports,
});

export default logger;
