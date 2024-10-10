const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../services/db");

const Student = sequelize.define(
  "Student",
  {
    sr_no: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      unique: true,
    },
    branch_sr: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    class_sr: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    branch: {
      type: DataTypes.STRING(10),
      allowNull: true,
    },
    section: {
      type: DataTypes.STRING(10),
      allowNull: true,
    },
    tmp_roll: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
    adm_no: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    father_name: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    profile_pic: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: true,
      unique: true,
    },
    mobile: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
  },
  {
    tableName: "students",
    timestamps: false,
  }
);

module.exports = Student;
