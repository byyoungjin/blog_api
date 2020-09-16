import dotenv from "dotenv";

dotenv.config();

module.exports = {
  development: {
    dialect: "sqlite",
    storage: "sqliteDatabase",
    pool: { max: 1, min: 0 }
  },
  development_light: {
    dialect: "sqlite",
    storage: "sqliteDatabase",
    pool: { max: 1, min: 0 }
  },
  test: {
    username: process.env.PRODUCTION_DB_USERNAME,
    password: process.env.PRODUCTION_DB_PASSWORD,
    database: process.env.PRODUCTION_DB_DATABASE,
    host: process.env.PRODUCTION_DB_HOST,
    dialect: "mysql",
    charset: "utf8mb4",
    collate: "utf8mb4_general_ci",
    operatorsAliases: false
  },
  production: {
    username: process.env.PRODUCTION_DB_USERNAME,
    password: process.env.PRODUCTION_DB_PASSWORD,
    database: process.env.PRODUCTION_DB_DATABASE,
    host: process.env.PRODUCTION_DB_HOST,
    dialect: "mysql",
    charset: "utf8mb4",
    collate: "utf8mb4_general_ci",
    operatorsAliases: false
  }
};
