const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../services/db");
const Student = require("./Students");

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

Student.hasMany(Follow, { foreignKey: "followerId", as: "Following" });
Student.hasMany(Follow, { foreignKey: "followingId", as: "Followers" });
Follow.belongsTo(Student, { foreignKey: "followerId", as: "follower" });
Follow.belongsTo(Student, { foreignKey: "followingId", as: "following" });

module.exports = Follow;
