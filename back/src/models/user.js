const { DataTypes } = require('sequelize');
const sequelize = require('../database/database.js');

const User = sequelize.define(
  'User',
  {
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM('Librarian', 'Member'),
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'User',
    timestamps: false,
    freezeTableName: true,
  }
);

module.exports = User;
