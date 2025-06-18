import logger from "../../utils/logger";
import sqlite from "../../utils/sqlite";
import { DataTypes } from "sequelize";

const Category = sqlite.define("Category", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  }
});

// Create table & add dummy data
(async () => {
  await sqlite.sync();
  logger.info(`${Category.tableName} table created!`);
  const categories = await Category.bulkCreate([
    {
      name: "Category",
    },
    {
      name: "Category 1"
    },
    {
      name: "Category 2"
    },
  ]);
    logger.debug(`${categories.length} records created!`);
})();

export default Category;
