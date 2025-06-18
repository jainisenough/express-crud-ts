import winston from "winston";

class Logger {
  private static instance: winston.Logger;
  private constructor() {}
  public static getInstance() {
    if(!Logger.instance) {
      Logger.instance = winston.createLogger({
        level: process.env.LOG_LEVEL,
        format: winston.format.combine(
          winston.format.timestamp(),
          winston.format.json()
        ),
        transports: [
          new winston.transports.File({ filename: "error.log", level: "error" }),
          new winston.transports.File({ filename: "combined.log" }),
        ],
      });

      if (process.env.NODE_ENV !== "production") {
        Logger.instance.add(
          new winston.transports.Console({
            format:winston.format.combine(
              winston.format.colorize(),
              winston.format.simple()
            ),
          })
        );
      }
    }
    return Logger.instance;
  }
}

export default Logger.getInstance();
