import logger from "../../utils/logger";
import sqlite from "../../utils/sqlite";
import { DataTypes } from "sequelize";

const Film = sqlite.define("Film", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  releaseYear: {
    type: DataTypes.SMALLINT,
    allowNull: false,
  },
  rentalDuration: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  length: {
    type: DataTypes.SMALLINT,
    allowNull: false,
  },
  replacementCost: {
    type: DataTypes.DOUBLE,
    allowNull: false,
  },
  rating: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  specialFeatures: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

// Create table & add dummy data
(async () => {
  await sqlite.sync();
  logger.info(`${Film.tableName} table created!`);
  const films = await Film.bulkCreate([
    {
      title: "Film",
      description: "",
      releaseYear: 2025,
      rentalDuration: 2,
      length: 250,
      replacementCost: 1500.56,
      rating: '7.6',
      specialFeatures: ''
    }
  ]);
  logger.debug(`${films.length} records created!`);
})();

export default Film;
