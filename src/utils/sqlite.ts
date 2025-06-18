import logger from "./logger";
import { Sequelize } from "sequelize";

class SQLite {
  private static instance: Sequelize;
  private constructor() {}
  public static getInstance() {
    if (!SQLite.instance) {
      SQLite.instance = new Sequelize({
        dialect: "sqlite",
        storage: ":memory:",
        logging: logger.info.bind(logger),
      });
    }
    return SQLite.instance;
  }
}

export default SQLite.getInstance();
