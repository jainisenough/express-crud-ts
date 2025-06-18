import logger from "../../utils/logger";
import sqlite from "../../utils/sqlite";
import { DataTypes } from "sequelize";

const Customer = sqlite.define("Customer", {
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
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  active: {
    type: DataTypes.TINYINT,
    allowNull: false,
  },
});

// Create table & add dummy data
(async () => {
  await sqlite.sync();
  logger.info(`${Customer.tableName} table created!`);
  const customers = await Customer.bulkCreate([
    {
      firstName: "Customer",
      lastName: "LN",
      email: "test@email.com",
      active: 1,
    },
    {
      firstName: "Customer 1",
      lastName: "LN1",
      email: "test1@email.com",
      active: 1,
    },
    {
      firstName: "Customer 2",
      lastName: "LN2",
      email: "test2@email.com",
      active: 1,
    },
  ]);
  logger.debug(`${customers.length} records created!`);
})();

export default Customer;
