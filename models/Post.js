const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../services/db");
const Student = require("./Student");

const Post = sequelize.define(
  "Post",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    sr_no: {
      type: DataTypes.INTEGER,
      references: {
        model: Student,
        key: "sr_no",
      },
      onDelete: "CASCADE",
      allowNull: true,
    },
    post_type: {
      type: DataTypes.ENUM("text", "image", "video"),
      allowNull: true,
    },
    coords: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    tagged_user: {
      type: DataTypes.JSON,
      allowNull: true,
    },
  },
  {
    tableName: "posts",
    timestamps: false,
  }
);

// Associations
Student.hasMany(Post, { foreignKey: "sr_no" });
Post.belongsTo(Student, { foreignKey: "sr_no" });

module.exports = Post;
