require('dotenv').config();

module.exports = {
    HOST: "tag",
    USER: "postgres",
    PASSWORD: "freshnugget",
    DB: "awsdb",
    dialect: "postgres",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };