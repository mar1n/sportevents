import { Sequelize } from "sequelize";
import * as dotenv from "dotenv";

dotenv.config();

const db = new Sequelize({
  dialect: "sqlite",
  storage: "./database.sqlite", // Path to your SQLite file
});

async function testConnection() {
    try {
      await db.authenticate();
      console.log('Connection has been established successfully.');
    } catch (error) {
      console.error('Unable to connect to the database:', error);
    }
  };

const closeDB = db.close();

export { db, testConnection, closeDB };
