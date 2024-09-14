const { Sequelize, DataTypes } = require("sequelize");
const config = require("../config/config");
const env = process.env.NODE_ENV || "development";
const sequelize = new Sequelize(config[env]);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.Student = require("./student")(sequelize, DataTypes);
// Add other models here

module.exports = db;
