const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../services/db");

const Student = sequelize.define(
  "Student",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    sr_no: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    gender: {
      type: DataTypes.ENUM("MALE", "FEMALE", "OTHER"),
      allowNull: true,
    },
    father: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    program: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    admission: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
    },
    mobile: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    alternative_mobile: {
      type: DataTypes.BIGINT,
      allowNull: true,
    },
    profile_pic: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    stay_type: {
      type: DataTypes.ENUM("hosteller", "day_scholar"),
      allowNull: true,
    },
    permanent_address: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    hostel_address: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    tableName: "students",
    timestamps: false,
  }
);

module.exports = Student;
