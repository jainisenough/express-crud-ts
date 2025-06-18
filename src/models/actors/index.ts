import logger from "../../utils/logger";
import sqlite from "../../utils/sqlite";
import { DataTypes } from "sequelize";

const Actor = sqlite.define("Actor", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

// Create table & add dummy data
(async () => {
  await sqlite.sync();
  logger.info(`${Actor.tableName} table created!`);
  const actors = await Actor.bulkCreate([
    {
      firstName: "Akhilesh",
      lastName: "Jain",
    },
    {
      firstName: "Akhilesh 1",
      lastName: "Jain",
    },
    {
      firstName: "Akhilesh 2",
      lastName: "Jain",
    },
  ]);
	logger.debug(`${actors.length} records created!`);
})();

export default Actor;
