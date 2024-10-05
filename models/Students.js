const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../services/db");

const Student = sequelize.define(
  "Student",
  {
    sr_no: {
      type: DataTypes.INTEGER, // Match the database type
      allowNull: false,
      primaryKey: true, // Set as primary key
      unique: true, // Ensure it is unique
    },
    branch_sr: {
      type: DataTypes.INTEGER, // Match the database type
      allowNull: true,
    },
    class_sr: {
      type: DataTypes.INTEGER, // Match the database type
      allowNull: true,
    },
    branch: {
      type: DataTypes.STRING(10), // Match the database type
      allowNull: true,
    },
    section: {
      type: DataTypes.STRING(10), // Match the database type
      allowNull: true,
    },
    tmp_roll: {
      type: DataTypes.STRING(20), // Match the database type
      allowNull: true,
    },
    adm_no: {
      type: DataTypes.STRING(20), // Match the database type
      allowNull: true,
    },
    name: {
      type: DataTypes.STRING(100), // Match the database type
      allowNull: true,
    },
    father_name: {
      type: DataTypes.STRING(100), // Match the database type
      allowNull: true,
    },
    profile_pic: {
      type: DataTypes.STRING(100), // Match the database type
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING(100), // Match the database type
      allowNull: true,
      unique: true, // Optional: Add if you want to enforce unique email addresses
    },
    mobile: {
      type: DataTypes.STRING(100), // Use STRING to accommodate different formats
      allowNull: true,
    },
  },
  {
    tableName: "students",
    timestamps: false,
  }
);

module.exports = Student;
