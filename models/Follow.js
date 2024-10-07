const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../services/db");
const Student = require("./Student");

const Follow = sequelize.define(
  "Follow",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    followerId: {
      type: DataTypes.INTEGER,
      references: {
        model: Student,
        key: "sr_no",
      },
      onDelete: "CASCADE",
    },
    followingId: {
      type: DataTypes.INTEGER,
      references: {
        model: Student,
        key: "sr_no",
      },
      onDelete: "CASCADE",
    },
    status: {
      type: DataTypes.BOOLEAN, // 0 for pending, 1 for completed
      defaultValue: 0,
    },
  },
  {
    tableName: "follows",
    timestamps: true,
  }
);

// Establish relationships (optional, for easier querying)
Student.hasMany(Follow, { foreignKey: "followerId", as: "Following" });
Student.hasMany(Follow, { foreignKey: "followingId", as: "Followers" });

module.exports = Follow;
