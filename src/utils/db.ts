import logger from './logger';
import { Sequelize } from "sequelize";

export type DBOptions = {
  dbIns: Sequelize;
};

class DB {
  dbIns: Sequelize;
  constructor({ dbIns }: DBOptions) {
    this.dbIns = dbIns;
  }

  async authenticate(): Promise<void> {
    try {
      await this.dbIns.authenticate();
      logger.info("Connection has been established successfully.");
    } catch (error) {
      logger.error("Unable to connect to the database:", error);
    }
  }

  async disconnect(): Promise<void> {
    try {
      await this.dbIns.close();
      logger.info("Connection has been closed successfully.");
    } catch (error) {
      logger.error("Unable to close the database:", error);
    }
  }
}



export default DB;
